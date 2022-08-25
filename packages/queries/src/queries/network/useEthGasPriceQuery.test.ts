import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { BigNumber } from '@ethersproject/bignumber';
import useEthGasPriceQuery, { computeGasFee } from './useEthGasPriceQuery';
import { getFakeQueryContext, getWrapper } from '../../testUtils';

describe('@synthetixio/queries network useEthGasPriceQuery', () => {
  test('Should query getGasPrice from provider if network is Optimism', async () => {
    const ctx = getFakeQueryContext();
    ctx.networkId = NetworkIdByName['mainnet-ovm'];
    const wrapper = getWrapper();
    // set to 0.015 gwei
    const defaultGasPrice = wei(0.015, 9).toBN();
    //mock provider
    ctx.provider!.getGasPrice = jest.fn().mockResolvedValue(defaultGasPrice);

    const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      fastest: { gasPrice: defaultGasPrice },
      fast: { gasPrice: defaultGasPrice },
      average: { gasPrice: defaultGasPrice },
    });
  });

  test('Should query getGasPrice from provider if network is Kovan', async () => {
    const ctx = getFakeQueryContext();
    ctx.networkId = NetworkIdByName.kovan;
    const wrapper = getWrapper();
    // set to 0.015 gwei
    const defaultGasPrice = wei(0.015, 9).toBN();
    //mock provider
    ctx.provider!.getGasPrice = jest.fn().mockResolvedValue(defaultGasPrice);

    const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      fastest: { gasPrice: defaultGasPrice },
      fast: { gasPrice: defaultGasPrice },
      average: { gasPrice: defaultGasPrice },
    });
  });
  test('Should query getGasPrice from provider if network is Goerli', async () => {
    const ctx = getFakeQueryContext();
    ctx.networkId = NetworkIdByName.kovan;
    const wrapper = getWrapper();
    // set to 0.015 gwei
    const defaultGasPrice = wei(0.015, 9).toBN();
    //mock provider

    ctx.provider!.getGasPrice = jest.fn().mockResolvedValue(defaultGasPrice);
    const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      fastest: { gasPrice: defaultGasPrice },
      fast: { gasPrice: defaultGasPrice },
      average: { gasPrice: defaultGasPrice },
    });
  });

  test('Should throw an error if getGasPrice fails', async () => {
    const ctx = getFakeQueryContext();
    ctx.networkId = NetworkIdByName['mainnet-ovm'];
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
    expect(result.current.error?.message).toContain('Could not retrieve gas price from provider');
  });

  test('computeGasFee works', () => {
    const baseFeePerGas = wei(10, 9).toBN();
    const maxPriorityFeePerGas = 2;
    const result = computeGasFee(baseFeePerGas, maxPriorityFeePerGas);
    expect(result.maxPriorityFeePerGas.toString()).toEqual('2000000000'); // 2e9
    // expects multiplier to be set to 2
    expect(result.maxFeePerGas.toString()).toEqual('22000000000'); // 10e9 * 2 + 2e9)
  });

  test('Should use EIP1559 logic if network is Mainnet', async () => {
    const ctx = getFakeQueryContext();
    ctx.networkId = NetworkIdByName.mainnet;
    const wrapper = getWrapper();
    // set to 100 gwei
    const defaultBaseFeePerGas = wei(100, 9).toBN();
    //mock provider
    ctx.provider!.getBlock = jest.fn().mockResolvedValue({ baseFeePerGas: defaultBaseFeePerGas });

    const { result, waitFor } = renderHook(() => useEthGasPriceQuery(ctx), { wrapper });

    await waitFor(() => result.current.isSuccess);

    const block = await ctx.provider?.getBlock('latest');

    expect(result.current.data).toEqual({
      fastest: computeGasFee(block?.baseFeePerGas ?? BigNumber.from(0), 6),
      fast: computeGasFee(block?.baseFeePerGas ?? BigNumber.from(0), 4),
      average: computeGasFee(block?.baseFeePerGas ?? BigNumber.from(0), 2),
    });
  });
});
