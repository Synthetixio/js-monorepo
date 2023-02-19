import { wei } from '@synthetixio/wei';
import { calculateStakingFeeApr, calculateStakingRewardsApr } from './useStakingApr';

describe('calculateStakingFeeApr', () => {
  test('calculates staking fee apr', () => {
    const SNXRate = wei(2);
    const stakedSnx = wei(400);
    const feesBurned = wei(2);
    /**
     * Calculation notes:
     * (feesBurned * 52) / stakedSnx * SNXRate
     * (2 * 52) / (400 * 2)
     * = 0.13
     */
    const feeApr = calculateStakingFeeApr({ SNXRate, stakedSnx, feesBurned });
    expect(feeApr).toEqual(wei(0.13));
  });
  test('calculates staking rewards apr', () => {
    const stakedSnx = wei(500);
    const distributedRewards = wei(1000);
    const userDebtSharePercentageCurrentNetwork = wei(0.001);
    /**
     * Calculation notes:
     * (distributedRewards * userDebtSharePercentageCurrentNetwork * 52) / stakedSnx
     * (1000 * 0.001 * 52) / 500
     * = 0.104
     */
    const feeApr = calculateStakingRewardsApr({
      stakedSnx,
      distributedRewards,
      userDebtSharePercentageCurrentNetwork,
    });
    expect(feeApr).toEqual(wei(0.104));
  });
});
