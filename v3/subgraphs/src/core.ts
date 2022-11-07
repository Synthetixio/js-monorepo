import { BigInt } from '@graphprotocol/graph-ts';
import { PoolCreated } from '../generated/core/PoolModule';
import { PoolCreated as PoolCreatedSchema } from '../generated/schema';

export function handlePoolCreated(event: PoolCreated): void {
  let newPool = new PoolCreatedSchema(event.params.poolId.toString());
  newPool.owner = event.params.owner;
  newPool.timestamp = event.block.timestamp;
  newPool.block = event.block.number;
  newPool.save();
}
