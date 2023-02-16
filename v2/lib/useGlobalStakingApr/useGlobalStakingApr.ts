import { useContext } from 'react';
import { WEEKS_IN_YEAR } from '@snx-v2/Constants';
import { ContractContext } from '@snx-v2/ContractContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useTotalStakedSNX } from '@snx-v2/useTotalStakedSNX';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useFeePeriodMultiNetwork } from '@snx-v2/useFeePeriodMultiNetwork';

export const calculateGlobalStakingApr = (previousWeekRewardsUsd?: Wei, collateralUsd?: Wei) => {
  if (!previousWeekRewardsUsd || !collateralUsd) {
    return undefined;
  }
  const yearlyExtrapolatedRewards = previousWeekRewardsUsd.mul(WEEKS_IN_YEAR);
  return yearlyExtrapolatedRewards.div(collateralUsd);
};

export const useGlobalStakingApr = (enabled: boolean) => {
  const { data: feePeriods } = useFeePeriodMultiNetwork(1);
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: totalStakedData } = useTotalStakedSNX();
  const { networkId } = useContext(ContractContext);
  const SNXRate = exchangeRateData?.SNX;

  const isL2 = networkId === NetworkIdByName['mainnet-ovm'];
  const queryEnabled = Boolean(SNXRate && enabled && feePeriods);

  return useQuery(
    ['useGlobalStakingApr', isL2, queryEnabled],
    () => {
      if (!SNXRate || !feePeriods || !totalStakedData) {
        throw Error('Query missing required data');
      }
      const mainnetFees = wei(feePeriods.feePeriodMainnet.feesToDistribute);
      const mainnetRewards = wei(feePeriods.feePeriodMainnet.rewardsToDistribute);
      const optimismFees = wei(feePeriods.feePeriodOptimism.feesToDistribute);
      const optimismRewards = wei(feePeriods.feePeriodOptimism.rewardsToDistribute);

      const feesApr = calculateGlobalStakingApr(
        mainnetFees.add(optimismFees),
        wei(totalStakedData.stakedSnx.ethereum).add(totalStakedData.stakedSnx.optimism).mul(SNXRate)
      );
      const snxRewardsForNetwork = isL2 ? optimismRewards : mainnetRewards;
      const stakedForNetwork = isL2
        ? totalStakedData.stakedSnx.optimism
        : totalStakedData.stakedSnx.ethereum;

      const snxApr = calculateGlobalStakingApr(
        snxRewardsForNetwork.mul(SNXRate),
        wei(stakedForNetwork).mul(SNXRate)
      );
      return { combinedApr: feesApr?.add(snxApr || 0), feesApr, snxApr };
    },
    { enabled: queryEnabled, staleTime: 10000 }
  );
};
