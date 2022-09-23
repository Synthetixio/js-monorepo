import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractContext } from '@snx-v2/ContractContext';
import { useSynthetix, useSynthUtil } from '@snx-v2/useSynthetixContracts';
import { CurrencyKey, Synths } from '@snx-v2/currency';
import Wei, { wei } from '@synthetixio/wei';

export type SynthBalance = {
  currencyKey: CurrencyKey;
  balance: Wei;
  usdBalance: Wei;
};

export type SynthBalancesMap = Partial<{ [key: string]: SynthBalance }>;

type SynthBalancesTuple = [string[], BigNumber[], BigNumber[]];

export const processBalances = (balances: [SynthBalancesTuple, BigNumber]) => {
  const [currencyKeys, synthsBalances, synthsUSDBalances] = balances[0];
  const balancesMap: SynthBalancesMap = {};
  let totalUSDBalance = wei(0);

  currencyKeys.forEach((currencyKeyBytes32, idx) => {
    const balance = wei(synthsBalances[idx]);

    if (balance.gt(0)) {
      const synthName = parseBytes32String(currencyKeyBytes32) as CurrencyKey;
      const usdBalance = wei(synthsUSDBalances[idx]);

      balancesMap[synthName] = {
        currencyKey: synthName,
        balance,
        usdBalance,
      };

      totalUSDBalance = totalUSDBalance.add(usdBalance);
    }
  });

  return {
    sUSD: balancesMap[Synths.sUSD]?.balance,
    SNX: wei(balances[1]),
  };
};

export const useHeaderBalance = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { data: SynthUtil } = useSynthUtil();
  const { data: Synthetix } = useSynthetix();

  return useQuery(
    ['walletBalances', 'header', networkId],
    async () => {
      if (!SynthUtil || !Synthetix || !walletAddress) {
        throw Error('Query should not be enabled if contracts are missing');
      }

      return Promise.all([
        SynthUtil.synthsBalances(walletAddress),
        Synthetix.collateral(walletAddress),
      ]);
    },
    {
      select: processBalances,
      enabled: Boolean(networkId && SynthUtil),
      staleTime: 1000,
    }
  );
};

export default useHeaderBalance;
