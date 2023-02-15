import { wei } from '@synthetixio/wei';
import { calculateTotalBurn } from './useFeesBurnedInPeriod';
describe('calculateTotalBurn', () => {
  test('handles user not staking', () => {
    const burnedDebt = calculateTotalBurn({
      userDebtShareSupplyCurrentNetwork: wei(0),
      totalDebtShareSupplyMainnet: wei(100),
      totalDebtShareSupplyOptimism: wei(100),
      totalBurnMainnet: wei(10),
      totalBurnOptimism: wei(10),
    });
    expect(burnedDebt).toEqual(wei(0));
  });
  test('calculates burned debt correctly', () => {
    const burnedDebt = calculateTotalBurn({
      userDebtShareSupplyCurrentNetwork: wei(20),
      totalDebtShareSupplyMainnet: wei(100),
      totalDebtShareSupplyOptimism: wei(100),
      totalBurnMainnet: wei(10),
      totalBurnOptimism: wei(10),
    });

    expect(burnedDebt).toEqual(wei(2)); // total_burn * user_SDS / total_SDS =  20 * (20 / 200) = 2
  });
});
