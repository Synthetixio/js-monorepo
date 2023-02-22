import { useQuery } from '@tanstack/react-query';
import { getSubgraphUrl } from '@snx-v3/Constants';
import { z } from 'zod';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';

const GraphBigIntSchema = z.string().transform((src) => wei(src));
const GraphBigDecimalSchema = z.string().transform((src) => wei(src));

const calculateMarketPnl = (netIssuance: Wei, reportedDebt: Wei) =>
  reportedDebt.add(netIssuance).mul(-1);

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
  name: z.union([z.string(), z.null()]).transform((name) => (name ? name : 'Unnamed Pool')),
  total_weight: z.union([z.null(), GraphBigIntSchema]),
  configurations: z.array(MarketConfigurationSchema),
});

export type PoolType = z.infer<typeof PoolSchema>;

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

export const usePoolData = (poolId?: string) => {
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, 'Pool', { pool: poolId }],
    queryFn: async () => {
      if (!poolId) throw Error('OMG!');
      const poolData = await getPoolData(network.name, poolId);
      if (!poolData.data.pool) {
        throw Error(`Pool ${poolId} not found`);
      }
      return poolData.data.pool;
    },
    enabled: Boolean(network.isSupported && poolId && parseInt(poolId) > 0),
  });
};
