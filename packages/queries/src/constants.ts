export const l1Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
	depot: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-depot',
	exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanges',
	rates: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-rates',
	binaryOptions:
		'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-binary-options',
	etherCollateral: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-loans',
	limitOrders: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-limit-orders',
	exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanger',
	liquidations: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-liquidations',
};

export const l2Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-ovm',
	snxKovanOvm: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-kovan-ovm',
};

export const timeSeriesEntityMap = { '1d': 'dailySNXPrices', '15m': 'fifteenMinuteSNXPrices' };

export const GQL_RESPONSE_LIMIT = 999;

export enum Period {
	ONE_HOUR = 'ONE_HOUR',
	FOUR_HOURS = 'FOUR_HOURS',
	ONE_DAY = 'ONE_DAY',
	ONE_WEEK = 'ONE_WEEK',
	ONE_MONTH = 'ONE_MONTH',
}

export const PERIOD_IN_HOURS: Record<Period, number> = {
	ONE_HOUR: 1,
	FOUR_HOURS: 4,
	ONE_DAY: 24,
	ONE_MONTH: 672,
	ONE_WEEK: 168,
};

export type PeriodLabel = {
	period: Period;
	value: number;
	i18nLabel: string;
};

export const PERIOD_LABELS_MAP: Record<Period, PeriodLabel> = {
	ONE_HOUR: {
		period: Period.ONE_HOUR,
		value: PERIOD_IN_HOURS.ONE_HOUR,
		i18nLabel: 'common.chart-periods.1H',
	},
	FOUR_HOURS: {
		period: Period.FOUR_HOURS,
		value: PERIOD_IN_HOURS.FOUR_HOURS,
		i18nLabel: 'common.chart-periods.4H',
	},
	ONE_DAY: {
		period: Period.ONE_DAY,
		value: PERIOD_IN_HOURS.ONE_DAY,
		i18nLabel: 'common.chart-periods.1D',
	},
	ONE_WEEK: {
		period: Period.ONE_WEEK,
		value: PERIOD_IN_HOURS.ONE_WEEK,
		i18nLabel: 'common.chart-periods.1W',
	},
	ONE_MONTH: {
		period: Period.ONE_MONTH,
		value: PERIOD_IN_HOURS.ONE_MONTH,
		i18nLabel: 'common.chart-periods.1M',
	},
};

export const PERIOD_LABELS = Object.values(PERIOD_LABELS_MAP);

export const COUNCIL_NOMINATIONS_URL = 'https://';