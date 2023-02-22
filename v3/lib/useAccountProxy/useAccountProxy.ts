import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { AccountProxy as AccountProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/AccountProxy';
import type { AccountProxy as AccountProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';

export type AccountProxy = AccountProxyGoerli | AccountProxyOptimismGoerli;

export async function importAccount(chainName: string) {
  switch (chainName) {
    case 'goerli':
      return await import('@synthetixio/v3-contracts/build/goerli/AccountProxy');
    case 'optimism-goerli':
      return await import('@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useAccountProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'AccountProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importAccount(network.name);
      return new Contract(address, abi, signerOrProvider) as AccountProxy;
    },
    enabled: Boolean(network.isSupported && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
