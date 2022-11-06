import { getHealthVariant } from './getHealthVariant';

describe('getVariant', () => {
  test('not staking', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 0,
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('success');
  });
  test('success', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 405,
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('success');
  });
  test('success with threshold', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 397, // below target but within the threshold
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('success');
  });
  test('warning', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 395,
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('warning');
  });
  test('threshold doesnt apply to liquidationRatio', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 129, // would be ok if threshold was applied between warning and error
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('error');
  });

  test('error', () => {
    const arg = {
      liquidationCratioPercentage: 130,
      targetCratioPercentage: 400,
      currentCRatioPercentage: 125,
      targetThreshold: 0.01,
    };
    const result = getHealthVariant(arg);
    expect(result).toBe('error');
  });
});
