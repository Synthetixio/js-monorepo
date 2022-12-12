import { Market, MarketSnapshotByDay } from '../generated/schema';
import { BigInt, log } from '@graphprotocol/graph-ts';

export function createMarketSnapshotByDay(marketWithLatestValues: Market): void {
  const day = new Date(<i64>parseInt(marketWithLatestValues.updated_at.toString()));

  const marketSnapshotId = marketWithLatestValues.id
    .toString()
    .concat('-')
    .concat(day.toISOString().slice(0, 10));
  let marketSnapshotByDay = MarketSnapshotByDay.load(marketSnapshotId);

  if (!marketSnapshotByDay) {
    // If we have two events in the same block update the data fields
    marketSnapshotByDay = new MarketSnapshotByDay(marketSnapshotId);
    marketSnapshotByDay.updates_in_period = new BigInt(0);
    marketSnapshotByDay.market = marketWithLatestValues.id;
  }
  marketSnapshotByDay.usd_deposited = marketWithLatestValues.usd_deposited;
  marketSnapshotByDay.usd_withdrawn = marketWithLatestValues.usd_withdrawn;
  marketSnapshotByDay.net_issuance = marketWithLatestValues.net_issuance;
  marketSnapshotByDay.reported_debt = marketWithLatestValues.reported_debt;
  marketSnapshotByDay.timestamp = marketWithLatestValues.updated_at;
  marketSnapshotByDay.block_number = marketWithLatestValues.updated_at_block;
  marketSnapshotByDay.updates_in_period = marketSnapshotByDay.updates_in_period.plus(new BigInt(1));

  marketSnapshotByDay.save();
}
