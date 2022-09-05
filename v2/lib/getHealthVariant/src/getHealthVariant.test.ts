import { getHealthVariant } from './getHealthVariant';

describe('getVariant', () => {
  test('success', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 401,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('success');
  });
  test('warning', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 399,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('warning');
  });
  test('error', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 129,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('error');
  });
});
