import { Address, BigInt, Bytes, log, store } from '@graphprotocol/graph-ts';
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
function toEth(n: u64): BigInt {
  if (n < 0) return BigInt.fromU64(n).times(BigInt.fromI32(10).pow(18));
  return BigInt.fromI64(changetype<i64>(n)).times(BigInt.fromI64(10).pow(18));
}
function toGwei(n: u64): BigInt {
  if (n < 0) return BigInt.fromU64(n).times(BigInt.fromI32(10).pow(9));
  return BigInt.fromI64(changetype<i64>(n)).times(BigInt.fromI64(10).pow(9));
}

describe('Perps V2', () => {
  afterEach(() => {
    clearStore();
  });

  test('open a position that goes short, PNL should be negative but after price change and increase of position size, the PNL should be positive', () => {
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
      1
    );
    handlePositionModified(positionOpenedEvent);
    const modifyPositionEvent = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader),
      toEth(0),
      toEth(-3),
      toEth(-1),
      toEth(1200),
      BigInt.fromI32(2),
      toGwei(1),
      20,
      2
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
      'account',
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
      toEth(5).plus(toGwei(1)).toString()
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
      'pnl',
      toGwei(1)
        .times(BigInt.fromI32(-1))
        .plus(
          toEth(1200)
            .minus(toEth(1000))
            .times(toEth(-1).abs())
            .times(BigInt.fromI32(-1))
            .div(BigInt.fromI32(10).pow(18))
        )
        .toString()
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
      toEth(1000).toString()
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
    assert.fieldEquals(
      'Trader',
      trader.toLowerCase(),
      'pnl',
      toGwei(1)
        .times(BigInt.fromI32(-1))
        .plus(
          toEth(1200)
            .minus(toEth(1000))
            .times(toEth(-1).abs())
            .times(BigInt.fromI32(-1))
            .div(BigInt.fromI32(10).pow(18))
        )
        .toString()
    );
    assert.fieldEquals(
      'Trader',
      trader.toLowerCase(),
      'trades',
      `[${modifyPositionEvent.address.toHex() + '-' + '1'}, ${
        modifyPositionEvent.address.toHex() + '-' + '2'
      }]`
    );

    log.info('FuturesTrade', []);
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
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'margin',
      toEth(5).plus(toGwei(1)).toString()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(1).toString()}`,
      'positionId',
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
      'pnl',
      toGwei(-1).toString()
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
      'account',
      trader.toLowerCase()
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'positionId',
      `${positionOpenedEvent.address.toHex() + '-' + '0x1'}`
    );
    assert.fieldEquals(
      'FuturesTrade',
      `${positionOpenedEvent.address.toHex()}-${BigInt.fromI32(2).toString()}`,
      'positionId',
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
      'pnl',

      toEth(1200)
        .minus(toEth(1000))
        .times(toEth(-1).abs())
        .times(BigInt.fromI32(-1))
        .div(BigInt.fromI32(10).pow(18))
        .toString()
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
