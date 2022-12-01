import { wei } from '@synthetixio/wei';
import { calculateGlobalStakingApr } from './useGlobalStakingApr';

describe('calculateGlobalStakingApr', () => {
  test('returns undefined when missing data', () => {
    expect(calculateGlobalStakingApr(true, undefined)).toEqual(undefined);
  });
  test('calculates global staking apr optimism', () => {
    const isL2 = true;
    const SNXRate = wei(2);

    const previousWeekRewardsUsd = wei(280_000);
    const stakedSNXData = {
      systemStakingPercent: 0.72,
      timestamp: 1669838022,
      stakedSnx: {
        ethereum: 144_000_00,
        optimism: 80_000_000,
      },
    };

    expect(calculateGlobalStakingApr(isL2, SNXRate, previousWeekRewardsUsd, stakedSNXData)).toEqual(
      wei(0.091)
    );
  });
  test('calculates global staking apr mainnet', () => {
    const isL2 = false;
    const SNXRate = wei(2);
    const previousWeekRewardsUsd = wei(280_000);
    const stakedSNXData = {
      systemStakingPercent: 0.72,
      timestamp: 1669838022,
      stakedSnx: {
        ethereum: 144_000_00,
        optimism: 80_000_000,
      },
    };

    expect(calculateGlobalStakingApr(isL2, SNXRate, previousWeekRewardsUsd, stakedSNXData)).toEqual(
      wei('0.505555555555555555')
    );
  });
});
