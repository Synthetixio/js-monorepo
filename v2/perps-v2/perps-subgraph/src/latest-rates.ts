import { LatestRate, RateUpdate, Candle } from '../generated/schema';
import { AnswerUpdated as AnswerUpdatedEvent } from '../generated/templates/Aggregator/Aggregator';
import { AggregatorAdded as AggregatorAddedEvent } from '../generated/ExchangeRates/ExchangeRates';
import {
  AggregatorProxy as AggregatorProxyContract,
  AggregatorConfirmed as AggregatorConfirmedEvent,
} from '../generated/templates/AggregatorProxy/AggregatorProxy';
import { AggregatorProxy, Aggregator } from '../generated/templates';
import {
  BigDecimal,
  BigInt,
  Address,
  ethereum,
  Bytes,
  DataSourceContext,
  dataSource,
} from '@graphprotocol/graph-ts';

const ONE_MINUTE_SECONDS = BigInt.fromI32(60);
const DAY_SECONDS = BigInt.fromI32(86400);

let CANDLE_PERIODS: BigInt[] = [
  DAY_SECONDS.times(BigInt.fromI32(30)),
  DAY_SECONDS.times(BigInt.fromI32(7)),
  DAY_SECONDS.times(BigInt.fromI32(3)),
  DAY_SECONDS,
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(720)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(480)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(240)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(120)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(60)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(30)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(15)),
  ONE_MINUTE_SECONDS.times(BigInt.fromI32(5)),
  ONE_MINUTE_SECONDS,
];

function strToBytes(str: string = 32): Bytes {
  return Bytes.fromByteArray(Bytes.fromUTF8(str));
}

function toDecimal(value: BigInt, decimals: u32 = 18): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal();

  return value.divDecimal(precision);
}

export function addLatestRate(
  synth: string,
  rate: BigInt,
  aggregator: Address,
  event: ethereum.Event
): void {
  let decimalRate = toDecimal(rate);
  addLatestRateFromDecimal(synth, decimalRate, aggregator, event);
}

export function addLatestRateFromDecimal(
  synth: string,
  rate: BigDecimal,
  aggregator: Address,
  event: ethereum.Event
): void {
  let prevLatestRate = LatestRate.load(synth);
  if (prevLatestRate != null && aggregator.notEqual(prevLatestRate.aggregator)) return;

  if (prevLatestRate == null) {
    prevLatestRate = new LatestRate(synth);
    prevLatestRate.aggregator = aggregator;
    prevLatestRate.timestamp = event.block.timestamp;
  }

  // create the rate update entity
  let rateUpdate = new RateUpdate(event.transaction.hash.toHex() + '-' + synth);
  rateUpdate.currencyKey = strToBytes(synth);
  rateUpdate.synth = synth;
  rateUpdate.rate = rate;
  rateUpdate.block = event.block.number;
  rateUpdate.timestamp = event.block.timestamp;
  rateUpdate.save();

  // update the candle entities
  updateCandle(event.block.timestamp, prevLatestRate.timestamp, synth, rate);

  // finally update the latest rate entity
  prevLatestRate.rate = rate;
  prevLatestRate.timestamp = event.block.timestamp;
  prevLatestRate.save();
}

function updateCandle(
  timestamp: BigInt,
  lastUpdateTimestamp: BigInt,
  synth: string,
  rate: BigDecimal
): void {
  for (let p = 0; p < CANDLE_PERIODS.length; p++) {
    let period = CANDLE_PERIODS[p];
    let periodId = timestamp.div(period);

    let id = synth + '-' + period.toString() + '-' + periodId.toString();

    let lastPeriodId = periodId.minus(BigInt.fromI32(1));
    let lastId = synth + '-' + period.toString() + '-' + lastPeriodId.toString();

    let candle = Candle.load(id);
    let lastCandle = Candle.load(lastId);

    if (lastCandle == null && lastUpdateTimestamp !== null && lastUpdateTimestamp !== timestamp) {
      // get the candle from the last rate update
      let prevPeriodId = lastUpdateTimestamp.div(period);
      let prevId = synth + '-' + period.toString() + '-' + prevPeriodId.toString();
      let prevCandle = Candle.load(prevId);

      // make new candles between that update and now
      for (
        let newPeriodId = prevPeriodId.plus(BigInt.fromI32(1));
        newPeriodId.le(lastPeriodId);
        newPeriodId = newPeriodId.plus(BigInt.fromI32(1))
      ) {
        // create the new candle
        if (prevCandle) {
          let newId = synth + '-' + period.toString() + '-' + newPeriodId.toString();
          let newCandle = new Candle(newId);
          newCandle.synth = synth;
          newCandle.high = prevCandle.close;
          newCandle.low = prevCandle.close;
          newCandle.close = prevCandle.close;
          newCandle.average = prevCandle.close;
          newCandle.period = period;
          newCandle.timestamp = newPeriodId.times(period); // store the beginning of this period, rather than the timestamp of the first rate update.
          newCandle.aggregatedPrices = BigInt.fromI32(0);

          newCandle.open = prevCandle.close;
          newCandle.save();

          // set previous candle to this one
          prevCandle = newCandle;
        }
      }

      // now reset the last candle
      lastCandle = Candle.load(lastId);
    }

    if (candle == null) {
      candle = new Candle(id);
      candle.synth = synth;
      candle.high = rate;
      candle.low = rate;
      candle.close = rate;
      candle.average = rate;
      candle.period = period;
      candle.timestamp = timestamp.minus(timestamp.mod(period)); // store the beginning of this period, rather than the timestamp of the first rate update.
      candle.aggregatedPrices = BigInt.fromI32(1);

      if (lastCandle !== null) {
        candle.open = lastCandle.close;
        if (lastCandle.close < candle.low) {
          candle.low = lastCandle.close;
        }
        if (lastCandle.close > candle.high) {
          candle.high = lastCandle.close;
        }
      } else {
        candle.open = rate;
      }

      candle.save();
    }

    if (candle.low > rate) {
      candle.low = rate;
    }
    if (candle.high < rate) {
      candle.high = rate;
    }
    candle.close = rate;
    candle.average = calculateAveragePrice(candle.average, rate, candle.aggregatedPrices);
    candle.aggregatedPrices = candle.aggregatedPrices.plus(BigInt.fromI32(1));

    candle.save();
  }
}

function calculateAveragePrice(
  oldAveragePrice: BigDecimal,
  newRate: BigDecimal,
  oldAggregatedPrices: BigInt
): BigDecimal {
  return oldAveragePrice
    .times(oldAggregatedPrices.toBigDecimal())
    .plus(newRate)
    .div(oldAggregatedPrices.plus(BigInt.fromI32(1)).toBigDecimal());
}

export function addDollar(dollarID: string): void {
  let dollarRate = new LatestRate(dollarID);
  dollarRate.rate = new BigDecimal(BigInt.fromI32(1));
  dollarRate.aggregator = Address.fromHexString('0x0000000000000000000000000000000000000000');
  dollarRate.timestamp = BigInt.fromI32(0);
  dollarRate.save();
}

export function addProxyAggregator(currencyKey: string, aggregatorProxyAddress: Address): void {
  let proxy = AggregatorProxyContract.bind(aggregatorProxyAddress);
  let underlyingAggregator = proxy.try_aggregator();

  if (!underlyingAggregator.reverted) {
    let context = new DataSourceContext();
    context.setString('currencyKey', currencyKey);

    AggregatorProxy.createWithContext(aggregatorProxyAddress, context);

    addAggregator(currencyKey, underlyingAggregator.value);
  } else {
    addAggregator(currencyKey, aggregatorProxyAddress);
  }
}

export function addAggregator(currencyKey: string, aggregatorAddress: Address): void {
  // check current aggregator address, and don't add again if its same
  let latestRate = LatestRate.load(currencyKey);

  if (latestRate != null) {
    if (aggregatorAddress.equals(latestRate.aggregator)) {
      return;
    }

    latestRate.aggregator = aggregatorAddress;
    latestRate.save();
  }

  let context = new DataSourceContext();
  context.setString('currencyKey', currencyKey);

  Aggregator.createWithContext(aggregatorAddress, context);
}

export function handleAggregatorAdded(event: AggregatorAddedEvent): void {
  addProxyAggregator(event.params.currencyKey.toString(), event.params.aggregator);
}

export function handleAggregatorProxyAddressUpdated(event: AggregatorConfirmedEvent): void {
  let context = dataSource.context();
  addAggregator(context.getString('currencyKey'), event.params.latest);
}

export function handleAggregatorAnswerUpdated(event: AnswerUpdatedEvent): void {
  let context = dataSource.context();
  let rate = event.params.current.times(BigInt.fromI32(10).pow(10));

  addDollar('sUSD');
  addLatestRate(context.getString('currencyKey'), rate, event.address, event);
}
