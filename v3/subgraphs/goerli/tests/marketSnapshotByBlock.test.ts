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
describe('MarketSnapshotByBlock', () => {
  beforeEach(() => {
    clearStore();
  });
  test('Handles deposit and withdrawals', () => {
    const now = 1;
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
    const newUsdDepositedEvent1 = createMarketUsdDepositedEvent(
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
    // Trigger market creation and a deposit event
    // We trigger this on the main handler since we expect that to call createMarketSnapshotByBlock
    handleMarketCreated(newMarketRegisteredEvent);
    handleMarketUsdDeposited(newUsdDepositedEvent);

    // Assert Market snapshot is created for the deposit event
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'reported_debt', '23');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'usd_deposited', '200');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'usd_withdrawn', '0');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'net_issuance', '-200');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'timestamp', '1001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'block_number', '1');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'market', '1');

    // Trigger another deposit in the same block
    handleMarketUsdDeposited(newUsdDepositedEvent1);

    // Assert Market snapshot can handle deposits on the same block
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'reported_debt', '23');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'usd_deposited', '400');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'usd_withdrawn', '0');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'net_issuance', '-400');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'timestamp', '1001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'block_number', '1');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1', 'market', '1');

    // Trigger a withdrawal event
    handleMarketUsdWithdrawn(newUsdWithdrawnEvent);

    // Assert Market snapshot is created for the withdrawal event
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'reported_debt', '23');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'usd_deposited', '400');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'usd_withdrawn', '300');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'net_issuance', '-100');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'timestamp', '2001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'block_number', '1001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'market', '1');

    // Trigger another withdrawal in the same block
    handleMarketUsdWithdrawn(newUsdWithdrawnEvent1);

    // Assert Market snapshot can handle withdrawal on the same block
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'reported_debt', '23');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'usd_deposited', '400');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'usd_withdrawn', '400');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'net_issuance', '0');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'timestamp', '2001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'block_number', '1001');
    assert.fieldEquals('MarketSnapshotByBlock', '1-1001', 'market', '1');
  });
});
