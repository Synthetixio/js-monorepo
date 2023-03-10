/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type FundingRateUpdate = {
  __typename?: 'FundingRateUpdate';
  funding: Scalars['BigInt'];
  id: Scalars['ID'];
  market: Scalars['Bytes'];
  sequenceLength: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type FundingRateUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
  funding?: InputMaybe<Scalars['BigInt']>;
  funding_gt?: InputMaybe<Scalars['BigInt']>;
  funding_gte?: InputMaybe<Scalars['BigInt']>;
  funding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  funding_lt?: InputMaybe<Scalars['BigInt']>;
  funding_lte?: InputMaybe<Scalars['BigInt']>;
  funding_not?: InputMaybe<Scalars['BigInt']>;
  funding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
  sequenceLength?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_gt?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_gte?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sequenceLength_lt?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_lte?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_not?: InputMaybe<Scalars['BigInt']>;
  sequenceLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FundingRateUpdate_OrderBy {
  Funding = 'funding',
  Id = 'id',
  Market = 'market',
  SequenceLength = 'sequenceLength',
  Timestamp = 'timestamp'
}

export type FuturesMarginTransfer = {
  __typename?: 'FuturesMarginTransfer';
  account: Scalars['Bytes'];
  id: Scalars['ID'];
  market: Scalars['Bytes'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type FuturesMarginTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarginTransfer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarginTransfer_Filter>>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum FuturesMarginTransfer_OrderBy {
  Account = 'account',
  Id = 'id',
  Market = 'market',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type FuturesOrder = {
  __typename?: 'FuturesOrder';
  account: Scalars['Bytes'];
  fee: Scalars['BigInt'];
  id: Scalars['ID'];
  keeper: Scalars['Bytes'];
  marginDelta: Scalars['BigInt'];
  market: Scalars['Bytes'];
  orderId: Scalars['BigInt'];
  orderType: FuturesOrderType;
  positionId?: Maybe<Scalars['String']>;
  size: Scalars['BigInt'];
  status: FuturesOrderStatus;
  targetPrice: Scalars['BigInt'];
  targetRoundId: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export enum FuturesOrderStatus {
  Cancelled = 'Cancelled',
  Filled = 'Filled',
  Pending = 'Pending'
}

export enum FuturesOrderType {
  DelayedOffchainSubmitted = 'DelayedOffchainSubmitted',
  DelayedOrderSubmitted = 'DelayedOrderSubmitted',
  NextPriceOrderRemoved = 'NextPriceOrderRemoved',
  NextPriceOrderSubmitted = 'NextPriceOrderSubmitted'
}

export type FuturesOrder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesOrder_Filter>>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  keeper?: InputMaybe<Scalars['Bytes']>;
  keeper_contains?: InputMaybe<Scalars['Bytes']>;
  keeper_gt?: InputMaybe<Scalars['Bytes']>;
  keeper_gte?: InputMaybe<Scalars['Bytes']>;
  keeper_in?: InputMaybe<Array<Scalars['Bytes']>>;
  keeper_lt?: InputMaybe<Scalars['Bytes']>;
  keeper_lte?: InputMaybe<Scalars['Bytes']>;
  keeper_not?: InputMaybe<Scalars['Bytes']>;
  keeper_not_contains?: InputMaybe<Scalars['Bytes']>;
  keeper_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marginDelta?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginDelta_lt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_lte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesOrder_Filter>>>;
  orderId?: InputMaybe<Scalars['BigInt']>;
  orderId_gt?: InputMaybe<Scalars['BigInt']>;
  orderId_gte?: InputMaybe<Scalars['BigInt']>;
  orderId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  orderId_lt?: InputMaybe<Scalars['BigInt']>;
  orderId_lte?: InputMaybe<Scalars['BigInt']>;
  orderId_not?: InputMaybe<Scalars['BigInt']>;
  orderId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  orderType?: InputMaybe<FuturesOrderType>;
  orderType_in?: InputMaybe<Array<FuturesOrderType>>;
  orderType_not?: InputMaybe<FuturesOrderType>;
  orderType_not_in?: InputMaybe<Array<FuturesOrderType>>;
  positionId?: InputMaybe<Scalars['String']>;
  positionId_contains?: InputMaybe<Scalars['String']>;
  positionId_contains_nocase?: InputMaybe<Scalars['String']>;
  positionId_ends_with?: InputMaybe<Scalars['String']>;
  positionId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_gt?: InputMaybe<Scalars['String']>;
  positionId_gte?: InputMaybe<Scalars['String']>;
  positionId_in?: InputMaybe<Array<Scalars['String']>>;
  positionId_lt?: InputMaybe<Scalars['String']>;
  positionId_lte?: InputMaybe<Scalars['String']>;
  positionId_not?: InputMaybe<Scalars['String']>;
  positionId_not_contains?: InputMaybe<Scalars['String']>;
  positionId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  positionId_not_ends_with?: InputMaybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_not_in?: InputMaybe<Array<Scalars['String']>>;
  positionId_not_starts_with?: InputMaybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_starts_with?: InputMaybe<Scalars['String']>;
  positionId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<FuturesOrderStatus>;
  status_in?: InputMaybe<Array<FuturesOrderStatus>>;
  status_not?: InputMaybe<FuturesOrderStatus>;
  status_not_in?: InputMaybe<Array<FuturesOrderStatus>>;
  targetPrice?: InputMaybe<Scalars['BigInt']>;
  targetPrice_gt?: InputMaybe<Scalars['BigInt']>;
  targetPrice_gte?: InputMaybe<Scalars['BigInt']>;
  targetPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetPrice_lt?: InputMaybe<Scalars['BigInt']>;
  targetPrice_lte?: InputMaybe<Scalars['BigInt']>;
  targetPrice_not?: InputMaybe<Scalars['BigInt']>;
  targetPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetRoundId?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_gt?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_gte?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetRoundId_lt?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_lte?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_not?: InputMaybe<Scalars['BigInt']>;
  targetRoundId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum FuturesOrder_OrderBy {
  Account = 'account',
  Fee = 'fee',
  Id = 'id',
  Keeper = 'keeper',
  MarginDelta = 'marginDelta',
  Market = 'market',
  OrderId = 'orderId',
  OrderType = 'orderType',
  PositionId = 'positionId',
  Size = 'size',
  Status = 'status',
  TargetPrice = 'targetPrice',
  TargetRoundId = 'targetRoundId',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type FuturesPosition = {
  __typename?: 'FuturesPosition';
  account: Scalars['Bytes'];
  avgEntryPrice: Scalars['BigInt'];
  closeTimestamp?: Maybe<Scalars['BigInt']>;
  entryPrice: Scalars['BigInt'];
  exitPrice?: Maybe<Scalars['BigInt']>;
  feesPaidToSynthetix: Scalars['BigInt'];
  fundingIndex: Scalars['BigInt'];
  id: Scalars['ID'];
  initialMargin: Scalars['BigInt'];
  isLiquidated: Scalars['Boolean'];
  isOpen: Scalars['Boolean'];
  lastPrice: Scalars['BigInt'];
  leverage: Scalars['BigInt'];
  long: Scalars['Boolean'];
  margin: Scalars['BigInt'];
  market: Scalars['Bytes'];
  netFunding: Scalars['BigInt'];
  netTransfers: Scalars['BigInt'];
  openTimestamp: Scalars['BigInt'];
  pnl: Scalars['BigInt'];
  size: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
  trades: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type FuturesPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesPosition_Filter>>>;
  avgEntryPrice?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_gt?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_gte?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  avgEntryPrice_lt?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_lte?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_not?: InputMaybe<Scalars['BigInt']>;
  avgEntryPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeTimestamp?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  closeTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_gte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryPrice_lt?: InputMaybe<Scalars['BigInt']>;
  entryPrice_lte?: InputMaybe<Scalars['BigInt']>;
  entryPrice_not?: InputMaybe<Scalars['BigInt']>;
  entryPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exitPrice?: InputMaybe<Scalars['BigInt']>;
  exitPrice_gt?: InputMaybe<Scalars['BigInt']>;
  exitPrice_gte?: InputMaybe<Scalars['BigInt']>;
  exitPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exitPrice_lt?: InputMaybe<Scalars['BigInt']>;
  exitPrice_lte?: InputMaybe<Scalars['BigInt']>;
  exitPrice_not?: InputMaybe<Scalars['BigInt']>;
  exitPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaidToSynthetix?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaidToSynthetix_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingIndex?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_gt?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_gte?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingIndex_lt?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_lte?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_not?: InputMaybe<Scalars['BigInt']>;
  fundingIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initialMargin?: InputMaybe<Scalars['BigInt']>;
  initialMargin_gt?: InputMaybe<Scalars['BigInt']>;
  initialMargin_gte?: InputMaybe<Scalars['BigInt']>;
  initialMargin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialMargin_lt?: InputMaybe<Scalars['BigInt']>;
  initialMargin_lte?: InputMaybe<Scalars['BigInt']>;
  initialMargin_not?: InputMaybe<Scalars['BigInt']>;
  initialMargin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isLiquidated?: InputMaybe<Scalars['Boolean']>;
  isLiquidated_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLiquidated_not?: InputMaybe<Scalars['Boolean']>;
  isLiquidated_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  isOpen_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen_not?: InputMaybe<Scalars['Boolean']>;
  isOpen_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  lastPrice?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastPrice_lt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_lte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_not?: InputMaybe<Scalars['BigInt']>;
  lastPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage?: InputMaybe<Scalars['BigInt']>;
  leverage_gt?: InputMaybe<Scalars['BigInt']>;
  leverage_gte?: InputMaybe<Scalars['BigInt']>;
  leverage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leverage_lt?: InputMaybe<Scalars['BigInt']>;
  leverage_lte?: InputMaybe<Scalars['BigInt']>;
  leverage_not?: InputMaybe<Scalars['BigInt']>;
  leverage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  long?: InputMaybe<Scalars['Boolean']>;
  long_in?: InputMaybe<Array<Scalars['Boolean']>>;
  long_not?: InputMaybe<Scalars['Boolean']>;
  long_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  netFunding?: InputMaybe<Scalars['BigInt']>;
  netFunding_gt?: InputMaybe<Scalars['BigInt']>;
  netFunding_gte?: InputMaybe<Scalars['BigInt']>;
  netFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netFunding_lt?: InputMaybe<Scalars['BigInt']>;
  netFunding_lte?: InputMaybe<Scalars['BigInt']>;
  netFunding_not?: InputMaybe<Scalars['BigInt']>;
  netFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netTransfers?: InputMaybe<Scalars['BigInt']>;
  netTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  netTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  netTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  netTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  netTransfers_not?: InputMaybe<Scalars['BigInt']>;
  netTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openTimestamp?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  openTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesPosition_Filter>>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum FuturesPosition_OrderBy {
  Account = 'account',
  AvgEntryPrice = 'avgEntryPrice',
  CloseTimestamp = 'closeTimestamp',
  EntryPrice = 'entryPrice',
  ExitPrice = 'exitPrice',
  FeesPaidToSynthetix = 'feesPaidToSynthetix',
  FundingIndex = 'fundingIndex',
  Id = 'id',
  InitialMargin = 'initialMargin',
  IsLiquidated = 'isLiquidated',
  IsOpen = 'isOpen',
  LastPrice = 'lastPrice',
  Leverage = 'leverage',
  Long = 'long',
  Margin = 'margin',
  Market = 'market',
  NetFunding = 'netFunding',
  NetTransfers = 'netTransfers',
  OpenTimestamp = 'openTimestamp',
  Pnl = 'pnl',
  Size = 'size',
  TotalVolume = 'totalVolume',
  Trades = 'trades',
  TxHash = 'txHash'
}

export type FuturesTrade = {
  __typename?: 'FuturesTrade';
  account: Scalars['Bytes'];
  feesPaidToSynthetix: Scalars['BigInt'];
  futuresOrder?: Maybe<FuturesOrder>;
  id: Scalars['ID'];
  margin: Scalars['BigInt'];
  market: Scalars['Bytes'];
  pnl: Scalars['BigInt'];
  positionClosed: Scalars['Boolean'];
  positionId: Scalars['String'];
  positionSize: Scalars['BigInt'];
  price: Scalars['BigInt'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
  type: FuturesTradeType;
};

export enum FuturesTradeType {
  Liquidated = 'Liquidated',
  PositionClosed = 'PositionClosed',
  PositionModified = 'PositionModified',
  PositionOpened = 'PositionOpened',
  Unknown = 'Unknown'
}

export type FuturesTrade_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<FuturesTrade_Filter>>>;
  feesPaidToSynthetix?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaidToSynthetix_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futuresOrder?: InputMaybe<Scalars['String']>;
  futuresOrder_?: InputMaybe<FuturesOrder_Filter>;
  futuresOrder_contains?: InputMaybe<Scalars['String']>;
  futuresOrder_contains_nocase?: InputMaybe<Scalars['String']>;
  futuresOrder_ends_with?: InputMaybe<Scalars['String']>;
  futuresOrder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  futuresOrder_gt?: InputMaybe<Scalars['String']>;
  futuresOrder_gte?: InputMaybe<Scalars['String']>;
  futuresOrder_in?: InputMaybe<Array<Scalars['String']>>;
  futuresOrder_lt?: InputMaybe<Scalars['String']>;
  futuresOrder_lte?: InputMaybe<Scalars['String']>;
  futuresOrder_not?: InputMaybe<Scalars['String']>;
  futuresOrder_not_contains?: InputMaybe<Scalars['String']>;
  futuresOrder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  futuresOrder_not_ends_with?: InputMaybe<Scalars['String']>;
  futuresOrder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  futuresOrder_not_in?: InputMaybe<Array<Scalars['String']>>;
  futuresOrder_not_starts_with?: InputMaybe<Scalars['String']>;
  futuresOrder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  futuresOrder_starts_with?: InputMaybe<Scalars['String']>;
  futuresOrder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesTrade_Filter>>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionClosed?: InputMaybe<Scalars['Boolean']>;
  positionClosed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  positionClosed_not?: InputMaybe<Scalars['Boolean']>;
  positionClosed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  positionId?: InputMaybe<Scalars['String']>;
  positionId_contains?: InputMaybe<Scalars['String']>;
  positionId_contains_nocase?: InputMaybe<Scalars['String']>;
  positionId_ends_with?: InputMaybe<Scalars['String']>;
  positionId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_gt?: InputMaybe<Scalars['String']>;
  positionId_gte?: InputMaybe<Scalars['String']>;
  positionId_in?: InputMaybe<Array<Scalars['String']>>;
  positionId_lt?: InputMaybe<Scalars['String']>;
  positionId_lte?: InputMaybe<Scalars['String']>;
  positionId_not?: InputMaybe<Scalars['String']>;
  positionId_not_contains?: InputMaybe<Scalars['String']>;
  positionId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  positionId_not_ends_with?: InputMaybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_not_in?: InputMaybe<Array<Scalars['String']>>;
  positionId_not_starts_with?: InputMaybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  positionId_starts_with?: InputMaybe<Scalars['String']>;
  positionId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  positionSize?: InputMaybe<Scalars['BigInt']>;
  positionSize_gt?: InputMaybe<Scalars['BigInt']>;
  positionSize_gte?: InputMaybe<Scalars['BigInt']>;
  positionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionSize_lt?: InputMaybe<Scalars['BigInt']>;
  positionSize_lte?: InputMaybe<Scalars['BigInt']>;
  positionSize_not?: InputMaybe<Scalars['BigInt']>;
  positionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<FuturesTradeType>;
  type_in?: InputMaybe<Array<FuturesTradeType>>;
  type_not?: InputMaybe<FuturesTradeType>;
  type_not_in?: InputMaybe<Array<FuturesTradeType>>;
};

export enum FuturesTrade_OrderBy {
  Account = 'account',
  FeesPaidToSynthetix = 'feesPaidToSynthetix',
  FuturesOrder = 'futuresOrder',
  FuturesOrderAccount = 'futuresOrder__account',
  FuturesOrderFee = 'futuresOrder__fee',
  FuturesOrderId = 'futuresOrder__id',
  FuturesOrderKeeper = 'futuresOrder__keeper',
  FuturesOrderMarginDelta = 'futuresOrder__marginDelta',
  FuturesOrderMarket = 'futuresOrder__market',
  FuturesOrderOrderId = 'futuresOrder__orderId',
  FuturesOrderOrderType = 'futuresOrder__orderType',
  FuturesOrderPositionId = 'futuresOrder__positionId',
  FuturesOrderSize = 'futuresOrder__size',
  FuturesOrderStatus = 'futuresOrder__status',
  FuturesOrderTargetPrice = 'futuresOrder__targetPrice',
  FuturesOrderTargetRoundId = 'futuresOrder__targetRoundId',
  FuturesOrderTimestamp = 'futuresOrder__timestamp',
  FuturesOrderTxHash = 'futuresOrder__txHash',
  Id = 'id',
  Margin = 'margin',
  Market = 'market',
  Pnl = 'pnl',
  PositionClosed = 'positionClosed',
  PositionId = 'positionId',
  PositionSize = 'positionSize',
  Price = 'price',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  Type = 'type'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PositionLiquidated = {
  __typename?: 'PositionLiquidated';
  account: Scalars['Bytes'];
  block: Scalars['BigInt'];
  fee: Scalars['BigDecimal'];
  futuresPosition: FuturesPosition;
  id: Scalars['ID'];
  liquidator: Scalars['Bytes'];
  market: Scalars['Bytes'];
  price: Scalars['BigDecimal'];
  size: Scalars['BigDecimal'];
  timestamp: Scalars['BigInt'];
  txHash: Scalars['String'];
};

export type PositionLiquidated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<PositionLiquidated_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigDecimal']>;
  fee_gt?: InputMaybe<Scalars['BigDecimal']>;
  fee_gte?: InputMaybe<Scalars['BigDecimal']>;
  fee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fee_lt?: InputMaybe<Scalars['BigDecimal']>;
  fee_lte?: InputMaybe<Scalars['BigDecimal']>;
  fee_not?: InputMaybe<Scalars['BigDecimal']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  futuresPosition?: InputMaybe<Scalars['String']>;
  futuresPosition_?: InputMaybe<FuturesPosition_Filter>;
  futuresPosition_contains?: InputMaybe<Scalars['String']>;
  futuresPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  futuresPosition_ends_with?: InputMaybe<Scalars['String']>;
  futuresPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  futuresPosition_gt?: InputMaybe<Scalars['String']>;
  futuresPosition_gte?: InputMaybe<Scalars['String']>;
  futuresPosition_in?: InputMaybe<Array<Scalars['String']>>;
  futuresPosition_lt?: InputMaybe<Scalars['String']>;
  futuresPosition_lte?: InputMaybe<Scalars['String']>;
  futuresPosition_not?: InputMaybe<Scalars['String']>;
  futuresPosition_not_contains?: InputMaybe<Scalars['String']>;
  futuresPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  futuresPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  futuresPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  futuresPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  futuresPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  futuresPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  futuresPosition_starts_with?: InputMaybe<Scalars['String']>;
  futuresPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidator?: InputMaybe<Scalars['Bytes']>;
  liquidator_contains?: InputMaybe<Scalars['Bytes']>;
  liquidator_gt?: InputMaybe<Scalars['Bytes']>;
  liquidator_gte?: InputMaybe<Scalars['Bytes']>;
  liquidator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  liquidator_lt?: InputMaybe<Scalars['Bytes']>;
  liquidator_lte?: InputMaybe<Scalars['Bytes']>;
  liquidator_not?: InputMaybe<Scalars['Bytes']>;
  liquidator_not_contains?: InputMaybe<Scalars['Bytes']>;
  liquidator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market?: InputMaybe<Scalars['Bytes']>;
  market_contains?: InputMaybe<Scalars['Bytes']>;
  market_gt?: InputMaybe<Scalars['Bytes']>;
  market_gte?: InputMaybe<Scalars['Bytes']>;
  market_in?: InputMaybe<Array<Scalars['Bytes']>>;
  market_lt?: InputMaybe<Scalars['Bytes']>;
  market_lte?: InputMaybe<Scalars['Bytes']>;
  market_not?: InputMaybe<Scalars['Bytes']>;
  market_not_contains?: InputMaybe<Scalars['Bytes']>;
  market_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<PositionLiquidated_Filter>>>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  size?: InputMaybe<Scalars['BigDecimal']>;
  size_gt?: InputMaybe<Scalars['BigDecimal']>;
  size_gte?: InputMaybe<Scalars['BigDecimal']>;
  size_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  size_lt?: InputMaybe<Scalars['BigDecimal']>;
  size_lte?: InputMaybe<Scalars['BigDecimal']>;
  size_not?: InputMaybe<Scalars['BigDecimal']>;
  size_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['String']>;
  txHash_contains?: InputMaybe<Scalars['String']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_ends_with?: InputMaybe<Scalars['String']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_gt?: InputMaybe<Scalars['String']>;
  txHash_gte?: InputMaybe<Scalars['String']>;
  txHash_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_lt?: InputMaybe<Scalars['String']>;
  txHash_lte?: InputMaybe<Scalars['String']>;
  txHash_not?: InputMaybe<Scalars['String']>;
  txHash_not_contains?: InputMaybe<Scalars['String']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash_starts_with?: InputMaybe<Scalars['String']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum PositionLiquidated_OrderBy {
  Account = 'account',
  Block = 'block',
  Fee = 'fee',
  FuturesPosition = 'futuresPosition',
  FuturesPositionAccount = 'futuresPosition__account',
  FuturesPositionAvgEntryPrice = 'futuresPosition__avgEntryPrice',
  FuturesPositionCloseTimestamp = 'futuresPosition__closeTimestamp',
  FuturesPositionEntryPrice = 'futuresPosition__entryPrice',
  FuturesPositionExitPrice = 'futuresPosition__exitPrice',
  FuturesPositionFeesPaidToSynthetix = 'futuresPosition__feesPaidToSynthetix',
  FuturesPositionFundingIndex = 'futuresPosition__fundingIndex',
  FuturesPositionId = 'futuresPosition__id',
  FuturesPositionInitialMargin = 'futuresPosition__initialMargin',
  FuturesPositionIsLiquidated = 'futuresPosition__isLiquidated',
  FuturesPositionIsOpen = 'futuresPosition__isOpen',
  FuturesPositionLastPrice = 'futuresPosition__lastPrice',
  FuturesPositionLeverage = 'futuresPosition__leverage',
  FuturesPositionLong = 'futuresPosition__long',
  FuturesPositionMargin = 'futuresPosition__margin',
  FuturesPositionMarket = 'futuresPosition__market',
  FuturesPositionNetFunding = 'futuresPosition__netFunding',
  FuturesPositionNetTransfers = 'futuresPosition__netTransfers',
  FuturesPositionOpenTimestamp = 'futuresPosition__openTimestamp',
  FuturesPositionPnl = 'futuresPosition__pnl',
  FuturesPositionSize = 'futuresPosition__size',
  FuturesPositionTotalVolume = 'futuresPosition__totalVolume',
  FuturesPositionTrades = 'futuresPosition__trades',
  FuturesPositionTxHash = 'futuresPosition__txHash',
  Id = 'id',
  Liquidator = 'liquidator',
  Market = 'market',
  Price = 'price',
  Size = 'size',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  positionLiquidated?: Maybe<PositionLiquidated>;
  positionLiquidateds: Array<PositionLiquidated>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  trader?: Maybe<Trader>;
  traders: Array<Trader>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryFundingRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFundingRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingRateUpdate_Filter>;
};


export type QueryFuturesMarginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesMarginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginTransfer_Filter>;
};


export type QueryFuturesOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesOrder_Filter>;
};


export type QueryFuturesPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesPosition_Filter>;
};


export type QueryFuturesTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesTrade_Filter>;
};


export type QueryPositionLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionLiquidated_Filter>;
};


export type QuerySynthetixArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySynthetixesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Synthetix_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Synthetix_Filter>;
};


export type QueryTraderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTradersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trader_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Trader_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  positionLiquidated?: Maybe<PositionLiquidated>;
  positionLiquidateds: Array<PositionLiquidated>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  trader?: Maybe<Trader>;
  traders: Array<Trader>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionFundingRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFundingRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FundingRateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundingRateUpdate_Filter>;
};


export type SubscriptionFuturesMarginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesMarginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarginTransfer_Filter>;
};


export type SubscriptionFuturesOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesOrder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesOrder_Filter>;
};


export type SubscriptionFuturesPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesPosition_Filter>;
};


export type SubscriptionFuturesTradeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesTradesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesTrade_Filter>;
};


export type SubscriptionPositionLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionLiquidated_Filter>;
};


export type SubscriptionSynthetixArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSynthetixesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Synthetix_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Synthetix_Filter>;
};


export type SubscriptionTraderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTradersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trader_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Trader_Filter>;
};

export type Synthetix = {
  __typename?: 'Synthetix';
  feesByLiquidations: Scalars['BigDecimal'];
  feesByPositionModifications: Scalars['BigDecimal'];
  id: Scalars['ID'];
  totalLiquidations: Scalars['BigInt'];
  totalTraders: Scalars['BigInt'];
  totalVolume: Scalars['BigDecimal'];
};

export type Synthetix_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Synthetix_Filter>>>;
  feesByLiquidations?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesByLiquidations_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_not?: InputMaybe<Scalars['BigDecimal']>;
  feesByLiquidations_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesByPositionModifications?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesByPositionModifications_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_not?: InputMaybe<Scalars['BigDecimal']>;
  feesByPositionModifications_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Synthetix_Filter>>>;
  totalLiquidations?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations_lt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_lte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTraders?: InputMaybe<Scalars['BigInt']>;
  totalTraders_gt?: InputMaybe<Scalars['BigInt']>;
  totalTraders_gte?: InputMaybe<Scalars['BigInt']>;
  totalTraders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTraders_lt?: InputMaybe<Scalars['BigInt']>;
  totalTraders_lte?: InputMaybe<Scalars['BigInt']>;
  totalTraders_not?: InputMaybe<Scalars['BigInt']>;
  totalTraders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Synthetix_OrderBy {
  FeesByLiquidations = 'feesByLiquidations',
  FeesByPositionModifications = 'feesByPositionModifications',
  Id = 'id',
  TotalLiquidations = 'totalLiquidations',
  TotalTraders = 'totalTraders',
  TotalVolume = 'totalVolume'
}

export type Trader = {
  __typename?: 'Trader';
  feesPaidToSynthetix: Scalars['BigDecimal'];
  id: Scalars['ID'];
  margin: Scalars['BigDecimal'];
  pnl: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  totalLiquidations: Scalars['BigInt'];
  totalMarginLiquidated: Scalars['BigDecimal'];
  totalVolume: Scalars['BigDecimal'];
  trades: Array<FuturesTrade>;
};


export type TraderTradesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FuturesTrade_Filter>;
};

export type Trader_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Trader_Filter>>>;
  feesPaidToSynthetix?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesPaidToSynthetix_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_not?: InputMaybe<Scalars['BigDecimal']>;
  feesPaidToSynthetix_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  margin?: InputMaybe<Scalars['BigDecimal']>;
  margin_gt?: InputMaybe<Scalars['BigDecimal']>;
  margin_gte?: InputMaybe<Scalars['BigDecimal']>;
  margin_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  margin_lt?: InputMaybe<Scalars['BigDecimal']>;
  margin_lte?: InputMaybe<Scalars['BigDecimal']>;
  margin_not?: InputMaybe<Scalars['BigDecimal']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<Trader_Filter>>>;
  pnl?: InputMaybe<Scalars['BigInt']>;
  pnl_gt?: InputMaybe<Scalars['BigInt']>;
  pnl_gte?: InputMaybe<Scalars['BigInt']>;
  pnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pnl_lt?: InputMaybe<Scalars['BigInt']>;
  pnl_lte?: InputMaybe<Scalars['BigInt']>;
  pnl_not?: InputMaybe<Scalars['BigInt']>;
  pnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations_lt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_lte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMarginLiquidated?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalMarginLiquidated_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_not?: InputMaybe<Scalars['BigDecimal']>;
  totalMarginLiquidated_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trades?: InputMaybe<Array<Scalars['String']>>;
  trades_?: InputMaybe<FuturesTrade_Filter>;
  trades_contains?: InputMaybe<Array<Scalars['String']>>;
  trades_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  trades_not?: InputMaybe<Array<Scalars['String']>>;
  trades_not_contains?: InputMaybe<Array<Scalars['String']>>;
  trades_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Trader_OrderBy {
  FeesPaidToSynthetix = 'feesPaidToSynthetix',
  Id = 'id',
  Margin = 'margin',
  Pnl = 'pnl',
  Timestamp = 'timestamp',
  TotalLiquidations = 'totalLiquidations',
  TotalMarginLiquidated = 'totalMarginLiquidated',
  TotalVolume = 'totalVolume',
  Trades = 'trades'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type PositionsQueryVariables = Exact<{
  where?: InputMaybe<FuturesPosition_Filter>;
}>;


export type PositionsQuery = { __typename?: 'Query', futuresPositions: Array<{ __typename?: 'FuturesPosition', id: string, account: any, isLiquidated: boolean, market: any, isOpen: boolean, openTimestamp: any, closeTimestamp?: any | null, margin: any, initialMargin: any, entryPrice: any, lastPrice: any, pnl: any, exitPrice?: any | null, leverage: any, size: any, long: boolean, trades: any, totalVolume: any, feesPaidToSynthetix: any, txHash: string }> };


export const PositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Positions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesPosition_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresPositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"}},{"kind":"Field","name":{"kind":"Name","value":"isLiquidated"}},{"kind":"Field","name":{"kind":"Name","value":"market"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"openTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"closeTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"margin"}},{"kind":"Field","name":{"kind":"Name","value":"initialMargin"}},{"kind":"Field","name":{"kind":"Name","value":"entryPrice"}},{"kind":"Field","name":{"kind":"Name","value":"lastPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"exitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"trades"}},{"kind":"Field","name":{"kind":"Name","value":"totalVolume"}},{"kind":"Field","name":{"kind":"Name","value":"feesPaidToSynthetix"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]}}]} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;