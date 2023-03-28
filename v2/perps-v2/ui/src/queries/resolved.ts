import { Resolvers, gql } from '@apollo/client';
import { fetchPositions, notNill } from '../hooks';
import { calculatePositionData } from '../utils/calculations';

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

export const resolvers: Resolvers | Resolvers[] = {
  Query: {
    positionsFromContract: async (
      _parent,
      { walletAddress, openPositions },
      _contextValue,
      _info
    ) => {
      const positionsData = await fetchPositions(openPositions, walletAddress || '');

      return positionsData
        .map((contractData, index) => {
          const calculatedPositionData = calculatePositionData(
            openPositions[index],
            contractData,
            walletAddress
          );
          return calculatedPositionData;
        })
        .filter(notNill);
    },
  },
};
