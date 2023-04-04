import { gql } from '../__generated__';

export const POSITIONS_QUERY_MARKET = gql(`
  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
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
    }
  }
`);
