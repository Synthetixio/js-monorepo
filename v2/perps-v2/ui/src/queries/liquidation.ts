import { gql } from '../__generated__';

export const LIQUIDATION_QUERY = gql(`
  query PositionLiquidated {
    positionLiquidateds(id: "synthetix") {
      id
      account
      liquidator
      market
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
  }
`);
