import Wei from '@synthetixio/wei';

export interface SubgraphPositionData {
  market: string;
  asset: string;
  avgEntryPrice: Wei;
  leverage: Wei;
  fees: Wei;
  pnlAtLastModification: Wei;
  netFundingAtLastModification: Wei;
  fillPriceAtLastInteraction: Wei;
}

export interface ContractData {
  skew: Wei;
  skewScale: Wei;
  indexPrice: Wei;
  size: Wei;
  liquidationPrice: Wei;
  accessibleMargin: Wei;
  accruedFundingSinceLastModification: Wei;
}

export interface PositionData {
  asset: string;
  indexPrice: Wei;
  liquidationPrice: Wei;
  pnl: Wei;
  pnlPercentage: Wei;
  margin: Wei;
  size: Wei;
  long: boolean;
  avgEntryPrice: Wei;
  leverage: Wei;
  fees: Wei;
  funding: Wei;
  marketPrice: Wei;
  notionalValue: Wei;
  address: string;
}
