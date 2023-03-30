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
import { wei } from '@synthetixio/wei';
import { ContractData, SubgraphPositionData, PositionData } from '../types';
import { POSITIONS_CONTRACT_QUERY } from '../queries/resolved';
import { useSearchParams } from 'react-router-dom';

export function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
const provider = new providers.InfuraProvider(10, infuraId);

const contract = new Contract(address, abi, provider) as PerpsV2MarketData;
const Multicall3Contract = new Contract(multiCallAddress, multiCallAbi, provider) as Multicall3;

export const usePositions = (walletAddress?: string) => {
  const [searchParams] = useSearchParams();
  const marketAddress = searchParams.get('marketAddress') || undefined;

  // Initial query to give a list of markets
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: {
        isOpen: true,
        account: walletAddress,
        market: marketAddress,
      },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
    pollInterval: 5000,
  });

  const openPositions = marketData?.futuresPositions.map((item) => ({
    market: item.market.marketKey,
    asset: item.market.asset,
    avgEntryPrice: wei(item.avgEntryPrice, 18, true),
    leverage: wei(item.leverage, 18, true),
    fees: wei(item.feesPaidToSynthetix, 18, true),
    pnlAtLastModification: wei(item.pnl, 18, true),
    netFundingAtLastModification: wei(item.netFunding, 18, true),
    fillPriceAtLastInteraction: wei(item.lastPrice, 18, true),
  }));

  const { data, loading, error } = useQuery(POSITIONS_CONTRACT_QUERY, {
    variables: { walletAddress, openPositions },
    skip: marketData?.futuresPositions ? false : true,
    pollInterval: 1000,
  });

  const positionData = data?.positionsFromContract as PositionData[];

  return {
    data: positionData,
    loading: loading || marketLoading,
    error: error || marketError,
  };
};

export async function fetchPositions(
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
