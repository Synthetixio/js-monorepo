import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContractContext } from '@snx-v2/ContractContext';
import { useSynthUtil, useExchangeRates } from '@snx-v2/useSynthetixContracts';
import { formatBytes32String, parseBytes32String } from '@ethersproject/strings';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';

const processQueryData = (result: [[string[], BigNumber[]], BigNumber[]]) => {
  const [[synthNames, synthRates], [snxRate, ETHRate]] = result;
  const ratesByName = synthNames.reduce(
    (acc: Record<string, Wei | undefined>, synthName, index) => {
      acc[parseBytes32String(synthName)] = wei(synthRates[index]);
      return acc;
    },
    { SNX: wei(snxRate), ETH: wei(ETHRate) }
  );
  return ratesByName;
};

export const useExchangeRatesData = () => {
  const { networkId } = useContext(ContractContext);
  const { data: SynthUtil } = useSynthUtil();
  const { data: ExchangeRates } = useExchangeRates();

  return useQuery(
    ['exchangeRatesData', networkId],
    async () => {
      if (!SynthUtil || !ExchangeRates) {
        throw Error('Query should not be enabled if contracts are missing');
      }
      const SNX = formatBytes32String('SNX');
      const ETH = formatBytes32String('ETH');
      const nonSynthRates = [SNX, ETH];

      return await Promise.all([
        SynthUtil.synthsRates(),
        ExchangeRates.ratesForCurrencies(nonSynthRates),
      ]);
    },
    {
      select: processQueryData,
      enabled: Boolean(networkId && SynthUtil && ExchangeRates),
      staleTime: 1000,
    }
  );
};
