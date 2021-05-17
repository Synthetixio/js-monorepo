import { RateUpdate } from "@synthetixio/data/build/node/generated/graphql";

export type BaseRateUpdate = {
	timestamp: number;
	rate: number;
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
