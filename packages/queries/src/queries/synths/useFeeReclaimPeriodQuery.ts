import { useQuery, UseQueryOptions } from 'react-query';
import { formatBytes32String } from '@ethersproject/strings';
import { BigNumberish } from '@ethersproject/bignumber';

import { CurrencyKey } from '@synthetixio/contracts-interface';
import { QueryContext } from '../../context';

const useFeeReclaimPeriodQuery = (
  ctx: QueryContext,
  currencyKey: CurrencyKey | null,
  walletAddress: string | null,
  options?: UseQueryOptions<number>
) => {
  return useQuery<number>(
    ['synths', 'feeReclaimPeriod', ctx.networkId, currencyKey],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const maxSecsLeftInWaitingPeriod =
        (await ctx.snxjs.contracts.Exchanger.maxSecsLeftInWaitingPeriod(
          walletAddress,
          formatBytes32String(currencyKey!)
        )) as BigNumberish;

      return Number(maxSecsLeftInWaitingPeriod);
    },
    {
      enabled: !!ctx.snxjs && currencyKey != null && !!walletAddress,
      ...options,
    }
  );
};

export default useFeeReclaimPeriodQuery;
