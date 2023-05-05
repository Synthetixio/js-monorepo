import { Address } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import { assert, clearStore, describe, log, logStore, test, afterEach } from 'matchstick-as';
import { Trader } from '../generated/schema';
import {
  dayToEpochTimestamp,
  timestampToDate,
  updateFeeStats,
} from '../src/historical-trade-stats';
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

    // Check DailyStat for Day 1
    const idDay1 = 'DailyStat-1970-01-01';
    assert.fieldEquals('DailyStat', idDay1, 'volume', toEth(4000).toString());
    assert.fieldEquals('DailyStat', idDay1, 'fees', toGwei(2000000000).toString());
    assert.fieldEquals('DailyStat', idDay1, 'trades', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStat', idDay1, 'newTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay1, 'existingTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStat', idDay1, 'cumulativeFees', toGwei(2000000000).toString());

    // Check DailyStat for Day 2
    const idDay2 = 'DailyStat-1970-01-02';
    assert.fieldEquals('DailyStat', idDay2, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStat', idDay2, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyStat', idDay2, 'trades', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay2, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStat', idDay2, 'existingTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay2, 'cumulativeVolume', toEth(6000).toString());
    assert.fieldEquals('DailyStat', idDay2, 'cumulativeFees', toGwei(3000000000).toString());
    assert.fieldEquals('DailyStat', idDay2, 'cumulativeTrades', BigInt.fromI32(3).toString());

    // Check DailyStat for Day 4
    const idDay4 = 'DailyStat-1970-01-04';
    assert.fieldEquals('DailyStat', idDay4, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStat', idDay4, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyStat', idDay4, 'trades', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay4, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStat', idDay4, 'existingTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay4, 'cumulativeVolume', toEth(8000).toString());
    assert.fieldEquals('DailyStat', idDay4, 'cumulativeFees', toGwei(4000000000).toString());
    assert.fieldEquals('DailyStat', idDay4, 'cumulativeTrades', BigInt.fromI32(4).toString());

    // Check DailyMarketStat for Day 1
    const marketIdDay1 = events[0].address.toHex().toString().concat('-1970-01-01');
    assert.fieldEquals('DailyMarketStat', marketIdDay1, 'market', events[0].address.toHex());
    assert.fieldEquals('DailyMarketStat', marketIdDay1, 'volume', toEth(4000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay1, 'fees', toGwei(2000000000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay1, 'trades', BigInt.fromI32(2).toString());

    // Check DailyMarketStat for Day 2
    const marketIdDay2 = events[0].address.toHex().toString().concat('-1970-01-02');
    assert.fieldEquals('DailyMarketStat', marketIdDay2, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay2, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay2, 'trades', BigInt.fromI32(1).toString());

    // Check DailyMarketStat for Day 4
    const marketIdDay4 = events[0].address.toHex().toString().concat('-1970-01-04');
    assert.fieldEquals('DailyMarketStat', marketIdDay4, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay4, 'fees', toGwei(1000000000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay4, 'trades', BigInt.fromI32(1).toString());
    // Check CumulativeMarketStat
    const marketAddress = events[0].address.toHex().toString();
    const id = 'CumulativeMarketStat-' + marketAddress;

    assert.fieldEquals('CumulativeMarketStat', id, 'cumulativeVolume', toEth(8000).toString());
    assert.fieldEquals('CumulativeMarketStat', id, 'cumulativeFees', toGwei(4000000000).toString());
    assert.fieldEquals(
      'CumulativeMarketStat',
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

    // // Check DailyStat
    const idDay1 = 'DailyStat-1970-01-01';
    const idDay2 = 'DailyStat-1970-01-02';

    assert.fieldEquals('DailyStat', idDay1, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyStat', idDay2, 'volume', toEth(6000).toString());

    // Check DailyMarketStat for event1 and event2
    const marketIdDay1Event1 = event1.address.toHex().toString().concat('-1970-01-01');
    const marketIdDay2Event2 = event2.address.toHex().toString().concat('-1970-01-02');
    const marketIdDay2Event3 = event3.address.toHex().toString().concat('-1970-01-02');

    assert.fieldEquals('DailyMarketStat', marketIdDay1Event1, 'volume', toEth(2000).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay2Event2, 'volume', toEth(4500).toString());
    assert.fieldEquals('DailyMarketStat', marketIdDay2Event3, 'volume', toEth(1500).toString());

    // Check CumulativeMarketStat for event1 and event2
    const defaultMarketId = 'CumulativeMarketStat-'.concat(event1.address.toHex().toString());
    const differentMarketId = 'CumulativeMarketStat-'.concat(differentMarketAddress);

    assert.fieldEquals(
      'CumulativeMarketStat',
      defaultMarketId,
      'cumulativeVolume',
      toEth(3500).toString()
    );
    assert.fieldEquals('CumulativeMarketStat', defaultMarketId, 'market', event1.address.toHex());
    assert.fieldEquals(
      'CumulativeMarketStat',
      differentMarketId,
      'cumulativeVolume',
      toEth(4500).toString()
    );
    assert.fieldEquals('CumulativeMarketStat', differentMarketId, 'market', event2.address.toHex());
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
    const id = 'DailyStat-'.concat(day);

    // Check if traders are created correctly in DailyStat
    assert.fieldEquals('DailyStat', id, 'cumulativeTraders', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStat', id, 'newTraders', BigInt.fromI32(2).toString());
    assert.fieldEquals('DailyStat', id, 'existingTraders', BigInt.fromI32(0).toString());

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
    // This event should no increase anything, the trader have already traded to today
    const event4 = createPositionModifiedEvent(
      BigInt.fromI32(2),
      Address.fromString(trader1),
      toEth(7),
      toEth(3),
      toEth(3),
      toEth(1500),
      BigInt.fromI32(1),
      toGwei(1000000000),
      60 * 60 * 24 + 20, // 1 day later
      BigInt.fromI32(15),
      2
    );

    handlePositionModified(event1);
    handlePositionModified(event2);
    handlePositionModified(event3);
    handlePositionModified(event4);

    // Get the day string
    const idDay1 = 'DailyStat-1970-01-01';
    const idDay2 = 'DailyStat-1970-01-02';

    // Day1 Check if existingTraders is incremented correctly in DailyStat
    assert.fieldEquals('DailyStat', idDay1, 'cumulativeTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay1, 'newTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay1, 'existingTraders', BigInt.fromI32(0).toString());

    // Day2 Check if existingTraders is incremented correctly in DailyStat
    assert.fieldEquals('DailyStat', idDay2, 'cumulativeTraders', BigInt.fromI32(1).toString());
    assert.fieldEquals('DailyStat', idDay2, 'newTraders', BigInt.fromI32(0).toString());
    assert.fieldEquals('DailyStat', idDay2, 'existingTraders', BigInt.fromI32(1).toString());

    // Check if Trader entity is updated correctly
    const traderEntity = Trader.load(trader1);
    assert.assertNotNull(traderEntity);
  });

  test('make sure position modification with a trade size of 0 gets ignored', () => {
    // Create the event
    const event = createPositionModifiedEvent(
      BigInt.fromI32(1), // id
      Address.fromString(trader), // account
      toEth(5), // margin
      toEth(2), // size
      toEth(0), // trade size (set to 0)
      toEth(1000), // last price
      BigInt.fromI32(1), // funding index
      toGwei(1000000000), // fee
      10, // timestamp
      BigInt.fromI32(12), // skew
      1 // log index
    );

    // Process the event
    handlePositionModified(event);

    // Define the day and id
    const day = '1970-01-01';
    const dailyStatsId = 'DailyStat-'.concat(day);
    const dailyMarketStatsId = 'DailyMarketStat-'.concat(day);
    const cumulativeMarketStatsId = 'CumulativeMarketStat-'.concat(day);

    // Check that the entities have not been created
    assert.notInStore('DailyStat', dailyStatsId);
    assert.notInStore('DailyMarketStat', dailyMarketStatsId);
    assert.notInStore('CumulativeMarketStat', cumulativeMarketStatsId);
  });
  test('timestampToDate', () => {
    const timestamp = BigInt.fromI32(1682661853); //'2023-04-28T06:04:13.000Z'
    const result = timestampToDate(timestamp);
    assert.stringEquals(result, '2023-04-28');
  });
  test('dayToEpochTimestamp', () => {
    const result = dayToEpochTimestamp('2023-04-28');
    const expectedTimestamp = BigInt.fromI32(1682640000); //'2023-04-28T06:04:13.000Z'
    assert.stringEquals(result.toString(), expectedTimestamp.toString());
  });

  test('updateStateFee updates fees', () => {
    let feeAmount = BigInt.fromI32(100);
    let market = Address.fromString('0x1234567890123456789012345678901234567890');
    let timestamp = BigInt.fromI32(1630521600); // '2021-09-01T00:00:00.000Z'

    updateFeeStats(feeAmount, market, timestamp);

    let cumulativeMarketStatsId = 'CumulativeMarketStat-'.concat(market.toHexString());
    assert.fieldEquals(
      'CumulativeMarketStat',
      cumulativeMarketStatsId,
      'cumulativeFees',
      BigInt.fromI32(100).toString()
    );

    let dailyMarketStatsId = market.toHexString().concat('-2021-09-01');

    assert.fieldEquals(
      'DailyMarketStat',
      dailyMarketStatsId,
      'fees',
      BigInt.fromI32(100).toString()
    );

    assert.fieldEquals(
      'DailyMarketStat',
      dailyMarketStatsId,
      'cumulativeFees',
      BigInt.fromI32(100).toString()
    );

    let dailyStatsId = 'DailyStat-2021-09-01';
    assert.fieldEquals('DailyStat', dailyStatsId, 'cumulativeFees', BigInt.fromI32(100).toString());
    assert.fieldEquals('DailyStat', dailyStatsId, 'fees', BigInt.fromI32(100).toString());
  });
});
