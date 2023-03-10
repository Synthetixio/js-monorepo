import { gql } from '../__generated__';

export const POSITIONS_QUERY = gql(`
  query Positions($where: FuturesPosition_filter) {
    futuresPositions(where: $where) {
      id
      account
      isLiquidated
      market
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
