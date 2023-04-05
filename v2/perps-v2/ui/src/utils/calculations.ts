import Wei, { wei } from '@synthetixio/wei';
import { SubgraphPositionData, ContractData } from '../types';

export const calculateMarkPrice = (
  pythPrice: Wei | undefined,
  {
    skew,
    indexPrice,
    skewScale,
  }: {
    skew: Wei;
    indexPrice: Wei;
    skewScale: Wei;
  }
) => {
  const skewRatio = skew.div(skewScale);
  const markPrice = pythPrice
    ? pythPrice.mul(wei(1).add(skewRatio))
    : indexPrice.mul(wei(1).add(skewRatio));
  return markPrice;
};

export const calculateNewUnrealizedPnl = (
  subgraphPositionData: SubgraphPositionData,
  contractData: ContractData,
  marketPrice: Wei
) => {
  const priceShiftSinceModification = marketPrice.sub(
    subgraphPositionData.fillPriceAtLastInteraction
  );
  const pnlSinceModification = contractData.size.mul(priceShiftSinceModification);
  const newPnl = subgraphPositionData.unrealizedPnlAtLastModification.add(pnlSinceModification);
  return newPnl;
};

export const calculatePnlPercentage = (
  subgraphPositionData: SubgraphPositionData,
  contractData: ContractData,
  pnl: Wei
) => {
  if (pnl.eq(0)) return wei(0);

  const initialValue = contractData.size.mul(subgraphPositionData.avgEntryPrice);
  const currentVal = initialValue.add(pnl);
  const shift = currentVal.sub(initialValue);
  return shift.div(initialValue);
};

export const calculatePositionData = (
  subgraphPositionData: SubgraphPositionData,
  pythPrice: Wei | undefined,
  contractData: ContractData,
  address?: string
) => {
  if (contractData.size.eq(0)) return null;
  const marketPrice = calculateMarkPrice(pythPrice, contractData);
  const unrealizedPnl = calculateNewUnrealizedPnl(subgraphPositionData, contractData, marketPrice);

  const realizedPnl = subgraphPositionData.realizedPnlAtLastModification.add(
    contractData.accruedFundingSinceLastModification
  );

  const notionalValue = contractData.size.mul(marketPrice);
  const pnlPercentage = calculatePnlPercentage(subgraphPositionData, contractData, unrealizedPnl);
  const netFunding = subgraphPositionData.netFundingAtLastModification.add(
    contractData.accruedFundingSinceLastModification
  );

  return {
    asset: subgraphPositionData.asset,
    indexPrice: pythPrice ? pythPrice : contractData.indexPrice,
    liquidationPrice: contractData.liquidationPrice,
    unrealizedPnl,
    realizedPnl,
    pnlPercentage,
    margin: contractData.accessibleMargin,
    size: contractData.size,
    long: contractData.size.gt(0),
    avgEntryPrice: subgraphPositionData.avgEntryPrice,
    leverage: subgraphPositionData.leverage,
    funding: netFunding,
    marketPrice,
    notionalValue: notionalValue,
    fees: subgraphPositionData.fees,
    address,
  };
};
