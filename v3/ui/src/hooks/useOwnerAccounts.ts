import { useContract } from './useContract';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAccount, useContractRead, useContractReads, useNetwork } from 'wagmi';
import { accountsState } from '../utils/state';
import { contracts } from '../utils/constants';

export type ReturnType =
  | {
      ownerAddress: string;
      isLoading: boolean;
    } & (
      | {
          hasBalance: false;
        }
      | {
          hasBalance: true;
          tokenId: string;
        }
    );

/*
    This hook returns owner's address with an account associated if one exists
*/
export const useOwnerAccounts = () => {
  const [, setUserAccounts] = useRecoilState(accountsState);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const accountContract = useContract(contracts.ACCOUNT);

  const { data, refetch } = useContractRead({
    addressOrName: accountContract?.address,
    contractInterface: accountContract?.abi,
    functionName: 'balanceOf',
    enabled: !!activeChain,
    args: address,
    onSuccess: (data) => {
      if (data.toNumber() === 0) {
        setUserAccounts({
          accounts: [],
          refetchAccounts: refetch,
        });
        setIsLoading(false);
      }
    },
  });

  const tokenCalls = useMemo(() => {
    return data
      ? Array.from(Array(data.toNumber()).keys()).map((tokenId: number) => ({
          addressOrName: accountContract?.address,
          contractInterface: accountContract?.abi,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, tokenId],
        }))
      : [];
  }, [accountContract?.abi, accountContract?.address, address, data]);

  useContractReads({
    contracts: tokenCalls,
    onSuccess: (data) => {
      setUserAccounts({
        accounts: data.map((d) => d.toNumber()),
        refetchAccounts: refetch,
      });
      setIsLoading(false);
    },
  });

  return {
    isLoading: Boolean(activeChain) ? isLoading : false,
  };
};
