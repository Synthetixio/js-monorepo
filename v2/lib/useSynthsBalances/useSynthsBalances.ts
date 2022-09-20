import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
// import orderBy from 'lodash/orderBy';

// import { CurrencyKey } from '@synthetixio/contracts-interface';
import { ContractContext } from '@snx-v2/ContractContext';
import { useSynthUtil } from '@snx-v2/useSynthetixContracts';
import { CurrencyKey } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

// import { Balances, SynthBalancesMap } from '../../types';
// import { notNill } from '../../utils';

// const useSynthsBalancesQuery = () => {
//   const { walletAddress } = useContext(ContractContext);
//   const { data: SynthUtil } = useSynthUtil();

//   if (!SynthUtil || !walletAddress) {
//     throw Error('Query should not be enabled if contracts are missing');
//   }

//   return useQuery(
//     ['walletBalances', 'synths', walletAddress],
//     async () => {
//       if (!ctx.snxjs) {
//         // This should never happen since the query is not enabled when ctx.snxjs is undefined
//         throw Error('ctx.snxjs is undefined');
//       }
//       const balancesMap: SynthBalancesMap = {};
//       const [currencyKeys, synthsBalances, synthsUSDBalances]: SynthBalancesTuple =
//         await SynthUtil.synthsBalances(walletAddress);

//       let totalUSDBalance = wei(0);

//       currencyKeys.forEach((currencyKeyBytes32, idx) => {
//         const balance = wei(synthsBalances[idx]);

//         // discard empty balances
//         if (balance.gt(0)) {
//           const synthName = parseBytes32String(currencyKeyBytes32) as CurrencyKey;
//           const usdBalance = wei(synthsUSDBalances[idx]);

//           balancesMap[synthName] = {
//             currencyKey: synthName,
//             balance,
//             usdBalance,
//           };

//           totalUSDBalance = totalUSDBalance.add(usdBalance);
//         }
//       });

//       return {
//         balancesMap: balancesMap,
//         balances: orderBy(
//           Object.values(balancesMap).filter(notNill),
//           (balance) => balance.usdBalance.toNumber(),
//           'desc'
//         ),
//         totalUSDBalance,
//       };
//     },
//     {
//       enabled: !!ctx.snxjs && !!walletAddress,
//       ...options,
//     }
//   );
// };

type SynthBalancesTuple = [string[], BigNumber[], BigNumber[]];

const processSynthsBalances = (balances: SynthBalancesTuple) => {
  const [currencyKeys, synthsBalances, synthsUSDBalances] = balances;
  const balancesMap: any = {};
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

  // eslint-disable-next-line no-console
  console.log('Hello world');
  return 'Hello';
};

export const useSynthsBalances = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { data: SynthUtil } = useSynthUtil();

  return useQuery(
    ['walletBalances', 'synths', networkId],
    async () => {
      if (!SynthUtil) {
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
