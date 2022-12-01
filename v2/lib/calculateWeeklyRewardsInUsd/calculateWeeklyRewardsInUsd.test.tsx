import { wei } from '@synthetixio/wei';
import { calculateWeeklyRewardsInUsd } from './calculateWeeklyRewardsInUsd';

describe('calculateWeeklyRewardsInUsd', () => {
  test('returns undefined when missing data', () => {
    expect(calculateWeeklyRewardsInUsd()).toBe(undefined);
  });
  test('calculates weekly rewards', () => {
    const SNXRate = wei(2);
    const feesToDistribute = wei(100);
    const rewardsToDistribute = wei(50);
    expect(calculateWeeklyRewardsInUsd(SNXRate, feesToDistribute, rewardsToDistribute)).toEqual(
      wei(200)
    );
  });
});
