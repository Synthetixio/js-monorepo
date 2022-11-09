import { PoolCreated } from '../generated/PoolModule/PoolModule';
import { newMockEvent, test, assert } from 'matchstick-as/assembly/index';
import { Address, ethereum, BigInt, log } from '@graphprotocol/graph-ts';
import { address } from './constants';
import { handlePoolCreated } from '../src/core';

interface Block {
  timestamp: number;
  blockNumber: number;
}

function createBlock(timestamp: i32, blockNumber: i32): Map<string, i32> {
  const newBlock = new Map<string, i32>();
  newBlock.set('timestamp', timestamp);
  newBlock.set('blockNumber', blockNumber);
  return newBlock;
}

function createPoolCreatedEvent(id: i32, owner: string): PoolCreated {
  let newPoolCreatedEvent = changetype<PoolCreated>(newMockEvent());
  const block = createBlock(123, 321);
  newPoolCreatedEvent.parameters = new Array();
  newPoolCreatedEvent.parameters.push(new ethereum.EventParam('id', ethereum.Value.fromI32(id)));
  newPoolCreatedEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(Address.fromString(owner)))
  );
  newPoolCreatedEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newPoolCreatedEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newPoolCreatedEvent;
}

test('handlePoolCreatedEvent', () => {
  let newPool = createPoolCreatedEvent(1, address);
  handlePoolCreated(newPool);
  assert.fieldEquals('Pool', '1', 'id', '1');
  assert.fieldEquals('Pool', '1', 'id', '1');
});
