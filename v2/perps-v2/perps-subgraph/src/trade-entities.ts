import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import { FuturesTrade } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

function createBaseTradeEntity(event: PositionModifiedNewEvent, positionId: string): FuturesTrade {
  const tradeEntity = new FuturesTrade(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  tradeEntity.timestamp = event.block.timestamp;
  tradeEntity.trader = event.params.account.toHex();
  tradeEntity.futuresPosition = positionId;
  tradeEntity.margin = event.params.margin;
  tradeEntity.size = event.params.tradeSize;
  tradeEntity.positionSize = event.params.size;
  tradeEntity.market = event.address.toHex();
  tradeEntity.price = event.params.lastPrice;
  tradeEntity.feesPaidToSynthetix = event.params.fee;
  tradeEntity.txHash = event.transaction.hash.toHex();
  // Most of the time it wont be a market order. But at this point we cant tell if it is a market order, delayed or delayed offchain.
  // So we just set it to true now, and expect this field to be updated when the handleDelayedOrderRemoved is triggered
  tradeEntity.marketOrder = true;

  return tradeEntity;
}
export function createTradeEntityForNewPosition(
  event: PositionModifiedNewEvent,
  positionId: string
): void {
  let tradeEntity = createBaseTradeEntity(event, positionId);
  tradeEntity.realizedPnl = event.params.fee.times(BigInt.fromI32(-1));
  tradeEntity.netFunding = BigInt.fromI32(0);
  tradeEntity.positionClosed = false;
  tradeEntity.type = 'PositionOpened';
  tradeEntity.save();
}

export function createTradeEntityForPositionClosed(
  event: PositionModifiedNewEvent,
  positionId: string,
  pnl: BigInt,
  accruedFunding: BigInt
): void {
  let tradeEntity = createBaseTradeEntity(event, positionId);
  tradeEntity.realizedPnl = pnl;
  tradeEntity.netFunding = accruedFunding;
  tradeEntity.positionClosed = true;
  tradeEntity.type = 'PositionClosed';
  tradeEntity.save();
}

export function createTradeEntityForPositionModification(
  event: PositionModifiedNewEvent,
  positionId: string,
  pnl: BigInt,
  accruedFunding: BigInt
): void {
  let tradeEntity = createBaseTradeEntity(event, positionId);
  tradeEntity.realizedPnl = pnl;
  tradeEntity.netFunding = accruedFunding;
  tradeEntity.positionClosed = false;
  tradeEntity.type = 'PositionModified';
  tradeEntity.save();
}
