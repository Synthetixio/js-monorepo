import { useQuery } from '@tanstack/react-query';
import { useAccount, useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { InfuraProvider } from '@ethersproject/providers';

const BalanceSchema = ZodBigNumber.transform((x) => wei(x));
const abi = ['function balanceOf(address) view returns (uint256)'];
export const useBalance = ({
  tokenAddress,
  networkId,
}: {
  tokenAddress?: string | 'ETH';
  networkId?: number;
}) => {
  const { address: accountAddress } = useAccount();
  const connectedProvider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [{ tokenAddress, networkId, accountAddress }, 'balance'],
    queryFn: async () => {
      if (!tokenAddress) throw Error('Query should not be enabled');
      const provider =
        network.id === networkId
          ? connectedProvider
          : new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
      if (tokenAddress === 'ETH') {
        // if token is ETH get ETH balance from provider
        const balBn = await provider.getBalance(accountAddress);
        return BalanceSchema.parse(balBn);
      }
      const contract = new Contract(tokenAddress, abi, provider);
      const balBn = await contract.balanceOf(accountAddress);
      return BalanceSchema.parse(balBn);
    },
    enabled: Boolean(accountAddress && tokenAddress),
  });
};
