import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import { BigInt } from '@graphprotocol/graph-ts';
import {
  CumulativeMarketStats,
  DailyMarketStats,
  DailyStats,
  Synthetix,
  Trader,
} from '../generated/schema';
import { calculateVolume } from './calculations';

function timestampToDate(timestamp: BigInt): string {
  const seconds = timestamp.toI32();
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const getOrCreateDailyStat = (event: PositionModifiedNewEvent): DailyStats => {
  const day = timestampToDate(event.block.timestamp);
  const id = 'DailyStats-'.concat(day);
  let synthetix = Synthetix.load('synthetix');

  if (!synthetix) {
    synthetix = new Synthetix('synthetix');
    synthetix.totalVolume = BigInt.fromI32(0);
    synthetix.feesByLiquidations = BigInt.fromI32(0);
    synthetix.feesByPositionModifications = BigInt.fromI32(0);
    synthetix.totalTraders = BigInt.fromI32(0);
    synthetix.totalTrades = BigInt.fromI32(0);
  }
  let dailyStat = DailyStats.load(id);
  if (dailyStat) return dailyStat;
  dailyStat = new DailyStats(id);

  dailyStat.timestamp = BigInt.fromI32(<i32>Math.floor(<i32>(Date.parse(day).getTime() / 1000)));
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
const getOrCreateDailyMarketStat = (event: PositionModifiedNewEvent): DailyMarketStats => {
  const day = timestampToDate(event.block.timestamp);
  const id = event.address.toHex().toString().concat('-').concat(day);

  let dailyMarketStat = DailyMarketStats.load(id);
  if (dailyMarketStat) return dailyMarketStat;
  dailyMarketStat = new DailyMarketStats(id);
  dailyMarketStat.market = event.address.toHex();
  dailyMarketStat.timestamp = BigInt.fromI32(
    <i32>Math.floor(<i32>(Date.parse(day).getTime() / 1000))
  );
  dailyMarketStat.day = day;
  dailyMarketStat.volume = BigInt.fromI32(0);
  dailyMarketStat.fees = BigInt.fromI32(0);
  dailyMarketStat.trades = BigInt.fromI32(0);

  return dailyMarketStat;
};
function updateDailyMarketStats(event: PositionModifiedNewEvent): void {
  const cumulativeMarketStats = CumulativeMarketStats.load(
    'CumulativeMarketStats-'.concat(event.address.toHex())
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

const getOrCreateCumulativeMarketStats = (marketAddress: string): CumulativeMarketStats => {
  const id = 'CumulativeMarketStats-'.concat(marketAddress);

  let cumulativeMarketStats = CumulativeMarketStats.load(id);
  if (cumulativeMarketStats) return cumulativeMarketStats;
  cumulativeMarketStats = new CumulativeMarketStats(id);
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
