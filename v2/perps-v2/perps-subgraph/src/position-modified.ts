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
import {
  calculateAccruedFunding,
  calculateLeverage,
  calculatePnl,
  calculateAccruedPnlForReducingPositions,
  calculateVolume,
} from './calculations';
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
    trader.timestamp = event.block.timestamp;
    trader.totalLiquidations = BigInt.fromI32(0);
    trader.totalMarginLiquidated = BigDecimal.fromString('0');
    trader.feesPaidToSynthetix = BigDecimal.fromString('0');
    trader.totalVolume = BigDecimal.fromString('0');
    trader.realizedPnl = BigInt.fromI32(0);
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
  let futuresPosition = new FuturesPosition(positionId);
  futuresPosition.openTimestamp = event.block.timestamp;
  futuresPosition.trader = event.params.account.toHex();
  futuresPosition.isOpen = true;
  futuresPosition.isLiquidated = false;
  futuresPosition.size = event.params.size;
  futuresPosition.avgEntryPrice = event.params.lastPrice;
  futuresPosition.feesPaidToSynthetix = event.params.fee;
  futuresPosition.netTransfers = BigInt.fromI32(0);
  futuresPosition.initialMargin = event.params.margin;
  futuresPosition.margin = event.params.margin;
  futuresPosition.realizedPnl = event.params.fee.times(BigInt.fromI32(-1));
  futuresPosition.unrealizedPnl = BigInt.fromI32(0);
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
    BigInt.fromString(futuresPosition.lastPrice.toString()),
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
  createTradeEntityForPositionClosed(event, futuresPosition.id, tradePnl, accruedFunding);
  // TODO figure out what to do here. this is incorrect
  // trader.pnl = trader.pnl.plus(positionPnl);

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
  futuresPosition.lastPrice = event.params.lastPrice.toBigDecimal();
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
  // Bug fixed, we forgot to add volume too trader and futures position
  trader.totalVolume = trader.totalVolume.plus(newVolume);
  futuresPosition.totalVolume = futuresPosition.totalVolume.plus(newVolume);

  /**
   * Add fees
   */
  futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(event.params.fee);
  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
  synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
    event.params.fee.toBigDecimal()
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
    const realizedPnl = calculatePnl(
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
      realizedPnl,
      accruedFunding
    );

    futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(realizedPnl);
    futuresPosition.unrealizedPnl = BigInt.fromI32(0);
    // TODO trader pnl
  } else {
    const positionIsIncreasing = event.params.size.abs().gt(futuresPosition.size.abs());
    // check if the position side increases (long or short)
    if (positionIsIncreasing) {
      // TODO trader PNL.. I think we need to have two fields to track this properly,
      // PNL from closed trades and pnl on currently open.
      // trader.pnl = trader.pnl.plus(positionPnl);

      // calculate the new average price
      const existingSize = futuresPosition.size.abs();
      const existingPrice = existingSize.times(futuresPosition.entryPrice);
      const newSize = event.params.tradeSize.abs();
      const newPrice = newSize.times(event.params.lastPrice);
      futuresPosition.avgEntryPrice = existingPrice.plus(newPrice).div(event.params.size.abs());
      // calculate pnl
      const unrealizedPnl = calculatePnl(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.size
      );
      const realizedPnl = accruedFunding.minus(event.params.fee);

      futuresPosition.unrealizedPnl = unrealizedPnl;
      futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(realizedPnl);

      createTradeEntityForPositionModification(
        event,
        futuresPosition.id,
        realizedPnl,
        accruedFunding
      );
    } else {
      // if reducing position size, calculate pnl
      const unrealizedPnl = calculatePnl(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.size
      );
      const realizedPnl = calculateAccruedPnlForReducingPositions(
        event.params.lastPrice,
        futuresPosition.avgEntryPrice,
        event.params.tradeSize
      )
        .minus(event.params.fee)
        .plus(accruedFunding);

      futuresPosition.unrealizedPnl = unrealizedPnl;
      futuresPosition.realizedPnl = futuresPosition.realizedPnl.plus(realizedPnl);

      createTradeEntityForPositionModification(
        event,
        futuresPosition.id,
        realizedPnl,
        accruedFunding
      );
      // trader.pnl = trader.pnl.plus(newTradePnl);
    }
  }

  futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(event.params.fee);
  futuresPosition.size = event.params.size;
  futuresPosition.trades = futuresPosition.trades.plus(BigInt.fromI32(1));
  // TODO, should margin be accumulative?
  futuresPosition.margin = futuresPosition.margin.plus(event.params.margin);
  futuresPosition.lastPrice = event.params.lastPrice.toBigDecimal();
  futuresPosition.long = event.params.size.gt(BigInt.fromI32(0));

  futuresPosition.leverage = calculateLeverage(
    event.params.size,
    event.params.lastPrice,
    futuresPosition.margin // Bug fixed, prev we did: `futuresPosition.margin.plus(event.params.margin)` but the margin on the position has already been updated
  );

  trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.fee.toBigDecimal());
  synthetix.feesByPositionModifications = synthetix.feesByPositionModifications.plus(
    event.params.fee.toBigDecimal()
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
  const positionId = event.address.toHex() + '-' + event.params.id.toHex();
  let futuresPosition = FuturesPosition.load(positionId);
  let synthetix = getOrCreateSynthetix();
  let trader = getOrCreateTrader(event);
  updateTrades(event, synthetix, trader);
  if (!futuresPosition) {
    futuresPosition = handlePositionOpenUpdates(event, synthetix, trader, positionId);
    // else position is not new
  } else {
    const accruedFunding = updateFunding(event, futuresPosition);

    // Position closed & not liquidated
    if (event.params.size.isZero() && !event.params.tradeSize.isZero()) {
      handlePositionClosed(event, futuresPosition, trader, synthetix, accruedFunding);
    }
    // If tradeSize and size are not zero, position got modified
    else if (!event.params.tradeSize.isZero() && !event.params.size.isZero()) {
      handleActualPositionModification(event, futuresPosition, synthetix, trader, accruedFunding);
    } else {
      log.debug('Transferred Margin Event skipped {}', [positionId]);
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
    /**
     * TODO check that this actually happens.. If it does check the pnls
     */

    // recalculate pnl to ensure a 100% position loss
    // this calculation is required since the liquidation price could result in pnl slightly above/below 100%
    const newPositionPnlWithFeesPaid = futuresPosition.initialMargin
      .plus(futuresPosition.netTransfers)
      .times(BigInt.fromI32(-1));
    const newPositionPnl = newPositionPnlWithFeesPaid
      .plus(futuresPosition.feesPaidToSynthetix)
      .plus(futuresPosition.netFunding);
    const newTradePnl = newPositionPnl.minus(futuresPosition.realizedPnl);

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
    tradeEntity.realizedPnl = newTradePnl;
    tradeEntity.feesPaidToSynthetix = event.params.fee.toBigDecimal();
    tradeEntity.type = 'Liquidated';
    tradeEntity.txHash = event.transaction.hash.toHex();

    futuresPosition.realizedPnl = newPositionPnl;
    futuresPosition.unrealizedPnl = BigInt.fromI32(0);
    // trader.pnl = tradeEntity.pnl.plus(newTradePnl);
    tradeEntity.save();
  }
  futuresPosition.save();
  trader.save();
  synthetix.save();
}
