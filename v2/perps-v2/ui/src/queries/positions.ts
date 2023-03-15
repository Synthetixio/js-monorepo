import { gql } from '../__generated__';

export const POSITIONS_QUERY_MARKET = gql(`
  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      market {
        marketKey
      }
    }
  }
`);

export const POSITIONS_QUERY = gql(`
  query Positions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      account
      isLiquidated
      market {
        asset
      }
      isOpen
      openTimestamp
      closeTimestamp
      margin
      initialMargin
      entryPrice
      lastPrice
      pnl
      exitPrice
      leverage
      size
      long
      trades
      totalVolume
      feesPaidToSynthetix
      txHash
    }
  }
`);
