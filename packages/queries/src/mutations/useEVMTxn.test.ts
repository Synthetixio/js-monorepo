/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks';
import { BigNumber } from '@ethersproject/bignumber';
import { getWrapper } from '../testUtils';
import useEVMTxn from './useEVMTxn';

describe('useEVMTxn', () => {
  test('Does not call estimateGas when txn is null', async () => {
    const estimateGasMock = jest.fn().mockResolvedValue(10);
    const sendTransactionMock = jest.fn();

    const mockCTX = {
      signer: {
        estimateGas: estimateGasMock,
        sendTransaction: sendTransactionMock,
      },
    };

    const wrapper = getWrapper();

    const hookResult = renderHook(() => useEVMTxn(mockCTX as any, null), {
      wrapper,
    });
    try {
      // We do not expect any state update so this should timeout
      await hookResult.waitForNextUpdate({ timeout: 100 });
    } catch (error) {
      expect(error).toBeDefined();
      expect(estimateGasMock).not.toBeCalled();
    }
  });
  test('Does not call estimateGas twice when the txn is the same', async () => {
    const estimateGasMock = jest.fn().mockResolvedValue(10);
    const sendTransactionMock = jest.fn();

    const mockCTX = {
      signer: {
        estimateGas: estimateGasMock,
        sendTransaction: sendTransactionMock,
      },
    };

    const wrapper = getWrapper();
    const hookResult = renderHook(
      () =>
        useEVMTxn(mockCTX as any, {
          data: 'byte',
          value: BigNumber.from(10),
          nonce: undefined,
          from: '1',
          to: '2',
        }),
      {
        wrapper,
      }
    );
    await hookResult.waitForNextUpdate();

    expect(estimateGasMock).toBeCalledTimes(1);
    expect(estimateGasMock).toBeCalledWith({
      data: 'byte',
      value: BigNumber.from(10),
      nonce: undefined,
      from: '1',
      to: '2',
    });
    expect(hookResult.result.current.gasLimit?.toString()).toBe('10');

    // This asserts a infinity rerender bug we had due to not calling toString on txn.value,
    // without calling toString we will end up in a infinity loop and this will fail
    hookResult.rerender();
    expect(estimateGasMock).toBeCalledTimes(1);
  });
});
