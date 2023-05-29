import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import {
  afterEach,
  assert,
  clearStore,
  describe,
  logStore,
  test,
} from 'matchstick-as/assembly/index';
import { handlePositionLiquidatedLegacy, handlePositionModified } from '../src/futures';
import {
  createPositionLiquidatedEvent,
  createPositionModifiedEvent,
  toEth,
  toGwei,
} from './perpsV2-utils';

const trader = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
describe('Perps V2', () => {
  afterEach(() => {
    clearStore();
  });

  test('position got liquidated, with old liquidation event', () => {
    const positionOpenedEvent = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(10), // margin
      toEth(1), // size
      toEth(1), // tradeSize
      toEth(1000), // lastPrice
      BigInt.fromI32(1), // fundingIndex
      toGwei(2), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      1 // logIndex
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
    logStore();
    assert.fieldEquals(
      'FuturesTrade',
      `${positionLiquidatedEvent.transaction.hash.toHex()}-${2}`,
      'type',
      'Liquidated'
    );
  });
});
