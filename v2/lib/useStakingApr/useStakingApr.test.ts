import { wei } from '@synthetixio/wei';
import { calculateStakingApr, calculateWeeklyRewardsInUsd } from './useStakingApr';

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
describe('calculateStakingApr', () => {
  test('returns undefined when missing data', () => {
    expect(calculateStakingApr({})).toBe(undefined);
  });
  test('calculates staking apr', () => {
    const stakedValue = wei(400);
    const debtBalance = wei(100);
    const totalsUSDDebt = wei(50_000_000);
    const previousWeekRewardsUsd = wei(2_000_000);
    expect(
      calculateStakingApr({ stakedValue, debtBalance, totalsUSDDebt, previousWeekRewardsUsd })
    ).toEqual(wei(0.52));
  });
});
