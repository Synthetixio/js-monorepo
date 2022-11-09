import {
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
} from '../generated/PoolModule/PoolModule';
import {
  newMockEvent,
  test,
  assert,
  logStore,
  clearStore,
  describe,
  beforeEach,
} from 'matchstick-as/assembly/index';
import { Address, ethereum, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { address, address2 } from './constants';
import {
  handleMarketCreated,
  handleNewPoolOwner,
  handlePoolCreated,
  handlePoolNameUpdated,
} from '../src/core';
import { MarketRegistered } from '../generated/MarketManagerModule/MarketManagerModule';

function createBlock(timestamp: i32, blockNumber: i32): Map<string, i32> {
  const newBlock = new Map<string, i32>();
  newBlock.set('timestamp', timestamp);
  newBlock.set('blockNumber', blockNumber);
  return newBlock;
}

function createPoolCreatedEvent(id: i32, owner: string): PoolCreated {
  const newPoolCreatedEvent = changetype<PoolCreated>(newMockEvent());
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

function createPoolNameUpdatedEvent(id: i32, name: string): PoolNameUpdated {
  const newPoolNameUpdatedEvent = changetype<PoolNameUpdated>(newMockEvent());
  const block = createBlock(123, 321);
  newPoolNameUpdatedEvent.parameters = new Array();
  newPoolNameUpdatedEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromI32(id))
  );
  newPoolNameUpdatedEvent.parameters.push(
    new ethereum.EventParam('name', ethereum.Value.fromBytes(Bytes.fromUTF8(name)))
  );
  newPoolNameUpdatedEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newPoolNameUpdatedEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newPoolNameUpdatedEvent;
}

function createNewPoolOwnerEvent(id: i32, owner: string): PoolOwnershipAccepted {
  const newPoolOwnershipAcceptedEvent = changetype<PoolOwnershipAccepted>(newMockEvent());
  const block = createBlock(123, 321);
  newPoolOwnershipAcceptedEvent.parameters = new Array();
  newPoolOwnershipAcceptedEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromI32(id))
  );
  newPoolOwnershipAcceptedEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(Address.fromString(owner)))
  );
  newPoolOwnershipAcceptedEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newPoolOwnershipAcceptedEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newPoolOwnershipAcceptedEvent;
}

function createMarketCreatedEvent(id: i32, market: string): MarketRegistered {
  const newMarketRegisteredEvent = changetype<MarketRegistered>(newMockEvent());
  const block = createBlock(222, 333);
  newMarketRegisteredEvent.parameters = new Array();
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('marketId', ethereum.Value.fromI32(id))
  );
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('marketId', ethereum.Value.fromAddress(Address.fromString(market)))
  );
  newMarketRegisteredEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newMarketRegisteredEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newMarketRegisteredEvent;
}
describe('core tests', () => {
  beforeEach(() => {});
  test('handlePoolCreatedEvent', () => {
    let newPoolEvent = createPoolCreatedEvent(1, address);
    handlePoolCreated(newPoolEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handlePoolNameUpdated', () => {
    let newPoolEvent = createPoolCreatedEvent(1, address);
    handlePoolCreated(newPoolEvent);
    const newPoolNameEvent = createPoolNameUpdatedEvent(1, 'SC Pool');
    handlePoolNameUpdated(newPoolNameEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'name', 'SC Pool');
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handleNewPoolOwner', () => {
    let newPool = createPoolCreatedEvent(1, address);
    const newOwnerEvent = createNewPoolOwnerEvent(1, address2);
    handlePoolCreated(newPool);
    handleNewPoolOwner(newOwnerEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address2);
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handleMarketCreated', () => {
    const newMarketRegisteredEvent = createMarketCreatedEvent(23, address);
    handleMarketCreated(newMarketRegisteredEvent);
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '1', 'address', address);
    assert.fieldEquals('Market', '1', 'created_at', '123');
    assert.fieldEquals('Market', '1', 'created_at_block', '321');
  });
});
