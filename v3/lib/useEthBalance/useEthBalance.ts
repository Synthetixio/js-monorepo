import { useQuery } from '@tanstack/react-query';
import { useWallet, useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { InfuraProvider } from '@ethersproject/providers';

const BalanceSchema = ZodBigNumber.transform((x) => wei(x));

export function useEthBalance(networkId?: number) {
  const wallet = useWallet();
  const connectedProvider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountAddress: wallet?.address }, 'EthBalance'],
    queryFn: async () => {
      if (!wallet?.address) throw Error('Query should not be enabled');
      const provider =
        networkId && networkId !== network.id
          ? new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
          : connectedProvider;
      return BalanceSchema.parse(await provider.getBalance(wallet.address));
    },
    enabled: Boolean((networkId ?? network.id) && wallet?.address),
  });
}
