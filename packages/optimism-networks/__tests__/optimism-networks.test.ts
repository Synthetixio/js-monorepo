import { getOptimismNetwork } from '../src';

describe('@synthetixio/networks', () => {
	it('needs tests', () => {
		const response = {
			blockExplorerUrls: ['https://explorer.optimism.io/'],
			chainId: '0xA',
			chainName: 'Optimism Mainnet',
			iconUrls: [
				'https://optimism.io/images/metamask_icon.svg',
				'https://optimism.io/images/metamask_icon.png',
			],
			rpcUrls: ['https://mainnet.optimism.io'],
		};
		expect(getOptimismNetwork({ layerOneNetworkId: 1 })).toEqual(response);
	});
});
