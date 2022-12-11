import {
  MarketRegistered,
  MarketManagerModule,
  MarketUsdDeposited,
  MarketUsdWithdrawn,
} from '../generated/MarketManagerModule/MarketManagerModule';
import { Market, MarketSnapshot } from '../generated/schema';
import { BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';

export function handleMarketCreated(event: MarketRegistered): void {
  const newMarket = new Market(event.params.marketId.toString());
  newMarket.address = event.params.market;
  newMarket.created_at = event.block.timestamp;
  newMarket.created_at_block = event.block.number;
  newMarket.updated_at = event.block.timestamp;
  newMarket.updated_at_block = event.block.number;
  newMarket.usd_deposited = BigDecimal.fromString('0');
  newMarket.usd_withdrawn = BigDecimal.fromString('0');
  newMarket.net_issuance = BigDecimal.fromString('0');
  newMarket.reported_debt = BigDecimal.fromString('0');
  newMarket.save();
}

function createMarketSnapshot(
  marketId: string,
  timestamp: BigInt,
  usdDeposited: BigDecimal,
  usdWithdrawn: BigDecimal,
  netIssuance: BigDecimal,
  reportedDebt: BigDecimal
): void {
  const newMarketSnapshot = new MarketSnapshot(marketId.concat('-').concat(timestamp.toString()));
  newMarketSnapshot.market_id = marketId;
  newMarketSnapshot.usd_deposited = usdDeposited;
  newMarketSnapshot.usd_withdrawn = usdWithdrawn;
  newMarketSnapshot.net_issuance = netIssuance;
  newMarketSnapshot.reported_debt = reportedDebt;
  newMarketSnapshot.timestamp = timestamp;

  newMarketSnapshot.save();
}

export function handleMarketUsdDeposited(event: MarketUsdDeposited): void {
  const marketId = event.params.marketId.toString();
  const market = Market.load(marketId);
  if (market == null) {
    log.error(
      'Something went wrong, got a MarketUsdDeposited event for a market that doesnt exists ' +
        event.params.marketId.toString(),
      []
    );
    return;
  }
  const timestamp = event.block.timestamp;
  const usdDeposited = market.usd_deposited.plus(event.params.amount.toBigDecimal());
  const usdWithdrawn = market.usd_withdrawn; // unchanged
  const contract = MarketManagerModule.bind(event.address);
  const reportedDebt = contract.getMarketReportedDebt(event.params.marketId).toBigDecimal();
  const netIssuance = market.net_issuance.minus(event.params.amount.toBigDecimal());
  market.reported_debt = reportedDebt;
  market.updated_at = timestamp;
  market.updated_at_block = event.block.number;
  market.net_issuance = netIssuance;
  market.usd_deposited = usdDeposited;
  market.save();
  createMarketSnapshot(marketId, timestamp, usdDeposited, usdWithdrawn, netIssuance, reportedDebt);
}

export function handleMarketUsdWithdrawn(event: MarketUsdWithdrawn): void {
  const marketId = event.params.marketId.toString();

  const market = Market.load(marketId);
  if (market == null) {
    log.error(
      'Something went wrong, got a MarketUsdWithdrawn event for a market that doesnt exists ' +
        event.params.marketId.toString(),
      []
    );
    return;
  }

  const timestamp = event.block.timestamp;
  const usdDeposited = market.usd_deposited; // unchanged
  const usdWithdrawn = market.usd_withdrawn.plus(event.params.amount.toBigDecimal());
  const contract = MarketManagerModule.bind(event.address);
  const reportedDebt = contract.getMarketReportedDebt(event.params.marketId).toBigDecimal();
  const netIssuance = market.net_issuance.plus(event.params.amount.toBigDecimal());
  market.reported_debt = reportedDebt;
  market.updated_at = timestamp;
  market.updated_at_block = event.block.number;
  market.net_issuance = netIssuance;
  market.usd_withdrawn = usdWithdrawn;
  market.save();

  createMarketSnapshot(marketId, timestamp, usdDeposited, usdWithdrawn, netIssuance, reportedDebt);
}
