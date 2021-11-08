import { NetworkId } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { ethers, BigNumber } from 'ethers';
import { set } from 'lodash';
import useEthGasPriceQuery, {
	ETH_GAS_STATION_API_URL,
} from '../src/queries/network/useEthGasPriceQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

describe('@synthetixio/queries network useEthGasPriceQuery', () => {
	const ctx = getFakeQueryContext();
	ctx.networkId = NetworkId['Mainnet-Ovm'];

	test('test ovm gas', async () => {
		const wrapper = getWrapper();

		//mock provider
		set(ctx.provider as ethers.providers.JsonRpcProvider, 'getGasPrice', async () =>
			Promise.resolve(wei(15000000, undefined, true).toBN())
		);

		set(ctx.provider as ethers.providers.JsonRpcProvider, 'getBlock', async () =>
			Promise.resolve(null)
		);

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

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

		delete (ctx as any).provider.getGasPrice;

		// eslint-disable-next-line
		console.error = () => {}; //suppress error

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

		await waitFor(() => result.current.isError);

		expect(result.current.error?.message).toContain(
			'Cannot retrieve optimistic gas price from provider'
		);
	});

	test('should query eth gas station if networkID Mainnet is provided', async () => {
		jest.spyOn(axios, 'get');

		const wrapper = getWrapper({
			defaultOptions: {
				queries: {
					// ✅ turns retries off
					retry: false,
				},
			},
		});

		ctx.networkId = NetworkId.Mainnet;

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

		await waitFor(() => result.current.isSuccess);

		expect(axios.get).toBeCalledWith(ETH_GAS_STATION_API_URL);
	});

	test('should use the provided provider for not Mainnet network ', async () => {
		const newCTX = getFakeQueryContext(NetworkId['Mainnet-Ovm']);
		set(newCTX.provider as ethers.providers.JsonRpcProvider, 'getBlock', async () =>
			Promise.resolve({ baseFeePerGas: BigNumber.from(1500000000) })
		);

		const wrapper = getWrapper({
			defaultOptions: {
				queries: {
					// ✅ turns retries off
					retry: false,
				},
			},
		});

		const { result, waitFor } = renderHook(() => useEthGasPriceQuery(newCTX), { wrapper });

		await waitFor(() => result.current.isSuccess);
		expect(typeof result.current.data!.average).toBe('number');
		expect(result.current.data!.average).toBe(3200000000);
	});
});
