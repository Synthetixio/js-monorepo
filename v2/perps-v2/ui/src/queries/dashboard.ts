import { gql } from '../__generated__';

export const TRADERS_QUERY = gql(`
  query TradersQuery($where: FuturesTrade_filter, $orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection, $first: Int, $skip: Int) {
    futuresTrades(where: $where, orderBy: $orderBy, orderDirection: $orderDirection, first: $first, skip: $skip) {
      id
      trader {
        id
        timestamp
      }
    }
  }
`);

export const TRADES_QUERY = gql(`
  query TradesQuery($where: FuturesTrade_filter, $first: Int, $skip: Int, $orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {
    futuresTrades(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where, skip: $skip) {
      id
      timestamp
    }
  }
`);

export const LIQUIDATED_QUERY = gql(`
  query LiquidatedQuery($where: PositionLiquidated_filter, $orderBy: PositionLiquidated_orderBy, $orderDirection: OrderDirection) {
    positionLiquidateds(where: $where orderBy: $orderBy orderDirection: $orderDirection) {
      id
      trader {
        id
      }
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
