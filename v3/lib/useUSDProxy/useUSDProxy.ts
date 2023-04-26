import { Contract } from '@ethersproject/contracts';
import { useQuery } from '@tanstack/react-query';
import { useNetwork, useProvider, useSigner } from '@snx-v3/useBlockchain';
import type { USDProxy as USDProxyMainnet } from '@synthetixio/v3-contracts/build/mainnet/USDProxy';
import type { USDProxy as USDProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import type { USDProxy as USDProxyOptimismMainnet } from '@synthetixio/v3-contracts/build/optimism-mainnet/USDProxy';
import type { USDProxy as USDProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';

export type USDProxyType =
  | USDProxyMainnet
  | USDProxyGoerli
  | USDProxyOptimismMainnet
  | USDProxyOptimismGoerli;

export async function importUSDProxy(chainName: string) {
  switch (chainName) {
    case 'mainnet':
      return import('@synthetixio/v3-contracts/build/mainnet/USDProxy');
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/USDProxy');
    case 'optimism-mainnet':
      return import('@synthetixio/v3-contracts/build/optimism-mainnet/USDProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/USDProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

export function useUSDProxy() {
  const network = useNetwork();
  const provider = useProvider();
  const signer = useSigner();
  const signerOrProvider = signer || provider;
  const withSigner = Boolean(signer);

  return useQuery({
    queryKey: [network.name, 'USDProxy', { withSigner }],
    queryFn: async function () {
      const { address, abi } = await importUSDProxy(network.name);
      return new Contract(address, abi, signerOrProvider) as USDProxyType;
    },
    enabled: Boolean(signerOrProvider),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
