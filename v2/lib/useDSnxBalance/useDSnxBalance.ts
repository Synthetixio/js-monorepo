import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { wei } from '@synthetixio/wei';
import { dSNXPoolAddressMainnet, dSNXPoolAddressOptimism, dSNXAbi } from '@snx-v2/Constants';
import { useQuery } from '@tanstack/react-query';
import { Contract, providers } from 'ethers';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

export const useGetDSnxBalance = () => {
  const { networkId, walletAddress } = useContext(ContractContext);

  return useQuery({
    queryKey: ['useGetDSnxBalance', walletAddress, networkId],
    queryFn: async () => {
      if (!walletAddress || !networkId) return wei(0);
      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );
      const dSNXContract = new Contract(
        networkId === NetworkIdByName.mainnet ? dSNXPoolAddressMainnet : dSNXPoolAddressOptimism,
        dSNXAbi,
        provider
      );

      const balance = await dSNXContract.balanceOf(walletAddress);
      return wei(balance);
    },
    enabled: Boolean(walletAddress && networkId),
    staleTime: 10000,
  });
};
