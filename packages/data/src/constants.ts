export const l1Endpoints = {
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
	snxKovan: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/kovan-issuance',
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
	snx: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-issuance',
	snxKovan: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-kovan-issuance',
	exchanges: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-exchanges',
	exchangesKovan: 'https://api.thegraph.com/subgraphs/name/killerbyte/optimism-kovan-exchanges',
	exchanger: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-exchanger',
	exchangerKovan: 'https://api.thegraph.com/subgraphs/name/killerbyte/optimism-kovan-exchanger',
	shorts: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/optimism-shorts',
	shortsKovan: 'https://api.thegraph.com/subgraphs/name/killerbyte/optimism-kovan-shorts',
};

export const timeSeriesEntityMap = { '1d': 'dailySNXPrices', '15m': 'fifteenMinuteSNXPrices' };

export const GQL_RESPONSE_LIMIT = 999;
