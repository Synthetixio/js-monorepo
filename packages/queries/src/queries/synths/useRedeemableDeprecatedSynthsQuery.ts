import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';
import { CurrencyKey } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { DeprecatedSynthBalance, DeprecatedSynthsBalances, Rates } from '../../types';
import { getExchangeRatesForCurrencies } from '../../currency';
import { getProxySynthSymbol } from '../../utils';

const useRedeemableDeprecatedSynthsQuery = (
	ctx: QueryContext,
	walletAddress: string | null,
	exchangeRates: Rates | null,
	selectedPriceCurrencyName: CurrencyKey,
	options?: UseQueryOptions<DeprecatedSynthsBalances>
) => {
	return useQuery<DeprecatedSynthsBalances>(
		['WalletBalances', 'RedeemableDeprecatedSynths', ctx.networkId, walletAddress],
		async () => {
			const {
				contracts: { SynthRedeemer: Redeemer },
			} = ctx.snxjs!;
			const synthDeprecatedFilter = Redeemer.filters.SynthDeprecated();
			const deprecatedSynthsEvents = await Redeemer.queryFilter(synthDeprecatedFilter);
			const deprecatedProxySynthsAddresses: string[] = deprecatedSynthsEvents.map(
				(e) => e.args?.synth ?? ''
			);
			const deprecatedSynths = await Promise.all(
				deprecatedProxySynthsAddresses.map((addr) => getProxySynthSymbol(ctx.provider!, addr))
			);

			const getRedeemableSynthBalance = async (proxyAddress: string) => {
				const balance = await Redeemer.balanceOf(proxyAddress, walletAddress);
				return wei(balance).div(1e18);
			};
			const balances = await Promise.all(
				deprecatedProxySynthsAddresses.map(getRedeemableSynthBalance)
			);

			let totalUSDBalance = wei(0);

			const cryptoBalances: DeprecatedSynthBalance[] = balances.map((balance, i) => {
				const currencyKey = deprecatedSynths[i] as CurrencyKey;
				let synthPriceRate = wei(1);
				try {
					synthPriceRate = getExchangeRatesForCurrencies(
						exchangeRates,
						currencyKey,
						selectedPriceCurrencyName
					);
				} catch (e) {}

				const usdBalance = balance.mul(wei(synthPriceRate));
				totalUSDBalance = totalUSDBalance.add(usdBalance);
				return {
					currencyKey,
					balance,
					usdBalance,
					proxyAddress: deprecatedProxySynthsAddresses[i],
				};
			});
			return {
				balances: cryptoBalances,
				totalUSDBalance,
			};
		},
		{
			enabled: !!ctx.networkId! && !!walletAddress,
			...options,
		}
	);
};

export default useRedeemableDeprecatedSynthsQuery;
