import { getFakeQueryContext, getWrapper } from '../testUtils';
import { renderHook } from '@testing-library/react-hooks';
import useGetDebtL2 from '../src/queries/debt/useGetDebtL2';

jest.setTimeout(20000);

describe('@synthetixio/queries debt', () => {
	it('useGetDentL2', async () => {
		const ctx = getFakeQueryContext();
		const wrapper = getWrapper();
		ctx.networkId = 10;
		const { result, waitFor } = renderHook(() => useGetDebtL2(ctx), {
			wrapper,
		});
		await waitFor(() => !!result.current.data?.length, { timeout: 20000 });

		expect(result.current.data![0].totalSupply.gt(1)).toEqual(true);
	});
});
