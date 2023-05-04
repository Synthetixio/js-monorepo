import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type {
  SynthTokenModule as SynthTokenModuleMainnet,
  SynthTokenModule as SynthTokenModuleGoerli,
  SynthTokenModule as SynthTokenModuleOptimismMainnet,
  SynthTokenModule as SynthTokenModuleOptimismGoerli,
} from '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SynthTokenModule';

export type SynthTokenModuleType =
  | SynthTokenModuleMainnet
  | SynthTokenModuleGoerli
  | SynthTokenModuleOptimismMainnet
  | SynthTokenModuleOptimismGoerli;

export async function importSynthTokenModule(chainName: string) {
  switch (chainName) {
    case 'mainnet':
      return import(
        '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SynthTokenModule'
      );
    case 'goerli':
      return import(
        '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SynthTokenModule'
      );
    case 'optimism-mainnet':
      return import(
        '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SynthTokenModule'
      );
    case 'optimism-goerli':
      return import(
        '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SynthTokenModule'
      );
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useSynthTokenModule(address?: string) {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'SynthTokenModule', { withSigner }, address],
    queryFn: async function () {
      if (!address) throw 'OMG';
      const { abi } = await importSynthTokenModule(network.name);
      return new Contract(address, abi, signerOrProvider) as SynthTokenModuleType;
    },
    enabled: Boolean(signerOrProvider && address),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
