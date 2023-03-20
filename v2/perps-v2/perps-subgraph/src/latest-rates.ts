import { LatestRate, RateUpdate, Candle } from '../generated/schema';
import { AnswerUpdated as AnswerUpdatedEvent } from '../generated/AAVEAggregator/Aggregator';
import { BigDecimal, BigInt, Address, ethereum, Bytes } from '@graphprotocol/graph-ts';

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

export function handleAggregatorAnswerUpdated(event: AnswerUpdatedEvent): void {
  let rate = event.params.current.times(BigInt.fromI32(10).pow(10));

  addDollar('sUSD');
  if (
    event.address.toHex() === '0x13e3Ee699D1909E989722E753853AE30b17e08c5'.toLowerCase() ||
    event.address.toHex() === '0x57241A37733983F97C4Ab06448F244A1E0Ca0ba8'.toLowerCase()
  ) {
    addLatestRate('ETH', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xD702DD976Fb76Fffc2D3963D037dfDae5b04E593'.toLowerCase() ||
    event.address.toHex() === '0xC16679B963CeB52089aD2d95312A5b85E318e9d2'.toLowerCase()
  ) {
    addLatestRate('BTC', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xCc232dcFAAE6354cE191Bd574108c1aD03f86450'.toLowerCase() ||
    event.address.toHex() === '0x69C5297001f38cCBE30a81359da06E5256bd28B9'.toLowerCase()
  ) {
    addLatestRate('LINK', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xC663315f7aF904fbbB0F785c32046dFA03e85270'.toLowerCase() ||
    event.address.toHex() === '0x5756666B2991F7C9c05Fbb71daC703Cf58F293BF'.toLowerCase()
  ) {
    addLatestRate('SOL', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x5087Dc69Fd3907a016BD42B38022F7f024140727'.toLowerCase() ||
    event.address.toHex() === '0xE9512B064104593083e39630a8f874cfa6B1C0A5'.toLowerCase()
  ) {
    addLatestRate('AVAX', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x0ded608AFc23724f614B76955bbd9dFe7dDdc828'.toLowerCase() ||
    event.address.toHex() === '0x11C944427B9ebeb1417Dd44645Ad04edBF33b95e'.toLowerCase()
  ) {
    addLatestRate('MATIC', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x3626369857A10CcC6cc3A6e4f5C2f5984a519F20'.toLowerCase() ||
    event.address.toHex() === '0x619AeaaF08dF3645e138C611bddCaE465312Ef6B'.toLowerCase()
  ) {
    addLatestRate('EUR', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x338ed6787f463394D24813b297401B9F05a8C9d1'.toLowerCase() ||
    event.address.toHex() === '0xe634FfeDcA25B6D5D4610D2025C4894cCd5a5587'.toLowerCase()
  ) {
    addLatestRate('AAVE', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x13e3Ee699D1909E989722E753853AE30b17e08c5'.toLowerCase() ||
    event.address.toHex() === '0x57241A37733983F97C4Ab06448F244A1E0Ca0ba8'.toLowerCase()
  ) {
    addLatestRate('AAVE', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x11429eE838cC01071402f21C219870cbAc0a59A0'.toLowerCase() ||
    event.address.toHex() === '0x0A024aa48E09e151090637d2b68162b1Caf7BdbA'.toLowerCase()
  ) {
    addLatestRate('UNI', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x8F7bFb42Bf7421c2b34AAD619be4654bFa7B3B8B'.toLowerCase() ||
    event.address.toHex() === '0xA8828D339CEFEBf99934e5fdd938d1B4B9730bc3'.toLowerCase()
  ) {
    addLatestRate('XAU', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x290dd71254874f0d4356443607cb8234958DEe49'.toLowerCase() ||
    event.address.toHex() === '0xE68AF7b40A0Cc9C5E9E2B2a36b85442Ab9C3E4Cd'.toLowerCase()
  ) {
    addLatestRate('XAG', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x89178957E9bD07934d7792fFc0CF39f11c8C2B1F'.toLowerCase() ||
    event.address.toHex() === '0xE882831E58eec48B7f304482771F67e6b846733D'.toLowerCase()
  ) {
    addLatestRate('APE', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xee35A95c9a064491531493D8b380bC40A4CCd0Da'.toLowerCase() ||
    event.address.toHex() === '0x6CcbE5aDBf519C2C916ADB4390A3dbD72fFcA7F2'.toLowerCase()
  ) {
    addLatestRate('DYDX', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xD38579f7cBD14c22cF1997575eA8eF7bfe62ca2c'.toLowerCase() ||
    event.address.toHex() === '0x99fc60321a196794725E6D0c572143eb2F881edB'.toLowerCase()
  ) {
    addLatestRate('BNB', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x0D276FC14719f9292D5C1eA2198673d1f4269246'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('OP', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xC6066533917f034Cf610c08e1fe5e9c7eADe0f54'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('DOGE', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xEF89db2eA46B4aD4E333466B6A486b809e613F39'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('ATOM', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x805a61D54bb686e57F02D1EC96A1491C7aF40893'.toLowerCase() ||
    event.address.toHex() === '0x881B413aAf96FEAbb4C92b0C639aa5a7eD746AC8'.toLowerCase()
  ) {
    addLatestRate('AXS', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x2fF1EB7D0ceC35959F0248E9354c3248c6683D9b'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('FLOW', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xc19d58652d6BfC6Db6FB3691eDA6Aa7f3379E4E9'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('FTM', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x39be70E93D2D285C9E71be7f70FC5a45A7777B14'.toLowerCase() ||
    event.address.toHex() === '0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F'.toLowerCase()
  ) {
    addLatestRate('NEAR', rate, event.address, event);
  } else if (
    event.address.toHex() === '0xca6fa4b8CB365C02cd3Ba70544EFffe78f63ac82'.toLowerCase() ||
    event.address.toHex() === '0x619AeaaF08dF3645e138C611bddCaE465312Ef6B'.toLowerCase()
  ) {
    addLatestRate('AUD', rate, event.address, event);
  } else if (
    event.address.toHex() === '0x540D48C01F946e729174517E013Ad0bdaE5F08C0'.toLowerCase() ||
    event.address.toHex() === '0x619AeaaF08dF3645e138C611bddCaE465312Ef6B'.toLowerCase()
  ) {
    addLatestRate('GBP', rate, event.address, event);
  }
}
