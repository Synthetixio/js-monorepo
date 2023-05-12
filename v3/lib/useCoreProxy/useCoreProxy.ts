import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { CoreProxy as CoreProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/CoreProxy';
import type { CoreProxy as CoreProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import type { CoreProxy as CoreProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/CoreProxy';
import type { CoreProxy as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';

export type CoreProxyType =
  | CoreProxyMainnet
  | CoreProxyGoerli
  | CoreProxyOptimismMainnet
  | CoreProxyOptimismGoerli;

export async function importCoreProxy(chainName: string) {
  switch (chainName) {
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/CoreProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/CoreProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/CoreProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useCoreProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'CoreProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importCoreProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as CoreProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
