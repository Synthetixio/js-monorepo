import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import type { USDProxy as USDProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import type { USDProxy as USDProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';

export async function importUSDProxy(chainName: string) {
  switch (chainName) {
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/USDProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/USDProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}
export const useUSDProxy = () => {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;

  return useQuery({
    queryKey: [network.name, { withSigner: Boolean(signer) }, 'USDProxy'],
    queryFn: async function () {
      const USDProxy = await importUSDProxy(network.name);
      return new Contract(USDProxy.address, USDProxy.abi, signerOrProvider) as
        | USDProxyGoerli
        | USDProxyOptimismGoerli;
    },
    enabled: Boolean(network.name && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
export type USDProxyContractType = USDProxyGoerli | USDProxyOptimismGoerli;
