import {
	Issued,
	RateUpdate,
	Synthetix,
	SynthExchange,
	Burned,
	FeesClaimed,
	DailySnxPrice,
	FifteenMinuteSnxPrice,
	DebtSnapshot,
} from '../generated/graphql';

export type SynthExchangeQueryParams = {
	maxBlock?: number;
	max?: number;
	fromAddress?: string;
	minTimestamp?: number;
};

export type FeesClaimedParams = {
	account?: string;
	max?: number;
};

export type IssuedQueryParams = {
	account?: string;
	minBlock?: number;
	max?: number;
};

export type SnxPriceParams = {
	timeSeries: '1d' | '15m';
	max?: number;
};

export type BurnedQueryParams = IssuedQueryParams;

export type DebtSnapshotParams = {
	minBlock?: number;
	maxBlock?: number;
	max?: number;
	account?: string;
};

export type RateUpdateQueryParams = {
	synth?: string;
	minTimestamp?: number;
	max?: number;
};

export type SynthetixData = {
	synthExchanges: (params: SynthExchangeQueryParams) => Promise<SynthExchange[] | null>;
	synthetix: () => Promise<Synthetix | null>;
	issued: (params: IssuedQueryParams) => Promise<Issued[] | null>;
	rateUpdates: (params: RateUpdateQueryParams) => Promise<RateUpdate[] | null>;
	burned: (params: BurnedQueryParams) => Promise<Burned[] | null>;
	feesClaimed: (params: FeesClaimedParams) => Promise<FeesClaimed[] | null>;
	snxPrices: (params: SnxPriceParams) => Promise<DailySnxPrice[] | FifteenMinuteSnxPrice[] | null>;
	debtSnapshots: (params: DebtSnapshotParams) => Promise<DebtSnapshot[] | null>;
};
