import { useQuery } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useAccount } from '@snx-v3/useBlockchain';

export function useAccounts() {
  const { address } = useAccount();
  const { data: AccountProxy } = useAccountProxy();
  return useQuery({
    queryKey: [{ AccountProxy: AccountProxy?.address }, 'accounts'],
    queryFn: async function () {
      if (!AccountProxy) throw new Error('Should be disabled');
      const numberOfAccountTokens = await AccountProxy.balanceOf(address);
      if (numberOfAccountTokens.eq(0)) {
        // No accounts created yet
        return [];
      }
      const accountIndexes = Array.from(Array(numberOfAccountTokens.toNumber()).keys());
      const accounts = await Promise.all(
        accountIndexes.map(async (i) => await AccountProxy.tokenOfOwnerByIndex(address, i))
      );
      return accounts.map((accountId) => accountId.toString());
    },
    enabled: Boolean(AccountProxy?.address && address),
    placeholderData: [],
  });
}
