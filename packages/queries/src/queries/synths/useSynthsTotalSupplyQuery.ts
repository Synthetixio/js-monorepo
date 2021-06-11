import Wei, { wei } from '@synthetixio/wei';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

import { Synths } from '../../currency';

export type SynthTotalSupply = {
	name: string;
	value: Wei;
	totalSupply: Wei;
	poolProportion: Wei;
};

export type SynthsTotalSupplyData = {
	supplyData: { [name: string]: SynthTotalSupply };
	totalValue: Wei;
};

const useSynthsTotalSupplyQuery = (ctx: QueryContext, options?: UseQueryOptions<SynthsTotalSupplyData>) => {
	return useQuery<SynthsTotalSupplyData>(
		['synths', 'totalSupply', ctx.networkId],
		async () => {

			const [
				synthTotalSupplies,
				unformattedEthShorts,
				unformattedBtcShorts,
				unformattedBtcPrice,
				unformattedEthPrice,
				unformattedIssuedWETHWrapperSETH,
			] = await Promise.all([
				ctx.snxjs!.contracts.SynthUtil.synthsTotalSupplies(),
				ctx.snxjs!.contracts.CollateralManager.short(ctx.snxjs!.utils.formatBytes32String(Synths.sETH)),
				ctx.snxjs!.contracts.CollateralManager.short(ctx.snxjs!.utils.formatBytes32String(Synths.sBTC)),
				ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(ctx.snxjs!.utils.formatBytes32String(Synths.sBTC)),
				ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(ctx.snxjs!.utils.formatBytes32String(Synths.sETH)),
				ctx.snxjs!.contracts.EtherWrapper.sETHIssued(),
			]);

			const [ethShorts, btcShorts, btcPrice, ethPrice, issuedWETHWrapperSETH] = [
				unformattedEthShorts,
				unformattedBtcShorts,
				unformattedBtcPrice,
				unformattedEthPrice,
				unformattedIssuedWETHWrapperSETH,
			].map((val) => wei(val));

			let totalValue = wei(0);

			const supplyData: SynthTotalSupply[] = [];
			for (let i = 0; i < synthTotalSupplies[0].length; i++) {
				let value = wei(synthTotalSupplies[2][i]);
				const name = ctx.snxjs!.utils.parseBytes32String(synthTotalSupplies[0][i]);
				let totalSupply = wei(synthTotalSupplies[1][i]);

				switch (name) {
					case Synths.iETH:
						value = value.add(ethShorts.mul(ethPrice));
						break;

					case Synths.iBTC:
						value = value.add(btcShorts.mul(btcPrice));
						break;

					case Synths.sETH:
						// we deduct sETH amount issued by EthWrappr
						// because it's not really part of the debt pool
						// https://contracts.synthetix.io/EtherWrapper
						totalSupply = totalSupply.sub(issuedWETHWrapperSETH);
						value = totalSupply.mul(ethPrice);
						break;

					default:
				}

				supplyData.push({
					name,
					totalSupply,
					value,
					poolProportion: wei(0), // true value to be computed in next step
				});
				totalValue = totalValue.add(value);
			}

			// Add proportion data to each SynthTotalSupply object
			const supplyDataWithProportions = supplyData.map((datum) => ({
				...datum,
				poolProportion: totalValue.gt(0) ? datum.value.div(totalValue) : wei(0),
			}));

			const supplyDataMap: { [name: string]: SynthTotalSupply } = {};
			for (const synthSupply of supplyDataWithProportions) {
				supplyDataMap[synthSupply.name] = synthSupply;
			}

			return {
				totalValue,
				supplyData: supplyDataMap,
			};
		},
		{
			enabled: !!ctx.snxjs,
			...options,
		}
	);
};

export default useSynthsTotalSupplyQuery;