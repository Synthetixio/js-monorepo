import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';

describe('@synthetixio/queries walletBalances', () => {
  let useSynthsBalancesQuery;
  let reactQuery;

  beforeEach(async () => {
    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('@tanstack/react-query', () => reactQuery);

    ({ default: useSynthsBalancesQuery } = await import('./useSynthsBalancesQuery'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('useSynthsBalancesQuery', async () => {
    const ctx = {
      networkId: 666,
      snxjs: {
        contracts: {},
      },
    };
    const walletAddress = '0xFEE';
    await useSynthsBalancesQuery(ctx, walletAddress);
    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['walletBalances', 'synths', 666, '0xFEE']);
    expect(options.enabled).toEqual(true);

    const fakeBTCValue = wei(10000);
    const fakeETHValue = wei(1000);

    const currencyKeys = ['sUSD', 'sETH', 'sBTC'].map(formatBytes32String);
    const synthsBalances = [wei(100), wei(1), wei(0.2)].map((v) => v.toBN());
    const synthsUSDBalances = [wei(100), wei(1).mul(fakeETHValue), wei(0.2).mul(fakeBTCValue)].map(
      (v) => v.toBN()
    );
    ctx.snxjs.contracts = {
      SynthUtil: {
        synthsBalances: jest.fn(() =>
          Promise.resolve([currencyKeys, synthsBalances, synthsUSDBalances])
        ),
      },
    };

    const result = await query();

    expect(result).toEqual({
      balancesMap: {
        sUSD: {
          currencyKey: 'sUSD',
          balance: wei(100),
          usdBalance: wei(100),
        },
        sETH: {
          currencyKey: 'sETH',
          balance: wei(1),
          usdBalance: wei(1).mul(fakeETHValue),
        },
        sBTC: {
          currencyKey: 'sBTC',
          balance: wei(0.2),
          usdBalance: wei(0.2).mul(fakeBTCValue),
        },
      },
      balances: [
        {
          currencyKey: 'sBTC',
          balance: wei(0.2),
          usdBalance: wei(0.2).mul(fakeBTCValue),
        },
        {
          currencyKey: 'sETH',
          balance: wei(1),
          usdBalance: wei(1).mul(fakeETHValue),
        },
        {
          currencyKey: 'sUSD',
          balance: wei(100),
          usdBalance: wei(100),
        },
      ],
      totalUSDBalance: wei(3100),
    });
  });
});
