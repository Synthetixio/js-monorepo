import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import type { Multicall3 as MulticallGoerli } from '@synthetixio/v3-contracts/build/goerli/Multicall3';
import type { Multicall3 as MulticallOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/Multicall3';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';

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
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'ExternalMulticall', { withSigner }],
    queryFn: async function () {
      const Multicall = await importMulticall(network.name);
      return new ethers.Contract(Multicall.address, Multicall.abi, signerOrProvider) as
        | MulticallGoerli
        | MulticallOptimismGoerli;
    },
    enabled: Boolean(network.isSupported && signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
export type MulticallContractType = MulticallGoerli | MulticallOptimismGoerli;
