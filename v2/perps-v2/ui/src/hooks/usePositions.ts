import { useQuery } from '@apollo/client';
import { BigNumber, Contract, providers } from 'ethers';
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
    entryPrice: item.entryPrice,
    leverage: item.leverage,
    fees: item.feesPaidToSynthetix,
  }));
  const subgraphFetchTime = Date.now();

  return useReactQuery({
    queryKey: [
      'usePosition',
      {
        walletAddress,
        subgraphFetchTime: subgraphFetchTime,
      },
    ],
    queryFn: async () => {
      if (!openPositions) throw Error('Query should not be enabled');
      if (error) throw error;

      const positionsData = await fetchPositions(openPositions, walletAddress || '');
      return positionsData.map(
        ({ position, entryPrice, leverage, asset, skew, skewScale, fees, indexPrice }) => {
          const {
            accessibleMargin,
            liquidationPrice,
            accruedFunding,
            profitLoss,
            position: { size },
            notionalValue,
          } = position;

          const isLong = !size.toString().includes('-');

          return {
            address: walletAddress,
            asset,
            indexPrice: indexPrice.toString(),
            liquidationPrice: liquidationPrice.toString(),
            pnl: profitLoss.toString(),
            margin: accessibleMargin.toString(),
            size: size.toString(),
            long: isLong,
            entryPrice,
            leverage,
            funding: accruedFunding.toString(),
            notionalValue: notionalValue.toString(),
            skew: skew.toString(),
            skewScale: skewScale.toString(),
            fees,
          };
        }
      );
    },
    enabled: Boolean(openPositions),
  });
};

interface PositionData {
  market: string;
}

interface DataResponse {
  market: string;
  asset: string;
  entryPrice: string;
  leverage: string;
  position: PerpsV2MarketData.PositionDataStructOutput;
  skew: BigNumber;
  skewScale: BigNumber;
  indexPrice: BigNumber;
  fees: string;
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

      const { market, leverage, entryPrice, asset, fees } = positionData[index];

      return {
        market,
        leverage,
        entryPrice,
        asset,
        position: positionDetails,
        skew: marketSizeDetails.marketSkew,
        skewScale: fundingParameters.skewScale,
        indexPrice: priceDetails.price,
        fees,
      };
    }
  );

  return dataToReturn;
}
