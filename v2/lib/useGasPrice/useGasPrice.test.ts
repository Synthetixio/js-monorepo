import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { wei } from '@synthetixio/wei';

describe.skip('useGasPrice', () => {
  let useGasPrice;
  let react;
  let reactQuery;
  let ContractContext;
  let SignerContext;
  let synthetixContracts;
  let getBlockMock;
  let getGasPriceMock;
  let useGlobalProvidersWithFallback;

  beforeEach(async () => {
    ContractContext = 'ContractContext';
    SignerContext = 'SignerContext';
    react = {
      useContext: jest.fn((context) => {
        return context === 'ContractContext'
          ? {
              networkId: 1,
            }
          : {};
      }),
    };
    // needed to mock this since this module relies on SignerContext
    synthetixContracts = {
      NetworkIdByName: { mainnet: 1, 'mainnet-ovm': 10 },
    };
    getBlockMock = jest.fn();
    getGasPriceMock = jest.fn();

    useGlobalProvidersWithFallback = jest.fn(() => ({
      globalProviders: {
        mainnet: { getBlock: getBlockMock, getGasPrice: getGasPriceMock },
        optimism: { getGasPrice: getGasPriceMock },
      },
    }));

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ({ ContractContext }));
    jest.doMock('@snx-v2/SignerContext', () => ({ SignerContext }));
    jest.doMock('@snx-v2/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@snx-v2/useSynthetixContracts', () => synthetixContracts);
    jest.doMock('@synthetixio/use-global-providers', () => ({
      useGlobalProvidersWithFallback,
    }));

    ({ useGasPrice } = await import('./useGasPrice'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when network is undefined', async () => {
    react.useContext.mockReturnValue({ networkId: undefined });
    const result = useGasPrice();
    const [args] = reactQuery.useQuery.mock.lastCall;

    expect(result.data).toEqual(undefined);
    expect(args.queryKey).toEqual([
      'useGasPrice',
      { networkId: undefined, walletAddress: undefined },
    ]);
    expect(args.enabled).toEqual(false);
  });
  test('Returns gas prices for mainnet', async () => {
    const result = useGasPrice();
    const [args] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(args.queryKey).toEqual(['useGasPrice', { networkId: 1, walletAddress: undefined }]);
    expect(args.enabled).toEqual(true);
    getBlockMock.mockReturnValue({ baseFeePerGas: wei(2, GWEI_DECIMALS).toBN() });
    const queryResult = await args.queryFn();
    expect(queryResult).toEqual({
      average: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(6, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
      },
      fast: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(8, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(4, GWEI_DECIMALS).toBN(),
      },
      fastest: {
        baseFeePerGas: wei(2, GWEI_DECIMALS).toBN(),
        maxFeePerGas: wei(10, GWEI_DECIMALS).toBN(),
        maxPriorityFeePerGas: wei(6, GWEI_DECIMALS).toBN(),
      },
    });
    expect(getBlockMock).toBeCalledWith('latest');
  });
  test('Returns gas prices for optimism', async () => {
    react.useContext.mockReturnValue({ networkId: 10 });

    const result = useGasPrice();
    const [args] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(args.queryKey).toEqual(['useGasPrice', { networkId: 10, walletAddress: undefined }]);
    expect(args.enabled).toEqual(true);
    getGasPriceMock.mockReturnValue(wei(2, GWEI_DECIMALS).toBN());
    const queryResult = await args.queryFn();
    expect(getGasPriceMock).toBeCalled();

    expect(queryResult).toEqual({
      average: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
      fast: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
      fastest: {
        gasPrice: wei(2, GWEI_DECIMALS).toBN(),
      },
    });
  });
});
