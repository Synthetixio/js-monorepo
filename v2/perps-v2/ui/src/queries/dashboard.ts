import { gql } from '../__generated__';

export const TRADES_QUERY = gql(`
  query TradesQuery($where: FuturesTrade_filter, $first: Int, $skip: Int, $orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {
    futuresTrades(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where, skip: $skip) {
      id
      timestamp
    }
  }
`);

export const LIQUIDATED_QUERY = gql(`
  query LiquidatedQuery($where: PositionLiquidated_filter, $orderBy: PositionLiquidated_orderBy, $orderDirection: OrderDirection) {
    positionLiquidateds(where: $where orderBy: $orderBy orderDirection: $orderDirection) {
      id
      trader {
        id
      }
      size
      market {
        asset
      }
      futuresPosition {
        margin
      }
    }
  }
`);

export const DAILY_STATS_QUERY = gql(`
  query StatsQuery($where: DailyStat_filter, $orderBy: DailyStat_orderBy, $orderDirection: OrderDirection, $first: Int, $skip: Int) {
    dailyStats(where: $where, orderBy: $orderBy, orderDirection: $orderDirection, first: $first, skip: $skip) {
      id
      timestamp
      cumulativeVolume
      volume
      fees
      cumulativeFees
      day
      existingTraders
      newTraders
      cumulativeTraders
      cumulativeTrades
      trades
    }
  }
`);

export const MARKETS_QUERY = gql(`
  query MarketsQuery($where: DailyMarketStat_filter, $orderBy: DailyMarketStat_orderBy, $orderDirection: OrderDirection, $first: Int, $skip: Int) {
    dailyMarketStats(where: $where, orderBy: $orderBy, orderDirection: $orderDirection, first: $first, skip: $skip) {
      id
      day
      market {
        id
        marketKey
        asset
        isActive
        timestamp
      }
      volume
    }
  }
`);

export const MARKETS_ID_QUERY = gql(`
  query MarketsIdQuery {
    futuresMarkets {
      id
      marketKey
    }
  }
`);
