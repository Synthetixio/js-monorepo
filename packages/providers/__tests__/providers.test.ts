import { ERRORS } from '../src/constants';
import { handleSwitchChain } from '../src/index';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { NetworkId } from '@synthetixio/contracts-inferface';

describe('@synthetixio/providers', () => {
	it('needs tests', () => {
		expect(ERRORS.noWeb3Provider).toEqual('Web3 provider missing');
	});

	it('should return undefined if request method is not present in provider from handleSwitchChain function', async () => {
		const fakeProvider = { provider: null };
		const result = await handleSwitchChain(fakeProvider as any, NetworkId, true);
		expect(result).toBe(undefined);
	});
});
