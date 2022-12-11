import {
  test,
  assert,
  clearStore,
  describe,
  beforeEach,
  createMockedFunction,
} from 'matchstick-as/assembly/index';
import { Address, ethereum, BigInt, store } from '@graphprotocol/graph-ts';
import { address, address2, defaultGraphContractAddress } from './constants';
import {
  handleMarketUsdWithdrawn,
  handleMarketCreated,
  handleMarketUsdDeposited,
} from '../src/market';
import {
  createMarketCreatedEvent,
  createMarketUsdDepositedEvent,
  createMarketUsdWithdrawnEvent,
} from './event-factories';

describe('Market tests', () => {
  beforeEach(() => {
    clearStore();
  });

  test('handleMarketCreated', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address, now, now - 1000);
    handleMarketCreated(newMarketRegisteredEvent);
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '1', 'address', address);
    assert.fieldEquals('Market', '1', 'created_at', now.toString());
    assert.fieldEquals('Market', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Market', '1', 'updated_at', now.toString());
    assert.fieldEquals('Market', '1', 'updated_at_block', (now - 1000).toString());
    assert.fieldEquals('Market', '1', 'usd_deposited', '0');
    assert.fieldEquals('Market', '1', 'usd_withdrawn', '0');
    assert.fieldEquals('Market', '1', 'net_issuance', '0');
    assert.fieldEquals('Market', '1', 'reported_debt', '0');
    assert.assertNull(store.get('Market', '1')!.get('configurations'));
    assert.notInStore('Market', '2');
  });

  test('handles market withdrawals and deposits', () => {
    // Needs to be here because of Closures
    const now = new Date(1).getTime();
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address, now, now - 1000);
    const arg = ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(1));
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getMarketReportedDebt',
      'getMarketReportedDebt(uint128):(uint256)'
    )
      .withArgs([arg])
      .returns([ethereum.Value.fromI32(23)]);
    const newUsdDepositedEvent = createMarketUsdDepositedEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(200),
      now + 1000,
      now
    );
    const newUsdWithdrawnEvent = createMarketUsdWithdrawnEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(300),
      now + 2000,
      now + 1000
    );
    const newUsdWithdrawnEvent1 = createMarketUsdWithdrawnEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(100),
      now + 2000,
      now + 1000
    );
    handleMarketCreated(newMarketRegisteredEvent);
    handleMarketUsdDeposited(newUsdDepositedEvent);
    handleMarketUsdWithdrawn(newUsdWithdrawnEvent);
    handleMarketUsdWithdrawn(newUsdWithdrawnEvent1);
    /* Assert market */
    assert.fieldEquals('Market', '1', 'address', address);
    assert.assertNull(store.get('Market', '1')!.get('configurations'));
    assert.fieldEquals('Market', '1', 'reported_debt', '23');
    assert.fieldEquals('Market', '1', 'usd_deposited', '200');
    assert.fieldEquals('Market', '1', 'usd_withdrawn', '400');
    assert.fieldEquals('Market', '1', 'net_issuance', '200');
    assert.fieldEquals('Market', '1', 'created_at', now.toString());
    assert.fieldEquals('Market', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Market', '1', 'updated_at', (now + 2000).toString());
    assert.fieldEquals('Market', '1', 'updated_at_block', (now + 1000).toString());
    assert.notInStore('Market', '2');
  });
});
