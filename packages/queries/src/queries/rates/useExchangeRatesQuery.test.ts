import useExchangeRatesQuery from './useExchangeRatesQuery';
import { getFakeQueryContext, getWrapper } from '../../testUtils';

import { renderHook } from '@testing-library/react-hooks';

import { set } from 'lodash';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';

describe('@synthetixio/queries rates', () => {
  const ctx = getFakeQueryContext();

  test('useExchangeRatesQuery', async () => {
    const wrapper = getWrapper();

    set(ctx.snxjs as any, 'contracts.SynthUtil.synthsRates', async () => [
      [formatBytes32String('sETH'), formatBytes32String('sBTC')],
      [wei(1000).toBN(), wei(10000).toBN()],
    ]);
    set(ctx.snxjs as any, 'contracts.ExchangeRates.ratesForCurrencies', async () => [
      wei(10).toBN(),
    ]);

    const { result, waitFor } = renderHook(() => useExchangeRatesQuery(ctx), { wrapper });
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      ETH: wei(1000),
      BTC: wei(10000),
      sETH: wei(1000),
      sBTC: wei(10000),
      SNX: wei(10),
    });
  });
});
