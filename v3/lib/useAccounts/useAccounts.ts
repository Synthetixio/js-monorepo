import { useQuery } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useAccount, useNetwork } from '@snx-v3/useBlockchain';

export function useAccounts() {
  const account = useAccount();
  const { data: AccountProxy } = useAccountProxy();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountAddress: account?.address }, 'Accounts'],
    queryFn: async function () {
      if (!AccountProxy || !account?.address) throw new Error('Should be disabled');
      const numberOfAccountTokens = await AccountProxy.balanceOf(account.address);
      if (numberOfAccountTokens.eq(0)) {
        // No accounts created yet
        return [];
      }
      const accountIndexes = Array.from(Array(numberOfAccountTokens.toNumber()).keys());
      const accounts = await Promise.all(
        accountIndexes.map(async (i) => {
          if (!account?.address) throw new Error('OMG!');
          return await AccountProxy.tokenOfOwnerByIndex(account.address, i);
        })
      );
      return accounts.map((accountId) => accountId.toString());
    },
    enabled: Boolean(AccountProxy?.address && account?.address),
    placeholderData: [],
  });
}
