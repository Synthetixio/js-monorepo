import { MarketSnapshotByWeekSchema, PoolSchema } from '../hooks/useGetPoolData';
import { z } from 'zod';
import Wei, { wei } from '@synthetixio/wei';

export const calculateMarketPnl = (netIssuance: Wei, reportedDebt: Wei) =>
  reportedDebt.add(netIssuance).mul(-1);

type MarketSnapshotByWeek = z.infer<typeof MarketSnapshotByWeekSchema>;
export const calculateSevenDaysPnlGrowth = (marketSnapshots?: MarketSnapshotByWeek[]) => {
  if (!marketSnapshots || marketSnapshots.length < 2) return undefined;
  const end = marketSnapshots[0].pnl;
  const start = marketSnapshots[1].pnl;
  if (start.eq(0)) {
    // cant grow from 0
    return undefined;
  }
  return { value: end.sub(start), percentage: end.sub(start).div(start) };
};

type PoolData = z.infer<typeof PoolSchema>;
export const calculatePoolPerformanceLifetime = (poolData: PoolData) => {
  return poolData.configurations.reduce((acc, { market }) => {
    return acc.add(market.pnl);
  }, wei(0));
};

export const calculatePoolPerformanceSevenDays = (poolData: PoolData) => {
  const total = calculatePoolPerformanceLifetime(poolData);
  const totalSevenDaysAgo = poolData.configurations.reduce((acc, { market }) => {
    return acc.add(market.market_snapshots_by_week[1]?.pnl || wei(0));
  }, wei(0));
  return {
    value: total.sub(totalSevenDaysAgo),
    growthPercentage: totalSevenDaysAgo.eq(0)
      ? undefined
      : total.sub(totalSevenDaysAgo).div(totalSevenDaysAgo),
  };
};
