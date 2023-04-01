import { gql } from '../__generated__';

export const TRADERS_QUERY = gql(`
  query Traders($where: Trader_filter) {
    traders(where: $where) {
      id
      trades {
        timestamp
      }
    }
  }
`);

export const LIQUIDATED_QUERY = gql(`
  query LiquidatedQuery($where: PositionLiquidated_filter, $orderBy: PositionLiquidated_orderBy, $orderDirection: OrderDirection) {
    positionLiquidateds(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      account
      size
      market {
        asset
      }
      futuresPosition {
        margin
      }
    }
  }
`);
