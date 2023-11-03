import { useQuery } from '@apollo/client';
import { POSITIONS_LIQUIDATED_QUERY } from '../queries/liquidated';
import { useSearchParams } from 'react-router-dom';
import { useMarketSummaries } from './useMarketSummaries';
import { generateMarketIds } from './useActions';
import {
  PositionLiquidated_OrderBy,
  OrderDirection,
  PositionsLiquidatedQuery,
} from '../__generated__/graphql';
import Wei, { wei } from '@synthetixio/wei';

interface QueryLiquidation {
  __typename?: 'PositionLiquidated';
  id: string;
  timestamp: string;
  txHash: string;
  size: string;
  price: string;
  fee: string;
  liquidator: string;
  futuresPosition: {
    __typename?: 'FuturesPosition';
    leverage: string;
  };
  market: {
    __typename?: 'FuturesMarket';
    asset: string;
  };
  trader: {
    __typename?: 'Trader';
    id: string;
    totalLiquidations: string;
  };
}

interface Liquidation {
  id: string;
  timestamp: string;
  txHash: string;
  fee: Wei;
  size: Wei;
  price: Wei;
  liquidator: string;
  futuresPosition: {
    leverage: Wei;
  };
  market: {
    asset: string;
  };
  trader: {
    id: string;
    totalLiquidations: string;
  };
}

function parsedLiquidationData(
  data: PositionsLiquidatedQuery | undefined
): Liquidation[] | undefined {
  if (!data?.positionLiquidateds) return undefined;
  if (!data.positionLiquidateds.length) return [];

  return data.positionLiquidateds.map((liquidation: QueryLiquidation) => ({
    id: liquidation.id,
    timestamp: liquidation.timestamp,
    txHash: liquidation.txHash,
    fee: wei(liquidation.fee, 18, true),
    size: wei(liquidation.size, 18, true),
    price: wei(liquidation.price, 18, true),
    liquidator: liquidation.liquidator,
    futuresPosition: {
      leverage: wei(liquidation.futuresPosition.leverage, 18, true),
    },
    market: {
      asset: liquidation.market.asset,
    },
    trader: {
      id: liquidation.trader.id,
      totalLiquidations: liquidation.trader.totalLiquidations,
    },
  }));
}

export function useLiquidations() {
  const [searchParams] = useSearchParams();
  const { data: marketConfigs, isLoading: marketConfigsLoading } = useMarketSummaries();

  const markets = generateMarketIds(marketConfigs, searchParams.get('markets'));

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(POSITIONS_LIQUIDATED_QUERY, {
    variables: {
      where: {
        market_in: markets,
      },
      orderBy: PositionLiquidated_OrderBy.Timestamp,
      orderDirection: OrderDirection.Desc,
    },
    skip: marketConfigsLoading,
    pollInterval: 10000,
  });

  return {
    data: queryData?.positionLiquidateds ? parsedLiquidationData(queryData) : undefined,
    loading,
    error,
  };
}
