import { gql } from '../__generated__';

export const POSITIONS_LIQUIDATED_QUERY = gql(`
  query PositionsLiquidated($where: PositionLiquidated_filter, $skip: Int, $first: Int, $orderBy: PositionLiquidated_orderBy, $orderDirection: OrderDirection) {
    positionLiquidateds(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      timestamp
      txHash
      size
      price
      futuresPosition {
        leverage
      }
      market {
        asset
      }
      fee
      liquidator
      trader {
        id
        totalLiquidations
      }
    }
  }
`);
