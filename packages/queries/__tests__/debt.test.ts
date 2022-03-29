import { getFakeQueryContext, getWrapper } from '../testUtils';
import { renderHook } from '@testing-library/react-hooks';
import useGetDebtL2 from '../src/queries/debt/useGetDebtL2';
import { useGetDebtL1 } from '../generated/queryFuncs';
import synthetix from '@synthetixio/contracts-interface';
import { providers } from 'ethers';

jest.setTimeout(20000);

describe('@synthetixio/queries debt', () => {
	it.skip('useGetDentL2', async () => {
		const ctx = getFakeQueryContext();
		const wrapper = getWrapper();
		ctx.networkId = 10;
		const { result, waitFor } = renderHook(() => useGetDebtL2(ctx), {
			wrapper,
		});
		await waitFor(() => !!result.current.data?.length, { timeout: 20000 });
		// uncomment for current state of debt on L2
		/* result.current.data?.forEach((synth) =>
			console.log(synth.symbol, synth.totalSupply.toString())
		); */
		expect(result.current.data![0].totalSupply.gt(1)).toEqual(true);
	});

	it.skip('useGetDentL1', async () => {
		const ctx = getFakeQueryContext();
		const wrapper = getWrapper();
		ctx.networkId = 1;

		const { result, waitFor } = renderHook(() => useGetDebtL1(ctx), {
			wrapper,
		});
		await waitFor(() => !!result.current.data?.length, { timeout: 20000 });

		// uncomment for current state of debt on L1
		/* result.current.data?.forEach((synth) =>
			console.log(synth.symbol, synth.totalSupply.toString())
		); */
		expect(result.current.data![0].totalSupply.gt(1)).toEqual(true);
	});
});
