import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  CumulativeMarketStat,
  DailyMarketStat,
  DailyStat,
  Synthetix,
  Trader,
} from '../generated/schema';
import { calculateVolume } from './calculations';

export function timestampToDate(timestamp: BigInt): string {
  const seconds = timestamp.toI64();
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function dayToEpochTimestamp(dateString: string): BigInt {
  const date = Date.parse(dateString + 'T00:00:00.000Z');
  // eslint-disable-next-line no-undef
  return BigInt.fromU64(<u64>Math.floor(<f64>date.getTime() / 1000));
}

const getOrCreateDailyStat = (event: PositionModifiedNewEvent): DailyStat => {
  const day = timestampToDate(event.block.timestamp);
  const id = 'DailyStat-'.concat(day);
  let synthetix = Synthetix.load('synthetix');

  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.totalVolume = BigInt.fromI32(0);
    synthetix.feesByLiquidations = BigInt.fromI32(0);
    synthetix.feesByPositionModifications = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalTrades = BigInt.fromI32(0);
  }
  let dailyStat = DailyStat.load(id);
  if (dailyStat) return dailyStat;
  dailyStat = new DailyStat(id);

  dailyStat.timestamp = dayToEpochTimestamp(day);
  dailyStat.day = day;
  dailyStat.volume = BigInt.fromI32(0);
  dailyStat.fees = BigInt.fromI32(0);
  dailyStat.trades = BigInt.fromI32(0);
  dailyStat.cumulativeTraders = synthetix.totalTraders;
  dailyStat.newTraders = BigInt.fromI32(0);
  dailyStat.existingTraders = BigInt.fromI32(0);
  dailyStat.cumulativeVolume = synthetix.totalVolume;

  dailyStat.cumulativeFees = synthetix.feesByPositionModifications.plus(
    synthetix.feesByLiquidations
  );
  dailyStat.cumulativeTrades = synthetix.totalTrades;
  return dailyStat;
};
function updateDailyStats(event: PositionModifiedNewEvent): void {
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) return; // not a trade
  const dailyStat = getOrCreateDailyStat(event);
  const newVol = calculateVolume(event.params.tradeSize, event.params.lastPrice);
  const newFee = event.params.fee;
  const newTrades = BigInt.fromI32(1);
  dailyStat.volume = dailyStat.volume.plus(newVol);
  dailyStat.fees = dailyStat.fees.plus(newFee);
  dailyStat.trades = dailyStat.trades.plus(BigInt.fromI32(1));

  dailyStat.cumulativeVolume = dailyStat.cumulativeVolume.plus(newVol);
  dailyStat.cumulativeFees = dailyStat.cumulativeFees.plus(newFee);
  dailyStat.cumulativeTrades = dailyStat.cumulativeTrades.plus(newTrades);

  let trader = Trader.load(event.params.account.toHex());
  if (!trader) {
    dailyStat.cumulativeTraders = dailyStat.cumulativeTraders.plus(BigInt.fromI32(1));
    dailyStat.newTraders = dailyStat.newTraders.plus(BigInt.fromI32(1));
  } else {
    dailyStat.existingTraders = dailyStat.existingTraders.plus(BigInt.fromI32(1));
  }
  dailyStat.save();
}
const getOrCreateDailyMarketStat = (event: PositionModifiedNewEvent): DailyMarketStat => {
  const day = timestampToDate(event.block.timestamp);
  const id = event.address.toHex().toString().concat('-').concat(day);

  let dailyMarketStat = DailyMarketStat.load(id);
  if (dailyMarketStat) return dailyMarketStat;
  dailyMarketStat = new DailyMarketStat(id);
  dailyMarketStat.market = event.address.toHex();
  dailyMarketStat.timestamp = dayToEpochTimestamp(day);
  dailyMarketStat.day = day;
  dailyMarketStat.volume = BigInt.fromI32(0);
  dailyMarketStat.fees = BigInt.fromI32(0);
  dailyMarketStat.trades = BigInt.fromI32(0);

  return dailyMarketStat;
};
function updateDailyMarketStats(event: PositionModifiedNewEvent): void {
  const cumulativeMarketStats = CumulativeMarketStat.load(
    'CumulativeMarketStat-'.concat(event.address.toHex())
  );
  if (!cumulativeMarketStats) {
    throw new Error('Expect cumulativeMarketStats to exist');
  }
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) return; // not a trade
  const dailyMarketStat = getOrCreateDailyMarketStat(event);
  // We expect cumulativeMarketStats to already be updated.
  dailyMarketStat.cumulativeVolume = cumulativeMarketStats.cumulativeVolume;
  dailyMarketStat.cumulativeFees = cumulativeMarketStats.cumulativeFees;
  dailyMarketStat.cumulativeTrades = cumulativeMarketStats.cumulativeTrades;
  dailyMarketStat.volume = dailyMarketStat.volume.plus(
    calculateVolume(event.params.tradeSize, event.params.lastPrice)
  );
  dailyMarketStat.fees = dailyMarketStat.fees.plus(event.params.fee);
  dailyMarketStat.trades = dailyMarketStat.trades.plus(BigInt.fromI32(1));

  dailyMarketStat.save();
}

const getOrCreateCumulativeMarketStats = (marketAddress: string): CumulativeMarketStat => {
  const id = 'CumulativeMarketStat-'.concat(marketAddress);

  let cumulativeMarketStats = CumulativeMarketStat.load(id);
  if (cumulativeMarketStats) return cumulativeMarketStats;
  cumulativeMarketStats = new CumulativeMarketStat(id);
  cumulativeMarketStats.market = marketAddress;
  cumulativeMarketStats.cumulativeFees = BigInt.fromI32(0);
  cumulativeMarketStats.cumulativeVolume = BigInt.fromI32(0);
  cumulativeMarketStats.cumulativeTrades = BigInt.fromI32(0);
  return cumulativeMarketStats;
};

function updateCumulativeMarketStats(event: PositionModifiedNewEvent): void {
  const cumulativeMarketStats = getOrCreateCumulativeMarketStats(event.address.toHex());
  cumulativeMarketStats.cumulativeFees = cumulativeMarketStats.cumulativeFees.plus(
    event.params.fee
  );
  cumulativeMarketStats.cumulativeVolume = cumulativeMarketStats.cumulativeVolume.plus(
    calculateVolume(event.params.tradeSize, event.params.lastPrice)
  );

  cumulativeMarketStats.cumulativeTrades = cumulativeMarketStats.cumulativeTrades.plus(
    BigInt.fromI32(1)
  );
  cumulativeMarketStats.save();
}

export function updateHistoricalTradeStats(event: PositionModifiedNewEvent): void {
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) return; // not a trade
  updateCumulativeMarketStats(event);
  updateDailyStats(event);
  updateDailyMarketStats(event);
}
