import { assertAddressType } from '@snx-v3/assertAddressType';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useWallet, useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';
import { InfuraProvider } from '@ethersproject/providers';

const BalanceSchema = ZodBigNumber.transform((x) => wei(x));
const abi = ['function balanceOf(address) view returns (uint256)'];

export const useTokenBalance = (address?: string, networkId?: number) => {
  const wallet = useWallet();
  const connectedProvider = useProvider();
  const network = useNetwork();

  const tokenAddress = assertAddressType(address) ? address : undefined;

  return useQuery({
    queryKey: [network.name, { accountAddress: wallet?.address }, 'TokenBalance', { tokenAddress }],
    queryFn: async () => {
      if (!tokenAddress || !wallet?.address) throw Error('Query should not be enabled');
      const provider =
        networkId && networkId !== network.id
          ? new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
          : connectedProvider;
      const contract = new Contract(tokenAddress, abi, provider);
      return BalanceSchema.parse(await contract.balanceOf(wallet.address));
    },
    enabled: Boolean((networkId ?? network.id) && wallet?.address && tokenAddress),
  });
};
