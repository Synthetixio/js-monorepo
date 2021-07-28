import { useQuery, UseQueryOptions } from 'react-query';

import { Synths } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { SynthTotalSupply, SynthsTotalSupplyData } from '../../types';

const useSynthsTotalSupplyQuery = (
	ctx: QueryContext,
	options?: UseQueryOptions<SynthsTotalSupplyData>
) => {
	return useQuery<SynthsTotalSupplyData>(
		['synths', 'totalSupply', ctx.networkId],
		async () => {
			const {
				contracts: {
					SynthUtil,
					ExchangeRates,
					CollateralManagerState,
					EtherWrapper,
					EtherCollateral,
					EtherCollateralsUSD,
				},
				utils: { formatBytes32String, parseBytes32String, formatEther },
			} = ctx.snxjs!;

			const [sETHKey, sBTCKey, sUSDKey] = [Synths.sETH, Synths.sBTC, Synths.sUSD].map(
				formatBytes32String
			);

			const [
				synthTotalSupplies,
				unformattedEthPrice,
				unformattedBtcPrice,
				[unformattedETHBorrows, unformattedETHShorts],
				[unformattedBTCBorrows, unformattedBTCShorts],
				[unformattedSUSDBorrows, unformattedSUSDShorts],

				unformattedWrapprSETH,
				unformattedWrapprSUSD,

				unformattedOldLoansETH,
				unformattedOldLoansSUSD,
			] = await Promise.all([
				SynthUtil.synthsTotalSupplies(),
				ExchangeRates.rateForCurrency(sETHKey),
				ExchangeRates.rateForCurrency(sBTCKey),
				CollateralManagerState.totalIssuedSynths(sETHKey),
				CollateralManagerState.totalIssuedSynths(sBTCKey),
				CollateralManagerState.totalIssuedSynths(sUSDKey),
				EtherWrapper.sETHIssued(),
				EtherWrapper.sUSDIssued(),
				EtherCollateral.totalIssuedSynths(),
				EtherCollateralsUSD.totalIssuedSynths(),
			]);

			const [
				ethPrice,
				btcPrice,

				ethBorrows,
				ethShorts,

				btcBorrows,
				btcShorts,

				susdBorrows,
				susdShorts,

				wrapprSETH,
				wrapprSUSD,

				oldLoansETH,
				oldLoansSUSD,
			] = [
				unformattedEthPrice,
				unformattedBtcPrice,

				unformattedETHShorts,
				unformattedETHBorrows,

				unformattedBTCShorts,
				unformattedBTCBorrows,

				unformattedSUSDShorts,
				unformattedSUSDBorrows,

				unformattedWrapprSETH,
				unformattedWrapprSUSD,

				unformattedOldLoansETH,
				unformattedOldLoansSUSD,
			].map((val) => wei(formatEther(val)));

			let totalValue = wei(0);

			const supplyData: SynthTotalSupply[] = [];
			for (let i = 0; i < synthTotalSupplies[0].length; i++) {
				let value = wei(formatEther(synthTotalSupplies[2][i]));
				const name = parseBytes32String(synthTotalSupplies[0][i]);
				const totalSupply = wei(formatEther(synthTotalSupplies[1][i]));

				switch (name) {
					case Synths.sBTC: {
						const negativeEntries = btcShorts.add(btcBorrows);

						value = totalSupply.sub(negativeEntries).mul(btcPrice);
						break;
					}

					case Synths.sETH: {
						const multiCollateralLoansETH = ethShorts.add(ethBorrows);
						const negativeEntries = multiCollateralLoansETH.add(oldLoansETH).add(wrapprSETH);

						value = totalSupply.sub(negativeEntries).mul(ethPrice);
						break;
					}

					case Synths.sUSD: {
						const multiCollateralLoansSUSD = susdShorts.add(susdBorrows);
						const negativeEntries = multiCollateralLoansSUSD.add(oldLoansSUSD).add(wrapprSUSD);

						value = totalSupply.sub(negativeEntries);
						break;
					}

					default:
				}

				const skewValue = value;
				value = value.abs();

				supplyData.push({
					name,
					totalSupply,
					value,
					skewValue,
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
