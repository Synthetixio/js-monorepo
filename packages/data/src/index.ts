import { request } from 'graphql-request';
import subHours from 'date-fns/subHours';

import { l1Endpoints, l2Endpoints, timeSeriesEntityMap } from './constants';
import {
	createSynthExchangesQuery,
	parseSynthExchanges,
	createSynthetixQuery,
	parseSynthetix,
	createIssuedQuery,
	createBurnedQuery,
	parseIssued,
	parseBurned,
	createRateUpdatesQuery,
	parseRates,
	parseFeesClaimed,
	createFeesClaimedQuery,
	parseSnxPrice,
	createSnxPriceQuery,
} from '../queries';
import { formatParams } from './utils';
import {
	IssuedQueryParams,
	BurnedQueryParams,
	RateUpdateQueryParams,
	SynthetixData,
	SynthExchangeQueryParams,
	FeesClaimedParams,
	SnxPriceParams,
} from './types';
import {
	SynthExchange,
	Synthetix,
	Issued,
	Burned,
	RateUpdate,
	FeesClaimed,
	DailySnxPrice,
	FifteenMinuteSnxPrice,
} from '../generated/graphql';

enum Period {
	ONE_HOUR = 'ONE_HOUR',
	FOUR_HOURS = 'FOUR_HOURS',
	ONE_DAY = 'ONE_DAY',
	ONE_WEEK = 'ONE_WEEK',
	ONE_MONTH = 'ONE_MONTH',
}

const PERIOD_IN_HOURS: Record<Period, number> = {
	ONE_HOUR: 1,
	FOUR_HOURS: 4,
	ONE_DAY: 24,
	ONE_MONTH: 672,
	ONE_WEEK: 168,
};

const calculateTimestampForPeriod = (periodInHours: number): number =>
	Math.trunc(subHours(new Date().getTime(), periodInHours).getTime() / 1000);

const synthetixData = ({ useOvm }: { useOvm: boolean }): SynthetixData => ({
	synthExchanges: async (params: SynthExchangeQueryParams): Promise<SynthExchange[] | null> => {
		const formattedParams = formatParams(params);
		const query = createSynthExchangesQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.exchanges,
			query,
			formattedParams
		);
		return response != null ? response.synthExchanges.map(parseSynthExchanges) : null;
	},
	synthetix: async (): Promise<Synthetix | null> => {
		const query = createSynthetixQuery();
		const response = await request(useOvm ? l2Endpoints.snx : l1Endpoints.snx, query);
		return response != null ? parseSynthetix(response.synthetixes[0]) : null;
	},
	feesClaimed: async (params: FeesClaimedParams): Promise<FeesClaimed[] | null> => {
		const formattedParams = formatParams(params);
		const query = createFeesClaimedQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			query,
			formattedParams
		);
		return response != null ? response.feesClaimeds.map(parseFeesClaimed) : null;
	},
	issued: async (params: IssuedQueryParams): Promise<Issued[] | null> => {
		const formattedParams = formatParams(params);
		const query = createIssuedQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			query,
			formattedParams
		);
		return response != null ? response.issueds.map(parseIssued) : null;
	},
	burned: async (params: BurnedQueryParams): Promise<Burned[] | null> => {
		const formattedParams = formatParams(params);
		const query = createBurnedQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			query,
			formattedParams
		);
		return response != null ? response.burneds.map(parseBurned) : null;
	},
	snxPrices: async (
		params: SnxPriceParams
	): Promise<DailySnxPrice[] | FifteenMinuteSnxPrice[] | null> => {
		const formattedParams = formatParams(params);
		const query = createSnxPriceQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.rates,
			query,
			formattedParams
		);
		return response != null
			? response[timeSeriesEntityMap[params.timeSeries]].map(parseSnxPrice)
			: null;
	},
	rateUpdates: async (params: RateUpdateQueryParams): Promise<RateUpdate[] | null> => {
		const formattedParams = formatParams(params);
		const query = createRateUpdatesQuery(params);
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.rates,
			query,
			formattedParams
		);
		return response != null ? response.rateUpdates.map(parseRates) : null;
	},
});

export { Period, PERIOD_IN_HOURS, calculateTimestampForPeriod };
export default synthetixData;
