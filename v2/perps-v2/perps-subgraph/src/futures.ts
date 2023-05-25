import { Address, BigInt, DataSourceContext } from '@graphprotocol/graph-ts';
import {
  DelayedOrderRemoved as DelayedOrderRemovedEvent,
  DelayedOrderSubmitted as DelayedOrderSubmittedEvent,
  FundingRecomputed as FundingRecomputedEvent,
  MarginTransferred as MarginTransferredEvent,
  MarketAdded as MarketAddedEvent,
  MarketRemoved as MarketRemovedEvent,
  PerpsTracking as PerpsTrackingEvent,
  PositionFlagged as PositionFlaggedEventNew,
  PositionFlagged1 as PositionFlaggedEventOld,
} from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import {
  Frontend,
  FundingRateUpdate,
  FuturesMarginTransfer,
  FuturesMarket,
  FuturesOrder,
  FuturesPosition,
  FuturesTrade,
  PositionFlagged,
  Synthetix,
  Trader,
} from '../generated/schema';
import { PerpetualFuturesMarket } from '../generated/templates';
import { updateFeeStats } from './historical-trade-stats';
export * from './liquidation';
export { handlePositionModified } from './position-modified';

export function handleFuturesMarketAdded(event: MarketAddedEvent): void {
  let marketEntity = new FuturesMarket(event.params.market.toHex());
  marketEntity.asset = event.params.asset;
  marketEntity.marketKey = event.params.marketKey;
  marketEntity.timestamp = event.block.timestamp;
  marketEntity.isActive = true;
  marketEntity.save();

  if (event.params.marketKey.toString().endsWith('PERP')) {
    let context = new DataSourceContext();
    PerpetualFuturesMarket.createWithContext(event.params.market, context);
  }
}

export function handleFuturesMarketRemoved(event: MarketRemovedEvent): void {
  let marketEntity = FuturesMarket.load(event.params.market.toHex());
  if (marketEntity) {
    marketEntity.isActive = false;
    marketEntity.save();
  }
}

export function handlePositionFlagged(event: PositionFlaggedEventNew): void {
  const positionFlaggedEntity = new PositionFlagged(
    event.address.toHex() + '-' + event.params.id.toString()
  );

  positionFlaggedEntity.price = event.params.price;
  positionFlaggedEntity.flagger = event.params.flagger;
  positionFlaggedEntity.timestamp = event.block.timestamp;
  positionFlaggedEntity.trader = event.params.account.toHex();
  positionFlaggedEntity.save();
}

export function handlePositionFlaggedOld(event: PositionFlaggedEventOld): void {
  const positionFlaggedEntity = new PositionFlagged(
    event.address.toHex() + '-' + event.params.id.toString()
  );
  positionFlaggedEntity.price = null;
  positionFlaggedEntity.flagger = event.params.flagger;
  positionFlaggedEntity.timestamp = event.block.timestamp;
  positionFlaggedEntity.trader = event.params.account.toHex();
  positionFlaggedEntity.save();
}

export function handleMarginTransferred(event: MarginTransferredEvent): void {
  let trader = Trader.load(event.params.account.toHex());
  let synthetix = Synthetix.load('synthetix');
  const marginTransferEntity = new FuturesMarginTransfer(
    event.address.toHex() + '-' + event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  marginTransferEntity.market = event.address.toHex();
  marginTransferEntity.size = event.params.marginDelta;
  marginTransferEntity.trader = event.params.account.toHex();
  marginTransferEntity.timestamp = event.block.timestamp;
  marginTransferEntity.txHash = event.transaction.hash.toHex();

  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.feesByLiquidations = BigInt.fromI32(0);
    synthetix.feesByPositionModifications = BigInt.fromI32(0);
    synthetix.totalLiquidations = BigInt.fromI32(0);
    synthetix.totalVolume = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalTrades = BigInt.fromI32(0);
  }

  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.createdAt = event.block.timestamp;
    trader.feesPaidToSynthetix = BigInt.fromI32(0);
    trader.trades = [];
    trader.totalVolume = BigInt.fromI32(0);
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigInt.fromI32(0);
    trader.margin = event.params.marginDelta;
    trader.realizedPnl = BigInt.fromI32(0);
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(0));
  } else {
    trader.margin = trader.margin.plus(event.params.marginDelta);
  }
  marginTransferEntity.save();
  synthetix.save();
  trader.save();
}

export function handleDelayedOrderRemoved(event: DelayedOrderRemovedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHexString()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);
  let trader = Trader.load(event.params.account.toHex());
  let tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  const synthetix = Synthetix.load('synthetix');

  // Update FuturesOrderEntity
  if (futuresOrderEntity) {
    futuresOrderEntity.fee = event.params.keeperDeposit;
    futuresOrderEntity.keeper = event.transaction.from;
    if (tradeEntity) {
      // All fee data is based on trade entity, only update keeper fee if trade is created
      updateFeeStats(event.params.keeperDeposit, event.address, event.block.timestamp);

      // Trade entity updates
      tradeEntity.futuresOrder = futuresOrderEntity.id;
      tradeEntity.marketOrder = false;
      // add fee if not self-executed
      if (futuresOrderEntity.keeper.toString() != futuresOrderEntity.trader) {
        tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
      }
      tradeEntity.save();

      // Update FuturesPosition
      let positionEntity = FuturesPosition.load(tradeEntity.futuresPosition);
      if (positionEntity) {
        positionEntity.feesPaidToSynthetix = positionEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
        positionEntity.realizedPnl = positionEntity.realizedPnl.minus(event.params.keeperDeposit);
        positionEntity.save();
      }

      // Update Synthetix values
      if (synthetix) {
        synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
          event.params.keeperDeposit
        );
        synthetix.save();
      }

      // Update Trader fee value
      if (trader) {
        trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.keeperDeposit);
        trader.save();
      }
      // Update FuturesOrderEntity
      futuresOrderEntity.futuresPosition = tradeEntity.futuresPosition;
      futuresOrderEntity.status = 'Filled';
      futuresOrderEntity.txHash = event.transaction.hash.toHex();
      futuresOrderEntity.save();
    } else {
      futuresOrderEntity.status = 'Cancelled';
      futuresOrderEntity.txHash = event.transaction.hash.toHex();
      futuresOrderEntity.save();
    }
  }
}

export function handleDelayedOrderSubmitted(event: DelayedOrderSubmittedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHex()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);

  if (!futuresOrderEntity) {
    futuresOrderEntity = new FuturesOrder(futuresOrderEntityId);
  }
  futuresOrderEntity.size = event.params.sizeDelta;
  futuresOrderEntity.market = event.address.toHex();
  futuresOrderEntity.fee = BigInt.fromI32(0);
  futuresOrderEntity.trader = event.params.account.toHex();
  futuresOrderEntity.orderId = event.params.targetRoundId;
  futuresOrderEntity.targetRoundId = event.params.targetRoundId;
  futuresOrderEntity.targetPrice = BigInt.fromI32(0);
  futuresOrderEntity.marginDelta = BigInt.fromI32(0);
  futuresOrderEntity.timestamp = event.block.timestamp;
  futuresOrderEntity.orderType = event.params.isOffchain
    ? 'DelayedOffchainSubmitted'
    : 'DelayedOrderSubmitted';
  futuresOrderEntity.status = 'Pending';
  futuresOrderEntity.keeper = Address.fromHexString('0x0000000000000000000000000000000000000000');
  futuresOrderEntity.txHash = event.transaction.hash.toHex();
  futuresOrderEntity.save();
}

export function handleFundingRecomputed(event: FundingRecomputedEvent): void {
  let futuresMarketAddress = event.address;
  let fundingRateUpdateEntity = new FundingRateUpdate(
    futuresMarketAddress.toHex() + '-' + event.params.index.toString()
  );
  fundingRateUpdateEntity.timestamp = event.params.timestamp;
  fundingRateUpdateEntity.market = futuresMarketAddress.toHex();
  fundingRateUpdateEntity.fundingRate = event.params.fundingRate;
  fundingRateUpdateEntity.funding = event.params.funding;
  fundingRateUpdateEntity.index = event.params.index;
  fundingRateUpdateEntity.save();
}

export function handlePerpsTracking(event: PerpsTrackingEvent): void {
  let frontend = Frontend.load(event.params.trackingCode.toString());
  if (!frontend) {
    frontend = new Frontend(event.params.trackingCode.toString());
    frontend.markets = [event.address.toHex()];
    frontend.amount = event.params.sizeDelta.abs();
    frontend.fees = event.params.fee;
  } else {
    frontend.amount = frontend.amount.plus(event.params.sizeDelta.abs());
    frontend.fees = frontend.fees.plus(event.params.fee.abs());
    if (!frontend.markets.includes(event.address.toHex())) {
      const oldMarkets = frontend.markets;
      oldMarkets.push(event.address.toHex());
      frontend.markets = oldMarkets;
    }
  }
  frontend.save();
}
