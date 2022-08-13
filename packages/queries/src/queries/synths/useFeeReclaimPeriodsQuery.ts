import { useQuery, UseQueryOptions } from 'react-query';
import { formatBytes32String } from '@ethersproject/strings';
import { CurrencyKey, Synth } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';
import { formatEther } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';

import { QueryContext } from '../../context';
import { SynthFeeAndWaitingPeriod } from '../../types';

const useFeeReclaimPeriodsQuery = (
  ctx: QueryContext,
  walletAddress: string,
  options?: UseQueryOptions<SynthFeeAndWaitingPeriod[]>
) => {
  return useQuery<SynthFeeAndWaitingPeriod[]>(
    ['synths', 'feeReclaimPeriods', ctx.networkId],
    async () => {
      if (!ctx.snxjs) return [];

      const {
        synths,
        contracts: { Exchanger },
      } = ctx.snxjs;

      const loadWaitingPeriod = async (currencyKey: Synth) => {
        const maxSecsLeftInWaitingPeriod = (await Exchanger.maxSecsLeftInWaitingPeriod(
          walletAddress,
          formatBytes32String(currencyKey.name)
        )) as BigNumberish;

        return Number(maxSecsLeftInWaitingPeriod);
      };

      const loadFee = async (currencyKey: Synth) => {
        const [rebate, reclaim, noOfTrades] = await Exchanger.settlementOwing(
          walletAddress,
          formatBytes32String(currencyKey.name)
        );
        return {
          fee: wei(formatEther(rebate.sub(reclaim))),
          noOfTrades: Number(noOfTrades.toString()),
        };
      };

      const waitingPeriods = await Promise.all(synths.map(loadWaitingPeriod));
      const fees = await Promise.all(synths.map(loadFee));
      return synths.map((currencyKey, i) => {
        const { fee, noOfTrades } = fees[i];
        return {
          currencyKey: currencyKey.name as CurrencyKey,
          waitingPeriod: waitingPeriods[i],
          fee,
          noOfTrades,
        };
      });
    },
    {
      enabled: !!ctx.snxjs && !!walletAddress,
      ...options,
    }
  );
};

export default useFeeReclaimPeriodsQuery;
