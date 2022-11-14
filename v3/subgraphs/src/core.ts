import {
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
  PoolConfigurationSet,
} from '../generated/PoolModule/PoolModule';
import {
  MarketRegistered,
  MarketManagerModule,
} from '../generated/MarketManagerModule/MarketManagerModule';
import { UsdDeposited, UsdWithdrawn } from '../generated/MarketManagerModule/MarketManagerModule';
import {
  CollateralConfigured,
  CollateralDeposited,
  CollateralWithdrawn,
} from '../generated/CollateralModule/CollateralModule';
import {
  AccountCreated,
  PermissionGranted,
  PermissionRevoked,
} from '../generated/AccountModule/AccountModule';
import {
  Pool,
  Market,
  PoolAndMarket,
  CollateralType,
  Account,
  AccountPermissionUsers,
} from '../generated/schema';
import { BigDecimal, BigInt, Bytes, log } from '@graphprotocol/graph-ts';

// Event handlers
export function handlePoolCreated(event: PoolCreated): void {
  const newPool = new Pool(event.params.poolId.toString());
  newPool.owner = event.params.owner;
  newPool.created_at = event.block.timestamp;
  newPool.created_at_block = event.block.number;
  newPool.save();
}

export function handlePoolNameUpdated(event: PoolNameUpdated): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.name = event.params.name.toString();
    pool.updated_at_block = event.block.number;
    pool.updated_at = event.block.timestamp;
    pool.save();
  }
}

export function handleNewPoolOwner(event: PoolOwnershipAccepted): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.updated_at_block = event.block.number;
    pool.updated_at = event.block.timestamp;
    pool.owner = event.params.owner;
    pool.save();
  }
}

export function handleMarketCreated(event: MarketRegistered): void {
  const newMarket = new Market(event.params.marketId.toString());
  newMarket.address = event.params.market;
  newMarket.created_at = event.block.timestamp;
  newMarket.created_at_block = event.block.number;
  newMarket.save();
}

export function handlePoolConfigurationSet(event: PoolConfigurationSet): void {
  const pool = Pool.load(event.params.poolId.toString());
  const markets: Market[] = [];

  for (let i = 0; i < event.params.markets.length; ++i) {
    const m = Market.load(event.params.markets.at(i).market.toString());
    if (m) {
      m.updated_at = event.block.timestamp;
      m.updated_at_block = event.block.number;
      m.weight = BigDecimal.fromString(event.params.markets[i].weight.toString());
      markets.push(m);
      m.save();
    }
  }
  if (pool !== null && !!markets.length) {
    for (let i = 0; i < markets.length; ++i) {
      const poolAndMarket = new PoolAndMarket(pool.id.concat('-').concat(markets[i].id));
      poolAndMarket.pool = event.params.poolId.toString();
      poolAndMarket.market = markets[i].id;
      poolAndMarket.max_debt_share_value = event.params.markets[i].maxDebtShareValue.toBigDecimal();
      poolAndMarket.save();
    }
  }
}

export function handleUsdDeposit(event: UsdDeposited): void {
  const market = Market.load(event.params.marketId.toString());
  if (market !== null) {
    const contract = MarketManagerModule.bind(event.address);
    market.reported_debt = contract.getMarketReportedDebt(event.params.marketId).toBigDecimal();
    if (market.usd_deposited === null) {
      market.usd_deposited = event.params.amount.toBigDecimal();
    } else {
      market.usd_deposited = changetype<BigDecimal>(market.usd_deposited).plus(
        event.params.amount.toBigDecimal()
      );
    }
    market.updated_at = event.block.timestamp;
    market.updated_at_block = event.block.number;
    if (market.usd_withdrawn !== null && market.usd_deposited !== null) {
      market.net_issuance = changetype<BigDecimal>(market.usd_withdrawn).minus(
        changetype<BigDecimal>(market.usd_deposited)
      );
    }
    market.save();
  }
}

export function handleUsdWithdrawn(event: UsdWithdrawn): void {
  const market = Market.load(event.params.marketId.toString());
  if (market !== null) {
    const contract = MarketManagerModule.bind(event.address);
    market.reported_debt = contract.getMarketReportedDebt(event.params.marketId).toBigDecimal();
    if (market.usd_withdrawn === null) {
      market.usd_withdrawn = event.params.amount.toBigDecimal();
    } else {
      market.usd_withdrawn = changetype<BigDecimal>(market.usd_withdrawn).plus(
        event.params.amount.toBigDecimal()
      );
    }
    market.usd_withdrawn = event.params.amount.toBigDecimal();
    market.updated_at = event.block.timestamp;
    market.updated_at_block = event.block.number;
    if (market.usd_withdrawn !== null && market.usd_deposited !== null) {
      market.net_issuance = changetype<BigDecimal>(market.usd_withdrawn).minus(
        changetype<BigDecimal>(market.usd_deposited)
      );
    }
    market.save();
  }
}

export function handleCollateralConfigured(event: CollateralConfigured): void {
  let collateralType = CollateralType.load(event.params.collateralType.toString());
  if (collateralType === null) {
    collateralType = new CollateralType(event.params.collateralType.toString());
    collateralType.created_at = event.block.timestamp;
    collateralType.created_at_block = event.block.number;
  }
  collateralType.updated_at = event.block.timestamp;
  collateralType.updated_at_block = event.block.number;
  collateralType.liquidation_reward = event.params.liquidationReward.toBigDecimal();
  collateralType.minimum_c_ratio = event.params.minimumCollateralizationRatio;
  collateralType.depositing_enabled = event.params.stakingEnabled;
  collateralType.target_c_ratio = event.params.targetCollateralizationRatio;
  collateralType.updated_at = event.block.timestamp;
  collateralType.updated_at_block = event.block.number;
  collateralType.save();
}

export function handleCollateralDeposit(event: CollateralDeposited): void {
  let collateralType = CollateralType.load(event.address.toString());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (
      typeof collateralType.total_amount_deposited === 'object' &&
      !collateralType.total_amount_deposited!.isZero()
    ) {
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.plus(
        event.params.amount
      );
    } else {
      collateralType.total_amount_deposited = event.params.amount;
    }
    collateralType.save();
  }
}

export function handleCollateralWithdrawn(event: CollateralWithdrawn): void {
  let collateralType = CollateralType.load(event.address.toString());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (
      typeof collateralType.total_amount_deposited === 'object' &&
      !collateralType.total_amount_deposited!.isZero()
    ) {
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.minus(
        event.params.amount
      );
    }
    collateralType.save();
  }
}

export function handleAccountCreated(event: AccountCreated): void {
  const account = new Account(event.params.accountId.toString());
  account.owner = event.params.sender;
  account.created_at = event.block.timestamp;
  account.created_at_block = event.block.number;
  account.save();
}

export function handlePermissionGranted(event: PermissionGranted): void {
  const account = Account.load(event.params.accountId.toString());
  if (account !== null) {
    let permissions = AccountPermissionUsers.load(
      concatIds([event.params.accountId.toString(), event.params.user.toString()])
    );
    if (permissions !== null) {
      permissions.address = event.params.user;
      permissions.permissions = event.params.permission.concat(permissions.permissions);
      permissions.save();
    } else {
      permissions = new AccountPermissionUsers(
        concatIds([event.params.accountId.toString(), event.params.user.toString()])
      );
      permissions.address = event.params.permission;
      permissions.permissions = event.params.permission;
      permissions.save();
    }
    account.permissions = concatIds([
      event.params.accountId.toString(),
      event.params.user.toString(),
    ]);
    account.save();
  }
}

export function handlePermissionRevoked(event: PermissionRevoked): void {}
