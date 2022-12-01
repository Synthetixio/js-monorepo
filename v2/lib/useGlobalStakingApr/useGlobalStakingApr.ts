import { useContext } from 'react';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';
import { ContractContext } from '@snx-v2/ContractContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { useTotalIssuedSynthsExcludeOtherCollateral } from '@snx-v2/useTotalIssuedSynthsExcludeOtherCollateral';
import { StakedSNXResponse, useTotalStakedSNX } from '@snx-v2/useTotalStakedSNX';
import Wei from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { calculateWeeklyRewardsInUsd } from '@snx-v2/calculateWeeklyRewardsInUsd';

export const calculateGlobalStakingApr = (
  isL2: boolean,
  SNXRate?: Wei,
  previousWeekRewardsUsd?: Wei,
  stakedSnxData?: StakedSNXResponse
) => {
  if (!SNXRate || !previousWeekRewardsUsd || !stakedSnxData) {
    return undefined;
  }
  const stakedSnxForNetwork = isL2
    ? stakedSnxData.stakedSnx.optimism
    : stakedSnxData.stakedSnx.ethereum;
  const yearlyExtrapolatedRewards = previousWeekRewardsUsd.mul(WEEKS_IN_YEAR);

  return yearlyExtrapolatedRewards.div(SNXRate.mul(stakedSnxForNetwork));
};

export const useGlobalStakingApr = (enabled: boolean) => {
  const { data: totalsUSDDebt } = useTotalIssuedSynthsExcludeOtherCollateral();
  const { data: previousFeePeriodData } = useFeePoolData(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: totalStakedData } = useTotalStakedSNX();
  const { networkId } = useContext(ContractContext);
  const SNXRate = exchangeRateData?.SNX;
  const previousWeekRewardsUsd = calculateWeeklyRewardsInUsd(
    exchangeRateData?.SNX,
    previousFeePeriodData?.feesToDistribute,
    previousFeePeriodData?.rewardsToDistribute
  );
  const isL2 = networkId === NetworkIdByName['mainnet-ovm'];
  const queryEnabled = Boolean(SNXRate && totalsUSDDebt && previousWeekRewardsUsd && enabled);

  return useQuery(
    ['useGlobalStakingApr', isL2, queryEnabled],
    () => {
      if (!SNXRate || !previousWeekRewardsUsd || !totalStakedData) {
        throw Error('Query missing required data');
      }
      return calculateGlobalStakingApr(isL2, SNXRate, previousWeekRewardsUsd, totalStakedData);
    },
    { enabled: queryEnabled, staleTime: 10000 }
  );
};
