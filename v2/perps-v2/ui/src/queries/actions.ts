import { gql } from '../__generated__';

export const MARGIN_TRANSFERRED_QUERY = gql(`
  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter, $first: Int,$orderBy: FuturesMarginTransfer_orderBy, $orderDirection: OrderDirection) {
    futuresMarginTransfers(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      timestamp
      trader {
        id
      }
      market {
        asset
      }
      size
      txHash
    }
  }
`);

export const FUTURES_TRADE_QUERY = gql(`
  query FuturesTrades($where: FuturesTrade_filter, $first: Int, $orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {
    futuresTrades(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      timestamp
      trader {
        id
      }
      margin
      market {
        id
        asset
      }
      futuresPosition {
        id
      }
      size
      feesPaidToSynthetix
      type
      realizedPnl
      positionClosed
      positionSize
      price
      txHash
    }
  }
`);

// export const ACCOUNT_ACTIONS_QUERY = gql(`
//   query AccountActions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
//     futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
//       id
//       market {
//         asset
//       }
//       isOpen
//       openTimestamp
//       lastPrice
//       leverage
//       size
//       long
//       trades
//       feesPaidToSynthetix
//       txHash
//     }
//   }
// `);

// export const ALL_ACTIONS_QUERY = gql(`
//   query Actions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
//     futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
//       id
//       account
//       market {
//         asset
//       }
//       openTimestamp
//       lastPrice
//       leverage
//       size
//       long
//       feesPaidToSynthetix
//       txHash
//     }
//   }
// `);
