import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { useFeePool } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';

export const useFeePoolData = (period = 0) => {
  const { networkId } = useContext(ContractContext);
  const { data: FeePool } = useFeePool();

  return useQuery(
    ['staking', 'feePool', networkId, period],
    async () => {
      if (!FeePool) throw Error('Query should not be enabled if contracts are missing');

      const [feePeriod, feePeriodDurationBn] = await Promise.all([
        FeePool.recentFeePeriods(period),
        FeePool.feePeriodDuration(),
      ]);
      const startTime = Number(feePeriod.startTime);
      const feePeriodDuration = Number(feePeriodDurationBn);
      return {
        feePeriodDuration,
        startTime,
        feesToDistribute: wei(feePeriod.feesToDistribute),
        feesClaimed: wei(feePeriod.feesClaimed),
        rewardsToDistribute: wei(feePeriod.rewardsToDistribute),
        rewardsClaimed: wei(feePeriod.rewardsClaimed),
        nextFeePeriodStartDate: new Date((startTime + feePeriodDuration) * 1000),
      };
    },
    {
      enabled: Boolean(networkId && FeePool),
      staleTime: 1000,
    }
  );
};
