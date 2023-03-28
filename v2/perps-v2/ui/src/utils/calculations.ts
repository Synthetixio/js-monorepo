import Wei, { wei } from '@synthetixio/wei';
import { SubgraphPositionData, ContractData } from '../types/positions';

export const calculateMarkPrice = ({
  skew,
  indexPrice,
  skewScale,
}: {
  skew: Wei;
  indexPrice: Wei;
  skewScale: Wei;
}) => {
  const skewRatio = skew.div(skewScale);
  const markPrice = indexPrice.mul(wei(1).add(skewRatio));
  return markPrice;
};

export const calculateNewPnl = (
  subgraphPositionData: SubgraphPositionData,
  contractData: ContractData,
  marketPrice: Wei
) => {
  const priceShiftSinceModification = marketPrice.sub(
    subgraphPositionData.fillPriceAtLastInteraction
  );
  const pnlSinceModification = contractData.size.mul(priceShiftSinceModification);
  const newPnl = subgraphPositionData.pnlAtLastModification
    .add(pnlSinceModification)
    .add(contractData.accruedFundingSinceLastModification);
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
  contractData: ContractData,
  address?: string
) => {
  if (contractData.size.eq(0)) return null;
  const marketPrice = calculateMarkPrice(contractData);
  const pnl = calculateNewPnl(subgraphPositionData, contractData, marketPrice);
  const notionalValue = contractData.size.mul(marketPrice);
  const pnlPercentage = calculatePnlPercentage(subgraphPositionData, contractData, pnl);
  const netFunding = subgraphPositionData.netFundingAtLastModification.add(
    contractData.accruedFundingSinceLastModification
  );

  return {
    asset: subgraphPositionData.asset,
    indexPrice: contractData.indexPrice,
    liquidationPrice: contractData.liquidationPrice,
    pnl,
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
