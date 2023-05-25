import { useQuery } from '@tanstack/react-query';
import { useAccountProxy } from '@snx-v3/useAccountProxy';
import { useNetwork, useWallet, onboard } from '@snx-v3/useBlockchain';
import { searchParamsToObject, sortObject } from '@snx-v3/useParams';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

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

export function useAccountUrlSync() {
  const accounts = useAccounts();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams = useMemo(
    () => sortObject(searchParamsToObject(searchParams)),
    [searchParams]
  );

  useEffect(() => {
    if (accounts.isFetched && accounts.data && accounts.data.length > 0) {
      // Accounts fetched and we have some, preselect one
      if (!currentParams.accountId || !accounts.data.includes(currentParams.accountId)) {
        setSearchParams(
          new URLSearchParams(sortObject({ ...currentParams, accountId: accounts.data[0] }))
        );
      }
      // when accountId param is present, and it also exists in the accounts list, do nothing
      return;
    }

    const { wallets } = onboard.state.get();
    if (
      // Check separately for the case when wallet is not connected
      wallets.length < 1 ||
      (accounts.isFetched && (!accounts.data || accounts.data.length < 1))
    ) {
      // We have fetched accounts but there are none, remove account id from url
      if (currentParams.accountId) {
        delete currentParams.accountId;
        setSearchParams(new URLSearchParams(currentParams));
      }
    }
  }, [accounts.data, accounts.isFetched, currentParams, setSearchParams]);
}
