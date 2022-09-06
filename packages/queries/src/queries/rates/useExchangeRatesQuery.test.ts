import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';

describe('@synthetixio/queries rates', () => {
  let useExchangeRatesQuery;
  let reactQuery;

  beforeEach(async () => {
    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react-query', () => reactQuery);

    ({ default: useExchangeRatesQuery } = await import('./useExchangeRatesQuery'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('useExchangeRatesQuery', async () => {
    const ctx = {
      networkId: 666,
      snxjs: {
        contracts: {},
      },
    };

    const walletAddress = '0xFEE';
    await useExchangeRatesQuery(ctx, walletAddress);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['rates', 'exchangeRates', 666]);
    expect(options.enabled).toEqual(true);

    const currencyKeys = ['sETH', 'sBTC'].map(formatBytes32String);
    const synthRates = [wei(1000), wei(10000)].map((v) => v.toBN());
    ctx.snxjs.contracts = {
      SynthUtil: {
        synthsRates: jest.fn(() => Promise.resolve([currencyKeys, synthRates])),
      },
      ExchangeRates: {
        ratesForCurrencies: jest.fn(() => Promise.resolve([wei(10).toBN()])),
      },
    };

    const result = await query();

    expect(result).toEqual({
      ETH: wei(1000),
      BTC: wei(10000),
      sETH: wei(1000),
      sBTC: wei(10000),
      SNX: wei(10),
    });
  });
});
