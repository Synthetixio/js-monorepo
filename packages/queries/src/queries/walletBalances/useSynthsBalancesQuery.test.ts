import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { formatBytes32String } from '@ethersproject/strings';
import { AddressZero } from '@ethersproject/constants';
import { set } from 'lodash';
import useSynthsBalancesQuery from './useSynthsBalancesQuery';
import { getFakeQueryContext, getWrapper } from '../../testUtils';

describe('@synthetixio/queries walletBalances', () => {
  const ctx = getFakeQueryContext();

  test('useSynthsBalancesQuery', async () => {
    const wrapper = getWrapper();

    const fakeBTCValue = wei(10000);
    const fakeETHValue = wei(1000);

    set(ctx.snxjs as any, 'contracts.SynthUtil.synthsBalances', async () => [
      ['sUSD', 'sETH', 'sBTC'].map(formatBytes32String),
      [wei(100), wei(1), wei(0.2)].map((v) => v.toBN()),
      [wei(100), wei(1).mul(fakeETHValue), wei(0.2).mul(fakeBTCValue)].map((v) => v.toBN()),
    ]);

    const { result, waitFor } = renderHook(() => useSynthsBalancesQuery(ctx, AddressZero), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
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
