import { Market, MarketSnapshotByBlock } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function createMarketSnapshotByBlock(marketWithLatestValues: Market): void {
  const blockNumber = marketWithLatestValues.updated_at_block;
  const marketSnapshotId = marketWithLatestValues.id
    .toString()
    .concat('-')
    .concat(blockNumber.toString());
  let marketSnapshotByBlock = MarketSnapshotByBlock.load(marketSnapshotId);

  if (!marketSnapshotByBlock) {
    // If we have two events in the same block update the data fields
    marketSnapshotByBlock = new MarketSnapshotByBlock(marketSnapshotId);
    marketSnapshotByBlock.updates_in_period = new BigInt(0);
    marketSnapshotByBlock.market = marketWithLatestValues.id;
    marketSnapshotByBlock.created_at = marketWithLatestValues.created_at;
    marketSnapshotByBlock.created_at_block = marketWithLatestValues.created_at_block;
  }

  marketSnapshotByBlock.usd_deposited = marketWithLatestValues.usd_deposited;
  marketSnapshotByBlock.usd_withdrawn = marketWithLatestValues.usd_withdrawn;
  marketSnapshotByBlock.net_issuance = marketWithLatestValues.net_issuance;
  marketSnapshotByBlock.reported_debt = marketWithLatestValues.reported_debt;
  marketSnapshotByBlock.updated_at = marketWithLatestValues.updated_at;
  marketSnapshotByBlock.updated_at_block = marketWithLatestValues.updated_at_block;
  marketSnapshotByBlock.updates_in_period = marketSnapshotByBlock.updates_in_period.plus(
    new BigInt(1)
  );

  marketSnapshotByBlock.save();
}
