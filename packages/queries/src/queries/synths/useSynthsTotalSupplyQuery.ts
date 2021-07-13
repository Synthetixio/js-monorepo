import BigNumber from 'bignumber.js';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { QueryContext } from '../../context';
import { Synths } from '../../currency';
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
			].map((val) => new BigNumber(formatEther(val)));

			let totalValue = new BigNumber(0);

			const supplyData: SynthTotalSupply[] = [];
			for (let i = 0; i < synthTotalSupplies[0].length; i++) {
				let value = new BigNumber(formatEther(synthTotalSupplies[2][i]));
				const name = parseBytes32String(synthTotalSupplies[0][i]);
				const totalSupply = new BigNumber(formatEther(synthTotalSupplies[1][i]));

				switch (name) {
					case Synths.sBTC: {
						const negativeEntries = btcShorts.plus(btcBorrows);

						value = totalSupply.minus(negativeEntries).times(btcPrice);
						break;
					}

					case Synths.sETH: {
						const multiCollateralLoansETH = ethShorts.plus(ethBorrows);
						const negativeEntries = multiCollateralLoansETH.plus(oldLoansETH).plus(wrapprSETH);

						value = totalSupply.minus(negativeEntries).times(ethPrice);
						break;
					}

					case Synths.sUSD: {
						const multiCollateralLoansSUSD = susdShorts.plus(susdBorrows);
						const negativeEntries = multiCollateralLoansSUSD.plus(oldLoansSUSD).plus(wrapprSUSD);

						value = totalSupply.minus(negativeEntries);
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
					poolProportion: new BigNumber(0), // true value to be computed in next step
				});
				totalValue = totalValue.plus(value);
			}

			// Add proportion data to each SynthTotalSupply object
			const supplyDataWithProportions = supplyData.map((datum) => ({
				...datum,
				poolProportion: totalValue.isGreaterThan(0)
					? datum.value.dividedBy(totalValue)
					: new BigNumber(0),
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
