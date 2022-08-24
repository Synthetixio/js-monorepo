/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchToL1 } from '.';

describe('switchToL1', () => {
  test('Switch to mainnet when optimism mainnet selected', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const arg = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0xa',
      },
    } as any;

    await switchToL1(arg);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
  });
  test('Switch to kovan when optimism kovan selected', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const arg = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x45',
      },
    } as any;

    await switchToL1(arg);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x2a' }],
    });
  });
  test('Switch to gorli when optimism gorli is selected', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const arg = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x45',
      },
    } as any;

    await switchToL1(arg);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x2a' }],
    });
  });
  test('Switch to mainnet when unsupported network selected', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const arg = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x1234',
      },
    } as any;

    await switchToL1(arg);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
  });
});
