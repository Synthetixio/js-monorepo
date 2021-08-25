import {
	SynthExchange,
	Short,
	ShortLoanChange,
	ShortCollateralChange,
	ShortLiquidation,
} from '../generated/graphql';

export type BaseQueryParams = {
	max?: number;
	autoGeneratedPaginationField?: number;
	blockNumber?: number;
};

export type SynthExchangeQueryParams = {
	maxBlock?: number;
	fromAddress?: string;
	minTimestamp?: number;
} & BaseQueryParams;

export type FeesClaimedParams = {
	account?: string;
} & BaseQueryParams;

export type IssuedQueryParams = {
	account?: string;
	minBlock?: number;
} & BaseQueryParams;

export type DailyIssuedQueryParams = {
	minTimestamp?: number;
} & BaseQueryParams;

export type SnxPriceParams = {
	timeSeries: '1d' | '15m';
} & BaseQueryParams;

export type BurnedQueryParams = IssuedQueryParams;
export type DailyBurnedQueryParams = DailyIssuedQueryParams;

export type DebtSnapshotParams = {
	minBlock?: number;
	maxBlock?: number;
	account?: string;
} & BaseQueryParams;

export type ShortQueryParams = {
	id?: string;
	isOpen?: boolean;
	account?: string;
} & BaseQueryParams;

export type SnxHolderParams = {
	maxCollateral?: number;
	minCollateral?: number;
	address?: string;
	minMints?: number;
	minClaims?: number;
} & BaseQueryParams;

export type RateUpdateQueryParams = {
	synth?: string;
	minTimestamp?: number;
} & BaseQueryParams;

export type ExchangeEntrySettledsParams = {
	from?: string;
	minExchangeTimestamp?: number;
	maxExchangeTimestamp?: number;
} & BaseQueryParams;

export type BinaryOptionsMarketsParams = {
	creator?: string;
	isOpen?: boolean;
	minTimestamp?: number;
	maxTimestamp?: number;
} & BaseQueryParams;

export type BinaryOptionsTransactionsParams = {
	market?: string;
	account?: string;
} & BaseQueryParams;

export type SynthExchangeExpanded = SynthExchange & {
	hash: string;
};

export type DailyTotalActiveStakersParams = {} & BaseQueryParams;

export type ExchangeTotalsParams = {
	timeSeries: string;
} & BaseQueryParams;

/**
 * Shorts have many relationships between entities although we are not taking advantage
 * of all of them so we are removing the types we don't use
 */
export interface FormattedShort
	extends Omit<Short, 'contractData' | 'liquidations' | 'collateralChanges' | 'loanChanges'> {
	loanChanges: Omit<ShortLoanChange, 'short'>[];
	collateralChanges: Omit<ShortCollateralChange, 'short'>[];
	liquidations: Omit<ShortLiquidation, 'short'>[];
}

export type OptionsMarket = {
	address: string;
	timestamp: number;
	creator: string;
	currencyKey: string;
	strikePrice: string;
	biddingEndDate: number;
	maturityDate: number;
	expiryDate: number;
	isOpen: boolean;
	longPrice: string;
	shortPrice: string;
	poolSize: string;
	result: string | null;
};

export type OptionsTransaction = {
	hash: string;
	timestamp: number;
	type: string;
	account: string;
	currencyKey: string | null;
	side: string;
	amount: string;
	market: string;
	fee: string | null;
};

export type DailyTotalActiveStakers = {
	id: number;
	count: number;
};

export type ExchangeTotals = {
	id: number;
	trades: number;
	exchangers: number;
	exchangeUSDTally: number;
	totalFeesGeneratedInUSD: number;
};
