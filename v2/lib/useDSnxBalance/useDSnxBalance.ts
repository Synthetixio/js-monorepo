import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { dSNXPoolAddressOptimism, dSNXAbi } from '@snx-v2/Constants';
import { useQuery } from '@tanstack/react-query';
import { Contract } from 'ethers';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/useGlobalProvidersWithFallback';

export const useGetDSnxBalance = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const { globalProviders, toggleRpc, usingInfura } = useGlobalProvidersWithFallback();
  return useQuery({
    queryKey: ['useGetDSnxBalance', walletAddress, networkId],
    queryFn: async () => {
      if (!walletAddress || !networkId) throw Error('Query should not be enabled');

      const dSNXContract = new Contract(dSNXPoolAddressOptimism, dSNXAbi, globalProviders.optimism);

      const [balanceBn, priceBn] = await Promise.all([
        dSNXContract.balanceOf(walletAddress),
        dSNXContract.tokenPrice(),
      ]);
      const balance = wei(balanceBn);
      const price = wei(priceBn);

      return {
        balance,
        price,
        balanceUsd: balance.mul(price),
      };
    },
    onError: () => (usingInfura ? toggleRpc() : null),
    enabled: Boolean(walletAddress && networkId && networkId == NetworkIdByName['mainnet-ovm']),
    staleTime: 10000,
  });
};
