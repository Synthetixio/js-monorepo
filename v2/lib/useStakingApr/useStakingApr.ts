import { useContext } from 'react';
import { useDebtData } from '@snx-v2/useDebtData';
import { useQuery } from '@tanstack/react-query';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import Wei, { wei } from '@synthetixio/wei';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';
import { useFeesBurnedInPeriod } from '@snx-v2/useFeesBurnedInPeriod';
import { useDebtShareDataPeriod } from '@snx-v2/useDebtShareDataPeriod';
import { ContractContext } from '@snx-v2/ContractContext';

export const calculateStakingApr = ({
  stakedValue,
  previousWeekRewardsUsd,
}: {
  stakedValue?: Wei;
  previousWeekRewardsUsd?: Wei;
}) => {
  if (!stakedValue || !previousWeekRewardsUsd) {
    return undefined;
  }
  if (stakedValue.eq(0) || previousWeekRewardsUsd.eq(0)) {
    return wei(0);
  }
  const yearlyExtrapolatedRewards = previousWeekRewardsUsd.mul(WEEKS_IN_YEAR);

  return yearlyExtrapolatedRewards.div(stakedValue);
};

export const useStakingApr = () => {
  const { networkId, walletAddress } = useContext(ContractContext);

  const { data: debtData } = useDebtData();
  const { data: previousFeePeriodData } = useFeePoolData(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: feeBurned } = useFeesBurnedInPeriod();
  const { data: debtShareData } = useDebtShareDataPeriod();
  const SNXRate = exchangeRateData?.SNX;
  const { debtBalance, targetCRatio, currentCRatio, collateral } = debtData || {};

  const stakedSnx = calculateStakedSnx({ targetCRatio, currentCRatio, collateral });
  const stakedValue = SNXRate ? stakedSnx.mul(SNXRate) : undefined;
  const enabled = Boolean(
    stakedValue && feeBurned && debtShareData && debtBalance?.gt(0) // This query is only enabled when we have data and user is staking (debt balance > 0)
  );
  return useQuery(
    ['useStakingApr', { enabled, walletAddress, networkId }],
    () => {
      if (
        !stakedValue ||
        !debtBalance ||
        !feeBurned ||
        !previousFeePeriodData ||
        !debtShareData ||
        !exchangeRateData?.SNX
      ) {
        throw Error('Query missing required data');
      }
      const snxRewardsUsd = previousFeePeriodData.rewardsToDistribute
        .mul(exchangeRateData.SNX)
        .mul(debtShareData.userDebtSharePercentage);
      const combinedApr = calculateStakingApr({
        stakedValue,
        previousWeekRewardsUsd: feeBurned.add(snxRewardsUsd),
      });

      const feesApr = calculateStakingApr({
        stakedValue,
        previousWeekRewardsUsd: feeBurned,
      });

      const snxApr = calculateStakingApr({
        stakedValue,
        previousWeekRewardsUsd: snxRewardsUsd,
      });
      return { combinedApr, feesApr, snxApr };
    },
    { enabled, staleTime: 10000 }
  );
};
