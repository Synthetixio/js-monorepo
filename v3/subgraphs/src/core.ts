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

// TOD @MF think of a way to avoid smart contract calls
// TODO @MF added comments

///////////
// Pool //
//////////

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
    pool.nominated_owner = Bytes.empty();
    pool.save();
  }
}

/////////////
// Market //
////////////

export function handleMarketCreated(event: MarketRegistered): void {
  const newMarket = new Market(event.params.marketId.toString());
  newMarket.address = event.params.market;
  newMarket.created_at = event.block.timestamp;
  newMarket.created_at_block = event.block.number;
  newMarket.updated_at = event.block.timestamp;
  newMarket.updated_at_block = event.block.number;
  newMarket.save();
}

export function handlePoolConfigurationSet(event: PoolConfigurationSet): void {
  const pool = Pool.load(event.params.poolId.toString());
  // Pool will be never undefined, though for safety reasons we are checking for that
  if (pool !== null) {
    // Reset the state because the new configuration is the only source of truth
    pool.configurations = [];
    // Creating a temporarily variable for figuring out which MarketConfiguration entity to delete
    const oldMarketConfigurationState: Map<string, string[]> = new Map<string, string[]>();
    for (let i = 0; i < event.params.markets.length; ++i) {
      const market = Market.load(event.params.markets.at(i).market.toString());
      if (market && market.configurations !== null) {
        oldMarketConfigurationState.set(market.id, changetype<string[]>(market.configurations));
        market.configurations = [];
      }
    }
    // Creating a temporarily variable for the pool.total_weight key
    const totalWeight: BigInt[] = [];
    for (let i = 0; i < event.params.markets.length; ++i) {
      const market = Market.load(event.params.markets.at(i).market.toString());
      if (market) {
        let marketConfiguration = MarketConfiguration.load(pool.id.concat('-').concat(market.id));
        if (marketConfiguration === null) {
          marketConfiguration = new MarketConfiguration(pool.id.concat('-').concat(market.id));
          marketConfiguration.created_at = event.block.timestamp;
          marketConfiguration.created_at_block = event.block.number;
        }
        marketConfiguration.weight = event.params.markets.at(i).weight;
        marketConfiguration.market = market.id;
        marketConfiguration.pool = event.params.poolId.toString();
        marketConfiguration.max_debt_share_value = event.params.markets
          .at(i)
          .maxDebtShareValue.toBigDecimal();
        marketConfiguration.updated_at = event.block.timestamp;
        marketConfiguration.updated_at_block = event.block.number;
        // If the market doesn't have configurations mapped, create an array with the current configurations id
        if (market.configurations === null) {
          market.configurations = [marketConfiguration.id];
          // Otherwise check if this configuration id is not included, if so, add it
        } else if (!market.configurations!.includes(marketConfiguration.id)) {
          // Set the new state to the current one, to add up the previously added entities
          let newState: string[];
          if (market.configurations !== null) {
            newState = changetype<string[]>(market.configurations);
          } else {
            newState = [];
          }
          newState.push(marketConfiguration.id);
          market.configurations = newState;
        }
        // If the new MarketConfiguration is not part of the old state, remove it from the store
        if (!oldMarketConfigurationState.get(market.id).includes(marketConfiguration.id)) {
          store.remove('MarketConfigurations', marketConfiguration.id);
        }
        if (pool.configurations === null) {
          pool.configurations = [marketConfiguration.id];
        } else if (!pool.configurations!.includes(marketConfiguration.id)) {
          // Set the new state to the current one, to add up the previously added entities
          let newState: string[];
          if (pool.configurations !== null) {
            newState = changetype<string[]>(pool.configurations);
          } else {
            newState = [];
          }
          newState.push(marketConfiguration.id);
          pool.configurations = newState;
        }
        totalWeight.push(event.params.markets.at(i).weight);
        market.updated_at = event.block.timestamp;
        market.updated_at_block = event.block.number;
        market.save();
        marketConfiguration.save();
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
    if (!market.net_issuance) {
      market.net_issuance = BigDecimal.fromString('0');
    }
    market.net_issuance = changetype<BigDecimal>(market.net_issuance).minus(
      event.params.amount.toBigDecimal()
    );
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
    if (!market.net_issuance) {
      market.net_issuance = BigDecimal.fromString('0');
    }
    market.net_issuance = changetype<BigDecimal>(market.net_issuance).plus(
      event.params.amount.toBigDecimal()
    );
    market.save();
  }
}

//////////////
// Account //
/////////////

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

/////////////////
// Collateral //
////////////////

export function handleCollateralConfigured(event: CollateralConfigured): void {
  let collateralType = CollateralType.load(event.params.collateralType.toHex());
  if (collateralType === null) {
    collateralType = new CollateralType(event.params.collateralType.toHex());
    collateralType.created_at = event.block.timestamp;
    collateralType.created_at_block = event.block.number;
  }
  collateralType.price_feed = event.params.priceFeed;
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
      // @dev we could also account for every account how much they deposited and withdrawn
      collateralType.total_amount_deposited = collateralType.total_amount_deposited!.minus(
        event.params.amount.toBigDecimal()
      );
    }
    collateralType.save();
  }
}

/////////////////
// Permission //
////////////////

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

///////////////////////
// Position + Vault //
//////////////////////

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
    position.account = event.params.accountId.toString();
    position.pool = event.params.poolId.toString();
    position.collateral_type = event.params.collateralType.toHex();
    position.collateral_amount = event.params.amount.toBigDecimal();
  }
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
    vault.collateral_type = event.params.collateralType.toHex();
    vault.pool = event.params.poolId.toString();
  } else {
    vault.collateral_amount = vault.collateral_amount.plus(collateralAmountChange);
  }
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
    if (position.net_issuance !== null) {
      position.net_issuance = position.net_issuance!.plus(event.params.amount.toBigDecimal());
    } else {
      position.net_issuance = event.params.amount.toBigDecimal();
    }
    position.save();
  }
}

export function handleUSDBurned(event: UsdBurned): void {
  const position = Position.load(
    event.params.accountId
      .toString()
      .concat(
        '-'.concat(
          event.params.poolId.toString().concat('-').concat(event.params.collateralType.toHex())
        )
      )
  );
  if (position !== null) {
    if (position.total_burned !== null) {
      position.total_burned = position.total_burned!.plus(event.params.amount.toBigDecimal());
    } else {
      position.total_burned = event.params.amount.toBigDecimal();
    }
    if (position.net_issuance !== null) {
      position.net_issuance = position.net_issuance!.plus(event.params.amount.toBigDecimal());
    } else {
      position.net_issuance = event.params.amount.toBigDecimal();
    }
    position.updated_at = event.block.timestamp;
    position.updated_at_block = event.block.number;
    position.save();
  }
}
