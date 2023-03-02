import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { SortConfig } from '../components/PositionsTable';
import { useGetMarkets } from './markets';

interface GraphResponse {
  data: {
    futuresPositions: FuturePosition[];
    traders: Trader[];
  };
}

export interface FuturePosition {
  account: string;
  id: string;
  isLiquidated: boolean;
  asset: string;
  market: string;
  isOpen: boolean;
  openTimestamp: string;
  closeTimestamp: string;
  margin: string;
  initialMargin: string;
  entryPrice: string;
  long: boolean;
  lastPrice: string;
  leverage: string;
  totalVolume: string;
  exitPrice: string;
  trades: string;
  pnl: string;
  size: string;
  feesPaidToSynthetix: string;
  maxLeverage: string;
}

export interface Trader {
  id: string;
  totalLiquidations: string;
  totalMarginLiquidated: string;
  feesPaidToSynthetix: string;
  pnl: string;
  trades: FuturesTrade[];
}

export interface FuturesTrade {
  account: string;
  feesPaid: string;
  liquidations: string;
  totalTrades: string;
  pnl: string;
  pnlWithFeesPaid: string;
  crossMarginVolume: string;
  totalVolume: string;
}

export interface FilterOptions {
  asset: string;
  liquidated: boolean;
  open: boolean;
  openedAt: number;
  closedAt: number;
  deactivateLiquidated: boolean;
  deactivateOpen: boolean;
  deactivateOpenedAt: boolean;
  deactivateClosedAt: boolean;
  walletAddress: string;
}

const gql = (data: TemplateStringsArray) => data[0];
function getBody({
  skip,
  orderBy,
  orderDirection,
  whereAccount,
  whereMarket,
  whereIsLiquidated,
  whereIsOpen,
  whereOpenedAt,
  whereClosedAt,
}: {
  skip: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  whereAccount?: string;
  whereMarket?: string;
  whereIsLiquidated?: boolean;
  whereIsOpen?: boolean;
  whereOpenedAt?: number;
  whereClosedAt?: number;
}) {
  let query = gql`
    query info(
      $skip: Int
      $orderBy: String
      $orderDirection: String
      $whereAccount: String
      $whereMarket: String
      $whereIsLiquidated: Boolean
      $whereIsOpen: Boolean
      $whereOpenedAt: Int
      $whereClosedAt: Int
    ) {
      futuresPositions(
        skip: $skip
        first: 1000
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: {
          account: $whereAccount
          market: $whereMarket
          isLiquidated: $whereIsLiquidated
          isOpen: $whereIsOpen
          openTimestamp_gt: $whereOpenedAt
          closeTimestamp_lt: $whereClosedAt
        }
      ) {
        id
        account
        isLiquidated
        market
        isOpen
        openTimestamp
        closeTimestamp
        margin
        initialMargin
        entryPrice
        lastPrice
        pnl
        exitPrice
        leverage
        size
        long
        trades
        totalVolume
        feesPaidToSynthetix
      }
      traders(first: 1, where: { id: $whereAccount }) {
        id
        totalLiquidations
        totalMarginLiquidated
        feesPaidToSynthetix
        trades {
          id
        }
        pnl
      }
    }
  `;

  // Cleanup optional params
  if (typeof whereAccount === 'undefined') {
    query = query.replace('account: $whereAccount', '');
    query = query.replace('id: $whereAccount', '');
  }
  if (typeof whereIsLiquidated === 'undefined') {
    query = query.replace('isLiquidated: $whereIsLiquidated', '');
  }
  if (typeof whereMarket === 'undefined') {
    query = query.replace('market: $whereMarket', '');
  }
  if (typeof whereIsOpen === 'undefined') {
    query = query.replace('isOpen: $whereIsOpen', '');
  }
  if (typeof whereOpenedAt === 'undefined') {
    query = query.replace('openTimestamp_gt: $whereOpenedAt', '');
  }
  if (typeof whereClosedAt === 'undefined') {
    query = query.replace('closeTimestamp_lt: $whereClosedAt', '');
  }

  return {
    query,
    variables: {
      skip,
      orderBy,
      orderDirection,
      whereAccount,
      whereMarket,
      whereIsLiquidated,
      whereIsOpen,
      whereOpenedAt,
      whereClosedAt,
    },
  };
}

const refetchMore = async ({
  address,
  skip,
  filterOptions,
  sortConfig,
  marketData,
}: {
  address?: string;
  skip: number;
  filterOptions: FilterOptions;
  sortConfig: SortConfig;
  marketData:
    | {
        maxLeverage: string;
        marketKey: string;
        asset: string;
        id: string;
      }[]
    | undefined;
}) => {
  const [orderBy, orderDirection] = sortConfig;
  const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(
      getBody({
        skip,
        orderBy,
        orderDirection: !orderDirection ? 'desc' : 'asc',
        whereAccount:
          address || filterOptions.walletAddress
            ? (address || filterOptions.walletAddress).toLowerCase()
            : undefined,
        whereMarket:
          filterOptions.asset === 'all'
            ? undefined
            : marketData
                ?.find((m) => m.asset.toLowerCase() === filterOptions.asset.toLowerCase())
                ?.id.toLowerCase(),
        whereIsLiquidated: filterOptions.deactivateLiquidated
          ? undefined
          : filterOptions.liquidated,
        whereIsOpen: filterOptions.deactivateOpen ? undefined : filterOptions.open,
        whereOpenedAt: filterOptions.deactivateOpenedAt ? undefined : filterOptions.openedAt,
        whereClosedAt: filterOptions.deactivateClosedAt
          ? undefined
          : !filterOptions.deactivateOpen && !filterOptions.open
          ? filterOptions.closedAt
          : undefined,
      })
    ),
  });

  const { data }: GraphResponse = await response.json();

  if (!!data?.futuresPositions.length) {
    const moreRes = await refetchMore({
      filterOptions,
      sortConfig,
      address,
      skip: skip + 1000,
      marketData,
    });
    if (moreRes?.futuresPositions.length)
      data.futuresPositions = data.futuresPositions.concat(moreRes?.futuresPositions);
  }
  return data;
};

function useGetPositions({
  address,
  filterOptions,
  sortConfig,
}: {
  address?: string;
  filterOptions: FilterOptions;
  sortConfig: SortConfig;
}) {
  const { data: marketData } = useGetMarkets();
  return useQuery(
    [
      'positions',
      address?.toString(),
      filterOptions,
      sortConfig.toString(),
      marketData?.toString(),
    ],
    async () => {
      try {
        const data = await refetchMore({
          address,
          skip: 0,
          filterOptions,
          sortConfig,
          marketData,
        });

        return {
          futuresStats: data?.traders,
          futuresPositions: data?.futuresPositions
            .map((position) => ({
              ...position,
              maxLeverage:
                marketData?.find((d) => d.id.toLowerCase() === position.market.toLowerCase())
                  ?.maxLeverage || '0',
              asset:
                marketData?.find((d) => d.id.toLowerCase() === position.market.toLowerCase())
                  ?.asset || 'not found',
              market: formatMarketKey(
                marketData?.find((d) => d.id.toLowerCase() === position.market.toLowerCase())
                  ?.marketKey
              ),
              openTimestamp: new Date(parseInt(position.openTimestamp) * 1000).toLocaleDateString(
                navigator.language || 'en-US',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              ),
              closeTimestamp:
                position.closeTimestamp === null
                  ? '-'
                  : new Date(parseInt(position.openTimestamp) * 1000).toLocaleDateString(
                      navigator.language || 'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    ),
            }))
            .filter((position) =>
              address ? address === position.account : true
            ) as FuturePosition[],
        };
      } catch (error) {
        console.error(error);
        return { futuresPositions: [], futuresStats: [] };
      }
    }
  );
}

export default useGetPositions;

function formatMarketKey(market?: string) {
  if (!market) return 'not found';
  return market.slice(1).split('PERP').filter(Boolean).concat('PERP').join('-');
}
