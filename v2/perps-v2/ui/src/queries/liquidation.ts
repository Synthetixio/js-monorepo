import { gql } from '../__generated__';

export const LIQUIDATION_QUERY = gql(`
  query PositionLiquidated {
    positionLiquidateds {
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
