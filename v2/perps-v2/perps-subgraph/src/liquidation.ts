import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  PositionLiquidated as PositionLiquidatedEvent,
  PositionLiquidated1 as PositionLiquidatedEventLegacy,
} from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import {
  FuturesPosition,
  FuturesTrade,
  PositionLiquidated,
  Synthetix,
  Trader,
} from '../generated/schema';
import { updateFeeStats } from './historical-trade-stats';
export { handlePositionModified } from './position-modified';

export function handlePositionLiquidatedLegacy(event: PositionLiquidatedEventLegacy): void {
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

  const futuresPosition = FuturesPosition.load(futuresPositionId);

  let feeForSynthetix = BigInt.fromI32(0);

  if (futuresPosition && futuresPosition.margin.gt(BigInt.fromI32(1000).pow(18))) {
    feeForSynthetix = event.params.fee.minus(BigInt.fromI32(1002).pow(18));
  } else {
    const ninetyPercent = event.params.fee
      .times(BigInt.fromI32(90).pow(18))
      .div(BigInt.fromI32(100).pow(18));
    feeForSynthetix = event.params.fee.minus(ninetyPercent);
  }

  if (futuresPosition) {
    futuresPosition.isLiquidated = true;
    futuresPosition.isOpen = false;
    futuresPosition.closeTimestamp = event.block.timestamp;
    futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(feeForSynthetix);
    futuresPosition.exitPrice = event.params.price;
    futuresPosition.save();
  }

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
    tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(feeForSynthetix);

    // TODO make sure this is correct. I think we need to subtract something else.
    tradeEntity.realizedPnl = tradeEntity.realizedPnl
      .minus(event.params.fee)
      .minus(tradeEntity.netFunding); // you loose funding when liquidated
    tradeEntity.netFunding = BigInt.fromI32(0);
    tradeEntity.type = 'Liquidated';
    tradeEntity.save();
  }
  updateFeeStats(feeForSynthetix, event.address, event.block.timestamp);

  const synthetix = Synthetix.load('synthetix');
  if (synthetix) {
    synthetix.feesByLiquidations = synthetix.feesByLiquidations.plus(feeForSynthetix);
    synthetix.totalLiquidations = synthetix.totalLiquidations.plus(BigInt.fromI32(1));
    synthetix.save();
  }

  let trader = Trader.load(event.params.account.toHex());
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(feeForSynthetix);
    trader.totalLiquidations = trader.totalLiquidations.plus(BigInt.fromI32(1));
    trader.totalMarginLiquidated = trader.totalMarginLiquidated.plus(event.params.size);
    trader.margin = trader.margin.minus(event.params.size);
    trader.save();
  }
}

export function handlePositionLiquidated(event: PositionLiquidatedEvent): void {
  log.info('handlePositionLiquidated', []);
  const futuresPositionId = event.address.toHex() + '-' + event.params.id.toHex();
  const positionLiquidatedEntity = new PositionLiquidated(event.params.id.toString());
  positionLiquidatedEntity.trader = event.params.account.toHex();
  positionLiquidatedEntity.market = event.address.toHex();
  positionLiquidatedEntity.liquidator = event.params.liquidator;
  positionLiquidatedEntity.size = event.params.size;
  positionLiquidatedEntity.price = event.params.price;
  positionLiquidatedEntity.fee = event.params.stakersFee.plus(
    event.params.flaggerFee.plus(event.params.liquidatorFee)
  );
  positionLiquidatedEntity.futuresPosition = futuresPositionId;
  positionLiquidatedEntity.timestamp = event.block.timestamp;
  positionLiquidatedEntity.txHash = event.transaction.hash.toHex();
  positionLiquidatedEntity.save();

  const tradeEntity = FuturesTrade.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.minus(BigInt.fromI32(1)).toString()
  );
  log.info('tradeEntity: {}', [tradeEntity ? tradeEntity.id.toString() : 'null']);
  if (tradeEntity) {
    tradeEntity.size = event.params.size.times(BigInt.fromI32(-1));
    tradeEntity.positionClosed = true;
    tradeEntity.timestamp = event.block.timestamp;
    tradeEntity.trader = event.params.account.toHex();
    tradeEntity.futuresPosition = futuresPositionId;
    tradeEntity.price = event.params.price;
    tradeEntity.txHash = event.transaction.hash.toHex();
    tradeEntity.positionSize = BigInt.fromI32(0);
    tradeEntity.feesPaidToSynthetix = tradeEntity.feesPaidToSynthetix.plus(event.params.stakersFee);

    // TODO make sure this is correct. I think we need to subtract something else.
    tradeEntity.realizedPnl = tradeEntity.realizedPnl
      .minus(event.params.stakersFee.plus(event.params.liquidatorFee).plus(event.params.flaggerFee))
      .minus(tradeEntity.netFunding); // you loose funding when liquidated
    tradeEntity.netFunding = BigInt.fromI32(0);
    tradeEntity.type = 'Liquidated';
    tradeEntity.save();
  }

  updateFeeStats(event.params.stakersFee, event.address, event.block.timestamp);

  const synthetix = Synthetix.load('synthetix');
  if (synthetix) {
    synthetix.feesByLiquidations = synthetix.feesByLiquidations.plus(event.params.stakersFee);
    synthetix.totalLiquidations = synthetix.totalLiquidations.plus(BigInt.fromI32(1));
    synthetix.save();
  }

  const futuresPosition = FuturesPosition.load(futuresPositionId);
  if (futuresPosition) {
    futuresPosition.isLiquidated = true;
    futuresPosition.isOpen = false;
    futuresPosition.closeTimestamp = event.block.timestamp;
    futuresPosition.feesPaidToSynthetix = futuresPosition.feesPaidToSynthetix.plus(
      event.params.stakersFee
    );
    futuresPosition.exitPrice = event.params.price;
    futuresPosition.save();
  }

  let trader = Trader.load(event.params.account.toHex());
  if (trader) {
    trader.feesPaidToSynthetix = trader.feesPaidToSynthetix.plus(event.params.stakersFee);
    trader.totalLiquidations = trader.totalLiquidations.plus(BigInt.fromI32(1));
    trader.totalMarginLiquidated = trader.totalMarginLiquidated.plus(event.params.size);
    trader.margin = trader.margin.minus(event.params.size);
    trader.save();
  }
}
