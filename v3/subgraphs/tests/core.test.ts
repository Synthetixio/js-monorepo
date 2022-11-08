import {
  PoolConfigurationSet,
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
} from '../generated/core/PoolModule';
import { newMockEvent, test, assert } from 'matchstick-as/assembly';
import { Address, ethereum, BigInt } from '@graphprotocol/graph-ts';
import { address } from './constants';
import { handlePoolCreated } from '../src/core';

function createBlock(timestamp: number, blockNumber: number) {
  return { timestamp, blockNumber };
}

function createPoolCreatedEvent(id: string, owner: string): PoolCreated {
  let newPoolCreatedEvent = newMockEvent() as PoolCreated;
  const block = createBlock(123, 321);
  newPoolCreatedEvent.parameters = new Array();
  newPoolCreatedEvent.parameters.push(new ethereum.EventParam('id', ethereum.Value.fromI32(id)));
  newPoolCreatedEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(Address.fromString(owner)))
  );
  newPoolCreatedEvent.block.timestamp = BigInt.fromI64(block.timestamp);
  newPoolCreatedEvent.block.number = BigInt.fromI64(block.blockNumber);
  return newPoolCreatedEvent;
}

test('handlePoolCreatedEvent', () => {
  let newPool = createPoolCreatedEvent('1', address);
  handlePoolCreated(newPool);
  assert.fieldEquals('Pool', '1', 'id', '1');
  assert.fieldEquals('Pool', '1', 'id', '1');
});
