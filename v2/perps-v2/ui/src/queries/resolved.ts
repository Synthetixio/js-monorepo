import { Resolvers, gql } from '@apollo/client';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import Wei, { wei } from '@synthetixio/wei';
import { utils } from 'ethers';
import { fetchPositions } from '../hooks';
import { notNill } from '../utils/notNil';
import { scale, calculatePositionData, getMarketsPythConfig } from '../utils';

export const POSITIONS_CONTRACT_QUERY = gql(`
  query ($openPositions: PositionsMarketQuery) {
    positionsFromContract(openPositions: $openPositions) @client
  }
`);

interface PositionData {
  asset: string;
  indexPrice: Wei;
  liquidationPrice: Wei;
  unrealizedPnl: Wei;
  realizedPnl: Wei;
  unrealizedPnlPercentage: Wei;
  remainingMargin: Wei;
  size: Wei;
  long: boolean;
  avgEntryPrice: Wei;
  leverage: Wei;
  funding: Wei;
  marketPrice: Wei;
  notionalValue: Wei;
  fees: Wei;
  address: string;
}

// TODO: Figure out return type
export const typeDefs = gql(`
  extend type Query {
    positionsFromContract(openPositions: PositionsMarketQuery): String!
  }
`);

const pyth = new EvmPriceServiceConnection('https://xc-mainnet.pyth.network');

export const resolvers: Resolvers | Resolvers[] = {
  Query: {
    positionsFromContract: async (
      _parent,
      { openPositions },
      { provider },
      _info
    ): Promise<PositionData[]> => {
      const positionsData = await fetchPositions(openPositions, provider);
      const offchainPrices: { asset: string; price: Wei }[] = [];
      const pythConfigByMarketKey = await getMarketsPythConfig();
      await Promise.all(
        openPositions.map(async ({ market, asset }: { market: string; asset: string }) => {
          const marketId = utils.parseBytes32String(market);

          const feedData = await pyth.getLatestPriceFeeds([
            `${pythConfigByMarketKey[marketId].pythId}`,
          ]);

          if (feedData && feedData.length > 0) {
            const price = feedData[0].getPriceUnchecked();
            offchainPrices.push({ asset, price: scale(wei(price.price), price.expo) });
          }
        })
      );

      return positionsData

        .map((contractData, index) => {
          const subgraphData = openPositions[index];
          const pythPrice = offchainPrices.find((item) => item.asset === subgraphData?.asset);

          const calculatedPositionData = calculatePositionData(
            subgraphData,
            pythPrice?.price,
            contractData
          );

          return calculatedPositionData;
        })

        .filter(notNill);
    },
  },
};
