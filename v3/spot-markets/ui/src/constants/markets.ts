interface MarketData {
  [key: string]: {
    marketId: number;
    tradingViewSymbol: string;
  };
}

export const spotMarkets: MarketData = {
  ETH: {
    marketId: 1,
    tradingViewSymbol: 'PYTH:ETHUSD',
  },
};

export const defaultSpotMarket = spotMarkets.ETH;
