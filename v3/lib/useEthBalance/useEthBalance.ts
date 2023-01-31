import { useQuery } from '@tanstack/react-query';
import { useAccount, useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { InfuraProvider } from '@ethersproject/providers';

const BalanceSchema = ZodBigNumber.transform((x) => wei(x));

export function useEthBalance(networkId?: number) {
  const { address: accountAddress } = useAccount();
  const connectedProvider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [{ networkId: networkId ?? network.id, accountAddress }, 'ethBalance'],
    queryFn: async () => {
      if (!accountAddress) throw Error('Query should not be enabled');
      const provider =
        networkId && networkId !== network.id
          ? new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
          : connectedProvider;
      return BalanceSchema.parse(await provider.getBalance(accountAddress));
    },
    enabled: Boolean((networkId ?? network.id) && accountAddress),
  });
}
