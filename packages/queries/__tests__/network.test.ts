import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { ethers } from 'ethers';
import { set } from 'lodash';
import useEthGasPriceQuery from '../src/queries/network/useEthGasPriceQuery';
import useSnxPriceChartQuery from '../src/queries/network/useSnxPriceChartQuery';
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

	test('test ovm gas error', async () => {
		const wrapper = getWrapper({
			defaultOptions: {
				queries: {
					// ✅ turns retries off
					retry: false,
				},
			},
		});

		const useOvm = true;

		delete (ctx as any).provider.getGasPrice;

		// eslint-disable-next-line
		console.error = () => {}; //suppress error

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx, useOvm), { wrapper });

		await waitFor(() => result.current.isError);

		expect(result.current.error?.message).toContain(
			'Cannot retrieve optimistic gas price from provider'
		);
	});

	test('useSnxPriceChartQuery', async () => {
		const wrapper = getWrapper();

		ctx.snxData!.snxPrices = async () => [
			{ id: '3', averagePrice: 3000, count: 1 },
			{ id: '2', averagePrice: 2000, count: 1 },
			{ id: '1', averagePrice: 1000, count: 1 },
		];

		const { result, waitFor } = renderHook(() => useSnxPriceChartQuery(ctx, 'D'), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual([
			{ created: '1970-01-01T00:15:00.000Z', value: 1000 },
			{ created: '1970-01-01T00:30:00.000Z', value: 2000 },
			{ created: '1970-01-01T00:45:00.000Z', value: 3000 },
		]);
	});
});
