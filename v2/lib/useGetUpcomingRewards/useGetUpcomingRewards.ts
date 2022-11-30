import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useGetLiquidationRewards } from '@snx-v2/useGetLiquidationRewards';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { useQuery } from '@tanstack/react-query';

export const useGetUpcomingRewards = () => {
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: liquidationData, isLoading: isLiquidationLoading } = useGetLiquidationRewards();
  const { data: rewardsData, isLoading: isRewardsLoading } = useRewardsAvailable();

  const SNXRate = exchangeRateData?.SNX?.toNumber();

  const enabled = Boolean(SNXRate && !isLiquidationLoading && !isRewardsLoading);
  return useQuery(
    [SNXRate],
    () => {
      if (!SNXRate || !liquidationData || !rewardsData) throw Error('Missing required data');
      let total = 0;

      if (!rewardsData?.hasClaimed) {
        // Fees component
        total += rewardsData?.sUSDRewards.toNumber();
        // Inflation Component
        const inflationComponent = rewardsData?.snxRewards.mul(SNXRate).toNumber();
        total += inflationComponent;
      }

      if (liquidationData?.liquidatorRewards.gt(0)) {
        // Liquidations Component
        total += liquidationData?.liquidatorRewards.mul(SNXRate).toNumber();
      }

      return total;
    },
    { enabled, staleTime: 10000 }
  );
};
