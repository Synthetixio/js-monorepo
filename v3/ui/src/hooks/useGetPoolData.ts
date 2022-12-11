import { useRecoilState } from 'recoil';
import { chainIdState } from '../utils/state';
import { getChainNameById } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { calculateMarketPnl } from '../utils/calculations';
import { formatGraphBigDecimal, getSubgraphUrl } from '../utils/subgraph';

type GraphBigInt = string;
type GraphBigDecimal = string;
type RawMarket = {
  id: string;
  address: string;
  //configurations: MarketConfiguration[] // recursive
  usd_deposited: GraphBigDecimal;
  usd_withdrawn: GraphBigDecimal;
  net_issuance: GraphBigDecimal; // withdrawn - deposited
  reported_debt: GraphBigDecimal;
};
type RawMarketConfiguration = {
  id: string; //PoolId-MarketId
  // Pool: Pool dont think typescript likes recursive types and we dont need it here, so lets not query the pool
  market: RawMarket;
  weight: GraphBigInt;
  max_debt_share_value: GraphBigDecimal;
};
type RawPool = {
  name?: string;
  total_weight: GraphBigInt;
  configurations: RawMarketConfiguration[];
};
type PoolDataResult = {
  __typename?: 'Query';
  pool?: RawPool;
};

const gql = (data: TemplateStringsArray) => data[0];
const PoolsDataDocument = gql`
  query pool($id: String) {
    pool(id: $id) {
      id
      configurations {
        id
        weight
        max_debt_share_value
        market {
          id
          address
          usd_deposited
          usd_withdrawn
          net_issuance
          reported_debt
        }
      }
    }
  }
`;

const formatPool = (pool: RawPool) => {
  const configurations = pool.configurations.map(({ id, weight, market, max_debt_share_value }) => {
    const netIssuance = formatGraphBigDecimal(market.net_issuance);
    const reportedDebt = formatGraphBigDecimal(market.reported_debt);

    return {
      id,
      weight: formatGraphBigDecimal(weight),
      maxDebtShareValue: formatGraphBigDecimal(max_debt_share_value),
      market: {
        id: market.id,
        address: market.address,
        usdDeposited: formatGraphBigDecimal(market.usd_deposited),
        usdWithdrawn: formatGraphBigDecimal(market.usd_withdrawn),
        netIssuance,
        reportedDebt,
        pnl: calculateMarketPnl(netIssuance, reportedDebt),
      },
    };
  });

  return {
    name: pool.name,
    totalWeight: formatGraphBigDecimal(pool.total_weight),
    configurations,
  };
};

const getPoolData = async (chainName: string, id: string) => {
  const res = await fetch(getSubgraphUrl(chainName), {
    method: 'POST',
    body: JSON.stringify({ query: PoolsDataDocument, variables: { id } }),
  });
  const json: { data: PoolDataResult; errors: Error[] } = await res.json();
  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }
  return json.data;
};

export type PoolData = ReturnType<typeof formatPool>;
export const useGetPoolData = (id?: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chainName = getChainNameById(localChainId);
  return useQuery(
    ['useGetPoolData', chainName],
    async () => {
      if (!chainName || !id) throw Error('Query expected chainName and id to be defined');
      const poolData = await getPoolData(chainName, id);
      const pool = poolData.pool || getMockData().pool;
      return pool ? formatPool(pool) : undefined;
    },
    { enabled: Boolean(chainName), staleTime: 10000 }
  );
};

function getMockData(): PoolDataResult {
  return {
    __typename: 'Query',
    pool: {
      name: 'Spartan Pool',
      total_weight: '100',
      configurations: [
        {
          id: 'pool123-market456',
          market: {
            id: 'market456',
            address: '0x123...',
            usd_deposited: '1000.00',
            usd_withdrawn: '500.00',
            net_issuance: '500.00',
            reported_debt: '10000.00',
          },
          weight: '50',
          max_debt_share_value: '500.00',
        },
        {
          id: 'pool123-market789',
          market: {
            id: 'market789',
            address: '0x456...',
            usd_deposited: '2000.00',
            usd_withdrawn: '1500.00',
            net_issuance: '500.00',
            reported_debt: '20000.00',
          },
          weight: '50',
          max_debt_share_value: '1000.00',
        },
      ],
    },
  };
}
