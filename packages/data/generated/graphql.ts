export type Maybe<T> = T | null;
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
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum ActiveStaker_OrderBy {
  Id = 'id'
}



export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type Burned = {
  __typename?: 'Burned';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  value: Scalars['BigInt'];
  source: Scalars['String'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type Burned_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  source?: Maybe<Scalars['String']>;
  source_not?: Maybe<Scalars['String']>;
  source_gt?: Maybe<Scalars['String']>;
  source_lt?: Maybe<Scalars['String']>;
  source_gte?: Maybe<Scalars['String']>;
  source_lte?: Maybe<Scalars['String']>;
  source_in?: Maybe<Array<Scalars['String']>>;
  source_not_in?: Maybe<Array<Scalars['String']>>;
  source_contains?: Maybe<Scalars['String']>;
  source_not_contains?: Maybe<Scalars['String']>;
  source_starts_with?: Maybe<Scalars['String']>;
  source_not_starts_with?: Maybe<Scalars['String']>;
  source_ends_with?: Maybe<Scalars['String']>;
  source_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Burned_OrderBy {
  Id = 'id',
  Account = 'account',
  Value = 'value',
  Source = 'source',
  Timestamp = 'timestamp',
  GasPrice = 'gasPrice',
  Block = 'block'
}


export type ContractUpdated = {
  __typename?: 'ContractUpdated';
  id: Scalars['ID'];
  source: Scalars['String'];
  target: Scalars['Bytes'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type ContractUpdated_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  source?: Maybe<Scalars['String']>;
  source_not?: Maybe<Scalars['String']>;
  source_gt?: Maybe<Scalars['String']>;
  source_lt?: Maybe<Scalars['String']>;
  source_gte?: Maybe<Scalars['String']>;
  source_lte?: Maybe<Scalars['String']>;
  source_in?: Maybe<Array<Scalars['String']>>;
  source_not_in?: Maybe<Array<Scalars['String']>>;
  source_contains?: Maybe<Scalars['String']>;
  source_not_contains?: Maybe<Scalars['String']>;
  source_starts_with?: Maybe<Scalars['String']>;
  source_not_starts_with?: Maybe<Scalars['String']>;
  source_ends_with?: Maybe<Scalars['String']>;
  source_not_ends_with?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Bytes']>;
  target_not?: Maybe<Scalars['Bytes']>;
  target_in?: Maybe<Array<Scalars['Bytes']>>;
  target_not_in?: Maybe<Array<Scalars['Bytes']>>;
  target_contains?: Maybe<Scalars['Bytes']>;
  target_not_contains?: Maybe<Scalars['Bytes']>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ContractUpdated_OrderBy {
  Id = 'id',
  Source = 'source',
  Target = 'target',
  Block = 'block',
  Timestamp = 'timestamp'
}

export type DebtSnapshot = {
  __typename?: 'DebtSnapshot';
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  account: Scalars['Bytes'];
  balanceOf?: Maybe<Scalars['BigInt']>;
  collateral?: Maybe<Scalars['BigInt']>;
  debtBalanceOf?: Maybe<Scalars['BigInt']>;
};

export type DebtSnapshot_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  balanceOf?: Maybe<Scalars['BigInt']>;
  balanceOf_not?: Maybe<Scalars['BigInt']>;
  balanceOf_gt?: Maybe<Scalars['BigInt']>;
  balanceOf_lt?: Maybe<Scalars['BigInt']>;
  balanceOf_gte?: Maybe<Scalars['BigInt']>;
  balanceOf_lte?: Maybe<Scalars['BigInt']>;
  balanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtBalanceOf?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_not?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_gt?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_lt?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_gte?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_lte?: Maybe<Scalars['BigInt']>;
  debtBalanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  debtBalanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum DebtSnapshot_OrderBy {
  Id = 'id',
  Block = 'block',
  Timestamp = 'timestamp',
  Account = 'account',
  BalanceOf = 'balanceOf',
  Collateral = 'collateral',
  DebtBalanceOf = 'debtBalanceOf'
}

export type FeesClaimed = {
  __typename?: 'FeesClaimed';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  value: Scalars['BigInt'];
  rewards: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type FeesClaimed_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  rewards?: Maybe<Scalars['BigInt']>;
  rewards_not?: Maybe<Scalars['BigInt']>;
  rewards_gt?: Maybe<Scalars['BigInt']>;
  rewards_lt?: Maybe<Scalars['BigInt']>;
  rewards_gte?: Maybe<Scalars['BigInt']>;
  rewards_lte?: Maybe<Scalars['BigInt']>;
  rewards_in?: Maybe<Array<Scalars['BigInt']>>;
  rewards_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum FeesClaimed_OrderBy {
  Id = 'id',
  Account = 'account',
  Value = 'value',
  Rewards = 'rewards',
  Block = 'block',
  Timestamp = 'timestamp'
}

export type Issued = {
  __typename?: 'Issued';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  value: Scalars['BigInt'];
  source: Scalars['String'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type Issued_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  source?: Maybe<Scalars['String']>;
  source_not?: Maybe<Scalars['String']>;
  source_gt?: Maybe<Scalars['String']>;
  source_lt?: Maybe<Scalars['String']>;
  source_gte?: Maybe<Scalars['String']>;
  source_lte?: Maybe<Scalars['String']>;
  source_in?: Maybe<Array<Scalars['String']>>;
  source_not_in?: Maybe<Array<Scalars['String']>>;
  source_contains?: Maybe<Scalars['String']>;
  source_not_contains?: Maybe<Scalars['String']>;
  source_starts_with?: Maybe<Scalars['String']>;
  source_not_starts_with?: Maybe<Scalars['String']>;
  source_ends_with?: Maybe<Scalars['String']>;
  source_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Issued_OrderBy {
  Id = 'id',
  Account = 'account',
  Value = 'value',
  Source = 'source',
  Timestamp = 'timestamp',
  GasPrice = 'gasPrice',
  Block = 'block'
}

export type Issuer = {
  __typename?: 'Issuer';
  id: Scalars['ID'];
};

export type Issuer_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Issuer_OrderBy {
  Id = 'id'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
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
  aggregatorAnswer?: Maybe<AggregatorAnswer>;
  aggregatorAnswers: Array<AggregatorAnswer>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  clearedDeposit?: Maybe<ClearedDeposit>;
  clearedDeposits: Array<ClearedDeposit>;
  collateralDeposited?: Maybe<CollateralDeposited>;
  collateralDepositeds: Array<CollateralDeposited>;
  collateralWithdrawn?: Maybe<CollateralWithdrawn>;
  collateralWithdrawns: Array<CollateralWithdrawn>;
  contractUpdated?: Maybe<ContractUpdated>;
  contractUpdateds: Array<ContractUpdated>;
  dailyExchangePartner?: Maybe<DailyExchangePartner>;
  dailyExchangePartners: Array<DailyExchangePartner>;
  dailyExchanger?: Maybe<DailyExchanger>;
  dailyExchangers: Array<DailyExchanger>;
  dailySNXPrice?: Maybe<DailySnxPrice>;
  dailySNXPrices: Array<DailySnxPrice>;
  dailyTotal?: Maybe<DailyTotal>;
  dailyTotals: Array<DailyTotal>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  exchange?: Maybe<Exchange>;
  exchangeEntryAppended?: Maybe<ExchangeEntryAppended>;
  exchangeEntryAppendeds: Array<ExchangeEntryAppended>;
  exchangeEntrySettled?: Maybe<ExchangeEntrySettled>;
  exchangeEntrySettleds: Array<ExchangeEntrySettled>;
  exchangePartner?: Maybe<ExchangePartner>;
  exchangePartners: Array<ExchangePartner>;
  exchangeRebate?: Maybe<ExchangeRebate>;
  exchangeRebates: Array<ExchangeRebate>;
  exchangeReclaim?: Maybe<ExchangeReclaim>;
  exchangeReclaims: Array<ExchangeReclaim>;
  exchanger?: Maybe<Exchanger>;
  exchangers: Array<Exchanger>;
  exchanges: Array<Exchange>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  fifteenMinuteExchanger?: Maybe<FifteenMinuteExchanger>;
  fifteenMinuteExchangers: Array<FifteenMinuteExchanger>;
  fifteenMinuteSNXPrice?: Maybe<FifteenMinuteSnxPrice>;
  fifteenMinuteSNXPrices: Array<FifteenMinuteSnxPrice>;
  fifteenMinuteTotal?: Maybe<FifteenMinuteTotal>;
  fifteenMinuteTotals: Array<FifteenMinuteTotal>;
  historicalOptionPrice?: Maybe<HistoricalOptionPrice>;
  historicalOptionPrices: Array<HistoricalOptionPrice>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  latestRate?: Maybe<LatestRate>;
  latestRates: Array<LatestRate>;
  loan?: Maybe<Loan>;
  loanLiquidated?: Maybe<LoanLiquidated>;
  loanLiquidateds: Array<LoanLiquidated>;
  loanPartiallyLiquidated?: Maybe<LoanPartiallyLiquidated>;
  loanPartiallyLiquidateds: Array<LoanPartiallyLiquidated>;
  loanRepaid?: Maybe<LoanRepaid>;
  loanRepaids: Array<LoanRepaid>;
  loans: Array<Loan>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  optionTransaction?: Maybe<OptionTransaction>;
  optionTransactions: Array<OptionTransaction>;
  postArchernarExchanger?: Maybe<PostArchernarExchanger>;
  postArchernarExchangers: Array<PostArchernarExchanger>;
  postArchernarTotal?: Maybe<PostArchernarTotal>;
  postArchernarTotals: Array<PostArchernarTotal>;
  rateUpdate?: Maybe<RateUpdate>;
  rateUpdates: Array<RateUpdate>;
  ratesUpdated?: Maybe<RatesUpdated>;
  ratesUpdateds: Array<RatesUpdated>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synthExchange?: Maybe<SynthExchange>;
  synthExchanges: Array<SynthExchange>;
  synthHolder?: Maybe<SynthHolder>;
  synthHolders: Array<SynthHolder>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  temporaryExchangePartnerTracker?: Maybe<TemporaryExchangePartnerTracker>;
  temporaryExchangePartnerTrackers: Array<TemporaryExchangePartnerTracker>;
  total?: Maybe<Total>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
  totals: Array<Total>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  userAction?: Maybe<UserAction>;
  userActions: Array<UserAction>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryAccountFlaggedForLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryAccountFlaggedForLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountFlaggedForLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountFlaggedForLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryAccountLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryAccountLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryAccountRemovedFromLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryAccountRemovedFromLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountRemovedFromLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountRemovedFromLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryAggregatorAnswerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryAggregatorAnswersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AggregatorAnswer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AggregatorAnswer_Filter>;
};


export type QueryBurnedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryBurnedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burned_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Burned_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryClearedDepositArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryClearedDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClearedDeposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClearedDeposit_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryCollateralDepositedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryCollateralDepositedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralDeposited_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralDeposited_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryCollateralWithdrawnArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryCollateralWithdrawnsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralWithdrawn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralWithdrawn_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryContractUpdatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryContractUpdatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractUpdated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractUpdated_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDailyExchangePartnerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDailyExchangePartnersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyExchangePartner_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyExchangePartner_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDailyExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDailyExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDailySnxPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryDailySnxPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailySnxPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<DailySnxPrice_Filter>;
};


export type QueryDailyTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDailyTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDebtSnapshotArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDebtSnapshotsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DebtSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DebtSnapshot_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangeEntryAppendedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangeEntryAppendedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeEntryAppended_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeEntryAppended_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangeEntrySettledArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangeEntrySettledsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeEntrySettled_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeEntrySettled_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangePartnerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangePartnersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangePartner_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangePartner_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangeRebateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangeRebatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeRebate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeRebate_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangeReclaimArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangeReclaimsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeReclaim_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeReclaim_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Exchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Exchange_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryFeesClaimedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryFeesClaimedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FeesClaimed_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FeesClaimed_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryFifteenMinuteExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryFifteenMinuteExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FifteenMinuteExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryFifteenMinuteSnxPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryFifteenMinuteSnxPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteSnxPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FifteenMinuteSnxPrice_Filter>;
};


export type QueryFifteenMinuteTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryFifteenMinuteTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FifteenMinuteTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryHistoricalOptionPriceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryHistoricalOptionPricesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HistoricalOptionPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<HistoricalOptionPrice_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryIssuedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryIssuedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Issued_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Issued_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryIssuerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryIssuersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Issuer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Issuer_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryLatestRateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryLatestRatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LatestRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LatestRate_Filter>;
};


export type QueryLoanArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryLoanLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryLoanLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryLoanPartiallyLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryLoanPartiallyLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanPartiallyLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanPartiallyLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryLoanRepaidArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryLoanRepaidsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanRepaid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanRepaid_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryLoansArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Loan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Loan_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryMarketArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryMarketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryOptionTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryOptionTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OptionTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OptionTransaction_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPostArchernarExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPostArchernarExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostArchernarExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostArchernarExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryPostArchernarTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPostArchernarTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostArchernarTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostArchernarTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryRateUpdateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryRateUpdatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RateUpdate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RateUpdate_Filter>;
};


export type QueryRatesUpdatedArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryRatesUpdatedsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RatesUpdated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RatesUpdated_Filter>;
};


export type QueryRewardEscrowHolderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryRewardEscrowHoldersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RewardEscrowHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RewardEscrowHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type QuerySnxholderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QuerySnxholdersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SnxHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SnxHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type QuerySynthExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QuerySynthExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SynthExchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SynthExchange_Filter>;
  block?: Maybe<Block_Height>;
};


export type QuerySynthHolderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QuerySynthHoldersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SynthHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SynthHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type QuerySynthetixArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QuerySynthetixesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Synthetix_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Synthetix_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryTemporaryExchangePartnerTrackerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryTemporaryExchangePartnerTrackersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TemporaryExchangePartnerTracker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TemporaryExchangePartnerTracker_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryTotalActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryTotalActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TotalActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TotalActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryTotalDailyActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryTotalDailyActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TotalDailyActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TotalDailyActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Total_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Total_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryTransferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryTransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transfer_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryUserActionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryUserActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserAction_Filter>;
  block?: Maybe<Block_Height>;
};

export type RewardEscrowHolder = {
  __typename?: 'RewardEscrowHolder';
  id: Scalars['ID'];
  balanceOf: Scalars['BigInt'];
  vestedBalanceOf: Scalars['BigInt'];
};

export type RewardEscrowHolder_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  balanceOf?: Maybe<Scalars['BigInt']>;
  balanceOf_not?: Maybe<Scalars['BigInt']>;
  balanceOf_gt?: Maybe<Scalars['BigInt']>;
  balanceOf_lt?: Maybe<Scalars['BigInt']>;
  balanceOf_gte?: Maybe<Scalars['BigInt']>;
  balanceOf_lte?: Maybe<Scalars['BigInt']>;
  balanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
  vestedBalanceOf?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_not?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_gt?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_lt?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_gte?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_lte?: Maybe<Scalars['BigInt']>;
  vestedBalanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  vestedBalanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum RewardEscrowHolder_OrderBy {
  Id = 'id',
  BalanceOf = 'balanceOf',
  VestedBalanceOf = 'vestedBalanceOf'
}

export type SnxHolder = {
  __typename?: 'SNXHolder';
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  balanceOf?: Maybe<Scalars['BigInt']>;
  collateral?: Maybe<Scalars['BigInt']>;
  transferable?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex?: Maybe<Scalars['BigInt']>;
  claims?: Maybe<Scalars['BigInt']>;
  mints?: Maybe<Scalars['BigInt']>;
};

export type SnxHolder_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceOf?: Maybe<Scalars['BigInt']>;
  balanceOf_not?: Maybe<Scalars['BigInt']>;
  balanceOf_gt?: Maybe<Scalars['BigInt']>;
  balanceOf_lt?: Maybe<Scalars['BigInt']>;
  balanceOf_gte?: Maybe<Scalars['BigInt']>;
  balanceOf_lte?: Maybe<Scalars['BigInt']>;
  balanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transferable?: Maybe<Scalars['BigInt']>;
  transferable_not?: Maybe<Scalars['BigInt']>;
  transferable_gt?: Maybe<Scalars['BigInt']>;
  transferable_lt?: Maybe<Scalars['BigInt']>;
  transferable_gte?: Maybe<Scalars['BigInt']>;
  transferable_lte?: Maybe<Scalars['BigInt']>;
  transferable_in?: Maybe<Array<Scalars['BigInt']>>;
  transferable_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initialDebtOwnership?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_not?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_gt?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_lt?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_gte?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_lte?: Maybe<Scalars['BigInt']>;
  initialDebtOwnership_in?: Maybe<Array<Scalars['BigInt']>>;
  initialDebtOwnership_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debtEntryAtIndex?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_not?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_gt?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_lt?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_gte?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_lte?: Maybe<Scalars['BigInt']>;
  debtEntryAtIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  debtEntryAtIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  claims?: Maybe<Scalars['BigInt']>;
  claims_not?: Maybe<Scalars['BigInt']>;
  claims_gt?: Maybe<Scalars['BigInt']>;
  claims_lt?: Maybe<Scalars['BigInt']>;
  claims_gte?: Maybe<Scalars['BigInt']>;
  claims_lte?: Maybe<Scalars['BigInt']>;
  claims_in?: Maybe<Array<Scalars['BigInt']>>;
  claims_not_in?: Maybe<Array<Scalars['BigInt']>>;
  mints?: Maybe<Scalars['BigInt']>;
  mints_not?: Maybe<Scalars['BigInt']>;
  mints_gt?: Maybe<Scalars['BigInt']>;
  mints_lt?: Maybe<Scalars['BigInt']>;
  mints_gte?: Maybe<Scalars['BigInt']>;
  mints_lte?: Maybe<Scalars['BigInt']>;
  mints_in?: Maybe<Array<Scalars['BigInt']>>;
  mints_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum SnxHolder_OrderBy {
  Id = 'id',
  Block = 'block',
  Timestamp = 'timestamp',
  BalanceOf = 'balanceOf',
  Collateral = 'collateral',
  Transferable = 'transferable',
  InitialDebtOwnership = 'initialDebtOwnership',
  DebtEntryAtIndex = 'debtEntryAtIndex',
  Claims = 'claims',
  Mints = 'mints'
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
  aggregatorAnswer?: Maybe<AggregatorAnswer>;
  aggregatorAnswers: Array<AggregatorAnswer>;
  burned?: Maybe<Burned>;
  burneds: Array<Burned>;
  clearedDeposit?: Maybe<ClearedDeposit>;
  clearedDeposits: Array<ClearedDeposit>;
  collateralDeposited?: Maybe<CollateralDeposited>;
  collateralDepositeds: Array<CollateralDeposited>;
  collateralWithdrawn?: Maybe<CollateralWithdrawn>;
  collateralWithdrawns: Array<CollateralWithdrawn>;
  contractUpdated?: Maybe<ContractUpdated>;
  contractUpdateds: Array<ContractUpdated>;
  dailyExchangePartner?: Maybe<DailyExchangePartner>;
  dailyExchangePartners: Array<DailyExchangePartner>;
  dailyExchanger?: Maybe<DailyExchanger>;
  dailyExchangers: Array<DailyExchanger>;
  dailySNXPrice?: Maybe<DailySnxPrice>;
  dailySNXPrices: Array<DailySnxPrice>;
  dailyTotal?: Maybe<DailyTotal>;
  dailyTotals: Array<DailyTotal>;
  debtSnapshot?: Maybe<DebtSnapshot>;
  debtSnapshots: Array<DebtSnapshot>;
  exchange?: Maybe<Exchange>;
  exchangeEntryAppended?: Maybe<ExchangeEntryAppended>;
  exchangeEntryAppendeds: Array<ExchangeEntryAppended>;
  exchangeEntrySettled?: Maybe<ExchangeEntrySettled>;
  exchangeEntrySettleds: Array<ExchangeEntrySettled>;
  exchangePartner?: Maybe<ExchangePartner>;
  exchangePartners: Array<ExchangePartner>;
  exchangeRebate?: Maybe<ExchangeRebate>;
  exchangeRebates: Array<ExchangeRebate>;
  exchangeReclaim?: Maybe<ExchangeReclaim>;
  exchangeReclaims: Array<ExchangeReclaim>;
  exchanger?: Maybe<Exchanger>;
  exchangers: Array<Exchanger>;
  exchanges: Array<Exchange>;
  feesClaimed?: Maybe<FeesClaimed>;
  feesClaimeds: Array<FeesClaimed>;
  fifteenMinuteExchanger?: Maybe<FifteenMinuteExchanger>;
  fifteenMinuteExchangers: Array<FifteenMinuteExchanger>;
  fifteenMinuteSNXPrice?: Maybe<FifteenMinuteSnxPrice>;
  fifteenMinuteSNXPrices: Array<FifteenMinuteSnxPrice>;
  fifteenMinuteTotal?: Maybe<FifteenMinuteTotal>;
  fifteenMinuteTotals: Array<FifteenMinuteTotal>;
  historicalOptionPrice?: Maybe<HistoricalOptionPrice>;
  historicalOptionPrices: Array<HistoricalOptionPrice>;
  issued?: Maybe<Issued>;
  issueds: Array<Issued>;
  issuer?: Maybe<Issuer>;
  issuers: Array<Issuer>;
  latestRate?: Maybe<LatestRate>;
  latestRates: Array<LatestRate>;
  loan?: Maybe<Loan>;
  loanLiquidated?: Maybe<LoanLiquidated>;
  loanLiquidateds: Array<LoanLiquidated>;
  loanPartiallyLiquidated?: Maybe<LoanPartiallyLiquidated>;
  loanPartiallyLiquidateds: Array<LoanPartiallyLiquidated>;
  loanRepaid?: Maybe<LoanRepaid>;
  loanRepaids: Array<LoanRepaid>;
  loans: Array<Loan>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  optionTransaction?: Maybe<OptionTransaction>;
  optionTransactions: Array<OptionTransaction>;
  postArchernarExchanger?: Maybe<PostArchernarExchanger>;
  postArchernarExchangers: Array<PostArchernarExchanger>;
  postArchernarTotal?: Maybe<PostArchernarTotal>;
  postArchernarTotals: Array<PostArchernarTotal>;
  rateUpdate?: Maybe<RateUpdate>;
  rateUpdates: Array<RateUpdate>;
  ratesUpdated?: Maybe<RatesUpdated>;
  ratesUpdateds: Array<RatesUpdated>;
  rewardEscrowHolder?: Maybe<RewardEscrowHolder>;
  rewardEscrowHolders: Array<RewardEscrowHolder>;
  snxholder?: Maybe<SnxHolder>;
  snxholders: Array<SnxHolder>;
  synthExchange?: Maybe<SynthExchange>;
  synthExchanges: Array<SynthExchange>;
  synthHolder?: Maybe<SynthHolder>;
  synthHolders: Array<SynthHolder>;
  synthetix?: Maybe<Synthetix>;
  synthetixes: Array<Synthetix>;
  temporaryExchangePartnerTracker?: Maybe<TemporaryExchangePartnerTracker>;
  temporaryExchangePartnerTrackers: Array<TemporaryExchangePartnerTracker>;
  total?: Maybe<Total>;
  totalActiveStaker?: Maybe<TotalActiveStaker>;
  totalActiveStakers: Array<TotalActiveStaker>;
  totalDailyActiveStaker?: Maybe<TotalDailyActiveStaker>;
  totalDailyActiveStakers: Array<TotalDailyActiveStaker>;
  totals: Array<Total>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  userAction?: Maybe<UserAction>;
  userActions: Array<UserAction>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountFlaggedForLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountFlaggedForLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountFlaggedForLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountFlaggedForLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountRemovedFromLiquidationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountRemovedFromLiquidationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountRemovedFromLiquidation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountRemovedFromLiquidation_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionAggregatorAnswerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionAggregatorAnswersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AggregatorAnswer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AggregatorAnswer_Filter>;
};


export type SubscriptionBurnedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionBurnedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burned_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Burned_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionClearedDepositArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionClearedDepositsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ClearedDeposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ClearedDeposit_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionCollateralDepositedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionCollateralDepositedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralDeposited_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralDeposited_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionCollateralWithdrawnArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionCollateralWithdrawnsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralWithdrawn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralWithdrawn_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionContractUpdatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionContractUpdatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractUpdated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractUpdated_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailyExchangePartnerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailyExchangePartnersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyExchangePartner_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyExchangePartner_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailyExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailyExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailySnxPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionDailySnxPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailySnxPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<DailySnxPrice_Filter>;
};


export type SubscriptionDailyTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDailyTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DailyTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DailyTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtSnapshotArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDebtSnapshotsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DebtSnapshot_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DebtSnapshot_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeEntryAppendedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeEntryAppendedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeEntryAppended_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeEntryAppended_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeEntrySettledArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeEntrySettledsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeEntrySettled_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeEntrySettled_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangePartnerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangePartnersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangePartner_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangePartner_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeRebateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeRebatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeRebate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeRebate_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeReclaimArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangeReclaimsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeReclaim_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeReclaim_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Exchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Exchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Exchange_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionFeesClaimedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionFeesClaimedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FeesClaimed_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FeesClaimed_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionFifteenMinuteExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionFifteenMinuteExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FifteenMinuteExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionFifteenMinuteSnxPriceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionFifteenMinuteSnxPricesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteSnxPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FifteenMinuteSnxPrice_Filter>;
};


export type SubscriptionFifteenMinuteTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionFifteenMinuteTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FifteenMinuteTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FifteenMinuteTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionHistoricalOptionPriceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionHistoricalOptionPricesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HistoricalOptionPrice_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<HistoricalOptionPrice_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionIssuedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionIssuedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Issued_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Issued_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionIssuerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionIssuersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Issuer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Issuer_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionLatestRateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionLatestRatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LatestRate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LatestRate_Filter>;
};


export type SubscriptionLoanArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanPartiallyLiquidatedArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanPartiallyLiquidatedsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanPartiallyLiquidated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanPartiallyLiquidated_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanRepaidArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoanRepaidsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LoanRepaid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<LoanRepaid_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionLoansArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Loan_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Loan_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionMarketArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionMarketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionOptionTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionOptionTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<OptionTransaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<OptionTransaction_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPostArchernarExchangerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPostArchernarExchangersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostArchernarExchanger_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostArchernarExchanger_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionPostArchernarTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPostArchernarTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostArchernarTotal_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostArchernarTotal_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionRateUpdateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionRateUpdatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RateUpdate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RateUpdate_Filter>;
};


export type SubscriptionRatesUpdatedArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionRatesUpdatedsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RatesUpdated_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<RatesUpdated_Filter>;
};


export type SubscriptionRewardEscrowHolderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionRewardEscrowHoldersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RewardEscrowHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<RewardEscrowHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionSnxholderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionSnxholdersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SnxHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SnxHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SynthExchange_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SynthExchange_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthHolderArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthHoldersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SynthHolder_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SynthHolder_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthetixArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionSynthetixesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Synthetix_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Synthetix_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionTemporaryExchangePartnerTrackerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionTemporaryExchangePartnerTrackersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TemporaryExchangePartnerTracker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TemporaryExchangePartnerTracker_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TotalActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TotalActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalDailyActiveStakerArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalDailyActiveStakersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TotalDailyActiveStaker_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TotalDailyActiveStaker_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionTotalsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Total_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Total_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionTransferArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionTransfersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transfer_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transfer_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionUserActionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionUserActionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserAction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserAction_Filter>;
  block?: Maybe<Block_Height>;
};

export type SynthHolder = {
  __typename?: 'SynthHolder';
  id: Scalars['ID'];
  synth: Scalars['String'];
  balanceOf: Scalars['BigInt'];
};

export type SynthHolder_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  synth?: Maybe<Scalars['String']>;
  synth_not?: Maybe<Scalars['String']>;
  synth_gt?: Maybe<Scalars['String']>;
  synth_lt?: Maybe<Scalars['String']>;
  synth_gte?: Maybe<Scalars['String']>;
  synth_lte?: Maybe<Scalars['String']>;
  synth_in?: Maybe<Array<Scalars['String']>>;
  synth_not_in?: Maybe<Array<Scalars['String']>>;
  synth_contains?: Maybe<Scalars['String']>;
  synth_not_contains?: Maybe<Scalars['String']>;
  synth_starts_with?: Maybe<Scalars['String']>;
  synth_not_starts_with?: Maybe<Scalars['String']>;
  synth_ends_with?: Maybe<Scalars['String']>;
  synth_not_ends_with?: Maybe<Scalars['String']>;
  balanceOf?: Maybe<Scalars['BigInt']>;
  balanceOf_not?: Maybe<Scalars['BigInt']>;
  balanceOf_gt?: Maybe<Scalars['BigInt']>;
  balanceOf_lt?: Maybe<Scalars['BigInt']>;
  balanceOf_gte?: Maybe<Scalars['BigInt']>;
  balanceOf_lte?: Maybe<Scalars['BigInt']>;
  balanceOf_in?: Maybe<Array<Scalars['BigInt']>>;
  balanceOf_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum SynthHolder_OrderBy {
  Id = 'id',
  Synth = 'synth',
  BalanceOf = 'balanceOf'
}

export type Synthetix = {
  __typename?: 'Synthetix';
  id: Scalars['ID'];
  issuers: Scalars['BigInt'];
  snxHolders: Scalars['BigInt'];
};

export type Synthetix_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  issuers?: Maybe<Scalars['BigInt']>;
  issuers_not?: Maybe<Scalars['BigInt']>;
  issuers_gt?: Maybe<Scalars['BigInt']>;
  issuers_lt?: Maybe<Scalars['BigInt']>;
  issuers_gte?: Maybe<Scalars['BigInt']>;
  issuers_lte?: Maybe<Scalars['BigInt']>;
  issuers_in?: Maybe<Array<Scalars['BigInt']>>;
  issuers_not_in?: Maybe<Array<Scalars['BigInt']>>;
  snxHolders?: Maybe<Scalars['BigInt']>;
  snxHolders_not?: Maybe<Scalars['BigInt']>;
  snxHolders_gt?: Maybe<Scalars['BigInt']>;
  snxHolders_lt?: Maybe<Scalars['BigInt']>;
  snxHolders_gte?: Maybe<Scalars['BigInt']>;
  snxHolders_lte?: Maybe<Scalars['BigInt']>;
  snxHolders_in?: Maybe<Array<Scalars['BigInt']>>;
  snxHolders_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Synthetix_OrderBy {
  Id = 'id',
  Issuers = 'issuers',
  SnxHolders = 'snxHolders'
}

export type TotalActiveStaker = {
  __typename?: 'TotalActiveStaker';
  id: Scalars['ID'];
  count: Scalars['BigInt'];
};

export type TotalActiveStaker_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  count?: Maybe<Scalars['BigInt']>;
  count_not?: Maybe<Scalars['BigInt']>;
  count_gt?: Maybe<Scalars['BigInt']>;
  count_lt?: Maybe<Scalars['BigInt']>;
  count_gte?: Maybe<Scalars['BigInt']>;
  count_lte?: Maybe<Scalars['BigInt']>;
  count_in?: Maybe<Array<Scalars['BigInt']>>;
  count_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum TotalActiveStaker_OrderBy {
  Id = 'id',
  Count = 'count'
}

export type TotalDailyActiveStaker = {
  __typename?: 'TotalDailyActiveStaker';
  id: Scalars['ID'];
  count: Scalars['BigInt'];
};

export type TotalDailyActiveStaker_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  count?: Maybe<Scalars['BigInt']>;
  count_not?: Maybe<Scalars['BigInt']>;
  count_gt?: Maybe<Scalars['BigInt']>;
  count_lt?: Maybe<Scalars['BigInt']>;
  count_gte?: Maybe<Scalars['BigInt']>;
  count_lte?: Maybe<Scalars['BigInt']>;
  count_in?: Maybe<Array<Scalars['BigInt']>>;
  count_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum TotalDailyActiveStaker_OrderBy {
  Id = 'id',
  Count = 'count'
}

export type Transfer = {
  __typename?: 'Transfer';
  id: Scalars['ID'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  value: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
  source: Scalars['String'];
};

export type Transfer_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  to?: Maybe<Scalars['Bytes']>;
  to_not?: Maybe<Scalars['Bytes']>;
  to_in?: Maybe<Array<Scalars['Bytes']>>;
  to_not_in?: Maybe<Array<Scalars['Bytes']>>;
  to_contains?: Maybe<Scalars['Bytes']>;
  to_not_contains?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  source?: Maybe<Scalars['String']>;
  source_not?: Maybe<Scalars['String']>;
  source_gt?: Maybe<Scalars['String']>;
  source_lt?: Maybe<Scalars['String']>;
  source_gte?: Maybe<Scalars['String']>;
  source_lte?: Maybe<Scalars['String']>;
  source_in?: Maybe<Array<Scalars['String']>>;
  source_not_in?: Maybe<Array<Scalars['String']>>;
  source_contains?: Maybe<Scalars['String']>;
  source_not_contains?: Maybe<Scalars['String']>;
  source_starts_with?: Maybe<Scalars['String']>;
  source_not_starts_with?: Maybe<Scalars['String']>;
  source_ends_with?: Maybe<Scalars['String']>;
  source_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Transfer_OrderBy {
  Id = 'id',
  From = 'from',
  To = 'to',
  Value = 'value',
  Timestamp = 'timestamp',
  Block = 'block',
  Source = 'source'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
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

export type HistoricalOptionPrice = {
  __typename?: 'HistoricalOptionPrice';
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  longPrice: Scalars['BigInt'];
  shortPrice: Scalars['BigInt'];
  market: Scalars['Bytes'];
  poolSize: Scalars['BigInt'];
};

export type HistoricalOptionPrice_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  longPrice?: Maybe<Scalars['BigInt']>;
  longPrice_not?: Maybe<Scalars['BigInt']>;
  longPrice_gt?: Maybe<Scalars['BigInt']>;
  longPrice_lt?: Maybe<Scalars['BigInt']>;
  longPrice_gte?: Maybe<Scalars['BigInt']>;
  longPrice_lte?: Maybe<Scalars['BigInt']>;
  longPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  longPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shortPrice?: Maybe<Scalars['BigInt']>;
  shortPrice_not?: Maybe<Scalars['BigInt']>;
  shortPrice_gt?: Maybe<Scalars['BigInt']>;
  shortPrice_lt?: Maybe<Scalars['BigInt']>;
  shortPrice_gte?: Maybe<Scalars['BigInt']>;
  shortPrice_lte?: Maybe<Scalars['BigInt']>;
  shortPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  shortPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  market?: Maybe<Scalars['Bytes']>;
  market_not?: Maybe<Scalars['Bytes']>;
  market_in?: Maybe<Array<Scalars['Bytes']>>;
  market_not_in?: Maybe<Array<Scalars['Bytes']>>;
  market_contains?: Maybe<Scalars['Bytes']>;
  market_not_contains?: Maybe<Scalars['Bytes']>;
  poolSize?: Maybe<Scalars['BigInt']>;
  poolSize_not?: Maybe<Scalars['BigInt']>;
  poolSize_gt?: Maybe<Scalars['BigInt']>;
  poolSize_lt?: Maybe<Scalars['BigInt']>;
  poolSize_gte?: Maybe<Scalars['BigInt']>;
  poolSize_lte?: Maybe<Scalars['BigInt']>;
  poolSize_in?: Maybe<Array<Scalars['BigInt']>>;
  poolSize_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum HistoricalOptionPrice_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  LongPrice = 'longPrice',
  ShortPrice = 'shortPrice',
  Market = 'market',
  PoolSize = 'poolSize'
}

export type Market = {
  __typename?: 'Market';
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  creator: Scalars['Bytes'];
  currencyKey: Scalars['Bytes'];
  strikePrice: Scalars['BigInt'];
  biddingEndDate: Scalars['BigInt'];
  maturityDate: Scalars['BigInt'];
  expiryDate: Scalars['BigInt'];
  isOpen: Scalars['Boolean'];
  longPrice: Scalars['BigInt'];
  shortPrice: Scalars['BigInt'];
  poolSize: Scalars['BigInt'];
  result?: Maybe<Scalars['Int']>;
};

export type Market_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  creator?: Maybe<Scalars['Bytes']>;
  creator_not?: Maybe<Scalars['Bytes']>;
  creator_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  creator_contains?: Maybe<Scalars['Bytes']>;
  creator_not_contains?: Maybe<Scalars['Bytes']>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  strikePrice?: Maybe<Scalars['BigInt']>;
  strikePrice_not?: Maybe<Scalars['BigInt']>;
  strikePrice_gt?: Maybe<Scalars['BigInt']>;
  strikePrice_lt?: Maybe<Scalars['BigInt']>;
  strikePrice_gte?: Maybe<Scalars['BigInt']>;
  strikePrice_lte?: Maybe<Scalars['BigInt']>;
  strikePrice_in?: Maybe<Array<Scalars['BigInt']>>;
  strikePrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  biddingEndDate?: Maybe<Scalars['BigInt']>;
  biddingEndDate_not?: Maybe<Scalars['BigInt']>;
  biddingEndDate_gt?: Maybe<Scalars['BigInt']>;
  biddingEndDate_lt?: Maybe<Scalars['BigInt']>;
  biddingEndDate_gte?: Maybe<Scalars['BigInt']>;
  biddingEndDate_lte?: Maybe<Scalars['BigInt']>;
  biddingEndDate_in?: Maybe<Array<Scalars['BigInt']>>;
  biddingEndDate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maturityDate?: Maybe<Scalars['BigInt']>;
  maturityDate_not?: Maybe<Scalars['BigInt']>;
  maturityDate_gt?: Maybe<Scalars['BigInt']>;
  maturityDate_lt?: Maybe<Scalars['BigInt']>;
  maturityDate_gte?: Maybe<Scalars['BigInt']>;
  maturityDate_lte?: Maybe<Scalars['BigInt']>;
  maturityDate_in?: Maybe<Array<Scalars['BigInt']>>;
  maturityDate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  expiryDate?: Maybe<Scalars['BigInt']>;
  expiryDate_not?: Maybe<Scalars['BigInt']>;
  expiryDate_gt?: Maybe<Scalars['BigInt']>;
  expiryDate_lt?: Maybe<Scalars['BigInt']>;
  expiryDate_gte?: Maybe<Scalars['BigInt']>;
  expiryDate_lte?: Maybe<Scalars['BigInt']>;
  expiryDate_in?: Maybe<Array<Scalars['BigInt']>>;
  expiryDate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isOpen?: Maybe<Scalars['Boolean']>;
  isOpen_not?: Maybe<Scalars['Boolean']>;
  isOpen_in?: Maybe<Array<Scalars['Boolean']>>;
  isOpen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  longPrice?: Maybe<Scalars['BigInt']>;
  longPrice_not?: Maybe<Scalars['BigInt']>;
  longPrice_gt?: Maybe<Scalars['BigInt']>;
  longPrice_lt?: Maybe<Scalars['BigInt']>;
  longPrice_gte?: Maybe<Scalars['BigInt']>;
  longPrice_lte?: Maybe<Scalars['BigInt']>;
  longPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  longPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shortPrice?: Maybe<Scalars['BigInt']>;
  shortPrice_not?: Maybe<Scalars['BigInt']>;
  shortPrice_gt?: Maybe<Scalars['BigInt']>;
  shortPrice_lt?: Maybe<Scalars['BigInt']>;
  shortPrice_gte?: Maybe<Scalars['BigInt']>;
  shortPrice_lte?: Maybe<Scalars['BigInt']>;
  shortPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  shortPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  poolSize?: Maybe<Scalars['BigInt']>;
  poolSize_not?: Maybe<Scalars['BigInt']>;
  poolSize_gt?: Maybe<Scalars['BigInt']>;
  poolSize_lt?: Maybe<Scalars['BigInt']>;
  poolSize_gte?: Maybe<Scalars['BigInt']>;
  poolSize_lte?: Maybe<Scalars['BigInt']>;
  poolSize_in?: Maybe<Array<Scalars['BigInt']>>;
  poolSize_not_in?: Maybe<Array<Scalars['BigInt']>>;
  result?: Maybe<Scalars['Int']>;
  result_not?: Maybe<Scalars['Int']>;
  result_gt?: Maybe<Scalars['Int']>;
  result_lt?: Maybe<Scalars['Int']>;
  result_gte?: Maybe<Scalars['Int']>;
  result_lte?: Maybe<Scalars['Int']>;
  result_in?: Maybe<Array<Scalars['Int']>>;
  result_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum Market_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Creator = 'creator',
  CurrencyKey = 'currencyKey',
  StrikePrice = 'strikePrice',
  BiddingEndDate = 'biddingEndDate',
  MaturityDate = 'maturityDate',
  ExpiryDate = 'expiryDate',
  IsOpen = 'isOpen',
  LongPrice = 'longPrice',
  ShortPrice = 'shortPrice',
  PoolSize = 'poolSize',
  Result = 'result'
}

export type OptionTransaction = {
  __typename?: 'OptionTransaction';
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  type: OptionTransactionType;
  account: Scalars['Bytes'];
  market: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  currencyKey?: Maybe<Scalars['Bytes']>;
  side?: Maybe<Scalars['Int']>;
  fee?: Maybe<Scalars['BigInt']>;
};

export enum OptionTransactionType {
  Bid = 'bid',
  Refund = 'refund',
  Claim = 'claim',
  Exercise = 'exercise'
}

export type OptionTransaction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  type?: Maybe<OptionTransactionType>;
  type_not?: Maybe<OptionTransactionType>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  market?: Maybe<Scalars['Bytes']>;
  market_not?: Maybe<Scalars['Bytes']>;
  market_in?: Maybe<Array<Scalars['Bytes']>>;
  market_not_in?: Maybe<Array<Scalars['Bytes']>>;
  market_contains?: Maybe<Scalars['Bytes']>;
  market_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  side?: Maybe<Scalars['Int']>;
  side_not?: Maybe<Scalars['Int']>;
  side_gt?: Maybe<Scalars['Int']>;
  side_lt?: Maybe<Scalars['Int']>;
  side_gte?: Maybe<Scalars['Int']>;
  side_lte?: Maybe<Scalars['Int']>;
  side_in?: Maybe<Array<Scalars['Int']>>;
  side_not_in?: Maybe<Array<Scalars['Int']>>;
  fee?: Maybe<Scalars['BigInt']>;
  fee_not?: Maybe<Scalars['BigInt']>;
  fee_gt?: Maybe<Scalars['BigInt']>;
  fee_lt?: Maybe<Scalars['BigInt']>;
  fee_gte?: Maybe<Scalars['BigInt']>;
  fee_lte?: Maybe<Scalars['BigInt']>;
  fee_in?: Maybe<Array<Scalars['BigInt']>>;
  fee_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum OptionTransaction_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Type = 'type',
  Account = 'account',
  Market = 'market',
  Amount = 'amount',
  CurrencyKey = 'currencyKey',
  Side = 'side',
  Fee = 'fee'
}

export type ClearedDeposit = {
  __typename?: 'ClearedDeposit';
  id: Scalars['ID'];
  fromAddress: Scalars['Bytes'];
  toAddress: Scalars['Bytes'];
  fromETHAmount: Scalars['BigInt'];
  toAmount: Scalars['BigInt'];
  depositIndex: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  network: Scalars['String'];
};

export type ClearedDeposit_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fromAddress?: Maybe<Scalars['Bytes']>;
  fromAddress_not?: Maybe<Scalars['Bytes']>;
  fromAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  fromAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  fromAddress_contains?: Maybe<Scalars['Bytes']>;
  fromAddress_not_contains?: Maybe<Scalars['Bytes']>;
  toAddress?: Maybe<Scalars['Bytes']>;
  toAddress_not?: Maybe<Scalars['Bytes']>;
  toAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: Maybe<Scalars['Bytes']>;
  toAddress_not_contains?: Maybe<Scalars['Bytes']>;
  fromETHAmount?: Maybe<Scalars['BigInt']>;
  fromETHAmount_not?: Maybe<Scalars['BigInt']>;
  fromETHAmount_gt?: Maybe<Scalars['BigInt']>;
  fromETHAmount_lt?: Maybe<Scalars['BigInt']>;
  fromETHAmount_gte?: Maybe<Scalars['BigInt']>;
  fromETHAmount_lte?: Maybe<Scalars['BigInt']>;
  fromETHAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  fromETHAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmount?: Maybe<Scalars['BigInt']>;
  toAmount_not?: Maybe<Scalars['BigInt']>;
  toAmount_gt?: Maybe<Scalars['BigInt']>;
  toAmount_lt?: Maybe<Scalars['BigInt']>;
  toAmount_gte?: Maybe<Scalars['BigInt']>;
  toAmount_lte?: Maybe<Scalars['BigInt']>;
  toAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  depositIndex?: Maybe<Scalars['BigInt']>;
  depositIndex_not?: Maybe<Scalars['BigInt']>;
  depositIndex_gt?: Maybe<Scalars['BigInt']>;
  depositIndex_lt?: Maybe<Scalars['BigInt']>;
  depositIndex_gte?: Maybe<Scalars['BigInt']>;
  depositIndex_lte?: Maybe<Scalars['BigInt']>;
  depositIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  depositIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  network?: Maybe<Scalars['String']>;
  network_not?: Maybe<Scalars['String']>;
  network_gt?: Maybe<Scalars['String']>;
  network_lt?: Maybe<Scalars['String']>;
  network_gte?: Maybe<Scalars['String']>;
  network_lte?: Maybe<Scalars['String']>;
  network_in?: Maybe<Array<Scalars['String']>>;
  network_not_in?: Maybe<Array<Scalars['String']>>;
  network_contains?: Maybe<Scalars['String']>;
  network_not_contains?: Maybe<Scalars['String']>;
  network_starts_with?: Maybe<Scalars['String']>;
  network_not_starts_with?: Maybe<Scalars['String']>;
  network_ends_with?: Maybe<Scalars['String']>;
  network_not_ends_with?: Maybe<Scalars['String']>;
};

export enum ClearedDeposit_OrderBy {
  Id = 'id',
  FromAddress = 'fromAddress',
  ToAddress = 'toAddress',
  FromEthAmount = 'fromETHAmount',
  ToAmount = 'toAmount',
  DepositIndex = 'depositIndex',
  Block = 'block',
  Timestamp = 'timestamp',
  Network = 'network'
}

export type Exchange = {
  __typename?: 'Exchange';
  id: Scalars['ID'];
  from: Scalars['Bytes'];
  fromCurrency: Scalars['String'];
  fromAmount: Scalars['BigInt'];
  toCurrency: Scalars['String'];
  toAmount: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  network: Scalars['String'];
};

export type Exchange_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  fromCurrency?: Maybe<Scalars['String']>;
  fromCurrency_not?: Maybe<Scalars['String']>;
  fromCurrency_gt?: Maybe<Scalars['String']>;
  fromCurrency_lt?: Maybe<Scalars['String']>;
  fromCurrency_gte?: Maybe<Scalars['String']>;
  fromCurrency_lte?: Maybe<Scalars['String']>;
  fromCurrency_in?: Maybe<Array<Scalars['String']>>;
  fromCurrency_not_in?: Maybe<Array<Scalars['String']>>;
  fromCurrency_contains?: Maybe<Scalars['String']>;
  fromCurrency_not_contains?: Maybe<Scalars['String']>;
  fromCurrency_starts_with?: Maybe<Scalars['String']>;
  fromCurrency_not_starts_with?: Maybe<Scalars['String']>;
  fromCurrency_ends_with?: Maybe<Scalars['String']>;
  fromCurrency_not_ends_with?: Maybe<Scalars['String']>;
  fromAmount?: Maybe<Scalars['BigInt']>;
  fromAmount_not?: Maybe<Scalars['BigInt']>;
  fromAmount_gt?: Maybe<Scalars['BigInt']>;
  fromAmount_lt?: Maybe<Scalars['BigInt']>;
  fromAmount_gte?: Maybe<Scalars['BigInt']>;
  fromAmount_lte?: Maybe<Scalars['BigInt']>;
  fromAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  toCurrency?: Maybe<Scalars['String']>;
  toCurrency_not?: Maybe<Scalars['String']>;
  toCurrency_gt?: Maybe<Scalars['String']>;
  toCurrency_lt?: Maybe<Scalars['String']>;
  toCurrency_gte?: Maybe<Scalars['String']>;
  toCurrency_lte?: Maybe<Scalars['String']>;
  toCurrency_in?: Maybe<Array<Scalars['String']>>;
  toCurrency_not_in?: Maybe<Array<Scalars['String']>>;
  toCurrency_contains?: Maybe<Scalars['String']>;
  toCurrency_not_contains?: Maybe<Scalars['String']>;
  toCurrency_starts_with?: Maybe<Scalars['String']>;
  toCurrency_not_starts_with?: Maybe<Scalars['String']>;
  toCurrency_ends_with?: Maybe<Scalars['String']>;
  toCurrency_not_ends_with?: Maybe<Scalars['String']>;
  toAmount?: Maybe<Scalars['BigInt']>;
  toAmount_not?: Maybe<Scalars['BigInt']>;
  toAmount_gt?: Maybe<Scalars['BigInt']>;
  toAmount_lt?: Maybe<Scalars['BigInt']>;
  toAmount_gte?: Maybe<Scalars['BigInt']>;
  toAmount_lte?: Maybe<Scalars['BigInt']>;
  toAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  network?: Maybe<Scalars['String']>;
  network_not?: Maybe<Scalars['String']>;
  network_gt?: Maybe<Scalars['String']>;
  network_lt?: Maybe<Scalars['String']>;
  network_gte?: Maybe<Scalars['String']>;
  network_lte?: Maybe<Scalars['String']>;
  network_in?: Maybe<Array<Scalars['String']>>;
  network_not_in?: Maybe<Array<Scalars['String']>>;
  network_contains?: Maybe<Scalars['String']>;
  network_not_contains?: Maybe<Scalars['String']>;
  network_starts_with?: Maybe<Scalars['String']>;
  network_not_starts_with?: Maybe<Scalars['String']>;
  network_ends_with?: Maybe<Scalars['String']>;
  network_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Exchange_OrderBy {
  Id = 'id',
  From = 'from',
  FromCurrency = 'fromCurrency',
  FromAmount = 'fromAmount',
  ToCurrency = 'toCurrency',
  ToAmount = 'toAmount',
  Block = 'block',
  Timestamp = 'timestamp',
  Network = 'network'
}

export type UserAction = {
  __typename?: 'UserAction';
  id: Scalars['ID'];
  user: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  type: Scalars['String'];
  depositIndex?: Maybe<Scalars['BigInt']>;
  minimum?: Maybe<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  network: Scalars['String'];
};

export type UserAction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  user?: Maybe<Scalars['Bytes']>;
  user_not?: Maybe<Scalars['Bytes']>;
  user_in?: Maybe<Array<Scalars['Bytes']>>;
  user_not_in?: Maybe<Array<Scalars['Bytes']>>;
  user_contains?: Maybe<Scalars['Bytes']>;
  user_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_gt?: Maybe<Scalars['String']>;
  type_lt?: Maybe<Scalars['String']>;
  type_gte?: Maybe<Scalars['String']>;
  type_lte?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  depositIndex?: Maybe<Scalars['BigInt']>;
  depositIndex_not?: Maybe<Scalars['BigInt']>;
  depositIndex_gt?: Maybe<Scalars['BigInt']>;
  depositIndex_lt?: Maybe<Scalars['BigInt']>;
  depositIndex_gte?: Maybe<Scalars['BigInt']>;
  depositIndex_lte?: Maybe<Scalars['BigInt']>;
  depositIndex_in?: Maybe<Array<Scalars['BigInt']>>;
  depositIndex_not_in?: Maybe<Array<Scalars['BigInt']>>;
  minimum?: Maybe<Scalars['BigInt']>;
  minimum_not?: Maybe<Scalars['BigInt']>;
  minimum_gt?: Maybe<Scalars['BigInt']>;
  minimum_lt?: Maybe<Scalars['BigInt']>;
  minimum_gte?: Maybe<Scalars['BigInt']>;
  minimum_lte?: Maybe<Scalars['BigInt']>;
  minimum_in?: Maybe<Array<Scalars['BigInt']>>;
  minimum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  network?: Maybe<Scalars['String']>;
  network_not?: Maybe<Scalars['String']>;
  network_gt?: Maybe<Scalars['String']>;
  network_lt?: Maybe<Scalars['String']>;
  network_gte?: Maybe<Scalars['String']>;
  network_lte?: Maybe<Scalars['String']>;
  network_in?: Maybe<Array<Scalars['String']>>;
  network_not_in?: Maybe<Array<Scalars['String']>>;
  network_contains?: Maybe<Scalars['String']>;
  network_not_contains?: Maybe<Scalars['String']>;
  network_starts_with?: Maybe<Scalars['String']>;
  network_not_starts_with?: Maybe<Scalars['String']>;
  network_ends_with?: Maybe<Scalars['String']>;
  network_not_ends_with?: Maybe<Scalars['String']>;
};

export enum UserAction_OrderBy {
  Id = 'id',
  User = 'user',
  Amount = 'amount',
  Type = 'type',
  DepositIndex = 'depositIndex',
  Minimum = 'minimum',
  Block = 'block',
  Timestamp = 'timestamp',
  Network = 'network'
}

export type AggregatorAnswer = {
  __typename?: 'AggregatorAnswer';
  aggregator: Scalars['Bytes'];
  block: Scalars['BigInt'];
  currencyKey: Scalars['Bytes'];
  id: Scalars['ID'];
  rate: Scalars['BigInt'];
  roundId: Scalars['BigInt'];
  synth: Scalars['String'];
  timestamp: Scalars['BigInt'];
};

export type AggregatorAnswer_Filter = {
  aggregator?: Maybe<Scalars['Bytes']>;
  aggregator_contains?: Maybe<Scalars['Bytes']>;
  aggregator_in?: Maybe<Array<Scalars['Bytes']>>;
  aggregator_not?: Maybe<Scalars['Bytes']>;
  aggregator_not_contains?: Maybe<Scalars['Bytes']>;
  aggregator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rate?: Maybe<Scalars['BigInt']>;
  rate_gt?: Maybe<Scalars['BigInt']>;
  rate_gte?: Maybe<Scalars['BigInt']>;
  rate_in?: Maybe<Array<Scalars['BigInt']>>;
  rate_lt?: Maybe<Scalars['BigInt']>;
  rate_lte?: Maybe<Scalars['BigInt']>;
  rate_not?: Maybe<Scalars['BigInt']>;
  rate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  roundId?: Maybe<Scalars['BigInt']>;
  roundId_gt?: Maybe<Scalars['BigInt']>;
  roundId_gte?: Maybe<Scalars['BigInt']>;
  roundId_in?: Maybe<Array<Scalars['BigInt']>>;
  roundId_lt?: Maybe<Scalars['BigInt']>;
  roundId_lte?: Maybe<Scalars['BigInt']>;
  roundId_not?: Maybe<Scalars['BigInt']>;
  roundId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  synth?: Maybe<Scalars['String']>;
  synth_contains?: Maybe<Scalars['String']>;
  synth_ends_with?: Maybe<Scalars['String']>;
  synth_gt?: Maybe<Scalars['String']>;
  synth_gte?: Maybe<Scalars['String']>;
  synth_in?: Maybe<Array<Scalars['String']>>;
  synth_lt?: Maybe<Scalars['String']>;
  synth_lte?: Maybe<Scalars['String']>;
  synth_not?: Maybe<Scalars['String']>;
  synth_not_contains?: Maybe<Scalars['String']>;
  synth_not_ends_with?: Maybe<Scalars['String']>;
  synth_not_in?: Maybe<Array<Scalars['String']>>;
  synth_not_starts_with?: Maybe<Scalars['String']>;
  synth_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AggregatorAnswer_OrderBy {
  Aggregator = 'aggregator',
  Block = 'block',
  CurrencyKey = 'currencyKey',
  Id = 'id',
  Rate = 'rate',
  RoundId = 'roundId',
  Synth = 'synth',
  Timestamp = 'timestamp'
}

export type DailyExchangePartner = {
  __typename?: 'DailyExchangePartner';
  /**  Day timestamp + tracking code of the partner  */
  id: Scalars['ID'];
  /**  Total transaction volume in USD for the partner on this day  */
  usdVolume: Scalars['BigDecimal'];
  /**  Total fees generated by the volume partner for this day  */
  usdFees: Scalars['BigDecimal'];
  /**  Total number of trades from the volume partner for this day  */
  trades: Scalars['BigInt'];
  /**  Tracking code of the partner  */
  partner: Scalars['String'];
  /**  a string id representing the day  */
  dayID: Scalars['String'];
};

export type DailyExchangePartner_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  usdVolume?: Maybe<Scalars['BigDecimal']>;
  usdVolume_not?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdVolume_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees?: Maybe<Scalars['BigDecimal']>;
  usdFees_not?: Maybe<Scalars['BigDecimal']>;
  usdFees_gt?: Maybe<Scalars['BigDecimal']>;
  usdFees_lt?: Maybe<Scalars['BigDecimal']>;
  usdFees_gte?: Maybe<Scalars['BigDecimal']>;
  usdFees_lte?: Maybe<Scalars['BigDecimal']>;
  usdFees_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
  partner?: Maybe<Scalars['String']>;
  partner_not?: Maybe<Scalars['String']>;
  partner_gt?: Maybe<Scalars['String']>;
  partner_lt?: Maybe<Scalars['String']>;
  partner_gte?: Maybe<Scalars['String']>;
  partner_lte?: Maybe<Scalars['String']>;
  partner_in?: Maybe<Array<Scalars['String']>>;
  partner_not_in?: Maybe<Array<Scalars['String']>>;
  partner_contains?: Maybe<Scalars['String']>;
  partner_not_contains?: Maybe<Scalars['String']>;
  partner_starts_with?: Maybe<Scalars['String']>;
  partner_not_starts_with?: Maybe<Scalars['String']>;
  partner_ends_with?: Maybe<Scalars['String']>;
  partner_not_ends_with?: Maybe<Scalars['String']>;
  dayID?: Maybe<Scalars['String']>;
  dayID_not?: Maybe<Scalars['String']>;
  dayID_gt?: Maybe<Scalars['String']>;
  dayID_lt?: Maybe<Scalars['String']>;
  dayID_gte?: Maybe<Scalars['String']>;
  dayID_lte?: Maybe<Scalars['String']>;
  dayID_in?: Maybe<Array<Scalars['String']>>;
  dayID_not_in?: Maybe<Array<Scalars['String']>>;
  dayID_contains?: Maybe<Scalars['String']>;
  dayID_not_contains?: Maybe<Scalars['String']>;
  dayID_starts_with?: Maybe<Scalars['String']>;
  dayID_not_starts_with?: Maybe<Scalars['String']>;
  dayID_ends_with?: Maybe<Scalars['String']>;
  dayID_not_ends_with?: Maybe<Scalars['String']>;
};

export enum DailyExchangePartner_OrderBy {
  Id = 'id',
  UsdVolume = 'usdVolume',
  UsdFees = 'usdFees',
  Trades = 'trades',
  Partner = 'partner',
  DayId = 'dayID'
}

export type DailySnxPrice = {
  __typename?: 'DailySNXPrice';
  averagePrice: Scalars['BigInt'];
  count: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type DailySnxPrice_Filter = {
  averagePrice?: Maybe<Scalars['BigInt']>;
  averagePrice_gt?: Maybe<Scalars['BigInt']>;
  averagePrice_gte?: Maybe<Scalars['BigInt']>;
  averagePrice_in?: Maybe<Array<Scalars['BigInt']>>;
  averagePrice_lt?: Maybe<Scalars['BigInt']>;
  averagePrice_lte?: Maybe<Scalars['BigInt']>;
  averagePrice_not?: Maybe<Scalars['BigInt']>;
  averagePrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  count?: Maybe<Scalars['BigInt']>;
  count_gt?: Maybe<Scalars['BigInt']>;
  count_gte?: Maybe<Scalars['BigInt']>;
  count_in?: Maybe<Array<Scalars['BigInt']>>;
  count_lt?: Maybe<Scalars['BigInt']>;
  count_lte?: Maybe<Scalars['BigInt']>;
  count_not?: Maybe<Scalars['BigInt']>;
  count_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum DailySnxPrice_OrderBy {
  AveragePrice = 'averagePrice',
  Count = 'count',
  Id = 'id'
}

export type ExchangeEntryAppended = {
  __typename?: 'ExchangeEntryAppended';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  src: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  dest: Scalars['Bytes'];
  amountReceived: Scalars['BigInt'];
  exchangeFeeRate: Scalars['BigInt'];
  roundIdForSrc: Scalars['BigInt'];
  roundIdForDest: Scalars['BigInt'];
};

export type ExchangeEntryAppended_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  src?: Maybe<Scalars['Bytes']>;
  src_not?: Maybe<Scalars['Bytes']>;
  src_in?: Maybe<Array<Scalars['Bytes']>>;
  src_not_in?: Maybe<Array<Scalars['Bytes']>>;
  src_contains?: Maybe<Scalars['Bytes']>;
  src_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  dest?: Maybe<Scalars['Bytes']>;
  dest_not?: Maybe<Scalars['Bytes']>;
  dest_in?: Maybe<Array<Scalars['Bytes']>>;
  dest_not_in?: Maybe<Array<Scalars['Bytes']>>;
  dest_contains?: Maybe<Scalars['Bytes']>;
  dest_not_contains?: Maybe<Scalars['Bytes']>;
  amountReceived?: Maybe<Scalars['BigInt']>;
  amountReceived_not?: Maybe<Scalars['BigInt']>;
  amountReceived_gt?: Maybe<Scalars['BigInt']>;
  amountReceived_lt?: Maybe<Scalars['BigInt']>;
  amountReceived_gte?: Maybe<Scalars['BigInt']>;
  amountReceived_lte?: Maybe<Scalars['BigInt']>;
  amountReceived_in?: Maybe<Array<Scalars['BigInt']>>;
  amountReceived_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeFeeRate?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_not?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_gt?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_lt?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_gte?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_lte?: Maybe<Scalars['BigInt']>;
  exchangeFeeRate_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeFeeRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  roundIdForSrc?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_not?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_gt?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_lt?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_gte?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_lte?: Maybe<Scalars['BigInt']>;
  roundIdForSrc_in?: Maybe<Array<Scalars['BigInt']>>;
  roundIdForSrc_not_in?: Maybe<Array<Scalars['BigInt']>>;
  roundIdForDest?: Maybe<Scalars['BigInt']>;
  roundIdForDest_not?: Maybe<Scalars['BigInt']>;
  roundIdForDest_gt?: Maybe<Scalars['BigInt']>;
  roundIdForDest_lt?: Maybe<Scalars['BigInt']>;
  roundIdForDest_gte?: Maybe<Scalars['BigInt']>;
  roundIdForDest_lte?: Maybe<Scalars['BigInt']>;
  roundIdForDest_in?: Maybe<Array<Scalars['BigInt']>>;
  roundIdForDest_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeEntryAppended_OrderBy {
  Id = 'id',
  Account = 'account',
  Src = 'src',
  Amount = 'amount',
  Dest = 'dest',
  AmountReceived = 'amountReceived',
  ExchangeFeeRate = 'exchangeFeeRate',
  RoundIdForSrc = 'roundIdForSrc',
  RoundIdForDest = 'roundIdForDest'
}

export type ExchangeEntrySettled = {
  __typename?: 'ExchangeEntrySettled';
  id: Scalars['ID'];
  from: Scalars['Bytes'];
  src: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  dest: Scalars['Bytes'];
  reclaim: Scalars['BigInt'];
  rebate: Scalars['BigInt'];
  srcRoundIdAtPeriodEnd: Scalars['BigInt'];
  destRoundIdAtPeriodEnd: Scalars['BigInt'];
  exchangeTimestamp: Scalars['BigInt'];
};

export type ExchangeEntrySettled_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  src?: Maybe<Scalars['Bytes']>;
  src_not?: Maybe<Scalars['Bytes']>;
  src_in?: Maybe<Array<Scalars['Bytes']>>;
  src_not_in?: Maybe<Array<Scalars['Bytes']>>;
  src_contains?: Maybe<Scalars['Bytes']>;
  src_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  dest?: Maybe<Scalars['Bytes']>;
  dest_not?: Maybe<Scalars['Bytes']>;
  dest_in?: Maybe<Array<Scalars['Bytes']>>;
  dest_not_in?: Maybe<Array<Scalars['Bytes']>>;
  dest_contains?: Maybe<Scalars['Bytes']>;
  dest_not_contains?: Maybe<Scalars['Bytes']>;
  reclaim?: Maybe<Scalars['BigInt']>;
  reclaim_not?: Maybe<Scalars['BigInt']>;
  reclaim_gt?: Maybe<Scalars['BigInt']>;
  reclaim_lt?: Maybe<Scalars['BigInt']>;
  reclaim_gte?: Maybe<Scalars['BigInt']>;
  reclaim_lte?: Maybe<Scalars['BigInt']>;
  reclaim_in?: Maybe<Array<Scalars['BigInt']>>;
  reclaim_not_in?: Maybe<Array<Scalars['BigInt']>>;
  rebate?: Maybe<Scalars['BigInt']>;
  rebate_not?: Maybe<Scalars['BigInt']>;
  rebate_gt?: Maybe<Scalars['BigInt']>;
  rebate_lt?: Maybe<Scalars['BigInt']>;
  rebate_gte?: Maybe<Scalars['BigInt']>;
  rebate_lte?: Maybe<Scalars['BigInt']>;
  rebate_in?: Maybe<Array<Scalars['BigInt']>>;
  rebate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  srcRoundIdAtPeriodEnd?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_not?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_gt?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_lt?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_gte?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_lte?: Maybe<Scalars['BigInt']>;
  srcRoundIdAtPeriodEnd_in?: Maybe<Array<Scalars['BigInt']>>;
  srcRoundIdAtPeriodEnd_not_in?: Maybe<Array<Scalars['BigInt']>>;
  destRoundIdAtPeriodEnd?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_not?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_gt?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_lt?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_gte?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_lte?: Maybe<Scalars['BigInt']>;
  destRoundIdAtPeriodEnd_in?: Maybe<Array<Scalars['BigInt']>>;
  destRoundIdAtPeriodEnd_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeTimestamp?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_not?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_gt?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_lt?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_gte?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_lte?: Maybe<Scalars['BigInt']>;
  exchangeTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeEntrySettled_OrderBy {
  Id = 'id',
  From = 'from',
  Src = 'src',
  Amount = 'amount',
  Dest = 'dest',
  Reclaim = 'reclaim',
  Rebate = 'rebate',
  SrcRoundIdAtPeriodEnd = 'srcRoundIdAtPeriodEnd',
  DestRoundIdAtPeriodEnd = 'destRoundIdAtPeriodEnd',
  ExchangeTimestamp = 'exchangeTimestamp'
}

export type ExchangePartner = {
  __typename?: 'ExchangePartner';
  /**  Tracking code of the partner  */
  id: Scalars['ID'];
  /**  Total transaction volume in USD for the partner  */
  usdVolume: Scalars['BigDecimal'];
  /**  Total fees generated by the volume partner  */
  usdFees: Scalars['BigDecimal'];
  /**  Total number of trades from the volume partner  */
  trades: Scalars['BigInt'];
};

export type ExchangePartner_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  usdVolume?: Maybe<Scalars['BigDecimal']>;
  usdVolume_not?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdVolume_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees?: Maybe<Scalars['BigDecimal']>;
  usdFees_not?: Maybe<Scalars['BigDecimal']>;
  usdFees_gt?: Maybe<Scalars['BigDecimal']>;
  usdFees_lt?: Maybe<Scalars['BigDecimal']>;
  usdFees_gte?: Maybe<Scalars['BigDecimal']>;
  usdFees_lte?: Maybe<Scalars['BigDecimal']>;
  usdFees_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExchangePartner_OrderBy {
  Id = 'id',
  UsdVolume = 'usdVolume',
  UsdFees = 'usdFees',
  Trades = 'trades'
}

export type FifteenMinuteSnxPrice = {
  __typename?: 'FifteenMinuteSNXPrice';
  averagePrice: Scalars['BigInt'];
  count: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type FifteenMinuteSnxPrice_Filter = {
  averagePrice?: Maybe<Scalars['BigInt']>;
  averagePrice_gt?: Maybe<Scalars['BigInt']>;
  averagePrice_gte?: Maybe<Scalars['BigInt']>;
  averagePrice_in?: Maybe<Array<Scalars['BigInt']>>;
  averagePrice_lt?: Maybe<Scalars['BigInt']>;
  averagePrice_lte?: Maybe<Scalars['BigInt']>;
  averagePrice_not?: Maybe<Scalars['BigInt']>;
  averagePrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  count?: Maybe<Scalars['BigInt']>;
  count_gt?: Maybe<Scalars['BigInt']>;
  count_gte?: Maybe<Scalars['BigInt']>;
  count_in?: Maybe<Array<Scalars['BigInt']>>;
  count_lt?: Maybe<Scalars['BigInt']>;
  count_lte?: Maybe<Scalars['BigInt']>;
  count_not?: Maybe<Scalars['BigInt']>;
  count_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum FifteenMinuteSnxPrice_OrderBy {
  AveragePrice = 'averagePrice',
  Count = 'count',
  Id = 'id'
}

export type LatestRate = {
  __typename?: 'LatestRate';
  /**  Name of synth. E.g. sUSD  */
  id: Scalars['ID'];
  /**  Synth USD rate with 18 decimals  */
  rate: Scalars['BigInt'];
};

export type LatestRate_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rate?: Maybe<Scalars['BigInt']>;
  rate_gt?: Maybe<Scalars['BigInt']>;
  rate_gte?: Maybe<Scalars['BigInt']>;
  rate_in?: Maybe<Array<Scalars['BigInt']>>;
  rate_lt?: Maybe<Scalars['BigInt']>;
  rate_lte?: Maybe<Scalars['BigInt']>;
  rate_not?: Maybe<Scalars['BigInt']>;
  rate_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum LatestRate_OrderBy {
  Id = 'id',
  Rate = 'rate'
}

export type RateUpdate = {
  __typename?: 'RateUpdate';
  block: Scalars['BigInt'];
  currencyKey: Scalars['Bytes'];
  id: Scalars['ID'];
  rate: Scalars['BigInt'];
  synth: Scalars['String'];
  timestamp: Scalars['BigInt'];
};

export type RateUpdate_Filter = {
  block?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  rate?: Maybe<Scalars['BigInt']>;
  rate_gt?: Maybe<Scalars['BigInt']>;
  rate_gte?: Maybe<Scalars['BigInt']>;
  rate_in?: Maybe<Array<Scalars['BigInt']>>;
  rate_lt?: Maybe<Scalars['BigInt']>;
  rate_lte?: Maybe<Scalars['BigInt']>;
  rate_not?: Maybe<Scalars['BigInt']>;
  rate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  synth?: Maybe<Scalars['String']>;
  synth_contains?: Maybe<Scalars['String']>;
  synth_ends_with?: Maybe<Scalars['String']>;
  synth_gt?: Maybe<Scalars['String']>;
  synth_gte?: Maybe<Scalars['String']>;
  synth_in?: Maybe<Array<Scalars['String']>>;
  synth_lt?: Maybe<Scalars['String']>;
  synth_lte?: Maybe<Scalars['String']>;
  synth_not?: Maybe<Scalars['String']>;
  synth_not_contains?: Maybe<Scalars['String']>;
  synth_not_ends_with?: Maybe<Scalars['String']>;
  synth_not_in?: Maybe<Array<Scalars['String']>>;
  synth_not_starts_with?: Maybe<Scalars['String']>;
  synth_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum RateUpdate_OrderBy {
  Block = 'block',
  CurrencyKey = 'currencyKey',
  Id = 'id',
  Rate = 'rate',
  Synth = 'synth',
  Timestamp = 'timestamp'
}

export type RatesUpdated = {
  __typename?: 'RatesUpdated';
  block: Scalars['BigInt'];
  currencyKeys: Array<Scalars['Bytes']>;
  from: Scalars['Bytes'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  newRates: Array<Scalars['BigInt']>;
  timestamp: Scalars['BigInt'];
};

export type RatesUpdated_Filter = {
  block?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currencyKeys?: Maybe<Array<Scalars['Bytes']>>;
  currencyKeys_contains?: Maybe<Array<Scalars['Bytes']>>;
  currencyKeys_not?: Maybe<Array<Scalars['Bytes']>>;
  currencyKeys_not_contains?: Maybe<Array<Scalars['Bytes']>>;
  from?: Maybe<Scalars['Bytes']>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  newRates?: Maybe<Array<Scalars['BigInt']>>;
  newRates_contains?: Maybe<Array<Scalars['BigInt']>>;
  newRates_not?: Maybe<Array<Scalars['BigInt']>>;
  newRates_not_contains?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum RatesUpdated_OrderBy {
  Block = 'block',
  CurrencyKeys = 'currencyKeys',
  From = 'from',
  GasPrice = 'gasPrice',
  Id = 'id',
  NewRates = 'newRates',
  Timestamp = 'timestamp'
}

export type TemporaryExchangePartnerTracker = {
  __typename?: 'TemporaryExchangePartnerTracker';
  /**  Transaction hash of the Exchange event  */
  id: Scalars['ID'];
  /**  Total transaction volume in USD across all ExchangeEntryAppended events in a single tx hash  */
  usdVolume?: Maybe<Scalars['BigDecimal']>;
  /**  Total fees from this transaction hash  */
  usdFees?: Maybe<Scalars['BigDecimal']>;
  /**  String format of the tracking code for a given partner  */
  partner?: Maybe<Scalars['String']>;
};

export type TemporaryExchangePartnerTracker_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  usdVolume?: Maybe<Scalars['BigDecimal']>;
  usdVolume_not?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lt?: Maybe<Scalars['BigDecimal']>;
  usdVolume_gte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_lte?: Maybe<Scalars['BigDecimal']>;
  usdVolume_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdVolume_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees?: Maybe<Scalars['BigDecimal']>;
  usdFees_not?: Maybe<Scalars['BigDecimal']>;
  usdFees_gt?: Maybe<Scalars['BigDecimal']>;
  usdFees_lt?: Maybe<Scalars['BigDecimal']>;
  usdFees_gte?: Maybe<Scalars['BigDecimal']>;
  usdFees_lte?: Maybe<Scalars['BigDecimal']>;
  usdFees_in?: Maybe<Array<Scalars['BigDecimal']>>;
  usdFees_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  partner?: Maybe<Scalars['String']>;
  partner_not?: Maybe<Scalars['String']>;
  partner_gt?: Maybe<Scalars['String']>;
  partner_lt?: Maybe<Scalars['String']>;
  partner_gte?: Maybe<Scalars['String']>;
  partner_lte?: Maybe<Scalars['String']>;
  partner_in?: Maybe<Array<Scalars['String']>>;
  partner_not_in?: Maybe<Array<Scalars['String']>>;
  partner_contains?: Maybe<Scalars['String']>;
  partner_not_contains?: Maybe<Scalars['String']>;
  partner_starts_with?: Maybe<Scalars['String']>;
  partner_not_starts_with?: Maybe<Scalars['String']>;
  partner_ends_with?: Maybe<Scalars['String']>;
  partner_not_ends_with?: Maybe<Scalars['String']>;
};

export enum TemporaryExchangePartnerTracker_OrderBy {
  Id = 'id',
  UsdVolume = 'usdVolume',
  UsdFees = 'usdFees',
  Partner = 'partner'
}

export type DailyExchanger = {
  __typename?: 'DailyExchanger';
  id: Scalars['ID'];
};

export type DailyExchanger_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum DailyExchanger_OrderBy {
  Id = 'id'
}

export type DailyTotal = {
  __typename?: 'DailyTotal';
  id: Scalars['ID'];
  trades: Scalars['BigInt'];
  exchangers: Scalars['BigInt'];
  exchangeUSDTally: Scalars['BigInt'];
  totalFeesGeneratedInUSD: Scalars['BigInt'];
};

export type DailyTotal_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers?: Maybe<Scalars['BigInt']>;
  exchangers_not?: Maybe<Scalars['BigInt']>;
  exchangers_gt?: Maybe<Scalars['BigInt']>;
  exchangers_lt?: Maybe<Scalars['BigInt']>;
  exchangers_gte?: Maybe<Scalars['BigInt']>;
  exchangers_lte?: Maybe<Scalars['BigInt']>;
  exchangers_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_not?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_not?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum DailyTotal_OrderBy {
  Id = 'id',
  Trades = 'trades',
  Exchangers = 'exchangers',
  ExchangeUsdTally = 'exchangeUSDTally',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD'
}

export type ExchangeRebate = {
  __typename?: 'ExchangeRebate';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  currencyKey: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  amountInUSD: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type ExchangeRebate_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  amountInUSD?: Maybe<Scalars['BigInt']>;
  amountInUSD_not?: Maybe<Scalars['BigInt']>;
  amountInUSD_gt?: Maybe<Scalars['BigInt']>;
  amountInUSD_lt?: Maybe<Scalars['BigInt']>;
  amountInUSD_gte?: Maybe<Scalars['BigInt']>;
  amountInUSD_lte?: Maybe<Scalars['BigInt']>;
  amountInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  amountInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeRebate_OrderBy {
  Id = 'id',
  Account = 'account',
  CurrencyKey = 'currencyKey',
  Amount = 'amount',
  AmountInUsd = 'amountInUSD',
  Timestamp = 'timestamp',
  GasPrice = 'gasPrice',
  Block = 'block'
}

export type ExchangeReclaim = {
  __typename?: 'ExchangeReclaim';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  currencyKey: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  amountInUSD: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type ExchangeReclaim_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  currencyKey?: Maybe<Scalars['Bytes']>;
  currencyKey_not?: Maybe<Scalars['Bytes']>;
  currencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  currencyKey_contains?: Maybe<Scalars['Bytes']>;
  currencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  amountInUSD?: Maybe<Scalars['BigInt']>;
  amountInUSD_not?: Maybe<Scalars['BigInt']>;
  amountInUSD_gt?: Maybe<Scalars['BigInt']>;
  amountInUSD_lt?: Maybe<Scalars['BigInt']>;
  amountInUSD_gte?: Maybe<Scalars['BigInt']>;
  amountInUSD_lte?: Maybe<Scalars['BigInt']>;
  amountInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  amountInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ExchangeReclaim_OrderBy {
  Id = 'id',
  Account = 'account',
  CurrencyKey = 'currencyKey',
  Amount = 'amount',
  AmountInUsd = 'amountInUSD',
  Timestamp = 'timestamp',
  GasPrice = 'gasPrice',
  Block = 'block'
}

export type Exchanger = {
  __typename?: 'Exchanger';
  id: Scalars['ID'];
};

export type Exchanger_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Exchanger_OrderBy {
  Id = 'id'
}

export type FifteenMinuteExchanger = {
  __typename?: 'FifteenMinuteExchanger';
  id: Scalars['ID'];
};

export type FifteenMinuteExchanger_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum FifteenMinuteExchanger_OrderBy {
  Id = 'id'
}

export type FifteenMinuteTotal = {
  __typename?: 'FifteenMinuteTotal';
  id: Scalars['ID'];
  trades: Scalars['BigInt'];
  exchangers: Scalars['BigInt'];
  exchangeUSDTally: Scalars['BigInt'];
  totalFeesGeneratedInUSD: Scalars['BigInt'];
};

export type FifteenMinuteTotal_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers?: Maybe<Scalars['BigInt']>;
  exchangers_not?: Maybe<Scalars['BigInt']>;
  exchangers_gt?: Maybe<Scalars['BigInt']>;
  exchangers_lt?: Maybe<Scalars['BigInt']>;
  exchangers_gte?: Maybe<Scalars['BigInt']>;
  exchangers_lte?: Maybe<Scalars['BigInt']>;
  exchangers_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_not?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_not?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum FifteenMinuteTotal_OrderBy {
  Id = 'id',
  Trades = 'trades',
  Exchangers = 'exchangers',
  ExchangeUsdTally = 'exchangeUSDTally',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD'
}

export type PostArchernarExchanger = {
  __typename?: 'PostArchernarExchanger';
  id: Scalars['ID'];
};

export type PostArchernarExchanger_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum PostArchernarExchanger_OrderBy {
  Id = 'id'
}

export type PostArchernarTotal = {
  __typename?: 'PostArchernarTotal';
  id: Scalars['ID'];
  trades: Scalars['BigInt'];
  exchangers: Scalars['BigInt'];
  exchangeUSDTally: Scalars['BigInt'];
  totalFeesGeneratedInUSD: Scalars['BigInt'];
};

export type PostArchernarTotal_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers?: Maybe<Scalars['BigInt']>;
  exchangers_not?: Maybe<Scalars['BigInt']>;
  exchangers_gt?: Maybe<Scalars['BigInt']>;
  exchangers_lt?: Maybe<Scalars['BigInt']>;
  exchangers_gte?: Maybe<Scalars['BigInt']>;
  exchangers_lte?: Maybe<Scalars['BigInt']>;
  exchangers_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_not?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_not?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PostArchernarTotal_OrderBy {
  Id = 'id',
  Trades = 'trades',
  Exchangers = 'exchangers',
  ExchangeUsdTally = 'exchangeUSDTally',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD'
}

export type SynthExchange = {
  __typename?: 'SynthExchange';
  id: Scalars['ID'];
  account: Scalars['Bytes'];
  from: Scalars['Bytes'];
  fromCurrencyKey: Scalars['Bytes'];
  fromAmount: Scalars['BigInt'];
  fromAmountInUSD: Scalars['BigInt'];
  toCurrencyKey: Scalars['Bytes'];
  toAmount: Scalars['BigInt'];
  toAmountInUSD: Scalars['BigInt'];
  feesInUSD: Scalars['BigInt'];
  toAddress: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  block: Scalars['BigInt'];
  network: Scalars['String'];
};

export type SynthExchange_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  from?: Maybe<Scalars['Bytes']>;
  from_not?: Maybe<Scalars['Bytes']>;
  from_in?: Maybe<Array<Scalars['Bytes']>>;
  from_not_in?: Maybe<Array<Scalars['Bytes']>>;
  from_contains?: Maybe<Scalars['Bytes']>;
  from_not_contains?: Maybe<Scalars['Bytes']>;
  fromCurrencyKey?: Maybe<Scalars['Bytes']>;
  fromCurrencyKey_not?: Maybe<Scalars['Bytes']>;
  fromCurrencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  fromCurrencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  fromCurrencyKey_contains?: Maybe<Scalars['Bytes']>;
  fromCurrencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  fromAmount?: Maybe<Scalars['BigInt']>;
  fromAmount_not?: Maybe<Scalars['BigInt']>;
  fromAmount_gt?: Maybe<Scalars['BigInt']>;
  fromAmount_lt?: Maybe<Scalars['BigInt']>;
  fromAmount_gte?: Maybe<Scalars['BigInt']>;
  fromAmount_lte?: Maybe<Scalars['BigInt']>;
  fromAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmountInUSD?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_not?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_gt?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_lt?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_gte?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_lte?: Maybe<Scalars['BigInt']>;
  fromAmountInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  fromAmountInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
  toCurrencyKey?: Maybe<Scalars['Bytes']>;
  toCurrencyKey_not?: Maybe<Scalars['Bytes']>;
  toCurrencyKey_in?: Maybe<Array<Scalars['Bytes']>>;
  toCurrencyKey_not_in?: Maybe<Array<Scalars['Bytes']>>;
  toCurrencyKey_contains?: Maybe<Scalars['Bytes']>;
  toCurrencyKey_not_contains?: Maybe<Scalars['Bytes']>;
  toAmount?: Maybe<Scalars['BigInt']>;
  toAmount_not?: Maybe<Scalars['BigInt']>;
  toAmount_gt?: Maybe<Scalars['BigInt']>;
  toAmount_lt?: Maybe<Scalars['BigInt']>;
  toAmount_gte?: Maybe<Scalars['BigInt']>;
  toAmount_lte?: Maybe<Scalars['BigInt']>;
  toAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmountInUSD?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_not?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_gt?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_lt?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_gte?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_lte?: Maybe<Scalars['BigInt']>;
  toAmountInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  toAmountInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
  feesInUSD?: Maybe<Scalars['BigInt']>;
  feesInUSD_not?: Maybe<Scalars['BigInt']>;
  feesInUSD_gt?: Maybe<Scalars['BigInt']>;
  feesInUSD_lt?: Maybe<Scalars['BigInt']>;
  feesInUSD_gte?: Maybe<Scalars['BigInt']>;
  feesInUSD_lte?: Maybe<Scalars['BigInt']>;
  feesInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  feesInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
  toAddress?: Maybe<Scalars['Bytes']>;
  toAddress_not?: Maybe<Scalars['Bytes']>;
  toAddress_in?: Maybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: Maybe<Scalars['Bytes']>;
  toAddress_not_contains?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
  network?: Maybe<Scalars['String']>;
  network_not?: Maybe<Scalars['String']>;
  network_gt?: Maybe<Scalars['String']>;
  network_lt?: Maybe<Scalars['String']>;
  network_gte?: Maybe<Scalars['String']>;
  network_lte?: Maybe<Scalars['String']>;
  network_in?: Maybe<Array<Scalars['String']>>;
  network_not_in?: Maybe<Array<Scalars['String']>>;
  network_contains?: Maybe<Scalars['String']>;
  network_not_contains?: Maybe<Scalars['String']>;
  network_starts_with?: Maybe<Scalars['String']>;
  network_not_starts_with?: Maybe<Scalars['String']>;
  network_ends_with?: Maybe<Scalars['String']>;
  network_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SynthExchange_OrderBy {
  Id = 'id',
  Account = 'account',
  From = 'from',
  FromCurrencyKey = 'fromCurrencyKey',
  FromAmount = 'fromAmount',
  FromAmountInUsd = 'fromAmountInUSD',
  ToCurrencyKey = 'toCurrencyKey',
  ToAmount = 'toAmount',
  ToAmountInUsd = 'toAmountInUSD',
  FeesInUsd = 'feesInUSD',
  ToAddress = 'toAddress',
  Timestamp = 'timestamp',
  GasPrice = 'gasPrice',
  Block = 'block',
  Network = 'network'
}

export type Total = {
  __typename?: 'Total';
  id: Scalars['ID'];
  trades: Scalars['BigInt'];
  exchangers: Scalars['BigInt'];
  exchangeUSDTally: Scalars['BigInt'];
  totalFeesGeneratedInUSD: Scalars['BigInt'];
};

export type Total_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  trades?: Maybe<Scalars['BigInt']>;
  trades_not?: Maybe<Scalars['BigInt']>;
  trades_gt?: Maybe<Scalars['BigInt']>;
  trades_lt?: Maybe<Scalars['BigInt']>;
  trades_gte?: Maybe<Scalars['BigInt']>;
  trades_lte?: Maybe<Scalars['BigInt']>;
  trades_in?: Maybe<Array<Scalars['BigInt']>>;
  trades_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers?: Maybe<Scalars['BigInt']>;
  exchangers_not?: Maybe<Scalars['BigInt']>;
  exchangers_gt?: Maybe<Scalars['BigInt']>;
  exchangers_lt?: Maybe<Scalars['BigInt']>;
  exchangers_gte?: Maybe<Scalars['BigInt']>;
  exchangers_lte?: Maybe<Scalars['BigInt']>;
  exchangers_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangers_not_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_not?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lt?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_gte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_lte?: Maybe<Scalars['BigInt']>;
  exchangeUSDTally_in?: Maybe<Array<Scalars['BigInt']>>;
  exchangeUSDTally_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_not?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lt?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_gte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_lte?: Maybe<Scalars['BigInt']>;
  totalFeesGeneratedInUSD_in?: Maybe<Array<Scalars['BigInt']>>;
  totalFeesGeneratedInUSD_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Total_OrderBy {
  Id = 'id',
  Trades = 'trades',
  Exchangers = 'exchangers',
  ExchangeUsdTally = 'exchangeUSDTally',
  TotalFeesGeneratedInUsd = 'totalFeesGeneratedInUSD'
}

export type AccountFlaggedForLiquidation = {
  __typename?: 'AccountFlaggedForLiquidation';
  /**  the deadline plus the staker address  */
  id: Scalars['ID'];
  /**  the address of the staker  */
  account: Scalars['Bytes'];
  /**  liqudation deadline  */
  deadline: Scalars['BigInt'];
  /**  current collateral ratio  */
  collateralRatio: Scalars['BigInt'];
  /**  snx that is liquidatable  */
  liquidatableNonEscrowSNX: Scalars['BigInt'];
  /**  total collateral held by the staker including escrow amount  */
  collateral: Scalars['BigInt'];
};

export type AccountFlaggedForLiquidation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  deadline?: Maybe<Scalars['BigInt']>;
  deadline_not?: Maybe<Scalars['BigInt']>;
  deadline_gt?: Maybe<Scalars['BigInt']>;
  deadline_lt?: Maybe<Scalars['BigInt']>;
  deadline_gte?: Maybe<Scalars['BigInt']>;
  deadline_lte?: Maybe<Scalars['BigInt']>;
  deadline_in?: Maybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralRatio?: Maybe<Scalars['BigInt']>;
  collateralRatio_not?: Maybe<Scalars['BigInt']>;
  collateralRatio_gt?: Maybe<Scalars['BigInt']>;
  collateralRatio_lt?: Maybe<Scalars['BigInt']>;
  collateralRatio_gte?: Maybe<Scalars['BigInt']>;
  collateralRatio_lte?: Maybe<Scalars['BigInt']>;
  collateralRatio_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralRatio_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatableNonEscrowSNX?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_not?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_gt?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_lt?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_gte?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_lte?: Maybe<Scalars['BigInt']>;
  liquidatableNonEscrowSNX_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatableNonEscrowSNX_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AccountFlaggedForLiquidation_OrderBy {
  Id = 'id',
  Account = 'account',
  Deadline = 'deadline',
  CollateralRatio = 'collateralRatio',
  LiquidatableNonEscrowSnx = 'liquidatableNonEscrowSNX',
  Collateral = 'collateral'
}

export type AccountLiquidated = {
  __typename?: 'AccountLiquidated';
  id: Scalars['ID'];
  /** the liquidated address */
  account: Scalars['Bytes'];
  /** the amount of SNX redeemed by the liquidator */
  snxRedeemed: Scalars['BigInt'];
  /** the amount of sUSD liquidated */
  amountLiquidated: Scalars['BigInt'];
  /** the address liquidating the account */
  liquidator: Scalars['Bytes'];
  /** the time at which the liquidation occurred */
  time: Scalars['BigInt'];
};

export type AccountLiquidated_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  snxRedeemed?: Maybe<Scalars['BigInt']>;
  snxRedeemed_not?: Maybe<Scalars['BigInt']>;
  snxRedeemed_gt?: Maybe<Scalars['BigInt']>;
  snxRedeemed_lt?: Maybe<Scalars['BigInt']>;
  snxRedeemed_gte?: Maybe<Scalars['BigInt']>;
  snxRedeemed_lte?: Maybe<Scalars['BigInt']>;
  snxRedeemed_in?: Maybe<Array<Scalars['BigInt']>>;
  snxRedeemed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  amountLiquidated?: Maybe<Scalars['BigInt']>;
  amountLiquidated_not?: Maybe<Scalars['BigInt']>;
  amountLiquidated_gt?: Maybe<Scalars['BigInt']>;
  amountLiquidated_lt?: Maybe<Scalars['BigInt']>;
  amountLiquidated_gte?: Maybe<Scalars['BigInt']>;
  amountLiquidated_lte?: Maybe<Scalars['BigInt']>;
  amountLiquidated_in?: Maybe<Array<Scalars['BigInt']>>;
  amountLiquidated_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidator?: Maybe<Scalars['Bytes']>;
  liquidator_not?: Maybe<Scalars['Bytes']>;
  liquidator_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_contains?: Maybe<Scalars['Bytes']>;
  liquidator_not_contains?: Maybe<Scalars['Bytes']>;
  time?: Maybe<Scalars['BigInt']>;
  time_not?: Maybe<Scalars['BigInt']>;
  time_gt?: Maybe<Scalars['BigInt']>;
  time_lt?: Maybe<Scalars['BigInt']>;
  time_gte?: Maybe<Scalars['BigInt']>;
  time_lte?: Maybe<Scalars['BigInt']>;
  time_in?: Maybe<Array<Scalars['BigInt']>>;
  time_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AccountLiquidated_OrderBy {
  Id = 'id',
  Account = 'account',
  SnxRedeemed = 'snxRedeemed',
  AmountLiquidated = 'amountLiquidated',
  Liquidator = 'liquidator',
  Time = 'time'
}

export type AccountRemovedFromLiquidation = {
  __typename?: 'AccountRemovedFromLiquidation';
  /**  the time at which the staker fixed their c-ratio plus the staker address  */
  id: Scalars['ID'];
  /**  the address of the staker  */
  account: Scalars['Bytes'];
  /**  the time at which the staker fixed their c-ratio  */
  time: Scalars['BigInt'];
};

export type AccountRemovedFromLiquidation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  time?: Maybe<Scalars['BigInt']>;
  time_not?: Maybe<Scalars['BigInt']>;
  time_gt?: Maybe<Scalars['BigInt']>;
  time_lt?: Maybe<Scalars['BigInt']>;
  time_gte?: Maybe<Scalars['BigInt']>;
  time_lte?: Maybe<Scalars['BigInt']>;
  time_in?: Maybe<Array<Scalars['BigInt']>>;
  time_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AccountRemovedFromLiquidation_OrderBy {
  Id = 'id',
  Account = 'account',
  Time = 'time'
}

export type CollateralDeposited = {
  __typename?: 'CollateralDeposited';
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the amount of collateral deposited  */
  collateralAmount: Scalars['BigInt'];
  /**  the total amount of collateral after the deposit is included  */
  collateralAfter: Scalars['BigInt'];
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp collateral was deposited  */
  timestamp: Scalars['BigInt'];
};

export type CollateralDeposited_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  collateralAmount?: Maybe<Scalars['BigInt']>;
  collateralAmount_not?: Maybe<Scalars['BigInt']>;
  collateralAmount_gt?: Maybe<Scalars['BigInt']>;
  collateralAmount_lt?: Maybe<Scalars['BigInt']>;
  collateralAmount_gte?: Maybe<Scalars['BigInt']>;
  collateralAmount_lte?: Maybe<Scalars['BigInt']>;
  collateralAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAfter?: Maybe<Scalars['BigInt']>;
  collateralAfter_not?: Maybe<Scalars['BigInt']>;
  collateralAfter_gt?: Maybe<Scalars['BigInt']>;
  collateralAfter_lt?: Maybe<Scalars['BigInt']>;
  collateralAfter_gte?: Maybe<Scalars['BigInt']>;
  collateralAfter_lte?: Maybe<Scalars['BigInt']>;
  collateralAfter_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAfter_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  loanId?: Maybe<Scalars['BigInt']>;
  loanId_not?: Maybe<Scalars['BigInt']>;
  loanId_gt?: Maybe<Scalars['BigInt']>;
  loanId_lt?: Maybe<Scalars['BigInt']>;
  loanId_gte?: Maybe<Scalars['BigInt']>;
  loanId_lte?: Maybe<Scalars['BigInt']>;
  loanId_in?: Maybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum CollateralDeposited_OrderBy {
  Id = 'id',
  CollateralAmount = 'collateralAmount',
  CollateralAfter = 'collateralAfter',
  Account = 'account',
  LoanId = 'loanId',
  Timestamp = 'timestamp'
}

export type CollateralWithdrawn = {
  __typename?: 'CollateralWithdrawn';
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the amount of collateral withdrawn  */
  amountWithdrawn: Scalars['BigInt'];
  /**  the total amount of collateral after the withdrawal is accounted for  */
  collateralAfter: Scalars['BigInt'];
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp collateral was withdrawn  */
  timestamp: Scalars['BigInt'];
};

export type CollateralWithdrawn_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  amountWithdrawn?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_not?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_gt?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_lt?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_gte?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_lte?: Maybe<Scalars['BigInt']>;
  amountWithdrawn_in?: Maybe<Array<Scalars['BigInt']>>;
  amountWithdrawn_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAfter?: Maybe<Scalars['BigInt']>;
  collateralAfter_not?: Maybe<Scalars['BigInt']>;
  collateralAfter_gt?: Maybe<Scalars['BigInt']>;
  collateralAfter_lt?: Maybe<Scalars['BigInt']>;
  collateralAfter_gte?: Maybe<Scalars['BigInt']>;
  collateralAfter_lte?: Maybe<Scalars['BigInt']>;
  collateralAfter_in?: Maybe<Array<Scalars['BigInt']>>;
  collateralAfter_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  loanId?: Maybe<Scalars['BigInt']>;
  loanId_not?: Maybe<Scalars['BigInt']>;
  loanId_gt?: Maybe<Scalars['BigInt']>;
  loanId_lt?: Maybe<Scalars['BigInt']>;
  loanId_gte?: Maybe<Scalars['BigInt']>;
  loanId_lte?: Maybe<Scalars['BigInt']>;
  loanId_in?: Maybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum CollateralWithdrawn_OrderBy {
  Id = 'id',
  AmountWithdrawn = 'amountWithdrawn',
  CollateralAfter = 'collateralAfter',
  Account = 'account',
  LoanId = 'loanId',
  Timestamp = 'timestamp'
}

export type Loan = {
  __typename?: 'Loan';
  /**  the loan id  */
  id: Scalars['ID'];
  /**  the transaction hash of the loan  */
  txHash: Scalars['String'];
  /**  the account receiving the loan  */
  account: Scalars['Bytes'];
  /**  the type of collateral minted - sUSD or sETH  */
  collateralMinted: Scalars['String'];
  /**  the amount of the loan  */
  amount: Scalars['BigInt'];
  /**  is the loan still open?  */
  isOpen: Scalars['Boolean'];
  /**  the timestamp the loan was created  */
  createdAt: Scalars['BigInt'];
  /**  the timestamp the loan was closed  */
  closedAt?: Maybe<Scalars['BigInt']>;
  /**  whether the loan has any partial liquidations  */
  hasPartialLiquidations: Scalars['Boolean'];
};

export type LoanLiquidated = {
  __typename?: 'LoanLiquidated';
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the account that liquidated the loan  */
  liquidator: Scalars['Bytes'];
  /**  the timestamp the loan was liquidated  */
  timestamp: Scalars['BigInt'];
};

export type LoanLiquidated_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  loanId?: Maybe<Scalars['BigInt']>;
  loanId_not?: Maybe<Scalars['BigInt']>;
  loanId_gt?: Maybe<Scalars['BigInt']>;
  loanId_lt?: Maybe<Scalars['BigInt']>;
  loanId_gte?: Maybe<Scalars['BigInt']>;
  loanId_lte?: Maybe<Scalars['BigInt']>;
  loanId_in?: Maybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  liquidator?: Maybe<Scalars['Bytes']>;
  liquidator_not?: Maybe<Scalars['Bytes']>;
  liquidator_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_contains?: Maybe<Scalars['Bytes']>;
  liquidator_not_contains?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum LoanLiquidated_OrderBy {
  Id = 'id',
  LoanId = 'loanId',
  Account = 'account',
  Liquidator = 'liquidator',
  Timestamp = 'timestamp'
}

export type LoanPartiallyLiquidated = {
  __typename?: 'LoanPartiallyLiquidated';
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the account that partially liquidated the loan  */
  liquidator: Scalars['Bytes'];
  /**  the amount partially liquidated  */
  liquidatedAmount: Scalars['BigInt'];
  /**  the amount partially liquidated plus the liquidation fee  */
  liquidatedCollateral: Scalars['BigInt'];
  /**  the timestamp the loan was partially liquidated  */
  timestamp: Scalars['BigInt'];
};

export type LoanPartiallyLiquidated_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  loanId?: Maybe<Scalars['BigInt']>;
  loanId_not?: Maybe<Scalars['BigInt']>;
  loanId_gt?: Maybe<Scalars['BigInt']>;
  loanId_lt?: Maybe<Scalars['BigInt']>;
  loanId_gte?: Maybe<Scalars['BigInt']>;
  loanId_lte?: Maybe<Scalars['BigInt']>;
  loanId_in?: Maybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  liquidator?: Maybe<Scalars['Bytes']>;
  liquidator_not?: Maybe<Scalars['Bytes']>;
  liquidator_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_not_in?: Maybe<Array<Scalars['Bytes']>>;
  liquidator_contains?: Maybe<Scalars['Bytes']>;
  liquidator_not_contains?: Maybe<Scalars['Bytes']>;
  liquidatedAmount?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_not?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_gt?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_lt?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_gte?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_lte?: Maybe<Scalars['BigInt']>;
  liquidatedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedCollateral?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_not?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_gt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_lt?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_gte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_lte?: Maybe<Scalars['BigInt']>;
  liquidatedCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidatedCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum LoanPartiallyLiquidated_OrderBy {
  Id = 'id',
  LoanId = 'loanId',
  Account = 'account',
  Liquidator = 'liquidator',
  LiquidatedAmount = 'liquidatedAmount',
  LiquidatedCollateral = 'liquidatedCollateral',
  Timestamp = 'timestamp'
}

export type LoanRepaid = {
  __typename?: 'LoanRepaid';
  /**  the event tx hash plus event log index  */
  id: Scalars['ID'];
  /**  the amount of the loan that was repaid  */
  repaidAmount: Scalars['BigInt'];
  /**  the total amount of the loan after the repaid amount is accounted for  */
  newLoanAmount: Scalars['BigInt'];
  /**  the account that created the loan  */
  account: Scalars['Bytes'];
  /**  the loan id  */
  loanId: Scalars['BigInt'];
  /**  the timestamp the loan was partially or fully repaid  */
  timestamp: Scalars['BigInt'];
};

export type LoanRepaid_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  repaidAmount?: Maybe<Scalars['BigInt']>;
  repaidAmount_not?: Maybe<Scalars['BigInt']>;
  repaidAmount_gt?: Maybe<Scalars['BigInt']>;
  repaidAmount_lt?: Maybe<Scalars['BigInt']>;
  repaidAmount_gte?: Maybe<Scalars['BigInt']>;
  repaidAmount_lte?: Maybe<Scalars['BigInt']>;
  repaidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  repaidAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  newLoanAmount?: Maybe<Scalars['BigInt']>;
  newLoanAmount_not?: Maybe<Scalars['BigInt']>;
  newLoanAmount_gt?: Maybe<Scalars['BigInt']>;
  newLoanAmount_lt?: Maybe<Scalars['BigInt']>;
  newLoanAmount_gte?: Maybe<Scalars['BigInt']>;
  newLoanAmount_lte?: Maybe<Scalars['BigInt']>;
  newLoanAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  newLoanAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  loanId?: Maybe<Scalars['BigInt']>;
  loanId_not?: Maybe<Scalars['BigInt']>;
  loanId_gt?: Maybe<Scalars['BigInt']>;
  loanId_lt?: Maybe<Scalars['BigInt']>;
  loanId_gte?: Maybe<Scalars['BigInt']>;
  loanId_lte?: Maybe<Scalars['BigInt']>;
  loanId_in?: Maybe<Array<Scalars['BigInt']>>;
  loanId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum LoanRepaid_OrderBy {
  Id = 'id',
  RepaidAmount = 'repaidAmount',
  NewLoanAmount = 'newLoanAmount',
  Account = 'account',
  LoanId = 'loanId',
  Timestamp = 'timestamp'
}

export type Loan_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  txHash?: Maybe<Scalars['String']>;
  txHash_not?: Maybe<Scalars['String']>;
  txHash_gt?: Maybe<Scalars['String']>;
  txHash_lt?: Maybe<Scalars['String']>;
  txHash_gte?: Maybe<Scalars['String']>;
  txHash_lte?: Maybe<Scalars['String']>;
  txHash_in?: Maybe<Array<Scalars['String']>>;
  txHash_not_in?: Maybe<Array<Scalars['String']>>;
  txHash_contains?: Maybe<Scalars['String']>;
  txHash_not_contains?: Maybe<Scalars['String']>;
  txHash_starts_with?: Maybe<Scalars['String']>;
  txHash_not_starts_with?: Maybe<Scalars['String']>;
  txHash_ends_with?: Maybe<Scalars['String']>;
  txHash_not_ends_with?: Maybe<Scalars['String']>;
  account?: Maybe<Scalars['Bytes']>;
  account_not?: Maybe<Scalars['Bytes']>;
  account_in?: Maybe<Array<Scalars['Bytes']>>;
  account_not_in?: Maybe<Array<Scalars['Bytes']>>;
  account_contains?: Maybe<Scalars['Bytes']>;
  account_not_contains?: Maybe<Scalars['Bytes']>;
  collateralMinted?: Maybe<Scalars['String']>;
  collateralMinted_not?: Maybe<Scalars['String']>;
  collateralMinted_gt?: Maybe<Scalars['String']>;
  collateralMinted_lt?: Maybe<Scalars['String']>;
  collateralMinted_gte?: Maybe<Scalars['String']>;
  collateralMinted_lte?: Maybe<Scalars['String']>;
  collateralMinted_in?: Maybe<Array<Scalars['String']>>;
  collateralMinted_not_in?: Maybe<Array<Scalars['String']>>;
  collateralMinted_contains?: Maybe<Scalars['String']>;
  collateralMinted_not_contains?: Maybe<Scalars['String']>;
  collateralMinted_starts_with?: Maybe<Scalars['String']>;
  collateralMinted_not_starts_with?: Maybe<Scalars['String']>;
  collateralMinted_ends_with?: Maybe<Scalars['String']>;
  collateralMinted_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isOpen?: Maybe<Scalars['Boolean']>;
  isOpen_not?: Maybe<Scalars['Boolean']>;
  isOpen_in?: Maybe<Array<Scalars['Boolean']>>;
  isOpen_not_in?: Maybe<Array<Scalars['Boolean']>>;
  createdAt?: Maybe<Scalars['BigInt']>;
  createdAt_not?: Maybe<Scalars['BigInt']>;
  createdAt_gt?: Maybe<Scalars['BigInt']>;
  createdAt_lt?: Maybe<Scalars['BigInt']>;
  createdAt_gte?: Maybe<Scalars['BigInt']>;
  createdAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  closedAt?: Maybe<Scalars['BigInt']>;
  closedAt_not?: Maybe<Scalars['BigInt']>;
  closedAt_gt?: Maybe<Scalars['BigInt']>;
  closedAt_lt?: Maybe<Scalars['BigInt']>;
  closedAt_gte?: Maybe<Scalars['BigInt']>;
  closedAt_lte?: Maybe<Scalars['BigInt']>;
  closedAt_in?: Maybe<Array<Scalars['BigInt']>>;
  closedAt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  hasPartialLiquidations?: Maybe<Scalars['Boolean']>;
  hasPartialLiquidations_not?: Maybe<Scalars['Boolean']>;
  hasPartialLiquidations_in?: Maybe<Array<Scalars['Boolean']>>;
  hasPartialLiquidations_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum Loan_OrderBy {
  Id = 'id',
  TxHash = 'txHash',
  Account = 'account',
  CollateralMinted = 'collateralMinted',
  Amount = 'amount',
  IsOpen = 'isOpen',
  CreatedAt = 'createdAt',
  ClosedAt = 'closedAt',
  HasPartialLiquidations = 'hasPartialLiquidations'
}
