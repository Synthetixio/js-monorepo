import { BigInt, dataSource } from '@graphprotocol/graph-ts';
import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import {
  Trader,
  Synthetix,
  FuturesPosition,
  FuturesTrade,
  FundingRateUpdate,
  FuturesMarginTransfer,
} from '../generated/schema';
import {
  calculateAccruedFunding,
  calculateLeverage,
  calculatePnl,
  calculateAccruedPnlForReducingPositions,
  calculateVolume,
} from './calculations';
import { updateFeeStats, updateHistoricalTradeStats } from './historical-trade-stats';
import {
  createTradeEntityForNewPosition,
  createTradeEntityForPositionClosed,
  createTradeEntityForPositionModification,
} from './trade-entities';

const SIP2004_AND_2005_GOERLI_BLOCK_NUMBER = BigInt.fromI32(6782813);
const network = dataSource.network();

function getOrCreateTrader(event: PositionModifiedNewEvent): Trader {
  let trader = Trader.load(event.params.account.toHex());

  if (!trader) {
    trader = new Trader(event.params.account.toHex());
    trader.createdAt = event.block.timestamp;
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigInt.fromI32(0);
    trader.feesPaidToSynthetix = BigInt.fromI32(0);
    trader.totalVolume = BigInt.fromI32(0);
    trader.realizedPnl = BigInt.fromI32(0);
    trader.trades = [];
    trader.margin = BigInt.fromI32(0);
  }
  return trader;
}
function getOrCreateSynthetix(): Synthetix {
  let synthetix = Synthetix.load('synthetix');
  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.feesByPositionModifications = BigInt.fromI32(0);
    synthetix.feesByLiquidations = BigInt.fromI32(0);
    synthetix.totalLiquidations = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalVolume = BigInt.fromI32(0);
    synthetix.totalTrades = BigInt.fromI32(0);
  }
  return synthetix;
}

/**
 * Mutative functions
 */
function updateTrades(event: PositionModifiedNewEvent, synthetix: Synthetix, trader: Trader): void {
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) {
    return;
  }
  if (trader.trades.length == 0) {
    synthetix.totalTraders = synthetix.totalTraders.plus(BigInt.fromI32(1));
  }
  synthetix.totalTrades = synthetix.totalTrades.plus(BigInt.fromI32(1));
  const oldTrades = trader.trades;
  oldTrades.push(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  trader.trades = oldTrades;
  trader.lastTradeTimestamp = event.block.timestamp;
}

function createFuturesPosition(
  event: PositionModifiedNewEvent,
  positionId: string
): FuturesPosition {
  let futuresPosition = new FuturesPosition(positionId);
  futuresPosition.openTimestamp = event.block.timestamp;
  futuresPosition.trader = event.params.account.toHex();
  futuresPosition.isOpen = true;
  futuresPosition.isLiquidated = false;
  futuresPosition.size = event.params.size;
  futuresPosition.avgEntryPrice = event.params.lastPrice;
  futuresPosition.feesPaidToSynthetix = event.params.fee;
  futuresPosition.netTransfers = BigInt.fromI32(0);
  futuresPosition.initialMargin = event.params.margin.minus(event.params.fee);
  futuresPosition.margin = event.params.margin;
  futuresPosition.realizedPnl = event.params.fee.times(BigInt.fromI32(-1));
  futuresPosition.unrealizedPnl = BigInt.fromI32(0);
  futuresPosition.entryPrice = event.params.lastPrice;
  futuresPosition.lastPrice = event.params.lastPrice;
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
  synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
    event.params.fee
  );
  const volume = calculateVolume(event.params.tradeSize, event.params.lastPrice);

  synthetix.totalVolume = synthetix.totalVolume.plus(volume);
  trader.totalVolume = trader.totalVolume.plus(volume);
  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee);
  trader.margin = trader.margin.plus(event.params.margin);
  trader.realizedPnl = event.params.fee.times(BigInt.fromI32(-1));
  return createFuturesPosition(event, positionId);
}

function handlePositionClosed(
  event: PositionModifiedNewEvent,
  futuresPosition: FuturesPosition,
  trader: Trader,
  synthetix: Synthetix,
  accruedFunding: BigInt
): void {
  const tradePnl = calculatePnl(
    event.params.lastPrice,
    futuresPosition.lastPrice,
    futuresPosition.size // Note that it's important to use the size before we update it from the event. The updated size will be 0 since the position is closed
  )
    .minus(event.params.fee)
    .plus(accruedFunding);
  const realizedPnl = calculatePnl(
    event.params.lastPrice,
    futuresPosition.avgEntryPrice,
    futuresPosition.size // Note that it's important to use the size before we update it from the event. The updated size will be 0 since the position is closed
  )
    .minus(event.params.fee)
    .plus(accruedFunding);
  /**
   * Add pnl
   */
  futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(realizedPnl);
  futuresPosition.unrealizedPnl = BigInt.fromI32(0);
  trader.realizedPnl = trader.realizedPnl.plus(realizedPnl);
  createTradeEntityForPositionClosed(event, futuresPosition.id, tradePnl, accruedFunding);

  futuresPosition.leverage = calculateLeverage(
    event.params.tradeSize, // Note that we use tradeSize rather than size here. This will give us what the leverage was before closing the position
    event.params.lastPrice,
    futuresPosition.margin
  );

  futuresPosition.isOpen = false;
  futuresPosition.exitPrice = event.params.lastPrice;
  futuresPosition.closeTimestamp = event.block.timestamp;
  futuresPosition.margin = event.params.margin;
  futuresPosition.size = event.params.size;
  futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
  futuresPosition.lastPrice = event.params.lastPrice;
  futuresPosition.long = !event.params.tradeSize.gt(BigInt.fromI32(0));

  if (
    network === 'optimism-goerli' &&
    event.block.number.gt(SIP2004_AND_2005_GOERLI_BLOCK_NUMBER)
  ) {
    futuresPosition.skew = event.params.skew;
  }
  /**
   * Add volume
   */
  const newVolume = calculateVolume(event.params.tradeSize, event.params.lastPrice);
  synthetix.totalVolume = synthetix.totalVolume.plus(newVolume);
  trader.totalVolume = trader.totalVolume.plus(newVolume);
  futuresPosition.totalVolume = futuresPosition.totalVolume.plus(newVolume);

  /**
   * Add fees
   */
  futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(event.params.fee);
  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee);
  synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
    event.params.fee
  );
}
function handleActualPositionModification(
  event: PositionModifiedNewEvent,
  futuresPosition: FuturesPosition,
  synthetix: Synthetix,
  trader: Trader,
  accruedFunding: BigInt
): void {
  if (
    network === 'optimism-goerli' &&
    event.block.number.gt(SIP2004_AND_2005_GOERLI_BLOCK_NUMBER)
  ) {
    futuresPosition.skew = event.params.skew;
  }
  const positionFlippedSides =
    (futuresPosition.size.lt(BigInt.fromI32(0)) && event.params.size.gt(BigInt.fromI32(0))) ||
    (futuresPosition.size.gt(BigInt.fromI32(0)) && event.params.size.lt(BigInt.fromI32(0)));
  // if position changes sides, reset the entry price
  if (positionFlippedSides) {
    // calculate pnl
    const accruedRealizedPnl = calculatePnl(
      event.params.lastPrice,
      futuresPosition.avgEntryPrice,
      futuresPosition.size
    )
      .minus(event.params.fee)
      .plus(accruedFunding);

    futuresPosition.entryPrice = event.params.lastPrice;
    futuresPosition.avgEntryPrice = event.params.lastPrice;

    // add pnl to this position and the trader's overall stats
    createTradeEntityForPositionModification(
      event,
      futuresPosition.id,
      accruedRealizedPnl,
      accruedFunding
    );

    futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));
    futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(accruedRealizedPnl);
    trader.realizedPnl = trader.realizedPnl.plus(accruedRealizedPnl);
    futuresPosition.unrealizedPnl = BigInt.fromI32(0);
  } else {
    const positionIsIncreasing = event.params.size.abs().gt(futuresPosition.size.abs());
    // check if the position side increases (long or short)
    if (positionIsIncreasing) {
      // calculate the new average price
      const currentPosSizeAbs = futuresPosition.size.abs();
      const currentPosValue = currentPosSizeAbs.times(futuresPosition.avgEntryPrice);
      const incomingTradeSizeAbs = event.params.tradeSize.abs();
      const incomingTradeValue = incomingTradeSizeAbs.times(event.params.lastPrice);
      const newPositionSizeAbs = event.params.size.abs();
      futuresPosition.avgEntryPrice = currentPosValue
        .plus(incomingTradeValue)
        .div(newPositionSizeAbs);
      // calculate pnl
      const unrealizedPnl = calculatePnl(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.size
      );

      const accruedRealizedPnl = accruedFunding.minus(event.params.fee);

      futuresPosition.unrealizedPnl = unrealizedPnl;
      futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(accruedRealizedPnl);
      trader.realizedPnl = trader.realizedPnl.plus(accruedRealizedPnl);
      createTradeEntityForPositionModification(
        event,
        futuresPosition.id,
        accruedRealizedPnl,
        accruedFunding
      );
    } else {
      // if reducing position size, calculate pnl
      const unrealizedPnl = calculatePnl(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.size
      );
      const accruedRealizedPnl = calculateAccruedPnlForReducingPositions(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.tradeSize
      )
        .minus(event.params.fee)
        .plus(accruedFunding);

      futuresPosition.unrealizedPnl = unrealizedPnl;
      futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(accruedRealizedPnl);
      trader.realizedPnl = trader.realizedPnl.plus(accruedRealizedPnl);

      createTradeEntityForPositionModification(
        event,
        futuresPosition.id,
        accruedRealizedPnl,
        accruedFunding
      );
    }
  }

  futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(event.params.fee);
  futuresPosition.size = event.params.size;
  futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
  futuresPosition.margin = event.params.margin;
  futuresPosition.lastPrice = event.params.lastPrice;
  futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));

  futuresPosition.leverage = calculateLeverage(
    event.params.size,
    event.params.lastPrice,
    futuresPosition.margin
  );

  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee);
  synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
    event.params.fee
  );

  const volume = calculateVolume(event.params.tradeSize, event.params.lastPrice);

  trader.totalVolume = trader.totalVolume.plus(volume);
  synthetix.totalVolume = synthetix.totalVolume.plus(volume);
  futuresPosition.totalVolume = futuresPosition.totalVolume.plus(volume);
}

export function updateFunding(
  event: PositionModifiedNewEvent,
  futuresPosition: FuturesPosition
): BigInt {
  // if there is an existing position...
  if (futuresPosition.fundingIndex.lt(event.params.fundingIndex)) {
    let pastFundingEntity = FundingRateUpdate.load(
      event.address.toHex() + '-' + futuresPosition.fundingIndex.toString()
    );

    let currentFundingEntity = FundingRateUpdate.load(
      event.address.toHex() + '-' + event.params.fundingIndex.toString()
    );
    if (pastFundingEntity && currentFundingEntity) {
      // Calculate funding accrued since the last time the position was modified
      // We multiple with size, since this is funding per unit
      let fundingAccrued = calculateAccruedFunding(
        pastFundingEntity.funding,
        currentFundingEntity.funding,
        futuresPosition.size
      );
      futuresPosition.netFunding = futuresPosition.netFunding.plus(fundingAccrued);
      futuresPosition.fundingIndex = event.params.fundingIndex;
      return fundingAccrued;
    }
  }
  return BigInt.fromI32(0);
}
export function handlePositionModified(event: PositionModifiedNewEvent): void {
  updateHistoricalTradeStats(event);
  const positionId = event.address.toHex() + '-' + event.params.id.toHex();
  let futuresPosition = FuturesPosition.load(positionId);
  let synthetix = getOrCreateSynthetix();
  let trader = getOrCreateTrader(event);
  let accruedFunding = BigInt.fromI32(0);
  updateTrades(event, synthetix, trader);

  const isMarginTransfer =
    event.params.tradeSize.isZero() && event.params.margin.gt(BigInt.fromI32(0));
  // This will only exists it the position modification is a margin transfer
  // We take the txhash, and subtract 1 from the log index to get the margin transfer event
  // We need this to be able to update netTransfer on the position
  const marginTransferEntity = FuturesMarginTransfer.load(
    event.address.toHex() +
      '-' +
      event.transaction.hash.toHex() +
      '-' +
      event.logIndex.minus(BigInt.fromI32(1)).toString()
  );

  if (isMarginTransfer) {
    // It would be nice to handle this event in the handleMarginTransferred.
    // But we dont know the position id from the MarginTransferredEvent
    // So lets do all futures updates related to margin transfer event here.
    // If no position exists, we can just discard this event
    if (futuresPosition) {
      // Margin withdrawal/ deposit
      accruedFunding = updateFunding(event, futuresPosition);
      const accruedRealizedPnl = accruedFunding.minus(event.params.fee);
      futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(accruedRealizedPnl);
      futuresPosition.margin = event.params.margin;
      futuresPosition.size = event.params.size;
      futuresPosition.lastPrice = event.params.lastPrice;
      futuresPosition.leverage = calculateLeverage(
        futuresPosition.size,
        futuresPosition.lastPrice,
        futuresPosition.margin
      );
      futuresPosition.unrealizedPnl = calculatePnl(
        futuresPosition.lastPrice,
        futuresPosition.avgEntryPrice,
        futuresPosition.size
      );

      if (marginTransferEntity) {
        futuresPosition.netTransfers = futuresPosition.netTransfers.plus(marginTransferEntity.size);
      }
      futuresPosition.save();
    }
  } else {
    // This position modification event is a trade,
    // now lets figure out if it's "PositionOpen", "PositionModified" or "PositionClosed"
    if (!futuresPosition) {
      //No current position exists, this is a PositionOpen event
      futuresPosition = handlePositionOpenUpdates(event, synthetix, trader, positionId);
    } else {
      // Current position exists, this is a PositionModified or PositionClosed
      // Either way we want to update accrued funding
      accruedFunding = updateFunding(event, futuresPosition);

      // Position closed & not liquidated
      if (event.params.size.isZero()) {
        handlePositionClosed(event, futuresPosition, trader, synthetix, accruedFunding);
      } else {
        // Position modified, we have a futures position, size and tradeSize is not 0 and
        handleActualPositionModification(event, futuresPosition, synthetix, trader, accruedFunding);
      }
    }

    // this check is here to get around the fact that the sometimes a withdrawalAll margin transfer event
    // will trigger a trade entity liquidation to be created. guarding against this event for now.
    if (
      marginTransferEntity == null &&
      event.params.size.isZero() &&
      event.params.margin.isZero()
    ) {
      // recalculate pnl to ensure a 100% position loss
      // this calculation is required since the liquidation price could result in pnl slightly above/below 100%
      const realizedPnl = futuresPosition.initialMargin
        .plus(futuresPosition.netTransfers)
        .times(BigInt.fromI32(-1));

      // temporarily set the pnl to the difference in the position pnl
      // we will add liquidation fees during the PositionLiquidated handler
      const tradeEntity = new FuturesTrade(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
      );
      tradeEntity.margin = BigInt.fromI32(0);
      tradeEntity.timestamp = event.block.timestamp;
      tradeEntity.trader = event.params.account.toHex();
      tradeEntity.market = event.address.toHex();
      tradeEntity.size = BigInt.fromI32(0);
      tradeEntity.price = event.params.lastPrice;
      tradeEntity.futuresPosition = positionId;
      tradeEntity.positionSize = BigInt.fromI32(0);
      tradeEntity.positionClosed = true;
      tradeEntity.realizedPnl = realizedPnl;
      tradeEntity.feesPaidToSynthetix = event.params.fee;
      tradeEntity.type = 'Liquidated';
      tradeEntity.marketOrder = true;
      tradeEntity.txHash = event.transaction.hash.toHex();
      tradeEntity.netFunding = accruedFunding;

      futuresPosition.realizedPnl = realizedPnl;
      futuresPosition.unrealizedPnl = BigInt.fromI32(0);
      futuresPosition.isOpen = false;
      trader.realizedPnl = trader.realizedPnl.plus(realizedPnl);
      tradeEntity.save();
      updateFeeStats(event.params.fee, event.address, event.block.timestamp);
    }

    futuresPosition.save();
    trader.save();
    synthetix.save();
  }
}
