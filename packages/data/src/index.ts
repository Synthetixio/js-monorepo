import subHours from 'date-fns/subHours';
import { request } from 'graphql-request';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { NetworkId } from '@synthetixio/contracts-interface';

import { l1Endpoints, l2Endpoints, timeSeriesEntityMap } from './constants';
import {
	createSynthExchangesQuery,
	parseSynthExchangesL1,
	parseSynthExchangesL1Kovan,
	parseSynthExchangesL2,
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
	createShortsQuery,
	parseShort,
	createExchangeEntrySettledsQuery,
	parseExchangeEntrySettleds,
	parseExchangeEntrySettledsKovan,
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
	BaseQueryParams,
	SynthExchangeExpanded,
	ShortQueryParams,
	FormattedShort,
	ExchangeEntrySettledsParams,
} from './types';
import {
	Synthetix,
	Issued,
	Burned,
	RateUpdate,
	FeesClaimed,
	DailySnxPrice,
	FifteenMinuteSnxPrice,
	DebtSnapshot,
	SnxHolder,
	ExchangeEntrySettled,
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

const getEndpointForNetwork = (networkId: NetworkId, endpoints: Record<number, string>): string => {
	if (endpoints[networkId]) {
		return endpoints[networkId];
	}
	throw new Error('unsupported network');
};

const calculateTimestampForPeriod = (periodInHours: number): number =>
	Math.trunc(subHours(new Date().getTime(), periodInHours).getTime() / 1000);

const DEFAULT_ENDPOINTS = {
	[NetworkId.Mainnet]: l1Endpoints.snx,
};

const getData = async ({
	params,
	queryMethod,
	networkId,
	endpoints,
}: {
	params: any;
	queryMethod: any;
	networkId: NetworkId;
	endpoints?: Record<number, string>;
}): Promise<any> => {
	const endpoint = getEndpointForNetwork(
		networkId,
		endpoints != null ? { ...DEFAULT_ENDPOINTS, ...endpoints } : DEFAULT_ENDPOINTS
	);
	const formattedParams = formatParams(params);
	return requestHelper({
		endpoint,
		queryMethod,
		variables: formattedParams,
	});
};

const synthetixData = ({ networkId }: { networkId: NetworkId }): SynthetixData => ({
	synthExchanges: async (
		params?: SynthExchangeQueryParams
	): Promise<SynthExchangeExpanded[] | null> => {
		const response = await getData({
			params,
			queryMethod: createSynthExchangesQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanges,
				[NetworkId.Kovan]: l1Endpoints.exchangesKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
			},
		});
		return response != null
			? response.synthExchanges.map(
					networkId === NetworkId.Mainnet
						? parseSynthExchangesL1
						: networkId === NetworkId.Kovan
						? parseSynthExchangesL1Kovan
						: parseSynthExchangesL2
			  )
			: null;
	},
	synthetix: async (params?: BaseQueryParams): Promise<Synthetix | null> => {
		const query = createSynthetixQuery(params);
		const response = await request(l1Endpoints.snx, query);
		return response != null ? parseSynthetix(response.synthetixes[0]) : null;
	},
	feesClaimed: async (params?: FeesClaimedParams): Promise<FeesClaimed[] | null> => {
		const response = await getData({
			params,
			queryMethod: createFeesClaimedQuery,
			networkId,
		});
		return response != null ? response.feesClaimeds.map(parseFeesClaimed) : null;
	},
	issued: async (params?: IssuedQueryParams): Promise<Issued[] | null> => {
		const response = await getData({
			params,
			queryMethod: createIssuedQuery,
			networkId,
		});
		return response != null ? response.issueds.map(parseIssued) : null;
	},
	burned: async (params?: BurnedQueryParams): Promise<Burned[] | null> => {
		const response = await getData({
			params,
			queryMethod: createBurnedQuery,
			networkId,
		});
		return response != null ? response.burneds.map(parseBurned) : null;
	},
	snxPrices: async (
		params: SnxPriceParams
	): Promise<DailySnxPrice[] | FifteenMinuteSnxPrice[] | null> => {
		const response = await getData({
			params,
			queryMethod: createSnxPriceQuery,
			networkId,
			endpoints: { [NetworkId.Mainnet]: l1Endpoints.rates },
		});
		return response != null
			? response[timeSeriesEntityMap[params.timeSeries]].map(parseSnxPrice)
			: null;
	},
	rateUpdates: async (params?: RateUpdateQueryParams): Promise<RateUpdate[] | null> => {
		const response = await getData({
			params,
			queryMethod: createRateUpdatesQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.rates,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l1Endpoints.rates,
			},
		});
		return response != null
			? response.rateUpdates.map((rate: RateUpdate) => parseRates(rate, networkId))
			: null;
	},
	debtSnapshots: async (params?: DebtSnapshotParams): Promise<DebtSnapshot[] | null> => {
		const response = await getData({
			params,
			queryMethod: createDebtSnapshotQuery,
			networkId,
		});
		return response != null ? response.debtSnapshots.map(parseDebtSnapshot) : null;
	},
	snxHolders: async (params?: SnxHolderParams): Promise<SnxHolder[] | null> => {
		const response = await getData({
			params,
			queryMethod: createSnxHolderQuery,
			networkId,
		});
		return response != null ? response.snxholders.map(parseSnxHolder) : null;
	},
	shorts: async (params?: ShortQueryParams): Promise<FormattedShort[] | null> => {
		const response = await getData({
			params,
			queryMethod: createShortsQuery,
			networkId,
			endpoints: { [NetworkId.Mainnet]: l1Endpoints.shorts },
		});
		return response != null ? response.shorts.map(parseShort) : null;
	},
	exchangeEntrySettleds: async (
		params?: ExchangeEntrySettledsParams
	): Promise<ExchangeEntrySettled[] | null> => {
		const response = await getData({
			params,
			queryMethod: createExchangeEntrySettledsQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanger,
				[NetworkId.Kovan]: l1Endpoints.exchangerKovan,
			},
		});
		return response != null
			? response.exchangeEntrySettleds.map(
					networkId === NetworkId.Kovan
						? parseExchangeEntrySettledsKovan
						: parseExchangeEntrySettleds
			  )
			: null;
	},
});

export { Period, PERIOD_IN_HOURS, calculateTimestampForPeriod };
export default synthetixData;
