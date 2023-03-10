import { gql } from '../__generated__';

export const DELAYED_ORDERS_QUERY = gql(`
  query DelayedOrders {
    futuresOrders(first: 100, oderBy: "timestamp", orderDirection: "desc") {
      id
      size
      market
      account
      fee
      orderId
      targetRoundId
      targetPrice
      marginDelta
      timestamp
      positionId
      keeper
      status
      txHash
    }
  }
`);
