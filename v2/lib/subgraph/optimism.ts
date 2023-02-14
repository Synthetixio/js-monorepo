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

export type AccountFlaggedForLiquidation = {
  __typename?: 'AccountFlaggedForLiquidation';
  /**  the address of the staker  */
  account: Scalars['Bytes'];
  /**  total collateral held by the staker including escrow amount  */
  collateral: Scalars['BigDecimal'];
  /**  current collateral ratio  */
  collateralRatio: Scalars['BigInt'];
  /**  liqudation deadline  */
  deadline: Scalars['BigInt'];
  /**  the deadline plus the staker address  */
  id: Scalars['ID'];
  /**  snx that is liquidatable  */
  liquidatableNonEscrowSNX: Scalars['BigDecimal'];
};

export type AccountFlaggedForLiquidation_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<AccountFlaggedForLiquidation_Filter>>>;
  collateral?: InputMaybe<Scalars['BigDecimal']>;
  collateralRatio?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_gt?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_gte?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralRatio_lt?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_lte?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_not?: InputMaybe<Scalars['BigInt']>;
  collateralRatio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not?: InputMaybe<Scalars['BigDecimal']>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidatableNonEscrowSNX?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatableNonEscrowSNX_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidatableNonEscrowSNX_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<AccountFlaggedForLiquidation_Filter>>>;
};

export enum AccountFlaggedForLiquidation_OrderBy {
  Account = 'account',
  Collateral = 'collateral',
  CollateralRatio = 'collateralRatio',
  Deadline = 'deadline',
  Id = 'id',
  LiquidatableNonEscrowSnx = 'liquidatableNonEscrowSNX',
}

export type AccountLiquidated = {
  __typename?: 'AccountLiquidated';
  /** the liquidated address */
  account: Scalars['Bytes'];
  /** the amount of sUSD liquidated */
  amountLiquidated: Scalars['BigDecimal'];
  id: Scalars['ID'];
  /** the address liquidating the account */
  liquidator: Scalars['Bytes'];
  /** the amount of SNX redeemed by the liquidator */
  snxRedeemed: Scalars['BigDecimal'];
  /** the time at which the liquidation occurred */
  time: Scalars['BigInt'];
};

export type AccountLiquidated_Filter = {
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
  amountLiquidated?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountLiquidated_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_not?: InputMaybe<Scalars['BigDecimal']>;
  amountLiquidated_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<AccountLiquidated_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<AccountLiquidated_Filter>>>;
  snxRedeemed?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_gt?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_gte?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  snxRedeemed_lt?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_lte?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_not?: InputMaybe<Scalars['BigDecimal']>;
  snxRedeemed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AccountLiquidated_OrderBy {
  Account = 'account',
  AmountLiquidated = 'amountLiquidated',
  Id = 'id',
  Liquidator = 'liquidator',
  SnxRedeemed = 'snxRedeemed',
  Time = 'time',
}

export type AccountRemovedFromLiquidation = {
  __typename?: 'AccountRemovedFromLiquidation';
  /**  the address of the staker  */
  account: Scalars['Bytes'];
  /**  the time at which the staker fixed their c-ratio plus the staker address  */
  id: Scalars['ID'];
  /**  the time at which the staker fixed their c-ratio  */
  time: Scalars['BigInt'];
};

export type AccountRemovedFromLiquidation_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<AccountRemovedFromLiquidation_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<AccountRemovedFromLiquidation_Filter>>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AccountRemovedFromLiquidation_OrderBy {
  Account = 'account',
  Id = 'id',
  Time = 'time',
}

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

/**  Tracks this event from the Synthetix.sol contract. (Atomic exchanges also trigger standard SynthExchange events.) */
export type AtomicSynthExchange = {
  __typename?: 'AtomicSynthExchange';
  account: Exchanger;
  feesInUSD: Scalars['BigDecimal'];
  fromAmount: Scalars['BigDecimal'];
  fromAmountInUSD: Scalars['BigDecimal'];
  fromSynth?: Maybe<Synth>;
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  toAddress: Scalars['Bytes'];
  toAmount: Scalars['BigDecimal'];
  toAmountInUSD: Scalars['BigDecimal'];
  toSynth?: Maybe<Synth>;
};

export type AtomicSynthExchange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Exchanger_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  and?: InputMaybe<Array<InputMaybe<AtomicSynthExchange_Filter>>>;
  feesInUSD?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromSynth?: InputMaybe<Scalars['String']>;
  fromSynth_?: InputMaybe<Synth_Filter>;
  fromSynth_contains?: InputMaybe<Scalars['String']>;
  fromSynth_contains_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_ends_with?: InputMaybe<Scalars['String']>;
  fromSynth_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_gt?: InputMaybe<Scalars['String']>;
  fromSynth_gte?: InputMaybe<Scalars['String']>;
  fromSynth_in?: InputMaybe<Array<Scalars['String']>>;
  fromSynth_lt?: InputMaybe<Scalars['String']>;
  fromSynth_lte?: InputMaybe<Scalars['String']>;
  fromSynth_not?: InputMaybe<Scalars['String']>;
  fromSynth_not_contains?: InputMaybe<Scalars['String']>;
  fromSynth_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_not_ends_with?: InputMaybe<Scalars['String']>;
  fromSynth_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_not_in?: InputMaybe<Array<Scalars['String']>>;
  fromSynth_not_starts_with?: InputMaybe<Scalars['String']>;
  fromSynth_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_starts_with?: InputMaybe<Scalars['String']>;
  fromSynth_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<AtomicSynthExchange_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAmount?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toSynth?: InputMaybe<Scalars['String']>;
  toSynth_?: InputMaybe<Synth_Filter>;
  toSynth_contains?: InputMaybe<Scalars['String']>;
  toSynth_contains_nocase?: InputMaybe<Scalars['String']>;
  toSynth_ends_with?: InputMaybe<Scalars['String']>;
  toSynth_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_gt?: InputMaybe<Scalars['String']>;
  toSynth_gte?: InputMaybe<Scalars['String']>;
  toSynth_in?: InputMaybe<Array<Scalars['String']>>;
  toSynth_lt?: InputMaybe<Scalars['String']>;
  toSynth_lte?: InputMaybe<Scalars['String']>;
  toSynth_not?: InputMaybe<Scalars['String']>;
  toSynth_not_contains?: InputMaybe<Scalars['String']>;
  toSynth_not_contains_nocase?: InputMaybe<Scalars['String']>;
  toSynth_not_ends_with?: InputMaybe<Scalars['String']>;
  toSynth_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_not_in?: InputMaybe<Array<Scalars['String']>>;
  toSynth_not_starts_with?: InputMaybe<Scalars['String']>;
  toSynth_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_starts_with?: InputMaybe<Scalars['String']>;
  toSynth_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AtomicSynthExchange_OrderBy {
  Account = 'account',
  FeesInUsd = 'feesInUSD',
  FromAmount = 'fromAmount',
  FromAmountInUsd = 'fromAmountInUSD',
  FromSynth = 'fromSynth',
  GasPrice = 'gasPrice',
  Id = 'id',
  Timestamp = 'timestamp',
  ToAddress = 'toAddress',
  ToAmount = 'toAmount',
  ToAmountInUsd = 'toAmountInUSD',
  ToSynth = 'toSynth',
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

export type Candle = {
  __typename?: 'Candle';
  /**  Number of RateUpdates aggregated into this candle, mostly useful for the indexer to calculate averages  */
  aggregatedPrices: Scalars['BigInt'];
  average: Scalars['BigDecimal'];
  close: Scalars['BigDecimal'];
  high: Scalars['BigDecimal'];
  /**  synth-period-periodId (periodId is timestamp / period)  */
  id: Scalars['ID'];
  low: Scalars['BigDecimal'];
  open: Scalars['BigDecimal'];
  /**  Duration this candle captures in seconds. Year, quarter, month, week, day, hour, and 15 minutes available.  */
  period: Scalars['BigInt'];
  /**  Ticker for synth (e.g. 'sUSD') or 'SNX' */
  synth: Scalars['String'];
  timestamp: Scalars['BigInt'];
};

export type Candle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  aggregatedPrices?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_gt?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_gte?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedPrices_lt?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_lte?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_not?: InputMaybe<Scalars['BigInt']>;
  aggregatedPrices_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Candle_Filter>>>;
  average?: InputMaybe<Scalars['BigDecimal']>;
  average_gt?: InputMaybe<Scalars['BigDecimal']>;
  average_gte?: InputMaybe<Scalars['BigDecimal']>;
  average_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  average_lt?: InputMaybe<Scalars['BigDecimal']>;
  average_lte?: InputMaybe<Scalars['BigDecimal']>;
  average_not?: InputMaybe<Scalars['BigDecimal']>;
  average_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close?: InputMaybe<Scalars['BigDecimal']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close_lt?: InputMaybe<Scalars['BigDecimal']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']>;
  close_not?: InputMaybe<Scalars['BigDecimal']>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high?: InputMaybe<Scalars['BigDecimal']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high_lt?: InputMaybe<Scalars['BigDecimal']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']>;
  high_not?: InputMaybe<Scalars['BigDecimal']>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  low?: InputMaybe<Scalars['BigDecimal']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low_lt?: InputMaybe<Scalars['BigDecimal']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']>;
  low_not?: InputMaybe<Scalars['BigDecimal']>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open?: InputMaybe<Scalars['BigDecimal']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open_lt?: InputMaybe<Scalars['BigDecimal']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']>;
  open_not?: InputMaybe<Scalars['BigDecimal']>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<Candle_Filter>>>;
  period?: InputMaybe<Scalars['BigInt']>;
  period_gt?: InputMaybe<Scalars['BigInt']>;
  period_gte?: InputMaybe<Scalars['BigInt']>;
  period_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period_lt?: InputMaybe<Scalars['BigInt']>;
  period_lte?: InputMaybe<Scalars['BigInt']>;
  period_not?: InputMaybe<Scalars['BigInt']>;
  period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Candle_OrderBy {
  AggregatedPrices = 'aggregatedPrices',
  Average = 'average',
  Close = 'close',
  High = 'high',
  Id = 'id',
  Low = 'low',
  Open = 'open',
  Period = 'period',
  Synth = 'synth',
  Timestamp = 'timestamp',
}

export type CollateralDeposited = {
  __typename?: 'CollateralDeposited';
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the total amount of collateral after the deposit is included  */
  collateralAfter: Scalars['BigDecimal'];
  /**  the amount of collateral deposited  */
  collateralAmount: Scalars['BigDecimal'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp collateral was deposited  */
  timestamp: Scalars['BigInt'];
};

export type CollateralDeposited_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<CollateralDeposited_Filter>>>;
  collateralAfter?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAfter_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAmount?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralDeposited_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CollateralDeposited_OrderBy {
  Account = 'account',
  CollateralAfter = 'collateralAfter',
  CollateralAmount = 'collateralAmount',
  Id = 'id',
  LoanId = 'loanId',
  Timestamp = 'timestamp',
}

export type CollateralWithdrawn = {
  __typename?: 'CollateralWithdrawn';
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the amount of collateral withdrawn  */
  amountWithdrawn: Scalars['BigDecimal'];
  /**  the total amount of collateral after the withdrawal is accounted for  */
  collateralAfter: Scalars['BigDecimal'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp collateral was withdrawn  */
  timestamp: Scalars['BigInt'];
};

export type CollateralWithdrawn_Filter = {
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
  amountWithdrawn?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountWithdrawn_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_not?: InputMaybe<Scalars['BigDecimal']>;
  amountWithdrawn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<CollateralWithdrawn_Filter>>>;
  collateralAfter?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAfter_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralWithdrawn_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum CollateralWithdrawn_OrderBy {
  Account = 'account',
  AmountWithdrawn = 'amountWithdrawn',
  CollateralAfter = 'collateralAfter',
  Id = 'id',
  LoanId = 'loanId',
  Timestamp = 'timestamp',
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

/**  DEPRECATED: See the Candles entity */
export type DailyCandle = {
  __typename?: 'DailyCandle';
  close: Scalars['BigDecimal'];
  high: Scalars['BigDecimal'];
  /**  DEPRECATED: See the Candles entity  */
  id: Scalars['ID'];
  low: Scalars['BigDecimal'];
  open: Scalars['BigDecimal'];
  synth: Scalars['String'];
  timestamp: Scalars['BigInt'];
};

export type DailyCandle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyCandle_Filter>>>;
  close?: InputMaybe<Scalars['BigDecimal']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close_lt?: InputMaybe<Scalars['BigDecimal']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']>;
  close_not?: InputMaybe<Scalars['BigDecimal']>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high?: InputMaybe<Scalars['BigDecimal']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high_lt?: InputMaybe<Scalars['BigDecimal']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']>;
  high_not?: InputMaybe<Scalars['BigDecimal']>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  low?: InputMaybe<Scalars['BigDecimal']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low_lt?: InputMaybe<Scalars['BigDecimal']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']>;
  low_not?: InputMaybe<Scalars['BigDecimal']>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open?: InputMaybe<Scalars['BigDecimal']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open_lt?: InputMaybe<Scalars['BigDecimal']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']>;
  open_not?: InputMaybe<Scalars['BigDecimal']>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<DailyCandle_Filter>>>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DailyCandle_OrderBy {
  Close = 'close',
  High = 'high',
  Id = 'id',
  Low = 'low',
  Open = 'open',
  Synth = 'synth',
  Timestamp = 'timestamp',
}

export type DailyExchangePartner = {
  __typename?: 'DailyExchangePartner';
  /**  Day timestamp + tracking code of the partner  */
  id: Scalars['ID'];
  /**  Tracking code of the partner  */
  partner: Scalars['String'];
  /**  unix timestamp at the beginning of the day  */
  timestamp: Scalars['BigInt'];
  /**  Total number of trades from the volume partner for this day  */
  trades: Scalars['BigInt'];
  /**  Total fees generated by the volume partner for this day  */
  usdFees: Scalars['BigDecimal'];
  /**  Total transaction volume in USD for the partner on this day  */
  usdVolume: Scalars['BigDecimal'];
};

export type DailyExchangePartner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyExchangePartner_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DailyExchangePartner_Filter>>>;
  partner?: InputMaybe<Scalars['String']>;
  partner_contains?: InputMaybe<Scalars['String']>;
  partner_contains_nocase?: InputMaybe<Scalars['String']>;
  partner_ends_with?: InputMaybe<Scalars['String']>;
  partner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  partner_gt?: InputMaybe<Scalars['String']>;
  partner_gte?: InputMaybe<Scalars['String']>;
  partner_in?: InputMaybe<Array<Scalars['String']>>;
  partner_lt?: InputMaybe<Scalars['String']>;
  partner_lte?: InputMaybe<Scalars['String']>;
  partner_not?: InputMaybe<Scalars['String']>;
  partner_not_contains?: InputMaybe<Scalars['String']>;
  partner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  partner_not_ends_with?: InputMaybe<Scalars['String']>;
  partner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  partner_not_in?: InputMaybe<Array<Scalars['String']>>;
  partner_not_starts_with?: InputMaybe<Scalars['String']>;
  partner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  partner_starts_with?: InputMaybe<Scalars['String']>;
  partner_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  usdFees?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum DailyExchangePartner_OrderBy {
  Id = 'id',
  Partner = 'partner',
  Timestamp = 'timestamp',
  Trades = 'trades',
  UsdFees = 'usdFees',
  UsdVolume = 'usdVolume',
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
  /**  debt entry when `initialDebtOwnership` applies */
  debtEntryAtIndex?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  /**  sUSD debt portion a user had at last index  */
  initialDebtOwnership?: Maybe<Scalars['BigDecimal']>;
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
  initialDebtOwnership?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_gt?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_gte?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  initialDebtOwnership_lt?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_lte?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_not?: InputMaybe<Scalars['BigDecimal']>;
  initialDebtOwnership_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  DebtEntryAtIndex = 'debtEntryAtIndex',
  Id = 'id',
  InitialDebtOwnership = 'initialDebtOwnership',
  Timestamp = 'timestamp',
}

export type DebtState = {
  __typename?: 'DebtState';
  /**  representation of total amount of debt issued over time. increases or decreases proportionally whenever synths are minted/burned  */
  debtEntry: Scalars['BigDecimal'];
  /**  totalIssuedSynths / debtEntry - useful for tracking debt over time  */
  debtRatio: Scalars['BigDecimal'];
  /**  Global historical debt entry index  */
  id: Scalars['ID'];
  period: Scalars['BigInt'];
  /**  time at which these values are recorded  */
  timestamp: Scalars['BigInt'];
  /**  current value of all issued synths which this debt pool is responsible for. fluctuates based on the synth breakdown of the system * exchange rates  */
  totalIssuedSynths: Scalars['BigDecimal'];
};

export type DebtState_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DebtState_Filter>>>;
  debtEntry?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_gt?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_gte?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtEntry_lt?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_lte?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_not?: InputMaybe<Scalars['BigDecimal']>;
  debtEntry_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtRatio?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_gt?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_gte?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  debtRatio_lt?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_lte?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_not?: InputMaybe<Scalars['BigDecimal']>;
  debtRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DebtState_Filter>>>;
  period?: InputMaybe<Scalars['BigInt']>;
  period_gt?: InputMaybe<Scalars['BigInt']>;
  period_gte?: InputMaybe<Scalars['BigInt']>;
  period_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period_lt?: InputMaybe<Scalars['BigInt']>;
  period_lte?: InputMaybe<Scalars['BigInt']>;
  period_not?: InputMaybe<Scalars['BigInt']>;
  period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalIssuedSynths?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalIssuedSynths_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_not?: InputMaybe<Scalars['BigDecimal']>;
  totalIssuedSynths_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum DebtState_OrderBy {
  DebtEntry = 'debtEntry',
  DebtRatio = 'debtRatio',
  Id = 'id',
  Period = 'period',
  Timestamp = 'timestamp',
  TotalIssuedSynths = 'totalIssuedSynths',
}

export type DelegatedWallet = {
  __typename?: 'DelegatedWallet';
  authoriser: Scalars['Bytes'];
  canBurn?: Maybe<Scalars['Boolean']>;
  canClaim?: Maybe<Scalars['Boolean']>;
  canExchange?: Maybe<Scalars['Boolean']>;
  canMint?: Maybe<Scalars['Boolean']>;
  delegate: Scalars['Bytes'];
  /**  authoriser-delegate  */
  id: Scalars['ID'];
};

export type DelegatedWallet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegatedWallet_Filter>>>;
  authoriser?: InputMaybe<Scalars['Bytes']>;
  authoriser_contains?: InputMaybe<Scalars['Bytes']>;
  authoriser_gt?: InputMaybe<Scalars['Bytes']>;
  authoriser_gte?: InputMaybe<Scalars['Bytes']>;
  authoriser_in?: InputMaybe<Array<Scalars['Bytes']>>;
  authoriser_lt?: InputMaybe<Scalars['Bytes']>;
  authoriser_lte?: InputMaybe<Scalars['Bytes']>;
  authoriser_not?: InputMaybe<Scalars['Bytes']>;
  authoriser_not_contains?: InputMaybe<Scalars['Bytes']>;
  authoriser_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  canBurn?: InputMaybe<Scalars['Boolean']>;
  canBurn_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canBurn_not?: InputMaybe<Scalars['Boolean']>;
  canBurn_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canClaim?: InputMaybe<Scalars['Boolean']>;
  canClaim_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canClaim_not?: InputMaybe<Scalars['Boolean']>;
  canClaim_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canExchange?: InputMaybe<Scalars['Boolean']>;
  canExchange_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canExchange_not?: InputMaybe<Scalars['Boolean']>;
  canExchange_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canMint?: InputMaybe<Scalars['Boolean']>;
  canMint_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canMint_not?: InputMaybe<Scalars['Boolean']>;
  canMint_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  delegate?: InputMaybe<Scalars['Bytes']>;
  delegate_contains?: InputMaybe<Scalars['Bytes']>;
  delegate_gt?: InputMaybe<Scalars['Bytes']>;
  delegate_gte?: InputMaybe<Scalars['Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['Bytes']>>;
  delegate_lt?: InputMaybe<Scalars['Bytes']>;
  delegate_lte?: InputMaybe<Scalars['Bytes']>;
  delegate_not?: InputMaybe<Scalars['Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['Bytes']>;
  delegate_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<DelegatedWallet_Filter>>>;
};

export enum DelegatedWallet_OrderBy {
  Authoriser = 'authoriser',
  CanBurn = 'canBurn',
  CanClaim = 'canClaim',
  CanExchange = 'canExchange',
  CanMint = 'canMint',
  Delegate = 'delegate',
  Id = 'id',
}

export type ExchangeEntryAppended = {
  __typename?: 'ExchangeEntryAppended';
  /**  ethereum address which funded the exchange  */
  account: Scalars['Bytes'];
  /**  number of units of synth from exchanged  */
  amount: Scalars['BigDecimal'];
  /**  number of units of synth to received  */
  amountReceived: Scalars['BigDecimal'];
  /**  synth exchanged to  */
  dest: Scalars['Bytes'];
  /**  fee paid in sUSD to the synthetix fee pool  */
  exchangeFeeRate: Scalars['BigDecimal'];
  /**  transaction hash and log index  */
  id: Scalars['ID'];
  /**  aggregator price round for dest synth  */
  roundIdForDest: Scalars['BigInt'];
  /**  aggregator price round for src synth  */
  roundIdForSrc: Scalars['BigInt'];
  /**  synth exchanged from  */
  src: Scalars['Bytes'];
};

export type ExchangeEntryAppended_Filter = {
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
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountReceived_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_not?: InputMaybe<Scalars['BigDecimal']>;
  amountReceived_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ExchangeEntryAppended_Filter>>>;
  dest?: InputMaybe<Scalars['Bytes']>;
  dest_contains?: InputMaybe<Scalars['Bytes']>;
  dest_gt?: InputMaybe<Scalars['Bytes']>;
  dest_gte?: InputMaybe<Scalars['Bytes']>;
  dest_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dest_lt?: InputMaybe<Scalars['Bytes']>;
  dest_lte?: InputMaybe<Scalars['Bytes']>;
  dest_not?: InputMaybe<Scalars['Bytes']>;
  dest_not_contains?: InputMaybe<Scalars['Bytes']>;
  dest_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  exchangeFeeRate?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangeFeeRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_not?: InputMaybe<Scalars['BigDecimal']>;
  exchangeFeeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ExchangeEntryAppended_Filter>>>;
  roundIdForDest?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_gt?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_gte?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundIdForDest_lt?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_lte?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_not?: InputMaybe<Scalars['BigInt']>;
  roundIdForDest_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundIdForSrc?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_gt?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_gte?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundIdForSrc_lt?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_lte?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_not?: InputMaybe<Scalars['BigInt']>;
  roundIdForSrc_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  src?: InputMaybe<Scalars['Bytes']>;
  src_contains?: InputMaybe<Scalars['Bytes']>;
  src_gt?: InputMaybe<Scalars['Bytes']>;
  src_gte?: InputMaybe<Scalars['Bytes']>;
  src_in?: InputMaybe<Array<Scalars['Bytes']>>;
  src_lt?: InputMaybe<Scalars['Bytes']>;
  src_lte?: InputMaybe<Scalars['Bytes']>;
  src_not?: InputMaybe<Scalars['Bytes']>;
  src_not_contains?: InputMaybe<Scalars['Bytes']>;
  src_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum ExchangeEntryAppended_OrderBy {
  Account = 'account',
  Amount = 'amount',
  AmountReceived = 'amountReceived',
  Dest = 'dest',
  ExchangeFeeRate = 'exchangeFeeRate',
  Id = 'id',
  RoundIdForDest = 'roundIdForDest',
  RoundIdForSrc = 'roundIdForSrc',
  Src = 'src',
}

export type ExchangeEntrySettled = {
  __typename?: 'ExchangeEntrySettled';
  /**  number of units of synth from exchanged  */
  amount: Scalars['BigDecimal'];
  /**  address which receives the settlement  */
  dest: Scalars['Bytes'];
  /**  aggregator price round for dest synth  */
  destRoundIdAtPeriodEnd: Scalars['BigInt'];
  /**  time when the original exchange occured  */
  exchangeTimestamp: Scalars['BigInt'];
  /**  synth exchanged from  */
  from: Scalars['Bytes'];
  /**  transaction hash and log index  */
  id: Scalars['ID'];
  /**  amount returned of dest due to overpayment  */
  rebate: Scalars['BigDecimal'];
  /**  amount reclaimed of dest due to underpayment  */
  reclaim: Scalars['BigDecimal'];
  /**  synth exchanged to  */
  src: Scalars['Bytes'];
  /**  aggregator price round for src synth  */
  srcRoundIdAtPeriodEnd: Scalars['BigInt'];
};

export type ExchangeEntrySettled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ExchangeEntrySettled_Filter>>>;
  dest?: InputMaybe<Scalars['Bytes']>;
  destRoundIdAtPeriodEnd?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_gt?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_gte?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destRoundIdAtPeriodEnd_lt?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_lte?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_not?: InputMaybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dest_contains?: InputMaybe<Scalars['Bytes']>;
  dest_gt?: InputMaybe<Scalars['Bytes']>;
  dest_gte?: InputMaybe<Scalars['Bytes']>;
  dest_in?: InputMaybe<Array<Scalars['Bytes']>>;
  dest_lt?: InputMaybe<Scalars['Bytes']>;
  dest_lte?: InputMaybe<Scalars['Bytes']>;
  dest_not?: InputMaybe<Scalars['Bytes']>;
  dest_not_contains?: InputMaybe<Scalars['Bytes']>;
  dest_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  exchangeTimestamp?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  exchangeTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ExchangeEntrySettled_Filter>>>;
  rebate?: InputMaybe<Scalars['BigDecimal']>;
  rebate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rebate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rebate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rebate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rebate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rebate_not?: InputMaybe<Scalars['BigDecimal']>;
  rebate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reclaim?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_gt?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_gte?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reclaim_lt?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_lte?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_not?: InputMaybe<Scalars['BigDecimal']>;
  reclaim_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  src?: InputMaybe<Scalars['Bytes']>;
  srcRoundIdAtPeriodEnd?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_gt?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_gte?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  srcRoundIdAtPeriodEnd_lt?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_lte?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_not?: InputMaybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  src_contains?: InputMaybe<Scalars['Bytes']>;
  src_gt?: InputMaybe<Scalars['Bytes']>;
  src_gte?: InputMaybe<Scalars['Bytes']>;
  src_in?: InputMaybe<Array<Scalars['Bytes']>>;
  src_lt?: InputMaybe<Scalars['Bytes']>;
  src_lte?: InputMaybe<Scalars['Bytes']>;
  src_not?: InputMaybe<Scalars['Bytes']>;
  src_not_contains?: InputMaybe<Scalars['Bytes']>;
  src_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum ExchangeEntrySettled_OrderBy {
  Amount = 'amount',
  Dest = 'dest',
  DestRoundIdAtPeriodEnd = 'destRoundIdAtPeriodEnd',
  ExchangeTimestamp = 'exchangeTimestamp',
  From = 'from',
  Id = 'id',
  Rebate = 'rebate',
  Reclaim = 'reclaim',
  Src = 'src',
  SrcRoundIdAtPeriodEnd = 'srcRoundIdAtPeriodEnd',
}

export type ExchangeFee = {
  __typename?: 'ExchangeFee';
  /**  Current Fee as a ratio of the trade amount  */
  fee: Scalars['BigDecimal'];
  /**  Name of the synth. E.g. sUSD  */
  id: Scalars['ID'];
};

export type ExchangeFee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExchangeFee_Filter>>>;
  fee?: InputMaybe<Scalars['BigDecimal']>;
  fee_gt?: InputMaybe<Scalars['BigDecimal']>;
  fee_gte?: InputMaybe<Scalars['BigDecimal']>;
  fee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fee_lt?: InputMaybe<Scalars['BigDecimal']>;
  fee_lte?: InputMaybe<Scalars['BigDecimal']>;
  fee_not?: InputMaybe<Scalars['BigDecimal']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ExchangeFee_Filter>>>;
};

export enum ExchangeFee_OrderBy {
  Fee = 'fee',
  Id = 'id',
}

export type ExchangePartner = {
  __typename?: 'ExchangePartner';
  /**  Tracking code of the partner  */
  id: Scalars['ID'];
  /**  Total number of trades from the volume partner  */
  trades: Scalars['BigInt'];
  /**  Total fees generated by the volume partner  */
  usdFees: Scalars['BigDecimal'];
  /**  Total transaction volume in USD for the partner  */
  usdVolume: Scalars['BigDecimal'];
};

export type ExchangePartner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExchangePartner_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ExchangePartner_Filter>>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  usdFees?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum ExchangePartner_OrderBy {
  Id = 'id',
  Trades = 'trades',
  UsdFees = 'usdFees',
  UsdVolume = 'usdVolume',
}

/**  Tracks this event from the Synthetix.sol contract  */
export type ExchangeRebate = {
  __typename?: 'ExchangeRebate';
  account: Exchanger;
  amount: Scalars['BigDecimal'];
  amountInUSD: Scalars['BigDecimal'];
  block: Scalars['BigInt'];
  currencyKey: Scalars['Bytes'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
};

export type ExchangeRebate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Exchanger_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ExchangeRebate_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencyKey?: InputMaybe<Scalars['Bytes']>;
  currencyKey_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyKey_lt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_lte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  or?: InputMaybe<Array<InputMaybe<ExchangeRebate_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeRebate_OrderBy {
  Account = 'account',
  Amount = 'amount',
  AmountInUsd = 'amountInUSD',
  Block = 'block',
  CurrencyKey = 'currencyKey',
  GasPrice = 'gasPrice',
  Id = 'id',
  Timestamp = 'timestamp',
}

/**  Tracks this event from the Synthetix.sol contract  */
export type ExchangeReclaim = {
  __typename?: 'ExchangeReclaim';
  account: Exchanger;
  amount: Scalars['BigDecimal'];
  amountInUSD: Scalars['BigDecimal'];
  block: Scalars['BigInt'];
  currencyKey: Scalars['Bytes'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
};

export type ExchangeReclaim_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Exchanger_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ExchangeReclaim_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencyKey?: InputMaybe<Scalars['Bytes']>;
  currencyKey_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyKey_lt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_lte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  or?: InputMaybe<Array<InputMaybe<ExchangeReclaim_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeReclaim_OrderBy {
  Account = 'account',
  Amount = 'amount',
  AmountInUsd = 'amountInUSD',
  Block = 'block',
  CurrencyKey = 'currencyKey',
  GasPrice = 'gasPrice',
  Id = 'id',
  Timestamp = 'timestamp',
}

/**  An individual Exchanger aggregated by various time groupings  */
export type Exchanger = {
  __typename?: 'Exchanger';
  /**  balances  */
  balances: Array<LatestSynthBalance>;
  /**  minimum power of 10 (in from USD value) the trade must be. ex, 2 means $100 or higher)  */
  bucketMagnitude: Scalars['BigInt'];
  /**  synth value exchanged in USD units by account  */
  exchangeUSDTally: Scalars['BigDecimal'];
  /**  exchanges  */
  exchanges: Array<SynthExchange>;
  /**  when the user first exchanged  */
  firstSeen: Scalars['BigInt'];
  /**  hex address in lowercase (and for non global: hex address in lowercase-$timestamp-$period-$bucketMagnitude-$synth  */
  id: Scalars['ID'];
  /**  when the user last exchanged  */
  lastSeen: Scalars['BigInt'];
  /**  number of seconds the data covers after `timestamp`, or 0 for no period filter  */
  period: Scalars['BigInt'];
  /**  synth to filter by  */
  synth?: Maybe<Synth>;
  /**  timestamp of the beginning of the time period this represents, or 0 for no period filter  */
  timestamp: Scalars['BigInt'];
  /**  synth value received in fees in USD units from account  */
  totalFeesGeneratedInUSD: Scalars['BigDecimal'];
  /**  nubmer of trades by account  */
  trades: Scalars['BigInt'];
};

/**  An individual Exchanger aggregated by various time groupings  */
export type ExchangerBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestSynthBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LatestSynthBalance_Filter>;
};

/**  An individual Exchanger aggregated by various time groupings  */
export type ExchangerExchangesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthExchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SynthExchange_Filter>;
};

export type Exchanger_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Exchanger_Filter>>>;
  balances?: InputMaybe<Array<Scalars['String']>>;
  balances_?: InputMaybe<LatestSynthBalance_Filter>;
  balances_contains?: InputMaybe<Array<Scalars['String']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  balances_not?: InputMaybe<Array<Scalars['String']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['String']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  bucketMagnitude?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_gt?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_gte?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bucketMagnitude_lt?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_lte?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_not?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_gt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_gte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangeUSDTally_lt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_lte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_not?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchanges_?: InputMaybe<SynthExchange_Filter>;
  firstSeen?: InputMaybe<Scalars['BigInt']>;
  firstSeen_gt?: InputMaybe<Scalars['BigInt']>;
  firstSeen_gte?: InputMaybe<Scalars['BigInt']>;
  firstSeen_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstSeen_lt?: InputMaybe<Scalars['BigInt']>;
  firstSeen_lte?: InputMaybe<Scalars['BigInt']>;
  firstSeen_not?: InputMaybe<Scalars['BigInt']>;
  firstSeen_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastSeen?: InputMaybe<Scalars['BigInt']>;
  lastSeen_gt?: InputMaybe<Scalars['BigInt']>;
  lastSeen_gte?: InputMaybe<Scalars['BigInt']>;
  lastSeen_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastSeen_lt?: InputMaybe<Scalars['BigInt']>;
  lastSeen_lte?: InputMaybe<Scalars['BigInt']>;
  lastSeen_not?: InputMaybe<Scalars['BigInt']>;
  lastSeen_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Exchanger_Filter>>>;
  period?: InputMaybe<Scalars['BigInt']>;
  period_gt?: InputMaybe<Scalars['BigInt']>;
  period_gte?: InputMaybe<Scalars['BigInt']>;
  period_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period_lt?: InputMaybe<Scalars['BigInt']>;
  period_lte?: InputMaybe<Scalars['BigInt']>;
  period_not?: InputMaybe<Scalars['BigInt']>;
  period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  synth?: InputMaybe<Scalars['String']>;
  synth_?: InputMaybe<Synth_Filter>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFeesGeneratedInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Exchanger_OrderBy {
  Balances = 'balances',
  BucketMagnitude = 'bucketMagnitude',
  ExchangeUsdTally = 'exchangeUSDTally',
  Exchanges = 'exchanges',
  FirstSeen = 'firstSeen',
  Id = 'id',
  LastSeen = 'lastSeen',
  Period = 'period',
  Synth = 'synth',
  Timestamp = 'timestamp',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD',
  Trades = 'trades',
}

export type FeePeriod = {
  __typename?: 'FeePeriod';
  feesClaimed: Scalars['BigDecimal'];
  feesToDistribute: Scalars['BigDecimal'];
  id: Scalars['ID'];
  rewardsClaimed: Scalars['BigDecimal'];
  rewardsToDistribute: Scalars['BigDecimal'];
  startTime: Scalars['BigInt'];
};

export type FeePeriod_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeePeriod_Filter>>>;
  feesClaimed?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesClaimed_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_not?: InputMaybe<Scalars['BigDecimal']>;
  feesClaimed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesToDistribute?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesToDistribute_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_not?: InputMaybe<Scalars['BigDecimal']>;
  feesToDistribute_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<FeePeriod_Filter>>>;
  rewardsClaimed?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardsClaimed_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardsClaimed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardsToDistribute?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardsToDistribute_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardsToDistribute_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  startTime?: InputMaybe<Scalars['BigInt']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']>;
  startTime_not?: InputMaybe<Scalars['BigInt']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FeePeriod_OrderBy {
  FeesClaimed = 'feesClaimed',
  FeesToDistribute = 'feesToDistribute',
  Id = 'id',
  RewardsClaimed = 'rewardsClaimed',
  RewardsToDistribute = 'rewardsToDistribute',
  StartTime = 'startTime',
}

export type FeeRate = {
  __typename?: 'FeeRate';
  /**  string representing the setting name  */
  id: Scalars['ID'];
  /**  value of the setting  */
  rate: Scalars['BigDecimal'];
  setting: Scalars['String'];
  /**  name of the synth this record applies to, if any  */
  synth?: Maybe<Scalars['String']>;
};

export type FeeRate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeRate_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<FeeRate_Filter>>>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  setting?: InputMaybe<Scalars['String']>;
  setting_contains?: InputMaybe<Scalars['String']>;
  setting_contains_nocase?: InputMaybe<Scalars['String']>;
  setting_ends_with?: InputMaybe<Scalars['String']>;
  setting_ends_with_nocase?: InputMaybe<Scalars['String']>;
  setting_gt?: InputMaybe<Scalars['String']>;
  setting_gte?: InputMaybe<Scalars['String']>;
  setting_in?: InputMaybe<Array<Scalars['String']>>;
  setting_lt?: InputMaybe<Scalars['String']>;
  setting_lte?: InputMaybe<Scalars['String']>;
  setting_not?: InputMaybe<Scalars['String']>;
  setting_not_contains?: InputMaybe<Scalars['String']>;
  setting_not_contains_nocase?: InputMaybe<Scalars['String']>;
  setting_not_ends_with?: InputMaybe<Scalars['String']>;
  setting_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  setting_not_in?: InputMaybe<Array<Scalars['String']>>;
  setting_not_starts_with?: InputMaybe<Scalars['String']>;
  setting_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  setting_starts_with?: InputMaybe<Scalars['String']>;
  setting_starts_with_nocase?: InputMaybe<Scalars['String']>;
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

export enum FeeRate_OrderBy {
  Id = 'id',
  Rate = 'rate',
  Setting = 'setting',
  Synth = 'synth',
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

export type FuturesMarket = {
  __typename?: 'FuturesMarket';
  /**  Address of the market  */
  id: Scalars['ID'];
};

export type FuturesMarket_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<FuturesMarket_Filter>>>;
};

export enum FuturesMarket_OrderBy {
  Id = 'id',
}

/**  we dont query this entity but only use it to store aggregate data we need during syncing  */
export type InversePricingInfo = {
  __typename?: 'InversePricingInfo';
  /**  matching price point with long synth  */
  entryPoint: Scalars['BigDecimal'];
  /**  whether or not this inverse synth has been frozen  */
  frozen: Scalars['Boolean'];
  /**  Name of inverse synth. E.g. iETH  */
  id: Scalars['ID'];
  /**  configured lower limit  */
  lowerLimit: Scalars['BigDecimal'];
  /**  configured upper limit  */
  upperLimit: Scalars['BigDecimal'];
};

export type InversePricingInfo_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InversePricingInfo_Filter>>>;
  entryPoint?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_gt?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_gte?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  entryPoint_lt?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_lte?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_not?: InputMaybe<Scalars['BigDecimal']>;
  entryPoint_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  frozen?: InputMaybe<Scalars['Boolean']>;
  frozen_in?: InputMaybe<Array<Scalars['Boolean']>>;
  frozen_not?: InputMaybe<Scalars['Boolean']>;
  frozen_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lowerLimit?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_gt?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_gte?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lowerLimit_lt?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_lte?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_not?: InputMaybe<Scalars['BigDecimal']>;
  lowerLimit_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<InversePricingInfo_Filter>>>;
  upperLimit?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_gt?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_gte?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  upperLimit_lt?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_lte?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_not?: InputMaybe<Scalars['BigDecimal']>;
  upperLimit_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum InversePricingInfo_OrderBy {
  EntryPoint = 'entryPoint',
  Frozen = 'frozen',
  Id = 'id',
  LowerLimit = 'lowerLimit',
  UpperLimit = 'upperLimit',
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

export type LatestRate = {
  __typename?: 'LatestRate';
  /**  Address of the aggregator which produces current result  */
  aggregator: Scalars['Bytes'];
  /**  Name of synth. E.g. sUSD  */
  id: Scalars['ID'];
  /**  Synth USD rate  */
  rate: Scalars['BigDecimal'];
};

export type LatestRate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  aggregator?: InputMaybe<Scalars['Bytes']>;
  aggregator_contains?: InputMaybe<Scalars['Bytes']>;
  aggregator_gt?: InputMaybe<Scalars['Bytes']>;
  aggregator_gte?: InputMaybe<Scalars['Bytes']>;
  aggregator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  aggregator_lt?: InputMaybe<Scalars['Bytes']>;
  aggregator_lte?: InputMaybe<Scalars['Bytes']>;
  aggregator_not?: InputMaybe<Scalars['Bytes']>;
  aggregator_not_contains?: InputMaybe<Scalars['Bytes']>;
  aggregator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  and?: InputMaybe<Array<InputMaybe<LatestRate_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<LatestRate_Filter>>>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum LatestRate_OrderBy {
  Aggregator = 'aggregator',
  Id = 'id',
  Rate = 'rate',
}

/**  we dont query these entities but only use it to store aggregate data we need during syncing  */
export type LatestSynthBalance = {
  __typename?: 'LatestSynthBalance';
  account: Scalars['String'];
  address: Scalars['Bytes'];
  amount: Scalars['BigDecimal'];
  /**  account + synth address  */
  id: Scalars['ID'];
  synth?: Maybe<Synth>;
  timestamp: Scalars['BigInt'];
};

export type LatestSynthBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<LatestSynthBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<LatestSynthBalance_Filter>>>;
  synth?: InputMaybe<Scalars['String']>;
  synth_?: InputMaybe<Synth_Filter>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum LatestSynthBalance_OrderBy {
  Account = 'account',
  Address = 'address',
  Amount = 'amount',
  Id = 'id',
  Synth = 'synth',
  Timestamp = 'timestamp',
}

export type Loan = {
  __typename?: 'Loan';
  /**  the account receiving the loan  */
  account: Scalars['Bytes'];
  /**  the amount of the loan  */
  amount: Scalars['BigDecimal'];
  /**  the timestamp the loan was closed  */
  closedAt?: Maybe<Scalars['BigInt']>;
  /**  the amount of collateral  */
  collateralAmount: Scalars['BigDecimal'];
  /**  the currency of the collateralAmount  */
  collateralMinted: Scalars['String'];
  /**  the timestamp the loan was created  */
  createdAt: Scalars['BigInt'];
  /**  the currency of loan amount  */
  currency: Scalars['String'];
  /**  whether the loan has any partial liquidations  */
  hasPartialLiquidations: Scalars['Boolean'];
  /**  the loan id  */
  id: Scalars['ID'];
  /**  is the loan still open?  */
  isOpen: Scalars['Boolean'];
  /**  the transaction hash of the loan  */
  txHash: Scalars['String'];
};

export type LoanLiquidated = {
  __typename?: 'LoanLiquidated';
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the account that liquidated the loan  */
  liquidator: Scalars['Bytes'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp the loan was liquidated  */
  timestamp: Scalars['BigInt'];
};

export type LoanLiquidated_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<LoanLiquidated_Filter>>>;
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
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<LoanLiquidated_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum LoanLiquidated_OrderBy {
  Account = 'account',
  Id = 'id',
  Liquidator = 'liquidator',
  LoanId = 'loanId',
  Timestamp = 'timestamp',
}

export type LoanPartiallyLiquidated = {
  __typename?: 'LoanPartiallyLiquidated';
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the amount partially liquidated  */
  liquidatedAmount: Scalars['BigDecimal'];
  /**  the amount partially liquidated plus the liquidation fee  */
  liquidatedCollateral: Scalars['BigDecimal'];
  /**  the account that partially liquidated the loan  */
  liquidator: Scalars['Bytes'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp the loan was partially liquidated  */
  timestamp: Scalars['BigInt'];
};

export type LoanPartiallyLiquidated_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<LoanPartiallyLiquidated_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidatedAmount?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedCollateral?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedCollateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<LoanPartiallyLiquidated_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum LoanPartiallyLiquidated_OrderBy {
  Account = 'account',
  Id = 'id',
  LiquidatedAmount = 'liquidatedAmount',
  LiquidatedCollateral = 'liquidatedCollateral',
  Liquidator = 'liquidator',
  LoanId = 'loanId',
  Timestamp = 'timestamp',
}

export type LoanRepaid = {
  __typename?: 'LoanRepaid';
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the total amount of the loan after the repaid amount is accounted for  */
  newLoanAmount: Scalars['BigDecimal'];
  /**  the amount of the loan that was repaid  */
  repaidAmount: Scalars['BigDecimal'];
  /**  the timestamp the loan was partially or fully repaid  */
  timestamp: Scalars['BigInt'];
};

export type LoanRepaid_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<LoanRepaid_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  loanId?: InputMaybe<Scalars['BigInt']>;
  loanId_gt?: InputMaybe<Scalars['BigInt']>;
  loanId_gte?: InputMaybe<Scalars['BigInt']>;
  loanId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  loanId_lt?: InputMaybe<Scalars['BigInt']>;
  loanId_lte?: InputMaybe<Scalars['BigInt']>;
  loanId_not?: InputMaybe<Scalars['BigInt']>;
  loanId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newLoanAmount?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  newLoanAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  newLoanAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<LoanRepaid_Filter>>>;
  repaidAmount?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  repaidAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  repaidAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum LoanRepaid_OrderBy {
  Account = 'account',
  Id = 'id',
  LoanId = 'loanId',
  NewLoanAmount = 'newLoanAmount',
  RepaidAmount = 'repaidAmount',
  Timestamp = 'timestamp',
}

export type Loan_Filter = {
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
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<Loan_Filter>>>;
  closedAt?: InputMaybe<Scalars['BigInt']>;
  closedAt_gt?: InputMaybe<Scalars['BigInt']>;
  closedAt_gte?: InputMaybe<Scalars['BigInt']>;
  closedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closedAt_lt?: InputMaybe<Scalars['BigInt']>;
  closedAt_lte?: InputMaybe<Scalars['BigInt']>;
  closedAt_not?: InputMaybe<Scalars['BigInt']>;
  closedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralAmount?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralMinted?: InputMaybe<Scalars['String']>;
  collateralMinted_contains?: InputMaybe<Scalars['String']>;
  collateralMinted_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralMinted_ends_with?: InputMaybe<Scalars['String']>;
  collateralMinted_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralMinted_gt?: InputMaybe<Scalars['String']>;
  collateralMinted_gte?: InputMaybe<Scalars['String']>;
  collateralMinted_in?: InputMaybe<Array<Scalars['String']>>;
  collateralMinted_lt?: InputMaybe<Scalars['String']>;
  collateralMinted_lte?: InputMaybe<Scalars['String']>;
  collateralMinted_not?: InputMaybe<Scalars['String']>;
  collateralMinted_not_contains?: InputMaybe<Scalars['String']>;
  collateralMinted_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralMinted_not_ends_with?: InputMaybe<Scalars['String']>;
  collateralMinted_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralMinted_not_in?: InputMaybe<Array<Scalars['String']>>;
  collateralMinted_not_starts_with?: InputMaybe<Scalars['String']>;
  collateralMinted_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralMinted_starts_with?: InputMaybe<Scalars['String']>;
  collateralMinted_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['String']>;
  currency_contains?: InputMaybe<Scalars['String']>;
  currency_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_ends_with?: InputMaybe<Scalars['String']>;
  currency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_gt?: InputMaybe<Scalars['String']>;
  currency_gte?: InputMaybe<Scalars['String']>;
  currency_in?: InputMaybe<Array<Scalars['String']>>;
  currency_lt?: InputMaybe<Scalars['String']>;
  currency_lte?: InputMaybe<Scalars['String']>;
  currency_not?: InputMaybe<Scalars['String']>;
  currency_not_contains?: InputMaybe<Scalars['String']>;
  currency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  currency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_not_in?: InputMaybe<Array<Scalars['String']>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  currency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currency_starts_with?: InputMaybe<Scalars['String']>;
  currency_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hasPartialLiquidations?: InputMaybe<Scalars['Boolean']>;
  hasPartialLiquidations_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasPartialLiquidations_not?: InputMaybe<Scalars['Boolean']>;
  hasPartialLiquidations_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  isOpen_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen_not?: InputMaybe<Scalars['Boolean']>;
  isOpen_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  or?: InputMaybe<Array<InputMaybe<Loan_Filter>>>;
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

export enum Loan_OrderBy {
  Account = 'account',
  Amount = 'amount',
  ClosedAt = 'closedAt',
  CollateralAmount = 'collateralAmount',
  CollateralMinted = 'collateralMinted',
  CreatedAt = 'createdAt',
  Currency = 'currency',
  HasPartialLiquidations = 'hasPartialLiquidations',
  Id = 'id',
  IsOpen = 'isOpen',
  TxHash = 'txHash',
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
  accountFlaggedForLiquidation?: Maybe<AccountFlaggedForLiquidation>;
  accountFlaggedForLiquidations: Array<AccountFlaggedForLiquidation>;
  accountLiquidated?: Maybe<AccountLiquidated>;
  accountLiquidateds: Array<AccountLiquidated>;
  accountRemovedFromLiquidation?: Maybe<AccountRemovedFromLiquidation>;
  accountRemovedFromLiquidations: Array<AccountRemovedFromLiquidation>;
  activeStaker?: Maybe<ActiveStaker>;
  activeStakers: Array<ActiveStaker>;
  atomicSynthExchange?: Maybe<AtomicSynthExchange>;
  atomicSynthExchanges: Array<AtomicSynthExchange>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  candle?: Maybe<Candle>;
  candles: Array<Candle>;
  collateralDeposited?: Maybe<CollateralDeposited>;
  collateralDepositeds: Array<CollateralDeposited>;
  collateralWithdrawn?: Maybe<CollateralWithdrawn>;
  collateralWithdrawns: Array<CollateralWithdrawn>;
  dailyBurned?: Maybe<DailyBurned>;
  dailyBurneds: Array<DailyBurned>;
  dailyCandle?: Maybe<DailyCandle>;
  dailyCandles: Array<DailyCandle>;
  dailyExchangePartner?: Maybe<DailyExchangePartner>;
  dailyExchangePartners: Array<DailyExchangePartner>;
  dailyIssued?: Maybe<DailyIssued>;
  dailyIssueds: Array<DailyIssued>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  debtState?: Maybe<DebtState>;
  debtStates: Array<DebtState>;
  delegatedWallet?: Maybe<DelegatedWallet>;
  delegatedWallets: Array<DelegatedWallet>;
  exchangeEntryAppended?: Maybe<ExchangeEntryAppended>;
  exchangeEntryAppendeds: Array<ExchangeEntryAppended>;
  exchangeEntrySettled?: Maybe<ExchangeEntrySettled>;
  exchangeEntrySettleds: Array<ExchangeEntrySettled>;
  exchangeFee?: Maybe<ExchangeFee>;
  exchangeFees: Array<ExchangeFee>;
  exchangePartner?: Maybe<ExchangePartner>;
  exchangePartners: Array<ExchangePartner>;
  exchangeRebate?: Maybe<ExchangeRebate>;
  exchangeRebates: Array<ExchangeRebate>;
  exchangeReclaim?: Maybe<ExchangeReclaim>;
  exchangeReclaims: Array<ExchangeReclaim>;
  exchanger?: Maybe<Exchanger>;
  exchangers: Array<Exchanger>;
  feePeriod?: Maybe<FeePeriod>;
  feePeriods: Array<FeePeriod>;
  feeRate?: Maybe<FeeRate>;
  feeRates: Array<FeeRate>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  inversePricingInfo?: Maybe<InversePricingInfo>;
  inversePricingInfos: Array<InversePricingInfo>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  latestRate?: Maybe<LatestRate>;
  latestRates: Array<LatestRate>;
  latestSynthBalance?: Maybe<LatestSynthBalance>;
  latestSynthBalances: Array<LatestSynthBalance>;
  loan?: Maybe<Loan>;
  loanLiquidated?: Maybe<LoanLiquidated>;
  loanLiquidateds: Array<LoanLiquidated>;
  loanPartiallyLiquidated?: Maybe<LoanPartiallyLiquidated>;
  loanPartiallyLiquidateds: Array<LoanPartiallyLiquidated>;
  loanRepaid?: Maybe<LoanRepaid>;
  loanRepaids: Array<LoanRepaid>;
  loans: Array<Loan>;
  rateUpdate?: Maybe<RateUpdate>;
  rateUpdates: Array<RateUpdate>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  short?: Maybe<Short>;
  shortCollateralChange?: Maybe<ShortCollateralChange>;
  shortCollateralChanges: Array<ShortCollateralChange>;
  shortContract?: Maybe<ShortContract>;
  shortContractUpdate?: Maybe<ShortContractUpdate>;
  shortContractUpdates: Array<ShortContractUpdate>;
  shortContracts: Array<ShortContract>;
  shortLiquidation?: Maybe<ShortLiquidation>;
  shortLiquidations: Array<ShortLiquidation>;
  shortLoanChange?: Maybe<ShortLoanChange>;
  shortLoanChanges: Array<ShortLoanChange>;
  shorts: Array<Short>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synth?: Maybe<Synth>;
  synthBalance?: Maybe<SynthBalance>;
  synthBalances: Array<SynthBalance>;
  synthByCurrencyKey?: Maybe<SynthByCurrencyKey>;
  synthByCurrencyKeys: Array<SynthByCurrencyKey>;
  synthExchange?: Maybe<SynthExchange>;
  synthExchanges: Array<SynthExchange>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  synths: Array<Synth>;
  systemSetting?: Maybe<SystemSetting>;
  systemSettings: Array<SystemSetting>;
  temporaryExchangePartnerTracker?: Maybe<TemporaryExchangePartnerTracker>;
  temporaryExchangePartnerTrackers: Array<TemporaryExchangePartnerTracker>;
  total?: Maybe<Total>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
  totals: Array<Total>;
  wrapper?: Maybe<Wrapper>;
  wrapperBurn?: Maybe<WrapperBurn>;
  wrapperBurns: Array<WrapperBurn>;
  wrapperMint?: Maybe<WrapperMint>;
  wrapperMints: Array<WrapperMint>;
  wrappers: Array<Wrapper>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAccountFlaggedForLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountFlaggedForLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountFlaggedForLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountFlaggedForLiquidation_Filter>;
};

export type QueryAccountLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountLiquidated_Filter>;
};

export type QueryAccountRemovedFromLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountRemovedFromLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountRemovedFromLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountRemovedFromLiquidation_Filter>;
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

export type QueryAtomicSynthExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAtomicSynthExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AtomicSynthExchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AtomicSynthExchange_Filter>;
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

export type QueryCandleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCandlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Candle_Filter>;
};

export type QueryCollateralDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollateralDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollateralDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDeposited_Filter>;
};

export type QueryCollateralWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollateralWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollateralWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralWithdrawn_Filter>;
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

export type QueryDailyCandleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDailyCandlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyCandle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyCandle_Filter>;
};

export type QueryDailyExchangePartnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDailyExchangePartnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyExchangePartner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyExchangePartner_Filter>;
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

export type QueryDebtStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDebtStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DebtState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DebtState_Filter>;
};

export type QueryDelegatedWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDelegatedWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegatedWallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegatedWallet_Filter>;
};

export type QueryExchangeEntryAppendedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangeEntryAppendedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeEntryAppended_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeEntryAppended_Filter>;
};

export type QueryExchangeEntrySettledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangeEntrySettledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeEntrySettled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeEntrySettled_Filter>;
};

export type QueryExchangeFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangeFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeFee_Filter>;
};

export type QueryExchangePartnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangePartnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangePartner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangePartner_Filter>;
};

export type QueryExchangeRebateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangeRebatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeRebate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeRebate_Filter>;
};

export type QueryExchangeReclaimArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangeReclaimsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeReclaim_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeReclaim_Filter>;
};

export type QueryExchangerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryExchangersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Exchanger_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Exchanger_Filter>;
};

export type QueryFeePeriodArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFeePeriodsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeePeriod_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeePeriod_Filter>;
};

export type QueryFeeRateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFeeRatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeRate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeRate_Filter>;
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

export type QueryInversePricingInfoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryInversePricingInfosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InversePricingInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InversePricingInfo_Filter>;
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

export type QueryLatestRateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLatestRatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestRate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestRate_Filter>;
};

export type QueryLatestSynthBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLatestSynthBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestSynthBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestSynthBalance_Filter>;
};

export type QueryLoanArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLoanLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLoanLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanLiquidated_Filter>;
};

export type QueryLoanPartiallyLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLoanPartiallyLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanPartiallyLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanPartiallyLiquidated_Filter>;
};

export type QueryLoanRepaidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLoanRepaidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanRepaid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanRepaid_Filter>;
};

export type QueryLoansArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Loan_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Loan_Filter>;
};

export type QueryRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RateUpdate_Filter>;
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

export type QueryShortArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortCollateralChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortCollateralChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortCollateralChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortCollateralChange_Filter>;
};

export type QueryShortContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortContractUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortContractUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortContractUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortContractUpdate_Filter>;
};

export type QueryShortContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortContract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortContract_Filter>;
};

export type QueryShortLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortLiquidation_Filter>;
};

export type QueryShortLoanChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryShortLoanChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLoanChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortLoanChange_Filter>;
};

export type QueryShortsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Short_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Short_Filter>;
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

export type QuerySynthArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySynthBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySynthBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthBalance_Filter>;
};

export type QuerySynthByCurrencyKeyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySynthByCurrencyKeysArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthByCurrencyKey_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthByCurrencyKey_Filter>;
};

export type QuerySynthExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySynthExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthExchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthExchange_Filter>;
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

export type QuerySynthsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Synth_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Synth_Filter>;
};

export type QuerySystemSettingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySystemSettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SystemSetting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SystemSetting_Filter>;
};

export type QueryTemporaryExchangePartnerTrackerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTemporaryExchangePartnerTrackersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TemporaryExchangePartnerTracker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TemporaryExchangePartnerTracker_Filter>;
};

export type QueryTotalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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

export type QueryTotalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Total_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Total_Filter>;
};

export type QueryWrapperArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrapperBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrapperBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrapperBurn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrapperBurn_Filter>;
};

export type QueryWrapperMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWrapperMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrapperMint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrapperMint_Filter>;
};

export type QueryWrappersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wrapper_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wrapper_Filter>;
};

/**  Latest Rates over time  */
export type RateUpdate = {
  __typename?: 'RateUpdate';
  /**  the block which this rate was recorded  */
  block: Scalars['BigInt'];
  /**  currencyKey for which this this rate update applies  */
  currencyKey: Scalars['Bytes'];
  /**  <transaction hash>-<currency key>  */
  id: Scalars['ID'];
  /**  the rate recorded at this timestamp  */
  rate: Scalars['BigDecimal'];
  /**  currencyKey expressed as a string  */
  synth: Scalars['String'];
  /**  timestamp of the block in which the rate was recorded  */
  timestamp: Scalars['BigInt'];
};

export type RateUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RateUpdate_Filter>>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencyKey?: InputMaybe<Scalars['Bytes']>;
  currencyKey_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_gte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currencyKey_lt?: InputMaybe<Scalars['Bytes']>;
  currencyKey_lte?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_contains?: InputMaybe<Scalars['Bytes']>;
  currencyKey_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<RateUpdate_Filter>>>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum RateUpdate_OrderBy {
  Block = 'block',
  CurrencyKey = 'currencyKey',
  Id = 'id',
  Rate = 'rate',
  Synth = 'synth',
  Timestamp = 'timestamp',
}

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

export type Short = {
  __typename?: 'Short';
  /**  the account that created the short  */
  account: Scalars['Bytes'];
  /**  the timestamp the accrued interest was most recently updated  */
  accruedInterestLastUpdateTimestamp: Scalars['BigInt'];
  /**  the timestamp the short was closed  */
  closedAt?: Maybe<Scalars['BigInt']>;
  /**  collateral deposits and withdrawals that have been made on the short  */
  collateralChanges?: Maybe<Array<ShortCollateralChange>>;
  /**  the type of collateral locked - sUSD, ETH, renBTC  */
  collateralLocked: Scalars['Bytes'];
  /**  the amount of collateral locked in the short  */
  collateralLockedAmount: Scalars['BigDecimal'];
  /**  contract level info for the short position  */
  contractData: ShortContract;
  /**  the timestamp the short was created  */
  createdAt: Scalars['BigInt'];
  /**  the block the short was created at  */
  createdAtBlock: Scalars['BigInt'];
  /**  the short id  */
  id: Scalars['ID'];
  /**  is the short still open?  */
  isOpen: Scalars['Boolean'];
  /**  liquidations that have been made on the short  */
  liquidations?: Maybe<Array<ShortLiquidation>>;
  /**  loan changes that have been made on the short - increasing or decreasing the short position  */
  loanChanges: Array<ShortLoanChange>;
  /**  the denomination of the loan repayment - sETH, sBTC  */
  synthBorrowed: Scalars['Bytes'];
  /**  the amount owed denominated in the loan repayment synth  */
  synthBorrowedAmount: Scalars['BigDecimal'];
  /**  the transaction hash of the short  */
  txHash: Scalars['String'];
};

export type ShortCollateralChangesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortCollateralChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShortCollateralChange_Filter>;
};

export type ShortLiquidationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShortLiquidation_Filter>;
};

export type ShortLoanChangesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLoanChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShortLoanChange_Filter>;
};

export type ShortCollateralChange = {
  __typename?: 'ShortCollateralChange';
  /**  the amount of collateral deposited or withdrawn  */
  amount: Scalars['BigDecimal'];
  /**  the block the collateral was changed  */
  blockNumber: Scalars['BigInt'];
  /**  the total amount of collateral after the deposit or withdrawal is included  */
  collateralAfter: Scalars['BigDecimal'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  denotes if the event was a deposit (true) or withdrawal (false) */
  isDeposit: Scalars['Boolean'];
  /**  the respective short  */
  short: Short;
  /**  the timestamp collateral was deposited or withdrawn  */
  timestamp: Scalars['BigInt'];
};

export type ShortCollateralChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ShortCollateralChange_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralAfter?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralAfter_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralAfter_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isDeposit?: InputMaybe<Scalars['Boolean']>;
  isDeposit_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isDeposit_not?: InputMaybe<Scalars['Boolean']>;
  isDeposit_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  or?: InputMaybe<Array<InputMaybe<ShortCollateralChange_Filter>>>;
  short?: InputMaybe<Scalars['String']>;
  short_?: InputMaybe<Short_Filter>;
  short_contains?: InputMaybe<Scalars['String']>;
  short_contains_nocase?: InputMaybe<Scalars['String']>;
  short_ends_with?: InputMaybe<Scalars['String']>;
  short_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_gt?: InputMaybe<Scalars['String']>;
  short_gte?: InputMaybe<Scalars['String']>;
  short_in?: InputMaybe<Array<Scalars['String']>>;
  short_lt?: InputMaybe<Scalars['String']>;
  short_lte?: InputMaybe<Scalars['String']>;
  short_not?: InputMaybe<Scalars['String']>;
  short_not_contains?: InputMaybe<Scalars['String']>;
  short_not_contains_nocase?: InputMaybe<Scalars['String']>;
  short_not_ends_with?: InputMaybe<Scalars['String']>;
  short_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_not_in?: InputMaybe<Array<Scalars['String']>>;
  short_not_starts_with?: InputMaybe<Scalars['String']>;
  short_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  short_starts_with?: InputMaybe<Scalars['String']>;
  short_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ShortCollateralChange_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  CollateralAfter = 'collateralAfter',
  Id = 'id',
  IsDeposit = 'isDeposit',
  Short = 'short',
  Timestamp = 'timestamp',
}

export type ShortContract = {
  __typename?: 'ShortContract';
  /**  a boolean that prevents new loans on the contract when false  */
  canOpenLoans: Scalars['Boolean'];
  /**  a list of changes to contract level data  */
  contractUpdates?: Maybe<Array<ShortContractUpdate>>;
  /**  the address of the shorting contract  */
  id: Scalars['ID'];
  /**  Time in seconds that a user must wait between interacting with a loan. Provides front running and flash loan protection.  */
  interactionDelay: Scalars['BigInt'];
  /**  the fee for issuing a short  */
  issueFeeRate: Scalars['BigDecimal'];
  /**  the manager is a contract that ties the shorting contract in with the rest of the Synthetix protocol  */
  manager: Scalars['Bytes'];
  /**  the max number of loans per account  */
  maxLoansPerAccount: Scalars['BigInt'];
  /**  the minimum collateral required to open a position  */
  minCollateral: Scalars['BigDecimal'];
  /**  the min c-ratio for borrowers below which they can be liquidated  */
  minCratio: Scalars['BigInt'];
  /**  a list of shorts attached to each contract  */
  shorts?: Maybe<Array<Short>>;
};

export type ShortContractContractUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortContractUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShortContractUpdate_Filter>;
};

export type ShortContractShortsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Short_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Short_Filter>;
};

export type ShortContractUpdate = {
  __typename?: 'ShortContractUpdate';
  /**  the block the short contract was udpated at  */
  blockNumber: Scalars['BigInt'];
  /**  the respective short contract  */
  contractData: ShortContract;
  /**  the field that was changed  */
  field: Scalars['String'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the timestamp of the contract update event  */
  timestamp: Scalars['BigInt'];
  /**  the new value of the field in string format  */
  value: Scalars['String'];
};

export type ShortContractUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ShortContractUpdate_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contractData?: InputMaybe<Scalars['String']>;
  contractData_?: InputMaybe<ShortContract_Filter>;
  contractData_contains?: InputMaybe<Scalars['String']>;
  contractData_contains_nocase?: InputMaybe<Scalars['String']>;
  contractData_ends_with?: InputMaybe<Scalars['String']>;
  contractData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_gt?: InputMaybe<Scalars['String']>;
  contractData_gte?: InputMaybe<Scalars['String']>;
  contractData_in?: InputMaybe<Array<Scalars['String']>>;
  contractData_lt?: InputMaybe<Scalars['String']>;
  contractData_lte?: InputMaybe<Scalars['String']>;
  contractData_not?: InputMaybe<Scalars['String']>;
  contractData_not_contains?: InputMaybe<Scalars['String']>;
  contractData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractData_not_ends_with?: InputMaybe<Scalars['String']>;
  contractData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractData_not_starts_with?: InputMaybe<Scalars['String']>;
  contractData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_starts_with?: InputMaybe<Scalars['String']>;
  contractData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  field_contains?: InputMaybe<Scalars['String']>;
  field_contains_nocase?: InputMaybe<Scalars['String']>;
  field_ends_with?: InputMaybe<Scalars['String']>;
  field_ends_with_nocase?: InputMaybe<Scalars['String']>;
  field_gt?: InputMaybe<Scalars['String']>;
  field_gte?: InputMaybe<Scalars['String']>;
  field_in?: InputMaybe<Array<Scalars['String']>>;
  field_lt?: InputMaybe<Scalars['String']>;
  field_lte?: InputMaybe<Scalars['String']>;
  field_not?: InputMaybe<Scalars['String']>;
  field_not_contains?: InputMaybe<Scalars['String']>;
  field_not_contains_nocase?: InputMaybe<Scalars['String']>;
  field_not_ends_with?: InputMaybe<Scalars['String']>;
  field_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  field_not_in?: InputMaybe<Array<Scalars['String']>>;
  field_not_starts_with?: InputMaybe<Scalars['String']>;
  field_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  field_starts_with?: InputMaybe<Scalars['String']>;
  field_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<ShortContractUpdate_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_contains_nocase?: InputMaybe<Scalars['String']>;
  value_ends_with?: InputMaybe<Scalars['String']>;
  value_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value_gt?: InputMaybe<Scalars['String']>;
  value_gte?: InputMaybe<Scalars['String']>;
  value_in?: InputMaybe<Array<Scalars['String']>>;
  value_lt?: InputMaybe<Scalars['String']>;
  value_lte?: InputMaybe<Scalars['String']>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_contains_nocase?: InputMaybe<Scalars['String']>;
  value_not_ends_with?: InputMaybe<Scalars['String']>;
  value_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<Scalars['String']>>;
  value_not_starts_with?: InputMaybe<Scalars['String']>;
  value_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  value_starts_with?: InputMaybe<Scalars['String']>;
  value_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ShortContractUpdate_OrderBy {
  BlockNumber = 'blockNumber',
  ContractData = 'contractData',
  Field = 'field',
  Id = 'id',
  Timestamp = 'timestamp',
  Value = 'value',
}

export type ShortContract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ShortContract_Filter>>>;
  canOpenLoans?: InputMaybe<Scalars['Boolean']>;
  canOpenLoans_in?: InputMaybe<Array<Scalars['Boolean']>>;
  canOpenLoans_not?: InputMaybe<Scalars['Boolean']>;
  canOpenLoans_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  contractUpdates_?: InputMaybe<ShortContractUpdate_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  interactionDelay?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_gt?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_gte?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_in?: InputMaybe<Array<Scalars['BigInt']>>;
  interactionDelay_lt?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_lte?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_not?: InputMaybe<Scalars['BigInt']>;
  interactionDelay_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issueFeeRate?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  issueFeeRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_not?: InputMaybe<Scalars['BigDecimal']>;
  issueFeeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  manager?: InputMaybe<Scalars['Bytes']>;
  manager_contains?: InputMaybe<Scalars['Bytes']>;
  manager_gt?: InputMaybe<Scalars['Bytes']>;
  manager_gte?: InputMaybe<Scalars['Bytes']>;
  manager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  manager_lt?: InputMaybe<Scalars['Bytes']>;
  manager_lte?: InputMaybe<Scalars['Bytes']>;
  manager_not?: InputMaybe<Scalars['Bytes']>;
  manager_not_contains?: InputMaybe<Scalars['Bytes']>;
  manager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  maxLoansPerAccount?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_gt?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_gte?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxLoansPerAccount_lt?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_lte?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_not?: InputMaybe<Scalars['BigInt']>;
  maxLoansPerAccount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minCollateral?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minCollateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_not?: InputMaybe<Scalars['BigDecimal']>;
  minCollateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minCratio?: InputMaybe<Scalars['BigInt']>;
  minCratio_gt?: InputMaybe<Scalars['BigInt']>;
  minCratio_gte?: InputMaybe<Scalars['BigInt']>;
  minCratio_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minCratio_lt?: InputMaybe<Scalars['BigInt']>;
  minCratio_lte?: InputMaybe<Scalars['BigInt']>;
  minCratio_not?: InputMaybe<Scalars['BigInt']>;
  minCratio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<ShortContract_Filter>>>;
  shorts_?: InputMaybe<Short_Filter>;
};

export enum ShortContract_OrderBy {
  CanOpenLoans = 'canOpenLoans',
  ContractUpdates = 'contractUpdates',
  Id = 'id',
  InteractionDelay = 'interactionDelay',
  IssueFeeRate = 'issueFeeRate',
  Manager = 'manager',
  MaxLoansPerAccount = 'maxLoansPerAccount',
  MinCollateral = 'minCollateral',
  MinCratio = 'minCratio',
  Shorts = 'shorts',
}

export type ShortLiquidation = {
  __typename?: 'ShortLiquidation';
  /**  the block of the liquidation event  */
  blockNumber: Scalars['BigInt'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  determines if the  */
  isClosed: Scalars['Boolean'];
  /**  the amount of the loan that was burned  */
  liquidatedAmount: Scalars['BigDecimal'];
  /**  the amount of the collateral that was taken away from the short owner  */
  liquidatedCollateral: Scalars['BigDecimal'];
  /**  the account that liquidated the loan  */
  liquidator: Scalars['Bytes'];
  /**  the respective short  */
  short: Short;
  /**  the timestamp of the loan liquidation event  */
  timestamp: Scalars['BigInt'];
};

export type ShortLiquidation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ShortLiquidation_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isClosed?: InputMaybe<Scalars['Boolean']>;
  isClosed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isClosed_not?: InputMaybe<Scalars['Boolean']>;
  isClosed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  liquidatedAmount?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedCollateral?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidatedCollateral_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidatedCollateral_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
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
  or?: InputMaybe<Array<InputMaybe<ShortLiquidation_Filter>>>;
  short?: InputMaybe<Scalars['String']>;
  short_?: InputMaybe<Short_Filter>;
  short_contains?: InputMaybe<Scalars['String']>;
  short_contains_nocase?: InputMaybe<Scalars['String']>;
  short_ends_with?: InputMaybe<Scalars['String']>;
  short_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_gt?: InputMaybe<Scalars['String']>;
  short_gte?: InputMaybe<Scalars['String']>;
  short_in?: InputMaybe<Array<Scalars['String']>>;
  short_lt?: InputMaybe<Scalars['String']>;
  short_lte?: InputMaybe<Scalars['String']>;
  short_not?: InputMaybe<Scalars['String']>;
  short_not_contains?: InputMaybe<Scalars['String']>;
  short_not_contains_nocase?: InputMaybe<Scalars['String']>;
  short_not_ends_with?: InputMaybe<Scalars['String']>;
  short_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_not_in?: InputMaybe<Array<Scalars['String']>>;
  short_not_starts_with?: InputMaybe<Scalars['String']>;
  short_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  short_starts_with?: InputMaybe<Scalars['String']>;
  short_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ShortLiquidation_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  IsClosed = 'isClosed',
  LiquidatedAmount = 'liquidatedAmount',
  LiquidatedCollateral = 'liquidatedCollateral',
  Liquidator = 'liquidator',
  Short = 'short',
  Timestamp = 'timestamp',
}

export type ShortLoanChange = {
  __typename?: 'ShortLoanChange';
  /**  the amount of loan repaid or increased  */
  amount: Scalars['BigDecimal'];
  /**  the block the short loan was changed  */
  blockNumber: Scalars['BigInt'];
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  denotes if the event was a repayment (true) or an increase of the loan (false) */
  isRepayment: Scalars['Boolean'];
  /**  the total amount of loan due after the repayment or increase is included  */
  loanAfter: Scalars['BigDecimal'];
  /**  the price of the repaid synth in dollars  */
  rate: Scalars['BigDecimal'];
  /**  the respective short  */
  short: Short;
  /**  the timestamp of the loan repayment or increase  */
  timestamp: Scalars['BigInt'];
};

export type ShortLoanChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<ShortLoanChange_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isRepayment?: InputMaybe<Scalars['Boolean']>;
  isRepayment_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isRepayment_not?: InputMaybe<Scalars['Boolean']>;
  isRepayment_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  loanAfter?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_gt?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_gte?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  loanAfter_lt?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_lte?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_not?: InputMaybe<Scalars['BigDecimal']>;
  loanAfter_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<ShortLoanChange_Filter>>>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  short?: InputMaybe<Scalars['String']>;
  short_?: InputMaybe<Short_Filter>;
  short_contains?: InputMaybe<Scalars['String']>;
  short_contains_nocase?: InputMaybe<Scalars['String']>;
  short_ends_with?: InputMaybe<Scalars['String']>;
  short_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_gt?: InputMaybe<Scalars['String']>;
  short_gte?: InputMaybe<Scalars['String']>;
  short_in?: InputMaybe<Array<Scalars['String']>>;
  short_lt?: InputMaybe<Scalars['String']>;
  short_lte?: InputMaybe<Scalars['String']>;
  short_not?: InputMaybe<Scalars['String']>;
  short_not_contains?: InputMaybe<Scalars['String']>;
  short_not_contains_nocase?: InputMaybe<Scalars['String']>;
  short_not_ends_with?: InputMaybe<Scalars['String']>;
  short_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  short_not_in?: InputMaybe<Array<Scalars['String']>>;
  short_not_starts_with?: InputMaybe<Scalars['String']>;
  short_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  short_starts_with?: InputMaybe<Scalars['String']>;
  short_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum ShortLoanChange_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Id = 'id',
  IsRepayment = 'isRepayment',
  LoanAfter = 'loanAfter',
  Rate = 'rate',
  Short = 'short',
  Timestamp = 'timestamp',
}

export type Short_Filter = {
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
  accruedInterestLastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accruedInterestLastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  accruedInterestLastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  and?: InputMaybe<Array<InputMaybe<Short_Filter>>>;
  closedAt?: InputMaybe<Scalars['BigInt']>;
  closedAt_gt?: InputMaybe<Scalars['BigInt']>;
  closedAt_gte?: InputMaybe<Scalars['BigInt']>;
  closedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closedAt_lt?: InputMaybe<Scalars['BigInt']>;
  closedAt_lte?: InputMaybe<Scalars['BigInt']>;
  closedAt_not?: InputMaybe<Scalars['BigInt']>;
  closedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralChanges_?: InputMaybe<ShortCollateralChange_Filter>;
  collateralLocked?: InputMaybe<Scalars['Bytes']>;
  collateralLockedAmount?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralLockedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  collateralLockedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  collateralLocked_contains?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_gt?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_gte?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collateralLocked_lt?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_lte?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_not?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_not_contains?: InputMaybe<Scalars['Bytes']>;
  collateralLocked_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractData?: InputMaybe<Scalars['String']>;
  contractData_?: InputMaybe<ShortContract_Filter>;
  contractData_contains?: InputMaybe<Scalars['String']>;
  contractData_contains_nocase?: InputMaybe<Scalars['String']>;
  contractData_ends_with?: InputMaybe<Scalars['String']>;
  contractData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_gt?: InputMaybe<Scalars['String']>;
  contractData_gte?: InputMaybe<Scalars['String']>;
  contractData_in?: InputMaybe<Array<Scalars['String']>>;
  contractData_lt?: InputMaybe<Scalars['String']>;
  contractData_lte?: InputMaybe<Scalars['String']>;
  contractData_not?: InputMaybe<Scalars['String']>;
  contractData_not_contains?: InputMaybe<Scalars['String']>;
  contractData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractData_not_ends_with?: InputMaybe<Scalars['String']>;
  contractData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractData_not_starts_with?: InputMaybe<Scalars['String']>;
  contractData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractData_starts_with?: InputMaybe<Scalars['String']>;
  contractData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  isOpen_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen_not?: InputMaybe<Scalars['Boolean']>;
  isOpen_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  liquidations_?: InputMaybe<ShortLiquidation_Filter>;
  loanChanges_?: InputMaybe<ShortLoanChange_Filter>;
  or?: InputMaybe<Array<InputMaybe<Short_Filter>>>;
  synthBorrowed?: InputMaybe<Scalars['Bytes']>;
  synthBorrowedAmount?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  synthBorrowedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  synthBorrowedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  synthBorrowed_contains?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_gt?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_gte?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_in?: InputMaybe<Array<Scalars['Bytes']>>;
  synthBorrowed_lt?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_lte?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_not?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_not_contains?: InputMaybe<Scalars['Bytes']>;
  synthBorrowed_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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

export enum Short_OrderBy {
  Account = 'account',
  AccruedInterestLastUpdateTimestamp = 'accruedInterestLastUpdateTimestamp',
  ClosedAt = 'closedAt',
  CollateralChanges = 'collateralChanges',
  CollateralLocked = 'collateralLocked',
  CollateralLockedAmount = 'collateralLockedAmount',
  ContractData = 'contractData',
  CreatedAt = 'createdAt',
  CreatedAtBlock = 'createdAtBlock',
  Id = 'id',
  IsOpen = 'isOpen',
  Liquidations = 'liquidations',
  LoanChanges = 'loanChanges',
  SynthBorrowed = 'synthBorrowed',
  SynthBorrowedAmount = 'synthBorrowedAmount',
  TxHash = 'txHash',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  accountFlaggedForLiquidation?: Maybe<AccountFlaggedForLiquidation>;
  accountFlaggedForLiquidations: Array<AccountFlaggedForLiquidation>;
  accountLiquidated?: Maybe<AccountLiquidated>;
  accountLiquidateds: Array<AccountLiquidated>;
  accountRemovedFromLiquidation?: Maybe<AccountRemovedFromLiquidation>;
  accountRemovedFromLiquidations: Array<AccountRemovedFromLiquidation>;
  activeStaker?: Maybe<ActiveStaker>;
  activeStakers: Array<ActiveStaker>;
  atomicSynthExchange?: Maybe<AtomicSynthExchange>;
  atomicSynthExchanges: Array<AtomicSynthExchange>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  candle?: Maybe<Candle>;
  candles: Array<Candle>;
  collateralDeposited?: Maybe<CollateralDeposited>;
  collateralDepositeds: Array<CollateralDeposited>;
  collateralWithdrawn?: Maybe<CollateralWithdrawn>;
  collateralWithdrawns: Array<CollateralWithdrawn>;
  dailyBurned?: Maybe<DailyBurned>;
  dailyBurneds: Array<DailyBurned>;
  dailyCandle?: Maybe<DailyCandle>;
  dailyCandles: Array<DailyCandle>;
  dailyExchangePartner?: Maybe<DailyExchangePartner>;
  dailyExchangePartners: Array<DailyExchangePartner>;
  dailyIssued?: Maybe<DailyIssued>;
  dailyIssueds: Array<DailyIssued>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  debtState?: Maybe<DebtState>;
  debtStates: Array<DebtState>;
  delegatedWallet?: Maybe<DelegatedWallet>;
  delegatedWallets: Array<DelegatedWallet>;
  exchangeEntryAppended?: Maybe<ExchangeEntryAppended>;
  exchangeEntryAppendeds: Array<ExchangeEntryAppended>;
  exchangeEntrySettled?: Maybe<ExchangeEntrySettled>;
  exchangeEntrySettleds: Array<ExchangeEntrySettled>;
  exchangeFee?: Maybe<ExchangeFee>;
  exchangeFees: Array<ExchangeFee>;
  exchangePartner?: Maybe<ExchangePartner>;
  exchangePartners: Array<ExchangePartner>;
  exchangeRebate?: Maybe<ExchangeRebate>;
  exchangeRebates: Array<ExchangeRebate>;
  exchangeReclaim?: Maybe<ExchangeReclaim>;
  exchangeReclaims: Array<ExchangeReclaim>;
  exchanger?: Maybe<Exchanger>;
  exchangers: Array<Exchanger>;
  feePeriod?: Maybe<FeePeriod>;
  feePeriods: Array<FeePeriod>;
  feeRate?: Maybe<FeeRate>;
  feeRates: Array<FeeRate>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  futuresMarket?: Maybe<FuturesMarket>;
  futuresMarkets: Array<FuturesMarket>;
  inversePricingInfo?: Maybe<InversePricingInfo>;
  inversePricingInfos: Array<InversePricingInfo>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  latestRate?: Maybe<LatestRate>;
  latestRates: Array<LatestRate>;
  latestSynthBalance?: Maybe<LatestSynthBalance>;
  latestSynthBalances: Array<LatestSynthBalance>;
  loan?: Maybe<Loan>;
  loanLiquidated?: Maybe<LoanLiquidated>;
  loanLiquidateds: Array<LoanLiquidated>;
  loanPartiallyLiquidated?: Maybe<LoanPartiallyLiquidated>;
  loanPartiallyLiquidateds: Array<LoanPartiallyLiquidated>;
  loanRepaid?: Maybe<LoanRepaid>;
  loanRepaids: Array<LoanRepaid>;
  loans: Array<Loan>;
  rateUpdate?: Maybe<RateUpdate>;
  rateUpdates: Array<RateUpdate>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  short?: Maybe<Short>;
  shortCollateralChange?: Maybe<ShortCollateralChange>;
  shortCollateralChanges: Array<ShortCollateralChange>;
  shortContract?: Maybe<ShortContract>;
  shortContractUpdate?: Maybe<ShortContractUpdate>;
  shortContractUpdates: Array<ShortContractUpdate>;
  shortContracts: Array<ShortContract>;
  shortLiquidation?: Maybe<ShortLiquidation>;
  shortLiquidations: Array<ShortLiquidation>;
  shortLoanChange?: Maybe<ShortLoanChange>;
  shortLoanChanges: Array<ShortLoanChange>;
  shorts: Array<Short>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synth?: Maybe<Synth>;
  synthBalance?: Maybe<SynthBalance>;
  synthBalances: Array<SynthBalance>;
  synthByCurrencyKey?: Maybe<SynthByCurrencyKey>;
  synthByCurrencyKeys: Array<SynthByCurrencyKey>;
  synthExchange?: Maybe<SynthExchange>;
  synthExchanges: Array<SynthExchange>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  synths: Array<Synth>;
  systemSetting?: Maybe<SystemSetting>;
  systemSettings: Array<SystemSetting>;
  temporaryExchangePartnerTracker?: Maybe<TemporaryExchangePartnerTracker>;
  temporaryExchangePartnerTrackers: Array<TemporaryExchangePartnerTracker>;
  total?: Maybe<Total>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
  totals: Array<Total>;
  wrapper?: Maybe<Wrapper>;
  wrapperBurn?: Maybe<WrapperBurn>;
  wrapperBurns: Array<WrapperBurn>;
  wrapperMint?: Maybe<WrapperMint>;
  wrapperMints: Array<WrapperMint>;
  wrappers: Array<Wrapper>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAccountFlaggedForLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountFlaggedForLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountFlaggedForLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountFlaggedForLiquidation_Filter>;
};

export type SubscriptionAccountLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountLiquidated_Filter>;
};

export type SubscriptionAccountRemovedFromLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountRemovedFromLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountRemovedFromLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountRemovedFromLiquidation_Filter>;
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

export type SubscriptionAtomicSynthExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAtomicSynthExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AtomicSynthExchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AtomicSynthExchange_Filter>;
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

export type SubscriptionCandleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCandlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Candle_Filter>;
};

export type SubscriptionCollateralDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollateralDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollateralDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralDeposited_Filter>;
};

export type SubscriptionCollateralWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollateralWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollateralWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralWithdrawn_Filter>;
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

export type SubscriptionDailyCandleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDailyCandlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyCandle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyCandle_Filter>;
};

export type SubscriptionDailyExchangePartnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDailyExchangePartnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyExchangePartner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyExchangePartner_Filter>;
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

export type SubscriptionDebtStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDebtStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DebtState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DebtState_Filter>;
};

export type SubscriptionDelegatedWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDelegatedWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegatedWallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DelegatedWallet_Filter>;
};

export type SubscriptionExchangeEntryAppendedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangeEntryAppendedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeEntryAppended_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeEntryAppended_Filter>;
};

export type SubscriptionExchangeEntrySettledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangeEntrySettledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeEntrySettled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeEntrySettled_Filter>;
};

export type SubscriptionExchangeFeeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangeFeesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeFee_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeFee_Filter>;
};

export type SubscriptionExchangePartnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangePartnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangePartner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangePartner_Filter>;
};

export type SubscriptionExchangeRebateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangeRebatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeRebate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeRebate_Filter>;
};

export type SubscriptionExchangeReclaimArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangeReclaimsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExchangeReclaim_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExchangeReclaim_Filter>;
};

export type SubscriptionExchangerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionExchangersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Exchanger_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Exchanger_Filter>;
};

export type SubscriptionFeePeriodArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFeePeriodsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeePeriod_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeePeriod_Filter>;
};

export type SubscriptionFeeRateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFeeRatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeRate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeRate_Filter>;
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

export type SubscriptionInversePricingInfoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionInversePricingInfosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InversePricingInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InversePricingInfo_Filter>;
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

export type SubscriptionLatestRateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLatestRatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestRate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestRate_Filter>;
};

export type SubscriptionLatestSynthBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLatestSynthBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestSynthBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestSynthBalance_Filter>;
};

export type SubscriptionLoanArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLoanLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLoanLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanLiquidated_Filter>;
};

export type SubscriptionLoanPartiallyLiquidatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLoanPartiallyLiquidatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanPartiallyLiquidated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanPartiallyLiquidated_Filter>;
};

export type SubscriptionLoanRepaidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLoanRepaidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanRepaid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LoanRepaid_Filter>;
};

export type SubscriptionLoansArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Loan_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Loan_Filter>;
};

export type SubscriptionRateUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRateUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RateUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RateUpdate_Filter>;
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

export type SubscriptionShortArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortCollateralChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortCollateralChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortCollateralChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortCollateralChange_Filter>;
};

export type SubscriptionShortContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortContractUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortContractUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortContractUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortContractUpdate_Filter>;
};

export type SubscriptionShortContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortContract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortContract_Filter>;
};

export type SubscriptionShortLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLiquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortLiquidation_Filter>;
};

export type SubscriptionShortLoanChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionShortLoanChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ShortLoanChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ShortLoanChange_Filter>;
};

export type SubscriptionShortsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Short_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Short_Filter>;
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

export type SubscriptionSynthArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSynthBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSynthBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthBalance_Filter>;
};

export type SubscriptionSynthByCurrencyKeyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSynthByCurrencyKeysArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthByCurrencyKey_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthByCurrencyKey_Filter>;
};

export type SubscriptionSynthExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSynthExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SynthExchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SynthExchange_Filter>;
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

export type SubscriptionSynthsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Synth_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Synth_Filter>;
};

export type SubscriptionSystemSettingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSystemSettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SystemSetting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SystemSetting_Filter>;
};

export type SubscriptionTemporaryExchangePartnerTrackerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTemporaryExchangePartnerTrackersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TemporaryExchangePartnerTracker_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TemporaryExchangePartnerTracker_Filter>;
};

export type SubscriptionTotalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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

export type SubscriptionTotalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Total_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Total_Filter>;
};

export type SubscriptionWrapperArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrapperBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrapperBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrapperBurn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrapperBurn_Filter>;
};

export type SubscriptionWrapperMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWrapperMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrapperMint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrapperMint_Filter>;
};

export type SubscriptionWrappersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wrapper_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wrapper_Filter>;
};

export type Synth = {
  __typename?: 'Synth';
  /**  lowercase address of the proxy contract for the synth  */
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['BigDecimal'];
};

export type SynthBalance = {
  __typename?: 'SynthBalance';
  account: Scalars['String'];
  address: Scalars['Bytes'];
  amount: Scalars['BigDecimal'];
  /**  timestamp + account + synth address  */
  id: Scalars['ID'];
  synth?: Maybe<Synth>;
  timestamp: Scalars['BigInt'];
};

export type SynthBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<SynthBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<SynthBalance_Filter>>>;
  synth?: InputMaybe<Scalars['String']>;
  synth_?: InputMaybe<Synth_Filter>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum SynthBalance_OrderBy {
  Account = 'account',
  Address = 'address',
  Amount = 'amount',
  Id = 'id',
  Synth = 'synth',
  Timestamp = 'timestamp',
}

/**
 * THIS FILE IS AUTOMATICALLY GENERATED BY THE DEPLOY SCRIPT
 *
 */
export type SynthByCurrencyKey = {
  __typename?: 'SynthByCurrencyKey';
  /**  currency key  */
  id: Scalars['ID'];
  proxyAddress: Scalars['Bytes'];
};

export type SynthByCurrencyKey_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SynthByCurrencyKey_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<SynthByCurrencyKey_Filter>>>;
  proxyAddress?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_contains?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_gt?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_gte?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proxyAddress_lt?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_lte?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_not?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  proxyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum SynthByCurrencyKey_OrderBy {
  Id = 'id',
  ProxyAddress = 'proxyAddress',
}

/**  Tracks this event from the Synthetix.sol contract  */
export type SynthExchange = {
  __typename?: 'SynthExchange';
  account: Exchanger;
  feesInUSD: Scalars['BigDecimal'];
  fromAmount: Scalars['BigDecimal'];
  fromAmountInUSD: Scalars['BigDecimal'];
  fromSynth?: Maybe<Synth>;
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  toAddress: Scalars['Bytes'];
  toAmount: Scalars['BigDecimal'];
  toAmountInUSD: Scalars['BigDecimal'];
  toSynth?: Maybe<Synth>;
};

export type SynthExchange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Exchanger_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  and?: InputMaybe<Array<InputMaybe<SynthExchange_Filter>>>;
  feesInUSD?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feesInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  feesInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  fromAmountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  fromAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fromSynth?: InputMaybe<Scalars['String']>;
  fromSynth_?: InputMaybe<Synth_Filter>;
  fromSynth_contains?: InputMaybe<Scalars['String']>;
  fromSynth_contains_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_ends_with?: InputMaybe<Scalars['String']>;
  fromSynth_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_gt?: InputMaybe<Scalars['String']>;
  fromSynth_gte?: InputMaybe<Scalars['String']>;
  fromSynth_in?: InputMaybe<Array<Scalars['String']>>;
  fromSynth_lt?: InputMaybe<Scalars['String']>;
  fromSynth_lte?: InputMaybe<Scalars['String']>;
  fromSynth_not?: InputMaybe<Scalars['String']>;
  fromSynth_not_contains?: InputMaybe<Scalars['String']>;
  fromSynth_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_not_ends_with?: InputMaybe<Scalars['String']>;
  fromSynth_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_not_in?: InputMaybe<Array<Scalars['String']>>;
  fromSynth_not_starts_with?: InputMaybe<Scalars['String']>;
  fromSynth_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fromSynth_starts_with?: InputMaybe<Scalars['String']>;
  fromSynth_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  or?: InputMaybe<Array<InputMaybe<SynthExchange_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAmount?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  toAmountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  toAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  toSynth?: InputMaybe<Scalars['String']>;
  toSynth_?: InputMaybe<Synth_Filter>;
  toSynth_contains?: InputMaybe<Scalars['String']>;
  toSynth_contains_nocase?: InputMaybe<Scalars['String']>;
  toSynth_ends_with?: InputMaybe<Scalars['String']>;
  toSynth_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_gt?: InputMaybe<Scalars['String']>;
  toSynth_gte?: InputMaybe<Scalars['String']>;
  toSynth_in?: InputMaybe<Array<Scalars['String']>>;
  toSynth_lt?: InputMaybe<Scalars['String']>;
  toSynth_lte?: InputMaybe<Scalars['String']>;
  toSynth_not?: InputMaybe<Scalars['String']>;
  toSynth_not_contains?: InputMaybe<Scalars['String']>;
  toSynth_not_contains_nocase?: InputMaybe<Scalars['String']>;
  toSynth_not_ends_with?: InputMaybe<Scalars['String']>;
  toSynth_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_not_in?: InputMaybe<Array<Scalars['String']>>;
  toSynth_not_starts_with?: InputMaybe<Scalars['String']>;
  toSynth_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  toSynth_starts_with?: InputMaybe<Scalars['String']>;
  toSynth_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum SynthExchange_OrderBy {
  Account = 'account',
  FeesInUsd = 'feesInUSD',
  FromAmount = 'fromAmount',
  FromAmountInUsd = 'fromAmountInUSD',
  FromSynth = 'fromSynth',
  GasPrice = 'gasPrice',
  Id = 'id',
  Timestamp = 'timestamp',
  ToAddress = 'toAddress',
  ToAmount = 'toAmount',
  ToAmountInUsd = 'toAmountInUSD',
  ToSynth = 'toSynth',
}

export type Synth_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Synth_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<Synth_Filter>>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Synth_OrderBy {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
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

export type SystemSetting = {
  __typename?: 'SystemSetting';
  aggregatorWarningFlags: Scalars['String'];
  /**  SIP-120 Atomic exchanges: max allowed volume per block for atomic exchanges  */
  atomicMaxVolumePerBlock: Scalars['BigInt'];
  /**  SIP-120 Atomic exchanges: time window (in seconds) for TWAP prices when considered for atomic exchanges  */
  atomicTwapWindow: Scalars['BigInt'];
  debtSnapshotStaleTime: Scalars['BigInt'];
  /**  SIP 112: ETH Wrappr: The fee for burning sETH and releasing ETH from the EtherWrapper.  */
  etherWrapperBurnFeeRate: Scalars['BigDecimal'];
  /**  SIP 112: ETH Wrappr: The maximum amount of ETH held by the EtherWrapper.  */
  etherWrapperMaxETH: Scalars['BigDecimal'];
  /**  SIP 112: ETH Wrappr: The fee for depositing ETH into the EtherWrapper.  */
  etherWrapperMintFeeRate: Scalars['BigDecimal'];
  /**  How long a fee period lasts at a minimum. It is required for anyone to roll over the periods, so they are not guaranteed to roll over at exactly this duration, but the contract enforces that they cannot roll over any quicker than this duration.  */
  feePeriodDuration: Scalars['BigInt'];
  id: Scalars['ID'];
  /**  The raio of collateral Expressed in 18 decimals. So 800% cratio is 100/800 = 0.125 (0.125e18)  */
  issuanceRatio: Scalars['BigDecimal'];
  /**  SIP-15 Liquidations: liquidation time delay after address flagged (seconds)  */
  liquidationDelay: Scalars['BigInt'];
  /**  SIP-15 Liquidations: penalty taken away from target of liquidation (with 18 decimals). E.g. 10% is 0.1e18  */
  liquidationPenalty: Scalars['BigDecimal'];
  /**  SIP-15 Liquidations: issuance ratio when account can be flagged for liquidation (with 18 decimals), e.g 0.5 issuance ratio when flag means 1/0.5 = 200% cratio  */
  liquidationRatio: Scalars['BigDecimal'];
  minimumStakeTime: Scalars['BigInt'];
  /**  SIP-65 Decentralized Circuit Breaker: The factor amount expressed in decimal format E.g. 3e18 = factor 3, meaning movement up to 3x and above or down to 1/3x and below  */
  priceDeviationThresholdFactor: Scalars['BigDecimal'];
  /**  How long will the ExchangeRates contract assume the rate of any asset is correct  */
  rateStalePeriod: Scalars['BigInt'];
  /**  Users are unable to claim fees if their collateralisation ratio drifts out of target threshold  */
  targetThreshold: Scalars['BigDecimal'];
  /**  time at which these values are recorded  */
  timestamp: Scalars['BigInt'];
  /**  SIP-37 Fee Reclamation: The number of seconds after an exchange is executed that must be waited before settlement.  */
  waitingPeriodSecs: Scalars['BigInt'];
};

export type SystemSetting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  aggregatorWarningFlags?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_contains?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_contains_nocase?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_ends_with?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_ends_with_nocase?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_gt?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_gte?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_in?: InputMaybe<Array<Scalars['String']>>;
  aggregatorWarningFlags_lt?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_lte?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_contains?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_contains_nocase?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_ends_with?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_in?: InputMaybe<Array<Scalars['String']>>;
  aggregatorWarningFlags_not_starts_with?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_starts_with?: InputMaybe<Scalars['String']>;
  aggregatorWarningFlags_starts_with_nocase?: InputMaybe<Scalars['String']>;
  and?: InputMaybe<Array<InputMaybe<SystemSetting_Filter>>>;
  atomicMaxVolumePerBlock?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_gt?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_gte?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  atomicMaxVolumePerBlock_lt?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_lte?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_not?: InputMaybe<Scalars['BigInt']>;
  atomicMaxVolumePerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  atomicTwapWindow?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_gt?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_gte?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_in?: InputMaybe<Array<Scalars['BigInt']>>;
  atomicTwapWindow_lt?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_lte?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_not?: InputMaybe<Scalars['BigInt']>;
  atomicTwapWindow_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  debtSnapshotStaleTime?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_gt?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_gte?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  debtSnapshotStaleTime_lt?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_lte?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_not?: InputMaybe<Scalars['BigInt']>;
  debtSnapshotStaleTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  etherWrapperBurnFeeRate?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  etherWrapperBurnFeeRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_not?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperBurnFeeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  etherWrapperMaxETH?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  etherWrapperMaxETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_not?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMaxETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  etherWrapperMintFeeRate?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  etherWrapperMintFeeRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_not?: InputMaybe<Scalars['BigDecimal']>;
  etherWrapperMintFeeRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feePeriodDuration?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_gt?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_gte?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feePeriodDuration_lt?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_lte?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_not?: InputMaybe<Scalars['BigInt']>;
  feePeriodDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  issuanceRatio?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_gt?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_gte?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  issuanceRatio_lt?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_lte?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_not?: InputMaybe<Scalars['BigDecimal']>;
  issuanceRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidationDelay?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationDelay_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_not?: InputMaybe<Scalars['BigInt']>;
  liquidationDelay_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPenalty?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidationPenalty_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidationPenalty_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidationRatio?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidationRatio_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidationRatio_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumStakeTime?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_gt?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_gte?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumStakeTime_lt?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_lte?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_not?: InputMaybe<Scalars['BigInt']>;
  minimumStakeTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<SystemSetting_Filter>>>;
  priceDeviationThresholdFactor?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceDeviationThresholdFactor_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_not?: InputMaybe<Scalars['BigDecimal']>;
  priceDeviationThresholdFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rateStalePeriod?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_gt?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_gte?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateStalePeriod_lt?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_lte?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_not?: InputMaybe<Scalars['BigInt']>;
  rateStalePeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetThreshold?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_gt?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_gte?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  targetThreshold_lt?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_lte?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_not?: InputMaybe<Scalars['BigDecimal']>;
  targetThreshold_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  waitingPeriodSecs?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_gt?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_gte?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  waitingPeriodSecs_lt?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_lte?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_not?: InputMaybe<Scalars['BigInt']>;
  waitingPeriodSecs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum SystemSetting_OrderBy {
  AggregatorWarningFlags = 'aggregatorWarningFlags',
  AtomicMaxVolumePerBlock = 'atomicMaxVolumePerBlock',
  AtomicTwapWindow = 'atomicTwapWindow',
  DebtSnapshotStaleTime = 'debtSnapshotStaleTime',
  EtherWrapperBurnFeeRate = 'etherWrapperBurnFeeRate',
  EtherWrapperMaxEth = 'etherWrapperMaxETH',
  EtherWrapperMintFeeRate = 'etherWrapperMintFeeRate',
  FeePeriodDuration = 'feePeriodDuration',
  Id = 'id',
  IssuanceRatio = 'issuanceRatio',
  LiquidationDelay = 'liquidationDelay',
  LiquidationPenalty = 'liquidationPenalty',
  LiquidationRatio = 'liquidationRatio',
  MinimumStakeTime = 'minimumStakeTime',
  PriceDeviationThresholdFactor = 'priceDeviationThresholdFactor',
  RateStalePeriod = 'rateStalePeriod',
  TargetThreshold = 'targetThreshold',
  Timestamp = 'timestamp',
  WaitingPeriodSecs = 'waitingPeriodSecs',
}

export type TemporaryExchangePartnerTracker = {
  __typename?: 'TemporaryExchangePartnerTracker';
  /**  Transaction hash of the Exchange event  */
  id: Scalars['ID'];
  /**  String format of the tracking code for a given partner  */
  partner?: Maybe<Scalars['String']>;
  /**  Total fees from this transaction hash  */
  usdFees?: Maybe<Scalars['BigDecimal']>;
  /**  Total transaction volume in USD across all ExchangeEntryAppended events in a single tx hash  */
  usdVolume?: Maybe<Scalars['BigDecimal']>;
};

export type TemporaryExchangePartnerTracker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TemporaryExchangePartnerTracker_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<TemporaryExchangePartnerTracker_Filter>>>;
  partner?: InputMaybe<Scalars['String']>;
  partner_contains?: InputMaybe<Scalars['String']>;
  partner_contains_nocase?: InputMaybe<Scalars['String']>;
  partner_ends_with?: InputMaybe<Scalars['String']>;
  partner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  partner_gt?: InputMaybe<Scalars['String']>;
  partner_gte?: InputMaybe<Scalars['String']>;
  partner_in?: InputMaybe<Array<Scalars['String']>>;
  partner_lt?: InputMaybe<Scalars['String']>;
  partner_lte?: InputMaybe<Scalars['String']>;
  partner_not?: InputMaybe<Scalars['String']>;
  partner_not_contains?: InputMaybe<Scalars['String']>;
  partner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  partner_not_ends_with?: InputMaybe<Scalars['String']>;
  partner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  partner_not_in?: InputMaybe<Array<Scalars['String']>>;
  partner_not_starts_with?: InputMaybe<Scalars['String']>;
  partner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  partner_starts_with?: InputMaybe<Scalars['String']>;
  partner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  usdFees?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not?: InputMaybe<Scalars['BigDecimal']>;
  usdFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  usdVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  usdVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TemporaryExchangePartnerTracker_OrderBy {
  Id = 'id',
  Partner = 'partner',
  UsdFees = 'usdFees',
  UsdVolume = 'usdVolume',
}

export type Total = {
  __typename?: 'Total';
  /**  minimum power of 10 (in from USD value) the trade must be. ex, 2 means $100 or higher)  */
  bucketMagnitude: Scalars['BigInt'];
  /**  synth value exchanged in USD units  */
  exchangeUSDTally: Scalars['BigDecimal'];
  /**  number of unique traders seen over period  */
  exchangers: Scalars['BigInt'];
  /**  $timestamp-$bucketMagnitude-$synth-$period  */
  id: Scalars['ID'];
  /**  number of unique traders who were first seen in this period  */
  newExchangers: Scalars['BigInt'];
  /**  number of seconds the data covers after `timestamp`  */
  period: Scalars['BigInt'];
  /**  which product the volume came from. Ex 'futures' or 'exchange'  */
  product: Scalars['String'];
  /**  synth to filter by  */
  synth?: Maybe<Synth>;
  /**  timestamp of the beginning of the time period this represents  */
  timestamp: Scalars['BigInt'];
  /**  synth value received in fees in USD units  */
  totalFeesGeneratedInUSD: Scalars['BigDecimal'];
  /**  number of trades completed over period  */
  trades: Scalars['BigInt'];
};

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

export type Total_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Total_Filter>>>;
  bucketMagnitude?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_gt?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_gte?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bucketMagnitude_lt?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_lte?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_not?: InputMaybe<Scalars['BigInt']>;
  bucketMagnitude_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_gt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_gte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangeUSDTally_lt?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_lte?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_not?: InputMaybe<Scalars['BigDecimal']>;
  exchangeUSDTally_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  exchangers?: InputMaybe<Scalars['BigInt']>;
  exchangers_gt?: InputMaybe<Scalars['BigInt']>;
  exchangers_gte?: InputMaybe<Scalars['BigInt']>;
  exchangers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangers_lt?: InputMaybe<Scalars['BigInt']>;
  exchangers_lte?: InputMaybe<Scalars['BigInt']>;
  exchangers_not?: InputMaybe<Scalars['BigInt']>;
  exchangers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newExchangers?: InputMaybe<Scalars['BigInt']>;
  newExchangers_gt?: InputMaybe<Scalars['BigInt']>;
  newExchangers_gte?: InputMaybe<Scalars['BigInt']>;
  newExchangers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newExchangers_lt?: InputMaybe<Scalars['BigInt']>;
  newExchangers_lte?: InputMaybe<Scalars['BigInt']>;
  newExchangers_not?: InputMaybe<Scalars['BigInt']>;
  newExchangers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  or?: InputMaybe<Array<InputMaybe<Total_Filter>>>;
  period?: InputMaybe<Scalars['BigInt']>;
  period_gt?: InputMaybe<Scalars['BigInt']>;
  period_gte?: InputMaybe<Scalars['BigInt']>;
  period_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period_lt?: InputMaybe<Scalars['BigInt']>;
  period_lte?: InputMaybe<Scalars['BigInt']>;
  period_not?: InputMaybe<Scalars['BigInt']>;
  period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  product?: InputMaybe<Scalars['String']>;
  product_contains?: InputMaybe<Scalars['String']>;
  product_contains_nocase?: InputMaybe<Scalars['String']>;
  product_ends_with?: InputMaybe<Scalars['String']>;
  product_ends_with_nocase?: InputMaybe<Scalars['String']>;
  product_gt?: InputMaybe<Scalars['String']>;
  product_gte?: InputMaybe<Scalars['String']>;
  product_in?: InputMaybe<Array<Scalars['String']>>;
  product_lt?: InputMaybe<Scalars['String']>;
  product_lte?: InputMaybe<Scalars['String']>;
  product_not?: InputMaybe<Scalars['String']>;
  product_not_contains?: InputMaybe<Scalars['String']>;
  product_not_contains_nocase?: InputMaybe<Scalars['String']>;
  product_not_ends_with?: InputMaybe<Scalars['String']>;
  product_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  product_not_in?: InputMaybe<Array<Scalars['String']>>;
  product_not_starts_with?: InputMaybe<Scalars['String']>;
  product_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  product_starts_with?: InputMaybe<Scalars['String']>;
  product_starts_with_nocase?: InputMaybe<Scalars['String']>;
  synth?: InputMaybe<Scalars['String']>;
  synth_?: InputMaybe<Synth_Filter>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFeesGeneratedInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesGeneratedInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trades?: InputMaybe<Scalars['BigInt']>;
  trades_gt?: InputMaybe<Scalars['BigInt']>;
  trades_gte?: InputMaybe<Scalars['BigInt']>;
  trades_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trades_lt?: InputMaybe<Scalars['BigInt']>;
  trades_lte?: InputMaybe<Scalars['BigInt']>;
  trades_not?: InputMaybe<Scalars['BigInt']>;
  trades_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Total_OrderBy {
  BucketMagnitude = 'bucketMagnitude',
  ExchangeUsdTally = 'exchangeUSDTally',
  Exchangers = 'exchangers',
  Id = 'id',
  NewExchangers = 'newExchangers',
  Period = 'period',
  Product = 'product',
  Synth = 'synth',
  Timestamp = 'timestamp',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD',
  Trades = 'trades',
}

export type Wrapper = {
  __typename?: 'Wrapper';
  /**  the current amount of synths minted by this wrapper */
  amount: Scalars['BigDecimal'];
  /**  the current amount of synths minted by this wrapper in USD */
  amountInUSD: Scalars['BigDecimal'];
  /**  the currency key of this wrapper  */
  currencyKey: Scalars['String'];
  /**  wrapper address  */
  id: Scalars['ID'];
  /**  the maximum amount of synths that can be minted by this wrapper */
  maxAmount: Scalars['BigDecimal'];
  /**  address of wrapped token, empty if ETH */
  tokenAddress: Scalars['String'];
  /**  the total amount of fees generated by this wrapper  */
  totalFees: Scalars['BigDecimal'];
  /**  the total amount of fees generated by this wrapper in USD */
  totalFeesInUSD: Scalars['BigDecimal'];
};

export type WrapperBurn = {
  __typename?: 'WrapperBurn';
  /**  address of the user burning  */
  account: Scalars['String'];
  /**  total amount removed from the wrapper  */
  amountOut: Scalars['BigDecimal'];
  /**  amount of fees collected  */
  fee: Scalars['BigDecimal'];
  /**  the transaction hash with a log index appended  */
  id: Scalars['ID'];
  /**  amount of synth burned  */
  principal: Scalars['BigDecimal'];
  /**  the timestamp of the block that includes this event  */
  timestamp: Scalars['BigInt'];
  /**  the address of the wrapper that burned this synth  */
  wrapperAddress: Scalars['String'];
};

export type WrapperBurn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amountOut?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountOut_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_not?: InputMaybe<Scalars['BigDecimal']>;
  amountOut_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<WrapperBurn_Filter>>>;
  fee?: InputMaybe<Scalars['BigDecimal']>;
  fee_gt?: InputMaybe<Scalars['BigDecimal']>;
  fee_gte?: InputMaybe<Scalars['BigDecimal']>;
  fee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fee_lt?: InputMaybe<Scalars['BigDecimal']>;
  fee_lte?: InputMaybe<Scalars['BigDecimal']>;
  fee_not?: InputMaybe<Scalars['BigDecimal']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<WrapperBurn_Filter>>>;
  principal?: InputMaybe<Scalars['BigDecimal']>;
  principal_gt?: InputMaybe<Scalars['BigDecimal']>;
  principal_gte?: InputMaybe<Scalars['BigDecimal']>;
  principal_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal_lt?: InputMaybe<Scalars['BigDecimal']>;
  principal_lte?: InputMaybe<Scalars['BigDecimal']>;
  principal_not?: InputMaybe<Scalars['BigDecimal']>;
  principal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  wrapperAddress?: InputMaybe<Scalars['String']>;
  wrapperAddress_contains?: InputMaybe<Scalars['String']>;
  wrapperAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_ends_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_gt?: InputMaybe<Scalars['String']>;
  wrapperAddress_gte?: InputMaybe<Scalars['String']>;
  wrapperAddress_in?: InputMaybe<Array<Scalars['String']>>;
  wrapperAddress_lt?: InputMaybe<Scalars['String']>;
  wrapperAddress_lte?: InputMaybe<Scalars['String']>;
  wrapperAddress_not?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_contains?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  wrapperAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_starts_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum WrapperBurn_OrderBy {
  Account = 'account',
  AmountOut = 'amountOut',
  Fee = 'fee',
  Id = 'id',
  Principal = 'principal',
  Timestamp = 'timestamp',
  WrapperAddress = 'wrapperAddress',
}

export type WrapperMint = {
  __typename?: 'WrapperMint';
  /**  address of the user minting  */
  account: Scalars['String'];
  /**  total amount added to the wrapper  */
  amountIn: Scalars['BigDecimal'];
  /**  amount of fees collected  */
  fee: Scalars['BigDecimal'];
  /**  the transaction hash with a log index appended  */
  id: Scalars['ID'];
  /**  amount of synth minted  */
  principal: Scalars['BigDecimal'];
  /**  the timestamp of the block that includes this event  */
  timestamp: Scalars['BigInt'];
  /**  the address of the wrapper that minted this synth  */
  wrapperAddress: Scalars['String'];
};

export type WrapperMint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amountIn?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountIn_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_not?: InputMaybe<Scalars['BigDecimal']>;
  amountIn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<WrapperMint_Filter>>>;
  fee?: InputMaybe<Scalars['BigDecimal']>;
  fee_gt?: InputMaybe<Scalars['BigDecimal']>;
  fee_gte?: InputMaybe<Scalars['BigDecimal']>;
  fee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fee_lt?: InputMaybe<Scalars['BigDecimal']>;
  fee_lte?: InputMaybe<Scalars['BigDecimal']>;
  fee_not?: InputMaybe<Scalars['BigDecimal']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<WrapperMint_Filter>>>;
  principal?: InputMaybe<Scalars['BigDecimal']>;
  principal_gt?: InputMaybe<Scalars['BigDecimal']>;
  principal_gte?: InputMaybe<Scalars['BigDecimal']>;
  principal_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal_lt?: InputMaybe<Scalars['BigDecimal']>;
  principal_lte?: InputMaybe<Scalars['BigDecimal']>;
  principal_not?: InputMaybe<Scalars['BigDecimal']>;
  principal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  wrapperAddress?: InputMaybe<Scalars['String']>;
  wrapperAddress_contains?: InputMaybe<Scalars['String']>;
  wrapperAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_ends_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_gt?: InputMaybe<Scalars['String']>;
  wrapperAddress_gte?: InputMaybe<Scalars['String']>;
  wrapperAddress_in?: InputMaybe<Array<Scalars['String']>>;
  wrapperAddress_lt?: InputMaybe<Scalars['String']>;
  wrapperAddress_lte?: InputMaybe<Scalars['String']>;
  wrapperAddress_not?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_contains?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  wrapperAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wrapperAddress_starts_with?: InputMaybe<Scalars['String']>;
  wrapperAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum WrapperMint_OrderBy {
  Account = 'account',
  AmountIn = 'amountIn',
  Fee = 'fee',
  Id = 'id',
  Principal = 'principal',
  Timestamp = 'timestamp',
  WrapperAddress = 'wrapperAddress',
}

export type Wrapper_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  and?: InputMaybe<Array<InputMaybe<Wrapper_Filter>>>;
  currencyKey?: InputMaybe<Scalars['String']>;
  currencyKey_contains?: InputMaybe<Scalars['String']>;
  currencyKey_contains_nocase?: InputMaybe<Scalars['String']>;
  currencyKey_ends_with?: InputMaybe<Scalars['String']>;
  currencyKey_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencyKey_gt?: InputMaybe<Scalars['String']>;
  currencyKey_gte?: InputMaybe<Scalars['String']>;
  currencyKey_in?: InputMaybe<Array<Scalars['String']>>;
  currencyKey_lt?: InputMaybe<Scalars['String']>;
  currencyKey_lte?: InputMaybe<Scalars['String']>;
  currencyKey_not?: InputMaybe<Scalars['String']>;
  currencyKey_not_contains?: InputMaybe<Scalars['String']>;
  currencyKey_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currencyKey_not_ends_with?: InputMaybe<Scalars['String']>;
  currencyKey_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currencyKey_not_in?: InputMaybe<Array<Scalars['String']>>;
  currencyKey_not_starts_with?: InputMaybe<Scalars['String']>;
  currencyKey_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currencyKey_starts_with?: InputMaybe<Scalars['String']>;
  currencyKey_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxAmount?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  maxAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  maxAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  or?: InputMaybe<Array<InputMaybe<Wrapper_Filter>>>;
  tokenAddress?: InputMaybe<Scalars['String']>;
  tokenAddress_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_lt?: InputMaybe<Scalars['String']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']>;
  tokenAddress_not?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  tokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  tokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalFees?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFeesInUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalFeesInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalFees_not?: InputMaybe<Scalars['BigDecimal']>;
  totalFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Wrapper_OrderBy {
  Amount = 'amount',
  AmountInUsd = 'amountInUSD',
  CurrencyKey = 'currencyKey',
  Id = 'id',
  MaxAmount = 'maxAmount',
  TokenAddress = 'tokenAddress',
  TotalFees = 'totalFees',
  TotalFeesInUsd = 'totalFeesInUSD',
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
