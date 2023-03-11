import { gql } from '../__generated__';

export const FUTURES_TRADE_QUERY = gql(`
  query FuturesTrade($oneHourAgo: BigInt) {
    futuresTrades(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { timestamp_gt: $oneHourAgo, type_not: Unknown }
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
