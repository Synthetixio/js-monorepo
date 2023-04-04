import { assert, describe, test } from 'matchstick-as';
import { calculateAccruedFunding, calculateLeverage } from '../src/calculations';
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
  describe('calculateLeverage', () => {
    test('should return 0 when size is 0', () => {
      const size = BigInt.fromI32(0);
      const lastPrice = BigInt.fromI32(100);
      const margin = BigInt.fromI32(10);

      const result = calculateLeverage(size, lastPrice, margin);
      assert.bigIntEquals(result, BigInt.fromI32(0));
    });

    test('should calculate leverage correctly for positive size', () => {
      const size = BigInt.fromI32(5);
      const lastPrice = BigInt.fromI32(200);
      const margin = BigInt.fromI32(10);

      const result = calculateLeverage(size, lastPrice, margin);
      assert.bigIntEquals(result, BigInt.fromI32(100));
    });

    test('should calculate leverage correctly for negative size', () => {
      const size = BigInt.fromI32(-5);
      const lastPrice = BigInt.fromI32(200);
      const margin = BigInt.fromI32(10);

      const result = calculateLeverage(size, lastPrice, margin);
      assert.bigIntEquals(result, BigInt.fromI32(100));
    });

    test('should handle large values correctly', () => {
      const size = BigInt.fromString('1000000000000000000');
      const lastPrice = BigInt.fromString('50000000000000000000');
      const margin = BigInt.fromString('10000000000000000000');

      const result = calculateLeverage(size, lastPrice, margin);
      assert.bigIntEquals(result, BigInt.fromString('5000000000000000000'));
    });
  });
});
