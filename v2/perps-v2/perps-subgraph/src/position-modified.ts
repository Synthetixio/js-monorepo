import { BigDecimal, BigInt, dataSource, log } from '@graphprotocol/graph-ts';
import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import {
  Trader,
  Synthetix,
  FuturesPosition,
  FuturesTrade,
  FundingRateUpdate,
  FuturesMarginTransfer,
} from '../generated/schema';
import { calculateLeverage, calculateVolume } from './calculations';
import { createTradeEntityForNewPosition } from './trade-entities';

const SIP2004_AND_2005_GOERLI_BLOCK_NUMBER = BigInt.fromI32(6782813);

function getOrCreateTrader(event: PositionModifiedNewEvent): Trader {
  let trader = Trader.load(event.params.account.toHex());

  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.timestamp = event.block.timestamp;
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigDecimal.fromString('0');
    trader.feesPaidToSynthetix = BigDecimal.fromString('0');
    trader.totalVolume = BigDecimal.fromString('0');
    trader.pnl = BigInt.fromI32(0);
    trader.trades = [];
    trader.margin = BigDecimal.fromString('0');
  }
  return trader;
}
function getOrCreateSynthetix(): Synthetix {
  let synthetix = Synthetix.load('synthetix');
  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.feesByPositionModifications = BigDecimal.fromString('0');
    synthetix.feesByLiquidations = BigDecimal.fromString('0');
    synthetix.totalLiquidations = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalVolume = BigDecimal.fromString('0');
  }
  return synthetix;
}

/**
 * Mutative functions
 */
function updateTrades(event: PositionModifiedNewEvent, synthetix: Synthetix, trader: Trader): void {
  if (trader.trades.length == 0) {
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(1));
  }
  const oldTrades = trader.trades;
  oldTrades.push(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  trader.trades = oldTrades;
}

function createFuturesPosition(
  event: PositionModifiedNewEvent,
  positionId: string
): FuturesPosition {
  const network = dataSource.network();
  let futuresPosition = new FuturesPosition(positionId);
  futuresPosition.openTimestamp = event.block.timestamp;
  futuresPosition.trader = event.params.account.toHex();
  futuresPosition.isOpen = true;
  futuresPosition.isLiquidated = false;
  futuresPosition.size = event.params.size;
  futuresPosition.avgEntryPrice = event.params.lastPrice;
  futuresPosition.feesPaidToSynthetix = event.params.fee;
  futuresPosition.netTransfers = BigInt.fromI32(0);
  futuresPosition.initialMargin = event.params.margin.plus(event.params.fee);
  futuresPosition.margin = event.params.margin;
  futuresPosition.pnl = event.params.fee.times(BigInt.fromI32(-1));
  futuresPosition.entryPrice = event.params.lastPrice;
  futuresPosition.lastPrice = event.params.lastPrice.toBigDecimal();
  futuresPosition.trades = BigInt.fromI32(1);
  futuresPosition.long = event.params.tradeSize.gt(BigInt.fromI32(0));
  futuresPosition.market = event.address.toHex();
  futuresPosition.fundingIndex = event.params.fundingIndex;
  futuresPosition.leverage = calculateLeverage(
    event.params.size,
    event.params.lastPrice,
    event.params.margin
  );
  futuresPosition.netFunding = BigInt.fromI32(0);
  futuresPosition.txHash = event.transaction.hash.toHex();
  futuresPosition.totalVolume = calculateVolume(event.params.tradeSize, event.params.lastPrice);
  if (
    network === 'optimism-goerli' &&
    event.block.number.gt(SIP2004_AND_2005_GOERLI_BLOCK_NUMBER)
  ) {
    futuresPosition.skew = event.params.skew;
  }
  return futuresPosition;
}

function handlePositionOpenUpdates(
  event: PositionModifiedNewEvent,
  synthetix: Synthetix,
  trader: Trader,
  positionId: string
): FuturesPosition {
  createTradeEntityForNewPosition(event, positionId);
  synthetix.feesByPositionModifications = synthetix.feesByLiquidations.plus(
    event.params.fee.toBigDecimal()
  );
  const volume = calculateVolume(event.params.tradeSize, event.params.lastPrice);

  synthetix.totalVolume = synthetix.totalVolume.plus(volume);
  trader.totalVolume = trader.totalVolume.plus(volume);
  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
  trader.margin = trader.margin.plus(event.params.margin.toBigDecimal());
  trader.pnl = trader.pnl.plus(event.params.fee.times(BigInt.fromI32(-1)));
  return createFuturesPosition(event, positionId);
}

export function handlePositionModified(event: PositionModifiedNewEvent): void {
  const network = dataSource.network();
  const positionId = event.address.toHex() + '-' + event.params.id.toHex();
  let futuresPosition = FuturesPosition.load(positionId);
  let synthetix = getOrCreateSynthetix();
  let trader = getOrCreateTrader(event);
  updateTrades(event, synthetix, trader);

  if (!futuresPosition) {
    log.info('new position {}', [positionId]);
    futuresPosition = handlePositionOpenUpdates(event, synthetix, trader, positionId);
    // TODO Ideally we return here

    // else position is not new
  } else {
    // Position closed & not liquidated
    if (event.params.size.isZero() && !event.params.tradeSize.isZero()) {
      log.info('position closed {}', [positionId]);

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
      futuresPosition.lastPrice = event.params.lastPrice.toBigDecimal();
      futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
      futuresPosition.long = !event.params.tradeSize.gt(BigInt.fromI32(0));
      futuresPosition.leverage = event.params.tradeSize
        .times(event.params.lastPrice)
        .div(event.params.margin)
        .abs();

      if (
        network === 'optimism-goerli' &&
        event.block.number.gt(SIP2004_AND_2005_GOERLI_BLOCK_NUMBER)
      ) {
        futuresPosition.skew = event.params.skew;
      }

      const tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );

      tradeEntity.timestamp = event.block.timestamp;
      tradeEntity.trader = event.params.account.toHex();
      tradeEntity.futuresPosition = positionId;
      tradeEntity.margin = event.params.margin.plus(event.params.fee);
      tradeEntity.size = event.params.tradeSize.toBigDecimal();
      tradeEntity.market = event.address.toHex();
      tradeEntity.price = event.params.lastPrice.toBigDecimal();
      tradeEntity.positionSize = event.params.size.toBigDecimal();
      tradeEntity.pnl = newPnl;
      tradeEntity.feesPaidToSynthetix = event.params.fee.toBigDecimal();
      tradeEntity.positionClosed = true;
      tradeEntity.type = 'PositionClosed';
      tradeEntity.txHash = event.transaction.hash.toHex();

      trader.pnl = trader.pnl.plus(newPnl);
      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());

      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );
      synthetix.totalVolume = synthetix.totalVolume.plus(
        event.params.tradeSize
          .times(event.params.lastPrice)
          .div(BigInt.fromI32(10).pow(18))
          .abs()
          .toBigDecimal()
      );
      tradeEntity.save();
    }
    // If tradeSize and size are not zero, position got modified
    else if (!event.params.tradeSize.isZero() && !event.params.size.isZero()) {
      log.info('position modified {}', [positionId]);

      if (
        network === 'optimism-goerli' &&
        event.block.number.gt(SIP2004_AND_2005_GOERLI_BLOCK_NUMBER)
      ) {
        futuresPosition.skew = event.params.skew;
      }

      const tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );

      tradeEntity.timestamp = event.block.timestamp;
      tradeEntity.trader = event.params.account.toHex();
      tradeEntity.futuresPosition = positionId;
      tradeEntity.margin = event.params.margin.plus(event.params.fee);
      tradeEntity.size = event.params.tradeSize.toBigDecimal();
      tradeEntity.market = event.address.toHex();
      tradeEntity.price = event.params.lastPrice.toBigDecimal();
      tradeEntity.positionSize = event.params.size.toBigDecimal();
      tradeEntity.feesPaidToSynthetix = event.params.fee.toBigDecimal();
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

        const existingSize = futuresPosition.size.abs();
        const existingPrice = existingSize.times(futuresPosition.entryPrice);

        const newSize = event.params.tradeSize.abs();
        const newPrice = newSize.times(event.params.lastPrice);
        futuresPosition.entryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());
        futuresPosition.avgEntryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());

        // add pnl to this position and the trader's overall stats
        tradeEntity.pnl = newPnl;
        trader.pnl = tradeEntity.pnl.plus(newPnl);
        futuresPosition.pnl = futuresPosition.pnl.plus(newPnl);
      } else {
        // check if the position side increases (long or short)
        if (event.params.size.abs().gt(futuresPosition.size.abs())) {
          // calculate pnl
          const newPnl = event.params.lastPrice
            .minus(futuresPosition.avgEntryPrice)
            .times(event.params.tradeSize.abs())
            .times(event.params.size.gt(BigInt.fromI32(0)) ? BigInt.fromI32(1) : BigInt.fromI32(-1))
            .div(BigInt.fromI32(10).pow(18));

          tradeEntity.pnl = newPnl;
          trader.pnl = tradeEntity.pnl.plus(newPnl);
          futuresPosition.pnl = futuresPosition.pnl.plus(newPnl);

          // if so, calculate the new average price
          const existingSize = futuresPosition.size.abs();
          const existingPrice = existingSize.times(futuresPosition.entryPrice);
          const newSize = event.params.tradeSize.abs();
          const newPrice = newSize.times(event.params.lastPrice);
          futuresPosition.avgEntryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());
        } else {
          // if reducing position size, calculate pnl
          const newPnl = event.params.lastPrice
            .minus(futuresPosition.avgEntryPrice)
            .times(event.params.tradeSize.abs())
            .times(event.params.size.gt(BigInt.fromI32(0)) ? BigInt.fromI32(1) : BigInt.fromI32(-1))
            .div(BigInt.fromI32(10).pow(18));

          tradeEntity.pnl = newPnl;
          trader.pnl = trader.pnl.plus(newPnl);
          futuresPosition.pnl = futuresPosition.pnl.plus(newPnl);
        }
      }

      futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(
        event.params.fee
      );
      futuresPosition.size = event.params.size;
      futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
      futuresPosition.margin = futuresPosition.margin.plus(event.params.margin);
      futuresPosition.lastPrice = event.params.lastPrice.toBigDecimal();
      futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));

      futuresPosition.leverage = event.params.size
        .times(event.params.lastPrice)
        .div(futuresPosition.margin.plus(event.params.margin))
        .abs();

      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
      synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
        event.params.fee.toBigDecimal()
      );

      const volume = event.params.tradeSize
        .times(event.params.lastPrice)
        .div(BigInt.fromI32(10).pow(18))
        .abs()
        .toBigDecimal();

      trader.totalVolume = trader.totalVolume.plus(volume);
      synthetix.totalVolume = synthetix.totalVolume.plus(volume);
      futuresPosition.totalVolume = futuresPosition.totalVolume.plus(volume);

      tradeEntity.save();
    } else {
      log.debug('Transferred Margin Event skipped {}', [positionId]);
    }
  }

  // if there is an existing position...
  if (futuresPosition.fundingIndex.lt(event.params.fundingIndex)) {
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
      trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(fundingAccrued.toBigDecimal());
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
    // recalculate pnl to ensure a 100% position loss
    // this calculation is required since the liquidation price could result in pnl slightly above/below 100%
    const newPositionPnlWithFeesPaid = futuresPosition.initialMargin
      .plus(futuresPosition.netTransfers)
      .times(BigInt.fromI32(-1));
    const newPositionPnl = newPositionPnlWithFeesPaid
      .plus(futuresPosition.feesPaidToSynthetix)
      .plus(futuresPosition.netFunding);
    const newTradePnl = newPositionPnl.minus(futuresPosition.pnl);

    // temporarily set the pnl to the difference in the position pnl
    // we will add liquidation fees during the PositionLiquidated handler
    const tradeEntity = new FuturesTrade(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    tradeEntity.margin = BigInt.fromI32(0);
    tradeEntity.timestamp = event.block.timestamp;
    tradeEntity.trader = event.params.account.toHex();
    tradeEntity.market = event.address.toHex();
    tradeEntity.size = BigInt.fromI32(0).toBigDecimal();
    tradeEntity.price = event.params.lastPrice.toBigDecimal();
    tradeEntity.futuresPosition = positionId;
    tradeEntity.positionSize = BigInt.fromI32(0).toBigDecimal();
    tradeEntity.positionClosed = true;
    tradeEntity.pnl = newTradePnl;
    tradeEntity.feesPaidToSynthetix = event.params.fee.toBigDecimal();
    tradeEntity.type = 'Liquidated';
    tradeEntity.txHash = event.transaction.hash.toHex();

    futuresPosition.pnl = newPositionPnl;
    trader.pnl = tradeEntity.pnl.plus(newTradePnl);
    tradeEntity.save();
  }

  futuresPosition.save();
  trader.save();
  synthetix.save();
}
