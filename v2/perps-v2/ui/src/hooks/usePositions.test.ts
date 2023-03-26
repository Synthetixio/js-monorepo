import { wei } from '@synthetixio/wei';
import {
  calculateMarkPrice,
  calculateNewPnl,
  calculatePnlPercentage,
  calculatePositionData,
} from '../utils/calculations';

describe('calculateMarkPrice', () => {
  it('should correctly calculate the mark price', () => {
    const result = calculateMarkPrice({
      skew: wei(10),
      indexPrice: wei(100),
      skewScale: wei(20),
    });
    expect(result).toEqual(wei('150'));
  });
});

describe('calculateNewPnl', () => {
  it('should correctly calculate the new pnl', () => {
    const subgraphPositionData = {
      fillPriceAtLastInteraction: wei(100),
      pnlAtLastModification: wei(50),
    } as any;
    const contractData = {
      size: wei(10),
      accruedFundingSinceLastModification: wei(5),
    } as any;
    const marketPrice = wei(110);

    const result = calculateNewPnl(subgraphPositionData, contractData, marketPrice);
    expect(result).toEqual(wei('155'));
  });
});
describe('calculatePnlPercentage', () => {
  test('calculates PnL percentage correctly', () => {
    const subgraphPositionData = { avgEntryPrice: wei(50) } as any;
    const contractData = { size: wei(100) } as any;
    const pnl = wei(1000);

    const result = calculatePnlPercentage(subgraphPositionData, contractData, pnl);
    expect(result.toNumber()).toBe(0.2);
  });

  test('handles zero shift case', () => {
    const subgraphPositionData = { avgEntryPrice: wei(50) } as any;
    const contractData = { size: wei(100) } as any;
    const pnl = wei(0);

    const result = calculatePnlPercentage(subgraphPositionData, contractData, pnl);
    expect(result.toNumber()).toBe(0);
  });
});

describe('calculatePositionData', () => {
  it('should correctly calculate the position data', () => {
    const subgraphPositionData = {
      asset: 'BTC',
      market: '0xxxx',
      fillPriceAtLastInteraction: wei(150),
      pnlAtLastModification: wei(150),
      netFundingAtLastModification: wei(30),
      avgEntryPrice: wei(100),
      leverage: wei(5),
      fees: wei(0.1),
    };
    const contractData = {
      size: wei(10),
      indexPrice: wei(120),
      liquidationPrice: wei(80),
      accessibleMargin: wei(200),
      skew: wei(10),
      skewScale: wei(20),
      accruedFundingSinceLastModification: wei(5),
    };

    const result = calculatePositionData(subgraphPositionData, contractData, '0xxxxx');

    expect(result).toEqual({
      address: '0xxxxx',
      asset: 'BTC',
      indexPrice: wei(120),
      liquidationPrice: wei(80),
      pnl: wei(455),
      pnlPercentage: wei(0.455),
      margin: wei(200),
      size: wei(10),
      long: true,
      avgEntryPrice: wei(100),
      leverage: wei(5),
      funding: wei(35),
      marketPrice: wei(180),
      notionalValue: wei(1800),
      fees: wei(0.1),
    });
  });

  it('should return null if contractData size is zero', () => {
    const subgraphPositionData = {} as any; // Any subgraphPositionData
    const contractData = {
      size: wei(0),
    } as any;

    const result = calculatePositionData(subgraphPositionData, contractData);
    expect(result).toBe(null);
  });
});
