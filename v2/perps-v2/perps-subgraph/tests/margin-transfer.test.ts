import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { afterEach, assert, clearStore, describe, test } from 'matchstick-as/assembly/index';
import {
  handleFundingRecomputed,
  handleMarginTransferred,
  handlePositionModified,
} from '../src/futures';
import {
  createFunctionRecomputedEvent,
  createMarginTransferredEvent,
  createPositionModifiedEvent,
  toEth,
  toGwei,
} from './perpsV2-utils';
const trader = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe('Perps V2', () => {
  afterEach(() => {
    clearStore();
  });
  test('Margin Transferred works and updates position funding', () => {
    const initialFunding = 1000;
    const initialFundingRecomputedEvent = createFunctionRecomputedEvent(
      toEth(initialFunding), // funding
      toEth(10), // fundingRate
      BigInt.fromI32(1), // funding index
      BigInt.fromI32(15), // block timestamp
      10 // log index
    );
    handleFundingRecomputed(initialFundingRecomputedEvent);
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), //id
      Address.fromString(trader), //account
      toEth(500), // margin
      toEth(-2), // size
      toEth(-2), //tradeSize
      toEth(1000), // lastPrice
      BigInt.fromI32(1), // funding Index
      toGwei(1000000000), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      1 // log index
    );
    handlePositionModified(positionOpenedEvent);
    const positionId = `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`;
    assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', toEth(-1).toString());
    assert.fieldEquals('FuturesPosition', positionId, 'margin', toEth(500).toString());
    assert.fieldEquals('FuturesPosition', positionId, 'leverage', toEth(4).toString());
    assert.fieldEquals('FuturesPosition', positionId, 'netFunding', toEth(0).toString());

    const FundingRecomputedEvent1 = createFunctionRecomputedEvent(
      toEth(initialFunding - 10), // funding going down
      toEth(10), // fundingRate
      BigInt.fromI32(2), //funding index
      BigInt.fromI32(16), // block timestamp
      10 // log index
    );
    handleFundingRecomputed(FundingRecomputedEvent1);
    const marginTransferredEvent = createMarginTransferredEvent(
      Address.fromString(trader), //sender
      toEth(100), // marginDelta
      10, // timestamp
      1 // log index
    );
    handleMarginTransferred(marginTransferredEvent);
    const positionUpdatedByTransferredMargin = createPositionModifiedEvent(
      BigInt.fromI32(1), //id
      Address.fromString(trader), //account
      toEth(400), // margin
      toEth(-2), // size
      toEth(0), // tradeSize
      toEth(1000), // lastPrice
      BigInt.fromI32(2), // funding index
      toGwei(0), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      2 // log index
    );
    handlePositionModified(positionUpdatedByTransferredMargin);
    log.warning('STARTING ASSERTION', []);
    log.info('Futures Position', []);

    assert.fieldEquals('FuturesPosition', positionId, 'netFunding', toEth(20).toString()); // (10 * 2)
    assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', toEth(19).toString()); // -1 + (10 * 2)
    assert.fieldEquals('FuturesPosition', positionId, 'margin', toEth(400).toString());
    assert.fieldEquals('FuturesPosition', positionId, 'leverage', toEth(5).toString());

    const FundingRecomputedEvent2 = createFunctionRecomputedEvent(
      toEth(initialFunding + 10), // funding going down
      toEth(10), // fundingRate
      BigInt.fromI32(3), //funding index
      BigInt.fromI32(16), // block timestamp
      10 // log index
    );
    handleFundingRecomputed(FundingRecomputedEvent2);
    const increasePos = createPositionModifiedEvent(
      BigInt.fromI32(1), //id
      Address.fromString(trader), //account
      toEth(400), // margin
      toEth(-3), // size
      toEth(-1), // tradeSize
      toEth(1000), // lastPrice
      BigInt.fromI32(3), // funding index
      toGwei(1000000000), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      2 // log index
    );
    handlePositionModified(increasePos);
    assert.fieldEquals('FuturesPosition', positionId, 'netFunding', toEth(-20).toString()); // (10 * 2) + (-20* 2)
    assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', toEth(-22).toString()); // -1 + (10 * 2) +  (-20 * 2) -1
  });
});
