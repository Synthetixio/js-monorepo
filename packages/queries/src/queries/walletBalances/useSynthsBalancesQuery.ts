import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { parseBytes32String } from '@ethersproject/strings';
import { BigNumber } from '@ethersproject/bignumber';
import orderBy from 'lodash/orderBy';
import { wei } from '@synthetixio/wei';

import { CurrencyKey } from '@synthetixio/contracts-interface';
import { QueryContext } from '../../context';
import { Balances, SynthBalancesMap } from '../../types';
import { notNill } from '../../utils';

type SynthBalancesTuple = [string[], BigNumber[], BigNumber[]];

const useSynthsBalancesQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<Balances>
) => {
  return useQuery<Balances>(
    ['walletBalances', 'synths', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) {
        // This should never happen since the query is not enabled when ctx.snxjs is undefined
        throw Error('ctx.snxjs is undefined');
      }
      const balancesMap: SynthBalancesMap = {};
      const [currencyKeys, synthsBalances, synthsUSDBalances]: SynthBalancesTuple =
        await ctx.snxjs.contracts.SynthUtil.synthsBalances(walletAddress);

      let totalUSDBalance = wei(0);

      currencyKeys.forEach((currencyKeyBytes32, idx) => {
        const balance = wei(synthsBalances[idx]);

        // discard empty balances
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
        balancesMap: balancesMap,
        balances: orderBy(
          Object.values(balancesMap).filter(notNill),
          (balance) => balance.usdBalance.toNumber(),
          'desc'
        ),
        totalUSDBalance,
      };
    },
    {
      enabled: !!ctx.snxjs && !!walletAddress,
      ...options,
    }
  );
};

export default useSynthsBalancesQuery;
