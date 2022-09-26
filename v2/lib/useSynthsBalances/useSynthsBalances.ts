import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
import orderBy from 'lodash/orderBy';
import { ContractContext } from '@snx-v2/ContractContext';
import { useSynthUtil } from '@snx-v2/useSynthetixContracts';
import Wei, { wei } from '@synthetixio/wei';

export type SynthBalance = {
  currencyKey: string;
  balance: Wei;
  usdBalance: Wei;
};

export type SynthBalancesMap = Partial<{ [key: string]: SynthBalance }>;

type SynthBalancesTuple = [string[], BigNumber[], BigNumber[]];

export const processSynthsBalances = (balances: SynthBalancesTuple) => {
  const [currencyKeys, synthsBalances, synthsUSDBalances] = balances;
  const balancesMap: SynthBalancesMap = {};
  let totalUSDBalance = wei(0);

  currencyKeys.forEach((currencyKeyBytes32, idx) => {
    const balance = wei(synthsBalances[idx]);

    if (balance.gt(0)) {
      const synthName = parseBytes32String(currencyKeyBytes32);
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
    balancesMap: balancesMap,
    balances: orderBy(
      Object.values(balancesMap).filter((val) => val !== null && val !== undefined),
      (balance) => balance?.usdBalance.toNumber(),
      'desc'
    ),
    totalUSDBalance,
  };
};

export const useSynthsBalances = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { data: SynthUtil } = useSynthUtil();

  return useQuery(
    ['walletBalances', 'synths', networkId],
    async () => {
      if (!SynthUtil || !walletAddress) {
        throw Error('Query should not be enabled if contracts are missing');
      }

      return await SynthUtil.synthsBalances(walletAddress);
    },
    {
      select: processSynthsBalances,
      enabled: Boolean(networkId && SynthUtil),
      staleTime: 1000,
    }
  );
};

export default useSynthsBalances;
