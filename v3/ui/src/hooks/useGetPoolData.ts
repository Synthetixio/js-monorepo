import { useRecoilState } from 'recoil';
import { chainIdState } from '../utils/state';
import { getChainNameById } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';
import { calculateMarketPnl } from '../utils/calculations';
import { formatGraphBigDecimal, getSubgraphUrl } from '../utils/subgraph';
import { z } from 'zod';
import { BigNumber } from 'ethers';

const GraphBigIntSchema = z.string().transform((src) => formatGraphBigDecimal(src));
const GraphBigDecimalSchema = z.string().transform((src) => formatGraphBigDecimal(src));

export const MarketSnapshotByWeekSchema = z
  .object({
    id: z.string(),
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    created_at: z.number(),
    updated_at: z.number(),
    updates_in_period: z.number(),
  })
  .transform((market) => ({
    ...market,
    pnl: calculateMarketPnl(market.net_issuance, market.reported_debt),
  }));

const MarketSchema = z
  .object({
    id: z.string(),
    address: z.string(),
    //configurations: MarketConfiguration[] // recursive
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    created_at: z.number(),
    updated_at: z.number(),
    market_snapshot_by_week: z.array(MarketSnapshotByWeekSchema),
  })
  .transform((market) => ({
    ...market,
    pnl: calculateMarketPnl(market.net_issuance, market.reported_debt),
  }));

const MarketConfigurationSchema = z.object({
  id: z.string(), //PoolId-MarketId
  // Pool: Pool dont think typescript likes recursive types and we dont need it here, so lets not query the pool
  market: MarketSchema,
  weight: GraphBigIntSchema,
  max_debt_share_value: GraphBigDecimalSchema,
});
export const PoolSchema = z.object({
  name: z.string(),
  total_weight: GraphBigIntSchema,
  configurations: z.array(MarketConfigurationSchema),
});

const PoolDataResultSchema = z.object({
  data: z.object({
    pool: z.union([PoolSchema, z.null()]),
  }),
});

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
          market_snapshots_by_week(first: 2) {
            id
            usd_deposited
            usd_withdrawn
            net_issuance
            reported_debt
            updated_at
            created_at
            updates_in_period
          }
        }
      }
    }
  }
`;

const getPoolData = async (chainName: string, id: string) => {
  const res = await fetch(getSubgraphUrl(chainName), {
    method: 'POST',
    body: JSON.stringify({ query: PoolsDataDocument, variables: { id } }),
  });
  const json = await res.json();
  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }
  return PoolDataResultSchema.parse(json.data);
};

export const useGetPoolData1 = (id?: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chainName = getChainNameById(localChainId);
  return useQuery(
    ['useGetPoolData', chainName],
    async () => {
      if (!chainName || !id) throw Error('Query expected chainName and id to be defined');
      const poolData = await getPoolData(chainName, id);
      const pool = poolData.data.pool || getMockData();
      return pool;
    },
    { enabled: Boolean(chainName && id), staleTime: 1 }
  );
};

function getMockData(): z.infer<typeof PoolSchema> {
  return {
    name: 'Spartan Pool',
    total_weight: BigNumber.from('100'),
    configurations: [
      {
        id: 'pool123-market456',
        market: {
          id: 'market456',
          address: '0x123...',
          usd_deposited: BigNumber.from('1000.00'),
          usd_withdrawn: BigNumber.from('500.00'),
          net_issuance: BigNumber.from('500.00'),
          reported_debt: BigNumber.from('10000.00'),
          pnl: BigNumber.from(9500),
          created_at: 1,
          updated_at: 1,
          market_snapshot_by_week: [
            {
              id: '213',
              usd_deposited: BigNumber.from('1000.00'),
              usd_withdrawn: BigNumber.from('500.00'),
              net_issuance: BigNumber.from('500.00'),
              reported_debt: BigNumber.from('10000.00'),
              pnl: BigNumber.from('-9500'),
              created_at: 1,
              updated_at: 1,
              updates_in_period: 2,
            },
            {
              id: '213',
              usd_deposited: BigNumber.from('1000.00'),
              usd_withdrawn: BigNumber.from('500.00'),
              net_issuance: BigNumber.from('500.00'),
              reported_debt: BigNumber.from('100.00'),
              pnl: BigNumber.from('400'),
              created_at: 1,
              updated_at: 1,
              updates_in_period: 2,
            },
          ],
        },
        weight: BigNumber.from('50'),
        max_debt_share_value: BigNumber.from('500.00'),
      },
      {
        id: 'pool123-market789',
        market: {
          id: 'market456',
          address: '0x123...',
          usd_deposited: BigNumber.from('1000.00'),
          usd_withdrawn: BigNumber.from('500.00'),
          net_issuance: BigNumber.from('500.00'),
          reported_debt: BigNumber.from('10000.00'),
          pnl: BigNumber.from(9500),
          created_at: 1,
          updated_at: 1,
          market_snapshot_by_week: [
            {
              id: '213',
              usd_deposited: BigNumber.from('1000.00'),
              usd_withdrawn: BigNumber.from('500.00'),
              net_issuance: BigNumber.from('500.00'),
              reported_debt: BigNumber.from('10000.00'),
              pnl: BigNumber.from('-9500'),
              created_at: 1,
              updated_at: 1,
              updates_in_period: 2,
            },
            {
              id: '213',
              usd_deposited: BigNumber.from('1000.00'),
              usd_withdrawn: BigNumber.from('500.00'),
              net_issuance: BigNumber.from('500.00'),
              reported_debt: BigNumber.from('100.00'),
              pnl: BigNumber.from('400'),
              created_at: 1,
              updated_at: 1,
              updates_in_period: 2,
            },
          ],
        },
        weight: BigNumber.from('50'),
        max_debt_share_value: BigNumber.from('500.00'),
      },
    ],
  };
}
