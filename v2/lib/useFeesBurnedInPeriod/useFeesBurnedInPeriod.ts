import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import Wei, { wei } from '@synthetixio/wei';
import { useDebtShareDataPeriod } from '@snx-v2/useDebtShareDataPeriod';
import { useFeePeriodMultiNetwork } from '@snx-v2/useFeePeriodMultiNetwork';

// exported for tests
export const calculateFeesBurned = ({
  mainnetDistributedFees,
  optimismDistributedFees,
  userDebtSharePercentage,
}: {
  mainnetDistributedFees: Wei;
  optimismDistributedFees: Wei;
  userDebtSharePercentage: Wei;
}) => {
  const totalBurn = mainnetDistributedFees.add(optimismDistributedFees);
  return totalBurn.mul(userDebtSharePercentage);
};
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
      const mainnetDistributedFees = wei(feePeriods.feePeriodMainnet.feesToDistribute);
      const optimismDistributedFees = wei(feePeriods.feePeriodOptimism.feesToDistribute);
      const { userDebtSharePercentage } = debtShareData;

      return calculateFeesBurned({
        mainnetDistributedFees,
        optimismDistributedFees,
        userDebtSharePercentage,
      });
    },

    enabled: Boolean(walletAddress && debtShareData && feePeriods),
    staleTime: 1000,
  });
};
