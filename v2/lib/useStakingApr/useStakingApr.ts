import { useDebtData } from '@snx-v2/useDebtData';
import { useQuery } from '@tanstack/react-query';
import { useTotalIssuedSynthsExcludeOtherCollateral } from '@snx-v2/useTotalIssuedSynthsExcludeOtherCollateral';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import Wei, { wei } from '@synthetixio/wei';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';

export const calculateWeeklyRewardsInUsd = (
  SNXRate?: Wei,
  feesToDistribute?: Wei,
  rewardsToDistribute?: Wei
) => {
  if (!feesToDistribute || !rewardsToDistribute || !SNXRate) return undefined;
  return feesToDistribute.add(SNXRate.mul(rewardsToDistribute));
};

export const calculateStakingApr = ({
  stakedValue,
  debtBalance,
  previousWeekRewardsUsd,
  totalsUSDDebt,
}: {
  stakedValue?: Wei;
  debtBalance?: Wei;
  previousWeekRewardsUsd?: Wei;
  totalsUSDDebt?: Wei;
}) => {
  if (!stakedValue || !debtBalance || !previousWeekRewardsUsd || !totalsUSDDebt) {
    return undefined;
  }
  if (stakedValue.eq(0) || debtBalance.eq(0) || previousWeekRewardsUsd.eq(0)) {
    return wei(0);
  }
  const yearlyExtrapolatedRewards = previousWeekRewardsUsd.mul(WEEKS_IN_YEAR);

  return yearlyExtrapolatedRewards.mul(debtBalance.div(totalsUSDDebt)).div(stakedValue);
};

export const useStakingApr = () => {
  const { data: debtData } = useDebtData();
  const { data: totalsUSDDebt } = useTotalIssuedSynthsExcludeOtherCollateral();
  const { data: previousFeePeriodData } = useFeePoolData(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const SNXRate = exchangeRateData?.SNX;
  const { debtBalance, targetCRatio, currentCRatio, collateral } = debtData || {};

  const stakedSnx = calculateStakedSnx({ targetCRatio, currentCRatio, collateral });
  const stakedValue = SNXRate ? stakedSnx.mul(SNXRate) : undefined;
  const previousWeekRewardsUsd = calculateWeeklyRewardsInUsd(
    exchangeRateData?.SNX,
    previousFeePeriodData?.feesToDistribute,
    previousFeePeriodData?.rewardsToDistribute
  );

  const enabled = Boolean(
    stakedValue && previousWeekRewardsUsd && totalsUSDDebt && debtBalance?.gt(0) // This query is only enabled when we have data and user is staking (debt balance > 0)
  );
  return useQuery(
    ['useStakingApr', enabled],
    () => {
      if (!stakedValue || !debtBalance || !previousWeekRewardsUsd || !totalsUSDDebt) {
        throw Error('Query missing required data');
      }
      return calculateStakingApr({
        stakedValue,
        previousWeekRewardsUsd,
        totalsUSDDebt,
        debtBalance,
      });
    },
    { enabled, staleTime: 10000 }
  );
};
