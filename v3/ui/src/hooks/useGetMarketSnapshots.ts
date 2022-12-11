import { useRecoilState } from 'recoil';
import { chainIdState } from '../utils/state';
import { getChainNameById } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { parseEther } from 'ethers/lib/utils';
import { calculateMarketPnl } from '../utils/calculations';
import { getSubgraphUrl } from '../utils/subgraph';

type GraphBigInt = string;
type GraphBigDecimal = string;
type RawMarketSnapshot = {
  id: string;
  marketId: string;
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
    query marketSnapshots($marketIds: string[], $afterTimestamp: string) {
        marketSnapshots(where: {market_in: $marketIds, timestamp_gte: $afterTimestamp }) {
            id
            marketId
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
    marketId: marketSnapshot.marketId,
    usdDeposited: formatGraphBigDecimal(marketSnapshot.usd_deposited),
    usdWithdrawn: formatGraphBigDecimal(marketSnapshot.usd_withdrawn),
    netIssuance,
    reportedDebt,
    pnl: calculateMarketPnl(netIssuance, reportedDebt),
  };
};

type MarketSnapshot = ReturnType<typeof formatMarketSnapshot>;

export const useGetMarketSnapshotsByMarketId = (marketIds: string[], afterTimestamp: number) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chainName = getChainNameById(localChainId);

  return useQuery(
    [marketIds.toString(), afterTimestamp],
    async () => {
      if (!chainName) throw Error('Query expected chainName to be defined');

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
    { enabled: Boolean(chainName) && marketIds.length > 0, staleTime: 60 * 60 * 1000 }
  );
};
type MarketSnapshotDataFields = Extract<
  keyof MarketSnapshot,
  'netIssuance' | 'pnl' | 'reportedDebt' | 'usdDeposited' | 'usdWithdrawn'
>;
export const calculateGrowthForKey = (
  key: MarketSnapshotDataFields,
  marketSnapshots: MarketSnapshot[]
) => {
  if (marketSnapshots.length < 3) return undefined;
  const first = marketSnapshots[0][key];
  const current = marketSnapshots[marketSnapshots.length - 1][key];
  return current.sub(first).div(first);
};

function getMockData() {
  return [
    {
      id: '1-1623456789',
      marketId: '1',
      usd_deposited: '123.45',
      usd_withdrawn: '98.76',
      net_issuance: '24.69',
      reported_debt: '456.78',
      timestamp: '1623456789',
    },
    {
      id: '2-1623456790',
      marketId: '2',
      usd_deposited: '234.56',
      usd_withdrawn: '321.98',
      net_issuance: '-87.42',
      reported_debt: '789.01',
      timestamp: '1623456790',
    },
  ];
}
