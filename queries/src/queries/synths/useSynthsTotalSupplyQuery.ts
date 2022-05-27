import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';

import { NetworkIdByName, Synths } from '@synthetixio/contracts-interface';
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
				contracts: { SynthUtil, ExchangeRates, CollateralManagerState, EtherWrapper },
			} = ctx.snxjs!;

			const {
				utils: { formatBytes32String, parseBytes32String, formatEther },
			} = ethers;

			const [sETHKey, sBTCKey, sUSDKey] = [Synths.sETH, Synths.sBTC, Synths.sUSD].map(
				formatBytes32String
			);

			const isL2 =
				NetworkIdByName['mainnet-ovm'] === ctx.networkId! ||
				NetworkIdByName['kovan-ovm'] === ctx.networkId!;

			const [
				synthTotalSupplies,

				unformattedEthPrice,
				unformattedBtcPrice,

				[unformattedETHBorrows, unformattedETHShorts],
				[unformattedBTCBorrows, unformattedBTCShorts],
				[unformattedSUSDBorrows, unformattedSUSDShorts],

				unformattedWrapprSETH,
				unformattedWrapprSUSD,
			] = await Promise.all([
				SynthUtil.synthsTotalSupplies(),
				ExchangeRates.rateForCurrency(sETHKey),
				ExchangeRates.rateForCurrency(sBTCKey),
				isL2 ? Promise.resolve(['0', '0']) : CollateralManagerState.totalIssuedSynths(sETHKey),
				isL2 ? Promise.resolve(['0', '0']) : CollateralManagerState.totalIssuedSynths(sBTCKey),
				isL2 ? Promise.resolve(['0', '0']) : CollateralManagerState.totalIssuedSynths(sUSDKey),
				isL2 ? Promise.resolve('0') : EtherWrapper.sETHIssued(),
				isL2 ? Promise.resolve('0') : EtherWrapper.sUSDIssued(),
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
			].map((val) => wei(formatEther(val)));

			let totalValue = wei(0);
			let totalSkewValue = wei(0);
			let totalStakersDebt = wei(0);
			let ethNegativeEntries = wei(0);
			let btcNegativeEntries = wei(0);
			let usdNegativeEntries = wei(0);

			const supplyData: SynthTotalSupply[] = [];
			for (let i = 0; i < synthTotalSupplies[0].length; i++) {
				const value = wei(formatEther(synthTotalSupplies[2][i]));
				const name = parseBytes32String(synthTotalSupplies[0][i]);
				const totalSupply = wei(formatEther(synthTotalSupplies[1][i]));

				let skewValue = value;

				switch (name) {
					case Synths.sBTC: {
						btcNegativeEntries = btcShorts.add(btcBorrows);

						skewValue = totalSupply.sub(btcNegativeEntries).mul(btcPrice);
						break;
					}

					case Synths.sETH: {
						const multiCollateralLoansETH = ethShorts.add(ethBorrows);
						ethNegativeEntries = multiCollateralLoansETH.add(wrapprSETH);

						skewValue = totalSupply.sub(ethNegativeEntries).mul(ethPrice);
						break;
					}

					case Synths.sUSD: {
						const multiCollateralLoansSUSD = susdShorts.add(susdBorrows);
						usdNegativeEntries = multiCollateralLoansSUSD.add(wrapprSUSD);

						skewValue = totalSupply.sub(usdNegativeEntries);
						break;
					}

					default:
				}

				supplyData.push({
					name,
					totalSupply,
					value,
					skewValue,
					poolProportion: wei(0), // true value to be computed in next step
				});
				totalValue = totalValue.add(value);
				totalSkewValue = totalSkewValue.add(skewValue.abs());
				totalStakersDebt = totalStakersDebt.add(skewValue);
			}

			// Add proportion data to each SynthTotalSupply object
			const supplyDataWithProportions = supplyData.map((datum) => ({
				...datum,
				poolProportion: totalSkewValue.gt(0) ? datum.skewValue.abs().div(totalSkewValue) : wei(0),
			}));

			const supplyDataMap: { [name: string]: SynthTotalSupply } = {};
			for (const synthSupply of supplyDataWithProportions) {
				supplyDataMap[synthSupply.name] = synthSupply;
			}

			return {
				totalValue,
				totalStakersDebt,
				supplyData: supplyDataMap,
				priceData: {
					ethPrice,
					btcPrice,
				},
				shortData: {
					// ethBorrows,
					// ethShorts,

					// btcBorrows,
					// btcShorts,

					// susdBorrows,
					// susdShorts,

					// wrapprSETH,
					// wrapprSUSD,

					// oldLoansETH,
					// oldLoansSUSD,
					ethNegativeEntries,
					btcNegativeEntries,
					usdNegativeEntries,
				},
				synthTotalSupplies,
			};
		},
		{
			enabled: !!ctx.snxjs,
			...options,
		}
	);
};

export default useSynthsTotalSupplyQuery;
