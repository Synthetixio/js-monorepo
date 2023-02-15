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
    ['stakingV2', 'feePool', networkId, period, walletAddress],
    async () => {
      if (!FeePool) throw Error('Query should not be enabled if contracts are missing');

      const [feePeriod, feePeriodDurationBn, feesBurned] = await Promise.all([
        FeePool.recentFeePeriods(period),
        FeePool.feePeriodDuration(),
        walletAddress ? FeePool.feesBurned(walletAddress) : wei(0),
      ]);

      const startTime = Number(feePeriod.startTime);
      const feePeriodDuration = Number(feePeriodDurationBn);

      return {
        feePeriodDuration,
        startTime,
        nextFeePeriodStartDate: add(new Date(startTime * 1000), { seconds: feePeriodDuration }),
        feesToDistribute: wei(feePeriod.feesToDistribute),
        rewardsToDistribute: wei(feePeriod.rewardsToDistribute),
        feesBurned: wei(feesBurned),
      };
    },
    {
      enabled: Boolean(networkId && FeePool),
      staleTime: 1000,
    }
  );
};
