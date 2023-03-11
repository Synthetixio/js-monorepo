import { gql } from '../__generated__';

export const MARGIN_TRANSFERED_QUERY = gql(`
  query FuturesMarginTransfer($oneHourAgo: BigInt) {
    futuresMarginTransfers(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { timestamp_gt: $oneHourAgo }
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
