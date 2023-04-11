import { Address, BigInt, log, store } from '@graphprotocol/graph-ts';
import { assert, describe, test, clearStore, afterEach } from 'matchstick-as/assembly/index';
import {
  createFunctionRecomputedEvent,
  createMarginTransferredEvent,
  createPositionLiquidatedEvent,
  createPositionModifiedEvent,
  toEth,
  toGwei,
} from './perpsV2-utils';
import {
  handleFundingRecomputed,
  handleMarginTransferred,
  handlePositionLiquidatedLegacy,
  handlePositionModified,
} from '../src/futures';

const trader = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe('Perps V2', () => {
  afterEach(() => {
    clearStore();
  });

  test('net funding works for short position and funding decreasing', () => {
    // This just tests one case, all the cases are tested seperately in calculation.test.ts
    const initialFunding = 1000;
    const initialFundingRecomputedEvent = createFunctionRecomputedEvent(
      BigInt.fromI32(initialFunding), // funding
      BigInt.fromI32(10), // fundingRate
      BigInt.fromI32(1), // index
      BigInt.fromI32(15), // block timestamp
      10 // log index
    );
    handleFundingRecomputed(initialFundingRecomputedEvent);
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(5), //margin
      toEth(-2), // size
      toEth(-2), // trade size
      toEth(1000), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1), // fee
      10, //  timestamp
      BigInt.fromI32(12), // skew
      1 // log index
    );
    handlePositionModified(positionOpenedEvent);
    const positionId = `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`;
    // Assert funding is 0 when opening
    assert.fieldEquals('FuturesPosition', positionId, 'netFunding', '0');
    assert.fieldEquals('FuturesPosition', positionId, 'fundingIndex', '1');

    const fundingRecomputedEvent = createFunctionRecomputedEvent(
      BigInt.fromI32(initialFunding - 100), // funding
      BigInt.fromI32(10), // fundingRate
      BigInt.fromI32(5), // index
      BigInt.fromI32(15), // block timestamp
      10 // log index
    );
    handleFundingRecomputed(fundingRecomputedEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(0), // margin
      toEth(-3), //size
      toEth(-1), // trade size
      toEth(1200), // last price
      BigInt.fromI32(5), // funding index
      toGwei(1), // fee
      20, // timestamp
      BigInt.fromI32(12), //skew
      2 // log index
    );
    handlePositionModified(modifyPositionEvent);
    // The funding has decreased with 100 since we opened the position
    // When funding decreases and we have a short opened, it means we getting paid.
    // The initial funding was 10000. The new funding is 9900. So a diff of 100
    // We have a size of 2 when opening till now, which means we expect to net funding to be 100 * 2 = 200
    assert.fieldEquals('FuturesPosition', positionId, 'netFunding', '200');
    assert.fieldEquals('FuturesPosition', positionId, 'fundingIndex', '5');
  });

  test('calculate PNL for open short position', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(0), // margin
      toEth(-3), //size
      toEth(-1), // trade size
      toEth(1200), // last price
      BigInt.fromI32(2), // funding index
      toGwei(1), // fee
      20, // timestamp
      BigInt.fromI32(12), //skew
      2 // log index
    );
    handlePositionModified(modifyPositionEvent);

    log.warning('STARTING ASSERTION', []);
    log.info('Futures Position', []);
    // FUTURES POSITION
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'id',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'trader',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'openTimestamp',
      '10'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'long',
      'false'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'market',
      positionOpenedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'isOpen',
      'true'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'isLiquidated',
      'false'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'trades',
      '2'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'feesPaidToSynthetix',
      toGwei(2).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'size',
      toEth(-3).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'initialMargin',
      toEth(5).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'leverage',
      toEth(-3).times(toEth(1200)).div(toEth(5)).abs().toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'netFunding',
      '0'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'margin',
      toEth(5).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'realizedPnl',
      '-2000000000'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'unrealizedPnl',
      '-400000000000000000002'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'fundingIndex',
      '1'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'totalVolume',
      toEth(-2)
        .times(toEth(1000))
        .div(BigInt.fromI32(10).pow(18))
        .abs()
        .plus(toEth(-1).times(toEth(1200)).div(BigInt.fromI32(10).pow(18)).abs())
        .toString()
    );

    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'entryPrice',
      toEth(1000).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'entryPrice',
      toEth(1000).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'lastPrice',
      toEth(1200).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'avgEntryPrice',
      '1066666666666666666666'
    );
    assert.assertNull(
      store
        .get('FuturesPosition', `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`)!
        .get('exitPrice')
    );
    assert.assertNull(
      store
        .get('FuturesPosition', `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`)!
        .get('closeTimestamp')
    );
    assert.entityCount('FuturesPosition', 1);

    log.info('Synthetix', []);
    // SYNTHETIX
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'feesByPositionModifications',
      toGwei(2).toString()
    );
    assert.fieldEquals('Synthetix', 'synthetix', 'feesByLiquidations', '0');
    assert.fieldEquals('Synthetix', 'synthetix', 'totalLiquidations', '0');
    assert.fieldEquals('Synthetix', 'synthetix', 'totalTraders', '1');

    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'totalVolume',
      toEth(-2)
        .times(toEth(1000))
        .div(BigInt.fromI32(10).pow(18))
        .abs()
        .plus(toEth(-1).times(toEth(1200)).div(BigInt.fromI32(10).pow(18)).abs())
        .toString()
    );

    log.info('Trader', []);
    // TRADER
    assert.fieldEquals('Trader', trader.toLowerCase(), 'margin', toEth(5).toString());
    assert.fieldEquals('Trader', trader.toLowerCase(), 'totalLiquidations', '0');
    assert.fieldEquals('Trader', trader.toLowerCase(), 'feesPaidToSynthetix', toGwei(2).toString());
    assert.fieldEquals('Trader', trader.toLowerCase(), 'totalMarginLiquidated', '0');
    assert.fieldEquals(
      'Trader',
      trader.toLowerCase(),
      'totalVolume',
      toEth(-2)
        .times(toEth(1000))
        .div(BigInt.fromI32(10).pow(18))
        .abs()
        .plus(toEth(-1).times(toEth(1200)).div(BigInt.fromI32(10).pow(18)).abs())
        .toString()
    );
    assert.fieldEquals('Trader', trader.toLowerCase(), 'realizedPnl', '-2000000000');
    assert.fieldEquals(
      'Trader',
      trader.toLowerCase(),
      'trades',
      `[${modifyPositionEvent.address.toHex() + '-' + '1'}, ${
        modifyPositionEvent.address.toHex() + '-' + '2'
      }]`
    );

    log.info('Futures Trade', []);
    // FUTURES TRADE
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'timestamp',
      '10'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'trader',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'margin',
      toEth(5).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'futuresPosition',
      `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'size',
      toEth(-2).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'market',
      positionOpenedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'price',
      toEth(1000).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'positionSize',
      toEth(-2).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'positionClosed',
      'false'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'realizedPnl',
      '-1000000000'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'feesPaidToSynthetix',
      toGwei(1).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'feesPaidToSynthetix',
      toGwei(1).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'timestamp',
      '20'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'trader',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'futuresPosition',
      `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'futuresPosition',
      `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'size',
      toEth(-1).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'market',
      positionOpenedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'price',
      toEth(1200).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'positionSize',
      toEth(-3).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'positionClosed',
      'false'
    );

    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'feesPaidToSynthetix',
      toGwei(1).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'type',
      'PositionModified'
    );
  });

  test('position got liquidated', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(10),
      toEth(1),
      toEth(1),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(2),
      10,
      BigInt.fromI32(12),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const positionModifiedByLiquidationEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(0),
      toEth(0),
      toEth(0),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(0),
      10,
      BigInt.fromI32(12),
      2
    );
    handlePositionModified(positionModifiedByLiquidationEvent);
    const positionLiquidatedEvent = createPositionLiquidatedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      Address.fromString('0x98018d1eB5F2AE291D1537548ABBAA773382eEd4'),
      toEth(10),
      toEth(800),
      toEth(1),
      20,
      3
    );
    handlePositionLiquidatedLegacy(positionLiquidatedEvent);
    log.warning('STARTING ASSERTION', []);
    // SYNTHETIX
    log.info('Synthetix', []);
    // 90% of the total fee
    assert.fieldEquals('Synthetix', 'synthetix', 'feesByLiquidations', '849905364703000879');
    // FUTURES TRADE
    log.info('Futures Trade', []);
    assert.fieldEquals(
      'FuturesTrade',
      `${positionLiquidatedEvent.transaction.hash.toHex()}-${2}`,
      'type',
      'Liquidated'
    );
  });

  test('open a short and close it', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const closePositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(0),
      toEth(2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      2
    );
    handlePositionModified(closePositionEvent);
    log.warning('STARTING ASSERTION', []);
    log.info('Futures Trade', []);
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'positionClosed',
      'false'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'positionClosed',
      'true'
    );
  });

  test('open a short and modify it', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const positionModifiedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-4),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      2
    );
    handlePositionModified(positionModifiedEvent);
    log.warning('STARTING ASSERTION', []);
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'type',
      'PositionOpened'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'type',
      'PositionModified'
    );
  });

  test('Margin Transferred should updated the position and produce an unknown tradeEntity', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(12),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const marginTransferredEvent = createMarginTransferredEvent(
      Address.fromString(trader),
      toEth(2),
      10,
      1
    );
    handleMarginTransferred(marginTransferredEvent);
    const positionUpdatedByTransferredMargin = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(0),
      toEth(1000),
      BigInt.fromI32(2),
      toGwei(0),
      10,
      BigInt.fromI32(12),
      2
    );
    handlePositionModified(positionUpdatedByTransferredMargin);
    log.warning('STARTING ASSERTION', []);
    log.info('Futures Trade', []);
    assert.fieldEquals(
      'FuturesTrade',
      `${positionUpdatedByTransferredMargin.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'type',
      'PositionOpened'
    );
    assert.notInStore(
      'FuturesTrade',
      `${positionUpdatedByTransferredMargin.address.toHex()}-${BigInt.fromI32(2).toString()}`
    );
    assert.entityCount('FuturesTrade', 1);
  });

  test('funding recomputed', () => {
    const fundingRecomputedEvent = createFunctionRecomputedEvent(
      BigInt.fromI32(20),
      BigInt.fromI32(10),
      BigInt.fromI32(5),
      BigInt.fromI32(15),
      10
    );
    handleFundingRecomputed(fundingRecomputedEvent);
    log.warning('STARTING ASSERTION', []);
    log.info('Funding Rate Update', []);
    assert.fieldEquals(
      'FundingRateUpdate',
      `${fundingRecomputedEvent.address.toHex()}-${5}`,
      'fundingRate',
      '10'
    );
    assert.fieldEquals(
      'FundingRateUpdate',
      `${fundingRecomputedEvent.address.toHex()}-${5}`,
      'funding',
      '20'
    );
    assert.fieldEquals(
      'FundingRateUpdate',
      `${fundingRecomputedEvent.address.toHex()}-${5}`,
      'index',
      '5'
    );
    assert.fieldEquals(
      'FundingRateUpdate',
      `${fundingRecomputedEvent.address.toHex()}-${5}`,
      'timestamp',
      '15'
    );
    assert.fieldEquals(
      'FundingRateUpdate',
      `${fundingRecomputedEvent.address.toHex()}-${5}`,
      'market',
      fundingRecomputedEvent.address.toHex()
    );
  });

  test('open a short and flip sides', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(-2),
      toEth(-2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(200),
      1
    );
    handlePositionModified(positionOpenedEvent);
    const positionModifiedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(5),
      toEth(2),
      toEth(4),
      toEth(1200),
      BigInt.fromI32(1),
      toGwei(1),
      10,
      BigInt.fromI32(200),
      2
    );
    handlePositionModified(positionModifiedEvent);
    log.warning('STARTING ASSERTION', []);
    log.info('Futures Trade', []);
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'type',
      'PositionOpened'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'type',
      'PositionModified'
    );

    const existingSize = toEth(-2).abs();
    const existingPrice = existingSize.times(toEth(1000));
    const newSize = toEth(4).abs();
    const newPrice = newSize.times(toEth(1200));

    log.info('Futures Position', []);
    assert.fieldEquals(
      'FuturesPosition',
      `${positionModifiedEvent.address.toHex() + '-' + '0x1'}`,
      'entryPrice',
      toEth(1200).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${positionModifiedEvent.address.toHex() + '-' + '0x1'}`,
      'avgEntryPrice',
      toEth(1200).toString()
    );
  });
});
