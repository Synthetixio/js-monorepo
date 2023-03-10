import { useQuery } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useWallet, useNetwork } from '@snx-v3/useBlockchain';

export function useAccounts() {
  const wallet = useWallet();
  const { data: AccountProxy } = useAccountProxy();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountAddress: wallet?.address }, 'Accounts'],
    queryFn: async function () {
      if (!AccountProxy || !wallet?.address) throw new Error('Should be disabled');
      const numberOfAccountTokens = await AccountProxy.balanceOf(wallet.address);
      if (numberOfAccountTokens.eq(0)) {
        // No accounts created yet
        return [];
      }
      const accountIndexes = Array.from(Array(numberOfAccountTokens.toNumber()).keys());
      const accounts = await Promise.all(
        accountIndexes.map(async (i) => {
          if (!wallet?.address) throw new Error('OMG!');
          return await AccountProxy.tokenOfOwnerByIndex(wallet.address, i);
        })
      );
      return accounts.map((accountId) => accountId.toString());
    },
    enabled: Boolean(AccountProxy?.address && wallet?.address),
    placeholderData: [],
  });
}
