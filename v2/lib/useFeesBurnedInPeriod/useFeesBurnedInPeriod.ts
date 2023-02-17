import { useContext } from 'react';
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
  const { walletAddress } = useContext(ContractContext);
  const { data: debtShareData } = useDebtShareDataPeriod(period);
  const { data: feePeriods } = useFeePeriodMultiNetwork(period);

  if (!walletAddress || !debtShareData || !feePeriods) {
    return { isLoading: true, data: undefined };
  }
  const mainnetDistributedFees = wei(feePeriods.feePeriodMainnet.feesToDistribute);
  const optimismDistributedFees = wei(feePeriods.feePeriodOptimism.feesToDistribute);
  const { userDebtSharePercentage } = debtShareData;

  return {
    isLoading: false,
    data: calculateFeesBurned({
      mainnetDistributedFees,
      optimismDistributedFees,
      userDebtSharePercentage,
    }),
  };
};
