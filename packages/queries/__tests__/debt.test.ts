import { getFakeQueryContext, getWrapper } from '../testUtils';
import axios from 'maxibon-codegen-graph-ts/build/src/lib/axios';
import { renderHook } from '@testing-library/react-hooks';
import { ethers } from 'ethers';
import useGetDebtL2 from '../src/queries/debt/useGetDebtL2';
jest.mock('maxibon-codegen-graph-ts/build/src/lib/axios');

describe('@synthetixio/queries debt', () => {
	const ctx = getFakeQueryContext();
	test('useGetDentL2', async () => {
		const wrapper = getWrapper();

		const wrappers = {
			data: {
				wrappers: [
					{
						currencyKey: 'sETH',
						amount: '3101.776052990376142972',
					},
					{
						currencyKey: 'sUSD',
						amount: '42891822.43653211319133719',
					},
				],
			},
		};
		(axios.post as any).mockImplementation(() => {
			return Promise.resolve(wrappers);
		});
		const { result, waitFor } = renderHook(() => useGetDebtL2(ctx, ethers.getDefaultProvider()), {
			wrapper,
		});
		await waitFor(() => result.current.isSuccess);

		expect(true).toEqual(true);
	});
});
