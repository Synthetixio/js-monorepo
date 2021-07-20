import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { ethers } from 'ethers';
import { set } from 'lodash';
import useEthGasPriceQuery from '../src/queries/network/useEthGasPriceQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

describe('@synthetixio/queries network useEthGasPriceQuery', () => {
	const ctx = getFakeQueryContext();

	test('test ovm gas', async () => {
		const wrapper = getWrapper();

		const useOvm = true;

		//mock provider
		set(ctx.provider as ethers.providers.JsonRpcProvider, 'getGasPrice', async () =>
			// set to 0.015 gwei
			Promise.resolve(wei(15000000, undefined, true).toBN())
		);

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx, useOvm), { wrapper });

		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			fastest: 0.015,
			fast: 0.015,
			average: 0.015,
		});
	});
});
