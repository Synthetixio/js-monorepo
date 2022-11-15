import {
  test,
  assert,
  clearStore,
  describe,
  beforeEach,
  createMockedFunction,
  logStore,
} from 'matchstick-as/assembly/index';
import {
  Address,
  ethereum,
  BigInt,
  Bytes,
  ByteArray,
  store,
  log,
  Entity,
} from '@graphprotocol/graph-ts';
import { address, address2, defaultGraphContractAddress } from './constants';
import {
  handleAccountCreated,
  handleCollateralConfigured,
  handleCollateralDeposit,
  handleCollateralWithdrawn,
  handleMarketCreated,
  handleNewPoolOwner,
  handlePermissionGranted,
  handlePermissionRevoked,
  handlePoolConfigurationSet,
  handlePoolCreated,
  handlePoolNameUpdated,
  handleUsdDeposit,
  handleUsdWithdrawn,
} from '../src/core';
import {
  createAccountCreatedEvent,
  createCollateralConfiguredEvent,
  createDepositEvent,
  createMarketCreatedEvent,
  createMarketUsdDepositedEvent,
  createMarketUsdWithdrawnEvent,
  createNewPoolOwnerEvent,
  createPermissionGrantedEvent,
  createPermissionRevokedEvent,
  createPoolConfigurationSetEvent,
  createPoolCreatedEvent,
  createPoolNameUpdatedEvent,
  createWithdrawnEvent,
} from './event-factories';

describe('core tests', () => {
  beforeEach(() => {
    clearStore();
  });

  test('handlePoolCreated', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPoolEvent = createPoolCreatedEvent(1, address, now, now - 1000);
    handlePoolCreated(newPoolEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
  });

  test('handlePoolNameUpdated', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPoolEvent = createPoolCreatedEvent(1, address, now, now - 1000);
    handlePoolCreated(newPoolEvent);
    const newPoolNameEvent = createPoolNameUpdatedEvent(1, 'SC Pool', now + 1000, now);
    handlePoolNameUpdated(newPoolNameEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'name', 'SC Pool');
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', now.toString());
  });

  test('handleNewPoolOwner', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPool = createPoolCreatedEvent(1, address, now, now - 1000);
    const newOwnerEvent = createNewPoolOwnerEvent(1, address2, now + 1000, now);
    handlePoolCreated(newPool);
    handleNewPoolOwner(newOwnerEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address2);
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', now.toString());
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
  });

  test('handleAccountCreated', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const accountCreatedEvent = createAccountCreatedEvent(1, address, now, now - 1000);
    handleAccountCreated(accountCreatedEvent);
    assert.fieldEquals('Account', '1', 'id', '1');
    assert.fieldEquals('Account', '1', 'owner', address);
    assert.fieldEquals('Account', '1', 'created_at', now.toString());
    assert.fieldEquals('Account', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Account', '1', 'permissions', '[]');
  });

  test('handlePoolConfigurationSet', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPoolEvent = createPoolCreatedEvent(1, address, now, now - 1000);
    handlePoolCreated(newPoolEvent);
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address, now + 1000, now);
    const newMarketRegisteredEvent2 = createMarketCreatedEvent(2, address2, now + 2000, now + 1000);
    handleMarketCreated(newMarketRegisteredEvent);
    handleMarketCreated(newMarketRegisteredEvent2);
    const markets = changetype<Array<ethereum.Tuple>>([
      changetype<Array<ethereum.Tuple>>([
        ethereum.Value.fromI32(1),
        ethereum.Value.fromI32(32),
        ethereum.Value.fromI32(812739821),
      ]),
      changetype<Array<ethereum.Tuple>>([
        ethereum.Value.fromI32(2),
        ethereum.Value.fromI32(43),
        ethereum.Value.fromI32(892379812),
      ]),
    ]);
    const newPoolConfigurationSetEvent = createPoolConfigurationSetEvent(
      1,
      markets,
      now + 3000,
      now + 2000
    );
    handlePoolConfigurationSet(newPoolConfigurationSetEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '2', 'id', '2');
    assert.fieldEquals('Market', '1', 'created_at', (now + 1000).toString());
    assert.fieldEquals('Market', '1', 'created_at_block', now.toString());
    assert.fieldEquals('Market', '2', 'created_at', (now + 2000).toString());
    assert.fieldEquals('Market', '2', 'created_at_block', (now + 1000).toString());
    assert.fieldEquals('Market', '1', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Market', '1', 'updated_at_block', (now + 2000).toString());
    assert.fieldEquals('Market', '2', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Market', '2', 'updated_at_block', (now + 2000).toString());
    assert.fieldEquals('Market', '1', 'weight', '32');
    assert.fieldEquals('Market', '2', 'weight', '43');
    assert.fieldEquals('PoolAndMarket', '1-1', 'id', '1-1');
    assert.fieldEquals('PoolAndMarket', '1-2', 'id', '1-2');
    assert.fieldEquals('PoolAndMarket', '1-1', 'market', '1');
    assert.fieldEquals('PoolAndMarket', '1-2', 'market', '2');
    assert.fieldEquals('PoolAndMarket', '1-1', 'max_debt_share_value', '812739821');
    assert.fieldEquals('PoolAndMarket', '1-2', 'max_debt_share_value', '892379812');
  });

  test('calculate net issuance', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newMarketRegisteredEvent = createMarketCreatedEvent(1, address, now, now - 1000);
    const arg = ethereum.Value.fromUnsignedBigInt(BigInt.fromU64(1));
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getMarketReportedDebt',
      'getMarketReportedDebt(uint128):(uint256)'
    )
      .withArgs([arg])
      .returns([ethereum.Value.fromI32(23)]);
    handleMarketCreated(newMarketRegisteredEvent);
    const newUsdDepositedEvent = createMarketUsdDepositedEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(200),
      now + 1000,
      now
    );
    handleUsdDeposit(newUsdDepositedEvent);
    const newUsdWithdrawnEvent = createMarketUsdWithdrawnEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(300),
      now + 2000,
      now + 1000
    );
    handleUsdWithdrawn(newUsdWithdrawnEvent);
    assert.fieldEquals('Market', '1', 'reported_debt', '23');
    assert.fieldEquals('Market', '1', 'usd_deposited', '200');
    assert.fieldEquals('Market', '1', 'usd_withdrawn', '300');
    assert.fieldEquals('Market', '1', 'net_issuance', '100');
    assert.fieldEquals('Market', '1', 'created_at', now.toString());
    assert.fieldEquals('Market', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Market', '1', 'updated_at', (now + 2000).toString());
    assert.fieldEquals('Market', '1', 'updated_at_block', (now + 1000).toString());
  });

  test('handleCollateralConfigured', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newCollateralConfiguredEvent = createCollateralConfiguredEvent(
      Address.fromString(address),
      Address.fromString(address2),
      BigInt.fromI32(23),
      BigInt.fromI32(55),
      BigInt.fromI32(11),
      true,
      now,
      now - 1000
    );
    handleCollateralConfigured(newCollateralConfiguredEvent);
    const newCollateralConfiguredEvent2 = createCollateralConfiguredEvent(
      Address.fromString(address),
      Address.fromString(address2),
      BigInt.fromI32(23),
      BigInt.fromI32(55),
      BigInt.fromI32(11),
      true,
      now + 1000,
      now
    );
    handleCollateralConfigured(newCollateralConfiguredEvent2);
    assert.fieldEquals('CollateralType', address, 'id', address);
    assert.fieldEquals('CollateralType', address, 'created_at', now.toString());
    assert.fieldEquals('CollateralType', address, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at_block', now.toString());
    assert.fieldEquals('CollateralType', address, 'liquidation_reward', '11');
    assert.fieldEquals('CollateralType', address, 'minimum_c_ratio', '55');
    assert.fieldEquals('CollateralType', address, 'depositing_enabled', 'true');
    assert.fieldEquals('CollateralType', address, 'target_c_ratio', '23');
  });

  test('handleCollateralDeposit', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newCollateralConfiguredEvent = createCollateralConfiguredEvent(
      Address.fromString(address),
      Address.fromString(address2),
      BigInt.fromI32(23),
      BigInt.fromI32(55),
      BigInt.fromI32(11),
      true,
      now,
      now - 1000
    );
    const newCollateralDepositEvent = createDepositEvent(
      23,
      Address.fromString(address),
      BigInt.fromI32(555),
      now + 1000,
      now
    );
    handleCollateralConfigured(newCollateralConfiguredEvent);
    handleCollateralDeposit(newCollateralDepositEvent);
    assert.fieldEquals('CollateralType', address, 'id', address);
    assert.fieldEquals('CollateralType', address, 'created_at', now.toString());
    assert.fieldEquals('CollateralType', address, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at_block', now.toString());
    assert.fieldEquals('CollateralType', address, 'total_amount_deposited', '555');
    handleCollateralDeposit(newCollateralDepositEvent);
    assert.fieldEquals('CollateralType', address, 'total_amount_deposited', '1110');
  });

  test('handleCollateralWithdrawn', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newCollateralConfiguredEvent = createCollateralConfiguredEvent(
      Address.fromString(address),
      Address.fromString(address2),
      BigInt.fromI32(23),
      BigInt.fromI32(55),
      BigInt.fromI32(11),
      true,
      now,
      now - 1000
    );
    const newCollateralDepositEvent = createDepositEvent(
      23,
      Address.fromString(address),
      BigInt.fromI32(555),
      now + 1000,
      now
    );
    const newCollateralWithdrawnEvent = createWithdrawnEvent(
      23,
      Address.fromString(address),
      BigInt.fromI32(100),
      now + 2000,
      now + 1000
    );
    handleCollateralConfigured(newCollateralConfiguredEvent);
    handleCollateralDeposit(newCollateralDepositEvent);
    handleCollateralWithdrawn(newCollateralWithdrawnEvent);
    assert.fieldEquals('CollateralType', address, 'id', address);
    assert.fieldEquals('CollateralType', address, 'created_at', now.toString());
    assert.fieldEquals('CollateralType', address, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at', (now + 2000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at_block', (now + 1000).toString());
    assert.fieldEquals('CollateralType', address, 'total_amount_deposited', '455');
  });

  test('handlePermissionGranted', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newAccountCreatedEvent = createAccountCreatedEvent(1, address, now, now - 1000);
    const newPermissionGrantedEvent = createPermissionGrantedEvent(
      1,
      Address.fromString(address),
      Bytes.fromByteArray(Bytes.fromI64(1234)),
      now + 1000,
      now
    );
    handleAccountCreated(newAccountCreatedEvent);
    handlePermissionGranted(newPermissionGrantedEvent);
    assert.fieldEquals('AccountPermissionUsers', `1-${address}`, 'id', `1-${address}`);
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'permissions',
      Bytes.fromByteArray(Bytes.fromI64(1234)).toHex()
    );
    assert.fieldEquals('AccountPermissionUsers', `1-${address}`, 'address', address);
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address}]`);
    assert.fieldEquals('Account', '1', 'created_at', now.toString());
    assert.fieldEquals('Account', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Account', '1', 'updated_at_block', now.toString());
    assert.fieldEquals('Account', '1', 'updated_at', (now + 1000).toString());
    handlePermissionGranted(newPermissionGrantedEvent);
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'permissions',
      Bytes.fromByteArray(Bytes.fromI64(1234))
        .toHex()
        .concat(Bytes.fromByteArray(Bytes.fromI64(1234)).toHex().substring(2))
    );
  });

  test('handlePermissionRevoked', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newAccountCreatedEvent = createAccountCreatedEvent(1, address, now, now - 1000);
    handleAccountCreated(newAccountCreatedEvent);
    const newPermissionGrantedEvent = createPermissionGrantedEvent(
      1,
      Address.fromString(address),
      Bytes.fromByteArray(Bytes.fromI64(1234)),
      now + 1000,
      now
    );
    handlePermissionGranted(newPermissionGrantedEvent);
    const newPermissionGrantedEvent2 = createPermissionGrantedEvent(
      1,
      Address.fromString(address2),
      Bytes.fromByteArray(Bytes.fromI64(1111)),
      now + 2000,
      now + 1000
    );
    handlePermissionGranted(newPermissionGrantedEvent2);
    const newPermissionRevokedEvent = createPermissionRevokedEvent(
      1,
      Address.fromString(address),
      Bytes.fromByteArray(ByteArray.fromHexString(Address.fromString(address).toHex())),
      now + 3000,
      now + 2000
    );
    handlePermissionRevoked(newPermissionRevokedEvent);
    assert.fieldEquals('AccountPermissionUsers', `1-${address}`, 'address', address);
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address2}]`);
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'created_at',
      (now + 1000).toString()
    );
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'created_at_block',
      now.toString()
    );
    assert.fieldEquals(
      'AccountPermissionUsers',
      `revoked-1-${address}`,
      'updated_at',
      (now + 3000).toString()
    );
    assert.fieldEquals(
      'AccountPermissionUsers',
      `revoked-1-${address}`,
      'updated_at_block',
      (now + 2000).toString()
    );
    assert.fieldEquals('Account', '1', 'created_at', now.toString());
    assert.fieldEquals('Account', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Account', '1', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Account', '1', 'updated_at_block', (now + 2000).toString());
  });

  test('handleDelegationUpdated', () => {});

  test('handleUSDMinted', () => {});

  test('handleUSDBurned', () => {});
});
