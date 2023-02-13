import { BigNumber } from '@ethersproject/bignumber';
import { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v3/Constants';

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
  let getGasPrice;
  let reactQuery;
  let useOptimismLayer1Fee;
  let populateTransaction;
  let useNetwork;
  let useEthPrice;
  let useGasSpeed;

  beforeEach(async () => {
    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };
    useNetwork = jest.fn(() => ({ id: 1, name: 'mainnet' }));
    useEthPrice = jest.fn(() => ({ data: wei(1000) }));
    useOptimismLayer1Fee = jest.fn(() => ({ data: undefined }));
    getGasPrice = jest.fn(() => gasPricesMainnetMockData);
    useGasSpeed = jest.fn(() => ({ gasSpeed: 'average' }));

    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v3/useEthPrice', () => ({ useEthPrice }));
    jest.doMock('@snx-v3/useBlockchain', () => ({ useNetwork }));
    jest.doMock('@snx-v3/useGasPrice', () => ({ getGasPrice }));
    jest.doMock('@snx-v3/useOptimismLayer1Fee', () => ({ useOptimismLayer1Fee }));
    jest.doMock('@snx-v3/useGasSpeed', () => ({ useGasSpeed }));

    populateTransaction = jest.fn(() => Promise.resolve(populatedTransaction));

    ({ useGasOptions } = await import('./useGasOptions'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when populateTransaction is undefined', async () => {
    const populateTransaction = undefined;
    const result = useGasOptions({ populateTransaction });
    const { queryKey, enabled } = reactQuery.useQuery.mock.lastCall[0];
    expect(result.data).toEqual(undefined);
    expect(queryKey).toEqual([undefined, 1, 'average', undefined, 1000]);
    expect(enabled).toEqual(false);
  });

  test('Returns gas options mainnet', async () => {
    useGasOptions({ populateTransaction, queryKeys: ['mykey'] });
    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];

    expect(queryKey).toEqual(['mykey', undefined, 1, 'average', undefined, 1000]);
    expect(enabled).toEqual(true);

    const queryResult = await queryFn();
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
    getGasPrice.mockReturnValue(gasPricesOptimismMockData);
    useOptimismLayer1Fee.mockReturnValue({ data: wei(0.00000001) });

    useGasOptions({ populateTransaction });

    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];
    expect(queryKey).toEqual([0.00000001, 10, 'average', undefined, 1000]);
    expect(enabled).toEqual(true);

    const queryResult = await queryFn();
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
