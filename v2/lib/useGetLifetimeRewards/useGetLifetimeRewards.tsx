import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useQuery } from '@tanstack/react-query';
import { getUnixTime } from 'date-fns';
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

      feesClaimedData?.forEach(({ value: usdAmount, rewards: snxAmount, timestamp }) => {
        const snxUsdValue = snxAmount * SNXRate;
        snxTotal = snxTotal + snxUsdValue;

        const schedar = getUnixTime(new Date(2023, 2, 15, 13, 0, 0));

        // If timestamp is before schedar release, they were manually claimed
        // NOT burned, and we add them to the total
        if (timestamp < schedar) {
          usdTotal = usdTotal + usdAmount;
        }
      });

      return { snxTotal, usdTotal, combinedTotal: snxTotal + usdTotal };
    },
    { enabled, staleTime: 10000 }
  );
};
