import {
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
  PoolConfigurationSet,
  PoolNominationRenounced,
  PoolNominationRevoked,
  NominatedPoolOwner,
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
  CollateralType,
  Account,
  AccountPermissionUsers,
  Vault,
  Position,
  MarketConfiguration,
} from '../generated/schema';
import { BigDecimal, BigInt, Bytes, store } from '@graphprotocol/graph-ts';

////////////////////
// Event handlers //
////////////////////

export function handlePoolCreated(event: PoolCreated): void {
  const newPool = new Pool(event.params.poolId.toString());
  newPool.owner = event.params.owner;
  newPool.created_at = event.block.timestamp;
  newPool.created_at_block = event.block.number;
  newPool.updated_at = event.block.timestamp;
  newPool.updated_at_block = event.block.number;
  newPool.save();
}

export function handleNominatedPoolOwner(event: NominatedPoolOwner): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.nominated_owner = event.params.owner;
    pool.updated_at = event.block.timestamp;
    pool.updated_at_block = event.block.number;
    pool.save();
  }
}

export function handlePoolNominationRenounced(event: PoolNominationRenounced): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.nominated_owner = Bytes.empty();
    pool.updated_at = event.block.timestamp;
    pool.updated_at_block = event.block.number;
    pool.save();
  }
}

export function handlePoolNominationRevoked(event: PoolNominationRevoked): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    pool.nominated_owner = Bytes.empty();
    pool.updated_at = event.block.timestamp;
    pool.updated_at_block = event.block.number;
    pool.save();
  }
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
  newMarket.updated_at = event.block.timestamp;
  newMarket.updated_at_block = event.block.number;
  newMarket.save();
}

export function handleAccountCreated(event: AccountCreated): void {
  const account = new Account(event.params.accountId.toString());
  account.owner = event.params.sender;
  account.created_at = event.block.timestamp;
  account.created_at_block = event.block.number;
  account.updated_at = event.block.timestamp;
  account.updated_at_block = event.block.number;
  account.permissions = [];
  account.save();
}

export function handlePoolConfigurationSet(event: PoolConfigurationSet): void {
  const pool = Pool.load(event.params.poolId.toString());
  if (pool !== null) {
    const totalWeight: BigInt[] = [];
    for (let i = 0; i < event.params.markets.length; ++i) {
      const m = Market.load(event.params.markets.at(i).market.toString());
      if (m && pool) {
        let marketConfiguration = MarketConfiguration.load(pool.id.concat('-').concat(m.id));
        if (marketConfiguration === null) {
          marketConfiguration = new MarketConfiguration(pool.id.concat('-').concat(m.id));
          marketConfiguration.created_at = event.block.timestamp;
          marketConfiguration.created_at_block = event.block.number;
        }
        if (marketConfiguration) {
          marketConfiguration.weight = event.params.markets.at(i).weight;
          marketConfiguration.market = event.params.markets.at(i).market.toString();
          marketConfiguration.pool = event.params.poolId.toString();
          marketConfiguration.max_debt_share_value = event.params.markets
            .at(i)
            .maxDebtShareValue.toBigDecimal();
          const id = marketConfiguration.id;
          if (m.configurations === null) {
            m.configurations = [id];
          } else if (!m.configurations!.includes(marketConfiguration.id)) {
            const newState = m.configurations;
            newState!.push(id);
            m.configurations = newState;
          }

          if (pool.configurations === null) {
            pool.configurations = [id];
          } else if (!pool.configurations!.includes(marketConfiguration.id)) {
            const newState = pool.configurations;
            newState!.push(id);
            pool.configurations = newState;
          }
          totalWeight.push(event.params.markets.at(i).weight);
          m.updated_at = event.block.timestamp;
          m.updated_at_block = event.block.number;
          m.save();
          marketConfiguration.save();
        }
      }
    }
    pool.total_weight = totalWeight.reduce((prev, next) => {
      prev = prev.plus(next);
      return prev;
    }, BigInt.fromU64(0));
    pool.updated_at = event.block.timestamp;
    pool.updated_at_block = event.block.number;
    pool.save();
  }
}

export function handleMarketUsdDeposited(event: MarketUsdDeposited): void {
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
      market.net_issuance = market.usd_withdrawn!.minus(market.usd_deposited!);
    } else {
      market.net_issuance = event.params.amount.toBigDecimal();
    }
    market.save();
  }
}

export function handleMarketUsdWithdrawn(event: MarketUsdWithdrawn): void {
  const market = Market.load(event.params.marketId.toString());
  if (market !== null) {
    const contract = MarketManagerModule.bind(event.address);
    market.reported_debt = contract.getMarketReportedDebt(event.params.marketId).toBigDecimal();
    if (market.usd_withdrawn === null) {
      market.usd_withdrawn = event.params.amount.toBigDecimal();
    } else {
      market.usd_withdrawn = market.usd_withdrawn!.plus(event.params.amount.toBigDecimal());
    }
    market.usd_withdrawn = event.params.amount.toBigDecimal();
    market.updated_at = event.block.timestamp;
    market.updated_at_block = event.block.number;
    if (market.usd_withdrawn !== null && market.usd_deposited !== null) {
      market.net_issuance = market.usd_withdrawn!.minus(market.usd_deposited!);
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
  collateralType.address_price_feed = event.params.priceFeed;
  collateralType.token = event.params.collateralType;
  collateralType.updated_at = event.block.timestamp;
  collateralType.updated_at_block = event.block.number;
  collateralType.liquidation_reward = event.params.liquidationReward.toBigDecimal();
  collateralType.minimum_c_ratio = event.params.minimumCollateralizationRatio.toBigDecimal();
  collateralType.depositing_enabled = event.params.depositingEnabled;
  collateralType.target_c_ratio = event.params.targetCollateralizationRatio.toBigDecimal();
  collateralType.save();
}

export function handleDeposited(event: Deposited): void {
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (collateralType.total_amount_deposited !== null) {
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.plus(
        event.params.amount.toBigDecimal()
      );
    } else {
      collateralType.total_amount_deposited = event.params.amount.toBigDecimal();
    }
    collateralType.save();
  }
}

export function handleWithdrawn(event: Withdrawn): void {
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType) {
    collateralType.updated_at = event.block.timestamp;
    collateralType.updated_at_block = event.block.number;
    if (collateralType.total_amount_deposited !== null) {
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.minus(
        event.params.amount.toBigDecimal()
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
    if (permissions === null) {
      permissions = new AccountPermissionUsers(
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
      );
      permissions.created_at = event.block.timestamp;
      permissions.created_at_block = event.block.number;
      permissions.permissions = [event.params.permission];
    } else {
      const newState = permissions.permissions;
      newState.push(event.params.permission);
      permissions.permissions = newState;
    }
    permissions.updated_at = event.block.timestamp;
    permissions.updated_at_block = event.block.number;
    permissions.address = event.params.user;
    permissions.account = account.id;
    permissions.updated_at = event.block.timestamp;
    permissions.updated_at_block = event.block.number;
    if (account.permissions === null) {
      account.permissions = [permissions.id];
    } else if (!account.permissions!.includes(permissions.id)) {
      const newState = account.permissions!;
      newState.push(permissions.id);
      account.permissions = newState;
    }
    account.updated_at = event.block.timestamp;
    account.updated_at_block = event.block.number;
    permissions.save();
    account.save();
  }
}

export function handlePermissionRevoked(event: PermissionRevoked): void {
  const account = Account.load(event.params.accountId.toString());
  const permissions = AccountPermissionUsers.load(
    event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
  );
  if (account !== null && permissions !== null) {
    const newState: Bytes[] = [];
    for (let i = 0; i < permissions.permissions.length; ++i) {
      if (permissions.permissions.at(i) !== event.params.permission) {
        newState.push(permissions.permissions.at(i));
      }
    }
    if (newState.length === 0) {
      store.remove(
        'AccountPermissionUsers',
        event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
      );
      const newAccountIdsState: string[] = [];
      for (let i = 0; i < account.permissions!.length; ++i) {
        if (
          account.permissions!.at(i) !==
          event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
        ) {
          newAccountIdsState.push(
            event.params.accountId.toString().concat('-').concat(event.params.user.toHex())
          );
        }
      }
      account.permissions = newAccountIdsState;
    } else {
      permissions.permissions = newState;
    }
    permissions.updated_at = event.block.timestamp;
    permissions.updated_at_block = event.block.number;
    account.updated_at = event.block.timestamp;
    account.updated_at_block = event.block.number;
    account.save();
    permissions.save();
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
    position.collateral_amount = event.params.amount.toBigDecimal();
  }
  position.account = event.params.accountId.toString();
  position.pool = event.params.poolId.toString();
  if (position.total_burned && position.total_minted) {
    position.net_issuance = position.total_minted!.minus(position.total_burned!);
  }
  position.collateral_type = event.params.collateralType.toHex();
  const collateralAmountChange = event.params.amount
    .toBigDecimal()
    .minus(position.collateral_amount);
  position.collateral_amount = event.params.amount.toBigDecimal();
  position.updated_at = event.block.timestamp;
  position.updated_at_block = event.block.number;
  position.c_ratio = VaultModule.bind(event.address)
    .getPositionCollateralizationRatio(
      event.params.accountId,
      event.params.poolId,
      event.params.collateralType
    )
    .toBigDecimal();
  position.leverage = event.params.leverage.toBigDecimal();
  let vault = Vault.load(
    event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
  );
  if (vault === null) {
    vault = new Vault(
      event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
    );
    vault.created_at = event.block.timestamp;
    vault.created_at_block = event.block.number;
    vault.collateral_amount = event.params.amount.toBigDecimal();
  } else {
    vault.collateral_amount = vault.collateral_amount.plus(collateralAmountChange);
  }
  vault.collateral_type = event.params.collateralType.toHex();
  vault.pool = event.params.poolId.toString();
  vault.updated_at = event.block.timestamp;
  vault.updated_at_block = event.block.number;
  vault.save();
  position.save();
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
      position.total_minted = position.total_minted!.plus(event.params.amount.toBigDecimal());
    } else {
      position.total_minted = event.params.amount.toBigDecimal();
    }
    if (position.total_minted && position.total_burned) {
      position.net_issuance = position.total_minted!.minus(position.total_burned!);
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
    if (position.total_burned !== null) {
      position.total_burned = position.total_burned!.plus(event.params.amount.toBigDecimal());
    } else {
      position.total_burned = event.params.amount.toBigDecimal();
    }
    if (position.total_burned && position.total_burned) {
      position.net_issuance = position.total_minted!.minus(position.total_burned!);
    }
    position.updated_at = event.block.timestamp;
    position.updated_at_block = event.block.number;
    position.save();
  }
}
