import Wei from '@synthetixio/wei';
import { CurrencyKey, NetworkId, NetworkName } from '@synthetixio/contracts-interface';
import { BigNumber } from '@ethersproject/bignumber';

export type GasPrice = {
  baseFeePerGas?: BigNumber; // Note that this is used for estimating price and should not be included in the transaction
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasPrice?: BigNumber;
};

export type GasPrices = {
  fastest: GasPrice;
  fast: GasPrice;
  average: GasPrice;
};

export type GasSpeed = keyof GasPrices;

export const GAS_SPEEDS: GasSpeed[] = ['average', 'fast', 'fastest'];

export type BaseRateUpdate = {
  timestamp: number;
  rate: number;
};

export type Candle = {
  id: string;
  synth: string;
  open: bigint;
  high: bigint;
  low: bigint;
  close: bigint;
  timestamp: bigint;
};

export type BaseRateUpdates = BaseRateUpdate[];

export type HistoricalRatesUpdates = {
  rates: BaseRateUpdate[];
  low: number;
  high: number;
  change: number;
};

export type MarketCap = {
  marketCap: number;
};

export type Rates = Record<string, Wei>;

export type HistoricalVolume = Record<CurrencyKey, Wei>;

export type FrozenSynths = Set<CurrencyKey>;

export type SynthSuspensionReason =
  | 'system-upgrade'
  | 'market-closure'
  | 'circuit-breaker'
  | 'emergency';

export type SynthSuspended = {
  isSuspended: boolean;
  reasonCode: number;
  reason: SynthSuspensionReason | null;
};
export type SynthBalance = {
  currencyKey: CurrencyKey;
  balance: Wei;
  usdBalance: Wei;
};

export type SynthBalancesMap = Partial<{ [key: string]: SynthBalance }>;

export type Balances = {
  balancesMap: SynthBalancesMap;
  balances: SynthBalance[];
  totalUSDBalance: Wei;
};

export type TokenBalances = Partial<
  Record<
    string,
    {
      balance: Wei;
      token: Token;
    }
  >
>;

export type GlobalStakingInfo = {
  snxPrice: Wei;
  totalIssuedSynths: Wei;
  issuanceRatio: Wei;
  totalSupply: Wei;
  lockedSupply: Wei;
  lockedValue: Wei;
  snxStaked: Wei;
  snxPercentLocked: Wei;
  activeCRatio: Wei;
  lastDebtLedgerEntry: Wei;
};

export type Token = {
  address: string;
  chainId: NetworkId;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
};

export type TokenListResponse = {
  keywords: string[];
  logoURI: string;
  name: string;
  tags: any;
  timestamp: string;
  tokens: Token[];
  version: { major: number; minor: number; patch: number };
};

export type TokenListQueryResponse = {
  tokens: Token[];
  tokensMap: Partial<Record<string, Token>>;
  symbols: string[];
};

export enum ProposalStates {
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export type SpaceData = {
  domain: string;
  filters: {
    onlyMembers: boolean;
    minScore: number;
  };
  members: string[];
  name: string;
  network: NetworkName;
  skin: string;
  strategies: SpaceStrategy[];
  symbol: string;
};

export type SpaceStrategy = {
  name: string;
  params: {
    address?: string;
    decimals: number;
    symbol: string;
  };
};

export type Proposal = {
  id: string;
  ipfs: string;
  author: string;
  created: number;
  space: SpaceData;
  network: NetworkName;
  strategies: SpaceStrategy[];
  plugins: any;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
};

export type Vote = {
  id: string;
  voter: string;
  created: number;
  space: SpaceData;
  proposal: string;
  choice: any;
  metadata: any;
  vp: number;
  vp_by_strategy: number[];
};

export type ProposalResults = {
  totalBalances: number[];
  totalScores: any;
  totalVotes: number[];
  totalVotesBalances: number;
  choices: string[];
  spaceSymbol: string;
  voteList: any[];
};

export type ShortRewardsData = {
  openInterestUSD: Wei;
  distribution: Wei;
  periodFinish: number;
  duration: number;
  staked: Wei;
  rewards: Wei;
};

export enum Action {
  APPROVE_ALL = 'ApproveAll',
  ISSUE_FOR_ADDRESS = 'IssueForAddress',
  BURN_FOR_ADDRESS = 'BurnForAddress',
  CLAIM_FOR_ADDRESS = 'ClaimForAddress',
  EXCHANGE_FOR_ADDRESS = 'ExchangeForAddress',
}

export const DELEGATE_APPROVE_CONTRACT_METHODS: Map<string, string> = new Map([
  [Action.APPROVE_ALL, 'approveAllDelegatePowers'],
  [Action.ISSUE_FOR_ADDRESS, 'approveIssueOnBehalf'],
  [Action.BURN_FOR_ADDRESS, 'approveBurnOnBehalf'],
  [Action.CLAIM_FOR_ADDRESS, 'approveClaimOnBehalf'],
  [Action.EXCHANGE_FOR_ADDRESS, 'approveExchangeOnBehalf'],
]);

export const DELEGATE_WITHDRAW_CONTRACT_METHODS: Map<string, string> = new Map([
  [Action.APPROVE_ALL, 'removeAllDelegatePowers'],
  [Action.ISSUE_FOR_ADDRESS, 'removeIssueOnBehalf'],
  [Action.BURN_FOR_ADDRESS, 'removeBurnOnBehalf'],
  [Action.CLAIM_FOR_ADDRESS, 'removeClaimOnBehalf'],
  [Action.EXCHANGE_FOR_ADDRESS, 'removeExchangeOnBehalf'],
]);

export const DELEGATE_GET_IS_APPROVED_CONTRACT_METHODS: Map<string, string> = new Map([
  [Action.APPROVE_ALL, 'approvedAll'],
  [Action.ISSUE_FOR_ADDRESS, 'canIssueFor'],
  [Action.BURN_FOR_ADDRESS, 'canBurnFor'],
  [Action.CLAIM_FOR_ADDRESS, 'canClaimFor'],
  [Action.EXCHANGE_FOR_ADDRESS, 'canExchangeFor'],
]);

export const DELEGATE_ENTITY_ATTRS: Map<string, string> = new Map([
  [Action.APPROVE_ALL, 'canAll'],
  [Action.ISSUE_FOR_ADDRESS, 'canMint'],
  [Action.BURN_FOR_ADDRESS, 'canBurn'],
  [Action.CLAIM_FOR_ADDRESS, 'canClaim'],
  [Action.EXCHANGE_FOR_ADDRESS, 'canExchange'],
]);

export const ACTIONS: string[] = Object.values(Action);

export class Account {
  authoriser: string;
  delegate: string;
  mint: boolean;
  burn: boolean;
  claim: boolean;
  exchange: boolean;

  constructor(
    authoriser: string,
    delegate: string,
    mint: boolean,
    burn: boolean,
    claim: boolean,
    exchange: boolean
  ) {
    this.authoriser = authoriser;
    this.delegate = delegate;
    this.mint = mint;
    this.burn = burn;
    this.claim = claim;
    this.exchange = exchange;
  }

  get all(): boolean {
    return this.mint && this.burn && this.claim && this.exchange;
  }
}
export type DelegationWallet = {
  address: string;
  canMint: boolean;
  canBurn: boolean;
  canClaim: boolean;
  canAll: boolean;
  canExchange: boolean;
};

export type StakingClaimableRewards = {
  tradingRewards: Wei;
  stakingRewards: Wei;
};

export enum StakingTransactionType {
  Issued = 'issued',
  Burned = 'burned',
  FeesClaimed = 'feesClaimed',
}

export type HistoricalStakingTransaction = {
  account: string;
  block: number;
  hash: string;
  value: Wei;
  timestamp: number;
  type: StakingTransactionType;
  totalIssuedSUSD: Wei;
  rewards?: Wei;
};

export type DailyStakingRecord = {
  value: Wei;
  totalDebt: Wei;
  timestamp: number;
  type: StakingTransactionType;
};

export type FeePoolData = {
  feePeriodDuration: number;
  startTime: number;
  feesToDistribute: Wei;
  feesClaimed: Wei;
  rewardsToDistribute: Wei;
  rewardsClaimed: Wei;
};

export type SynthTotalSupply = {
  name: string;
  value: Wei;
  skewValue: Wei;
  totalSupply: Wei;
  poolProportion: Wei;
};

export type SynthsTotalSupplyData = {
  supplyData: { [name: string]: SynthTotalSupply };
  totalValue: Wei;
  priceData: { [name: string]: Wei };
  shortData: { [name: string]: Wei };
  synthTotalSupplies: any[][];
};

export type TokenSaleEscrow = {
  escrowPeriod: number;
  totalEscrowed: Wei;
  releaseIntervalMonths: number;
  totalPeriod: number;
  claimableAmount: Wei;
  schedule: Schedule;
  totalVested: Wei;
};

export type EscrowData = {
  claimableAmount: Wei;
  schedule: Schedule;
  totalEscrowed: Wei;
  totalVested: Wei;
  totalBalancePendingMigration: Wei;
  claimableEntryIds?: Wei[];
  migratableEntryIdsInChunk?: Wei[][];
};

export type Schedule = Array<
  | {
      quantity: Wei;
      date: Date;
    }
  | []
>;

export type DepositRecord = {
  timestamp: number;
  amount: Wei;
  type: 'deposit' | 'withdrawal';
  status: 'pending' | 'relay' | 'confirmed';
  transactionHash: string;
};

export type DepositHistory = Array<DepositRecord>;

export type SNXPriceData = {
  id: string;
  averagePrice: number;
};

export type ActiveStakersData = {
  id: string;
  count: number;
};

export type TradesRequestData = {
  id: string;
  trades: number;
  exchangers: number;
  exchangeUSDTally: number;
};

export type AreaChartData = {
  created: string;
  value: number;
};

export type TreeMapData = {
  value: number;
  name: string;
};

export type ChartPeriod = 'D' | 'W' | 'M' | 'Y';

export type TimeSeries = '1d' | '15m';

export type FeePeriod = {
  feesToDistribute: number;
  feesClaimed: number;
  rewardsToDistribute: number;
  rewardsClaimed: number;
  startTime: number;
};

export type LiquidationsData = {
  deadline: number;
  account: string;
  currentRatio: number;
  currentCollateral: number;
  currentBalanceOf: number;
};

export type SettlementOwingData = {
  rebate: Wei;
  reclaim: Wei;
  numEntries: Wei;
};

export type SynthFeeAndWaitingPeriod = {
  currencyKey: CurrencyKey;
  fee: Wei;
  waitingPeriod: number;
  noOfTrades: number;
};

export type DeprecatedSynthBalance = {
  currencyKey: CurrencyKey;
  proxyAddress: string;
  balance: Wei;
  usdBalance: Wei;
};

export type DeprecatedSynthsBalances = {
  balances: DeprecatedSynthBalance[];
  totalUSDBalance: Wei;
};
