import { parseFloatWithCommas } from './string';

describe('string formatters', () => {
  test('parseFloatWithCommas', () => {
    expect(parseFloatWithCommas('1000')).toBe(1000);
    expect(parseFloatWithCommas('10,000')).toBe(10000);
    expect(parseFloatWithCommas('1,000,000.50')).toBe(1000000.5);
  });
});
