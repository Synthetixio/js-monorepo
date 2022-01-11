import { ERRORS } from '../src/constants';
import { handleSwitchChain } from '../src/index';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { NetworkId } from '@synthetixio/contracts-inferface';

describe('@synthetixio/providers', () => {
	it('needs tests', () => {
		expect(ERRORS.noWeb3Provider).toEqual('Web3 provider missing');
	});
});
