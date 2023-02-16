import { wei } from '@synthetixio/wei';
import {
  calculateGlobalStakingFeeApr,
  calculateGlobalStakingRewardsApr,
} from './useGlobalStakingApr';

describe('calculateGlobalStakingFeeApr', () => {
  test('calculates APR', () => {
    const SNXRate = wei(2);
    const totalStakedData = {
      systemStakingPercent: 0.7,
      timestamp: 1669838022,
      stakedSnx: {
        ethereum: 1_000_000,
        optimism: 500_000,
      },
    };
    const feePeriodData = {
      mainnetDistributedFees: wei(2000),
      optimismDistributedFees: wei(1000),
    };
    const feeApr = calculateGlobalStakingFeeApr({ totalStakedData, SNXRate, feePeriodData });
    /**
     * Calculation notes:
     * (totalDistributedFees * 52) / ("total staked value" * SNXRate)
     * ((2000 + 1000) * 52) / ((500000 + 1000000) * 2)
     * 0.0052
     */
    expect(feeApr).toEqual(wei(0.052));
  });
});

describe('calculateGlobalStakingRewardsApr', () => {
  test('calculates APR for mainnet', () => {
    const isL2 = false;
    const totalStakedData = {
      systemStakingPercent: 0.7,
      timestamp: 1669838022,
      stakedSnx: {
        ethereum: 1_000_000,
        optimism: 500_000,
      },
    };
    const feePeriodData = {
      mainnetDistributedRewards: wei(1000),
      optimismDistributedRewards: wei(500),
    };
    const rewardsApr = calculateGlobalStakingRewardsApr({ totalStakedData, isL2, feePeriodData });
    /**
     * Calculation notes:
     * (mainnetDistributedRewards * 52) / stakedSnxEthereum
     * (1000 * 52) / 1000000
     */
    expect(rewardsApr).toEqual(wei(0.052));
  });
  test('calculates APR for optimism', () => {
    const isL2 = true;
    const totalStakedData = {
      systemStakingPercent: 0.7,
      timestamp: 1669838022,
      stakedSnx: {
        ethereum: 1_000_000,
        optimism: 500_000,
      },
    };
    const feePeriodData = {
      mainnetDistributedRewards: wei(1000),
      optimismDistributedRewards: wei(1000),
    };
    const rewardsApr = calculateGlobalStakingRewardsApr({ totalStakedData, isL2, feePeriodData });
    /**
     * Calculation notes:
     * (optimismDistributedRewards * 52) / stakedSnxOptimism
     * (1000 * 52) / 500000
     */
    expect(rewardsApr).toEqual(wei(0.104));
  });
});
