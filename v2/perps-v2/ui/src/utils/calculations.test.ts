import { wei } from '@synthetixio/wei';
import {
  calculateMarkPrice,
  calculateNewUnrealizedPnl,
  calculatePnlPercentage,
  calculatePositionData,
} from './calculations';

describe('calculateMarkPrice', () => {
  it('should correctly calculate the mark price', () => {
    const result = calculateMarkPrice(wei(100), {
      skew: wei(10),
      indexPrice: wei(100),
      skewScale: wei(20),
    });
    expect(result).toEqual(wei('150'));
  });
});

describe('calculateNewPnl', () => {
  it('should correctly calculate the new unrealized pnl', () => {
    const subgraphPositionData = {
      fillPriceAtLastInteraction: wei(100),
      unrealizedPnlAtLastModification: wei(50),
    } as any;
    const contractData = { size: wei(10) } as any;
    const marketPrice = wei(110);

    const result = calculateNewUnrealizedPnl(subgraphPositionData, contractData, marketPrice);
    expect(result).toEqual(wei('150')); // ((110 - 100) * 10) + (5 * 10)
  });
});

describe('calculatePnlPercentage', () => {
  test('calculates PnL percentage correctly long profit', () => {
    const subgraphPositionData = { avgEntryPrice: wei(50), leverage: 2 } as any;
    const marketPrice = wei(100);
    const isLong = true;
    const result = calculatePnlPercentage(subgraphPositionData, marketPrice, isLong);
    expect(result.toNumber()).toBe(2);
  });
  test('calculates PnL percentage correctly short profit', () => {
    const subgraphPositionData = { avgEntryPrice: wei(100), leverage: 2 } as any;
    const marketPrice = wei(50);
    const isLong = false;

    const result = calculatePnlPercentage(subgraphPositionData, marketPrice, isLong);
    expect(result.toNumber()).toBe(1);
  });
  test('calculates PnL percentage correctly long loss', () => {
    const subgraphPositionData = { avgEntryPrice: wei(50), leverage: 1 } as any;
    const marketPrice = wei(25);
    const isLong = true;
    const result = calculatePnlPercentage(subgraphPositionData, marketPrice, isLong);
    expect(result.toNumber()).toBe(-0.5);
  });
  test('calculates PnL percentage correctly short loss', () => {
    const subgraphPositionData = { avgEntryPrice: wei(50), leverage: 3 } as any;
    const marketPrice = wei(100);
    const isLong = false;

    const result = calculatePnlPercentage(subgraphPositionData, marketPrice, isLong);
    expect(result.toNumber()).toBe(-3);
  });

  test('handles zero shift case', () => {
    const subgraphPositionData = { avgEntryPrice: wei(100), leverage: wei(1) } as any;
    const marketPrice = wei(100);
    const isLong = true;
    const result = calculatePnlPercentage(subgraphPositionData, marketPrice, isLong);
    expect(result.toNumber()).toBe(0);
  });
});

describe('calculatePositionData', () => {
  it('should correctly calculate the position data', () => {
    const subgraphPositionData = {
      asset: 'BTC',
      market: '0xxxx',
      fillPriceAtLastInteraction: wei(150),
      unrealizedPnlAtLastModification: wei(150),
      realizedPnlAtLastModification: wei(-31.1),
      netFundingAtLastModification: wei(30),
      avgEntryPrice: wei(100),
      leverage: wei(9),
      fees: wei(0.1),
    };
    const contractData = {
      size: wei(10),
      indexPrice: wei(120),
      liquidationPrice: wei(80),
      accessibleMargin: wei(100),
      remainingMargin: wei(200),
      skew: wei(10),
      skewScale: wei(20),
      accruedFundingSinceLastModification: wei(5),
    };

    const pythPrice = wei(120);

    const result = calculatePositionData(subgraphPositionData, pythPrice, contractData, '0xxxxx');

    expect(result).toEqual({
      address: '0xxxxx',
      asset: 'BTC',
      indexPrice: wei(120),
      liquidationPrice: wei(80),
      realizedPnl: wei(-26.1), // -30.1 + 5
      unrealizedPnl: wei(450), // ((180 - 150) * 10) + 150
      unrealizedPnlPercentage: wei(7.2), // ((180- 100) / 100) * 9
      remainingMargin: wei(200),
      size: wei(10),
      long: true,
      avgEntryPrice: wei(100),
      leverage: wei(9), // (10 * 180) / 200
      funding: wei(35),
      marketPrice: wei(180), // 120 * (1 + (10 / 20) )
      notionalValue: wei(1800),
      fees: wei(0.1),
    });
  });

  it('should return null if contractData size is zero', () => {
    const subgraphPositionData = {} as any; // Any subgraphPositionData
    const contractData = {
      size: wei(0),
    } as any;

    const pythPrice = wei(0);

    const result = calculatePositionData(subgraphPositionData, pythPrice, contractData);
    expect(result).toBe(null);
  });
});
