import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export function calculateVolume(tradeSize: BigInt, lastPrice: BigInt): BigDecimal {
  return tradeSize.times(lastPrice).div(BigInt.fromI32(10).pow(18)).abs().toBigDecimal();
}

export function calculateLeverage(size: BigInt, lastPrice: BigInt, margin: BigInt): BigInt {
  return size.times(lastPrice).div(margin).abs();
}
