import { BigNumber } from '@ethersproject/bignumber';

const gasPricesMainnetMockData = {
  fastest: {
    maxPriorityFeePerGas: BigNumber.from(4),
    maxFeePerGas: BigNumber.from(14),
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
    jest.doMock('@snx-v2//useOptimismLayer1Fee', () => ({ useOptimismLayer1Fee }));

    ({ useGasOptions } = await import('./useGasOptions'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when populateTransaction is undefined', async () => {
    const populateTransaction = undefined;
    const getGasLimit = jest.fn();
    const result = useGasOptions({ populateTransaction, getGasLimit });
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual([
      getGasLimit.toString(),
      undefined,
      undefined,
      gasPricesMainnetMockData,
      1,
    ]);
    expect(options).toEqual({ enabled: false });
  });
  test('Returns undefined values when populate transaction is undefined', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = undefined;
    const result = useGasOptions({ populateTransaction, getGasLimit });
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual([
      undefined,
      populateTransaction.toString(),
      undefined,
      gasPricesMainnetMockData,
      1,
    ]);
    expect(options).toEqual({ enabled: false });
  });
  test('Returns gas options mainnet', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = jest.fn(() => BigNumber.from(20));

    useGasOptions({ populateTransaction, getGasLimit });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([
      getGasLimit.toString(),
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
  test('Returns gas options for optimism', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = jest.fn().mockReturnValue(BigNumber.from(20));
    react.useContext.mockReturnValue({ networkId: 10 });
    useGasPrice.mockReturnValue({ data: gasPricesOptimismMockData });
    useOptimismLayer1Fee.mockReturnValue({ data: BigNumber.from(1) });

    useGasOptions({ populateTransaction, getGasLimit });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([
      getGasLimit.toString(),
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
