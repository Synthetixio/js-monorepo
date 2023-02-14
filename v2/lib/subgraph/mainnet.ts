// !!! DO NOT EDIT !!! Automatically generated file

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

export type ActiveStaker = {
  __typename?: 'ActiveStaker';
  id: Scalars['ID'];
};

export type ActiveStaker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ActiveStaker_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ActiveStaker_Filter>>>;
};

export enum ActiveStaker_OrderBy {
  Id = 'id',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/**  Burned tracks this event from various Synth.sol instances  */
export type Burned = {
  __typename?: 'Burned';
  account: Scalars['Bytes'];
  block: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  source: Scalars['String'];
  timestamp: Scalars['BigInt'];
  value: Scalars['BigDecimal'];
};

export type Burned_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Burned_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Burned_Filter>>>;
  source?: InputMaybe<Scalars['String']>;
  source_contains?: InputMaybe<Scalars['String']>;
  source_contains_nocase?: InputMaybe<Scalars['String']>;
  source_ends_with?: InputMaybe<Scalars['String']>;
  source_ends_with_nocase?: InputMaybe<Scalars['String']>;
  source_gt?: InputMaybe<Scalars['String']>;
  source_gte?: InputMaybe<Scalars['String']>;
  source_in?: InputMaybe<Array<Scalars['String']>>;
  source_lt?: InputMaybe<Scalars['String']>;
  source_lte?: InputMaybe<Scalars['String']>;
  source_not?: InputMaybe<Scalars['String']>;
  source_not_contains?: InputMaybe<Scalars['String']>;
  source_not_contains_nocase?: InputMaybe<Scalars['String']>;
  source_not_ends_with?: InputMaybe<Scalars['String']>;
  source_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  source_not_in?: InputMaybe<Array<Scalars['String']>>;
  source_not_starts_with?: InputMaybe<Scalars['String']>;
  source_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  source_starts_with?: InputMaybe<Scalars['String']>;
  source_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Burned_OrderBy {
  Account = 'account',
  Block = 'block',
  GasPrice = 'gasPrice',
  Id = 'id',
  Source = 'source',
  Timestamp = 'timestamp',
  Value = 'value',
}

export type DailyBurned = {
  __typename?: 'DailyBurned';
  /**  unix timestamp at beginning of day of the measurement  */
  id: Scalars['ID'];
  /**  amount of debt as of the last event for this day  */
  totalDebt: Scalars['BigDecimal'];
  /**  amount burned  */
  value: Scalars['BigDecimal'];
};

export type DailyBurned_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyBurned_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DailyBurned_Filter>>>;
  totalDebt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalDebt_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_not?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum DailyBurned_OrderBy {
  Id = 'id',
  TotalDebt = 'totalDebt',
  Value = 'value',
}

export type DailyIssued = {
  __typename?: 'DailyIssued';
  /**  unix timestamp at beginning of day of the measurement  */
  id: Scalars['ID'];
  /**  amount of debt as of the last event for this day  */
  totalDebt: Scalars['BigDecimal'];
  /**  amount issued  */
  value: Scalars['BigDecimal'];
};

export type DailyIssued_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyIssued_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DailyIssued_Filter>>>;
  totalDebt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalDebt_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_not?: InputMaybe<Scalars['BigDecimal']>;
  totalDebt_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum DailyIssued_OrderBy {
  Id = 'id',
  TotalDebt = 'totalDebt',
  Value = 'value',
}

/**  A historical debt tracker  */
export type DebtSnapshot = {
  __typename?: 'DebtSnapshot';
  /**  address for which these statistics are applicable  */
  account: Scalars['Bytes'];
  balanceOf?: Maybe<Scalars['BigDecimal']>;
  /**  last block where an event happened  */
  block: Scalars['BigInt'];
  /**  SNX which is being used for collateral as of last event and cannot be spent  */
  collateral?: Maybe<Scalars['BigDecimal']>;
  /**  sUSD of debt as of last event  */
  debtBalanceOf?: Maybe<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  /**  last time when an event happened  */
  timestamp: Scalars['BigInt'];
};

export type DebtSnapshot_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<DebtSnapshot_Filter>>>;
  balanceOf?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtBalanceOf?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtBalanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  debtBalanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DebtSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DebtSnapshot_OrderBy {
  Account = 'account',
  BalanceOf = 'balanceOf',
  Block = 'block',
  Collateral = 'collateral',
  DebtBalanceOf = 'debtBalanceOf',
  Id = 'id',
  Timestamp = 'timestamp',
}

/**  Tracks this event from Synthetix.sol  */
export type FeesClaimed = {
  __typename?: 'FeesClaimed';
  account: Scalars['Bytes'];
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  rewards: Scalars['BigDecimal'];
  timestamp: Scalars['BigInt'];
  value: Scalars['BigDecimal'];
};

export type FeesClaimed_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<FeesClaimed_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<FeesClaimed_Filter>>>;
  rewards?: InputMaybe<Scalars['BigDecimal']>;
  rewards_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewards_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewards_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewards_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewards_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewards_not?: InputMaybe<Scalars['BigDecimal']>;
  rewards_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum FeesClaimed_OrderBy {
  Account = 'account',
  Block = 'block',
  Id = 'id',
  Rewards = 'rewards',
  Timestamp = 'timestamp',
  Value = 'value',
}

/**  Tracks this event from various Synth.sol instances  */
export type Issued = {
  __typename?: 'Issued';
  account: Scalars['Bytes'];
  block: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  source: Scalars['String'];
  timestamp: Scalars['BigInt'];
  value: Scalars['BigDecimal'];
};

export type Issued_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Issued_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Issued_Filter>>>;
  source?: InputMaybe<Scalars['String']>;
  source_contains?: InputMaybe<Scalars['String']>;
  source_contains_nocase?: InputMaybe<Scalars['String']>;
  source_ends_with?: InputMaybe<Scalars['String']>;
  source_ends_with_nocase?: InputMaybe<Scalars['String']>;
  source_gt?: InputMaybe<Scalars['String']>;
  source_gte?: InputMaybe<Scalars['String']>;
  source_in?: InputMaybe<Array<Scalars['String']>>;
  source_lt?: InputMaybe<Scalars['String']>;
  source_lte?: InputMaybe<Scalars['String']>;
  source_not?: InputMaybe<Scalars['String']>;
  source_not_contains?: InputMaybe<Scalars['String']>;
  source_not_contains_nocase?: InputMaybe<Scalars['String']>;
  source_not_ends_with?: InputMaybe<Scalars['String']>;
  source_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  source_not_in?: InputMaybe<Array<Scalars['String']>>;
  source_not_starts_with?: InputMaybe<Scalars['String']>;
  source_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  source_starts_with?: InputMaybe<Scalars['String']>;
  source_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Issued_OrderBy {
  Account = 'account',
  Block = 'block',
  GasPrice = 'gasPrice',
  Id = 'id',
  Source = 'source',
  Timestamp = 'timestamp',
  Value = 'value',
}

/**  An individual Issuer  */
export type Issuer = {
  __typename?: 'Issuer';
  id: Scalars['ID'];
};

export type Issuer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Issuer_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Issuer_Filter>>>;
};

export enum Issuer_OrderBy {
  Id = 'id',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  activeStaker?: Maybe<ActiveStaker>;
  activeStakers: Array<ActiveStaker>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  dailyBurned?: Maybe<DailyBurned>;
  dailyBurneds: Array<DailyBurned>;
  dailyIssued?: Maybe<DailyIssued>;
  dailyIssueds: Array<DailyIssued>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synthHolder?: Maybe<SynthHolder>;
  synthHolders: Array<SynthHolder>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ActiveStaker_Filter>;
};

export type QueryBurnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBurnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burned_Filter>;
};

export type QueryDailyBurnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDailyBurnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyBurned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyBurned_Filter>;
};

export type QueryDailyIssuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDailyIssuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyIssued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyIssued_Filter>;
};

export type QueryDebtSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDebtSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DebtSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DebtSnapshot_Filter>;
};

export type QueryFeesClaimedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFeesClaimedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeesClaimed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeesClaimed_Filter>;
};

export type QueryIssuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIssuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Issued_Filter>;
};

export type QueryIssuerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIssuersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issuer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Issuer_Filter>;
};

export type QueryRewardEscrowHolderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRewardEscrowHoldersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardEscrowHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEscrowHolder_Filter>;
};

export type QuerySnxholderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySnxholdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SnxHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SnxHolder_Filter>;
};

export type QuerySynthHolderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySynthHoldersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthHolder_Filter>;
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

export type QueryTotalActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTotalActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalActiveStaker_Filter>;
};

export type QueryTotalDailyActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTotalDailyActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalDailyActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalDailyActiveStaker_Filter>;
};

export type RewardEscrowHolder = {
  __typename?: 'RewardEscrowHolder';
  /**  amount of tokens remaining to be claimed from the escrow  */
  balanceOf: Scalars['BigDecimal'];
  /**  address which holds a rewardescrow  */
  id: Scalars['ID'];
  /**  amount of SNX claimed from the escrow  */
  vestedBalanceOf: Scalars['BigDecimal'];
};

export type RewardEscrowHolder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RewardEscrowHolder_Filter>>>;
  balanceOf?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<RewardEscrowHolder_Filter>>>;
  vestedBalanceOf?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  vestedBalanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  vestedBalanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum RewardEscrowHolder_OrderBy {
  BalanceOf = 'balanceOf',
  Id = 'id',
  VestedBalanceOf = 'vestedBalanceOf',
}

/**  An individual SNX holder (always overridden with their latest information)  */
export type SnxHolder = {
  __typename?: 'SNXHolder';
  /**  current SNX balance of the holder  */
  balanceOf?: Maybe<Scalars['BigDecimal']>;
  /**  last block where an event happened  */
  block: Scalars['BigInt'];
  /**  number of claims performed  */
  claims?: Maybe<Scalars['BigInt']>;
  /**  SNX which is being used for collateral as of last event and cannot be spent  */
  collateral?: Maybe<Scalars['BigDecimal']>;
  debtEntryAtIndex?: Maybe<Scalars['BigInt']>;
  /**  address of holder  */
  id: Scalars['ID'];
  initialDebtOwnership?: Maybe<Scalars['BigInt']>;
  /**  number of mints performed  */
  mints?: Maybe<Scalars['BigInt']>;
  /**  last time where an event happened  */
  timestamp: Scalars['BigInt'];
  /**  SNX which can be spent as of last event  */
  transferable?: Maybe<Scalars['BigDecimal']>;
};

export type SnxHolder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SnxHolder_Filter>>>;
  balanceOf?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claims?: InputMaybe<Scalars['BigInt']>;
  claims_gt?: InputMaybe<Scalars['BigInt']>;
  claims_gte?: InputMaybe<Scalars['BigInt']>;
  claims_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claims_lt?: InputMaybe<Scalars['BigInt']>;
  claims_lte?: InputMaybe<Scalars['BigInt']>;
  claims_not?: InputMaybe<Scalars['BigInt']>;
  claims_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtEntryAtIndex?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_gt?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_gte?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  debtEntryAtIndex_lt?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_lte?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_not?: InputMaybe<Scalars['BigInt']>;
  debtEntryAtIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initialDebtOwnership?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_gt?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_gte?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialDebtOwnership_lt?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_lte?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_not?: InputMaybe<Scalars['BigInt']>;
  initialDebtOwnership_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mints?: InputMaybe<Scalars['BigInt']>;
  mints_gt?: InputMaybe<Scalars['BigInt']>;
  mints_gte?: InputMaybe<Scalars['BigInt']>;
  mints_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mints_lt?: InputMaybe<Scalars['BigInt']>;
  mints_lte?: InputMaybe<Scalars['BigInt']>;
  mints_not?: InputMaybe<Scalars['BigInt']>;
  mints_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<SnxHolder_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferable?: InputMaybe<Scalars['BigDecimal']>;
  transferable_gt?: InputMaybe<Scalars['BigDecimal']>;
  transferable_gte?: InputMaybe<Scalars['BigDecimal']>;
  transferable_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  transferable_lt?: InputMaybe<Scalars['BigDecimal']>;
  transferable_lte?: InputMaybe<Scalars['BigDecimal']>;
  transferable_not?: InputMaybe<Scalars['BigDecimal']>;
  transferable_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum SnxHolder_OrderBy {
  BalanceOf = 'balanceOf',
  Block = 'block',
  Claims = 'claims',
  Collateral = 'collateral',
  DebtEntryAtIndex = 'debtEntryAtIndex',
  Id = 'id',
  InitialDebtOwnership = 'initialDebtOwnership',
  Mints = 'mints',
  Timestamp = 'timestamp',
  Transferable = 'transferable',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  activeStaker?: Maybe<ActiveStaker>;
  activeStakers: Array<ActiveStaker>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  dailyBurned?: Maybe<DailyBurned>;
  dailyBurneds: Array<DailyBurned>;
  dailyIssued?: Maybe<DailyIssued>;
  dailyIssueds: Array<DailyIssued>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synthHolder?: Maybe<SynthHolder>;
  synthHolders: Array<SynthHolder>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ActiveStaker_Filter>;
};

export type SubscriptionBurnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBurnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burned_Filter>;
};

export type SubscriptionDailyBurnedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDailyBurnedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyBurned_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyBurned_Filter>;
};

export type SubscriptionDailyIssuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDailyIssuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyIssued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyIssued_Filter>;
};

export type SubscriptionDebtSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDebtSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DebtSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DebtSnapshot_Filter>;
};

export type SubscriptionFeesClaimedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFeesClaimedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeesClaimed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeesClaimed_Filter>;
};

export type SubscriptionIssuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIssuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Issued_Filter>;
};

export type SubscriptionIssuerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIssuersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issuer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Issuer_Filter>;
};

export type SubscriptionRewardEscrowHolderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRewardEscrowHoldersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardEscrowHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardEscrowHolder_Filter>;
};

export type SubscriptionSnxholderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSnxholdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SnxHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SnxHolder_Filter>;
};

export type SubscriptionSynthHolderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSynthHoldersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthHolder_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthHolder_Filter>;
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

export type SubscriptionTotalActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTotalActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalActiveStaker_Filter>;
};

export type SubscriptionTotalDailyActiveStakerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTotalDailyActiveStakersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalDailyActiveStaker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TotalDailyActiveStaker_Filter>;
};

export type SynthHolder = {
  __typename?: 'SynthHolder';
  /**  units of the synth held in wei  */
  balanceOf: Scalars['BigDecimal'];
  /**  address of the holder + the synth  */
  id: Scalars['ID'];
  /**  currencyKey of the synth  */
  synth: Scalars['String'];
};

export type SynthHolder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SynthHolder_Filter>>>;
  balanceOf?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_gte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balanceOf_lt?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_lte?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not?: InputMaybe<Scalars['BigDecimal']>;
  balanceOf_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<SynthHolder_Filter>>>;
  synth?: InputMaybe<Scalars['String']>;
  synth_contains?: InputMaybe<Scalars['String']>;
  synth_contains_nocase?: InputMaybe<Scalars['String']>;
  synth_ends_with?: InputMaybe<Scalars['String']>;
  synth_ends_with_nocase?: InputMaybe<Scalars['String']>;
  synth_gt?: InputMaybe<Scalars['String']>;
  synth_gte?: InputMaybe<Scalars['String']>;
  synth_in?: InputMaybe<Array<Scalars['String']>>;
  synth_lt?: InputMaybe<Scalars['String']>;
  synth_lte?: InputMaybe<Scalars['String']>;
  synth_not?: InputMaybe<Scalars['String']>;
  synth_not_contains?: InputMaybe<Scalars['String']>;
  synth_not_contains_nocase?: InputMaybe<Scalars['String']>;
  synth_not_ends_with?: InputMaybe<Scalars['String']>;
  synth_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  synth_not_in?: InputMaybe<Array<Scalars['String']>>;
  synth_not_starts_with?: InputMaybe<Scalars['String']>;
  synth_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  synth_starts_with?: InputMaybe<Scalars['String']>;
  synth_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum SynthHolder_OrderBy {
  BalanceOf = 'balanceOf',
  Id = 'id',
  Synth = 'synth',
}

/**  Synthentix is an aggregation entity  */
export type Synthetix = {
  __typename?: 'Synthetix';
  id: Scalars['ID'];
  /**  number of stakers currently staking  */
  issuers: Scalars['BigInt'];
  /**  number of addresses which hold SNX  */
  snxHolders: Scalars['BigInt'];
};

export type Synthetix_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Synthetix_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  issuers?: InputMaybe<Scalars['BigInt']>;
  issuers_gt?: InputMaybe<Scalars['BigInt']>;
  issuers_gte?: InputMaybe<Scalars['BigInt']>;
  issuers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issuers_lt?: InputMaybe<Scalars['BigInt']>;
  issuers_lte?: InputMaybe<Scalars['BigInt']>;
  issuers_not?: InputMaybe<Scalars['BigInt']>;
  issuers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Synthetix_Filter>>>;
  snxHolders?: InputMaybe<Scalars['BigInt']>;
  snxHolders_gt?: InputMaybe<Scalars['BigInt']>;
  snxHolders_gte?: InputMaybe<Scalars['BigInt']>;
  snxHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snxHolders_lt?: InputMaybe<Scalars['BigInt']>;
  snxHolders_lte?: InputMaybe<Scalars['BigInt']>;
  snxHolders_not?: InputMaybe<Scalars['BigInt']>;
  snxHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Synthetix_OrderBy {
  Id = 'id',
  Issuers = 'issuers',
  SnxHolders = 'snxHolders',
}

export type TotalActiveStaker = {
  __typename?: 'TotalActiveStaker';
  /**  number of stakers seen  */
  count: Scalars['BigInt'];
  /**  single value  */
  id: Scalars['ID'];
};

export type TotalActiveStaker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TotalActiveStaker_Filter>>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<TotalActiveStaker_Filter>>>;
};

export enum TotalActiveStaker_OrderBy {
  Count = 'count',
  Id = 'id',
}

export type TotalDailyActiveStaker = {
  __typename?: 'TotalDailyActiveStaker';
  /**  number of stakers seen on this day  */
  count: Scalars['BigInt'];
  /**  unix timestamp at beginning of day relevant to this statistic  */
  id: Scalars['ID'];
  /**  unix timestamp as a BigInt (so it can be filtered)  */
  timestamp: Scalars['BigInt'];
};

export type TotalDailyActiveStaker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TotalDailyActiveStaker_Filter>>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<TotalDailyActiveStaker_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum TotalDailyActiveStaker_OrderBy {
  Count = 'count',
  Id = 'id',
  Timestamp = 'timestamp',
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
  Deny = 'deny',
}
