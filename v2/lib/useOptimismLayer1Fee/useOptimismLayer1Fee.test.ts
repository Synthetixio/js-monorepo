import { BigNumber } from '@ethersproject/bignumber';

describe('useOptimismLayer1Fee', () => {
  let useOptimismLayer1Fee;
  let react;
  let reactQuery;
  let ContractContext;
  let synthetixContracts;
  let getL1Fee;
  let serialize;
  let useGlobalProvidersWithFallback;

  beforeEach(async () => {
    react = {
      useContext: jest.fn(() => ({
        networkId: 10,
      })),
    };
    getL1Fee = jest.fn(() => BigNumber.from(1));
    serialize = jest.fn(() => 'serialized txn');
    ContractContext = jest.fn();
    // needed to mock this since this module relies on SignerContext
    synthetixContracts = {
      NetworkIdByName: { mainnet: 1, 'mainnet-ovm': 10 },
    };
    reactQuery = {
      useQuery: jest.fn(() => ({ data: undefined })),
    };
    useGlobalProvidersWithFallback = jest.fn(() => {
      return {
        globalProviders: {
          mainnet: {},
        },
        usingInfura: true,
        toggleRpc: jest.fn(),
      };
    });

    const EthersContract = function () {
      return { getL1Fee };
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ContractContext);
    jest.doMock('@snx-v2/useSynthetixContracts', () => synthetixContracts);
    jest.doMock('@synthetixio/useGlobalProvidersWithFallback', () => ({
      useGlobalProvidersWithFallback,
    }));
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
    // Assert return query call is not enabled
    const [arg] = reactQuery.useQuery.mock.lastCall;
    expect(arg.enabled).toBe(false);
    expect(arg.queryKey).toEqual(['useOptimismLayer1Fee', 10, undefined, true]);

    expect(result).toEqual({ data: undefined });
  });
  test('Returns undefined when networkId is not optimism', async () => {
    const populateTransaction = jest.fn();
    react.useContext.mockReturnValue({ networkId: 1 });
    const result = useOptimismLayer1Fee({ populateTransaction });
    const [arg] = reactQuery.useQuery.mock.lastCall;
    expect(arg.enabled).toBe(false);

    expect(result).toEqual({ data: undefined });
  });
  test('Queries are enabled and called correctly', async () => {
    const populateTransaction = jest
      .fn()
      .mockReturnValue({ from: 'vitalik', to: 'joey', data: 'lots of eth' });
    reactQuery.useQuery.mockReturnValueOnce({ data: BigNumber.from(1) });

    const result = useOptimismLayer1Fee({ populateTransaction });
    const [arg] = reactQuery.useQuery.mock.lastCall;
    expect(arg.enabled).toBe(true);
    expect(arg.queryKey).toEqual(['useOptimismLayer1Fee', 10, expect.any(Function), true]);

    await arg.queryFn();

    expect(serialize).toBeCalledWith({ to: 'joey', data: 'lots of eth' });
    expect(getL1Fee).toBeCalledWith('serialized txn');
    expect(result).toEqual({ data: BigNumber.from(1) });
  });
});
