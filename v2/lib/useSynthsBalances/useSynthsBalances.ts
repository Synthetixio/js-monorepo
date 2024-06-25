import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
import orderBy from 'lodash/orderBy';
import { ContractContext } from '@snx-v2/ContractContext';
import { useSynthUtil } from '@snx-v2/useSynthetixContracts';
import Wei, { wei } from '@synthetixio/wei';
import { useDelegateWallet } from '../useDelegateWallet';

function notNill<Value>(value: Value | null | undefined): value is Value {
  return value !== null && value !== undefined;
}
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
      Object.values(balancesMap).filter(notNill),
      (balance) => balance.usdBalance.toNumber(),
      'desc'
    ),
    totalUSDBalance,
  };
};

export const useSynthsBalances = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { delegateWallet } = useDelegateWallet();

  const { data: SynthUtil } = useSynthUtil();
  const walletAddressToUse = delegateWallet?.address || walletAddress;

  return useQuery(
    ['synths', 'v2walletBalances', { networkId, walletAddressToUse }],
    async () => {
      if (!SynthUtil || !walletAddressToUse) {
        throw Error('Query should not be enabled');
      }

      return await SynthUtil.synthsBalances(walletAddressToUse);
    },
    {
      select: processSynthsBalances,
      enabled: Boolean(networkId && SynthUtil && walletAddressToUse),
      staleTime: 1000,
    }
  );
};

export default useSynthsBalances;
