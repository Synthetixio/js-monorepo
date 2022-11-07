import { PoolCreated, PoolNameUpdated } from '../generated/core/PoolModule';
import { Pool } from '../generated/schema';

export function handlePoolCreated(event: PoolCreated): void {
  let newPool = new Pool(event.params.poolId.toString());
  newPool.owner = event.params.owner;
  newPool.created_at = event.block.timestamp;
  newPool.created_at_block = event.block.number;
  newPool.save();
}

export function handlePoolNameUpdated(event: PoolNameUpdated): void {
  let pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.updated_at_block = event.block.number;
    pool.updated_at = event.block.timestamp;
    pool.sender = event.params.sender;
    pool.name = event.params.name.toString();
    pool.save();
  }
}
