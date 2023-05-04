import { useState, useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { MARKETS_ID_QUERY } from '../queries/dashboard';
import { FuturesMarketKey, MARKETS, scale } from '../utils';
import { utils } from 'ethers';
import { wei } from '@synthetixio/wei';

const pyth = new EvmPriceServiceConnection('https://xc-mainnet.pyth.network');

interface State {
  loading: boolean;
  data: any;
  error: unknown | null;
}

export function useLargestOpenPosition() {
  const client = useApolloClient();
  const [state, setState] = useState<State>({ loading: true, data: undefined, error: null });

  useEffect(() => {
    (async () => {
      try {
        const { data: marketsData } = await client.query({
          query: MARKETS_ID_QUERY,
        });

        const marketIds = marketsData?.futuresMarkets.map((market) => market.id) || [];

        const marketPyth =
          marketsData?.futuresMarkets
            .filter(({ marketKey }) => {
              return utils.parseBytes32String(marketKey).includes('PERP');
            })
            .map(({ marketKey }) => {
              const id = `${utils.parseBytes32String(marketKey)}` as FuturesMarketKey;
              const pythInfo = MARKETS[id];

              if (pythInfo.pythIds?.mainnet) {
                return { pythId: pythInfo.pythIds?.mainnet || '', marketKey } || null;
              }

              return null;
            })
            .filter((item) => item !== null) || [];

        const sizeQuery = generateOpenPositionsQuery(marketIds);
        const pythIds = marketPyth.map((item) => item?.pythId || '').filter((item) => item !== '');

        const [{ data: sizeData }, result] = await Promise.all([
          await client.query({ query: sizeQuery }),
          await pyth.getLatestPriceFeeds(pythIds),
        ]);

        // Attribute the pyth result to the market
        const hydratedPythResult = result?.map((item, index) => {
          const price = item.getPriceUnchecked();
          return {
            ...price,
            pythId: marketPyth[index]?.pythId,
            marketKey: marketPyth[index]?.marketKey,
          };
        });

        const sizeResult = Object.keys(sizeData)
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
          .sort((a, b) => {
            return b?.notionalValue?.sub(a?.notionalValue || 0).toNumber();
          })
          .slice(0, 3);

        setState({ loading: false, data: sizeResult, error: null });
      } catch (error: unknown) {
        setState({ loading: false, data: undefined, error });
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
          id
          marketKey
          asset
        }
        trader {
          id
        }
        isOpen
        entryPrice
        avgEntryPrice
        leverage
        feesPaidToSynthetix
        id
        realizedPnl
        unrealizedPnl
        feesPaidToSynthetix
        lastPrice
        netFunding
        long
        size
      }
      Short${marketId}: futuresPositions(where: { market: "${marketId}", isOpen: true }, first: 3, orderBy: size, orderDirection: asc) {
        market {
          id
          marketKey
          asset
        }
        trader {
          id
        }
        isOpen
        entryPrice
        avgEntryPrice
        leverage
        feesPaidToSynthetix
        id
        realizedPnl
        unrealizedPnl
        feesPaidToSynthetix
        lastPrice
        netFunding
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
