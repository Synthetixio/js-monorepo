import { Address } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import { assert, clearStore, describe, log, logStore, test, afterEach } from 'matchstick-as';
import { Trader } from '../generated/schema';
import { handlePositionModified } from '../src/position-modified';
import { createPositionModifiedEvent, toEth, toGwei } from './perpsV2-utils';
const trader = '0x1234567890123456789012345678901234567890';
const trader1 = '0x1234567890123456789012345678901234567891';
describe('calculateAccruedFunding', () => {
  afterEach(() => {
    clearStore();
  });
  test('updateHistoricalTradeStats', () => {
    const timestampDay1 = 10;
    const timestampDay2 = 86410; // 1 day and 10 seconds
    const timestampDay4 = 259210; // 3 days and 10 seconds

    const events = [
      createPositionModifiedEvent(
        BigInt.fromI32(1), //id
        Address.fromString(trader), //account
        toEth(5), //margin
        toEth(2), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), //fee
        timestampDay1, // timestamp
        BigInt.fromI32(12), //skew
        1 //logIndex
      ),
      createPositionModifiedEvent(
        BigInt.fromI32(2), //id
        Address.fromString(trader), //account
        toEth(5), //margin
        toEth(4), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), //fee
        timestampDay1, // timestamp
        BigInt.fromI32(12), //skew
        2 //logIndex
      ),
      createPositionModifiedEvent(
        BigInt.fromI32(3), //id
        Address.fromString(trader), //account
        toEth(5), //margin
        toEth(6), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), //fee
        timestampDay2, // timestamp
        BigInt.fromI32(12), //skew
        3 //logIndex
      ),
      createPositionModifiedEvent(
        BigInt.fromI32(4), //id
        Address.fromString(trader), //account
        toEth(5), //margin
        toEth(8), //size
        toEth(2), // trade size
        toEth(1000), // last price
        BigInt.fromI32(1), // funding index
        toGwei(1000000000), //fee
        timestampDay4, // timestamp
        BigInt.fromI32(12), //skew
        4 //logIndex
      ),
    ];

    for (let i = 0; i < events.length; i++) {
      // we call handlePositionModified instead of updateHistoricalTradeStats so that other entires, like Trader and Synthetix are created/ updated
      handlePositionModified(events[i]);
    }

    // Check DailyStats for Day 1
    const idDay1 = 'DailyStats-1970-01-01';
    assert.fieldEquals('DailyStats', idDay1, 'volume', toEth(4000).toString());
    assert.fieldEquals('DailyStats', idDay1, 'fees', toGwei(2000000000).toString());
    assert.fieldEquals('DailyStats', idDay1, 'trades', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStats', idDay1, 'newTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay1, 'existingTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay1, 'cumulativeFees', toGwei(2000000000).toString());

    // Check DailyStats for Day 2
    const idDay2 = 'DailyStats-1970-01-02';
    assert.fieldEquals('DailyStats', idDay2, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStats', idDay2, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyStats', idDay2, 'trades', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay2, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStats', idDay2, 'existingTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay2, 'cumulativeVolume', toEth(6000).toString());
    assert.fieldEquals('DailyStats', idDay2, 'cumulativeFees', toGwei(3000000000).toString());
    assert.fieldEquals('DailyStats', idDay2, 'cumulativeTrades', BigInt.fromI32(3).toString());

    // Check DailyStats for Day 4
    const idDay4 = 'DailyStats-1970-01-04';
    assert.fieldEquals('DailyStats', idDay4, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStats', idDay4, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyStats', idDay4, 'trades', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay4, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStats', idDay4, 'existingTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay4, 'cumulativeVolume', toEth(8000).toString());
    assert.fieldEquals('DailyStats', idDay4, 'cumulativeFees', toGwei(4000000000).toString());
    assert.fieldEquals('DailyStats', idDay4, 'cumulativeTrades', BigInt.fromI32(4).toString());

    // Check DailyMarketStats for Day 1
    const marketIdDay1 = events[0].address.toHex().toString().concat('-1970-01-01');
    assert.fieldEquals('DailyMarketStats', marketIdDay1, 'market', events[0].address.toHex());
    assert.fieldEquals('DailyMarketStats', marketIdDay1, 'volume', toEth(4000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay1, 'fees', toGwei(2000000000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay1, 'trades', BigInt.fromI32(2).toString());

    // Check DailyMarketStats for Day 2
    const marketIdDay2 = events[0].address.toHex().toString().concat('-1970-01-02');
    assert.fieldEquals('DailyMarketStats', marketIdDay2, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay2, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay2, 'trades', BigInt.fromI32(1).toString());

    // Check DailyMarketStats for Day 4
    const marketIdDay4 = events[0].address.toHex().toString().concat('-1970-01-04');
    assert.fieldEquals('DailyMarketStats', marketIdDay4, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay4, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay4, 'trades', BigInt.fromI32(1).toString());
    // Check CumulativeMarketStats
    const marketAddress = events[0].address.toHex().toString();
    const id = 'CumulativeMarketStats-' + marketAddress;

    assert.fieldEquals('CumulativeMarketStats', id, 'cumulativeVolume', toEth(8000).toString());
    assert.fieldEquals(
      'CumulativeMarketStats',
      id,
      'cumulativeFees',
      toGwei(4000000000).toString()
    );
    assert.fieldEquals(
      'CumulativeMarketStats',
      id,
      'cumulativeTrades',
      BigInt.fromI32(4).toString()
    );
  });
  test('Ensure trades on different markets works', () => {
    // Create two events for different markets and different days
    const event1 = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), //account
      toEth(5), // margin
      toEth(2), // size
      toEth(2), //trade size
      toEth(1000), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1000000000), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      1 // logIndex
    );
    const differentMarketAddress = '0xa16081f360e3847006db660bae1c6d1b2e17ec2b';
    const event2 = createPositionModifiedEvent(
      BigInt.fromI32(2), // id
      Address.fromString(trader), //account
      toEth(6), // margin
      toEth(5), // size
      toEth(3), //trade size
      toEth(1500), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1500000000), // fee
      60 * 60 * 24 + 10, // One day later
      BigInt.fromI32(15), // skew
      2, // logIndex
      Address.fromString(differentMarketAddress)
    );
    const event3 = createPositionModifiedEvent(
      BigInt.fromI32(2), // id
      Address.fromString(trader), //account
      toEth(6), // margin
      toEth(6), // size
      toEth(1), //trade size
      toEth(1500), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1500000000), // fee
      60 * 60 * 24 + 10 + 10000, // Even later
      BigInt.fromI32(15), // skew
      2 // logIndex
    );

    // Process the events
    handlePositionModified(event1);
    handlePositionModified(event2);
    handlePositionModified(event3);

    // // Check DailyStats
    const idDay1 = 'DailyStats-1970-01-01';
    const idDay2 = 'DailyStats-1970-01-02';

    assert.fieldEquals('DailyStats', idDay1, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStats', idDay2, 'volume', toEth(6000).toString());

    // Check DailyMarketStats for event1 and event2
    const marketIdDay1Event1 = event1.address.toHex().toString().concat('-1970-01-01');
    const marketIdDay2Event2 = event2.address.toHex().toString().concat('-1970-01-02');
    const marketIdDay2Event3 = event3.address.toHex().toString().concat('-1970-01-02');

    assert.fieldEquals('DailyMarketStats', marketIdDay1Event1, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay2Event2, 'volume', toEth(4500).toString());
    assert.fieldEquals('DailyMarketStats', marketIdDay2Event3, 'volume', toEth(1500).toString());

    // Check CumulativeMarketStats for event1 and event2
    const defaultMarketId = 'CumulativeMarketStats-'.concat(event1.address.toHex().toString());
    const differentMarketId = 'CumulativeMarketStats-'.concat(differentMarketAddress);

    assert.fieldEquals(
      'CumulativeMarketStats',
      defaultMarketId,
      'cumulativeVolume',
      toEth(3500).toString()
    );
    assert.fieldEquals('CumulativeMarketStats', defaultMarketId, 'market', event1.address.toHex());
    assert.fieldEquals(
      'CumulativeMarketStats',
      differentMarketId,
      'cumulativeVolume',
      toEth(4500).toString()
    );
    assert.fieldEquals(
      'CumulativeMarketStats',
      differentMarketId,
      'market',
      event2.address.toHex()
    );
  });
  test('Daily stats updated for two new traders', () => {
    // Create two events for the same day with different traders
    const event1 = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), //account
      toEth(5), // margin
      toEth(2), // size
      toEth(2), //trade size
      toEth(1000), //  last price
      BigInt.fromI32(1), //  funding index
      toGwei(1000000000), //  fee
      10, //  timestamp
      BigInt.fromI32(12), // skew
      1 // logIndex
    );

    const event2 = createPositionModifiedEvent(
      BigInt.fromI32(2), // id
      Address.fromString(trader1), // account
      toEth(7), // margin
      toEth(3), // size
      toEth(3), // trade size
      toEth(1500), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1000000000), // fee
      10, // timestamp
      BigInt.fromI32(15), // skew
      2 // logIndex
    );

    handlePositionModified(event1);
    handlePositionModified(event2);

    // Get the day string
    const day = '1970-01-01';
    const id = 'DailyStats-'.concat(day);

    // Check if traders are created correctly in DailyStats
    assert.fieldEquals('DailyStats', id, 'cumulativeTraders', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStats', id, 'newTraders', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStats', id, 'existingTraders', BigInt.fromI32(0).toString());

    // Check if Trader entities are created correctly
    const traderEntity1 = Trader.load(trader);
    const traderEntity2 = Trader.load(trader1);
    assert.assertNotNull(traderEntity1);
    assert.assertNotNull(traderEntity2);
  });
  test('Daily stats updated for 1 trader which trades over multiple days', () => {
    // Create two events for the same day with the same trader
    const event1 = createPositionModifiedEvent(
      BigInt.fromI32(1),
      Address.fromString(trader1),
      toEth(5),
      toEth(2),
      toEth(2),
      toEth(1000),
      BigInt.fromI32(1),
      toGwei(1000000000),
      10,
      BigInt.fromI32(12),
      1
    );

    const event2 = createPositionModifiedEvent(
      BigInt.fromI32(2),
      Address.fromString(trader1),
      toEth(7),
      toEth(3),
      toEth(3),
      toEth(1500),
      BigInt.fromI32(1),
      toGwei(1000000000),
      10,
      BigInt.fromI32(15),
      2
    );
    const event3 = createPositionModifiedEvent(
      BigInt.fromI32(2),
      Address.fromString(trader1),
      toEth(7),
      toEth(3),
      toEth(3),
      toEth(1500),
      BigInt.fromI32(1),
      toGwei(1000000000),
      60 * 60 * 24 + 10, // 1 day later
      BigInt.fromI32(15),
      2
    );

    handlePositionModified(event1);
    handlePositionModified(event2);
    handlePositionModified(event3);

    // Get the day string
    const idDay1 = 'DailyStats-1970-01-01';
    const idDay2 = 'DailyStats-1970-01-02';

    // Day1 Check if existingTraders is incremented correctly in DailyStats
    assert.fieldEquals('DailyStats', idDay1, 'cumulativeTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay1, 'newTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay1, 'existingTraders', BigInt.fromI32(1).toString());
    // Day2 Check if existingTraders is incremented correctly in DailyStats
    assert.fieldEquals('DailyStats', idDay2, 'cumulativeTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStats', idDay2, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStats', idDay2, 'existingTraders', BigInt.fromI32(1).toString());

    // Check if Trader entity is updated correctly
    const traderEntity = Trader.load(trader1);
    assert.assertNotNull(traderEntity);
  });
});
