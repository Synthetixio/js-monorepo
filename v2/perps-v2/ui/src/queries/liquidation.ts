import { gql } from '../__generated__';

export const LIQUIDATION_QUERY = gql(`
  query PositionLiquidated($where: PositionLiquidated_filter) {
    positionLiquidateds(first: 100, where: $where) {
      id
      account
      liquidator
      market {
        asset
      }
      size
      price
      fee
      block
      txHash
      timestamp
      futuresPosition {
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
  }
`);
