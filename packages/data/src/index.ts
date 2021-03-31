import subHours from 'date-fns/subHours';
import { request } from 'graphql-request';

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
	parseDebtSnapshot,
	createDebtSnapshotQuery,
	parseSnxHolder,
	createSnxHolderQuery,
} from '../queries';
import { formatParams, requestHelper } from './utils';
import {
	IssuedQueryParams,
	BurnedQueryParams,
	RateUpdateQueryParams,
	SynthetixData,
	SynthExchangeQueryParams,
	FeesClaimedParams,
	SnxPriceParams,
	DebtSnapshotParams,
	SnxHolderParams,
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
	DebtSnapshot,
	SnxHolder,
} from '../generated/graphql';

enum Period {
	ONE_HOUR = 'ONE_HOUR',
	FOUR_HOURS = 'FOUR_HOURS',
	ONE_DAY = 'ONE_DAY',
	ONE_WEEK = 'ONE_WEEK',
	ONE_MONTH = 'ONE_MONTH',
	ONE_YEAR = 'ONE_YEAR',
}

const PERIOD_IN_HOURS: Record<Period, number> = {
	ONE_HOUR: 1,
	FOUR_HOURS: 4,
	ONE_DAY: 24,
	ONE_WEEK: 168,
	ONE_MONTH: 730,
	ONE_YEAR: 8760,
};

const calculateTimestampForPeriod = (periodInHours: number): number =>
	Math.trunc(subHours(new Date().getTime(), periodInHours).getTime() / 1000);

const synthetixData = ({ useOvm }: { useOvm: boolean }): SynthetixData => ({
	synthExchanges: async (params: SynthExchangeQueryParams): Promise<SynthExchange[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.exchanges,
			queryMethod: createSynthExchangesQuery,
			variables: formattedParams,
			field: 'timestamp',
		});
		return response != null ? response.synthExchanges.map(parseSynthExchanges) : null;
	},
	synthetix: async (): Promise<Synthetix | null> => {
		const query = createSynthetixQuery();
		const response = await request(useOvm ? l2Endpoints.snx : l1Endpoints.snx, query);
		return response != null ? parseSynthetix(response.synthetixes[0]) : null;
	},
	feesClaimed: async (params: FeesClaimedParams): Promise<FeesClaimed[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			queryMethod: createFeesClaimedQuery,
			variables: formattedParams,
			field: 'timestamp',
		});
		return response != null ? response.feesClaimeds.map(parseFeesClaimed) : null;
	},
	issued: async (params: IssuedQueryParams): Promise<Issued[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			queryMethod: createIssuedQuery,
			variables: formattedParams,
			field: 'timestamp',
		});
		return response != null ? response.issueds.map(parseIssued) : null;
	},
	burned: async (params: BurnedQueryParams): Promise<Burned[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			queryMethod: createBurnedQuery,
			variables: formattedParams,
			field: 'timestamp',
		});
		return response != null ? response.burneds.map(parseBurned) : null;
	},
	snxPrices: async (
		params: SnxPriceParams
	): Promise<DailySnxPrice[] | FifteenMinuteSnxPrice[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.rates,
			queryMethod: createSnxPriceQuery,
			variables: formattedParams,
			field: 'id',
		});
		return response != null
			? response[timeSeriesEntityMap[params.timeSeries]].map(parseSnxPrice)
			: null;
	},
	rateUpdates: async (params: RateUpdateQueryParams): Promise<RateUpdate[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.rates,
			queryMethod: createRateUpdatesQuery,
			field: 'timestamp',
			variables: formattedParams,
		});
		console.log('rate updates response', response);
		return response != null ? response.rateUpdates.map(parseRates) : null;
	},
	debtSnapshots: async (params: DebtSnapshotParams): Promise<DebtSnapshot[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			queryMethod: createDebtSnapshotQuery,
			variables: formattedParams,
			field: 'timestamp',
		});
		return response != null ? response.debtSnapshots.map(parseDebtSnapshot) : null;
	},
	snxHolders: async (params: SnxHolderParams): Promise<SnxHolder[] | null> => {
		const formattedParams = formatParams(params);
		const response = await requestHelper({
			endpoint: useOvm ? l2Endpoints.snx : l1Endpoints.snx,
			queryMethod: createSnxHolderQuery,
			variables: formattedParams,
			field: 'collateral',
		});
		return response != null ? response.snxholders.map(parseSnxHolder) : null;
	},
});

export { Period, PERIOD_IN_HOURS, calculateTimestampForPeriod };
export default synthetixData;
