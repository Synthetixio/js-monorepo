import { useQuery } from '@apollo/client';
import { Contract, providers } from 'ethers';
import { POSITIONS_QUERY_MARKET } from '../queries/positions';
import { infuraId } from '../utils';
import { FuturesPosition_OrderBy, OrderDirection } from '../__generated__/graphql';
import {
  abi as perpsMarketDataAbiGoerli,
  address as perpsMarketDataAddressGoerli,
  PerpsV2MarketData as PerpsV2MarketDataGoerli,
} from '@synthetixio/contracts/build/goerli-ovm/deployment/PerpsV2MarketData';

import {
  abi,
  address,
  PerpsV2MarketData,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import {
  abi as multiCallAbi,
  address as multiCallAddressGoerli,
  Multicall3,
} from '@synthetixio/v3-contracts/build/optimism-goerli/Multicall3';
import { address as multicallMainnetAddress } from '@synthetixio/v3-contracts/build/optimism-goerli/Multicall3';
import { wei } from '@synthetixio/wei';
import { ContractData, SubgraphPositionData, PositionsDataSchema } from '../types';
import { POSITIONS_CONTRACT_QUERY } from '../queries/resolved';
import { useSearchParams } from 'react-router-dom';
import { isStaging } from '../utils/isStaging';

export function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
const OPTIMISM_GOERLI_NETWORK_ID = 420;
const OPTIMISM__ID = 10;

const networkId = isStaging ? OPTIMISM_GOERLI_NETWORK_ID : OPTIMISM__ID;
const provider = new providers.InfuraProvider(networkId, infuraId);

const contract = isStaging
  ? (new Contract(
      perpsMarketDataAddressGoerli,
      perpsMarketDataAbiGoerli,
      provider
    ) as PerpsV2MarketDataGoerli)
  : (new Contract(address, abi, provider) as PerpsV2MarketData);

const Multicall3Contract = new Contract(
  isStaging ? multiCallAddressGoerli : multicallMainnetAddress,
  multiCallAbi,
  provider
) as Multicall3;

export const usePositions = (walletAddress?: string) => {
  const [searchParams] = useSearchParams();
  const marketAddress = searchParams.get('marketAddress') || undefined;
  const walletAddressLowerCase = walletAddress?.toLowerCase();
  // Initial query to give a list of markets
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: {
        isOpen: true,
        trader: walletAddressLowerCase,
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
    unrealizedPnlAtLastModification: wei(item.unrealizedPnl, 18, true),
    realizedPnlAtLastModification: wei(item.realizedPnl, 18, true),
    netFundingAtLastModification: wei(item.netFunding, 18, true),
    fillPriceAtLastInteraction: wei(item.lastPrice, 18, true),
  }));

  const { data, loading, error } = useQuery(POSITIONS_CONTRACT_QUERY, {
    variables: { walletAddress: walletAddressLowerCase, openPositions },
    skip: marketData?.futuresPositions ? false : true,
    pollInterval: 1000,
  });

  const positionsData = data?.positionsFromContract
    ? PositionsDataSchema.parse(data.positionsFromContract)
    : undefined;

  return {
    data: positionsData,
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
        remainingMargin: wei(positionDetails.remainingMargin),
        accruedFundingSinceLastModification: wei(positionDetails.accruedFunding),
      };
    }
  );

  return dataToReturn;
}
