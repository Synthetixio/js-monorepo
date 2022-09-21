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
    expect(result).toEqual({
      gasLimit: undefined,
      gasPriceForTransaction: {
        maxFeePerGas: BigNumber.from(14),
        maxPriorityFeePerGas: BigNumber.from(4),
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: undefined,
    });
  });
  test('Returns undefined values when populate transaction is undefined', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = undefined;
    const result = useGasOptions({ populateTransaction, getGasLimit });
    expect(result).toEqual({
      gasLimit: undefined,
      gasPriceForTransaction: {
        maxFeePerGas: BigNumber.from(14),
        maxPriorityFeePerGas: BigNumber.from(4),
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: undefined,
    });
  });
  test('Returns correct values for mainnet', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = jest.fn();
    // Mock gasLimitQuery
    reactQuery.useQuery.mockReturnValue({ data: BigNumber.from(20) });

    const result = useGasOptions({ populateTransaction, getGasLimit });

    expect(useGasPrice).toBeCalled();
    expect(useOptimismLayer1Fee).toBeCalled();
    // Assert results
    expect(result).toEqual({
      gasLimit: BigNumber.from(20),
      gasPriceForTransaction: {
        maxFeePerGas: BigNumber.from(14),
        maxPriorityFeePerGas: BigNumber.from(4),
      },
      gasPrices: gasPricesMainnetMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: undefined,
    });
  });
  test('Returns correct values for optimism', async () => {
    const populateTransaction = jest.fn();
    const getGasLimit = jest.fn();
    react.useContext.mockReturnValue({ networkId: 10 });
    useGasPrice.mockReturnValue({ data: gasPricesOptimismMockData });
    useOptimismLayer1Fee.mockReturnValue({ data: BigNumber.from(1) });
    // Mock gasLimitQuery
    reactQuery.useQuery.mockReturnValue({ data: BigNumber.from(20) });

    const result = useGasOptions({ populateTransaction, getGasLimit });

    expect(useGasPrice).toBeCalled();
    expect(useOptimismLayer1Fee).toBeCalled();

    // Assert results
    expect(result).toEqual({
      gasLimit: BigNumber.from(20),
      gasPriceForTransaction: {
        gasPrice: BigNumber.from(10),
      },
      gasPrices: gasPricesOptimismMockData,
      gasSpeed: 'average',
      optimismLayerOneFees: BigNumber.from(1),
    });
  });
});
