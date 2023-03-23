import { useQuery } from '@apollo/client';
import { Contract, providers } from 'ethers';
import { POSITIONS_QUERY_MARKET } from '../queries/positions';
import { infuraId } from '../utils';
import { FuturesPosition_OrderBy, OrderDirection } from '../__generated__/graphql';
import {
  abi,
  address,
  PerpsV2MarketData,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import {
  abi as multiCallAbi,
  address as multiCallAddress,
  Multicall3,
} from '@synthetixio/v3-contracts/build/optimism-mainnet/Multicall3';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import Wei, { wei } from '@synthetixio/wei';

export function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
const provider = new providers.InfuraProvider(10, infuraId);

const contract = new Contract(address, abi, provider) as PerpsV2MarketData;
const Multicall3Contract = new Contract(multiCallAddress, multiCallAbi, provider) as Multicall3;

interface SubgraphPositionData {
  market: string;
  asset: string;
  avgEntryPrice: Wei;
  leverage: Wei;
  fees: Wei;
  pnlAtLastModification: Wei;
  netFundingAtLastModification: Wei;
  fillPriceAtLastInteraction: Wei;
}

interface ContractData {
  skew: Wei;
  skewScale: Wei;
  indexPrice: Wei;
  size: Wei;
  liquidationPrice: Wei;
  accessibleMargin: Wei;
  accruedFundingSinceLastModification: Wei;
}

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

export const calculatePositionData = (
  subgraphPositionData: SubgraphPositionData,
  contractData: ContractData
) => {
  if (contractData.size.eq(0)) return null;
  const marketPrice = calculateMarkPrice(contractData);
  const pnl = calculateNewPnl(subgraphPositionData, contractData, marketPrice);

  const netFunding = subgraphPositionData.netFundingAtLastModification.add(
    contractData.accruedFundingSinceLastModification
  );

  const notionalValue = contractData.size.mul(marketPrice);

  return {
    asset: subgraphPositionData.asset,
    indexPrice: contractData.indexPrice,
    liquidationPrice: contractData.liquidationPrice,
    pnl,
    margin: contractData.accessibleMargin,
    size: contractData.size,
    long: contractData.size.gt(0),
    entryPrice: subgraphPositionData.avgEntryPrice,
    leverage: subgraphPositionData.leverage,
    funding: netFunding,
    marketPrice,
    notionalValue: notionalValue,
    fees: subgraphPositionData.fees,
  };
};

export const usePositions = (walletAddress?: string) => {
  // Initial query to give a list of markets
  const { data, error } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: { isOpen: true, account: walletAddress },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
    pollInterval: 5000,
  });
  const openPositions = data?.futuresPositions.map((item) => ({
    market: item.market.marketKey,
    asset: item.market.asset,
    avgEntryPrice: wei(item.avgEntryPrice, 18, true),
    leverage: wei(item.leverage, 18, true),
    fees: wei(item.feesPaidToSynthetix, 18, true),
    pnlAtLastModification: wei(item.pnl, 18, true),
    netFundingAtLastModification: wei(item.netFunding, 18, true),
    fillPriceAtLastInteraction: wei(item.lastPrice, 18, true),
  }));

  return useReactQuery({
    queryKey: [
      'usePosition',
      {
        walletAddress,
        subgraphData: JSON.stringify(data),
      },
    ],
    queryFn: async () => {
      if (!openPositions) throw Error('Query should not be enabled');
      if (error) throw error;

      const positionsData = await fetchPositions(openPositions, walletAddress || '');
      return positionsData
        .map((contractData, index) => {
          const calculatedPositionData = calculatePositionData(openPositions[index], contractData);
          return { walletAddress, ...calculatedPositionData };
        })
        .filter(notNill);
    },
    enabled: Boolean(openPositions),
  });
};

async function fetchPositions(
  positionData: SubgraphPositionData[],
  address: string
): Promise<ContractData[]> {
  const positionDetailCalls = positionData.map(({ market }) => ({
    target: contract.address,
    callData: contract.interface.encodeFunctionData('positionDetailsForMarketKey', [
      market,
      address,
    ]),
  }));

  const marketDetailCalls = positionData.map(({ market }) => ({
    target: contract.address,
    callData: contract.interface.encodeFunctionData('marketDetailsForKey', [market]),
  }));

  const multiCallResponse = await Multicall3Contract.callStatic.aggregate(
    positionDetailCalls.concat(marketDetailCalls)
  );

  const positionsDetailsMulticallResult = multiCallResponse.returnData.slice(
    0,
    positionDetailCalls.length
  );

  const marketDetailMulticallResult = multiCallResponse.returnData.slice(
    positionDetailCalls.length
  );

  // The result from decodeFunctionResult isn't typed, we could use zod to validate but doing a type assertion for now..
  const dataToReturn: ContractData[] = positionsDetailsMulticallResult.map(
    (positionDetailsBytes, index) => {
      const positionDetails = contract.interface.decodeFunctionResult(
        'positionDetailsForMarketKey',
        positionDetailsBytes
      )[0];

      const marketDetailsBytes = marketDetailMulticallResult[index];
      const { fundingParameters, marketSizeDetails, priceDetails } =
        contract.interface.decodeFunctionResult('marketDetailsForKey', marketDetailsBytes)[0];

      return {
        size: wei(positionDetails.position.size),
        liquidationPrice: wei(positionDetails.liquidationPrice),
        skew: wei(marketSizeDetails.marketSkew),
        skewScale: wei(fundingParameters.skewScale),
        indexPrice: wei(priceDetails.price),
        accessibleMargin: wei(positionDetails.accessibleMargin),
        accruedFundingSinceLastModification: wei(positionDetails.accruedFunding),
      };
    }
  );

  return dataToReturn;
}
