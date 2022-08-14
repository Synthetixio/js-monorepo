import { useQuery, UseQueryOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { formatBytes32String, parseBytes32String } from '@ethersproject/strings';
import { formatEther } from '@ethersproject/units';

import { CurrencyKey } from '@synthetixio/contracts-interface';
import { CRYPTO_CURRENCY_MAP, iStandardSynth, synthToAsset } from '../../currency';
import { QueryContext } from '../../context';
import { Rates } from '../../types';
import { wei } from '@synthetixio/wei';

type CurrencyRate = BigNumberish;
type SynthRatesTuple = [string[], CurrencyRate[]];

// Additional commonly used currencies to fetch, besides the one returned by the SynthUtil.synthsRates
const additionalCurrencies = [CRYPTO_CURRENCY_MAP.SNX].map(formatBytes32String);

const useExchangeRatesQuery = (ctx: QueryContext, options?: UseQueryOptions<Rates>) => {
  return useQuery<Rates>(
    ['rates', 'exchangeRates', ctx.networkId],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const exchangeRates: Rates = {};

      const [synthsRates, ratesForCurrencies] = (await Promise.all([
        ctx.snxjs.contracts.SynthUtil.synthsRates(),
        ctx.snxjs.contracts.ExchangeRates.ratesForCurrencies(additionalCurrencies),
      ])) as [SynthRatesTuple, CurrencyRate[]];

      const synths = [...synthsRates[0], ...additionalCurrencies] as CurrencyKey[];
      const rates = [...synthsRates[1], ...ratesForCurrencies] as CurrencyRate[];

      synths.forEach((currencyKeyBytes32: CurrencyKey, idx: number) => {
        const currencyKey = parseBytes32String(currencyKeyBytes32) as CurrencyKey;
        const rate = Number(formatEther(rates[idx]));

        exchangeRates[currencyKey] = wei(rate);
        // only interested in the standard synths (sETH -> ETH, etc)
        if (iStandardSynth(currencyKey)) {
          exchangeRates[synthToAsset(currencyKey)] = wei(rate);
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
