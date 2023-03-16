/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter) {\n    futuresMarginTransfers(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n':
    types.FuturesMarginTransferDocument,
  '\n  query FuturesTrades($where: FuturesTrade_filter) {\n    futuresTrades(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      margin\n      market {\n        asset\n      }\n      positionId\n      size\n      feesPaidToSynthetix\n      type\n      pnl\n      positionClosed\n      positionSize\n      price\n      txHash\n      futuresOrder {\n        status\n      }\n    }\n  }\n':
    types.FuturesTradesDocument,
  '\n  query AccountActions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      trades\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n':
    types.AccountActionsDocument,
  '\n  query Actions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      market {\n        asset\n      }\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n':
    types.ActionsDocument,
  '\n  query DelayedOrders {\n    futuresOrders(first: 100, orderBy: timestamp, orderDirection: desc) {\n      id\n      size\n      market {\n        asset\n      }\n      account\n      fee\n      orderId\n      targetRoundId\n      targetPrice\n      marginDelta\n      timestamp\n      positionId\n      keeper\n      status\n      txHash\n    }\n  }\n':
    types.DelayedOrdersDocument,
  '\n  query PositionLiquidated($where: PositionLiquidated_filter) {\n    positionLiquidateds(first: 100, where: $where) {\n      id\n      account\n      liquidator\n      market {\n        asset\n      }\n      size\n      price\n      fee\n      block\n      txHash\n      timestamp\n      futuresPosition {\n        id\n        account\n        isLiquidated\n        market {\n          asset\n        }\n        isOpen\n        openTimestamp\n        closeTimestamp\n        margin\n        initialMargin\n        entryPrice\n        lastPrice\n        pnl\n        exitPrice\n        leverage\n        size\n        long\n        trades\n        totalVolume\n        feesPaidToSynthetix\n        txHash\n      }\n    }\n  }\n':
    types.PositionLiquidatedDocument,
  '\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        marketKey\n        asset\n      }\n      entryPrice\n      leverage\n      id\n    }\n  }\n':
    types.PositionsMarketDocument,
  '\n  query Positions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n':
    types.PositionsDocument,
  '\n  query Position($id: ID!) {\n    futuresPosition(id: $id) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n':
    types.PositionDocument,
  '\n  query Synthetix {\n    synthetix(id: "synthetix") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n':
    types.SynthetixDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter) {\n    futuresMarginTransfers(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter) {\n    futuresMarginTransfers(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FuturesTrades($where: FuturesTrade_filter) {\n    futuresTrades(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      margin\n      market {\n        asset\n      }\n      positionId\n      size\n      feesPaidToSynthetix\n      type\n      pnl\n      positionClosed\n      positionSize\n      price\n      txHash\n      futuresOrder {\n        status\n      }\n    }\n  }\n'
): (typeof documents)['\n  query FuturesTrades($where: FuturesTrade_filter) {\n    futuresTrades(\n      first: 100\n      orderBy: timestamp\n      orderDirection: desc\n      where: $where\n    ) {\n      id\n      timestamp\n      account\n      margin\n      market {\n        asset\n      }\n      positionId\n      size\n      feesPaidToSynthetix\n      type\n      pnl\n      positionClosed\n      positionSize\n      price\n      txHash\n      futuresOrder {\n        status\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query AccountActions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      trades\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query AccountActions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      trades\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Actions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      market {\n        asset\n      }\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query Actions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      market {\n        asset\n      }\n      openTimestamp\n      lastPrice\n      leverage\n      size\n      long\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query DelayedOrders {\n    futuresOrders(first: 100, orderBy: timestamp, orderDirection: desc) {\n      id\n      size\n      market {\n        asset\n      }\n      account\n      fee\n      orderId\n      targetRoundId\n      targetPrice\n      marginDelta\n      timestamp\n      positionId\n      keeper\n      status\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query DelayedOrders {\n    futuresOrders(first: 100, orderBy: timestamp, orderDirection: desc) {\n      id\n      size\n      market {\n        asset\n      }\n      account\n      fee\n      orderId\n      targetRoundId\n      targetPrice\n      marginDelta\n      timestamp\n      positionId\n      keeper\n      status\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query PositionLiquidated($where: PositionLiquidated_filter) {\n    positionLiquidateds(first: 100, where: $where) {\n      id\n      account\n      liquidator\n      market {\n        asset\n      }\n      size\n      price\n      fee\n      block\n      txHash\n      timestamp\n      futuresPosition {\n        id\n        account\n        isLiquidated\n        market {\n          asset\n        }\n        isOpen\n        openTimestamp\n        closeTimestamp\n        margin\n        initialMargin\n        entryPrice\n        lastPrice\n        pnl\n        exitPrice\n        leverage\n        size\n        long\n        trades\n        totalVolume\n        feesPaidToSynthetix\n        txHash\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PositionLiquidated($where: PositionLiquidated_filter) {\n    positionLiquidateds(first: 100, where: $where) {\n      id\n      account\n      liquidator\n      market {\n        asset\n      }\n      size\n      price\n      fee\n      block\n      txHash\n      timestamp\n      futuresPosition {\n        id\n        account\n        isLiquidated\n        market {\n          asset\n        }\n        isOpen\n        openTimestamp\n        closeTimestamp\n        margin\n        initialMargin\n        entryPrice\n        lastPrice\n        pnl\n        exitPrice\n        leverage\n        size\n        long\n        trades\n        totalVolume\n        feesPaidToSynthetix\n        txHash\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        marketKey\n        asset\n      }\n      entryPrice\n      leverage\n      id\n    }\n  }\n'
): (typeof documents)['\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        marketKey\n        asset\n      }\n      entryPrice\n      leverage\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Positions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query Positions($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Position($id: ID!) {\n    futuresPosition(id: $id) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'
): (typeof documents)['\n  query Position($id: ID!) {\n    futuresPosition(id: $id) {\n      id\n      account\n      isLiquidated\n      market {\n        asset\n      }\n      isOpen\n      openTimestamp\n      closeTimestamp\n      margin\n      initialMargin\n      entryPrice\n      lastPrice\n      pnl\n      exitPrice\n      leverage\n      size\n      long\n      trades\n      totalVolume\n      feesPaidToSynthetix\n      txHash\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Synthetix {\n    synthetix(id: "synthetix") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n'
): (typeof documents)['\n  query Synthetix {\n    synthetix(id: "synthetix") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
