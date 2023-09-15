import { Resolvers, gql } from '@apollo/client';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import Wei, { wei } from '@synthetixio/wei';
import { utils } from 'ethers';
import { fetchPositions } from '../hooks';
import { notNill } from '../utils/notNil';
import { scale, calculatePositionData, getMarketsPythConfig } from '../utils';

export const POSITIONS_CONTRACT_QUERY = gql(`
  query ($walletAddress: String!, $openPositions: PositionsMarketQuery) {
    positionsFromContract(walletAddress: $walletAddress, openPositions: $openPositions) @client
  }
`);

// TODO: Figure out return type
export const typeDefs = gql(`
  extend type Query {
    positionsFromContract(walletAddress: String!, openPositions: PositionsMarketQuery): String!
  }
`);

const pyth = new EvmPriceServiceConnection('https://xc-mainnet.pyth.network');

export const resolvers: Resolvers | Resolvers[] = {
  Query: {
    positionsFromContract: async (
      _parent,
      { walletAddress, openPositions },
      _contextValue,
      _info
    ) => {
      const positionsData = await fetchPositions(openPositions, walletAddress || '');
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
            contractData,
            walletAddress
          );

          return calculatedPositionData;
        })

        .filter(notNill);
    },
  },
};
