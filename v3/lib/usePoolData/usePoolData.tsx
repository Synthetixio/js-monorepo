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
  name: z.union([z.string(), z.null()]).transform((name) => {
    if (!name) return 'Unnamed Pool';
    // TODO remove once new contract deployed
    return name.includes('�') ? 'Spartan Pool' : name;
  }),
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

export const usePoolData = (poolId?: string) => {
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, 'pool', { poolId }],
    queryFn: async () => {
      if (!network.name || !poolId) throw Error('OMG!');
      const poolData = await getPoolData(network.name, poolId);
      if (!poolData.data.pool) {
        return undefined;
      }
      return addMockData(poolData.data.pool);
    },
    enabled: Boolean(network.name && poolId),
  });
};

function addMockData(pool: Pool): Pool {
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
