import { formatNumber, formatNumberToUsd, formatPercent, numberWithCommas } from './number';

describe('number', () => {
  test('numbersWithCommas', () => {
    expect(numberWithCommas('1')).toBe('1');
    expect(numberWithCommas('10')).toBe('10');
    expect(numberWithCommas('100')).toBe('100');
    expect(numberWithCommas('1000')).toBe('1,000');
    expect(numberWithCommas('10000')).toBe('10,000');
    expect(numberWithCommas('100000')).toBe('100,000');
    expect(numberWithCommas('1000000')).toBe('1,000,000');
    expect(numberWithCommas('10000000')).toBe('10,000,000');
    expect(numberWithCommas('100000000')).toBe('100,000,000');
    expect(numberWithCommas('Not a number')).toBe('Not a number');
  });
  test('formatNumber', () => {
    expect(formatNumber(1)).toBe('1.00');
    expect(formatNumber(10)).toBe('10.00');
    expect(formatNumber(100)).toBe('100.00');
    expect(formatNumber(1000)).toBe('1,000.00');
    expect(formatNumber(10000)).toBe('10,000.00');
    expect(formatNumber(100000)).toBe('100,000.00');
    expect(formatNumber(1000000)).toBe('1,000,000.00');
    expect(formatNumber(10000000)).toBe('10,000,000.00');
    expect(formatNumber(100000000)).toBe('100,000,000.00');
    expect(formatNumberToUsd(100000000.123456)).toBe('$100,000,000.12');
    expect(
      formatNumberToUsd(100000000.123456, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    ).toBe('$100,000,000.1235');
  });
  test('formatNumberToUsd', () => {
    expect(formatNumberToUsd(1)).toBe('$1.00');
    expect(formatNumberToUsd(10)).toBe('$10.00');
    expect(formatNumberToUsd(100)).toBe('$100.00');
    expect(formatNumberToUsd(1000)).toBe('$1,000.00');
    expect(formatNumberToUsd(10000)).toBe('$10,000.00');
    expect(formatNumberToUsd(100000)).toBe('$100,000.00');
    expect(formatNumberToUsd(1000000)).toBe('$1,000,000.00');
    expect(formatNumberToUsd(10000000)).toBe('$10,000,000.00');
    expect(formatNumberToUsd(100000000)).toBe('$100,000,000.00');
    expect(formatNumberToUsd(100000000.123456)).toBe('$100,000,000.12');
    expect(
      formatNumberToUsd(100000000.123456, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    ).toBe('$100,000,000.1235');
  });
  test('formatPercent', () => {
    expect(formatPercent(0.01)).toBe('1%');
    expect(formatPercent(0.1)).toBe('10%');
    expect(formatPercent(1)).toBe('100%');
    expect(formatPercent(2)).toBe('200%');
    expect(formatPercent(2.2341)).toBe('223.41%');
  });
});
