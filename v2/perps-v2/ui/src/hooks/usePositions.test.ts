import { wei } from '@synthetixio/wei';
import { calculateMarkPrice, calculateNewPnl, calculatePositionData } from './usePositions';

describe('calculateMarkPrice', () => {
  it('should correctly calculate the mark price', () => {
    const result = calculateMarkPrice({
      skew: wei(10),
      indexPrice: wei(100),
      skewScale: wei(20),
    });
    expect(result).toEqual(wei('150'));
  });

  // Add more test cases here if necessary
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

  // Add more test cases here if necessary
});

describe('calculatePositionData', () => {
  it('should correctly calculate the position data', () => {
    const subgraphPositionData = {
      asset: 'BTC',
      market: '0xxxx',
      fillPriceAtLastInteraction: wei(120),
      pnlAtLastModification: wei(50),
      netFundingAtLastModification: wei(30),
      avgEntryPrice: wei(90),
      leverage: wei(5),
      fees: wei(0.1),
    };
    const contractData = {
      size: wei(10),
      indexPrice: wei(100),
      liquidationPrice: wei(80),
      accessibleMargin: wei(150),
      skew: wei(10),
      skewScale: wei(20),
      accruedFundingSinceLastModification: wei(5),
    };

    const result = calculatePositionData(subgraphPositionData, contractData);
    expect(result).toEqual({
      asset: 'BTC',
      indexPrice: wei(100),
      liquidationPrice: wei(80),
      pnl: wei(355),
      margin: wei(150),
      size: wei(10),
      long: true,
      entryPrice: wei(90),
      leverage: wei(5),
      funding: wei(35),
      marketPrice: wei(150),
      notionalValue: wei(1500),
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

  // Add more test cases here if necessary
});
