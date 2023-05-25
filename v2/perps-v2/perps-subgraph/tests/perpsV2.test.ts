import { Address, BigInt, Bytes, log, store } from '@graphprotocol/graph-ts';
import { afterEach, assert, clearStore, describe, test } from 'matchstick-as/assembly/index';
import {
  handleDelayedOrderRemoved,
  handleDelayedOrderSubmitted,
  handleFundingRecomputed,
  handlePositionModified,
} from '../src/futures';
import {
  createDelayedOrderRemovedEvent,
  createDelayedOrderSubmittedEvent,
  createFunctionRecomputedEvent,
  createPositionModifiedEvent,
  toEth,
  toGwei,
} from './perpsV2-utils';

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
      toEth(5), // margin
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
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(5), // margin
      toEth(-2), // size
      toEth(-2), // tradeSize
      toEth(1000), // lastPrice
      BigInt.fromI32(1), // funding index
      toGwei(1), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      1 // log index
    );
    handlePositionModified(positionOpenedEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(5), // margin
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
      '4999999999000000000' // margin sent from contract minus fee
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
    assert.fieldEquals('Trader', trader.toLowerCase(), 'createdAt', '10');
    assert.fieldEquals('Trader', trader.toLowerCase(), 'lastTradeTimestamp', '20');
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
  test('Keeper fees are added as fees', () => {
    const createOrderEvent = createDelayedOrderSubmittedEvent(
      Address.fromString(trader), // account
      true, // isOffchain
      toEth(1), //sizeDelta
      BigInt.fromI32(2), //targetRoundId
      BigInt.fromI32(1), // intentionTime
      BigInt.fromI32(10), // executableAtTime
      toEth(1), //commit Deposit
      toEth(1), //keeperDeposit:
      Bytes.fromUTF8('joey'), // trackingCode
      1, //timestamp
      2 // logIndex
    );
    handleDelayedOrderSubmitted(createOrderEvent);
    const positionModifiedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), //account
      toEth(5), //margin
      toEth(1), // size
      toEth(1), // tradeSize
      toEth(1200), // lastPrice
      BigInt.fromI32(1), // fundingIndex
      toEth(1), // fee
      10, // skew
      BigInt.fromI32(200), // timestamp
      1 // logIndex
    );
    handlePositionModified(positionModifiedEvent);
    const orderRemovedEvent = createDelayedOrderRemovedEvent(
      Address.fromString(trader), // account
      true, // isOffchain
      BigInt.fromI32(2), //currentRoundId
      toEth(1), //sizeDelta
      BigInt.fromI32(2), //targetRoundId
      toEth(1), //commitDeposit
      toEth(1), //keeperDeposit:
      Bytes.fromUTF8('joey'), // trackingCode
      1, //timestamp
      2 // logIndex
    );
    handleDelayedOrderRemoved(orderRemovedEvent);

    const positionId = `${positionModifiedEvent.address.toHex() + '-' + '0x1'}`;

    assert.fieldEquals('FuturesPosition', positionId, 'feesPaidToSynthetix', toEth(2).toString()); // 1 keeper fee, 1 open pos fee
    assert.fieldEquals('FuturesPosition', positionId, 'realizedPnl', toEth(-2).toString()); // 1 keeper fee, 1 open pos fee
  });
});
