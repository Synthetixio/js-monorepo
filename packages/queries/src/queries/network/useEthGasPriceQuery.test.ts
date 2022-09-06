import { wei } from '@synthetixio/wei';

describe('@synthetixio/queries network useEthGasPriceQuery', () => {
  let useEthGasPriceQuery;
  let computeGasFee;
  let reactQuery;

  beforeEach(async () => {
    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react-query', () => reactQuery);

    ({ default: useEthGasPriceQuery, computeGasFee } = await import('./useEthGasPriceQuery'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Should query getGasPrice from provider if network is not mainnet', async () => {
    const ctx = {
      networkId: 666,
      provider: {},
    };
    useEthGasPriceQuery(ctx);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;

    expect(cacheKey).toEqual(['network', 'gasPrice', 666]);
    expect(options.enabled).toEqual(true);

    const defaultGasPrice = wei(0.015, 9).toBN();
    ctx.provider = {
      getGasPrice: jest.fn(() => Promise.resolve(defaultGasPrice)),
    };

    const result = await query();

    expect(result).toEqual({
      fastest: { gasPrice: defaultGasPrice },
      fast: { gasPrice: defaultGasPrice },
      average: { gasPrice: defaultGasPrice },
    });
  });

  test('Should throw an error if getGasPrice fails', async () => {
    const ctx = {
      networkId: 666,
      provider: {},
    };
    useEthGasPriceQuery(ctx);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;

    expect(cacheKey).toEqual(['network', 'gasPrice', 666]);
    expect(options.enabled).toEqual(true);

    ctx.provider = {
      getGasPrice: jest.fn(() => Promise.reject('OMG')),
    };
    expect(query()).rejects.toEqual(Error('Could not retrieve gas price from provider'));
  });

  test('computeGasFee', () => {
    const baseFeePerGas = wei(10, 9).toBN();
    const maxPriorityFeePerGas = 2;
    const result = computeGasFee(baseFeePerGas, maxPriorityFeePerGas);
    expect(result.maxPriorityFeePerGas.toString()).toEqual('2000000000'); // 2e9
    // expects multiplier to be set to 2
    expect(result.maxFeePerGas.toString()).toEqual('22000000000'); // 10e9 * 2 + 2e9)
  });

  test('Should use EIP1559 logic if network is Mainnet', async () => {
    const ctx = {
      networkId: 1,
      provider: {},
    };
    useEthGasPriceQuery(ctx);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;

    expect(cacheKey).toEqual(['network', 'gasPrice', 1]);
    expect(options.enabled).toEqual(true);

    const baseFeePerGas = wei(100, 9).toBN();
    ctx.provider = {
      getBlock: jest.fn(() => Promise.resolve({ baseFeePerGas })),
    };

    const result = await query();

    expect(result).toEqual({
      fastest: computeGasFee(baseFeePerGas, 6),
      fast: computeGasFee(baseFeePerGas, 4),
      average: computeGasFee(baseFeePerGas, 2),
    });

    return;
  });

  test.only('Should fallback to getting gas from provider if baseFeePerGas not available on  Mainnet', async () => {
    const ctx = {
      networkId: 1,
      provider: {},
    };
    useEthGasPriceQuery(ctx);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;

    expect(cacheKey).toEqual(['network', 'gasPrice', 1]);
    expect(options.enabled).toEqual(true);

    const defaultGasPrice = wei(100, 9).toBN();
    ctx.provider = {
      getBlock: jest.fn(() => Promise.resolve({ nothing: 'here' })),
      getGasPrice: jest.fn(() => Promise.resolve(defaultGasPrice)),
    };

    const result = await query();

    expect(result).toEqual({
      fastest: { gasPrice: defaultGasPrice },
      fast: { gasPrice: defaultGasPrice },
      average: { gasPrice: defaultGasPrice },
    });
  });
});
