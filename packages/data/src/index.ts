import subHours from 'date-fns/subHours';
import { request } from 'graphql-request';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { NetworkId } from '@synthetixio/contracts-interface';

import { l1Endpoints, l2Endpoints } from './constants';
import * as queries from '../queries';
import { formatParams, requestHelper } from './utils';
import {
	IssuedQueryParams,
	BurnedQueryParams,
	RateUpdateQueryParams,
	SynthExchangeQueryParams,
	FeesClaimedParams,
	SnxPriceParams,
	DebtSnapshotParams,
	SnxHolderParams,
	BaseQueryParams,
	SynthExchangeExpanded,
	ShortQueryParams,
	Short,
	ExchangeEntrySettledsParams,
	DailyIssuedQueryParams,
	DailyBurnedQueryParams,
	DailyTotalActiveStakers,
	DailyTotalActiveStakersParams,
	ExchangeTotals,
	ExchangeTotalsParams,
	AccountsFlaggedForLiquidationParams,
	AccountFlaggedForLiquidation,
	SynthHolderParams,
	SynthHolder,
} from './types';
import {
	Synthetix,
	Issued,
	Burned,
	DailyIssued,
	DailyBurned,
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
	[NetworkId['Mainnet-Ovm']]: l2Endpoints.snx,
	[NetworkId.Kovan]: l1Endpoints.snxKovan,
	[NetworkId['Kovan-Ovm']]: l2Endpoints.snxKovan,
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

const synthetixData = ({ networkId }: { networkId: NetworkId }) => ({
	synthExchanges: async (
		params?: SynthExchangeQueryParams
	): Promise<SynthExchangeExpanded[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createSynthExchangesQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanges,
				[NetworkId.Kovan]: l1Endpoints.exchangesKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
			},
		});
		return response != null ? response.synthExchanges.map(queries.parseSynthExchanges) : null;
	},
	synthetix: async (params?: BaseQueryParams): Promise<Synthetix | null> => {
		const query = queries.createSynthetixQuery(params);
		const response = await request(
			networkId === NetworkId.Mainnet ? l1Endpoints.snx : l2Endpoints.snx,
			query
		);
		return response != null ? queries.parseSynthetix(response.synthetixes[0]) : null;
	},
	feesClaimed: async (params?: FeesClaimedParams): Promise<FeesClaimed[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createFeesClaimedQuery,
			networkId,
		});
		return response != null ? response.feesClaimeds.map(queries.parseFeesClaimed) : null;
	},
	issued: async (params?: IssuedQueryParams): Promise<Issued[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createIssuedQuery,
			networkId,
		});
		return response != null ? response.issueds.map(queries.parseIssued) : null;
	},
	burned: async (params?: BurnedQueryParams): Promise<Burned[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createBurnedQuery,
			networkId,
		});
		return response != null ? response.burneds.map(queries.parseBurned) : null;
	},
	dailyIssued: async (params?: DailyIssuedQueryParams): Promise<DailyIssued[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createDailyIssuedQuery,
			networkId,
		});
		return response != null ? response.dailyIssueds.map(queries.parseIssued) : null;
	},
	dailyBurned: async (params?: DailyBurnedQueryParams): Promise<DailyBurned[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createDailyBurnedQuery,
			networkId,
		});
		return response != null ? response.dailyBurneds.map(queries.parseBurned) : null;
	},
	snxPrices: async (
		params: SnxPriceParams
	): Promise<DailySnxPrice[] | FifteenMinuteSnxPrice[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createSnxPriceQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanges,
				[NetworkId.Kovan]: l1Endpoints.exchangesKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
			},
		});
		return response != null
			? response[queries.getSNXPricesQueryResponseAttr(params.timeSeries)].map(
					queries.parseSnxPrice
			  )
			: null;
	},
	rateUpdates: async (params?: RateUpdateQueryParams): Promise<RateUpdate[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createRateUpdatesQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanges,
				[NetworkId.Kovan]: l1Endpoints.exchangesKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
			},
		});
		return response != null ? response.rateUpdates.map(queries.parseRates) : null;
	},
	debtSnapshots: async (params?: DebtSnapshotParams): Promise<DebtSnapshot[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createDebtSnapshotQuery,
			networkId,
		});
		return response != null ? response.debtSnapshots.map(queries.parseDebtSnapshot) : null;
	},
	snxHolders: async (params?: SnxHolderParams): Promise<SnxHolder[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createSnxHolderQuery,
			networkId,
		});
		return response != null ? response.snxholders.map(queries.parseSnxHolder) : null;
	},
	shorts: async (params?: ShortQueryParams): Promise<Short[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createShortsQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.shorts,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.shorts,
			},
		});
		return response != null ? response.shorts.map(queries.parseShort) : null;
	},
	exchangeEntrySettleds: async (
		params?: ExchangeEntrySettledsParams
	): Promise<ExchangeEntrySettled[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createExchangeEntrySettledsQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanger,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanger,
				[NetworkId.Kovan]: l1Endpoints.exchangerKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangerKovan,
			},
		});
		return response != null
			? response.exchangeEntrySettleds.map(queries.parseExchangeEntrySettleds)
			: null;
	},
	exchangeTotals: async (params: ExchangeTotalsParams): Promise<ExchangeTotals[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createExchangeTotalsQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.exchanges,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
				[NetworkId.Kovan]: l1Endpoints.exchangesKovan,
				[NetworkId['Kovan-Ovm']]: l2Endpoints.exchangesKovan,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.exchanges,
			},
		});
		return response != null
			? response[queries.getExchangeTotalsQueryResponseAttr(params.timeSeries)].map(
					queries.parseExchangeTotals
			  )
			: null;
	},
	dailyTotalActiveStakers: async (
		params?: DailyTotalActiveStakersParams
	): Promise<DailyTotalActiveStakers[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createDailyTotalActiveStakersQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.snx,
				[NetworkId['Mainnet-Ovm']]: l2Endpoints.snx,
			},
		});
		return response != null
			? response.totalDailyActiveStakers.map(queries.parseDailyTotalActiveStakers)
			: null;
	},
	accountsFlaggedForLiquidation: async (
		params?: AccountsFlaggedForLiquidationParams
	): Promise<AccountFlaggedForLiquidation[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createAccountsFlaggedForLiquidationQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.liquidations,
			},
		});
		return response != null
			? response.accountFlaggedForLiquidations.map(queries.parseAccountsFlaggedForLiquidation)
			: null;
	},
	synthHolders: async (params?: SynthHolderParams): Promise<SynthHolder[] | null> => {
		const response = await getData({
			params,
			queryMethod: queries.createSynthHoldersQuery,
			networkId,
			endpoints: {
				[NetworkId.Mainnet]: l1Endpoints.snx,
			},
		});
		return response != null ? response.synthHolders.map(queries.parseSynthHolders) : null;
	},
});

type SynthetixData = ReturnType<typeof synthetixData>;

export { Period, PERIOD_IN_HOURS, calculateTimestampForPeriod, l1Endpoints, l2Endpoints };
export type {
	SynthetixData,
	SynthExchangeExpanded,
	ExchangeTotals,
	DailyTotalActiveStakers,
	AccountFlaggedForLiquidation,
	SynthHolder,
	DailyIssued,
	DailyBurned,
	Short,
	SnxHolder,
};
export default synthetixData;
