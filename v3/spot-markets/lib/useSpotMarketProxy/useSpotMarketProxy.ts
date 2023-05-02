import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type {
  SpotMarketProxy as SpotMarketProxyMainnet,
  SpotMarketProxy as SpotMarketProxyGoerli,
  SpotMarketProxy as SpotMarketProxyOptimismMainnet,
  SpotMarketProxy as SpotMarketProxyOptimismGoerli,
} from '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SpotMarketProxy';

export type SpotMarketProxyType =
  | SpotMarketProxyMainnet
  | SpotMarketProxyGoerli
  | SpotMarketProxyOptimismMainnet
  | SpotMarketProxyOptimismGoerli;

export async function importSpotMarketProxy(chainName: string) {
  switch (chainName) {
    case 'mainnet':
    case 'goerli':
    case 'optimism-mainnet':
    case 'optimism-goerli':
      return import(
        '@synthetixio/v3-spot-markets-contracts/build/optimism-mainnet/SpotMarketProxy'
      );
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useSpotMarketProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'SpotMarketProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importSpotMarketProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as SpotMarketProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
