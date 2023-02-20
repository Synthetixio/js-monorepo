import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import {
  PositionLiquidated as PositionLiquidatedEvent,
  PositionModified as PositionModifiedEvent,
  DelayedOrderRemoved as DelayedOrderRemovedEvent,
  DelayedOrderSubmitted as DelayedOrderSubmittedEvent,
  FundingRecomputed as FundingRecomputedEvent,
} from '../generated/PerpsV2DelayedOrderETHPERP/PerpsV2DelayedOrderETHPERP';
import {
  PositionLiquidated,
  Trader,
  Synthetix,
  FuturesPosition,
  FuturesOrder,
  FuturesTrade,
  FundingRateUpdate,
} from '../generated/schema';

export function handlePositionLiquidated(event: PositionLiquidatedEvent): void {
  const positionLiquidatedEntity = new PositionLiquidated(event.params.id.toString());
  positionLiquidatedEntity.account = event.params.account;
  positionLiquidatedEntity.market = event.address;
  positionLiquidatedEntity.liquidator = event.params.liquidator;
  positionLiquidatedEntity.size = event.params.size.toBigDecimal();
  positionLiquidatedEntity.price = event.params.price.toBigDecimal();
  positionLiquidatedEntity.fee = event.params.fee.toBigDecimal();
  positionLiquidatedEntity.futuresPosition = event.address.toHex() + '-' + event.params.id.toHex();
  positionLiquidatedEntity.timestamp = event.block.timestamp;
  positionLiquidatedEntity.block = event.block.number;
  positionLiquidatedEntity.save();

  const tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  if (tradeEntity) {
    tradeEntity.size = event.params.size.times(BigInt.fromI32(-1));
    tradeEntity.positionSize = BigInt.fromI32(0);
    tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(event.params.fee);
    tradeEntity.pnl = tradeEntity.pnl.plus(event.params.fee);
    tradeEntity.save();
  }

  const synthetix = Synthetix.load('synthetix');
  if (synthetix) {
    synthetix.feesByLiquidations = synthetix.feesByLiquidations.plus(
      event.params.fee.toBigDecimal()
    );
    synthetix.totalLiquidations = synthetix.totalLiquidations.plus(BigInt.fromI32(1));

    const futuresPosition = FuturesPosition.load(
      event.address.toHex() + '-' + event.params.id.toHex()
    );
    if (futuresPosition) {
      futuresPosition.isLiquidated = true;
      futuresPosition.isOpen = false;
      futuresPosition.size = BigInt.fromI32(0);
      futuresPosition.closeTimestamp = event.block.timestamp;
      // @TODO MF talk to troy
      futuresPosition.pnl = futuresPosition.feesPaidToSynthetix.minus(futuresPosition.netFunding);
      futuresPosition.exitPrice = event.params.price;
      synthetix.totalVolume = synthetix.totalVolume.plus(
        futuresPosition.totalVolume.toBigDecimal()
      );
      futuresPosition.save();
    }
    synthetix.save();
  }
  let trader = Trader.load(event.params.account.toHex());
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
    trader.totalLiquidations = trader.totalLiquidations.plus(BigInt.fromI32(1));
    trader.totalMarginLiquidated = trader.totalMarginLiquidated.plus(
      event.params.size.toBigDecimal()
    );
    trader.save();
  }
}

export function handlePositionModified(event: PositionModifiedEvent): void {
  const positionId = event.address.toHex() + '-' + event.params.id.toHex();
  let futuresPosition = FuturesPosition.load(positionId);
  let trader = Trader.load(event.params.account.toHex());

  let synthetix = Synthetix.load('synthetix');
  // If it is the first time a position is getting opened, init Synthetix entity
  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.feesByPositionModifications = event.params.fee.toBigDecimal();
    synthetix.feesByLiquidations = BigDecimal.fromString('0');
    synthetix.totalLiquidations = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalVolume = event.params.tradeSize
      .times(event.params.lastPrice)
      .div(BigInt.fromI32(10).pow(18))
      .abs()
      .toBigDecimal();
  }
  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigDecimal.fromString('0');
    trader.feesPaidToSynthetix = event.params.fee.toBigDecimal();
    trader.totalVolume = event.params.tradeSize.toBigDecimal();
    trader.pnl = event.params.fee.times(BigInt.fromI32(-1));
    trader.trades = [event.transaction.hash.toHex() + '-' + event.logIndex.toString()];
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(1));
  } else {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
    // trader.totalVolume = event.params.tradeSize.toBigDecimal();
    trader.pnl = trader.pnl.plus(event.params.fee.times(BigInt.fromI32(-1)));
    const oldTrades = trader.trades;
    oldTrades.push(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
    trader.trades = oldTrades;
  }
  // New position when var futuresPosition is undefined
  if (!futuresPosition) {
    log.info('new position', []);
    futuresPosition = new FuturesPosition(positionId);
    futuresPosition.openTimestamp = event.block.timestamp;
    futuresPosition.account = event.params.account;
    futuresPosition.isOpen = true;
    futuresPosition.isLiquidated = false;
    futuresPosition.size = event.params.size;
    futuresPosition.feesPaidToSynthetix = event.params.fee;
    futuresPosition.initialMargin = event.params.margin.plus(event.params.fee);
    futuresPosition.margin = event.params.margin;
    // We should set the PNL to negative fee number, since the trader already paid it
    futuresPosition.pnl = event.params.fee.times(BigInt.fromI32(-1));
    futuresPosition.entryPrice = event.params.lastPrice;
    futuresPosition.lastPrice = event.params.lastPrice;
    futuresPosition.trades = BigInt.fromI32(1);
    futuresPosition.long = event.params.tradeSize.gt(BigInt.fromI32(0));
    futuresPosition.market = event.address;
    futuresPosition.fundingIndex = event.params.fundingIndex;
    // We update the leverage only when the user interacted with with the position
    futuresPosition.leverage = event.params.size
      .times(event.params.lastPrice)
      .div(event.params.margin)
      .abs();
    futuresPosition.netFunding = BigInt.fromI32(0);
    futuresPosition.totalVolume = event.params.tradeSize
      .times(event.params.lastPrice)
      .div(BigInt.fromI32(10).pow(18))
      .abs();

    const tradeEntity = new FuturesTrade(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    tradeEntity.timestamp = event.block.timestamp;
    tradeEntity.account = event.params.account;
    tradeEntity.positionId = positionId;
    tradeEntity.margin = event.params.margin.plus(event.params.fee);
    // Confusing but it is correct
    tradeEntity.size = event.params.tradeSize;
    tradeEntity.positionSize = event.params.size;
    tradeEntity.market = event.address;
    tradeEntity.price = event.params.lastPrice;
    tradeEntity.pnl = event.params.fee.times(BigInt.fromI32(-1));
    tradeEntity.feesPaidToSynthetix = event.params.fee;
    tradeEntity.positionClosed = false;
    tradeEntity.type = 'PositionOpened';
    tradeEntity.save();
  } else {
    // Position closed & not liquidated
    if (event.params.size.isZero() && !event.params.tradeSize.isZero() && futuresPosition) {
      log.info('position closed', []);

      const newPnl = event.params.lastPrice
        .minus(futuresPosition.lastPrice)
        .times(futuresPosition.size)
        .div(BigInt.fromI32(10).pow(18));

      futuresPosition.pnl = newPnl;
      futuresPosition.isOpen = false;
      futuresPosition.exitPrice = event.params.lastPrice;
      futuresPosition.closeTimestamp = event.block.timestamp;
      futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix
        .plus(event.params.fee)
        .minus(futuresPosition.netFunding);
      futuresPosition.margin = event.params.margin;
      futuresPosition.size = event.params.size;
      futuresPosition.lastPrice = event.params.lastPrice;
      futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
      futuresPosition.leverage = event.params.size
        .times(event.params.lastPrice)
        .div(event.params.margin)
        .abs();

      const tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );

      tradeEntity.timestamp = event.block.timestamp;
      tradeEntity.account = event.params.account;
      tradeEntity.positionId = positionId;
      tradeEntity.margin = event.params.margin.plus(event.params.fee);
      tradeEntity.size = event.params.tradeSize;
      tradeEntity.market = event.address;
      tradeEntity.price = event.params.lastPrice;
      tradeEntity.positionSize = event.params.size;
      tradeEntity.pnl = newPnl;
      tradeEntity.feesPaidToSynthetix = event.params.fee;
      tradeEntity.positionClosed = true;
      tradeEntity.type = 'PositionClosed';
      tradeEntity.save();

      trader.pnl = trader.pnl.plus(newPnl);

      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );
    }

    // If tradeSize and size are not zero, position got modified
    else if (!event.params.tradeSize.isZero() && !event.params.size.isZero() && futuresPosition) {
      log.info('position modified', []);

      const newPnl = event.params.lastPrice
        .minus(futuresPosition.lastPrice)
        .times(futuresPosition.size)
        .div(BigInt.fromI32(10).pow(18));

      futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(
        event.params.fee
      );
      futuresPosition.size = event.params.size;
      futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
      futuresPosition.margin = futuresPosition.margin.plus(event.params.margin);
      futuresPosition.lastPrice = event.params.lastPrice;
      futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));
      futuresPosition.pnl = newPnl;
      futuresPosition.leverage = event.params.size
        .times(event.params.lastPrice)
        .div(event.params.margin)
        .abs();

      let tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );
      tradeEntity.timestamp = event.block.timestamp;
      tradeEntity.account = event.params.account;
      tradeEntity.positionId = positionId;
      tradeEntity.margin = event.params.margin.plus(event.params.fee);
      tradeEntity.size = event.params.tradeSize;
      tradeEntity.market = event.address;
      tradeEntity.price = event.params.lastPrice;
      tradeEntity.positionSize = event.params.size;
      tradeEntity.feesPaidToSynthetix = event.params.fee;
      tradeEntity.positionClosed = false;
      tradeEntity.pnl = newPnl;
      tradeEntity.type = 'PositionModified';
      tradeEntity.save();

      const volume = event.params.tradeSize
        .times(event.params.lastPrice)
        .div(BigInt.fromI32(10).pow(18))
        .abs();

      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
      trader.totalVolume = trader.totalVolume.plus(volume.toBigDecimal());

      synthetix.totalVolume = synthetix.totalVolume.plus(volume.toBigDecimal());
      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );

      futuresPosition.totalVolume = futuresPosition.totalVolume.plus(volume);
    } else {
      log.debug('Transferred Margin Event skipped', []);
    }
  }
  // if there is an existing position...
  if (futuresPosition.fundingIndex != event.params.fundingIndex) {
    // add accrued funding to position
    let pastFundingEntity = FundingRateUpdate.load(
      event.address.toHex() + '-' + futuresPosition.fundingIndex.toString()
    );

    let currentFundingEntity = FundingRateUpdate.load(
      event.address.toHex() + '-' + event.params.fundingIndex.toString()
    );

    if (pastFundingEntity && currentFundingEntity) {
      // add accrued funding
      let fundingAccrued = currentFundingEntity.funding
        .minus(pastFundingEntity.funding)
        .times(futuresPosition.size)
        .div(BigInt.fromI32(10).pow(18));

      futuresPosition.netFunding = futuresPosition.netFunding.plus(fundingAccrued);
      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.minus(fundingAccrued.toBigDecimal());
    }
  }

  trader.save();
  synthetix.save();
  futuresPosition.save();
}

export function handleDelayedOrderRemoved(event: DelayedOrderRemovedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHexString()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);
  let trader = Trader.load(event.params.account.toHex());
  let synthetix = Synthetix.load('synthetix');
  if (synthetix) {
    synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
      event.params.keeperDeposit.toBigDecimal()
    );
    synthetix.save();
  }
  if (futuresOrderEntity) {
    futuresOrderEntity.fee = event.params.keeperDeposit;
    futuresOrderEntity.keeper = event.transaction.from;
    let tradeEntity = FuturesTrade.load(
      event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
    );

    if (trader && tradeEntity) {
      // if trade exists get the position
      let positionEntity = FuturesPosition.load(tradeEntity.positionId);

      // update order values
      futuresOrderEntity.status = 'Filled';
      tradeEntity.type = futuresOrderEntity.orderType;

      // add fee if not self-executed
      if (futuresOrderEntity.keeper != futuresOrderEntity.account) {
        tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
        trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(
          event.params.keeperDeposit.toBigDecimal()
        );
        if (positionEntity) {
          positionEntity.feesPaidToSynthetix = positionEntity.feesPaidToSynthetix.plus(
            event.params.keeperDeposit
          );
          positionEntity.save();
        }
        const oldTrades = trader.trades;
        oldTrades.push(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
        trader.trades = oldTrades;
        trader.save();
      }

      tradeEntity.save();
    } else if (trader) {
      if (futuresOrderEntity.keeper != futuresOrderEntity.account) {
        trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(
          event.params.keeperDeposit.toBigDecimal()
        );
        trader.save();
      }

      futuresOrderEntity.status = 'Cancelled';
    }

    futuresOrderEntity.save();
  }
}

export function handleDelayedOrderSubmitted(event: DelayedOrderSubmittedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHex()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);
  let trader = Trader.load(event.params.account.toHex());
  if (futuresOrderEntity == null) {
    futuresOrderEntity = new FuturesOrder(futuresOrderEntityId);
  }
  futuresOrderEntity.size = event.params.sizeDelta;
  futuresOrderEntity.market = event.address;
  futuresOrderEntity.fee = BigInt.fromI32(0);
  futuresOrderEntity.account = event.params.account;
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
  futuresOrderEntity.save();
}

export function handleFundingRecomputed(event: FundingRecomputedEvent): void {
  let futuresMarketAddress = event.address as Address;
  let fundingRateUpdateEntity = new FundingRateUpdate(
    futuresMarketAddress.toHex() + '-' + event.params.index.toString()
  );
  fundingRateUpdateEntity.timestamp = event.params.timestamp;
  fundingRateUpdateEntity.market = futuresMarketAddress;
  fundingRateUpdateEntity.sequenceLength = event.params.index;
  fundingRateUpdateEntity.funding = event.params.funding;
  fundingRateUpdateEntity.save();
}
