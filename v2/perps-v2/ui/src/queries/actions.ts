import { gql } from '../__generated__';

export const MARGIN_TRANSFERED_QUERY = gql(`
  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter) {
    futuresMarginTransfers(
      first: 100
      orderBy: timestamp
      orderDirection: desc
      where: $where
    ) {
      id
      timestamp
      account
      market {
        asset
      }
      size
      txHash
    }
  }
`);

export const FUTURES_TRADE_QUERY = gql(`
  query FuturesTrades($where: FuturesTrade_filter) {
    futuresTrades(
      first: 100
      orderBy: timestamp
      orderDirection: desc
      where: $where
    ) {
      id
      timestamp
      account
      margin
      market {
        asset
      }
      positionId
      size
      feesPaidToSynthetix
      type
      pnl
      positionClosed
      positionSize
      price
      txHash
      futuresOrder {
        status
      }
    }
  }
`);

export const ACCOUNT_ACTIONS_QUERY = gql(`
  query AccountActions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      market {
        asset
      }
      isOpen
      openTimestamp
      lastPrice
      leverage
      size
      long
      trades
      feesPaidToSynthetix
      txHash
    }
  }
`);

export const ALL_ACTIONS_QUERY = gql(`
  query Actions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {
    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {
      id
      account
      market {
        asset
      }
      openTimestamp
      lastPrice
      leverage
      size
      long
      feesPaidToSynthetix
      txHash
    }
  }
`);
