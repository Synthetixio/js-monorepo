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
  tradeEntity.margin = event.params.margin.plus(event.params.fee);
  tradeEntity.size = event.params.tradeSize.toBigDecimal();
  tradeEntity.positionSize = event.params.size.toBigDecimal();
  tradeEntity.market = event.address.toHex();
  tradeEntity.price = event.params.lastPrice.toBigDecimal();
  tradeEntity.feesPaidToSynthetix = event.params.fee.toBigDecimal();
  tradeEntity.txHash = event.transaction.hash.toHex();
  return tradeEntity;
}
export function createTradeEntityForNewPosition(
  event: PositionModifiedNewEvent,
  positionId: string
): void {
  let tradeEntity = createBaseTradeEntity(event, positionId);
  tradeEntity.pnl = event.params.fee.times(BigInt.fromI32(-1));
  tradeEntity.positionClosed = false;
  tradeEntity.type = 'PositionOpened';
  tradeEntity.save();
}

export function createTradeEntityForPositionClosed(
  event: PositionModifiedNewEvent,
  positionId: string,
  pnl: BigInt
): void {
  let tradeEntity = createBaseTradeEntity(event, positionId);
  tradeEntity.pnl = pnl;
  tradeEntity.positionClosed = true;
  tradeEntity.type = 'PositionClosed';
  tradeEntity.save();
}
