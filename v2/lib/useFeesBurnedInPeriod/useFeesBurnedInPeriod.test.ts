import { wei } from '@synthetixio/wei';
import { calculateFeesBurned } from './useFeesBurnedInPeriod';
describe('calculateFeesBurned', () => {
  test('handles user not staking', () => {
    const burnedDebt = calculateFeesBurned({
      mainnetDistributedFees: wei(100),
      optimismDistributedFees: wei(100),
      userDebtSharePercentage: wei(0),
    });
    expect(burnedDebt).toEqual(wei(0));
  });
  test('calculates burned debt correctly', () => {
    const burnedDebt = calculateFeesBurned({
      mainnetDistributedFees: wei(100),
      optimismDistributedFees: wei(100),
      userDebtSharePercentage: wei(0.01),
    });

    expect(burnedDebt).toEqual(wei(2));
  });
});
