import { useState, useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';

import { MARKETS_ID_QUERY } from '../queries/dashboard';
import * as z from 'zod';
import { scale } from '../utils';
import { utils } from 'ethers';
import { wei } from '@synthetixio/wei';
import { getMarketsPythConfig, prices, PythPrice } from '../utils/pyth';

const pythItemSchema = z.object({
  pythId: z.union([z.string(), z.undefined()]),
  marketKey: z.union([z.string(), z.undefined()]),
  conf: z.string(),
  expo: z.number(),
  price: z.string(),
  publishTime: z.number(),
});

const NumberStringSchema = z.string().refine((value) => !isNaN(parseFloat(value)), {
  message: 'Must be a number in string format',
  path: [],
});

export const ZodStringToWei = NumberStringSchema.transform((value) => wei(value, 18, true));

export const DataSchema = z.object({
  entryPrice: z.string(),
  id: z.string(),
  isOpen: z.boolean(),
  leverage: z.string(),
  long: z.boolean(),
  market: z.object({
    marketKey: z.string(),
    asset: z.string(),
  }),
  notionalValue: ZodStringToWei,
  pythItem: pythItemSchema,
  size: z.string(),
  trader: z.object({
    id: z.string(),
  }),
});

export type DataInterface = z.infer<typeof DataSchema>;

interface State {
  loading: boolean;
  data: DataInterface[] | null;
  error: unknown | null;
}

export function useLargestOpenPosition() {
  const client = useApolloClient();
  const [state, setState] = useState<State>({ loading: true, data: null, error: null });

  useEffect(() => {
    (async () => {
      try {
        const { data: marketsData } = await client.query({
          query: MARKETS_ID_QUERY,
        });
        const markets = await getMarketsPythConfig();

        const marketIds = marketsData?.futuresMarkets.map((market) => market.id) || [];

        const marketPyth =
          marketsData?.futuresMarkets
            .filter(({ marketKey }) => {
              return utils.parseBytes32String(marketKey).includes('PERP');
            })
            .map(({ marketKey }) => {
              const id = `${utils.parseBytes32String(marketKey)}`;
              const pythInfo = markets[id];

              if (pythInfo?.pythId) {
                return { pythId: pythInfo.pythId || '', marketKey } || null;
              }

              return null;
            })
            .filter((item) => item !== null) || [];

        const sizeQuery = generateOpenPositionsQuery(marketIds);
        const pythIds = marketPyth.map((item) => item?.pythId || '').filter((item) => item !== '');

        const { data: sizeData } = await client.query({ query: sizeQuery });

        // Attribute the pyth result to the market
        const hydratedPythResult = marketPyth?.map((item, index) => {
          const price: PythPrice = prices[pythIds[index].substring(2)];

          return {
            ...price,
            pythId: marketPyth[index]?.pythId || '',
            marketKey: marketPyth[index]?.marketKey,
          };
        });

        const sizeResult: DataInterface[] = Object.keys(sizeData)
          .map((key: string) => {
            const marketData = sizeData[key];

            if (!marketData || marketData.length === 0) return null;

            return marketData;
          })
          .filter((item) => item !== null)
          .flat()
          .map((item) => {
            const pythItem = hydratedPythResult?.find(
              (pythItem) => pythItem?.marketKey === item?.market?.marketKey
            );

            if (!pythItem) return null;

            const size = wei(item.size, 18, true);
            const price = scale(wei(pythItem.price), pythItem.expo);

            const notionalValue = size.mul(price).abs();

            return {
              notionalValue,
              ...item,
              pythItem,
            };
          })
          .filter((item) => item !== null)
          .sort((a, b) => {
            return b?.notionalValue?.sub(a?.notionalValue || 0).toNumber();
          })
          .slice(0, 3);

        setState({ loading: false, data: sizeResult, error: null });
      } catch (error: unknown) {
        console.log(error);
        setState({ loading: false, data: null, error });
      }
    })();
  }, [client]);

  return state;
}

export function generateOpenPositionsQuery(marketIds: string[]) {
  if (marketIds.length === 0)
    return gql(`
    query OpenPositionsQuery {
      futuresPositions(first: 3) {
        id
      }
    }
  `);
  const innerQuery = marketIds.map((marketId) => {
    return `
      Long${marketId}: futuresPositions(where: { market: "${marketId}", isOpen: true }, first: 3, orderBy: size, orderDirection: desc) {
        market {
          marketKey
          asset
        }
        trader {
          id
        }
        isOpen
        entryPrice
        leverage
        id
        long
        size
      }
      Short${marketId}: futuresPositions(where: { market: "${marketId}", isOpen: true }, first: 3, orderBy: size, orderDirection: asc) {
        market {
          marketKey
          asset
        }
        trader {
          id
        }
        isOpen
        entryPrice
        leverage
        id
        long
        size
      }
    `;
  });

  return gql(`
    query OpenPositionsQuery {
      ${innerQuery.join('\n')}
    }
  `);
}
