import { useQuery } from '@apollo/client';
import { BytesLike, Contract, providers } from 'ethers';
import { POSITIONS_QUERY_MARKET } from '../queries/positions';
import Wei from '@synthetixio/wei';
import { infuraId } from '../utils';
import { FuturesPosition_OrderBy, OrderDirection } from '../__generated__/graphql';
import {
  abi as perpsMarketDataAbiGoerli,
  address as perpsMarketDataAddressGoerli,
  PerpsV2MarketData as PerpsV2MarketDataGoerli,
} from '@synthetixio/contracts/build/goerli-ovm/deployment/PerpsV2MarketData';
import {
  abi as abiPerpsMarketData,
  address as addressPerpsMarketData,
  PerpsV2MarketData,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import {
  abi as multiCallAbi,
  address as multiCallAddressGoerli,
  Multicall3,
} from './contracts/optimism-goerli/Multicall3';
import { address as multicallMainnetAddress } from './contracts/optimism-mainnet/Multicall3';
import { wei } from '@synthetixio/wei';
import { ContractData, SubgraphPositionData } from '../types';
import { POSITIONS_CONTRACT_QUERY } from '../queries/resolved';
import { useSearchParams } from 'react-router-dom';
import { isStaging } from '../utils/isStaging';

const OPTIMISM_GOERLI_NETWORK_ID = 420;
const OPTIMISM__ID = 10;

const networkId = isStaging ? OPTIMISM_GOERLI_NETWORK_ID : OPTIMISM__ID;
const provider = new providers.InfuraProvider(networkId, infuraId);

export const perpsMarketDataContract = isStaging
  ? (new Contract(
      perpsMarketDataAddressGoerli,
      perpsMarketDataAbiGoerli,
      provider
    ) as PerpsV2MarketDataGoerli)
  : (new Contract(addressPerpsMarketData, abiPerpsMarketData, provider) as PerpsV2MarketData);

const Multicall3Contract = new Contract(
  isStaging ? multiCallAddressGoerli : multicallMainnetAddress,
  multiCallAbi,
  provider
) as Multicall3;

interface PositionType {
  accountType: string;
  address: string;
  asset: string;
  avgEntryPrice: Wei;
  fees: Wei;
  funding: Wei;
  indexPrice: Wei;
  leverage: Wei;
  liquidationPrice: Wei;
  long: boolean;
  marketPrice: Wei;
  notionalValue: Wei;
  realizedPnl: Wei;
  remainingMargin: Wei;
  size: Wei;
  unrealizedPnl: Wei;
  unrealizedPnlPercentage: Wei;
}

export const usePositions = (accountAddress?: string, accountType?: string) => {
  const [searchParams] = useSearchParams();
  const marketAddress = searchParams.get('marketAddress') || undefined;
  const accountAddressLowerCase = accountAddress?.toLowerCase();

  // Initial query to give a list of markets
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useQuery(POSITIONS_QUERY_MARKET, {
    variables: {
      where: {
        isOpen: true,
        trader: accountAddressLowerCase,
        market: marketAddress,
      },
      orderBy: FuturesPosition_OrderBy.Size,
      orderDirection: OrderDirection.Desc,
      first: 50,
    },
    pollInterval: 5000,
  });

  const openPositions = marketData?.futuresPositions.map((item) => ({
    ...item,
    accountType,
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
    variables: { walletAddress: accountAddressLowerCase, openPositions },
    skip: marketData?.futuresPositions ? false : true,
    pollInterval: 1000,
  });

  const positionsData = data?.positionsFromContract
    ? data.positionsFromContract.map((position: PositionType) => ({ ...position, accountType }))
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
    target: perpsMarketDataContract.address,
    callData: perpsMarketDataContract.interface.encodeFunctionData('positionDetailsForMarketKey', [
      market,
      address,
    ]),
  }));

  const marketDetailCalls = positionData.map(({ market }) => ({
    target: perpsMarketDataContract.address,
    callData: perpsMarketDataContract.interface.encodeFunctionData('marketDetailsForKey', [market]),
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
    (positionDetailsBytes: BytesLike, index: number) => {
      const positionDetails = perpsMarketDataContract.interface.decodeFunctionResult(
        'positionDetailsForMarketKey',
        positionDetailsBytes
      )[0];

      const marketDetailsBytes = marketDetailMulticallResult[index];
      const { fundingParameters, marketSizeDetails, priceDetails } =
        perpsMarketDataContract.interface.decodeFunctionResult(
          'marketDetailsForKey',
          marketDetailsBytes
        )[0];

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
