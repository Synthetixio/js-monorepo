import { useRecoilState } from 'recoil';
import { chainIdState } from '../utils/state';
import { getChainNameById } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { parseEther } from 'ethers/lib/utils';
import { calculateMarketPnl } from '../utils/calculations';
import { getSubgraphUrl } from '../utils/subgraph';
import { BigNumber } from 'ethers';
import { values } from '../utils/typescript';

type GraphBigInt = string;
type GraphBigDecimal = string;
type RawMarketSnapshot = {
  id: string;
  market_id: string;
  //configurations: MarketConfiguration[] // recursive
  usd_deposited: GraphBigDecimal;
  usd_withdrawn: GraphBigDecimal;
  net_issuance: GraphBigDecimal; // withdrawn - deposited
  reported_debt: GraphBigDecimal;
  timestamp: GraphBigInt;
};

type MarketSnapshotsResult = {
  __typename?: 'Query';
  marketSnapshots?: RawMarketSnapshot[];
};

const gql = (data: TemplateStringsArray) => data[0];
const MarketSnapshotsResultDocument = gql`
    query MarketSnapshots($marketIds: String[], $afterTimestamp: Number) {
        marketSnapshots(where: {market_id_in: $marketIds, timestamp_gte: $afterTimestamp }) {
            id
            market_id
            usd_deposited
            usd_withdrawn
            net_issuance
            reported_debt
        }
    }
`;

const getMarketSnapshots = async (
  chainName: string,
  afterTimestamp: number,
  marketIds: string[]
) => {
  const res = await fetch(getSubgraphUrl(chainName || 'goerli'), {
    method: 'POST',
    body: JSON.stringify({
      query: MarketSnapshotsResultDocument,
      variables: { marketIds: marketIds, afterTimeStamp: afterTimestamp },
    }),
  });
  const json: { data: MarketSnapshotsResult; errors: Error[] } = await res.json();
  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }
  return json.data;
};
const formatGraphBigDecimal = parseEther;

const formatMarketSnapshot = (marketSnapshot: RawMarketSnapshot) => {
  const netIssuance = formatGraphBigDecimal(marketSnapshot.net_issuance);
  const reportedDebt = formatGraphBigDecimal(marketSnapshot.reported_debt);
  return {
    id: marketSnapshot.id,
    marketId: marketSnapshot.market_id,
    usdDeposited: formatGraphBigDecimal(marketSnapshot.usd_deposited),
    usdWithdrawn: formatGraphBigDecimal(marketSnapshot.usd_withdrawn),
    netIssuance,
    reportedDebt,
    pnl: calculateMarketPnl(netIssuance, reportedDebt),
  };
};

type MarketSnapshot = ReturnType<typeof formatMarketSnapshot>;

export const useGetMarketSnapshotsByMarketId = (afterTimestamp: number, marketIds?: string[]) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chainName = getChainNameById(localChainId);

  return useQuery(
    [marketIds?.toString(), afterTimestamp],
    async () => {
      if (!chainName || !marketIds) {
        throw Error('Query expected chainName and marketIds to be defined');
      }

      const { marketSnapshots = getMockData() } = await getMarketSnapshots(
        chainName,
        afterTimestamp,
        marketIds
      );
      const marketSnapshotsByMarketId = marketSnapshots
        ?.map(formatMarketSnapshot)
        .reduce((acc: Record<string, MarketSnapshot[] | undefined>, val) => {
          const snapshotsForMarket = acc[val.marketId.toString()];
          if (snapshotsForMarket) {
            snapshotsForMarket.push(val);
          } else {
            acc[val.marketId] = [val];
          }
          return acc;
        }, {});
      return marketSnapshotsByMarketId;
    },
    {
      enabled: Boolean(chainName) && Boolean(marketIds && marketIds.length > 0),
      staleTime: 60 * 60 * 1000,
    }
  );
};
type MarketSnapshotDataFields = Extract<
  keyof MarketSnapshot,
  'netIssuance' | 'pnl' | 'reportedDebt' | 'usdDeposited' | 'usdWithdrawn'
>;
export const calculateGrowthForKey = (
  key: MarketSnapshotDataFields,
  marketSnapshots?: MarketSnapshot[]
) => {
  if (!marketSnapshots || marketSnapshots.length < 3) return undefined;
  const first = marketSnapshots[0][key];
  const current = marketSnapshots[marketSnapshots.length - 1][key];
  const value = current.sub(first);
  const percentage = value.div(first);
  return { value, percentage };
};

export const calculateTotalGrowth = (
  key: MarketSnapshotDataFields,
  marketSnapshotById: Record<string, MarketSnapshot[] | undefined>
) => {
  const val = values(marketSnapshotById);
  const firstTotal = val.reduce((acc, val) => {
    return acc.add(val[0][key]);
  }, BigNumber.from(0));
  const currentTotal = val.reduce((acc, val) => {
    return acc.add(val[val.length - 1][key]);
  }, BigNumber.from(0));
  const value = currentTotal.sub(firstTotal);
  const percentage = value.div(firstTotal);
  return { value, percentage };
};

function getMockData() {
  return [
    {
      id: '1-1623456789',
      market_id: '1',
      usd_deposited: '100.45',
      usd_withdrawn: '40.76',
      net_issuance: '24.69',
      reported_debt: '456.78',
      timestamp: '1623450000',
    },
    {
      id: '1-1623456789',
      market_id: '1',
      usd_deposited: '123.45',
      usd_withdrawn: '98.76',
      net_issuance: '24.69',
      reported_debt: '456.78',
      timestamp: '1623456789',
    },
    {
      id: '2-1623456790',
      market_id: '2',
      usd_deposited: '234.56',
      usd_withdrawn: '321.98',
      net_issuance: '-87.42',
      reported_debt: '789.01',
      timestamp: '1623456790',
    },
  ];
}
