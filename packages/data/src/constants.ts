export const l1Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
	depot: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-depot',
	exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanges',
	exchangesKovan: 'https://api.thegraph.com/subgraphs/name/dvd-schwrtz/exchanges-kovan',
	rates: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-rates',
	binaryOptions:
		'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-binary-options',
	etherCollateral: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-loans',
	limitOrders: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-limit-orders',
	exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanger',
	exchangerKovan: 'https://api.thegraph.com/subgraphs/name/dvd-schwrtz/exchanger-kovan',
	liquidations: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-liquidations',
	shorts: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-shorts',
};

export const l2Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-ovm',
	snxKovan: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-kovan-ovm',
};

export const timeSeriesEntityMap = { '1d': 'dailySNXPrices', '15m': 'fifteenMinuteSNXPrices' };

export const GQL_RESPONSE_LIMIT = 999;
