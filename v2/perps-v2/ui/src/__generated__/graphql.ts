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
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
  /**
   * 8 bytes signed integer
   *
   */
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CumulativeMarketStat = {
  __typename?: 'CumulativeMarketStat';
  cumulativeFees: Scalars['BigInt'];
  cumulativeTrades: Scalars['BigInt'];
  cumulativeVolume: Scalars['BigInt'];
  /** CumulativeMarketStat-marketAddress */
  id: Scalars['ID'];
  market: FuturesMarket;
};

export type CumulativeMarketStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CumulativeMarketStat_Filter>>>;
  cumulativeFees?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFees_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<CumulativeMarketStat_Filter>>>;
};

export enum CumulativeMarketStat_OrderBy {
  CumulativeFees = 'cumulativeFees',
  CumulativeTrades = 'cumulativeTrades',
  CumulativeVolume = 'cumulativeVolume',
  Id = 'id',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp'
}

export type DailyMarketStat = {
  __typename?: 'DailyMarketStat';
  cumulativeFees: Scalars['BigInt'];
  cumulativeTrades: Scalars['BigInt'];
  cumulativeVolume: Scalars['BigInt'];
  day: Scalars['String'];
  fees: Scalars['BigInt'];
  /** marketAddress-YYYY-MM-DD */
  id: Scalars['ID'];
  market: FuturesMarket;
  timestamp: Scalars['BigInt'];
  trades: Scalars['BigInt'];
  volume: Scalars['BigInt'];
};

export type DailyMarketStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyMarketStat_Filter>>>;
  cumulativeFees?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFees_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  day?: InputMaybe<Scalars['String']>;
  day_contains?: InputMaybe<Scalars['String']>;
  day_contains_nocase?: InputMaybe<Scalars['String']>;
  day_ends_with?: InputMaybe<Scalars['String']>;
  day_ends_with_nocase?: InputMaybe<Scalars['String']>;
  day_gt?: InputMaybe<Scalars['String']>;
  day_gte?: InputMaybe<Scalars['String']>;
  day_in?: InputMaybe<Array<Scalars['String']>>;
  day_lt?: InputMaybe<Scalars['String']>;
  day_lte?: InputMaybe<Scalars['String']>;
  day_not?: InputMaybe<Scalars['String']>;
  day_not_contains?: InputMaybe<Scalars['String']>;
  day_not_contains_nocase?: InputMaybe<Scalars['String']>;
  day_not_ends_with?: InputMaybe<Scalars['String']>;
  day_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  day_not_in?: InputMaybe<Array<Scalars['String']>>;
  day_not_starts_with?: InputMaybe<Scalars['String']>;
  day_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  day_starts_with?: InputMaybe<Scalars['String']>;
  day_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fees?: InputMaybe<Scalars['BigInt']>;
  fees_gt?: InputMaybe<Scalars['BigInt']>;
  fees_gte?: InputMaybe<Scalars['BigInt']>;
  fees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_lt?: InputMaybe<Scalars['BigInt']>;
  fees_lte?: InputMaybe<Scalars['BigInt']>;
  fees_not?: InputMaybe<Scalars['BigInt']>;
  fees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<DailyMarketStat_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DailyMarketStat_OrderBy {
  CumulativeFees = 'cumulativeFees',
  CumulativeTrades = 'cumulativeTrades',
  CumulativeVolume = 'cumulativeVolume',
  Day = 'day',
  Fees = 'fees',
  Id = 'id',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  Timestamp = 'timestamp',
  Trades = 'trades',
  Volume = 'volume'
}

export type DailyStat = {
  __typename?: 'DailyStat';
  cumulativeFees: Scalars['BigInt'];
  cumulativeTraders: Scalars['BigInt'];
  cumulativeTrades: Scalars['BigInt'];
  cumulativeVolume: Scalars['BigInt'];
  day: Scalars['String'];
  existingTraders: Scalars['BigInt'];
  fees: Scalars['BigInt'];
  /** DailyStat-YYYY-MM-DD */
  id: Scalars['ID'];
  newTraders: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trades: Scalars['BigInt'];
  volume: Scalars['BigInt'];
};

export type DailyStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyStat_Filter>>>;
  cumulativeFees?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFees_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTraders?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTraders_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeTraders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeTrades_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeVolume_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  day?: InputMaybe<Scalars['String']>;
  day_contains?: InputMaybe<Scalars['String']>;
  day_contains_nocase?: InputMaybe<Scalars['String']>;
  day_ends_with?: InputMaybe<Scalars['String']>;
  day_ends_with_nocase?: InputMaybe<Scalars['String']>;
  day_gt?: InputMaybe<Scalars['String']>;
  day_gte?: InputMaybe<Scalars['String']>;
  day_in?: InputMaybe<Array<Scalars['String']>>;
  day_lt?: InputMaybe<Scalars['String']>;
  day_lte?: InputMaybe<Scalars['String']>;
  day_not?: InputMaybe<Scalars['String']>;
  day_not_contains?: InputMaybe<Scalars['String']>;
  day_not_contains_nocase?: InputMaybe<Scalars['String']>;
  day_not_ends_with?: InputMaybe<Scalars['String']>;
  day_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  day_not_in?: InputMaybe<Array<Scalars['String']>>;
  day_not_starts_with?: InputMaybe<Scalars['String']>;
  day_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  day_starts_with?: InputMaybe<Scalars['String']>;
  day_starts_with_nocase?: InputMaybe<Scalars['String']>;
  existingTraders?: InputMaybe<Scalars['BigInt']>;
  existingTraders_gt?: InputMaybe<Scalars['BigInt']>;
  existingTraders_gte?: InputMaybe<Scalars['BigInt']>;
  existingTraders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  existingTraders_lt?: InputMaybe<Scalars['BigInt']>;
  existingTraders_lte?: InputMaybe<Scalars['BigInt']>;
  existingTraders_not?: InputMaybe<Scalars['BigInt']>;
  existingTraders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Scalars['BigInt']>;
  fees_gt?: InputMaybe<Scalars['BigInt']>;
  fees_gte?: InputMaybe<Scalars['BigInt']>;
  fees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_lt?: InputMaybe<Scalars['BigInt']>;
  fees_lte?: InputMaybe<Scalars['BigInt']>;
  fees_not?: InputMaybe<Scalars['BigInt']>;
  fees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newTraders?: InputMaybe<Scalars['BigInt']>;
  newTraders_gt?: InputMaybe<Scalars['BigInt']>;
  newTraders_gte?: InputMaybe<Scalars['BigInt']>;
  newTraders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newTraders_lt?: InputMaybe<Scalars['BigInt']>;
  newTraders_lte?: InputMaybe<Scalars['BigInt']>;
  newTraders_not?: InputMaybe<Scalars['BigInt']>;
  newTraders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<DailyStat_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigInt']>;
  volume_gt?: InputMaybe<Scalars['BigInt']>;
  volume_gte?: InputMaybe<Scalars['BigInt']>;
  volume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume_lt?: InputMaybe<Scalars['BigInt']>;
  volume_lte?: InputMaybe<Scalars['BigInt']>;
  volume_not?: InputMaybe<Scalars['BigInt']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DailyStat_OrderBy {
  CumulativeFees = 'cumulativeFees',
  CumulativeTraders = 'cumulativeTraders',
  CumulativeTrades = 'cumulativeTrades',
  CumulativeVolume = 'cumulativeVolume',
  Day = 'day',
  ExistingTraders = 'existingTraders',
  Fees = 'fees',
  Id = 'id',
  NewTraders = 'newTraders',
  Timestamp = 'timestamp',
  Trades = 'trades',
  Volume = 'volume'
}

export type Frontend = {
  __typename?: 'Frontend';
  amount: Scalars['BigInt'];
  fees: Scalars['BigInt'];
  id: Scalars['ID'];
  markets: Array<FuturesMarket>;
};


export type FrontendMarketsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FuturesMarket_Filter>;
};

export type Frontend_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Frontend_Filter>>>;
  fees?: InputMaybe<Scalars['BigInt']>;
  fees_gt?: InputMaybe<Scalars['BigInt']>;
  fees_gte?: InputMaybe<Scalars['BigInt']>;
  fees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_lt?: InputMaybe<Scalars['BigInt']>;
  fees_lte?: InputMaybe<Scalars['BigInt']>;
  fees_not?: InputMaybe<Scalars['BigInt']>;
  fees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  markets?: InputMaybe<Array<Scalars['String']>>;
  markets_?: InputMaybe<FuturesMarket_Filter>;
  markets_contains?: InputMaybe<Array<Scalars['String']>>;
  markets_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  markets_not?: InputMaybe<Array<Scalars['String']>>;
  markets_not_contains?: InputMaybe<Array<Scalars['String']>>;
  markets_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  or?: InputMaybe<Array<InputMaybe<Frontend_Filter>>>;
};

export enum Frontend_OrderBy {
  Amount = 'amount',
  Fees = 'fees',
  Id = 'id',
  Markets = 'markets'
}

export type FundingRateUpdate = {
  __typename?: 'FundingRateUpdate';
  funding: Scalars['BigInt'];
  fundingRate: Scalars['BigInt'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  market: FuturesMarket;
  timestamp: Scalars['BigInt'];
};

export type FundingRateUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
  funding?: InputMaybe<Scalars['BigInt']>;
  fundingRate?: InputMaybe<Scalars['BigInt']>;
  fundingRate_gt?: InputMaybe<Scalars['BigInt']>;
  fundingRate_gte?: InputMaybe<Scalars['BigInt']>;
  fundingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fundingRate_lt?: InputMaybe<Scalars['BigInt']>;
  fundingRate_lte?: InputMaybe<Scalars['BigInt']>;
  fundingRate_not?: InputMaybe<Scalars['BigInt']>;
  fundingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<FundingRateUpdate_Filter>>>;
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
  FundingRate = 'fundingRate',
  Id = 'id',
  Index = 'index',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  Timestamp = 'timestamp'
}

export type FuturesMarginTransfer = {
  __typename?: 'FuturesMarginTransfer';
  id: Scalars['ID'];
  market: FuturesMarket;
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trader: Trader;
  txHash: Scalars['String'];
};

export type FuturesMarginTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarginTransfer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  Id = 'id',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  Size = 'size',
  Timestamp = 'timestamp',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume',
  TxHash = 'txHash'
}

export type FuturesMarket = {
  __typename?: 'FuturesMarket';
  asset: Scalars['Bytes'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  marketKey: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type FuturesMarket_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_gt?: InputMaybe<Scalars['Bytes']>;
  asset_gte?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']>;
  asset_lte?: InputMaybe<Scalars['Bytes']>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  marketKey?: InputMaybe<Scalars['Bytes']>;
  marketKey_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_gt?: InputMaybe<Scalars['Bytes']>;
  marketKey_gte?: InputMaybe<Scalars['Bytes']>;
  marketKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  marketKey_lt?: InputMaybe<Scalars['Bytes']>;
  marketKey_lte?: InputMaybe<Scalars['Bytes']>;
  marketKey_not?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  marketKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesMarket_OrderBy {
  Asset = 'asset',
  Id = 'id',
  IsActive = 'isActive',
  MarketKey = 'marketKey',
  Timestamp = 'timestamp'
}

export type FuturesOrder = {
  __typename?: 'FuturesOrder';
  fee: Scalars['BigInt'];
  futuresPosition?: Maybe<FuturesPosition>;
  id: Scalars['ID'];
  keeper: Scalars['Bytes'];
  marginDelta: Scalars['BigInt'];
  market: FuturesMarket;
  orderId: Scalars['BigInt'];
  orderType: FuturesOrderType;
  size: Scalars['BigInt'];
  status: FuturesOrderStatus;
  targetPrice: Scalars['BigInt'];
  targetRoundId: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trader: Trader;
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
  and?: InputMaybe<Array<InputMaybe<FuturesOrder_Filter>>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  Fee = 'fee',
  FuturesPosition = 'futuresPosition',
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
  FuturesPositionNetFunding = 'futuresPosition__netFunding',
  FuturesPositionNetTransfers = 'futuresPosition__netTransfers',
  FuturesPositionOpenTimestamp = 'futuresPosition__openTimestamp',
  FuturesPositionRealizedPnl = 'futuresPosition__realizedPnl',
  FuturesPositionSize = 'futuresPosition__size',
  FuturesPositionSkew = 'futuresPosition__skew',
  FuturesPositionTotalVolume = 'futuresPosition__totalVolume',
  FuturesPositionTrades = 'futuresPosition__trades',
  FuturesPositionTxHash = 'futuresPosition__txHash',
  FuturesPositionUnrealizedPnl = 'futuresPosition__unrealizedPnl',
  Id = 'id',
  Keeper = 'keeper',
  MarginDelta = 'marginDelta',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  OrderId = 'orderId',
  OrderType = 'orderType',
  Size = 'size',
  Status = 'status',
  TargetPrice = 'targetPrice',
  TargetRoundId = 'targetRoundId',
  Timestamp = 'timestamp',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume',
  TxHash = 'txHash'
}

export type FuturesPosition = {
  __typename?: 'FuturesPosition';
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
  market: FuturesMarket;
  netFunding: Scalars['BigInt'];
  netTransfers: Scalars['BigInt'];
  openTimestamp: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  size: Scalars['BigInt'];
  skew?: Maybe<Scalars['BigInt']>;
  totalVolume: Scalars['BigInt'];
  trader: Trader;
  trades: Scalars['BigInt'];
  txHash: Scalars['String'];
  unrealizedPnl: Scalars['BigInt'];
};

export type FuturesPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  skew?: InputMaybe<Scalars['BigInt']>;
  skew_gt?: InputMaybe<Scalars['BigInt']>;
  skew_gte?: InputMaybe<Scalars['BigInt']>;
  skew_in?: InputMaybe<Array<Scalars['BigInt']>>;
  skew_lt?: InputMaybe<Scalars['BigInt']>;
  skew_lte?: InputMaybe<Scalars['BigInt']>;
  skew_not?: InputMaybe<Scalars['BigInt']>;
  skew_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  unrealizedPnl?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unrealizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  unrealizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FuturesPosition_OrderBy {
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
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  NetFunding = 'netFunding',
  NetTransfers = 'netTransfers',
  OpenTimestamp = 'openTimestamp',
  RealizedPnl = 'realizedPnl',
  Size = 'size',
  Skew = 'skew',
  TotalVolume = 'totalVolume',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume',
  Trades = 'trades',
  TxHash = 'txHash',
  UnrealizedPnl = 'unrealizedPnl'
}

export type FuturesTrade = {
  __typename?: 'FuturesTrade';
  feesPaidToSynthetix: Scalars['BigInt'];
  futuresOrder?: Maybe<FuturesOrder>;
  futuresPosition: FuturesPosition;
  id: Scalars['ID'];
  margin: Scalars['BigInt'];
  market: FuturesMarket;
  marketOrder: Scalars['Boolean'];
  netFunding: Scalars['BigInt'];
  positionClosed: Scalars['Boolean'];
  positionSize: Scalars['BigInt'];
  price: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trader: Trader;
  txHash: Scalars['String'];
  type: FuturesTradeType;
};

export enum FuturesTradeType {
  Liquidated = 'Liquidated',
  PositionClosed = 'PositionClosed',
  PositionModified = 'PositionModified',
  PositionOpened = 'PositionOpened'
}

export type FuturesTrade_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  market?: InputMaybe<Scalars['String']>;
  marketOrder?: InputMaybe<Scalars['Boolean']>;
  marketOrder_in?: InputMaybe<Array<Scalars['Boolean']>>;
  marketOrder_not?: InputMaybe<Scalars['Boolean']>;
  marketOrder_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
  netFunding?: InputMaybe<Scalars['BigInt']>;
  netFunding_gt?: InputMaybe<Scalars['BigInt']>;
  netFunding_gte?: InputMaybe<Scalars['BigInt']>;
  netFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netFunding_lt?: InputMaybe<Scalars['BigInt']>;
  netFunding_lte?: InputMaybe<Scalars['BigInt']>;
  netFunding_not?: InputMaybe<Scalars['BigInt']>;
  netFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesTrade_Filter>>>;
  positionClosed?: InputMaybe<Scalars['Boolean']>;
  positionClosed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  positionClosed_not?: InputMaybe<Scalars['Boolean']>;
  positionClosed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  FeesPaidToSynthetix = 'feesPaidToSynthetix',
  FuturesOrder = 'futuresOrder',
  FuturesOrderFee = 'futuresOrder__fee',
  FuturesOrderId = 'futuresOrder__id',
  FuturesOrderKeeper = 'futuresOrder__keeper',
  FuturesOrderMarginDelta = 'futuresOrder__marginDelta',
  FuturesOrderOrderId = 'futuresOrder__orderId',
  FuturesOrderOrderType = 'futuresOrder__orderType',
  FuturesOrderSize = 'futuresOrder__size',
  FuturesOrderStatus = 'futuresOrder__status',
  FuturesOrderTargetPrice = 'futuresOrder__targetPrice',
  FuturesOrderTargetRoundId = 'futuresOrder__targetRoundId',
  FuturesOrderTimestamp = 'futuresOrder__timestamp',
  FuturesOrderTxHash = 'futuresOrder__txHash',
  FuturesPosition = 'futuresPosition',
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
  FuturesPositionNetFunding = 'futuresPosition__netFunding',
  FuturesPositionNetTransfers = 'futuresPosition__netTransfers',
  FuturesPositionOpenTimestamp = 'futuresPosition__openTimestamp',
  FuturesPositionRealizedPnl = 'futuresPosition__realizedPnl',
  FuturesPositionSize = 'futuresPosition__size',
  FuturesPositionSkew = 'futuresPosition__skew',
  FuturesPositionTotalVolume = 'futuresPosition__totalVolume',
  FuturesPositionTrades = 'futuresPosition__trades',
  FuturesPositionTxHash = 'futuresPosition__txHash',
  FuturesPositionUnrealizedPnl = 'futuresPosition__unrealizedPnl',
  Id = 'id',
  Margin = 'margin',
  Market = 'market',
  MarketOrder = 'marketOrder',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  NetFunding = 'netFunding',
  PositionClosed = 'positionClosed',
  PositionSize = 'positionSize',
  Price = 'price',
  RealizedPnl = 'realizedPnl',
  Size = 'size',
  Timestamp = 'timestamp',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume',
  TxHash = 'txHash',
  Type = 'type'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PositionFlagged = {
  __typename?: 'PositionFlagged';
  flagger: Scalars['Bytes'];
  id: Scalars['ID'];
  price?: Maybe<Scalars['BigInt']>;
  timestamp: Scalars['BigInt'];
  trader: Trader;
};

export type PositionFlagged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionFlagged_Filter>>>;
  flagger?: InputMaybe<Scalars['Bytes']>;
  flagger_contains?: InputMaybe<Scalars['Bytes']>;
  flagger_gt?: InputMaybe<Scalars['Bytes']>;
  flagger_gte?: InputMaybe<Scalars['Bytes']>;
  flagger_in?: InputMaybe<Array<Scalars['Bytes']>>;
  flagger_lt?: InputMaybe<Scalars['Bytes']>;
  flagger_lte?: InputMaybe<Scalars['Bytes']>;
  flagger_not?: InputMaybe<Scalars['Bytes']>;
  flagger_not_contains?: InputMaybe<Scalars['Bytes']>;
  flagger_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<PositionFlagged_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum PositionFlagged_OrderBy {
  Flagger = 'flagger',
  Id = 'id',
  Price = 'price',
  Timestamp = 'timestamp',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume'
}

export type PositionLiquidated = {
  __typename?: 'PositionLiquidated';
  fee: Scalars['BigInt'];
  futuresPosition: FuturesPosition;
  id: Scalars['ID'];
  liquidator: Scalars['Bytes'];
  market: FuturesMarket;
  price: Scalars['BigInt'];
  size: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  trader: Trader;
  txHash: Scalars['String'];
};

export type PositionLiquidated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionLiquidated_Filter>>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  market?: InputMaybe<Scalars['String']>;
  market_?: InputMaybe<FuturesMarket_Filter>;
  market_contains?: InputMaybe<Scalars['String']>;
  market_contains_nocase?: InputMaybe<Scalars['String']>;
  market_ends_with?: InputMaybe<Scalars['String']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_gt?: InputMaybe<Scalars['String']>;
  market_gte?: InputMaybe<Scalars['String']>;
  market_in?: InputMaybe<Array<Scalars['String']>>;
  market_lt?: InputMaybe<Scalars['String']>;
  market_lte?: InputMaybe<Scalars['String']>;
  market_not?: InputMaybe<Scalars['String']>;
  market_not_contains?: InputMaybe<Scalars['String']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']>;
  market_not_ends_with?: InputMaybe<Scalars['String']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  market_not_in?: InputMaybe<Array<Scalars['String']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  market_starts_with?: InputMaybe<Scalars['String']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<PositionLiquidated_Filter>>>;
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
  trader?: InputMaybe<Scalars['String']>;
  trader_?: InputMaybe<Trader_Filter>;
  trader_contains?: InputMaybe<Scalars['String']>;
  trader_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_ends_with?: InputMaybe<Scalars['String']>;
  trader_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_gt?: InputMaybe<Scalars['String']>;
  trader_gte?: InputMaybe<Scalars['String']>;
  trader_in?: InputMaybe<Array<Scalars['String']>>;
  trader_lt?: InputMaybe<Scalars['String']>;
  trader_lte?: InputMaybe<Scalars['String']>;
  trader_not?: InputMaybe<Scalars['String']>;
  trader_not_contains?: InputMaybe<Scalars['String']>;
  trader_not_contains_nocase?: InputMaybe<Scalars['String']>;
  trader_not_ends_with?: InputMaybe<Scalars['String']>;
  trader_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  trader_not_in?: InputMaybe<Array<Scalars['String']>>;
  trader_not_starts_with?: InputMaybe<Scalars['String']>;
  trader_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  trader_starts_with?: InputMaybe<Scalars['String']>;
  trader_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  Fee = 'fee',
  FuturesPosition = 'futuresPosition',
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
  FuturesPositionNetFunding = 'futuresPosition__netFunding',
  FuturesPositionNetTransfers = 'futuresPosition__netTransfers',
  FuturesPositionOpenTimestamp = 'futuresPosition__openTimestamp',
  FuturesPositionRealizedPnl = 'futuresPosition__realizedPnl',
  FuturesPositionSize = 'futuresPosition__size',
  FuturesPositionSkew = 'futuresPosition__skew',
  FuturesPositionTotalVolume = 'futuresPosition__totalVolume',
  FuturesPositionTrades = 'futuresPosition__trades',
  FuturesPositionTxHash = 'futuresPosition__txHash',
  FuturesPositionUnrealizedPnl = 'futuresPosition__unrealizedPnl',
  Id = 'id',
  Liquidator = 'liquidator',
  Market = 'market',
  MarketAsset = 'market__asset',
  MarketId = 'market__id',
  MarketIsActive = 'market__isActive',
  MarketMarketKey = 'market__marketKey',
  MarketTimestamp = 'market__timestamp',
  Price = 'price',
  Size = 'size',
  Timestamp = 'timestamp',
  Trader = 'trader',
  TraderCreatedAt = 'trader__createdAt',
  TraderFeesPaidToSynthetix = 'trader__feesPaidToSynthetix',
  TraderId = 'trader__id',
  TraderLastTradeTimestamp = 'trader__lastTradeTimestamp',
  TraderMargin = 'trader__margin',
  TraderRealizedPnl = 'trader__realizedPnl',
  TraderTotalLiquidations = 'trader__totalLiquidations',
  TraderTotalMarginLiquidated = 'trader__totalMarginLiquidated',
  TraderTotalVolume = 'trader__totalVolume',
  TxHash = 'txHash'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  cumulativeMarketStat?: Maybe<CumulativeMarketStat>;
  cumulativeMarketStats: Array<CumulativeMarketStat>;
  dailyMarketStat?: Maybe<DailyMarketStat>;
  dailyMarketStats: Array<DailyMarketStat>;
  dailyStat?: Maybe<DailyStat>;
  dailyStats: Array<DailyStat>;
  frontend?: Maybe<Frontend>;
  frontends: Array<Frontend>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  positionFlagged?: Maybe<PositionFlagged>;
  positionFlaggeds: Array<PositionFlagged>;
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


export type QueryCumulativeMarketStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCumulativeMarketStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CumulativeMarketStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CumulativeMarketStat_Filter>;
};


export type QueryDailyMarketStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyMarketStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyMarketStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketStat_Filter>;
};


export type QueryDailyStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyStat_Filter>;
};


export type QueryFrontendArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFrontendsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Frontend_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Frontend_Filter>;
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


export type QueryFuturesMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFuturesMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarket_Filter>;
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


export type QueryPositionFlaggedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionFlaggedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionFlagged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionFlagged_Filter>;
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
  cumulativeMarketStat?: Maybe<CumulativeMarketStat>;
  cumulativeMarketStats: Array<CumulativeMarketStat>;
  dailyMarketStat?: Maybe<DailyMarketStat>;
  dailyMarketStats: Array<DailyMarketStat>;
  dailyStat?: Maybe<DailyStat>;
  dailyStats: Array<DailyStat>;
  frontend?: Maybe<Frontend>;
  frontends: Array<Frontend>;
  fundingRateUpdate?: Maybe<FundingRateUpdate>;
  fundingRateUpdates: Array<FundingRateUpdate>;
  futuresMarginTransfer?: Maybe<FuturesMarginTransfer>;
  futuresMarginTransfers: Array<FuturesMarginTransfer>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  futuresOrder?: Maybe<FuturesOrder>;
  futuresOrders: Array<FuturesOrder>;
  futuresPosition?: Maybe<FuturesPosition>;
  futuresPositions: Array<FuturesPosition>;
  futuresTrade?: Maybe<FuturesTrade>;
  futuresTrades: Array<FuturesTrade>;
  positionFlagged?: Maybe<PositionFlagged>;
  positionFlaggeds: Array<PositionFlagged>;
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


export type SubscriptionCumulativeMarketStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCumulativeMarketStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CumulativeMarketStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CumulativeMarketStat_Filter>;
};


export type SubscriptionDailyMarketStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyMarketStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyMarketStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketStat_Filter>;
};


export type SubscriptionDailyStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyStat_Filter>;
};


export type SubscriptionFrontendArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFrontendsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Frontend_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Frontend_Filter>;
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


export type SubscriptionFuturesMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFuturesMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FuturesMarket_Filter>;
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


export type SubscriptionPositionFlaggedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionFlaggedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionFlagged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionFlagged_Filter>;
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
  feesByLiquidations: Scalars['BigInt'];
  feesByPositionModifications: Scalars['BigInt'];
  id: Scalars['ID'];
  totalLiquidations: Scalars['BigInt'];
  totalTraders: Scalars['BigInt'];
  totalTrades: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
};

export type Synthetix_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Synthetix_Filter>>>;
  feesByLiquidations?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_gt?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_gte?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesByLiquidations_lt?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_lte?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_not?: InputMaybe<Scalars['BigInt']>;
  feesByLiquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesByPositionModifications?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_gt?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_gte?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesByPositionModifications_lt?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_lte?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_not?: InputMaybe<Scalars['BigInt']>;
  feesByPositionModifications_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  totalTrades?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_gte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTrades_lt?: InputMaybe<Scalars['BigInt']>;
  totalTrades_lte?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not?: InputMaybe<Scalars['BigInt']>;
  totalTrades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Synthetix_OrderBy {
  FeesByLiquidations = 'feesByLiquidations',
  FeesByPositionModifications = 'feesByPositionModifications',
  Id = 'id',
  TotalLiquidations = 'totalLiquidations',
  TotalTraders = 'totalTraders',
  TotalTrades = 'totalTrades',
  TotalVolume = 'totalVolume'
}

export type Trader = {
  __typename?: 'Trader';
  createdAt: Scalars['BigInt'];
  feesPaidToSynthetix: Scalars['BigInt'];
  id: Scalars['ID'];
  lastTradeTimestamp?: Maybe<Scalars['BigInt']>;
  margin: Scalars['BigInt'];
  realizedPnl: Scalars['BigInt'];
  totalLiquidations: Scalars['BigInt'];
  totalMarginLiquidated: Scalars['BigInt'];
  totalVolume: Scalars['BigInt'];
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
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaidToSynthetix?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_gte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesPaidToSynthetix_lt?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_lte?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not?: InputMaybe<Scalars['BigInt']>;
  feesPaidToSynthetix_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastTradeTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTradeTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastTradeTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Trader_Filter>>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_gte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidations_lt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_lte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not?: InputMaybe<Scalars['BigInt']>;
  totalLiquidations_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMarginLiquidated?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_gt?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_gte?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMarginLiquidated_lt?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_lte?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_not?: InputMaybe<Scalars['BigInt']>;
  totalMarginLiquidated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_gte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolume_lt?: InputMaybe<Scalars['BigInt']>;
  totalVolume_lte?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not?: InputMaybe<Scalars['BigInt']>;
  totalVolume_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades?: InputMaybe<Array<Scalars['String']>>;
  trades_?: InputMaybe<FuturesTrade_Filter>;
  trades_contains?: InputMaybe<Array<Scalars['String']>>;
  trades_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  trades_not?: InputMaybe<Array<Scalars['String']>>;
  trades_not_contains?: InputMaybe<Array<Scalars['String']>>;
  trades_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Trader_OrderBy {
  CreatedAt = 'createdAt',
  FeesPaidToSynthetix = 'feesPaidToSynthetix',
  Id = 'id',
  LastTradeTimestamp = 'lastTradeTimestamp',
  Margin = 'margin',
  RealizedPnl = 'realizedPnl',
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

export type FuturesMarginTransferQueryVariables = Exact<{
  where?: InputMaybe<FuturesMarginTransfer_Filter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesMarginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FuturesMarginTransferQuery = { __typename?: 'Query', futuresMarginTransfers: Array<{ __typename?: 'FuturesMarginTransfer', id: string, timestamp: string, size: string, txHash: string, trader: { __typename?: 'Trader', id: string }, market: { __typename?: 'FuturesMarket', asset: string } }> };

export type FuturesTradesQueryVariables = Exact<{
  where?: InputMaybe<FuturesTrade_Filter>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type FuturesTradesQuery = { __typename?: 'Query', futuresTrades: Array<{ __typename?: 'FuturesTrade', id: string, timestamp: string, margin: string, size: string, feesPaidToSynthetix: string, type: FuturesTradeType, realizedPnl: string, positionClosed: boolean, positionSize: string, price: string, txHash: string, trader: { __typename?: 'Trader', id: string }, market: { __typename?: 'FuturesMarket', id: string, asset: string }, futuresPosition: { __typename?: 'FuturesPosition', id: string } }> };

export type TradesQueryQueryVariables = Exact<{
  where?: InputMaybe<FuturesTrade_Filter>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesTrade_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type TradesQueryQuery = { __typename?: 'Query', futuresTrades: Array<{ __typename?: 'FuturesTrade', id: string, timestamp: string }> };

export type LiquidatedQueryQueryVariables = Exact<{
  where?: InputMaybe<PositionLiquidated_Filter>;
  orderBy?: InputMaybe<PositionLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type LiquidatedQueryQuery = { __typename?: 'Query', positionLiquidateds: Array<{ __typename?: 'PositionLiquidated', id: string, size: string, trader: { __typename?: 'Trader', id: string }, market: { __typename?: 'FuturesMarket', asset: string }, futuresPosition: { __typename?: 'FuturesPosition', margin: string } }> };

export type StatsQueryQueryVariables = Exact<{
  where?: InputMaybe<DailyStat_Filter>;
  orderBy?: InputMaybe<DailyStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type StatsQueryQuery = { __typename?: 'Query', dailyStats: Array<{ __typename?: 'DailyStat', id: string, timestamp: string, cumulativeVolume: string, volume: string, fees: string, cumulativeFees: string, day: string, existingTraders: string, newTraders: string, cumulativeTraders: string, cumulativeTrades: string, trades: string }> };

export type MarketsQueryQueryVariables = Exact<{
  where?: InputMaybe<DailyMarketStat_Filter>;
  orderBy?: InputMaybe<DailyMarketStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type MarketsQueryQuery = { __typename?: 'Query', dailyMarketStats: Array<{ __typename?: 'DailyMarketStat', id: string, day: string, volume: string, market: { __typename?: 'FuturesMarket', id: string, marketKey: string, asset: string, isActive: boolean, timestamp: string } }> };

export type MarketsIdQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketsIdQueryQuery = { __typename?: 'Query', futuresMarkets: Array<{ __typename?: 'FuturesMarket', id: string, marketKey: string }> };

export type PositionsLiquidatedQueryVariables = Exact<{
  where?: InputMaybe<PositionLiquidated_Filter>;
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type PositionsLiquidatedQuery = { __typename?: 'Query', positionLiquidateds: Array<{ __typename?: 'PositionLiquidated', id: string, timestamp: string, txHash: string, size: string, price: string, fee: string, liquidator: string, futuresPosition: { __typename?: 'FuturesPosition', leverage: string }, market: { __typename?: 'FuturesMarket', asset: string }, trader: { __typename?: 'Trader', id: string, totalLiquidations: string } }> };

export type PositionsMarketQueryVariables = Exact<{
  where?: InputMaybe<FuturesPosition_Filter>;
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuturesPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type PositionsMarketQuery = { __typename?: 'Query', futuresPositions: Array<{ __typename?: 'FuturesPosition', isOpen: boolean, entryPrice: string, avgEntryPrice: string, leverage: string, feesPaidToSynthetix: string, id: string, realizedPnl: string, unrealizedPnl: string, exitPrice?: string | null, lastPrice: string, netFunding: string, long: boolean, size: string, isLiquidated: boolean, market: { __typename?: 'FuturesMarket', id: string, marketKey: string, asset: string }, trader: { __typename?: 'Trader', id: string } }> };

export type SynthetixQueryVariables = Exact<{ [key: string]: never; }>;


export type SynthetixQuery = { __typename?: 'Query', synthetix?: { __typename?: 'Synthetix', feesByLiquidations: string, feesByPositionModifications: string, totalVolume: string, totalLiquidations: string, totalTraders: string } | null };


export const FuturesMarginTransferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FuturesMarginTransfer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesMarginTransfer_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesMarginTransfer_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresMarginTransfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"trader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]}}]} as unknown as DocumentNode<FuturesMarginTransferQuery, FuturesMarginTransferQueryVariables>;
export const FuturesTradesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FuturesTrades"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesTrade_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesTrade_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresTrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"trader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"margin"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"futuresPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"feesPaidToSynthetix"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"realizedPnl"}},{"kind":"Field","name":{"kind":"Name","value":"positionClosed"}},{"kind":"Field","name":{"kind":"Name","value":"positionSize"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]}}]} as unknown as DocumentNode<FuturesTradesQuery, FuturesTradesQueryVariables>;
export const TradesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TradesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesTrade_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesTrade_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresTrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<TradesQueryQuery, TradesQueryQueryVariables>;
export const LiquidatedQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LiquidatedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionLiquidated_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionLiquidated_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionLiquidateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"trader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"futuresPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"margin"}}]}}]}}]}}]} as unknown as DocumentNode<LiquidatedQueryQuery, LiquidatedQueryQueryVariables>;
export const StatsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StatsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DailyStat_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DailyStat_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeVolume"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeFees"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"existingTraders"}},{"kind":"Field","name":{"kind":"Name","value":"newTraders"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeTraders"}},{"kind":"Field","name":{"kind":"Name","value":"cumulativeTrades"}},{"kind":"Field","name":{"kind":"Name","value":"trades"}}]}}]}}]} as unknown as DocumentNode<StatsQueryQuery, StatsQueryQueryVariables>;
export const MarketsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DailyMarketStat_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DailyMarketStat_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyMarketStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketKey"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}}]}}]} as unknown as DocumentNode<MarketsQueryQuery, MarketsQueryQueryVariables>;
export const MarketsIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketsIdQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresMarkets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketKey"}}]}}]}}]} as unknown as DocumentNode<MarketsIdQueryQuery, MarketsIdQueryQueryVariables>;
export const PositionsLiquidatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PositionsLiquidated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionLiquidated_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionLiquidated_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionLiquidateds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"futuresPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leverage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"liquidator"}},{"kind":"Field","name":{"kind":"Name","value":"trader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidations"}}]}}]}}]}}]} as unknown as DocumentNode<PositionsLiquidatedQuery, PositionsLiquidatedQueryVariables>;
export const PositionsMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PositionsMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesPosition_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FuturesPosition_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futuresPositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketKey"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"entryPrice"}},{"kind":"Field","name":{"kind":"Name","value":"avgEntryPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"feesPaidToSynthetix"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"realizedPnl"}},{"kind":"Field","name":{"kind":"Name","value":"unrealizedPnl"}},{"kind":"Field","name":{"kind":"Name","value":"feesPaidToSynthetix"}},{"kind":"Field","name":{"kind":"Name","value":"exitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"lastPrice"}},{"kind":"Field","name":{"kind":"Name","value":"netFunding"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"isLiquidated"}}]}}]}}]} as unknown as DocumentNode<PositionsMarketQuery, PositionsMarketQueryVariables>;
export const SynthetixDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Synthetix"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"synthetix"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"synthetix","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feesByLiquidations"}},{"kind":"Field","name":{"kind":"Name","value":"feesByPositionModifications"}},{"kind":"Field","name":{"kind":"Name","value":"totalVolume"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidations"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}}]}}]}}]} as unknown as DocumentNode<SynthetixQuery, SynthetixQueryVariables>;