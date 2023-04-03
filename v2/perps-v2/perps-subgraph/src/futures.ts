import { Address, BigInt, DataSourceContext, log } from '@graphprotocol/graph-ts';
import { PerpetualFuturesMarket } from '../generated/templates';
import {
  DelayedOrderRemoved as DelayedOrderRemovedEvent,
  DelayedOrderSubmitted as DelayedOrderSubmittedEvent,
  FundingRecomputed as FundingRecomputedEvent,
  PositionLiquidated as PositionLiquidatedEvent,
  MarginTransferred as MarginTransferredEvent,
  MarketAdded as MarketAddedEvent,
  MarketRemoved as MarketRemovedEvent,
  PerpsTracking as PerpsTrackingEvent,
  PositionFlagged as PositionFlaggedEvent,
} from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import {
  PositionLiquidated,
  Trader,
  Synthetix,
  FuturesPosition,
  FuturesOrder,
  FuturesTrade,
  FundingRateUpdate,
  FuturesMarginTransfer,
  FuturesMarket,
  Frontend,
  PositionFlagged,
} from '../generated/schema';
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

export function handlePositionFlagged(event: PositionFlaggedEvent): void {
  const positionFlaggedEntity = new PositionFlagged(
    event.address.toHex() + '-' + event.params.id.toString()
  );
  positionFlaggedEntity.flagger = event.params.flagger;
  positionFlaggedEntity.timestamp = event.block.timestamp;
  positionFlaggedEntity.trader = event.params.account.toHex();
  positionFlaggedEntity.save();
}

export function handlePositionLiquidated(event: PositionLiquidatedEvent): void {
  const futuresPositionId = event.address.toHex() + '-' + event.params.id.toHex();
  const positionLiquidatedEntity = new PositionLiquidated(event.params.id.toString());
  positionLiquidatedEntity.trader = event.params.account.toHex();
  positionLiquidatedEntity.market = event.address.toHex();
  positionLiquidatedEntity.liquidator = event.params.liquidator;
  positionLiquidatedEntity.size = event.params.size;
  positionLiquidatedEntity.price = event.params.price;
  positionLiquidatedEntity.fee = event.params.fee;
  positionLiquidatedEntity.futuresPosition = futuresPositionId;
  positionLiquidatedEntity.timestamp = event.block.timestamp;
  positionLiquidatedEntity.txHash = event.transaction.hash.toHex();
  positionLiquidatedEntity.save();

  const tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  if (tradeEntity) {
    tradeEntity.size = event.params.size.times(BigInt.fromI32(-1));
    tradeEntity.positionClosed = true;
    tradeEntity.timestamp = event.block.timestamp;
    tradeEntity.trader = event.params.account.toHex();
    tradeEntity.futuresPosition = futuresPositionId;
    tradeEntity.price = event.params.price;
    tradeEntity.txHash = event.transaction.hash.toHex();
    tradeEntity.positionSize = BigInt.fromI32(0);
    tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(event.params.fee);

    // TODO make sure this is correct. I think we need to subtract something else.
    tradeEntity.realizedPnl = tradeEntity.realizedPnl
      .minus(event.params.fee)
      .minus(tradeEntity.netFunding); // you loose funding when liquidated
    tradeEntity.netFunding = BigInt.fromI32(0);
    tradeEntity.type = 'Liquidated';
    tradeEntity.save();
  }

  const synthetix = Synthetix.load('synthetix');
  if (synthetix) {
    synthetix.feesByLiquidations = synthetix.feesByLiquidations.plus(event.params.fee);
    synthetix.totalLiquidations = synthetix.totalLiquidations.plus(BigInt.fromI32(1));
    synthetix.save();
  }

  const futuresPosition = FuturesPosition.load(futuresPositionId);
  if (futuresPosition) {
    futuresPosition.isLiquidated = true;
    futuresPosition.isOpen = false;
    futuresPosition.closeTimestamp = event.block.timestamp;
    futuresPosition.feesPaidToSynthetix = event.params.fee;
    futuresPosition.exitPrice = event.params.price;
    futuresPosition.save();
  }

  let trader = Trader.load(event.params.account.toHex());
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee);
    trader.totalLiquidations = trader.totalLiquidations.plus(BigInt.fromI32(1));
    trader.totalMarginLiquidated = trader.totalMarginLiquidated.plus(event.params.size);
    trader.margin = trader.margin.minus(event.params.size);
    trader.save();
  }
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
  }

  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.timestamp = event.block.timestamp;
    trader.feesPaidToSynthetix = BigInt.fromI32(0);
    trader.trades = [];
    trader.totalVolume = event.params.marginDelta;
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigInt.fromI32(0);
    trader.margin = event.params.marginDelta;
    trader.realizedPnl = BigInt.fromI32(0);
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(0));
  } else {
    if (event.params.marginDelta.gt(BigInt.fromI32(0))) {
      trader.margin = trader.margin.plus(event.params.marginDelta);
    } else if (event.params.marginDelta.lt(BigInt.fromI32(0))) {
      trader.margin = trader.margin.minus(event.params.marginDelta);
    }
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
      futuresOrderEntity.futuresPosition = tradeEntity.futuresPosition;
      futuresOrderEntity.status = 'Filled';

      let positionEntity = FuturesPosition.load(tradeEntity.futuresPosition);
      if (positionEntity) {
        positionEntity.feesPaidToSynthetix = positionEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
        positionEntity.save();
      }
      // add fee if not self-executed
      if (futuresOrderEntity.keeper.toString() != futuresOrderEntity.trader) {
        tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
        tradeEntity.save();
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
  let futuresMarketAddress = event.address as Address;
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
