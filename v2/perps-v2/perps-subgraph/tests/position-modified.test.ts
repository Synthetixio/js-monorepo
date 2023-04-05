import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
  logStore,
} from 'matchstick-as/assembly/index';
import {
  createFunctionRecomputedEvent,
  createPositionModifiedEvent,
  toEth,
  toGwei,
} from './perpsV2-utils';
import { handleFundingRecomputed, handlePositionModified } from '../src/futures';
const trader = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe('modify position handler', () => {
  afterEach(() => {
    clearStore();
  });
  describe('pnl and average entry price', () => {
    test('long open -> long increase -> close: with price and funding going up', () => {
      const initialFunding = 1000;
      const initialFundingRecomputedEvent = createFunctionRecomputedEvent(
        toEth(initialFunding), // funding
        toEth(10), // fundingRate
        BigInt.fromI32(1), // index
        BigInt.fromI32(15), // block timestamp
        10 // log index
      );
      handleFundingRecomputed(initialFundingRecomputedEvent);
      const openedEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(2), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        10, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(openedEvent);
      const positionId = `${openedEvent.address.toHex() + '-' + '0x1'}`;
      let expectedRealizedPnl = toEth(-1).toString();
      let expectedUnrealizedPnl = toEth(0).toString();
      let expectedEntry = toEth(1000).toString();
      let expectedTradePnl = toEth(-1).toString();

      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', expectedRealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', expectedUnrealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedRealizedPnl
      );

      const FundingRecomputedEvent1 = createFunctionRecomputedEvent(
        toEth(initialFunding + 10), // funding
        toEth(10), // fundingRate
        BigInt.fromI32(2), // index
        BigInt.fromI32(16), // block timestamp
        10 // log index
      );
      handleFundingRecomputed(FundingRecomputedEvent1);

      const modifyEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(3), //size
        toEth(1), // trade size
        toEth(1100), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), //skew
        1 // log index
      );
      handlePositionModified(modifyEvent);

      expectedRealizedPnl = toEth(18).toString(); // (-1) + (10 * 2) - 1
      expectedUnrealizedPnl = '200000000000000000001'; // (1100 - 1033.33333) * 3
      expectedTradePnl = toEth(19).toString(); // (10 * 2) - 1
      expectedEntry = '1033333333333333333333'; // 1033.33333

      assert.fieldEquals(
        'FuturesTrade',
        `${modifyEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', expectedRealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', expectedUnrealizedPnl);

      const FundingRecomputedEvent2 = createFunctionRecomputedEvent(
        toEth(initialFunding + 10), // funding
        toEth(10), // fundingRate
        BigInt.fromI32(3), // index
        BigInt.fromI32(16), // block timestamp
        10 // log index
      );
      handleFundingRecomputed(FundingRecomputedEvent2);

      const closeEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(0), //size
        toEth(-3), // trade size
        toEth(1200), // last price
        BigInt.fromI32(3), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), //skew
        1 // log index
      );
      handlePositionModified(closeEvent);

      expectedRealizedPnl = '517000000000000000001'; // 18 + 19 + ((1200 - 1033.333) * 3). prevRealized + (accruedFunding + fees) + ((current price - avg entry price) * 3)
      expectedUnrealizedPnl = toEth(0).toString();
      expectedTradePnl = toEth(299).toString(); //(1200 - 1100) * 3) - 1
      expectedEntry = '1033333333333333333333'; // 1033.33333

      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', expectedRealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', expectedUnrealizedPnl);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
    });

    test('short open -> flipped to long -> close: with price going up', () => {
      const openedEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(-2), //size (short position)
        toEth(-2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        10, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(openedEvent);
      const positionId = `${openedEvent.address.toHex() + '-' + '0x1'}`;
      let realizedPnl = toEth(-1).toString();
      let unrealizedPnl = toEth(0).toString();
      let expectedEntry = toEth(1000).toString();
      let expectedTradePnl = toEth(-1).toString();
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );

      const modifyEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(1), // size (short position decreased)
        toEth(3), // trade size
        toEth(1100), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(modifyEvent);

      realizedPnl = toEth(-202).toString(); // -1 + ((1100 - 1000) * -2) -1
      unrealizedPnl = toEth(0).toString(); // (1100 - 1000 ) * 1
      expectedEntry = toEth(1100).toString(); // decreasing a position does not affect entry price
      expectedTradePnl = toEth(-201).toString(); // ((1100 - 1000) * -2) -1
      assert.fieldEquals(
        'FuturesTrade',
        `${modifyEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);

      const closeEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(0), // size (position closed)
        toEth(-1), // trade size
        toEth(1200), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(closeEvent);
      realizedPnl = toEth(-103).toString(); // -202 + ((1200 -1100) * 1) + -1
      unrealizedPnl = toEth(0).toString();
      expectedEntry = toEth(1100).toString();
      expectedTradePnl = toEth(99).toString(); // ((1200 -1100) * 1) + -1

      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
    });
    test('short open -> short decrease -> close: with price going up', () => {
      const openedEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(-2), //size (short position)
        toEth(-2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        10, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(openedEvent);
      const positionId = `${openedEvent.address.toHex() + '-' + '0x1'}`;
      let realizedPnl = toEth(-1).toString();
      let unrealizedPnl = toEth(0).toString();
      let expectedEntry = toEth(1000).toString();
      let expectedTradePnl = toEth(-1).toString();
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );

      const modifyEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(-1), // size (short position decreased)
        toEth(1), // trade size
        toEth(1100), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(modifyEvent);

      realizedPnl = toEth(-102).toString(); // -1 + ((1100 - 1000) * -1) -1
      unrealizedPnl = toEth(-100).toString(); // (1100 - 1000 ) * 1
      expectedEntry = toEth(1000).toString(); // decreasing a position does not affect entry price
      expectedTradePnl = toEth(-101).toString(); // ((1100 - 1000) * -1) -1
      assert.fieldEquals(
        'FuturesTrade',
        `${modifyEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);

      const closeEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(0), // size (position closed)
        toEth(1), // trade size
        toEth(1200), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(closeEvent);
      realizedPnl = toEth(-303).toString(); // -102 + ((1200 -1000) * -1) + -1
      unrealizedPnl = toEth(0).toString();
      expectedEntry = toEth(1000).toString();
      expectedTradePnl = toEth(-101).toString(); // ((1100 - 1000) * -1) -1

      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', realizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', unrealizedPnl);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
    });
    test('long open -> long decrease:  with price going down and funding going up', () => {
      const initialFunding = 1000;
      const initialFundingRecomputedEvent = createFunctionRecomputedEvent(
        toEth(initialFunding), // funding
        toEth(10), // fundingRate
        BigInt.fromI32(1), // index
        BigInt.fromI32(15), // block timestamp
        10 // log index
      );
      handleFundingRecomputed(initialFundingRecomputedEvent);
      const openedEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(2), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        10, // timestamp
        BigInt.fromI32(12), // skew
        1 // log index
      );
      handlePositionModified(openedEvent);
      const positionId = `${openedEvent.address.toHex() + '-' + '0x1'}`;
      let expectedRealizedPnl = toEth(-1).toString();
      let expectedUnrealizedPnl = toEth(0).toString();
      let expectedEntry = toEth(1000).toString();
      let expectedTradePnl = toEth(-1).toString();

      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', expectedRealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', expectedUnrealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );

      const FundingRecomputedEvent1 = createFunctionRecomputedEvent(
        toEth(initialFunding + 10), // funding
        toEth(10), // fundingRate
        BigInt.fromI32(2), // index
        BigInt.fromI32(16), // block timestamp
        10 // log index
      );
      handleFundingRecomputed(FundingRecomputedEvent1);
      const modifyEvent = createPositionModifiedEvent(
        BigInt.fromI32(1), // id
        Address.fromString(trader), // account
        toEth(5), // margin
        toEth(2), //size
        toEth(-1), // trade size
        toEth(900), // last price
        BigInt.fromI32(2), // funding index
        toGwei(1000000000), // fee  (equal to toETH(1))
        20, // timestamp
        BigInt.fromI32(12), //skew
        1 // log index
      );
      handlePositionModified(modifyEvent);
      // (avgEntryPrice - lastPrice) * (tradeSize * -1)
      // priceActionLoss = (900 - 1000) * 1 = =100
      // accruedRealizedPnl = priceActionLoss - fees + netFunding
      // accruedRealizedPnl = -100 - 1 + (10 * 2) = -81
      // previousRealizedPnl = -1
      // newExpectedRealizedPnl =previousRealizedPnl + accruedRealizedPnl
      // newExpectedRealizedPnl = -1 + -81 = -82

      expectedRealizedPnl = toEth(-82).toString();
      expectedUnrealizedPnl = toEth(-200).toString(); // (900- 1000) * 2
      expectedEntry = toEth(1000).toString();
      expectedTradePnl = toEth(-81).toString();
      assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', expectedRealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'unrealizedPnl', expectedUnrealizedPnl);
      assert.fieldEquals('FuturesPosition', positionId, 'avgEntryPrice', expectedEntry);
      assert.fieldEquals(
        'FuturesTrade',
        `${openedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
        'realizedPnl',
        expectedTradePnl
      );
    });
  });
});
