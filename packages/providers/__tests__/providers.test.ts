import { getOptimismProvider } from '../src';

describe('@synthetixio/providers', () => {
	it('needs tests', () => {
		const response = getOptimismProvider({ layerOneNetworkId: 1 });
		expect(response.formatter).toBeTruthy();
	});
});
