import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import {
  PositionLiquidated as PositionLiquidatedEvent,
  PositionModified as PositionModifiedEvent,
  DelayedOrderRemoved as DelayedOrderRemovedEvent,
  DelayedOrderSubmitted as DelayedOrderSubmittedEvent,
  FundingRecomputed as FundingRecomputedEvent,
  MarginTransferred as MarginTransferredEvent,
  NextPriceOrderSubmitted as NextPriceOrderSubmittedEvent,
  NextPriceOrderRemoved as NextPriceOrderRemovedEvent,
} from '../generated/PerpsV2ProxyAAVEPERP/PerpsV2Proxy';
import {
  PositionLiquidated,
  Trader,
  Synthetix,
  FuturesPosition,
  FuturesOrder,
  FuturesTrade,
  FundingRateUpdate,
  FuturesMarginTransfer,
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
  positionLiquidatedEntity.txHash = event.transaction.hash.toHex();

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
    synthetix.save();
  }

  const futuresPosition = FuturesPosition.load(
    event.address.toHex() + '-' + event.params.id.toHex()
  );
  if (futuresPosition) {
    futuresPosition.isLiquidated = true;
    futuresPosition.isOpen = false;
    futuresPosition.closeTimestamp = event.block.timestamp;
    futuresPosition.feesPaidToSynthetix = event.params.fee;
    futuresPosition.pnl = futuresPosition.pnl
      .minus(futuresPosition.feesPaidToSynthetix)
      .plus(futuresPosition.netFunding);
    futuresPosition.exitPrice = event.params.price;

    futuresPosition.save();
  }

  let trader = Trader.load(event.params.account.toHex());
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
    trader.totalLiquidations = trader.totalLiquidations.plus(BigInt.fromI32(1));
    trader.totalMarginLiquidated = trader.totalMarginLiquidated.plus(
      event.params.size.toBigDecimal()
    );
    trader.margin = trader.margin.minus(event.params.size.toBigDecimal());
    trader.save();
  }
  positionLiquidatedEntity.save();
}

export function handleMarginTransferred(event: MarginTransferredEvent): void {
  let trader = Trader.load(event.params.account.toHex());
  const marginTransferEntity = new FuturesMarginTransfer(
    event.address.toHex() + '-' + event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  marginTransferEntity.timestamp = event.block.timestamp;
  marginTransferEntity.account = event.params.account;
  marginTransferEntity.market = event.address;
  marginTransferEntity.size = event.params.marginDelta;
  marginTransferEntity.txHash = event.transaction.hash.toHex();
  marginTransferEntity.save();
  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.feesPaidToSynthetix = BigDecimal.fromString('0');
    trader.trades = [];
    trader.totalVolume = event.params.marginDelta.toBigDecimal();
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigDecimal.fromString('0');
    trader.margin = event.params.marginDelta.toBigDecimal();
    trader.pnl = BigInt.fromI32(0);
  } else {
    if (event.params.marginDelta.gt(BigInt.fromI32(0))) {
      trader.margin = trader.margin.plus(event.params.marginDelta.toBigDecimal());
    } else if (event.params.marginDelta.lt(BigInt.fromI32(0))) {
      trader.margin = trader.margin.minus(event.params.marginDelta.toBigDecimal());
    }
  }
  trader.save();
}

export function handlePositionModified(event: PositionModifiedEvent): void {
  const positionId = event.address.toHex() + '-' + event.params.id.toHex();
  let futuresPosition = FuturesPosition.load(positionId);
  let trader = Trader.load(event.params.account.toHex());

  let synthetix = Synthetix.load('synthetix');

  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.feesByPositionModifications = BigDecimal.fromString('0');
    synthetix.feesByLiquidations = BigDecimal.fromString('0');
    synthetix.totalLiquidations = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalVolume = BigDecimal.fromString('0');
  }

  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigDecimal.fromString('0');
    trader.feesPaidToSynthetix = event.params.fee.toBigDecimal();
    trader.totalVolume = BigDecimal.fromString('0');
    trader.pnl = BigInt.fromI32(0);
    trader.trades = [event.transaction.hash.toHex() + '-' + event.logIndex.toString()];
    trader.margin = BigDecimal.fromString('0');
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(1));
  } else {
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
    futuresPosition.avgEntryPrice = event.params.lastPrice;
    futuresPosition.feesPaidToSynthetix = event.params.fee;
    futuresPosition.netTransfers = BigInt.fromI32(0);
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
    futuresPosition.leverage = event.params.size
      .times(event.params.lastPrice)
      .div(event.params.margin)
      .abs();
    futuresPosition.netFunding = BigInt.fromI32(0);
    futuresPosition.txHash = event.transaction.hash.toHex();
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
    tradeEntity.txHash = event.transaction.hash.toHex();

    synthetix.feesByPositionModifications = synthetix.feesByLiquidations.plus(
      event.params.fee.toBigDecimal()
    );
    synthetix.totalVolume = synthetix.totalVolume.plus(
      event.params.tradeSize
        .times(event.params.lastPrice)
        .div(BigInt.fromI32(10).pow(18))
        .abs()
        .toBigDecimal()
    );
    trader.totalVolume = event.params.tradeSize
      .times(event.params.lastPrice)
      .div(BigInt.fromI32(10).pow(18))
      .abs()
      .toBigDecimal();
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
    trader.margin = trader.margin.plus(event.params.margin.toBigDecimal());
    trader.pnl = event.params.fee.times(BigInt.fromI32(-1));

    tradeEntity.save();
  } else {
    // Position closed & not liquidated
    if (event.params.size.isZero() && !event.params.tradeSize.isZero() && futuresPosition) {
      log.info('position closed', []);

      const newPnl = event.params.lastPrice
        .minus(futuresPosition.avgEntryPrice)
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
      futuresPosition.leverage = event.params.tradeSize
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
      tradeEntity.txHash = event.transaction.hash.toHex();
      tradeEntity.save();

      trader.pnl = trader.pnl.plus(newPnl);
      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());

      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );
    }

    // If tradeSize and size are not zero, position got modified
    else if (!event.params.tradeSize.isZero() && !event.params.size.isZero() && futuresPosition) {
      log.info('position modified', []);

      futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(
        event.params.fee
      );
      futuresPosition.size = event.params.size;
      futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
      futuresPosition.margin = futuresPosition.margin.plus(event.params.margin);
      futuresPosition.lastPrice = event.params.lastPrice;
      futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));

      futuresPosition.leverage = event.params.size
        .times(event.params.lastPrice)
        .div(futuresPosition.margin.plus(event.params.margin))
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
      tradeEntity.type = 'PositionModified';
      tradeEntity.txHash = event.transaction.hash.toHex();

      // if position changes sides, reset the entry price
      if (
        (futuresPosition.size.lt(BigInt.fromI32(0)) && event.params.size.gt(BigInt.fromI32(0))) ||
        (futuresPosition.size.gt(BigInt.fromI32(0)) && event.params.size.lt(BigInt.fromI32(0)))
      ) {
        // calculate pnl
        const newPnl = event.params.lastPrice
          .minus(futuresPosition.avgEntryPrice)
          .times(futuresPosition.size)
          .div(BigInt.fromI32(10).pow(18));

        // add pnl to this position and the trader's overall stats
        tradeEntity.pnl = newPnl;
        trader.pnl = tradeEntity.pnl.plus(newPnl);
        futuresPosition.pnl = futuresPosition.pnl.plus(newPnl);

        futuresPosition.entryPrice = event.params.lastPrice;
        futuresPosition.avgEntryPrice = event.params.lastPrice;
      } else {
        // check if the position side increases (long or short)
        if (event.params.size.abs().gt(futuresPosition.size.abs())) {
          // if so, calculate the new average price
          const existingSize = futuresPosition.size.abs();
          const existingPrice = existingSize.times(futuresPosition.entryPrice);

          const newSize = event.params.tradeSize.abs();
          const newPrice = newSize.times(event.params.lastPrice);
          futuresPosition.entryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());
          futuresPosition.avgEntryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());
        } else {
          // if reducing position size, calculate pnl
          const newPnl = event.params.lastPrice
            .minus(futuresPosition.avgEntryPrice)
            .times(event.params.tradeSize.abs())
            .times(event.params.size.gt(BigInt.fromI32(0)) ? BigInt.fromI32(1) : BigInt.fromI32(-1))
            .div(BigInt.fromI32(10).pow(18));

          // add pnl to this position and the trader's overall stats
          tradeEntity.pnl = newPnl;
          trader.pnl = trader.pnl.plus(newPnl);
          futuresPosition.pnl = futuresPosition.pnl.plus(newPnl);
        }
      }

      const volume = event.params.tradeSize
        .times(event.params.lastPrice)
        .div(BigInt.fromI32(10).pow(18))
        .abs();

      trader.totalVolume = trader.totalVolume.plus(volume.toBigDecimal());
      synthetix.totalVolume = synthetix.totalVolume.plus(volume.toBigDecimal());
      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );
      futuresPosition.totalVolume = futuresPosition.totalVolume.plus(volume);
      tradeEntity.save();
    } else {
      log.debug('Transferred Margin Event skipped', []);
    }
  }

  const marginTransferEntity = FuturesMarginTransfer.load(
    event.address.toHex() +
      '-' +
      event.transaction.hash.toHex() +
      '-' +
      event.logIndex.minus(BigInt.fromI32(1)).toString()
  );

  // this check is here to get around the fact that the sometimes a withdrawalAll margin transfer event
  // will trigger a trade entity liquidation to be created. guarding against this event for now.
  if (marginTransferEntity == null && event.params.size.isZero() && event.params.margin.isZero()) {
    // if its not a withdrawal (or deposit), it's a liquidation
    let tradeEntity = FuturesTrade.load(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    if (!tradeEntity) {
      tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );
    }

    // recalculate pnl to ensure a 100% position loss
    // this calculation is required since the liquidation price could result in pnl slightly above/below 100%
    const newPositionPnlWithFeesPaid = futuresPosition.initialMargin
      .plus(futuresPosition.netTransfers)
      .times(BigInt.fromI32(-1));
    const newPositionPnl = newPositionPnlWithFeesPaid
      .plus(futuresPosition.feesPaidToSynthetix)
      .minus(futuresPosition.netFunding);
    const newTradePnl = newPositionPnl.minus(futuresPosition.pnl);

    // temporarily set the pnl to the difference in the position pnl
    // we will add liquidation fees during the PositionLiquidated handler
    tradeEntity.margin = BigInt.fromI32(0);
    tradeEntity.timestamp = event.block.timestamp;
    tradeEntity.account = event.params.account;
    tradeEntity.market = event.address;
    tradeEntity.size = BigInt.fromI32(0);
    tradeEntity.price = event.params.lastPrice;
    tradeEntity.positionId = positionId;
    tradeEntity.positionSize = BigInt.fromI32(0);
    tradeEntity.positionClosed = true;
    tradeEntity.pnl = newTradePnl;
    tradeEntity.feesPaidToSynthetix = event.params.fee;
    tradeEntity.type = 'Liquidated';
    tradeEntity.txHash = event.transaction.hash.toHex();
    tradeEntity.save();

    futuresPosition.pnl = newPositionPnl;
    trader.pnl = tradeEntity.pnl.plus(newTradePnl);
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
  let tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  const synthetix = Synthetix.load('synthetix');

  // Update Synthetix values
  if (synthetix) {
    synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
      event.params.keeperDeposit.toBigDecimal()
    );
    synthetix.save();
  }

  // Update Position fee value
  if (!!tradeEntity) {
    tradeEntity.txHash = event.transaction.hash.toHex();
    tradeEntity.futuresOrder =
      event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString();
    let positionEntity = FuturesPosition.load(tradeEntity.positionId);
    if (positionEntity) {
      positionEntity.feesPaidToSynthetix = positionEntity.feesPaidToSynthetix.plus(
        event.params.keeperDeposit
      );
      positionEntity.save();
    }
    tradeEntity.save();
  }

  // Update Trader fee value
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(
      event.params.keeperDeposit.toBigDecimal()
    );
    trader.save();
  }

  // Update FuturesOrderEntity
  if (futuresOrderEntity) {
    futuresOrderEntity.fee = event.params.keeperDeposit;
    futuresOrderEntity.keeper = event.transaction.from;

    if (tradeEntity) {
      // update order values
      futuresOrderEntity.positionId = tradeEntity.positionId;
      futuresOrderEntity.status = 'Filled';
      tradeEntity.type = 'PositionOpened';

      // add fee if not self-executed
      if (futuresOrderEntity.keeper != futuresOrderEntity.account) {
        tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
      }
      tradeEntity.save();
    } else {
      futuresOrderEntity.status = 'Cancelled';
    }
    futuresOrderEntity.txHash = event.transaction.hash.toHex();
    futuresOrderEntity.save();
  }
}

export function handleDelayedOrderSubmitted(event: DelayedOrderSubmittedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHex()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);

  if (!futuresOrderEntity) {
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
  futuresOrderEntity.txHash = event.transaction.hash.toHex();
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

export function handleNextPriceOrderSubmitted(event: NextPriceOrderSubmittedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHex()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);
  if (futuresOrderEntity == null) {
    futuresOrderEntity = new FuturesOrder(futuresOrderEntityId);
  }

  futuresOrderEntity.size = event.params.sizeDelta;
  futuresOrderEntity.market = event.address;
  futuresOrderEntity.account = event.params.account;
  futuresOrderEntity.orderId = event.params.targetRoundId;
  futuresOrderEntity.targetRoundId = event.params.targetRoundId;
  futuresOrderEntity.targetPrice = BigInt.fromI32(0);
  futuresOrderEntity.marginDelta = BigInt.fromI32(0);
  futuresOrderEntity.timestamp = event.block.timestamp;
  futuresOrderEntity.orderType = 'NextPriceOrderSubmitted';
  futuresOrderEntity.status = 'Pending';
  futuresOrderEntity.keeper = Address.fromHexString('0x0000000000000000000000000000000000000000');
  futuresOrderEntity.txHash = event.transaction.hash.toHex();

  futuresOrderEntity.save();
}

export function handleNextPriceOrderRemoved(event: NextPriceOrderRemovedEvent): void {
  const futuresOrderEntityId = `${event.params.account.toHexString()}-${event.params.targetRoundId.toString()}`;
  let futuresOrderEntity = FuturesOrder.load(futuresOrderEntityId);
  let trader = Trader.load(event.params.account.toHex());
  let tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  const synthetix = Synthetix.load('synthetix');

  // Update Synthetix values
  if (synthetix) {
    synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
      event.params.keeperDeposit.toBigDecimal()
    );
    synthetix.save();
  }

  // Update Trader fee value
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(
      event.params.keeperDeposit.toBigDecimal()
    );
    trader.save();
  }

  // Update Position fee value
  if (!!tradeEntity) {
    tradeEntity.txHash = event.transaction.hash.toHex();
    tradeEntity.futuresOrder =
      event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString();
    let positionEntity = FuturesPosition.load(tradeEntity.positionId);
    if (positionEntity) {
      positionEntity.feesPaidToSynthetix = positionEntity.feesPaidToSynthetix.plus(
        event.params.keeperDeposit
      );
      positionEntity.save();
    }
    tradeEntity.save();
  }

  if (futuresOrderEntity) {
    futuresOrderEntity.keeper = event.transaction.from;
    let tradeEntity = FuturesTrade.load(
      event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
    );

    if (tradeEntity) {
      futuresOrderEntity.positionId = tradeEntity.positionId;
      // update order values
      futuresOrderEntity.status = 'Filled';
      futuresOrderEntity.orderType = 'NextPriceOrderRemoved';
      tradeEntity.type = 'PositionOpened';

      // add fee if not self-executed
      if (futuresOrderEntity.keeper != futuresOrderEntity.account) {
        tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(
          event.params.keeperDeposit
        );
      }
      tradeEntity.save();
    } else {
      futuresOrderEntity.status = 'Cancelled';
    }
    futuresOrderEntity.txHash = event.transaction.hash.toHex();
    futuresOrderEntity.save();
  }
}
