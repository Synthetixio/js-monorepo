import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { CoreProxy as CoreProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import type { CoreProxy as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';

export async function importCoreProxy(chainName: string) {
  switch (chainName) {
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/CoreProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export const useCoreProxy = () => {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;

  return useQuery({
    queryKey: [network.name, { withSigner: Boolean(signer) }, 'CoreProxy'],
    queryFn: async function () {
      const CoreProxy = await importCoreProxy(network.name);
      return new Contract(CoreProxy.address, CoreProxy.abi, signerOrProvider) as
        | CoreProxyGoerli
        | CoreProxyOptimismGoerli;
    },
    enabled: Boolean(network.isSupported && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export type CoreProxyContractType = CoreProxyGoerli | CoreProxyOptimismGoerli;
