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
    pnl: wei(item.pnl, 18, true),
    netFunding: wei(item.netFunding, 18, true),
    markPriceAtLatestInteraction: wei(item.lastPrice, 18, true),
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
        .map(({ skew, skewScale, indexPrice, size, liquidationPrice, accessibleMargin }, index) => {
          if (size.eq(0)) return null;
          const subgraphPositionData = openPositions[index];

          const skewRatio = skew.div(skewScale);
          const marketPrice = indexPrice.mul(wei(1).add(skewRatio));

          const pnlChangeBasedOnCurrentMarkPrice = subgraphPositionData.markPriceAtLatestInteraction
            .sub(marketPrice)
            .mul(size);
          const pnl = subgraphPositionData.pnl.add(pnlChangeBasedOnCurrentMarkPrice);

          const isLong = !size.toString().includes('-');
          const notionalValue = size.mul(marketPrice);
          return {
            address: walletAddress,
            asset: subgraphPositionData.asset,
            indexPrice: indexPrice,
            liquidationPrice: liquidationPrice,
            pnl,
            margin: accessibleMargin,
            size: size,
            long: isLong,
            entryPrice: subgraphPositionData.avgEntryPrice,
            leverage: subgraphPositionData.leverage,
            funding: subgraphPositionData.netFunding,
            marketPrice,
            notionalValue: notionalValue,
            skew: skew,
            skewScale: skewScale,
            fees: subgraphPositionData.fees,
          };
        })
        .filter(notNill);
    },
    enabled: Boolean(openPositions),
  });
};

interface PositionData {
  market: string;
  asset: string;
  avgEntryPrice: Wei;
  leverage: Wei;
  fees: Wei;
  pnl: Wei;
  netFunding: Wei;
  markPriceAtLatestInteraction: Wei;
}

interface DataResponse {
  skew: Wei;
  skewScale: Wei;
  indexPrice: Wei;
  size: Wei;
  liquidationPrice: Wei;
  accessibleMargin: Wei;
}

async function fetchPositions(
  positionData: PositionData[],
  address: string
): Promise<DataResponse[]> {
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
  const dataToReturn: DataResponse[] = positionsDetailsMulticallResult.map(
    (positionDetailsBytes, index) => {
      const positionDetails = contract.interface.decodeFunctionResult(
        'positionDetailsForMarketKey',
        positionDetailsBytes
      )[0];

      const marketDetailsBytes = marketDetailMulticallResult[index];
      const { fundingParameters, marketSizeDetails, priceDetails } =
        contract.interface.decodeFunctionResult('marketDetailsForKey', marketDetailsBytes)[0];

      return {
        size: wei(positionDetails.size),
        liquidationPrice: wei(positionDetails.liquidationPrice),
        skew: wei(marketSizeDetails.marketSkew),
        skewScale: wei(fundingParameters.skewScale),
        indexPrice: wei(priceDetails.price),
        accessibleMargin: wei(positionDetails.accessibleMargin),
      };
    }
  );

  return dataToReturn;
}
