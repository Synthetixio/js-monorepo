import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { assert, describe, test, clearStore, afterEach } from 'matchstick-as/assembly/index';
import {
  createDelayedOrderRemovedEvent,
  createDelayedOrderSubmittedEvent,
  createPositionLiquidatedEvent,
  createPositionModifiedEvent,
} from './perpsV2-utils';
import {
  handleDelayedOrderRemoved,
  handleDelayedOrderSubmitted,
  handlePositionLiquidated,
  handlePositionModified,
} from '../src/futures';

const trader = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
function toEth(n: i32): BigInt {
  return BigInt.fromI32(n).times(BigInt.fromI32(10).pow(18));
}

/**
 * - check pnl calc
 */

describe('Perps V2', () => {
  afterEach(() => {
    clearStore();
  });

  test('should only create one entity when a position is getting opened', () => {
    const event = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(200),
      BigInt.fromI32(20),
      toEth(100),
      toEth(1000),
      BigInt.fromI32(1),
      toEth(2),
      10
    );
    handlePositionModified(event);

    // FUTURES POSITION
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'id',
      `${event.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'margin',
      toEth(200).toString()
    );
    assert.fieldEquals('FuturesPosition', `${event.address.toHex() + '-' + '0x1'}`, 'size', '20');
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'lastPrice',
      toEth(1000).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'feesPaidToSynthetix',
      toEth(2).toString()
    );
    assert.fieldEquals('FuturesPosition', `${event.address.toHex() + '-' + '0x1'}`, 'trades', '1');
    assert.fieldEquals('FuturesPosition', `${event.address.toHex() + '-' + '0x1'}`, 'long', 'true');
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'isOpen',
      'true'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'isLiquidated',
      'false'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'initialMargin',
      toEth(202).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'pnl',
      `-${toEth(2).toString()}`
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'totalVolume',
      toEth(100)
        .times(toEth(1000))
        .div(BigInt.fromI32(10).pow(18))
        .toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'openTimestamp',
      '10'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${event.address.toHex() + '-' + '0x1'}`,
      'openTimestamp',
      '10'
    );
    assert.entityCount('FuturesPosition', 1);

    // FUTURES TRADE
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'timestamp',
      '10'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'margin',
      toEth(202).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'positionId',
      `${event.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'size',
      toEth(100).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'market',
      event.address.toHex()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'price',
      toEth(1000).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'positionSize',
      '20'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'positionClosed',
      'false'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'pnl',
      `-${toEth(2).toString()}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'feesPaidToSynthetix',
      toEth(2).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${event.transaction.hash.toHex() + '-' + event.logIndex.toString()}`,
      'type',
      'PositionOpened'
    );
    assert.entityCount('FuturesTrade', 1);

    // SYNTHETIX
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'feesByPositionModifications',
      toEth(2).toString()
    );
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'totalVolume',
      toEth(100)
        .times(toEth(1000).div(BigInt.fromI32(10).pow(18)))
        .toString()
    );
    assert.entityCount('Synthetix', 1);
  });

  test('should update the existing FuturesPosition entity', () => {
    const createPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(200),
      BigInt.fromI32(10),
      toEth(100),
      toEth(1000),
      BigInt.fromI32(1),
      toEth(2),
      10,
      1
    );
    handlePositionModified(createPositionEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(300),
      BigInt.fromI32(400),
      toEth(300),
      toEth(1200),
      BigInt.fromI32(2),
      toEth(2),
      20,
      2
    );
    handlePositionModified(modifyPositionEvent);

    // SYNTHETIX
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'totalVolume',
      toEth(100)
        .times(toEth(1000).div(BigInt.fromI32(10).pow(18)))
        .plus(toEth(300).times(toEth(1200).div(BigInt.fromI32(10).pow(18))))
        .toString()
    );
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'feesByPositionModifications',
      toEth(4).toString()
    );
    assert.entityCount('Synthetix', 1);

    // FUTURES POSITION
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'trades',
      '2'
    );

    // FUTURES TRADE
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'timestamp',
      '20'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'margin',
      toEth(302).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'positionId',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'size',
      toEth(300).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'market',
      modifyPositionEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'price',
      toEth(1200).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'positionSize',
      '400'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'positionClosed',
      'false'
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'pnl',
      `2000`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'feesPaidToSynthetix',
      toEth(2).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${modifyPositionEvent.transaction.hash.toHex() +
        '-' +
        modifyPositionEvent.logIndex.toString()}`,
      'type',
      'PositionModified'
    );
    assert.entityCount('FuturesTrade', 2);

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
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'margin',
      toEth(500).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'size',
      '400'
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
      'feesPaidToSynthetix',
      toEth(4).toString()
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
      'long',
      'true'
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
      'initialMargin',
      toEth(202).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'pnl',
      '2000'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'totalVolume',
      toEth(100)
        .times(toEth(1000).div(BigInt.fromI32(10).pow(18)))
        .plus(toEth(300).times(toEth(1200).div(BigInt.fromI32(10).pow(18))))
        .toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'openTimestamp',
      '10'
    );
    assert.entityCount('FuturesPosition', 1);
  });

  test('should create a FuturesOrder entity', () => {
    const delayedOrderSubmittedEvent = createDelayedOrderSubmittedEvent(
      Address.fromString(trader),
      true,
      toEth(1),
      BigInt.fromI32(2),
      BigInt.fromI32(500),
      BigInt.fromI32(600),
      toEth(2),
      toEth(1),
      Bytes.fromHexString('0xKwenta'),
      10
    );
    handleDelayedOrderSubmitted(delayedOrderSubmittedEvent);

    // FUTURES ORDER
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'id',
      trader.toLowerCase() + '-2'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'size', toEth(1).toString());
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'market',
      delayedOrderSubmittedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'orderId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetRoundId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetPrice', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'marginDelta', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'timestamp', '10');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'orderType',
      'DelayedOffchainSubmitted'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'status', 'Pending');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'keeper',
      '0x0000000000000000000000000000000000000000'
    );
  });

  test('should update a FuturesOrder entity', () => {
    const delayedOrderSubmittedEvent = createDelayedOrderSubmittedEvent(
      Address.fromString(trader),
      true,
      toEth(1),
      BigInt.fromI32(2),
      BigInt.fromI32(500),
      BigInt.fromI32(600),
      toEth(2),
      toEth(1),
      Bytes.fromHexString('0xKwenta'),
      10
    );
    handleDelayedOrderSubmitted(delayedOrderSubmittedEvent);

    // FUTURES ORDER
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'id',
      trader.toLowerCase() + '-2'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'size', toEth(1).toString());
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'market',
      delayedOrderSubmittedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'orderId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetRoundId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetPrice', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'marginDelta', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'timestamp', '10');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'orderType',
      'DelayedOffchainSubmitted'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'status', 'Pending');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'keeper',
      '0x0000000000000000000000000000000000000000'
    );

    const delayedOrderRemovedEvent = createDelayedOrderRemovedEvent(
      Address.fromString(trader),
      true,
      BigInt.fromI32(2),
      toEth(1),
      BigInt.fromI32(2),
      toEth(2),
      toEth(1),
      Bytes.fromHexString('0xKwenta'),
      20
    );
    handleDelayedOrderRemoved(delayedOrderRemovedEvent);

    // FUTURES ORDER
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'id',
      trader.toLowerCase() + '-2'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'size', toEth(1).toString());
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'market',
      delayedOrderSubmittedEvent.address.toHex()
    );
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'orderId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetRoundId', '2');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'targetPrice', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'marginDelta', '0');
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'timestamp', '10');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'orderType',
      'DelayedOffchainSubmitted'
    );
    assert.fieldEquals('FuturesOrder', trader.toLowerCase() + '-2', 'status', 'Cancelled');
    assert.fieldEquals(
      'FuturesOrder',
      trader.toLowerCase() + '-2',
      'keeper',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a'
    );
  });

  test('open, modify and close a position', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(10),
      toEth(1),
      toEth(1),
      toEth(1000),
      BigInt.fromI32(1),
      toEth(1),
      10,
      1
    );
    handlePositionModified(positionOpenedEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(10),
      toEth(1),
      toEth(2),
      toEth(1200),
      BigInt.fromI32(2),
      toEth(1),
      20,
      2
    );
    handlePositionModified(modifyPositionEvent);
    const closedPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(10),
      BigInt.fromI32(0),
      toEth(1),
      toEth(1300),
      BigInt.fromI32(3),
      toEth(1),
      30,
      3
    );
    handlePositionModified(closedPositionEvent);

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
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'margin',
      toEth(10).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'size',
      '0'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'lastPrice',
      toEth(1300).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'feesPaidToSynthetix',
      toEth(3).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'trades',
      '3'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'long',
      'true'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'isOpen',
      'false'
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
      'initialMargin',
      toEth(11).toString()
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'pnl',
      '100000000000000000000'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'totalVolume',
      '3400000000000000000000'
    );
    assert.fieldEquals(
      'FuturesPosition',
      `${modifyPositionEvent.address.toHex() + '-' + '0x1'}`,
      'closeTimestamp',
      '30'
    );
    assert.entityCount('FuturesPosition', 1);

    // SYNTHETIX
    assert.fieldEquals(
      'Synthetix',
      'synthetix',
      'feesByPositionModifications',
      toEth(3).toString()
    );

    assert.fieldEquals('Synthetix', 'synthetix', 'totalTraders', '1');

    assert.fieldEquals('Synthetix', 'synthetix', 'totalVolume', '3400000000000000000000');

    // TRADER
    assert.fieldEquals(
      'Trader',
      trader.toLowerCase(),
      'trades',
      `[${modifyPositionEvent.address.toHex() + '-' + '1'}, ${modifyPositionEvent.address.toHex() +
        '-' +
        '2'}, ${modifyPositionEvent.address.toHex() + '-' + '3'}]`
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
      toEth(1),
      10,
      1
    );
    handlePositionModified(positionOpenedEvent);

    const positionLiquidatedEvent = createPositionLiquidatedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      Address.fromString('0x98018d1eB5F2AE291D1537548ABBAA773382eEd4'),
      toEth(10),
      toEth(800),
      toEth(1),
      20
    );
    handlePositionLiquidated(positionLiquidatedEvent);

    // SYNTHETIX
    assert.fieldEquals('Synthetix', 'synthetix', 'feesByLiquidations', toEth(1).toString());
  });
});
