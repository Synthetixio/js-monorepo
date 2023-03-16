import { gql } from '../__generated__';

export const SYNTHETIX_QUERY = gql(`
  query Synthetix {
    synthetix(id: "synthetix") {
      feesByLiquidations
      feesByPositionModifications
      totalVolume
      totalLiquidations
      totalTraders
    }
  }
`);
