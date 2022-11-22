import {
  test,
  assert,
  clearStore,
  describe,
  beforeEach,
  createMockedFunction,
  logStore,
} from 'matchstick-as/assembly/index';
import { Address, ethereum, BigInt, Bytes, ByteArray } from '@graphprotocol/graph-ts';
import { address, address2, defaultGraphContractAddress } from './constants';
import {
  handleAccountCreated,
  handleCollateralConfigured,
  handleDelegationUpdated,
  handleDeposited,
  handleMarketCreated,
  handleMarketUsdDeposited,
  handleMarketUsdWithdrawn,
  handleNewPoolOwner,
  handleNominatedPoolOwner,
  handlePermissionGranted,
  handlePermissionRevoked,
  handlePoolConfigurationSet,
  handlePoolCreated,
  handlePoolNameUpdated,
  handlePoolNominationRenounced,
  handlePoolNominationRevoked,
  handleUSDBurned,
  handleUSDMinted,
  handleWithdrawn,
} from '../src/core';
import {
  createAccountCreatedEvent,
  createCollateralConfiguredEvent,
  createDelegationUpdateEvent,
  createDepositEvent,
  createMarketCreatedEvent,
  createMarketUsdDepositedEvent,
  createMarketUsdWithdrawnEvent,
  createNominatedPoolOwnerEvent,
  createPermissionGrantedEvent,
  createPermissionRevokedEvent,
  createPoolConfigurationSetEvent,
  createPoolCreatedEvent,
  createPoolNameUpdatedEvent,
  createPoolNominationRevokedEvent,
  createPoolOwnershipAcceptedEvent,
  createPoolOwnershipRenouncedEvent,
  createUSDBurnedEvent,
  createUSDMintedEvent,
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

  test('handleNominatedPoolOwner', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPoolEvent = createPoolCreatedEvent(1, address, now, now - 1000);
    handlePoolCreated(newPoolEvent);
    const newNominatedPoolOwnerEvent = createNominatedPoolOwnerEvent(1, address2, now + 1000, now);
    handleNominatedPoolOwner(newNominatedPoolOwnerEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', now.toString());
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
    const newOwnerEvent = createPoolOwnershipAcceptedEvent(1, address2, now + 1000, now);
    handlePoolCreated(newPool);
    handleNewPoolOwner(newOwnerEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address2);
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', now.toString());
  });

  test('handlePoolNominationRenounced', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPool = createPoolCreatedEvent(1, address, now, now - 1000);
    const newNominatedPoolOwnerEvent = createNominatedPoolOwnerEvent(1, address2, now + 1000, now);
    const newPoolOwnershipRenouncedEvent = createPoolOwnershipRenouncedEvent(
      1,
      now + 2000,
      now + 1000
    );
    handlePoolCreated(newPool);
    handleNominatedPoolOwner(newNominatedPoolOwnerEvent);
    handlePoolNominationRenounced(newPoolOwnershipRenouncedEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'nominated_owner', '0x00000000');
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 2000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', (now + 1000).toString());
  });

  test('handlePoolNominationRevoked', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newPool = createPoolCreatedEvent(1, address, now, now - 1000);
    const newNominatedPoolOwnerEvent = createNominatedPoolOwnerEvent(1, address2, now + 1000, now);
    const newPoolNominationRevokedEvent = createPoolNominationRevokedEvent(
      1,
      now + 2000,
      now + 1000
    );
    handlePoolCreated(newPool);
    handleNominatedPoolOwner(newNominatedPoolOwnerEvent);
    handlePoolNominationRevoked(newPoolNominationRevokedEvent);
    assert.fieldEquals('Pool', '1', 'id', '1');
    assert.fieldEquals('Pool', '1', 'owner', address);
    assert.fieldEquals('Pool', '1', 'nominated_owner', '0x00000000');
    assert.fieldEquals('Pool', '1', 'created_at', now.toString());
    assert.fieldEquals('Pool', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 2000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', (now + 1000).toString());
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
    assert.fieldEquals('Account', '1', 'updated_at', now.toString());
    assert.fieldEquals('Account', '1', 'updated_at_block', (now - 1000).toString());
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
    assert.fieldEquals('Pool', '1', 'total_weight', '75');
    assert.fieldEquals('Pool', '1', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Pool', '1', 'updated_at_block', (now + 2000).toString());
    assert.fieldEquals('Pool', '1', 'configurations', '[1-1, 1-2]');
    assert.fieldEquals('Market', '1', 'id', '1');
    assert.fieldEquals('Market', '2', 'id', '2');
    assert.fieldEquals('Market', '1', 'configurations', '[1-1]');
    assert.fieldEquals('Market', '2', 'configurations', '[1-2]');
    assert.fieldEquals('Market', '1', 'created_at', (now + 1000).toString());
    assert.fieldEquals('Market', '1', 'created_at_block', now.toString());
    assert.fieldEquals('Market', '2', 'created_at', (now + 2000).toString());
    assert.fieldEquals('Market', '2', 'created_at_block', (now + 1000).toString());
    assert.fieldEquals('Market', '1', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Market', '1', 'updated_at_block', (now + 2000).toString());
    assert.fieldEquals('Market', '2', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Market', '2', 'updated_at_block', (now + 2000).toString());
    assert.fieldEquals('MarketConfiguration', '1-1', 'id', '1-1');
    assert.fieldEquals('MarketConfiguration', '1-2', 'id', '1-2');
    assert.fieldEquals('MarketConfiguration', '1-1', 'market', '1');
    assert.fieldEquals('MarketConfiguration', '1-2', 'market', '2');
    assert.fieldEquals('MarketConfiguration', '1-1', 'pool', '1');
    assert.fieldEquals('MarketConfiguration', '1-1', 'pool', '1');
    assert.fieldEquals('MarketConfiguration', '1-1', 'max_debt_share_value', '812739821');
    assert.fieldEquals('MarketConfiguration', '1-2', 'max_debt_share_value', '892379812');
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
    handleMarketUsdDeposited(newUsdDepositedEvent);
    const newUsdWithdrawnEvent = createMarketUsdWithdrawnEvent(
      1,
      Address.fromString(address2),
      BigInt.fromU64(300),
      now + 2000,
      now + 1000
    );
    handleMarketUsdWithdrawn(newUsdWithdrawnEvent);
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
      BigInt.fromI32(53),
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
    assert.fieldEquals('CollateralType', address, 'minimum_c_ratio', '53');
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
    handleDeposited(newCollateralDepositEvent);
    assert.fieldEquals('CollateralType', address, 'id', address);
    assert.fieldEquals('CollateralType', address, 'created_at', now.toString());
    assert.fieldEquals('CollateralType', address, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('CollateralType', address, 'updated_at_block', now.toString());
    assert.fieldEquals('CollateralType', address, 'total_amount_deposited', '555');
    handleDeposited(newCollateralDepositEvent);
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
    handleDeposited(newCollateralDepositEvent);
    handleWithdrawn(newCollateralWithdrawnEvent);
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
      `[${Bytes.fromByteArray(Bytes.fromI64(1234)).toHex()}]`
    );
    assert.fieldEquals('AccountPermissionUsers', `1-${address}`, 'address', address);
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address}]`);
    assert.fieldEquals('Account', '1', 'created_at', now.toString());
    assert.fieldEquals('Account', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Account', '1', 'updated_at_block', now.toString());
    assert.fieldEquals('Account', '1', 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address}]`);
    const newPermissionGrantedEvent2 = createPermissionGrantedEvent(
      1,
      Address.fromString(address),
      Bytes.fromByteArray(Bytes.fromI64(4321)),
      now + 2000,
      now + 1000
    );
    handlePermissionGranted(newPermissionGrantedEvent2);
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'permissions',
      `[${Bytes.fromByteArray(Bytes.fromI64(1234)).toHex()}, ${Bytes.fromByteArray(
        Bytes.fromI64(4321)
      ).toHex()}]`
    );
    assert.fieldEquals('Account', '1', 'updated_at_block', (now + 1000).toString());
    assert.fieldEquals('Account', '1', 'updated_at', (now + 2000).toString());
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'updated_at_block',
      (now + 1000).toString()
    );
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'updated_at',
      (now + 2000).toString()
    );
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address}]`);
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
      Address.fromString(address),
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
    assert.fieldEquals('Account', '1', 'permissions', `[1-${address}]`);
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
      `1-${address}`,
      'updated_at',
      (now + 3000).toString()
    );
    assert.fieldEquals(
      'AccountPermissionUsers',
      `1-${address}`,
      'updated_at_block',
      (now + 2000).toString()
    );
    assert.fieldEquals('Account', '1', 'created_at', now.toString());
    assert.fieldEquals('Account', '1', 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Account', '1', 'updated_at', (now + 3000).toString());
    assert.fieldEquals('Account', '1', 'updated_at_block', (now + 2000).toString());
  });

  test('handleDelegationUpdated', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newDelegationUpdatedEvent = createDelegationUpdateEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2323),
      BigInt.fromI32(10),
      now,
      now - 1000
    );
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getPositionCollateralizationRatio',
      'getPositionCollateralizationRatio(uint128,uint128,address):(uint256)'
    )
      .withArgs([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromAddress(Address.fromString(address)),
      ])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(200))]);
    handleDelegationUpdated(newDelegationUpdatedEvent);
    assert.fieldEquals('Position', `1-1-${address}`, 'id', `1-1-${address}`);
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'collateral_amount', '2323');
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at_block', (now - 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'c_ratio', '200');
    assert.fieldEquals('Position', `1-1-${address}`, 'leverage', '10');
    assert.fieldEquals('Vault', `1-${address}`, 'id', `1-${address}`);
    assert.fieldEquals('Vault', `1-${address}`, 'created_at', now.toString());
    assert.fieldEquals('Vault', `1-${address}`, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Vault', `1-${address}`, 'updated_at', now.toString());
    assert.fieldEquals('Vault', `1-${address}`, 'updated_at_block', (now - 1000).toString());
    assert.fieldEquals('Vault', `1-${address}`, 'collateral_amount', '2323');
    const newDelegatioNUpdatedEvent2 = createDelegationUpdateEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(10000),
      BigInt.fromI32(10),
      now + 1000,
      now
    );
    handleDelegationUpdated(newDelegatioNUpdatedEvent2);
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at_block', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'collateral_amount', '10000');
    assert.fieldEquals('Vault', `1-${address}`, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Vault', `1-${address}`, 'updated_at_block', now.toString());
    assert.fieldEquals('Vault', `1-${address}`, 'collateral_amount', '10000');
  });

  test('handleUSDMinted', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newDelegationUpdatedEvent = createDelegationUpdateEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2323),
      BigInt.fromI32(10),
      now,
      now - 1000
    );
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getPositionCollateralizationRatio',
      'getPositionCollateralizationRatio(uint128,uint128,address):(uint256)'
    )
      .withArgs([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromAddress(Address.fromString(address)),
      ])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(200))]);
    handleDelegationUpdated(newDelegationUpdatedEvent);
    const newUSDMintedEvent = createUSDMintedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2000),
      now + 1000,
      now
    );
    handleUSDMinted(newUSDMintedEvent);
    assert.fieldEquals('Position', `1-1-${address}`, 'id', `1-1-${address}`);
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'collateral_amount', '2323');
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at_block', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'c_ratio', '200');
    assert.fieldEquals('Position', `1-1-${address}`, 'leverage', '10');
    assert.fieldEquals('Position', `1-1-${address}`, 'total_minted', '2000');
    handleUSDMinted(newUSDMintedEvent);
    assert.fieldEquals('Position', `1-1-${address}`, 'total_minted', '4000');
  });

  test('handleUSDBurned', () => {
    // Needs to be here because of Closures
    const now = new Date(1668448739566).getTime();
    const newDelegationUpdatedEvent = createDelegationUpdateEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2323),
      BigInt.fromI32(10),
      now,
      now - 1000
    );
    createMockedFunction(
      Address.fromString(defaultGraphContractAddress),
      'getPositionCollateralizationRatio',
      'getPositionCollateralizationRatio(uint128,uint128,address):(uint256)'
    )
      .withArgs([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromAddress(Address.fromString(address)),
      ])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(200))]);
    handleDelegationUpdated(newDelegationUpdatedEvent);
    const newUSDMintedEvent = createUSDMintedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2000),
      now + 1000,
      now
    );
    handleUSDMinted(newUSDMintedEvent);
    const newUSDBurnedEvent = createUSDBurnedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      Address.fromString(address),
      BigInt.fromI32(2000),
      now + 1000,
      now
    );
    handleUSDBurned(newUSDBurnedEvent);
    assert.fieldEquals('Position', `1-1-${address}`, 'id', `1-1-${address}`);
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'created_at_block', (now - 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'collateral_amount', '2323');
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at', (now + 1000).toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'updated_at_block', now.toString());
    assert.fieldEquals('Position', `1-1-${address}`, 'c_ratio', '200');
    assert.fieldEquals('Position', `1-1-${address}`, 'leverage', '10');
    assert.fieldEquals('Position', `1-1-${address}`, 'total_burned', '2000');
    handleUSDBurned(newUSDBurnedEvent);
    assert.fieldEquals('Position', `1-1-${address}`, 'total_burned', '4000');
  });
});
