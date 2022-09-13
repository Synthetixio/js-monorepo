import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CurrencyKey } from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { DeprecatedSynthBalance, DeprecatedSynthsBalances } from '../../types';
import { getProxySynthSymbol } from '../../utils';

const useRedeemableDeprecatedSynthsQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<DeprecatedSynthsBalances>
) => {
  return useQuery<DeprecatedSynthsBalances>(
    ['WalletBalances', 'RedeemableDeprecatedSynths', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const {
        contracts: { SynthRedeemer: Redeemer },
      } = ctx.snxjs;
      const synthDeprecatedFilter = Redeemer.filters.SynthDeprecated();
      const deprecatedSynthsEvents = await Redeemer.queryFilter(synthDeprecatedFilter);
      const deprecatedProxySynthsAddresses: string[] = deprecatedSynthsEvents.map(
        (e) => e.args?.synth ?? ''
      );
      const deprecatedSynths = await Promise.all(
        deprecatedProxySynthsAddresses.map((addr) => getProxySynthSymbol(ctx.provider!, addr))
      );

      const getRedeemableSynthBalance = async (proxyAddress: string) => {
        const balance = await Redeemer.balanceOf(proxyAddress, walletAddress);
        return wei(balance);
      };
      const balances = await Promise.all(
        deprecatedProxySynthsAddresses.map(getRedeemableSynthBalance)
      );

      let totalUSDBalance = wei(0);
      const cryptoBalances: DeprecatedSynthBalance[] = [];

      for (let i = 0; i < balances.length; i++) {
        const usdBalance = balances[i];
        if (usdBalance.gt(0)) {
          const currencyKey = deprecatedSynths[i] as CurrencyKey;
          totalUSDBalance = totalUSDBalance.add(usdBalance);
          cryptoBalances.push({
            currencyKey,
            proxyAddress: deprecatedProxySynthsAddresses[i],
            balance: wei(0),
            usdBalance,
          });
        }
      }

      return {
        balances: cryptoBalances,
        totalUSDBalance,
      };
    },
    {
      enabled: !!ctx.networkId && !!walletAddress,
      ...options,
    }
  );
};

export default useRedeemableDeprecatedSynthsQuery;
