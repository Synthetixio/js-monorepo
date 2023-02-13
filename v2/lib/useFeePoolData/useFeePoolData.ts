import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFeePool } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import add from 'date-fns/add';
import { wei } from '@synthetixio/wei';

export const useFeePoolData = (period = 0) => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const { data: FeePool } = useFeePool();

  return useQuery(
    ['stakingV2', 'feePool', networkId, period],
    async () => {
      if (!FeePool) throw Error('Query should not be enabled if contracts are missing');

      const [feePeriod, feePeriodDurationBn, totalFeesBurned, feesBurned, feesToBurn] =
        await Promise.all([
          FeePool.recentFeePeriods(period),
          FeePool.feePeriodDuration(),
          FeePool.totalFeesBurned(),
          FeePool.feesBurned(walletAddress),
          FeePool.feesToBurn(walletAddress),
        ]);

      console.log(FeePool, networkId, totalFeesBurned, feesBurned, feesToBurn);

      const startTime = Number(feePeriod.startTime);
      const feePeriodDuration = Number(feePeriodDurationBn);

      return {
        feePeriodDuration,
        startTime,
        nextFeePeriodStartDate: add(new Date(startTime * 1000), { seconds: feePeriodDuration }),
        feesToDistribute: wei(feePeriod.feesToDistribute),
        rewardsToDistribute: wei(feePeriod.rewardsToDistribute),
        totalFeesBurned: wei(totalFeesBurned),
        feesBurned: wei(feesBurned),
        feesToBurn: wei(feesToBurn),
      };
    },
    {
      enabled: Boolean(networkId && FeePool),
      staleTime: 1000,
    }
  );
};
