import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { dSNXPoolAddressOptimism, dSNXAbi } from '@snx-v2/Constants';
import { useQuery } from '@tanstack/react-query';
import { Contract, providers } from 'ethers';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

export const useGetDSnxBalance = () => {
  const { networkId, walletAddress } = useContext(ContractContext);

  return useQuery({
    queryKey: ['useGetDSnxBalance', walletAddress, networkId],
    queryFn: async () => {
      if (!walletAddress || !networkId) throw Error('Query should not be enabled');
      const provider = new providers.InfuraProvider(
        NetworkIdByName['mainnet-ovm'],
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const dSNXContract = new Contract(dSNXPoolAddressOptimism, dSNXAbi, provider);

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
    enabled: Boolean(walletAddress && networkId && networkId == NetworkIdByName['mainnet-ovm']), // TODO need a discussion if we want to fetch price form optimism when connected to mainnet
    staleTime: 10000,
  });
};
