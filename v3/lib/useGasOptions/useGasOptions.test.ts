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
  let reactQuery;
  let useOptimismLayer1Fee;
  let populateTransaction;
  let useNetwork;

  beforeEach(async () => {
    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };
    useNetwork = jest.fn(() => ({ id: 1, name: 'mainnet' }));

    useOptimismLayer1Fee = jest.fn(() => ({ data: undefined }));
    useGasPrice = jest.fn(() => ({
      data: gasPricesMainnetMockData,
    }));
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v3/useBlockchain', () => ({ useNetwork }));
    jest.doMock('@snx-v3/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@snx-v3/useOptimismLayer1Fee', () => ({ useOptimismLayer1Fee }));

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
    expect(options).toEqual({ enabled: false });
  });

  test('Returns gas options mainnet', async () => {
    useGasOptions({ populateTransaction, queryKeys: ['mykey'] });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['mykey', undefined, gasPricesMainnetMockData, 1, 'average']);
    expect(options).toEqual({ enabled: true });

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

  test('Returns gas options for optimism', async () => {
    useNetwork.mockReturnValue({ name: 'optimism-mainnet', id: 10 });
    useGasPrice.mockReturnValue({ data: gasPricesOptimismMockData });
    useOptimismLayer1Fee.mockReturnValue({ data: wei(0.00000001) });

    useGasOptions({ populateTransaction });

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual([wei(0.00000001), gasPricesOptimismMockData, 10, 'average']);
    expect(options).toEqual({ enabled: true });

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
