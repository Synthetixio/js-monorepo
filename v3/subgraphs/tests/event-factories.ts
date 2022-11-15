import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as';
import {
  AccountCreated,
  PermissionGranted,
  PermissionRevoked,
} from '../generated/AccountModule/AccountModule';
import {
  CollateralConfigured,
  Deposited,
  Withdrawn,
} from '../generated/CollateralModule/CollateralModule';
import {
  MarketRegistered,
  MarketUsdDeposited,
  MarketUsdWithdrawn,
} from '../generated/MarketManagerModule/MarketManagerModule';
import {
  PoolConfigurationSet,
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
} from '../generated/PoolModule/PoolModule';

function createBlock(timestamp: i64, blockNumber: i64): Map<string, i64> {
  const newBlock = new Map<string, i64>();
  newBlock.set('timestamp', timestamp);
  newBlock.set('blockNumber', blockNumber);
  return newBlock;
}

export function createPoolCreatedEvent(
  id: i32,
  owner: string,
  timestamp: i64,
  blockNumber: i64
): PoolCreated {
  const newPoolCreatedEvent = changetype<PoolCreated>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newPoolCreatedEvent.parameters = new Array();
  newPoolCreatedEvent.parameters.push(new ethereum.EventParam('id', ethereum.Value.fromI32(id)));
  newPoolCreatedEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(Address.fromString(owner)))
  );
  newPoolCreatedEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newPoolCreatedEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newPoolCreatedEvent;
}

export function createPoolNameUpdatedEvent(
  id: i32,
  name: string,
  timestamp: i64,
  blockNumber: i64
): PoolNameUpdated {
  const newPoolNameUpdatedEvent = changetype<PoolNameUpdated>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createNewPoolOwnerEvent(
  id: i32,
  owner: string,
  timestamp: i64,
  blockNumber: i64
): PoolOwnershipAccepted {
  const newPoolOwnershipAcceptedEvent = changetype<PoolOwnershipAccepted>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createMarketCreatedEvent(
  id: i32,
  market: string,
  timestamp: i64,
  blockNumber: i64
): MarketRegistered {
  const newMarketRegisteredEvent = changetype<MarketRegistered>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createAccountCreatedEvent(
  id: i32,
  owner: string,
  timestamp: i64,
  blockNumber: i64
): AccountCreated {
  const newMarketRegisteredEvent = changetype<AccountCreated>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createPoolConfigurationSetEvent(
  poolId: i32,
  marketConfigs: Array<ethereum.Tuple>,
  timestamp: i64,
  blockNumber: i64
): PoolConfigurationSet {
  const newMarketRegisteredEvent = changetype<PoolConfigurationSet>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createMarketUsdDepositedEvent(
  marketId: i32,
  target: Address,
  amount: BigInt,
  timestamp: i64,
  blockNumber: i64
): MarketUsdDeposited {
  const newUsdMintedEvent = changetype<MarketUsdDeposited>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createMarketUsdWithdrawnEvent(
  marketId: i32,
  target: Address,
  amount: BigInt,
  timestamp: i64,
  blockNumber: i64
): MarketUsdWithdrawn {
  const newUsdWithdrawnEvent = changetype<MarketUsdWithdrawn>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
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

export function createCollateralConfiguredEvent(
  collateralType: Address,
  priceFeed: Address,
  targetCollateralizationRatio: BigInt,
  minimumCollateralizationRatio: BigInt,
  liquidationReward: BigInt,
  depositingEnabled: boolean,
  timestamp: i64,
  blockNumber: i64
): CollateralConfigured {
  const newUsdWithdrawnEvent = changetype<CollateralConfigured>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('collateralType', ethereum.Value.fromAddress(collateralType))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('priceFeed', ethereum.Value.fromAddress(priceFeed))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      'targetCollateralizationRatio',
      ethereum.Value.fromUnsignedBigInt(targetCollateralizationRatio)
    )
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      'minimumCollateralizationRatio',
      ethereum.Value.fromUnsignedBigInt(minimumCollateralizationRatio)
    )
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      'liquidationReward',
      ethereum.Value.fromUnsignedBigInt(liquidationReward)
    )
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('depositingEnabled', ethereum.Value.fromBoolean(depositingEnabled))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}

export function createDepositEvent(
  accountId: i32,
  collateralType: Address,
  amount: BigInt,
  timestamp: i64,
  blockNumber: i64
): Deposited {
  const newUsdWithdrawnEvent = changetype<Deposited>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('accountId', ethereum.Value.fromI32(accountId))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('collateralType', ethereum.Value.fromAddress(collateralType))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}

export function createWithdrawnEvent(
  accountId: i32,
  collateralType: Address,
  amount: BigInt,
  timestamp: i64,
  blockNumber: i64
): Withdrawn {
  const newUsdWithdrawnEvent = changetype<Withdrawn>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('accountId', ethereum.Value.fromI32(accountId))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('collateralType', ethereum.Value.fromAddress(collateralType))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}

export function createPermissionGrantedEvent(
  accountId: i32,
  user: Address,
  permissions: Bytes,
  timestamp: i64,
  blockNumber: i64
): PermissionGranted {
  const newUsdWithdrawnEvent = changetype<PermissionGranted>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('accountId', ethereum.Value.fromI32(accountId))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('permissions', ethereum.Value.fromBytes(permissions))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('user', ethereum.Value.fromAddress(user))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}

export function createPermissionRevokedEvent(
  accountId: i32,
  user: Address,
  permissions: Bytes,
  timestamp: i64,
  blockNumber: i64
): PermissionRevoked {
  const newUsdWithdrawnEvent = changetype<PermissionRevoked>(newMockEvent());
  const block = createBlock(timestamp, blockNumber);
  newUsdWithdrawnEvent.parameters = new Array();
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('accountId', ethereum.Value.fromI32(accountId))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('permissions', ethereum.Value.fromBytes(permissions))
  );
  newUsdWithdrawnEvent.parameters.push(
    new ethereum.EventParam('user', ethereum.Value.fromAddress(user))
  );
  newUsdWithdrawnEvent.block.timestamp = BigInt.fromI64(block['timestamp']);
  newUsdWithdrawnEvent.block.number = BigInt.fromI64(block['blockNumber']);
  return newUsdWithdrawnEvent;
}
