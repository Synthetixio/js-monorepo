import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import Wei, { wei } from '@synthetixio/wei';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';
import { useFeesBurnedInPeriod } from '@snx-v2/useFeesBurnedInPeriod';
import { useDebtShareDataPeriod } from '@snx-v2/useDebtShareDataPeriod';

// exported for tests
export const calculateStakingFeeApr = ({
  stakedSnx,
  SNXRate,
  feesBurned,
}: {
  stakedSnx: Wei;
  SNXRate: Wei;
  feesBurned: Wei;
}) => {
  if (stakedSnx.eq(0) || feesBurned.eq(0)) {
    return wei(0);
  }
  const stakedValue = stakedSnx.mul(SNXRate);
  const yearlyExtrapolatedRewards = feesBurned.mul(WEEKS_IN_YEAR);

  return yearlyExtrapolatedRewards.div(stakedValue);
};

// exported for tests
export const calculateStakingRewardsApr = ({
  stakedSnx,
  distributedRewards,
  userDebtSharePercentageCurrentNetwork,
}: {
  stakedSnx: Wei;
  distributedRewards: Wei;
  userDebtSharePercentageCurrentNetwork: Wei;
}) => {
  if (stakedSnx.eq(0) || userDebtSharePercentageCurrentNetwork.eq(0)) {
    return wei(0);
  }
  const userSnxRewards = distributedRewards.mul(userDebtSharePercentageCurrentNetwork);
  const yearlyExtrapolatedRewards = userSnxRewards.mul(WEEKS_IN_YEAR);

  return yearlyExtrapolatedRewards.div(stakedSnx);
};

export const useStakingApr = () => {
  const { data: debtData } = useDebtData();
  const { data: previousFeePeriodData } = useFeePoolData(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: feesBurned } = useFeesBurnedInPeriod();
  const { data: debtShareData } = useDebtShareDataPeriod();
  const SNXRate = exchangeRateData?.SNX;
  const { targetCRatio, currentCRatio, collateral } = debtData || {};

  const stakedSnx = calculateStakedSnx({ targetCRatio, currentCRatio, collateral });

  if (!stakedSnx || !feesBurned || !previousFeePeriodData || !debtShareData || !SNXRate) {
    return { isLoading: true, data: undefined };
  }
  const feesApr = calculateStakingFeeApr({
    stakedSnx,
    SNXRate,
    feesBurned,
  });

  const snxApr = calculateStakingRewardsApr({
    stakedSnx,
    userDebtSharePercentageCurrentNetwork: debtShareData.userDebtSharePercentageCurrentNetwork,
    distributedRewards: previousFeePeriodData.rewardsToDistribute,
  });
  return { data: { combinedApr: feesApr.add(snxApr), feesApr, snxApr }, isLoading: false };
};
