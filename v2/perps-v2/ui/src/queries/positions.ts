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

const body = ({
  filterOptions,
  sortConfig,
  market,
  address,
  skip,
}: {
  filterOptions: FilterOptions;
  sortConfig: SortConfig;
  market:
    | {
        maxLeverage: string;
        marketKey: string;
        asset: string;
        id: string;
      }[]
    | undefined;
  address?: string;
  skip?: number;
}) => {
  return `query info {
    futuresPositions(skip: ${skip}, first: 1000,
      orderBy: "${sortConfig[0]}", orderDirection: "${!sortConfig[1] ? 'desc' : 'asc'}", where: {
    ${
      address || filterOptions.walletAddress
        ? `account: "${
            address ? address.toLowerCase() : filterOptions.walletAddress.toLowerCase()
          }",`
        : ''
    }
    ${
      filterOptions.asset === 'all'
        ? ''
        : `market: "${market
            ?.find((m) => m.asset.toLowerCase() === filterOptions.asset.toLowerCase())
            ?.id.toLowerCase()}"`
    },
    ${filterOptions.deactivateLiquidated ? '' : `isLiquidated: ${filterOptions.liquidated},`}
    ${filterOptions.deactivateOpen ? '' : `isOpen: ${filterOptions.open},`}
    ${filterOptions.deactivateOpenedAt ? '' : `openTimestamp_gt: "${filterOptions.openedAt}",`}
    ${
      filterOptions.deactivateClosedAt
        ? ''
        : !filterOptions.deactivateOpen && !filterOptions.open
        ? `closeTimestamp_lt: "${filterOptions.closedAt}"`
        : ''
    }
  }) {
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
    traders(first: 1, where: {${address ? `id: "${address.toLowerCase()}",` : ''}}) {
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
};

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
  const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
    method: 'POST',
    body: JSON.stringify({
      query: body({
        filterOptions,
        sortConfig,
        market: marketData,
        skip,
        address: address?.toLowerCase(),
      }),
    }),
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
              market: marketData?.find((d) => d.id.toLowerCase() === position.market.toLowerCase())
                ?.marketKey,
              openTimestamp: toDateTime(Number(position.openTimestamp)).toLocaleDateString(
                'en-US',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              ),
              closeTimestamp:
                position.closeTimestamp === null
                  ? '-'
                  : toDateTime(Number(position.closeTimestamp)).toLocaleDateString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
            }))
            .filter((position) => {
              if (address) {
                if (address === position.account) return true;
                return false;
              }
              return true;
            }) as FuturePosition[],
        };
      } catch (error) {
        console.error(error);
        return { futuresPositions: [], futuresStats: [] };
      }
    }
  );
}

export default useGetPositions;

function toDateTime(secs: number) {
  const t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
}
