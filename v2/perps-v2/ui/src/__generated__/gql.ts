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
    "\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter, $first: Int,$orderBy: FuturesMarginTransfer_orderBy, $orderDirection: OrderDirection) {\n    futuresMarginTransfers(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n": types.FuturesMarginTransferDocument,
    "\n  query FuturesTrades($where: FuturesTrade_filter,$first: Int,$orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {\n    futuresTrades(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      margin\n      market {\n        id\n        asset\n      }\n      futuresPosition {\n        id\n      }\n      size\n      feesPaidToSynthetix\n      type\n      realizedPnl\n      positionClosed\n      positionSize\n      price\n      txHash\n    }\n  }\n": types.FuturesTradesDocument,
    "\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        id\n        marketKey\n        asset\n      }\n      trader {\n        id\n      }\n      isOpen\n      entryPrice\n      avgEntryPrice\n      leverage\n      feesPaidToSynthetix\n      id\n      realizedPnl\n      unrealizedPnl\n      feesPaidToSynthetix\n      lastPrice\n      netFunding\n    }\n  }\n": types.PositionsMarketDocument,
    "\n  query Synthetix {\n    synthetix(id: \"synthetix\") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n": types.SynthetixDocument,
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
export function gql(source: "\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter, $first: Int,$orderBy: FuturesMarginTransfer_orderBy, $orderDirection: OrderDirection) {\n    futuresMarginTransfers(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n"): (typeof documents)["\n  query FuturesMarginTransfer($where: FuturesMarginTransfer_filter, $first: Int,$orderBy: FuturesMarginTransfer_orderBy, $orderDirection: OrderDirection) {\n    futuresMarginTransfers(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      market {\n        asset\n      }\n      size\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FuturesTrades($where: FuturesTrade_filter,$first: Int,$orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {\n    futuresTrades(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      margin\n      market {\n        id\n        asset\n      }\n      futuresPosition {\n        id\n      }\n      size\n      feesPaidToSynthetix\n      type\n      realizedPnl\n      positionClosed\n      positionSize\n      price\n      txHash\n    }\n  }\n"): (typeof documents)["\n  query FuturesTrades($where: FuturesTrade_filter,$first: Int,$orderBy: FuturesTrade_orderBy, $orderDirection: OrderDirection) {\n    futuresTrades(\n      first: $first\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      timestamp\n      trader {\n        id\n      }\n      margin\n      market {\n        id\n        asset\n      }\n      futuresPosition {\n        id\n      }\n      size\n      feesPaidToSynthetix\n      type\n      realizedPnl\n      positionClosed\n      positionSize\n      price\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        id\n        marketKey\n        asset\n      }\n      trader {\n        id\n      }\n      isOpen\n      entryPrice\n      avgEntryPrice\n      leverage\n      feesPaidToSynthetix\n      id\n      realizedPnl\n      unrealizedPnl\n      feesPaidToSynthetix\n      lastPrice\n      netFunding\n    }\n  }\n"): (typeof documents)["\n  query PositionsMarket($where: FuturesPosition_filter, $skip: Int, $first: Int, $orderBy: FuturesPosition_orderBy, $orderDirection: OrderDirection) {\n    futuresPositions(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $where) {\n      market {\n        id\n        marketKey\n        asset\n      }\n      trader {\n        id\n      }\n      isOpen\n      entryPrice\n      avgEntryPrice\n      leverage\n      feesPaidToSynthetix\n      id\n      realizedPnl\n      unrealizedPnl\n      feesPaidToSynthetix\n      lastPrice\n      netFunding\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Synthetix {\n    synthetix(id: \"synthetix\") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n"): (typeof documents)["\n  query Synthetix {\n    synthetix(id: \"synthetix\") {\n      feesByLiquidations\n      feesByPositionModifications\n      totalVolume\n      totalLiquidations\n      totalTraders\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;