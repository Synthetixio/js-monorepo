import {
  PoolConfigurationSet,
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
  createMockedFunction,
} from 'matchstick-as/assembly/index';
import { Address, ethereum, BigInt, Bytes, log, ByteArray } from '@graphprotocol/graph-ts';
import { address, address2, defaultGraphContractAddress } from './constants';
import {
  handleAccountCreated,
  handleMarketCreated,
  handleNewPoolOwner,
  handlePoolConfigurationSet,
  handlePoolCreated,
  handlePoolNameUpdated,
  handleUsdDeposit,
  handleUsdWithdrawn,
} from '../src/core';
import {
  MarketRegistered,
  UsdDeposited,
  UsdWithdrawn,
} from '../generated/MarketManagerModule/MarketManagerModule';
import { AccountCreated } from '../generated/AccountModule/AccountModule';

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
    new ethereum.EventParam('market', ethereum.Value.fromAddress(Address.fromString(market)))
  );
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('marketId', ethereum.Value.fromI32(id))
  );
  newMarketRegisteredEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newMarketRegisteredEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newMarketRegisteredEvent;
}

function createAccountCreatedEvent(id: i32, owner: string): AccountCreated {
  const newMarketRegisteredEvent = changetype<AccountCreated>(newMockEvent());
  const block = createBlock(222, 333);
  newMarketRegisteredEvent.parameters = new Array();
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(Address.fromString(owner)))
  );
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('accountId', ethereum.Value.fromI32(id))
  );
  newMarketRegisteredEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newMarketRegisteredEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newMarketRegisteredEvent;
}

function createPoolConfigurationSetEvent(
  poolId: i32,
  marketConfigs: Array<ethereum.Tuple>
): PoolConfigurationSet {
  const newMarketRegisteredEvent = changetype<PoolConfigurationSet>(newMockEvent());
  const block = createBlock(222, 333);
  newMarketRegisteredEvent.parameters = new Array();
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromI32(poolId))
  );
  newMarketRegisteredEvent.parameters.push(
    new ethereum.EventParam('markets', ethereum.Value.fromTupleArray(marketConfigs))
  );

  newMarketRegisteredEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newMarketRegisteredEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newMarketRegisteredEvent;
}

function createUsdDepositedEvent(marketId: i32, target: Address, amount: BigInt): UsdDeposited {
  const newUsdMintedEvent = changetype<UsdDeposited>(newMockEvent());
  const block = createBlock(222, 333);
  newUsdMintedEvent.parameters = new Array();
  newUsdMintedEvent.parameters.push(
    new ethereum.EventParam('marketId', ethereum.Value.fromI32(marketId))
  );
  newUsdMintedEvent.parameters.push(
    new ethereum.EventParam('target', ethereum.Value.fromAddress(target))
  );
  newUsdMintedEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  newUsdMintedEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdMintedEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdMintedEvent;
}

function createUsdWithdrawnEvent(marketId: i32, target: Address, amount: BigInt): UsdWithdrawn {
  const newUsdWithdrawnEvent = changetype<UsdWithdrawn>(newMockEvent());
  const block = createBlock(222, 333);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('marketId', ethereum.Value.fromI32(marketId))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('target', ethereum.Value.fromAddress(target))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}

describe('core tests', () => {
  beforeEach(() => {
    clearStore();
  });

  test('handlePoolCreated', () => {
    const newPoolEvent = createPoolCreatedEvent(1, address);
    handlePoolCreated(newPoolEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handlePoolNameUpdated', () => {
    const newPoolEvent = createPoolCreatedEvent(1, address);
    handlePoolCreated(newPoolEvent);
    const newPoolNameEvent = createPoolNameUpdatedEvent(1, 'SC Pool');
    handlePoolNameUpdated(newPoolNameEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'name', 'SC Pool');
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handleNewPoolOwner', () => {
    const newPool = createPoolCreatedEvent(1, address);
    const newOwnerEvent = createNewPoolOwnerEvent(1, address2);
    handlePoolCreated(newPool);
    handleNewPoolOwner(newOwnerEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address2);
    assert.fieldEquals('Pool', '1', 'created_at', '123');
    assert.fieldEquals('Pool', '1', 'created_at_block', '321');
  });

  test('handleMarketCreated', () => {
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address);
    handleMarketCreated(newMarketRegisteredEvent);
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '1', 'address', address);
    assert.fieldEquals('Market', '1', 'created_at', '222');
    assert.fieldEquals('Market', '1', 'created_at_block', '333');
  });

  test('handleAccountCreated', () => {
    const accountCreatedEvent = createAccountCreatedEvent(1, address);
    handleAccountCreated(accountCreatedEvent);
    assert.fieldEquals('Account', '1', 'id', '1');
    assert.fieldEquals('Account', '1', 'owner', address);
    assert.fieldEquals('Account', '1', 'created_at', '222');
    assert.fieldEquals('Account', '1', 'created_at_block', '333');
  });

  test('handlePoolConfigurationSet', () => {
    const newPoolEvent = createPoolCreatedEvent(1, address);
    handlePoolCreated(newPoolEvent);
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address);
    const newMarketRegisteredEvent2 = createMarketCreatedEvent(2, address2);
    handleMarketCreated(newMarketRegisteredEvent);
    handleMarketCreated(newMarketRegisteredEvent2);
    const markets = changetype<Array<ethereum.Tuple>>([
      changetype<Array<ethereum.Tuple>>([
        ethereum.Value.fromI32(1),
        ethereum.Value.fromI32(32),
        ethereum.Value.fromI32(2),
      ]),
      changetype<Array<ethereum.Tuple>>([
        ethereum.Value.fromI32(2),
        ethereum.Value.fromI32(43),
        ethereum.Value.fromI32(54),
      ]),
    ]);
    const newPoolConfigurationSetEvent = createPoolConfigurationSetEvent(1, markets);
    handlePoolConfigurationSet(newPoolConfigurationSetEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '2', 'id', '2');
    assert.fieldEquals('Market', '1', 'updated_at', '222');
    assert.fieldEquals('Market', '1', 'updated_at_block', '333');
    assert.fieldEquals('Market', '1', 'weight', '32');
    assert.fieldEquals('Market', '2', 'weight', '43');
    assert.fieldEquals('PoolAndMarket', '1-1', 'id', '1-1');
    assert.fieldEquals('PoolAndMarket', '1-2', 'id', '1-2');
    assert.fieldEquals('PoolAndMarket', '1-1', 'market', '1');
    assert.fieldEquals('PoolAndMarket', '1-2', 'market', '2');
    assert.fieldEquals('PoolAndMarket', '1-1', 'max_debt_share_value', '2');
    assert.fieldEquals('PoolAndMarket', '1-2', 'max_debt_share_value', '54');
  });
  test('calculate net issuance', () => {
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address);
    const arg = ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1));
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getMarketReportedDebt',
      'getMarketReportedDebt(uint128):(uint256)'
    )
      .withArgs([arg])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(23))]);
    handleMarketCreated(newMarketRegisteredEvent);
    const newUsdDepositedEvent = createUsdDepositedEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(200)
    );
    handleUsdDeposit(newUsdDepositedEvent);
    const newUsdWithdrawnEvent = createUsdWithdrawnEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(300)
    );
    handleUsdWithdrawn(newUsdWithdrawnEvent);
    assert.fieldEquals('Market', '1', 'reported_debt', '23');
    assert.fieldEquals('Market', '1', 'usd_deposited', '200');
    assert.fieldEquals('Market', '1', 'usd_withdrawn', '300');
    assert.fieldEquals('Market', '1', 'net_issuance', '100');
    assert.fieldEquals('Market', '1', 'updated_at', '222');
    assert.fieldEquals('Market', '1', 'updated_at_block', '333');
  });
});
