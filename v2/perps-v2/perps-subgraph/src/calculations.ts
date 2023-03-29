import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { FundingRateUpdate } from '../generated/schema';

export function calculateVolume(tradeSize: BigInt, lastPrice: BigInt): BigDecimal {
  return tradeSize.times(lastPrice).div(BigInt.fromI32(10).pow(18)).abs().toBigDecimal();
}

export function calculateLeverage(size: BigInt, lastPrice: BigInt, margin: BigInt): BigInt {
  return size.times(lastPrice).div(margin).abs();
}

export function calculatePnl(lastPrice: BigInt, avgEntryPrice: BigInt, size: BigInt): BigInt {
  return lastPrice.minus(avgEntryPrice).times(size).div(BigInt.fromI32(10).pow(18));
}
export function calculateAccruedFunding(
  pastFunding: BigInt,
  currentFunding: BigInt,
  size: BigInt
): BigInt {
  return currentFunding.minus(pastFunding).times(size).div(BigInt.fromI32(10).pow(18));
}
