import { PositionModified1 as PositionModifiedNewEvent } from '../generated/FuturesMarketManagerNew/PerpsV2Proxy';
import { Address, BigInt } from '@graphprotocol/graph-ts';
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

const getOrCreateDailyStat = (timestamp: BigInt): DailyStat => {
  const day = timestampToDate(timestamp);
  const id = 'DailyStat-'.concat(day);
  let dailyStat = DailyStat.load(id);
  if (dailyStat) return dailyStat;
  dailyStat = new DailyStat(id);

  let synthetix = Synthetix.load('synthetix');
  dailyStat.timestamp = dayToEpochTimestamp(day);
  dailyStat.day = day;
  dailyStat.volume = BigInt.fromI32(0);
  dailyStat.fees = BigInt.fromI32(0);
  dailyStat.trades = BigInt.fromI32(0);
  dailyStat.cumulativeTraders = synthetix === null ? BigInt.fromI32(0) : synthetix.totalTraders;
  dailyStat.newTraders = BigInt.fromI32(0);
  dailyStat.existingTraders = BigInt.fromI32(0);
  dailyStat.cumulativeVolume = synthetix === null ? BigInt.fromI32(0) : synthetix.totalVolume;
  dailyStat.cumulativeTrades = synthetix === null ? BigInt.fromI32(0) : synthetix.totalTrades;

  dailyStat.cumulativeFees =
    synthetix === null
      ? BigInt.fromI32(0)
      : synthetix.feesByPositionModifications.plus(synthetix.feesByLiquidations);
  return dailyStat;
};
function updateDailyStats(event: PositionModifiedNewEvent): void {
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) return; // not a trade
  const dailyStat = getOrCreateDailyStat(event.block.timestamp);
  const newVol = calculateVolume(event.params.tradeSize, event.params.lastPrice);
  const newFee = event.params.fee;
  const newTrades = BigInt.fromI32(1);
  dailyStat.volume = dailyStat.volume.plus(newVol);
  dailyStat.fees = dailyStat.fees.plus(newFee);
  dailyStat.trades = dailyStat.trades.plus(BigInt.fromI32(1));

  dailyStat.cumulativeVolume = dailyStat.cumulativeVolume.plus(newVol);
  dailyStat.cumulativeFees = dailyStat.cumulativeFees.plus(newFee);
  dailyStat.cumulativeTrades = dailyStat.cumulativeTrades.plus(newTrades);

  const trader = Trader.load(event.params.account.toHex());
  if (trader && trader.trades.length > 0 && trader.lastTradeTimestamp) {
    const lastTradedDay = timestampToDate(trader.lastTradeTimestamp as BigInt);

    if (lastTradedDay != dailyStat.day) {
      // Only update existing traders if the trader haven't traded today
      dailyStat.existingTraders = dailyStat.existingTraders.plus(BigInt.fromI32(1));
    }
  } else {
    dailyStat.cumulativeTraders = dailyStat.cumulativeTraders.plus(BigInt.fromI32(1));
    dailyStat.newTraders = dailyStat.newTraders.plus(BigInt.fromI32(1));
  }
  dailyStat.save();
}
const getOrCreateDailyMarketStat = (address: Address, timestamp: BigInt): DailyMarketStat => {
  const day = timestampToDate(timestamp);
  const id = address.toHex().toString().concat('-').concat(day);

  let dailyMarketStat = DailyMarketStat.load(id);
  if (dailyMarketStat) return dailyMarketStat;
  dailyMarketStat = new DailyMarketStat(id);
  dailyMarketStat.market = address.toHex();
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
  const dailyMarketStat = getOrCreateDailyMarketStat(event.address, event.block.timestamp);
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

export function updateFeeStats(feeAmount: BigInt, market: Address, timestamp: BigInt): void {
  // Update fee for cumulative market stats
  const cumulativeMarketStats = getOrCreateCumulativeMarketStats(market.toHexString());
  cumulativeMarketStats.cumulativeFees = cumulativeMarketStats.cumulativeFees.plus(feeAmount);
  cumulativeMarketStats.save();

  // Update fee for daily market stats
  const dailyMarketStats = getOrCreateDailyMarketStat(market, timestamp);
  dailyMarketStats.fees = dailyMarketStats.fees.plus(feeAmount);
  // cumulativeMarketStats, got updated and saved just above
  dailyMarketStats.cumulativeFees = cumulativeMarketStats.cumulativeFees;
  // We don't expect any changes here, but we need to set these in case it's the first time cumulativeMarketStats gets updated for a certain market
  dailyMarketStats.cumulativeVolume = cumulativeMarketStats.cumulativeVolume;
  dailyMarketStats.cumulativeTrades = cumulativeMarketStats.cumulativeTrades;
  dailyMarketStats.save();

  // Update fee for daily stats
  const dailyStats = getOrCreateDailyStat(timestamp);
  dailyStats.cumulativeFees = dailyStats.cumulativeFees.plus(feeAmount);
  dailyStats.fees = dailyStats.fees.plus(feeAmount);
  dailyStats.save();
}

export function updateHistoricalTradeStats(event: PositionModifiedNewEvent): void {
  if (event.params.tradeSize.equals(BigInt.fromI32(0))) return; // not a trade
  updateCumulativeMarketStats(event);
  updateDailyStats(event);
  updateDailyMarketStats(event);
}
