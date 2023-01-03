import { useQuery } from '@tanstack/react-query';
import { calculateMarketPnl } from '../utils/calculations';
import { formatGraphBigDecimal, getSubgraphUrl } from '../utils/subgraph';
import { z } from 'zod';
import { wei } from '@synthetixio/wei';
import { useProvider } from 'wagmi';

const GraphBigIntSchema = z.string().transform((src) => formatGraphBigDecimal(src));
const GraphBigDecimalSchema = z.string().transform((src) => formatGraphBigDecimal(src));

export const MarketSnapshotByWeekSchema = z
  .object({
    id: z.string(),
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    updated_at: z.string(),
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
    usd_deposited: GraphBigDecimalSchema,
    usd_withdrawn: GraphBigDecimalSchema,
    net_issuance: GraphBigDecimalSchema, // withdrawn - deposited
    reported_debt: GraphBigDecimalSchema,
    updated_at: z.string(),
    market_snapshots_by_week: z.array(MarketSnapshotByWeekSchema),
  })
  .transform((market) => ({
    ...market,
    pnl: calculateMarketPnl(market.net_issuance, market.reported_debt),
  }));

const MarketConfigurationSchema = z.object({
  id: z.string(), //PoolId-MarketId
  market: MarketSchema,
  weight: GraphBigIntSchema,
  max_debt_share_value: GraphBigDecimalSchema,
});
export const PoolSchema = z.object({
  id: z.string(),
  name: z.union([z.string(), z.null()]),
  total_weight: GraphBigIntSchema,
  configurations: z.array(MarketConfigurationSchema),
});
export type Pool = z.infer<typeof PoolSchema>;

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
      name
      total_weight
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
          updated_at
          market_snapshots_by_week(first: 2) {
            id
            usd_deposited
            usd_withdrawn
            net_issuance
            reported_debt
            updated_at
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
  return PoolDataResultSchema.parse(json);
};

export const useGetPoolData = (id?: string) => {
  const provider = useProvider();
  const chainName = provider.network.name;

  return useQuery({
    queryKey: ['useGetPoolData', chainName, id],
    queryFn: async () => {
      if (!chainName || !id) throw Error('Query expected chainName and id to be defined');
      const poolData = await getPoolData(chainName, id);
      const pool = addMockData(poolData.data.pool);
      return pool;
    },
    enabled: Boolean(chainName && id),
    staleTime: 10000,
  });
};

function addMockData(pool: Pool | null): Pool | null {
  if (!pool) return null;
  const usd_withdrawn = wei('1500');
  const usd_deposited = wei('1000');
  const net_issuance = usd_withdrawn.sub(usd_deposited);
  const reported_debt = wei('100');
  const market = pool.configurations[0].market;
  const fakeMarket: z.infer<typeof MarketSchema> = {
    ...market,
    usd_withdrawn,
    usd_deposited,
    net_issuance,
    reported_debt,
    pnl: calculateMarketPnl(net_issuance, reported_debt),
    market_snapshots_by_week: [
      {
        id: '2',
        usd_withdrawn,
        usd_deposited,
        net_issuance,
        reported_debt,
        pnl: calculateMarketPnl(net_issuance, reported_debt),
        updated_at: market.updated_at,
        updates_in_period: 2,
      },
      {
        id: '1',
        usd_withdrawn: wei('1000'),
        usd_deposited: wei('1500'),
        net_issuance: wei('500'),
        reported_debt: wei('50'),
        pnl: calculateMarketPnl(wei('500'), wei('400')),
        updated_at: market.updated_at,
        updates_in_period: 2,
      },
    ],
  };
  pool.configurations[0].market = fakeMarket;
  return pool;
}
