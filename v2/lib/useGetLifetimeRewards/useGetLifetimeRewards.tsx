import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useQuery } from '@tanstack/react-query';
import { useFeesClaimed } from '../useFeesClaimed';

export const useGetLifetimeRewards = () => {
  const { data: feesClaimedData } = useFeesClaimed();
  const { data: exchangeRateData } = useExchangeRatesData();
  const SNXRate = exchangeRateData?.SNX?.toNumber();

  const enabled = Boolean(SNXRate && feesClaimedData);
  return useQuery(
    ['useGetLifetimeRewards', SNXRate, Boolean(feesClaimedData)],
    () => {
      if (!SNXRate || !feesClaimedData) throw Error('Missing required data');
      let snxTotal = 0;
      let usdTotal = 0;
      feesClaimedData?.forEach(({ value: usdAmount, rewards: snxAmount }) => {
        const snxUsdValue = snxAmount * SNXRate;
        snxTotal = snxTotal + snxUsdValue;
        usdTotal = usdTotal + usdAmount;
      });

      return { snxTotal, usdTotal, combinedTotal: snxTotal + usdTotal };
    },
    { enabled, staleTime: 10000 }
  );
};
