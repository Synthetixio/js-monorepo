interface MarketData {
  [key: string]: {
    marketId: number;
    tradingViewSymbol: string;
  };
}

export const perpsMarkets: MarketData = {
  ETH: {
    marketId: 2,
    tradingViewSymbol: "PYTH:ETHUSD",
  },
};

export const spotMarkets: MarketData = {
  ETH: {
    marketId: 1,
    tradingViewSymbol: "PYTH:ETHUSD",
  },
};

export enum StrategyType {
  ONCHAIN = 0,
  PYTH = 1,
}
