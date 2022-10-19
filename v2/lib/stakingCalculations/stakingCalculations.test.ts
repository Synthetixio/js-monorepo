import { wei } from '@synthetixio/wei';
import {
  calculateBurnAmountFromUnstaking,
  calculateMintAmountFromStaking,
  calculateStakeAmountFromMint,
  calculateStakedSnx,
  calculateUnstakedStakedSnx,
  calculateUnstakingAmountFromBurn,
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
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateUnstakingAmountFromBurn('10', 0.25, 2)).toBe('20.00');
    });
  });
  describe('calculateBurnAmountFromUnstaking', () => {
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateBurnAmountFromUnstaking('20', 0.25, 2)).toBe('10.00');
    });
  });
  describe('calculateStakeAmountFromMint', () => {
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateStakeAmountFromMint('10', 0.25, 2)).toBe('20.00');
    });
  });
  describe('calculateMintAmountFromStaking', () => {
    test('when target 400% (0.25%) and snx price 2', () => {
      expect(calculateMintAmountFromStaking('20', 0.25, 2)).toBe('10.00');
    });
  });
});
