import { wei } from '@synthetixio/wei';
import {
  calculateSevenDaysPnlGrowth,
  calculatePoolPerformanceLifetime,
  calculatePoolPerformanceSevenDays,
} from './calculations';

describe('calculateSevenDaysPnlGrowth', () => {
  test('returns undefined when no previous snapshot missing or 0', () => {
    expect(calculateSevenDaysPnlGrowth()).toBe(undefined);
    expect(calculateSevenDaysPnlGrowth([])).toBe(undefined);
  });
  test('return undefined for percentage when the pnl 7days ago is missing or 0', () => {
    expect(calculateSevenDaysPnlGrowth([{ pnl: wei(100) }] as any)).toEqual({
      value: wei(100),
      percentage: undefined,
    });

    expect(calculateSevenDaysPnlGrowth([{ pnl: wei(100) }, { pnl: wei(0) }] as any)).toEqual({
      value: wei(100),
      percentage: undefined,
    });
  });
  test('calculate positive growth', () => {
    expect(calculateSevenDaysPnlGrowth([{ pnl: wei(100) }, { pnl: wei(50) }] as any)).toEqual({
      value: wei(50),
      percentage: wei(1),
    });
  });
  test('calculate negative growth', () => {
    expect(calculateSevenDaysPnlGrowth([{ pnl: wei(50) }, { pnl: wei(100) }] as any)).toEqual({
      value: wei(-50),
      percentage: wei(-0.5),
    });
  });
});

describe('calculatePoolPerformanceLifetime', () => {
  test('returns 0 when there is no configurations', () => {
    expect(calculatePoolPerformanceLifetime({ configurations: [] } as any)).toEqual(wei(0));
  });
  test('returns lifetime performance', () => {
    expect(
      calculatePoolPerformanceLifetime({
        configurations: [{ market: { pnl: wei(60) } }, { market: { pnl: wei(40) } }],
      } as any)
    ).toEqual(wei(100));
  });
});
describe('calculatePoolPerformanceSevenDays', () => {
  test('returns 0 when there is no configurations', () => {
    expect(calculatePoolPerformanceSevenDays({ configurations: [] } as any)).toEqual({
      value: wei(0),
      growthPercentage: undefined,
    });
  });
  test('handles market_snapshots_by_week[1] (last week) missing ', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          { market: { pnl: wei(100), market_snapshots_by_week: [{ pnl: wei(100) }] } },
        ],
      } as any)
    ).toEqual({
      value: wei(100),
      growthPercentage: undefined,
    });
  });
  test('handles market_snapshots_by_week[1] (last week) having 0 pnl', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          {
            market: {
              pnl: wei(100),
              market_snapshots_by_week: [{ pnl: wei(100) }, { pnl: wei(0) }],
            },
          },
        ],
      } as any)
    ).toEqual({
      value: wei(100),
      growthPercentage: undefined,
    });
  });
  test('calculates 7days positive growth', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          {
            market: {
              pnl: wei(100),
              market_snapshots_by_week: [{ pnl: wei(100) }, { pnl: wei(50) }],
            },
          },
        ],
      } as any)
    ).toEqual({
      value: wei(50),
      growthPercentage: wei(1),
    });
  });
  test('calculates 7days negative growth', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          {
            market: {
              pnl: wei(50),
              market_snapshots_by_week: [{ pnl: wei(50) }, { pnl: wei(100) }],
            },
          },
        ],
      } as any)
    ).toEqual({
      value: wei(-50),
      growthPercentage: wei(-0.5),
    });
  });
  test('handles improving pnl that still is negative', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          {
            market: {
              pnl: wei(-50),
              market_snapshots_by_week: [{ pnl: wei(-50) }, { pnl: wei(-100) }],
            },
          },
        ],
      } as any)
    ).toEqual({
      value: wei(50),
      growthPercentage: wei(-0.5),
    });
  });
  test('handles 0 growth', () => {
    expect(
      calculatePoolPerformanceSevenDays({
        configurations: [
          {
            market: {
              pnl: wei(100),
              market_snapshots_by_week: [{ pnl: wei(100) }, { pnl: wei(100) }],
            },
          },
        ],
      } as any)
    ).toEqual({
      value: wei(0),
      growthPercentage: wei(0),
    });
  });
});
