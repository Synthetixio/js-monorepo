export const l1Endpoints = {
	snx:             'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-old',
	depot:           'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-depot',
	exchanges:       'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-exchanges',
	rates:           'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-rates',
	binaryOptions:   'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-binary-options',
	etherCollateral: 'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-loans',
	limitOrders:     'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-limit-orders',
	exchanger:       'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-exchanger',
	liquidations:    'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-liquidations',
	shorts:          'https://api.thegraph.com/subgraphs/name/killerbyte/synthetix-shorts',
};

export const l2Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-ovm',
	snxKovan: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-kovan-ovm',
};

export const timeSeriesEntityMap = { '1d': 'dailySNXPrices', '15m': 'fifteenMinuteSNXPrices' };

export const GQL_RESPONSE_LIMIT = 999;
