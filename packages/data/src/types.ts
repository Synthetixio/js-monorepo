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
