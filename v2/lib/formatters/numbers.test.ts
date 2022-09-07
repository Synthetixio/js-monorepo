import { numberWithCommas } from './number';

describe('number', () => {
  test('numberWithCommas', () => {
    const result = numberWithCommas('123123');
    expect(result).toBe('123,123');
  });
});
