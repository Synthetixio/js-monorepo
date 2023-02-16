import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { useDebtShareDataPeriod } from '@snx-v2/useDebtShareDataPeriod';
import { useFeePeriodMultiNetwork } from '@snx-v2/useFeePeriodMultiNetwork';

export const useFeesBurnedInPeriod = (period = 1 /* Defaults to previous period*/) => {
  const { walletAddress, networkId } = useContext(ContractContext);
  const { data: debtShareData } = useDebtShareDataPeriod(period);
  const { data: feePeriods } = useFeePeriodMultiNetwork(period);
  return useQuery({
    queryKey: ['stakingV2', 'useFeesBurnedInPeriod', networkId, walletAddress],
    queryFn: async () => {
      if (!walletAddress || !debtShareData || !feePeriods) {
        throw Error('Query should not be enabled');
      }

      const { feePeriodMainnet, feePeriodOptimism } = feePeriods;

      const { userDebtSharePercentage } = debtShareData;
      const totalBurn = wei(feePeriodOptimism.feesToDistribute).add(
        wei(feePeriodMainnet.feesToDistribute)
      );

      return totalBurn.mul(userDebtSharePercentage);
    },

    enabled: Boolean(walletAddress && debtShareData && feePeriods),
    staleTime: 1000,
  });
};
