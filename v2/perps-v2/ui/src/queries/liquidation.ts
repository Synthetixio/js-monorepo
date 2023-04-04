// import { gql } from '../__generated__';

// export const LIQUIDATION_QUERY = gql(`
//   query PositionLiquidated($where: PositionLiquidated_filter,$first: Int, $orderBy: PositionLiquidated_orderBy, $orderDirection: OrderDirection) {
//     positionLiquidateds( where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
//       id
//       account
//       liquidator
//       market {
//         asset
//       }
//       size
//       price
//       fee
//       block
//       txHash
//       timestamp
//       futuresPosition {
//         id
//         account
//         isLiquidated
//         market {
//           asset
//         }
//         isOpen
//         openTimestamp
//         closeTimestamp
//         margin
//         initialMargin
//         entryPrice
//         lastPrice
//         pnl
//         exitPrice
//         leverage
//         size
//         long
//         trades
//         totalVolume
//         feesPaidToSynthetix
//         txHash
//       }
//     }
//   }
// `);
