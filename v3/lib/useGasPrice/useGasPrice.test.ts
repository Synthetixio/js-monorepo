import { GWEI_DECIMALS } from '@snx-v3/constants';
import { wei } from '@synthetixio/wei';

describe('useGasPrice', () => {
  let useGasPrice;
  let react;
  let reactQuery;
  let useNetwork;
  let getBlockMock;
  let getGasPriceMock;

  beforeEach(async () => {
    getBlockMock = jest.fn();
    getGasPriceMock = jest.fn();
    useNetwork = jest.fn(() => ({ id: 10, name: 'optimism' }));

    const InfuraProvider = function () {
      return { getBlock: getBlockMock, getGasPrice: getGasPriceMock };
    };

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v3/useBlockchain', () => ({ useNetwork }));

    jest.doMock('@snx-v3/useGasPrice', () => ({ useGasPrice }));
    jest.doMock('@ethersproject/providers', () => ({ InfuraProvider }));

    ({ useGasPrice } = await import('./useGasPrice'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns gas prices for mainnet', async () => {
    useNetwork.mockReturnValue({ id: 1, name: 'mainnet' });
    const result = useGasPrice();
    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];

    expect(result.data).toEqual(undefined);
    expect(queryKey).toEqual(['mainnet', 'GasPrice']);
    expect(enabled).toEqual(true);
    getBlockMock.mockReturnValue({ baseFeePerGas: wei(2, GWEI_DECIMALS).toBN() });
    const queryResult = await queryFn();
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
    const result = useGasPrice();
    const { queryKey, queryFn, enabled } = reactQuery.useQuery.mock.lastCall[0];
    expect(result.data).toEqual(undefined);
    expect(queryKey).toEqual(['optimism', 'GasPrice']);
    expect(enabled).toEqual(true);
    getGasPriceMock.mockReturnValue(wei(2, GWEI_DECIMALS).toBN());
    const queryResult = await queryFn();
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
