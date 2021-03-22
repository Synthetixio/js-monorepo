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
