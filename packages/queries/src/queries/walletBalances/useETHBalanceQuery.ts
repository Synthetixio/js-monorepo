import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';

const useETHBalanceQuery = (
  ctx: QueryContext,
  walletAddress: string | null,
  options?: UseQueryOptions<Wei>
) => {
  return useQuery<Wei>(
    ['walletBalances', 'eth', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs || !ctx.provider || !walletAddress) return wei(0);

      const balance = await ctx.provider?.getBalance(walletAddress);

      return wei(balance);
    },
    {
      enabled: !!ctx.provider && !!walletAddress,
      ...options,
    }
  );
};

export default useETHBalanceQuery;
