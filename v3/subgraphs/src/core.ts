import {
  PoolConfigurationSet,
  PoolCreated,
  PoolNameUpdated,
  PoolOwnershipAccepted,
} from '../generated/core/PoolModule';
import { MarketRegistered, UsdDeposited } from '../generated/core/MarketManagerModule';
import { Pool, Market, PoolAndMarket } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

// Utils
function concatIds(ids: string[]) {
  return ids.reduce((prev, cur) => (prev ? prev.concat('-').concat(cur) : cur), '');
}

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
    pool.updated_at_block = event.block.number;
    pool.updated_at = event.block.timestamp;
    pool.name = event.params.name.toString();
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
  event.params.markets.forEach((market, index) => {
    const m = Market.load(market.toString());
    if (m) {
      m.updated_at_block = event.block.number;
      m.updated_at = event.block.timestamp;
      // will this overflow?
      m.weight = BigInt.fromU64(event.params.weights.subarray(index)[0]);
      markets.push(m);
    }
  });
  if (pool !== null && !!markets.length) {
    markets.forEach((market) => {
      const poolAndMarket = new PoolAndMarket(concatIds([pool.id, market.id]));
      poolAndMarket.pool = event.params.poolId.toString();
      poolAndMarket.market = market.id;
      poolAndMarket.save();
    });
  }
}

// TODO @MF event name will change. Also update the subgraph.yaml file
export function usdMinted(event: UsdDeposited): void {
  const market = Market.load(event.params.marketId.toString());
  if (market !== null) {
    market.usd_minted = event.params.amount.toBigDecimal();
    market.updated_at = event.block.timestamp;
    market.updated_at_block = event.block.number;
  }
}

// TODO @MF event name will change. Also update the subgraph.yaml file
export function usdBurned(event: UsdDeposited): void {
  const market = Market.load(event.params.marketId.toString());
  if (market !== null) {
    market.usd_burned = event.params.amount.toBigDecimal();
    market.updated_at = event.block.timestamp;
    market.updated_at_block = event.block.number;
  }
}
