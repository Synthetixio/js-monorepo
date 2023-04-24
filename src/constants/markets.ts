interface MarketData {
  [key: string]: {
    marketId: number;
    tradingViewSymbol: string;
  };
}

const marketData: MarketData = {
  ETH: {
    marketId: 1,
    tradingViewSymbol: "PYTH:ETHUSD",
  },
};

export default marketData;
