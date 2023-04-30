import { useQuery } from '@apollo/client';
import { wei } from '@synthetixio/wei';
import { format, subDays } from 'date-fns';
import { MARKETS_QUERY } from '../queries/dashboard';
import { DailyMarketStat_OrderBy } from '../__generated__/graphql';

function getDateRange() {
  const now = new Date();
  const upper = format(subDays(now, 2), 'yyyy-MM-dd');
  // We fetch the day prior to yesterday so we can calculate 24 hour volume change
  const lower = format(subDays(now, 3), 'yyyy-MM-dd');
  return { upper, lower };
}

export function useMarketStats() {
  const { upper, lower } = getDateRange();

  const { data: marketsData, loading } = useQuery(MARKETS_QUERY, {
    variables: {
      where: { day_gte: lower, day_lte: upper },
      orderBy: DailyMarketStat_OrderBy.Volume,
    },
  });

  // First, we want to get the highest for the current and previous dat
  const todaysResults =
    marketsData?.dailyMarketStats.filter((market) => market.day === upper).slice(0, 3) || [];
  const yesterdaysResults =
    marketsData?.dailyMarketStats.filter((market) => market.day === lower) || [];

  // Then we want to get the difference between the current day and the previous day
  const data = todaysResults.map((market) => {
    // Find the same market in yesterdays results
    const yesterday = yesterdaysResults.find((yesterdayMarket) => {
      return yesterdayMarket.market.id === market.market.id;
    });

    // In the off chance there was no volume yesterday we set volume to 0
    const percentageDifference = wei(market.volume, 18, true)
      .sub(wei(yesterday?.volume || 0, 18, true))
      .div(wei(yesterday?.volume || 1, 18, true))
      .mul(100)
      .toNumber();

    return {
      ...market,
      percentageDifference,
    };
  });

  return {
    data,
    loading,
  };
}
