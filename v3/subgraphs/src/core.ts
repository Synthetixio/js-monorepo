import {
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
  PoolConfigurationSet,
} from '../generated/PoolModule/PoolModule';
import {
  MarketRegistered,
  MarketManagerModule,
  MarketUsdDeposited,
  MarketUsdWithdrawn,
} from '../generated/MarketManagerModule/MarketManagerModule';
import {
  CollateralConfigured,
  Deposited,
  Withdrawn,
} from '../generated/CollateralModule/CollateralModule';
import {
  AccountCreated,
  PermissionGranted,
  PermissionRevoked,
} from '../generated/AccountModule/AccountModule';
import { DelegationUpdated, VaultModule } from '../generated/VaultModule/VaultModule';
import { UsdMinted, UsdBurned } from '../generated/IssueUSDModule/IssueUSDModule';
import {
  Pool,
  Market,
  PoolAndMarket,
  CollateralType,
  Account,
  AccountPermissionUsers,
  Vault,
  Position,
} from '../generated/schema';
import { BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';

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

export function handleAccountCreated(event: AccountCreated): void {
  const account = new Account(event.params.accountId.toString());
  account.owner = event.params.sender;
  account.created_at = event.block.timestamp;
  account.created_at_block = event.block.number;
  account.permissions = [''];
  account.save();
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

export function handleUsdDeposit(event: MarketUsdDeposited): void {
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

export function handleUsdWithdrawn(event: MarketUsdWithdrawn): void {
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
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType === null) {
    collateralType = new CollateralType(event.params.collateralType.toHex());
    collateralType.created_at = event.block.timestamp;
    collateralType.created_at_block = event.block.number;
  }
  collateralType.updated_at = event.block.timestamp;
  collateralType.updated_at_block = event.block.number;
  collateralType.liquidation_reward = event.params.liquidationReward.toBigDecimal();
  collateralType.minimum_c_ratio = event.params.minimumCollateralizationRatio;
  collateralType.depositing_enabled = event.params.depositingEnabled;
  collateralType.target_c_ratio = event.params.targetCollateralizationRatio;
  collateralType.save();
}

export function handleCollateralDeposit(event: Deposited): void {
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (
      collateralType.total_amount_deposited !== null &&
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

export function handleCollateralWithdrawn(event: Withdrawn): void {
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (
      collateralType.total_amount_deposited !== null &&
      !collateralType.total_amount_deposited!.isZero()
    ) {
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.minus(
        event.params.amount
      );
    }
    collateralType.save();
  }
}

export function handlePermissionGranted(event: PermissionGranted): void {
  const account = Account.load(event.params.accountId.toString());
  if (account !== null) {
    let permissions = AccountPermissionUsers.load(
      event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
    );
    if (permissions !== null) {
      permissions.address = event.params.user;
      permissions.permissions = event.params.permission.concat(permissions.permissions);
      permissions.updated_at = event.block.timestamp;
      permissions.updated_at_block = event.block.number;
      permissions.save();
    } else {
      permissions = new AccountPermissionUsers(
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
      );
      permissions.created_at = event.block.timestamp;
      permissions.created_at_block = event.block.number;
      permissions.updated_at = event.block.timestamp;
      permissions.updated_at_block = event.block.number;
      permissions.address = account.owner;
      permissions.permissions = event.params.permission;
      permissions.save();
    }
    const definedAccountPermissions = changetype<Array<string>>(account.permissions);
    if (!definedAccountPermissions[0]) {
      account.permissions = [
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex()),
      ];
    } else {
      definedAccountPermissions.push(
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
      );
      account.permissions = definedAccountPermissions;
    }
    account.updated_at = event.block.timestamp;
    account.updated_at_block = event.block.number;
    account.save();
  }
}

export function handlePermissionRevoked(event: PermissionRevoked): void {
  const account = Account.load(event.params.accountId.toString());
  if (account !== null) {
    account.updated_at = event.block.timestamp;
    account.updated_at_block = event.block.number;
    if (account.permissions !== null) {
      const oldPermissions = changetype<Array<string>>(account.permissions);
      const newPermissions: string[] = [];
      const permissionToRemove = event.params.accountId
        .toString()
        .concat('-')
        .concat(event.params.user.toHex());
      for (let i = 0; i < oldPermissions.length; ++i) {
        if (!oldPermissions[i].includes(permissionToRemove)) {
          newPermissions.push(oldPermissions[i]);
        }
      }
      account.permissions = newPermissions;
      const permissions = AccountPermissionUsers.load(
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
      );
      if (permissions !== null) {
        // Not sure if the best way
        permissions.id = 'revoked'
          .concat('-')
          .concat(event.params.accountId.toString().concat('-').concat(event.params.user.toHex()));
        permissions.updated_at = event.block.timestamp;
        permissions.updated_at_block = event.block.number;
        permissions.save();
      }
      account.save();
    }
  }
}

export function handleDelegationUpdated(event: DelegationUpdated): void {
  const id = event.params.accountId
    .toString()
    .concat('-')
    .concat(event.params.poolId.toString())
    .concat('-')
    .concat(event.params.collateralType.toHex());
  let position = Position.load(id);
  if (position === null) {
    position = new Position(id);
    position.created_at = event.block.timestamp;
    position.created_at_block = event.block.number;
    position.collateral_amount = event.params.amount;
  }
  const collateralAmountChange = event.params.amount.minus(position.collateral_amount);
  position.collateral_amount = event.params.amount;
  position.updated_at = event.block.timestamp;
  position.updated_at_block = event.block.number;
  position.c_ratio = VaultModule.bind(event.address).getPositionCollateralizationRatio(
    event.params.accountId,
    event.params.poolId,
    event.params.collateralType
  );
  position.leverage = event.params.leverage;
  let vault = Vault.load(
    event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
  );
  if (vault === null) {
    vault = new Vault(
      event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
    );
    vault.created_at = event.block.timestamp;
    vault.created_at_block = event.block.number;
    vault.collateral_amount = event.params.amount;
  } else {
    vault.collateral_amount = vault.collateral_amount.plus(collateralAmountChange);
  }
  vault.updated_at = event.block.timestamp;
  vault.updated_at_block = event.block.number;
  position.save();
  vault.save();
}

export function handleUSDMinted(event: UsdMinted): void {
  const position = Position.load(
    event.params.accountId
      .toString()
      .concat('-')
      .concat(
        event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
      )
  );
  if (position !== null) {
    position.updated_at = event.block.timestamp;
    position.updated_at_block = event.block.number;
    if (position.total_minted !== null) {
      position.total_minted = changetype<BigInt>(position.total_minted).plus(event.params.amount);
    } else {
      position.total_minted = event.params.amount;
    }
    position.save();
  }
}
export function handleUSDBurned(event: UsdBurned): void {
  const position = Position.load(
    event.params.accountId
      .toString()
      .concat('-')
      .concat(
        event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
      )
  );
  if (position !== null) {
    position.updated_at = event.block.timestamp;
    position.updated_at_block = event.block.number;
    if (position.total_burned !== null) {
      position.total_burned = changetype<BigInt>(position.total_burned).plus(event.params.amount);
    } else {
      position.total_burned = event.params.amount;
    }
    position.save();
  }
}
