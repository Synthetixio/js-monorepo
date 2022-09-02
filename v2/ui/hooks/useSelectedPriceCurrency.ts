import type { Wei } from '@synthetixio/wei';
import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';
import { priceCurrencyState } from 'store/app';
import useSynthetixQueries from '@synthetixio/queries';

const useSelectedPriceCurrency = () => {
  const selectedPriceCurrency = useRecoilValue(priceCurrencyState);

  const { useExchangeRatesQuery } = useSynthetixQueries();
  const exchangeRatesQuery = useExchangeRatesQuery();

  const exchangeRates = exchangeRatesQuery.data ?? null;
  const selectPriceCurrencyRate = exchangeRates
    ? exchangeRates[selectedPriceCurrency.name]
    : undefined;

  const getPriceAtCurrentRate = useCallback(
    (price: Wei): Wei => (selectPriceCurrencyRate ? price.div(selectPriceCurrencyRate) : price),
    [selectPriceCurrencyRate]
  );

  return {
    selectPriceCurrencyRate,
    selectedPriceCurrency,
    getPriceAtCurrentRate,
  };
};

export default useSelectedPriceCurrency;
