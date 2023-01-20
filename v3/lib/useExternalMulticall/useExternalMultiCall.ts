import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import type { Multicall3 as MulticallGoerli } from '@synthetixio/v3-contracts/build/goerli/Multicall3';
import type { Multicall3 as MulticallOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/Multicall3';
import { useProvider, useSigner } from '@snx-v3/useBlockchain';

export async function importMulticall(chainName: string) {
  switch (chainName) {
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/Multicall3');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/Multicall3');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}
export const useExternalMulticall = () => {
  const provider = useProvider();
  const signer = useSigner();

  return useQuery({
    queryKey: [provider.network.name, { withSigner: Boolean(signer) }, 'ExternalMulticall'],
    queryFn: async () => {
      const Multicall = await importMulticall(provider.network.name);
      return new ethers.Contract(Multicall.address, Multicall.abi, signer || provider) as
        | MulticallGoerli
        | MulticallOptimismGoerli;
    },
    enabled: Boolean(provider.network.name && (signer || provider)),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
export type MulticallContractType = MulticallGoerli | MulticallOptimismGoerli;
