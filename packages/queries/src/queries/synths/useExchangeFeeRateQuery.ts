import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BigNumber } from '@ethersproject/bignumber';
import { formatBytes32String } from '@ethersproject/strings';

import Wei, { wei } from '@synthetixio/wei';

import { CurrencyKey } from '@synthetixio/contracts-interface';

import { QueryContext } from '../../context';

const useExchangeFeeRate = (
  ctx: QueryContext,
  quoteCurrencyKey: CurrencyKey | null,
  baseCurrencyKey: CurrencyKey | null,
  options?: UseQueryOptions<Wei>
) => {
  return useQuery<Wei>(
    ['synths', 'exchangeFeeRate', ctx.networkId, quoteCurrencyKey, baseCurrencyKey],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const feeRateForExchange = (await ctx.snxjs.contracts.Exchanger.feeRateForExchange(
        formatBytes32String(quoteCurrencyKey!),
        formatBytes32String(baseCurrencyKey!)
      )) as BigNumber;

      return wei(feeRateForExchange);
    },
    {
      enabled: !!ctx.snxjs && quoteCurrencyKey != null && baseCurrencyKey != null,
      ...options,
    }
  );
};

export default useExchangeFeeRate;
