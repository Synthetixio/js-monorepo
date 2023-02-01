import { BigNumber } from '@ethersproject/bignumber';

describe('useOptimismLayer1Fee', () => {
  let useOptimismLayer1Fee;
  let reactQuery;
  let useNetwork;
  let getL1Fee;
  let serialize;

  beforeEach(async () => {
    getL1Fee = jest.fn(() => BigNumber.from(1));
    serialize = jest.fn(() => 'serialized txn');
    useNetwork = jest.fn(() => ({ id: 10, name: 'optimism', isSupported: true }));

    reactQuery = {
      useQuery: jest.fn(() => ({ data: undefined })),
    };
    const EthersContract = function () {
      return { getL1Fee };
    };

    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v3/useBlockchain', () => ({ useNetwork }));
    jest.doMock('@ethersproject/contracts', () => ({ Contract: EthersContract }));
    jest.doMock('@ethersproject/transactions', () => ({ serialize }));

    ({ useOptimismLayer1Fee } = await import('./useOptimismLayer1Fee'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined when populateTransaction is undefined', async () => {
    const populateTransaction = undefined;
    const result = useOptimismLayer1Fee({ populateTransaction });
    const { enabled } = reactQuery.useQuery.mock.lastCall[0];

    expect(enabled).toEqual(false);
    expect(result).toEqual({ data: undefined });
  });
  test('Returns undefined when networkId is not optimism', async () => {
    const populateTransaction = jest.fn();
    useNetwork.mockReturnValue({ id: 1, name: 'mainnet' });
    const result = useOptimismLayer1Fee({ populateTransaction });
    const { enabled } = reactQuery.useQuery.mock.lastCall[0];

    // Assert return query call is not enabled
    expect(enabled).toEqual(false);
    expect(result).toEqual({ data: undefined });
  });
  test('Queries are enabled and called correctly', async () => {
    const populateTransaction = jest
      .fn()
      .mockReturnValue({ from: 'vitalik', to: 'joey', data: 'lots of eth' });
    reactQuery.useQuery.mockReturnValueOnce({ data: BigNumber.from(1) });

    const result = useOptimismLayer1Fee({ populateTransaction });

    const { enabled, queryKey, queryFn } = reactQuery.useQuery.mock.lastCall[0];

    // Assert serialize query call is enabled
    expect(enabled).toEqual(true);

    // Assert last query call has correct query key
    expect(queryKey).toEqual(['optimism', expect.any(Function)]);

    await queryFn();

    expect(serialize).toBeCalledWith({ to: 'joey', data: 'lots of eth' });
    expect(getL1Fee).toBeCalledWith('serialized txn');
    expect(result).toEqual({ data: BigNumber.from(1) });
  });
});
