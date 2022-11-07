import { wei } from '@synthetixio/wei';
import {
  calculateBurnAmountFromUnstaking,
  calculateChangesFromBurn,
  calculateChangesFromMint,
  calculateMintAmountFromStaking,
  calculateStakeAmountFromMint,
  calculateStakedSnx,
  calculateUnstakedStakedSnx,
  calculateUnstakingAmountFromBurn,
  calculateValueOfRewards,
} from './stakingCalculations';

describe('stakingCalculation', () => {
  describe('calculateStakedSnx', () => {
    test('returns zero when no data', () => {
      expect(calculateStakedSnx({})).toEqual(wei(0));
    });
    test('when c-ratio: 0% and target-c-ratio: 400%', () => {
      expect(
        calculateStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(0),
          collateral: wei(100),
        })
      ).toEqual(wei(0));
    });
    test('when c-ratio: 800% and target-c-ratio: 400%', () => {
      expect(
        calculateStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 800),
          collateral: wei(100),
        })
      ).toEqual(wei(50));
    });
    test('when c-ratio: 400% and target-c-ratio: 400%', () => {
      expect(
        calculateStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 400),
          collateral: wei(100),
        })
      ).toEqual(wei(100));
    });
    test('when c-ratio: 200% and target-c-ratio: 400%', () => {
      expect(
        calculateStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 200),
          collateral: wei(100),
        })
      ).toEqual(wei(100));
    });
  });
  describe('calculateUnStakedSnx', () => {
    test('returns zero when no data', () => {
      expect(calculateStakedSnx({})).toEqual(wei(0));
    });
    test('when c-ratio: 0% and target-c-ratio: 400%', () => {
      expect(
        calculateUnstakedStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(0),
          collateral: wei(100),
        })
      ).toEqual(wei(100));
    });
    test('when c-ratio: 800% and target-c-ratio: 400%', () => {
      expect(
        calculateUnstakedStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 800),
          collateral: wei(100),
        })
      ).toEqual(wei(50));
    });
    test('when c-ratio: 400% and target-c-ratio: 400%', () => {
      expect(
        calculateUnstakedStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 400),
          collateral: wei(100),
        })
      ).toEqual(wei(0));
    });
    test('when c-ratio: 200% and target-c-ratio: 400%', () => {
      expect(
        calculateUnstakedStakedSnx({
          targetCRatio: wei(100 / 400),
          currentCRatio: wei(100 / 200),
          collateral: wei(100),
        })
      ).toEqual(wei(0));
    });
  });
  describe('calculateUnstakingAmountFromBurn', () => {
    test('when target 400% (0.25%), snx price 2 and sUSD to get back to target is 0 (debtBalance-issuableSynths)', () => {
      expect(
        calculateUnstakingAmountFromBurn({
          burnAmount: 10,
          targetCRatio: 0.25,
          collateralPrice: 2,
          debtBalance: 10,
          issuableSynths: 10,
        })
      ).toBe(20);
    });
    test('when target 400% (0.25%), snx price 2 and sUSD to get back to target is $10 (debtBalance-issuableSynths)', () => {
      expect(
        calculateUnstakingAmountFromBurn({
          burnAmount: 10,
          targetCRatio: 0.25,
          collateralPrice: 2,
          debtBalance: 20,
          issuableSynths: 10,
        })
      ).toBe(0);
    });
  });
  describe('calculateBurnAmountFromUnstaking', () => {
    test('when target 400% (0.25%), snx price 2 and sUSD to get back to target is 0 (debtBalance-issuableSynths)', () => {
      expect(
        calculateBurnAmountFromUnstaking({
          unStakingAmount: 20,
          targetCRatio: 0.25,
          collateralPrice: 2,
          debtBalance: 10,
          issuableSynths: 10,
        })
      ).toBe(10);
    });
    test('when target 400% (0.25%),snx price 2 and sUSD to get back to target is $10 (debtBalance-issuableSynths)', () => {
      expect(
        calculateBurnAmountFromUnstaking({
          unStakingAmount: 20,
          targetCRatio: 0.25,
          collateralPrice: 2,
          debtBalance: 20,
          issuableSynths: 10,
        })
      ).toBe(20);
    });
  });
  describe('calculateStakeAmountFromMint', () => {
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateStakeAmountFromMint(10, 0.25, 2)).toBe(20);
    });
  });
  describe('calculateMintAmountFromStaking', () => {
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateMintAmountFromStaking(20, 0.25, 2)).toBe(10);
    });
  });
  describe('calculateChangesFromMint', () => {
    test('not staked, staking 10SNX', () => {
      const stakeAmountSNX = 10;
      const mintAmountsUSD = 5;
      const stakedSnx = 0;
      const debtBalance = 0;
      const transferable = 50;
      const sUSDBalance = 0;
      const collateralUsdValue = 10;

      expect(
        calculateChangesFromMint({
          stakeAmountSNX,
          mintAmountsUSD,
          stakedSnx,
          debtBalance,
          transferable,
          sUSDBalance,
          collateralUsdValue,
        })
      ).toEqual({
        newCratio: 0.5,
        newDebtBalance: 5,
        newStakedAmountSnx: 10,
        newTransferable: 40,
        newSUSDBalance: 5,
      });
    });
    test('already staked, staking 10SNX more', () => {
      const stakeAmountSNX = 10;
      const mintAmountsUSD = 5;
      const stakedSnx = 5;
      const debtBalance = 2;
      const transferable = 50;
      const sUSDBalance = 10;
      const collateralUsdValue = 60;

      expect(
        calculateChangesFromMint({
          stakeAmountSNX,
          mintAmountsUSD,
          stakedSnx,
          debtBalance,
          transferable,
          sUSDBalance,
          collateralUsdValue,
        })
      ).toEqual({
        newCratio: 7 / collateralUsdValue,
        newDebtBalance: 7,
        newStakedAmountSnx: 15,
        newTransferable: 40,
        newSUSDBalance: 15,
      });
    });
  });
  describe('calculateChangesFromBurn', () => {
    test('burning 10SNX', () => {
      const burnAmountSusd = 5;
      const stakedSnx = 20;
      const debtBalance = 10;
      const transferable = 50;
      const sUSDBalance = 10;
      const collateral = 50;
      const collateralUsdValue = 100;
      const targetCRatio = 0.25;

      expect(
        calculateChangesFromBurn({
          burnAmountSusd,
          stakedSnx,
          debtBalance,
          transferable,
          sUSDBalance,
          collateralUsdValue,
          collateral,
          targetCRatio,
        })
      ).toEqual({
        newCratio: 0.05,
        newDebtBalance: 5,
        newStakedAmountSnx: 10,
        newTransferable: 60,
        newSUSDBalance: 5,
      });
    });
    test('burning more than debt balance', () => {
      const burnAmountSusd = 500;
      const stakedSnx = 10;
      const debtBalance = 10;
      const transferable = 20;
      const sUSDBalance = 10;
      const collateralUsdValue = 100;
      const collateral = 50;
      const targetCRatio = 0.25;

      expect(
        calculateChangesFromBurn({
          burnAmountSusd,
          stakedSnx,
          debtBalance,
          transferable,
          sUSDBalance,
          collateralUsdValue,
          collateral,
          targetCRatio,
        })
      ).toEqual({
        newCratio: 0,
        newDebtBalance: 0,
        newStakedAmountSnx: 0,
        newTransferable: 30, // collateral - (collateral - staked - transferable)
        newSUSDBalance: 0,
      });
    });
  });
  describe('calculateValueOfRewards', () => {
    expect(calculateValueOfRewards(wei(10), wei(10), wei(2))).toBe(30);
  });
});
