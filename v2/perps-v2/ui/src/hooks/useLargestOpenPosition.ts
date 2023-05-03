import { useState, useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { MARKETS_ID_QUERY } from '../queries/dashboard';
import { FuturesMarketKey, MARKETS } from '../utils';
import { utils } from 'ethers';

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
            .map(({ marketKey }) => {
              const id = `${utils.parseBytes32String(marketKey)}` as FuturesMarketKey;
              const pythInfo = MARKETS[id];

              if (pythInfo) {
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

        // Attribute the pyth price to the market and the size result
        if (sizeData && Object.keys(sizeData)) {
          const data = Object?.keys(sizeData).map((key: string) => {
            // 1. Get the data for this key
            const marketData = sizeData[key];

            if (!marketData || marketData.length === 0) return null;
          });
        }

        console.log('Thing is', sizeData, result);
      } catch (error: unknown) {
        setState({ loading: false, data: undefined, error });
      }
    })();
  }, [client]);

  // if (data) {
  //   const keys = Object.keys(data);

  //   keys.forEach((key) => {
  //     if (data[key].length > 0) result.push(data[key]);
  //   });
  // }

  // // Loop over result and sort by the absolute value of size
  // result = result.sort;
  // console.log(data, loading, error, result);

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
