import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { wei } from '@synthetixio/wei';

describe('useGasPrice', () => {
  let useGasPrice;
  let react;
  let reactQuery;
  let ContractContext;
  let synthetixContracts;
  let getBlockMock;
  let getGasPriceMock;

  beforeEach(async () => {
    react = {
      useContext: jest.fn(() => ({
        networkId: 1,
      })),
    };
    ContractContext = jest.fn();
    // needed to mock this since this module relies on SignerContext
    synthetixContracts = {
      NetworkIdByName: { mainnet: 1, 'mainnet-ovm': 10 },
    };
    getBlockMock = jest.fn();
    getGasPriceMock = jest.fn();

    const InfuraProvider = function () {
      return { getBlock: getBlockMock, getGasPrice: getGasPriceMock };
    };

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ContractContext);
    jest.doMock('@snx-v2/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@snx-v2/useSynthetixContracts', () => synthetixContracts);
    jest.doMock('@ethersproject/providers', () => ({ InfuraProvider }));

    ({ useGasPrice } = await import('./useGasPrice'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when network is undefined', async () => {
    react.useContext.mockReturnValue({ networkId: undefined });
    const result = useGasPrice();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual(['useGasPrice', undefined]);
    expect(options).toEqual({ enabled: false });
  });
  test('Returns gas prices for mainnet', async () => {
    const result = useGasPrice();
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual(['useGasPrice', 1]);
    expect(options).toEqual({ enabled: true });
    getBlockMock.mockReturnValue({ baseFeePerGas: wei(2, GWEI_DECIMALS).toBN() });
    const queryResult = await query();
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
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(result.data).toEqual(undefined);
    expect(cacheKey).toEqual(['useGasPrice', 10]);
    expect(options).toEqual({ enabled: true });
    getGasPriceMock.mockReturnValue(wei(2, GWEI_DECIMALS).toBN());
    const queryResult = await query();
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
