import { gql } from '../__generated__';

export const MARGIN_TRANSFERED_QUERY = gql(`
  query FuturesMarginTransfer($oneHourAgo: Int) {
    futuresMarginTransfers(
      first: 1000
      oderBy: "timestamp"
      orderDirection: "desc"
      where: { timestamp_gt: $oneHourAgo }
    ) {
      id
      timestamp
      account
      market
      size
      txHash
    }
  }
`);
