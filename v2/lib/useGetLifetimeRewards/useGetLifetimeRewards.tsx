import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useQuery } from '@tanstack/react-query';
import { useFeesClaimed } from '../useFeesClaimed';

export const useGetLifetimeRewards = () => {
  const { data: feesClaimedData } = useFeesClaimed();
  const { data: exchangeRateData } = useExchangeRatesData();
  const SNXRate = exchangeRateData?.SNX?.toNumber();

  const enabled = Boolean(SNXRate && feesClaimedData);
  return useQuery(
    [SNXRate, Boolean(feesClaimedData)],
    () => {
      if (!SNXRate || !feesClaimedData) throw Error('Missing required data');
      let total = 0;
      feesClaimedData?.forEach(({ value: usdAmount, rewards: snxAmount }) => {
        const snxUsdValue = snxAmount * SNXRate;
        total = total + usdAmount + snxUsdValue;
      });

      return total;
    },
    { enabled, staleTime: 10000 }
  );
};
