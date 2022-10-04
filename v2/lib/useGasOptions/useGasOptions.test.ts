import { BigNumber } from '@ethersproject/bignumber';

const gasPricesMainnetMockData = {
  fastest: {
    maxPriorityFeePerGas: BigNumber.from(8),
    maxFeePerGas: BigNumber.from(18),
    baseFeePerGas: BigNumber.from(10),
  },
  fast: {
    maxPriorityFeePerGas: BigNumber.from(4),
    maxFeePerGas: BigNumber.from(14),
    baseFeePerGas: BigNumber.from(10),
  },
  average: {
    maxPriorityFeePerGas: BigNumber.from(4),
    maxFeePerGas: BigNumber.from(14),
    baseFeePerGas: BigNumber.from(10),
  },
};
const gasPricesOptimismMockData = {
  fastest: { gasPrice: BigNumber.from(10) },
  fast: { gasPrice: BigNumber.from(10) },
  average: { gasPrice: BigNumber.from(10) },
};
describe('useGasOptions', () => {
  let useGasOptions;
  let useGasPrice;
  let react;
  let reactQuery;
  let ContractContext;
  let useOptimismLayer1Fee;

  beforeEach(async () => {
    react = {
      useContext: jest.fn(() => ({
        networkId: 1,
        gasSpeed: 'average',
      })),
    };
    ContractContext = jest.fn();

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };
    useOptimismLayer1Fee = jest.fn(() => ({ data: undefined }));
    useGasPrice = jest.fn(() => ({
      data: gasPricesMainnetMockData,
    }));
    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ContractContext);
    jest.doMock('@snx-v2/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@snx-v2/GasSpeedContext', () => ({ gasSpeed: 'average' }));
    jest.doMock('@snx-v2//useOptimismLayer1Fee', () => ({ useOptimismLayer1Fee }));

    ({ useGasOptions } = await import('./useGasOptions'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when populateTransaction is undefined', async () => {
    const populateTransaction = undefined;
    const result = useGasOptions({ populateTransaction });
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual([undefined, undefined, gasPricesMainnetMockData, 1]);
    expect(options).toEqual({ enabled: false });
  });

  test('Returns gas options mainnet', async () => {
    const populateTransaction = jest.fn().mockResolvedValue({ gasLimit: BigNumber.from(20) });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([
      populateTransaction.toString(),
      undefined,
      gasPricesMainnetMockData,
      1,
    ]);
    expect(options).toEqual({ enabled: true });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: BigNumber.from(24),
      gasOptionsForTransaction: {
        maxFeePerGas: BigNumber.from(14),
        maxPriorityFeePerGas: BigNumber.from(4),
        gasLimit: BigNumber.from(24),
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: undefined,
    });
  });
  test('Returns gas options mainnet when gasSpeed is fastest', async () => {
    react.useContext.mockReturnValue({ networkId: 1, gasSpeed: 'fastest' });
    const populateTransaction = jest.fn().mockResolvedValue({ gasLimit: BigNumber.from(20) });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([
      populateTransaction.toString(),
      undefined,
      gasPricesMainnetMockData,
      1,
    ]);
    expect(options).toEqual({ enabled: true });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: BigNumber.from(24),
      gasOptionsForTransaction: {
        maxFeePerGas: BigNumber.from(18),
        maxPriorityFeePerGas: BigNumber.from(8),
        gasLimit: BigNumber.from(24),
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'fastest',
      optimismLayerOneFees: undefined,
    });
  });
  test('Returns gas options for optimism', async () => {
    const populateTransaction = jest.fn().mockResolvedValue({ gasLimit: BigNumber.from(20) });
    react.useContext.mockReturnValue({ networkId: 10, gasSpeed: 'average' });
    useGasPrice.mockReturnValue({ data: gasPricesOptimismMockData });
    useOptimismLayer1Fee.mockReturnValue({ data: BigNumber.from(1) });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([
      populateTransaction.toString(),
      BigNumber.from(1),
      gasPricesOptimismMockData,
      10,
    ]);
    expect(options).toEqual({ enabled: true });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: BigNumber.from(24),
      gasOptionsForTransaction: {
        gasPrice: BigNumber.from(10),
        gasLimit: BigNumber.from(24),
      },
      gasPrices: gasPricesOptimismMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: BigNumber.from(1),
    });
  });
});
