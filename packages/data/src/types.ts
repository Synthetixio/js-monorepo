import { Issued, RateUpdate, Synthetix, SynthExchange } from '../generated/graphql';

export type SynthExchangeQueryParams = {
	maxBlock?: number;
	max?: number;
	fromAddress?: string;
	minTimestamp?: number;
};

export type IssuedQueryParams = {
	account?: string;
	minBlock?: number;
	max?: number;
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
};
