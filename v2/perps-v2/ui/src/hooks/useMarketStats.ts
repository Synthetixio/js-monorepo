import { useQuery } from '@apollo/client';
import { wei } from '@synthetixio/wei';
import { subDays } from 'date-fns';
import { MARKETS_QUERY } from '../queries/dashboard';
import { DailyMarketStat_OrderBy, OrderDirection } from '../__generated__/graphql';

function getDateRange(upperDaysAgo = 0, lowerDaysAgo = 1) {
  const now = new Date();

  const upper = subDays(now, upperDaysAgo).toISOString().split('T')[0];
  // We fetch the day prior to yesterday so we can calculate 24 hour volume change
  const lower = subDays(now, lowerDaysAgo).toISOString().split('T')[0];
  return { upper, lower };
}

export function useMarketStats() {
  const { upper, lower } = getDateRange(2, 3); // 1 day ago, 2 days ago UTC

  const { data: marketsData, loading } = useQuery(MARKETS_QUERY, {
    variables: {
      where: { day_gte: lower, day_lte: upper },
      orderBy: DailyMarketStat_OrderBy.Volume,
      orderDirection: OrderDirection.Desc,
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
      .mul(100);

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
