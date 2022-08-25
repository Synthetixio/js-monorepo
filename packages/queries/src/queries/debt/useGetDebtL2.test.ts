import { getFakeQueryContext, getWrapper } from '../../testUtils';
import { renderHook } from '@testing-library/react-hooks';
import useGetDebtL2 from './useGetDebtL2';
import { useGetDebtL1 } from '../../subgraph/queryFuncs';
import { getDefaultProvider } from '@ethersproject/providers';
jest.setTimeout(20000);

describe('@synthetixio/queries debt', () => {
  it.skip('useGetDebtL2', async () => {
    const ctx = getFakeQueryContext();
    const wrapper = getWrapper();
    const { result, waitFor } = renderHook(() => useGetDebtL2(ctx, getDefaultProvider()), {
      wrapper,
    });
    await waitFor(() => !!result.current.data?.length, { timeout: 20000 });
    // uncomment for current state of debt on L2
    /* 	result.current.data?.forEach((synth) =>
			console.log('L2', synth.symbol, synth.totalSupply.toString())
		); */
    expect(result.current.data![0].totalSupply.gt(1)).toEqual(true);
  });

  it.skip('useGetDebtL1', async () => {
    const ctx = getFakeQueryContext();
    const wrapper = getWrapper();
    const { result, waitFor } = renderHook(() => useGetDebtL1(ctx, getDefaultProvider()), {
      wrapper,
    });
    await waitFor(() => !!result.current.data?.length, { timeout: 20000 });

    // uncomment for current state of debt on L1
    /* 	result.current.data?.forEach((synth) =>
			console.log('L1', synth.symbol, synth.totalSupply.toString())
		); */
    expect(result.current.data![0].totalSupply.gt(1)).toEqual(true);
  });
});
