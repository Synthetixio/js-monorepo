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
  const { networkId, walletAddress } = useContext(ContractContext);

  const { data: debtData } = useDebtData();
  const { data: previousFeePeriodData } = useFeePoolData(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: feesBurned } = useFeesBurnedInPeriod();
  const { data: debtShareData } = useDebtShareDataPeriod();
  const SNXRate = exchangeRateData?.SNX;
  const { debtBalance, targetCRatio, currentCRatio, collateral } = debtData || {};

  const stakedSnx = calculateStakedSnx({ targetCRatio, currentCRatio, collateral });

  const enabled = Boolean(
    stakedSnx && feesBurned && debtShareData && debtBalance?.gt(0) // This query is only enabled when we have data and user is staking (debt balance > 0)
  );
  return useQuery(
    ['useStakingApr', { enabled, walletAddress, networkId }],
    () => {
      if (!stakedSnx || !feesBurned || !previousFeePeriodData || !debtShareData || !SNXRate) {
        throw Error('Query missing required data');
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
      return { combinedApr: feesApr.add(snxApr), feesApr, snxApr };
    },
    { enabled, staleTime: 10000 }
  );
};
