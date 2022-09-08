import { numberWithCommas } from './number';

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
});
