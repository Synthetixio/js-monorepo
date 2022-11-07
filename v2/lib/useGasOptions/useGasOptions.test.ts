import { BigNumber } from '@ethersproject/bignumber';
import { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v2/Constants';

const gasPricesMainnetMockData = {
  fastest: {
    maxPriorityFeePerGas: wei(8, GWEI_DECIMALS, true).toBN(),
    maxFeePerGas: wei(18, GWEI_DECIMALS, true).toBN(),
    baseFeePerGas: wei(10, GWEI_DECIMALS, true).toBN(),
  },
  fast: {
    maxPriorityFeePerGas: wei(4, GWEI_DECIMALS, true).toBN(),
    maxFeePerGas: wei(14, GWEI_DECIMALS, true).toBN(),
    baseFeePerGas: wei(10, GWEI_DECIMALS, true).toBN(),
  },
  average: {
    maxPriorityFeePerGas: wei(4, GWEI_DECIMALS, true).toBN(),
    maxFeePerGas: wei(14, GWEI_DECIMALS, true).toBN(),
    baseFeePerGas: wei(10, GWEI_DECIMALS, true).toBN(),
  },
};

const gasPricesOptimismMockData = {
  fastest: { gasPrice: wei(10, GWEI_DECIMALS, true).toBN() },
  fast: { gasPrice: wei(10, GWEI_DECIMALS, true).toBN() },
  average: { gasPrice: wei(10, GWEI_DECIMALS, true).toBN() },
};

const populatedTransaction = {
  gasLimit: wei(500000, GWEI_DECIMALS).toBN(),
};

describe('useGasOptions', () => {
  let useGasOptions;
  let useGasPrice;
  let react;
  let reactQuery;
  let ContractContext;
  let useOptimismLayer1Fee;
  let useExchangeRatesData;
  let populateTransaction;

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
    useExchangeRatesData = jest.fn(() => ({ data: { ETH: wei(1000) } }));
    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ContractContext);
    jest.doMock('@snx-v2/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@snx-v2/GasSpeedContext', () => ({ gasSpeed: 'average' }));
    jest.doMock('@snx-v2/useOptimismLayer1Fee', () => ({ useOptimismLayer1Fee }));
    jest.doMock('@snx-v2/useExchangeRatesData', () => ({ useExchangeRatesData }));

    populateTransaction = jest.fn(() => Promise.resolve(populatedTransaction));

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
    expect(cacheKey).toEqual([undefined, gasPricesMainnetMockData, 1, 'average']);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });

  test('Returns gas options mainnet', async () => {
    useGasOptions({ populateTransaction, queryKeys: ['mykey'] });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['mykey', undefined, gasPricesMainnetMockData, 1, 'average']);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      gasOptionsForTransaction: {
        maxFeePerGas: wei(14, GWEI_DECIMALS, true).toBN(),
        maxPriorityFeePerGas: wei(4, GWEI_DECIMALS, true).toBN(),
        gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: undefined,
      transactionPrice: wei(8.4, GWEI_DECIMALS), // 7 * 1.2
      populatedTransaction,
    });
  });

  test('Returns gas options mainnet when gasSpeed is fastest', async () => {
    react.useContext.mockReturnValue({ networkId: 1, gasSpeed: 'fastest' });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([undefined, gasPricesMainnetMockData, 1, 'fastest']);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      gasOptionsForTransaction: {
        maxFeePerGas: BigNumber.from(18),
        maxPriorityFeePerGas: BigNumber.from(8),
        gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'fastest',
      optimismLayerOneFees: undefined,
      transactionPrice: wei(10.8, GWEI_DECIMALS), // 9 * 1.2
      populatedTransaction,
    });
  });

  test('Returns gas options for optimism', async () => {
    react.useContext.mockReturnValue({ networkId: 10, gasSpeed: 'average' });
    useGasPrice.mockReturnValue({ data: gasPricesOptimismMockData });
    useOptimismLayer1Fee.mockReturnValue({ data: wei(0.00000001) });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([wei(0.00000001), gasPricesOptimismMockData, 10, 'average']);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      gasOptionsForTransaction: {
        gasPrice: BigNumber.from(10),
        gasLimit: wei(600000, GWEI_DECIMALS).toBN(), // 500000 * 1.2
      },
      gasPrices: gasPricesOptimismMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: wei(0.00000001),
      transactionPrice: wei(6.00001, GWEI_DECIMALS), //5.00001 * 1.2
      populatedTransaction,
    });
  });
});
