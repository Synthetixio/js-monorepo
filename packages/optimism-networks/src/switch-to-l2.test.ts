/* eslint-disable @typescript-eslint/no-explicit-any */
import { switchToL2 } from '.';
import { METAMASK_MISSING_NETWORK_ERROR_CODE } from './constants';

describe('switchToL2', () => {
  test('Switch to Optimism mainnet when mainnet selected ', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x1',
      },
    } as any;

    await switchToL2(deps);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xa' }],
    });
  });
  test('Switch to Optimism Kovan when kovan selected ', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x2a',
      },
    } as any;

    await switchToL2(deps);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x45' }],
    });
  });
  test('Switch to Optimism Goerli when Goerli selected ', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x5',
      },
    } as any;

    await switchToL2(deps);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1a4' }],
    });
  });
  test('Switch to Optimism mainnet when unsupported network selected ', async () => {
    const requestMock = jest.fn().mockResolvedValue(undefined);
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x12345',
      },
    } as any;

    await switchToL2(deps);
    expect(requestMock).toBeCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xa' }],
    });
  });
  test('switchToL2 adds optimism network mainnet when needed', async () => {
    const requestMock = jest
      .fn()
      .mockRejectedValueOnce({ code: METAMASK_MISSING_NETWORK_ERROR_CODE }) // network missing in metamask
      .mockResolvedValueOnce(undefined); // added network call
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '0x1',
      },
    } as any;
    await switchToL2(deps);

    expect(requestMock).toBeCalledTimes(2);
    expect(requestMock).toHaveBeenNthCalledWith(1, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xa' }],
    });
    expect(requestMock).toHaveBeenNthCalledWith(2, {
      method: 'wallet_addEthereumChain',
      params: [
        {
          blockExplorerUrls: ['https://optimistic.etherscan.io'],
          chainId: '0xA',
          chainName: 'Optimism Mainnet',
          iconUrls: [
            'https://optimism.io/images/metamask_icon.svg',
            'https://optimism.io/images/metamask_icon.png',
          ],
          rpcUrls: ['https://mainnet.optimism.io'],
        },
      ],
    });
  });
  test('switchToL2 adds optimism gorli network when needed', async () => {
    const requestMock = jest
      .fn()
      .mockRejectedValueOnce({ code: METAMASK_MISSING_NETWORK_ERROR_CODE }) // network missing in metamask
      .mockResolvedValueOnce(undefined); // added network call
    const deps = {
      ethereum: {
        isMetaMask: true,
        request: requestMock,
        chainId: '5',
      },
    } as any;
    await switchToL2(deps);

    expect(requestMock).toBeCalledTimes(2);
    expect(requestMock).toHaveBeenNthCalledWith(1, {
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1a4' }],
    });
    expect(requestMock).toHaveBeenNthCalledWith(2, {
      method: 'wallet_addEthereumChain',
      params: [
        {
          blockExplorerUrls: ['https://goerli-optimistic.etherscan.io'],
          chainId: '0x1a4',
          chainName: 'Optimism Goerli',
          iconUrls: [
            'https://optimism.io/images/metamask_icon.svg',
            'https://optimism.io/images/metamask_icon.png',
          ],
          rpcUrls: ['https://goerli.optimism.io/'],
        },
      ],
    });
  });
});
