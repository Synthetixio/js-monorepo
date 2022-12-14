import { BigNumber } from 'ethers';
import { MarketSnapshotByWeekSchema, PoolSchema } from '../hooks/useGetPoolData';
import { z } from 'zod';

export const calculateMarketPnl = (netIssuance: BigNumber, reportedDebt: BigNumber) =>
  reportedDebt.add(netIssuance).mul(-1);

type MarketSnapshotByWeek = z.infer<typeof MarketSnapshotByWeekSchema>;
export const calculatePnlGrowth = (marketSnapshots?: MarketSnapshotByWeek[]) => {
  if (!marketSnapshots || marketSnapshots.length < 2) return undefined;
  const first = marketSnapshots[0].pnl;
  const current = marketSnapshots[marketSnapshots.length - 1].pnl;
  const value = current.sub(first);
  const percentage = value.div(first);
  return { value, percentage };
};

type PoolData = z.infer<typeof PoolSchema>;
export const calculateTotalMarketPerformance = (poolData: PoolData) => {
  return poolData.configurations.reduce((acc, { market }) => {
    return acc.add(market.pnl);
  }, BigNumber.from(0));
};
