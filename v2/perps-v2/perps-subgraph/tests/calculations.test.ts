import { assert, describe, test } from 'matchstick-as';
import { calculateAccruedFunding } from '../src/calculations';
import { BigInt } from '@graphprotocol/graph-ts';

describe('calculations', () => {
  describe('calculateAccruedFunding', () => {
    test('3x short, funding decreased ', () => {
      const pastFunding = BigInt.fromI32(100);
      const currentFunding = BigInt.fromI32(90);
      const size = BigInt.fromI32(-3).times(BigInt.fromI32(10).pow(18));
      const result = calculateAccruedFunding(pastFunding, currentFunding, size);
      assert.bigIntEquals(result, BigInt.fromI32(30));
    });
    test('3x short, funding increase', () => {
      const pastFunding = BigInt.fromI32(100);
      const currentFunding = BigInt.fromI32(110);
      const size = BigInt.fromI32(-3).times(BigInt.fromI32(10).pow(18));
      const result = calculateAccruedFunding(pastFunding, currentFunding, size);
      assert.bigIntEquals(result, BigInt.fromI32(-30));
    });
    test('3x long, funding decrease', () => {
      const pastFunding = BigInt.fromI32(100);
      const currentFunding = BigInt.fromI32(90);
      const size = BigInt.fromI32(3).times(BigInt.fromI32(10).pow(18));
      const result = calculateAccruedFunding(pastFunding, currentFunding, size);
      assert.bigIntEquals(result, BigInt.fromI32(-30));
    });
    test('3x long, funding increase', () => {
      const pastFunding = BigInt.fromI32(100);
      const currentFunding = BigInt.fromI32(110);
      const size = BigInt.fromI32(3).times(BigInt.fromI32(10).pow(18));
      const result = calculateAccruedFunding(pastFunding, currentFunding, size);
      assert.bigIntEquals(result, BigInt.fromI32(30));
    });
  });
});
