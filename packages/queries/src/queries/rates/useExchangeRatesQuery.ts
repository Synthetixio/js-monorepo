import { useQuery, UseQueryOptions } from 'react-query';
import { BigNumberish, ethers } from 'ethers';


import { CurrencyKey } from '@synthetixio/contracts-interface';
import { CRYPTO_CURRENCY_MAP, iStandardSynth, synthToAsset } from '../../currency';
import { QueryContext } from '../../context';
import { Rates } from '../../types';

type CurrencyRate = BigNumberish;
type SynthRatesTuple = [string[], CurrencyRate[]];

// Additional commonly used currencies to fetch, besides the one returned by the SynthUtil.synthsRates
const additionalCurrencies = [CRYPTO_CURRENCY_MAP.SNX].map(ethers.utils.formatBytes32String);

const useExchangeRatesQuery = (ctx: QueryContext, options?: UseQueryOptions<Rates>) => {
	return useQuery<Rates>(
		['rates', 'exchangeRates', ctx.networkId],
		async () => {
			const exchangeRates: Rates = {};

			const [synthsRates, ratesForCurrencies] = (await Promise.all([
				ctx.snxjs!.contracts.SynthUtil.synthsRates(),
				ctx.snxjs!.contracts.ExchangeRates.ratesForCurrencies(additionalCurrencies),
			])) as [SynthRatesTuple, CurrencyRate[]];

			const synths = [...synthsRates[0], ...additionalCurrencies] as CurrencyKey[];
			const rates = [...synthsRates[1], ...ratesForCurrencies] as CurrencyRate[];

			synths.forEach((currencyKeyBytes32: CurrencyKey, idx: number) => {
				const currencyKey = ethers.utils.parseBytes32String(currencyKeyBytes32) as CurrencyKey;
				const rate = Number(ethers.utils.formatEther(rates[idx]));

				exchangeRates[currencyKey] = rate;
				// only interested in the standard synths (sETH -> ETH, etc)
				if (iStandardSynth(currencyKey)) {
					exchangeRates[synthToAsset(currencyKey)] = rate;
				}
			});

			return exchangeRates;
		},
		{
			enabled: !!ctx.networkId,
			...options,
		}
	);
};

export default useExchangeRatesQuery;
