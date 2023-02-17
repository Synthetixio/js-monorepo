import { useContext } from 'react';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';
import { ContractContext } from '@snx-v2/ContractContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { StakedSNXResponse, useTotalStakedSNX } from '@snx-v2/useTotalStakedSNX';
import Wei, { wei } from '@synthetixio/wei';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useFeePeriodMultiNetwork } from '@snx-v2/useFeePeriodMultiNetwork';

// exported for tests
export const calculateGlobalStakingFeeApr = ({
  SNXRate,
  totalStakedData,
  feePeriodData,
}: {
  SNXRate: Wei;
  totalStakedData: StakedSNXResponse;
  feePeriodData: {
    mainnetDistributedFees: Wei;
    optimismDistributedFees: Wei;
  };
}) => {
  const totalFeesDistributed = feePeriodData.mainnetDistributedFees.add(
    feePeriodData.optimismDistributedFees
  );
  const collateralValue = wei(totalStakedData.stakedSnx.ethereum)
    .add(totalStakedData.stakedSnx.optimism)
    .mul(SNXRate);
  const yearlyExtrapolatedRewards = totalFeesDistributed.mul(WEEKS_IN_YEAR);
  return yearlyExtrapolatedRewards.div(collateralValue);
};

// exported for tests
export const calculateGlobalStakingRewardsApr = ({
  isL2,
  feePeriodData,
  totalStakedData,
}: {
  totalStakedData: StakedSNXResponse;
  feePeriodData: {
    mainnetDistributedRewards: Wei;
    optimismDistributedRewards: Wei;
  };
  isL2: boolean;
}) => {
  const distributedRewardsForNetwork = isL2
    ? feePeriodData.optimismDistributedRewards
    : feePeriodData.mainnetDistributedRewards;
  const stakedForNetwork = isL2
    ? wei(totalStakedData.stakedSnx.optimism)
    : wei(totalStakedData.stakedSnx.ethereum);

  const yearlyExtrapolatedRewards = distributedRewardsForNetwork.mul(WEEKS_IN_YEAR);
  return yearlyExtrapolatedRewards.div(stakedForNetwork);
};

export const useGlobalStakingApr = () => {
  const { data: feePeriods } = useFeePeriodMultiNetwork(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: totalStakedData } = useTotalStakedSNX();
  const { networkId } = useContext(ContractContext);
  const SNXRate = exchangeRateData?.SNX;

  const isL2 = networkId === NetworkIdByName['mainnet-ovm'];
  if (!SNXRate || !feePeriods || !totalStakedData) {
    return { isLoading: true, data: undefined };
  }

  const mainnetDistributedFees = wei(feePeriods.feePeriodMainnet.feesToDistribute);
  const mainnetDistributedRewards = wei(feePeriods.feePeriodMainnet.rewardsToDistribute);
  const optimismDistributedFees = wei(feePeriods.feePeriodOptimism.feesToDistribute);
  const optimismDistributedRewards = wei(feePeriods.feePeriodOptimism.rewardsToDistribute);

  const feesApr = calculateGlobalStakingFeeApr({
    totalStakedData,
    SNXRate,
    feePeriodData: { mainnetDistributedFees, optimismDistributedFees },
  });

  const snxApr = calculateGlobalStakingRewardsApr({
    totalStakedData,
    isL2,
    feePeriodData: { mainnetDistributedRewards, optimismDistributedRewards },
  });
  return { data: { combinedApr: feesApr.add(snxApr), feesApr, snxApr }, isLoading: false };
};
