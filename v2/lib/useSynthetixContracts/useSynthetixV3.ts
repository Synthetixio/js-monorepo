import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isSupportedNetworkId, NetworkIdByName } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';

export const getSynthetixV3 = async ({
  networkId,
  signer,
  provider,
}: {
  networkId: number;
  signer: ethers.Signer | null;
  provider: Provider;
}) => {
  const signerOrProvider = signer || provider;
  const supportedNetworkId = isSupportedNetworkId(networkId);
  if (!supportedNetworkId) {
    throw Error(`${networkId} is not supported`);
  }

  const [{ default: meta }, { default: abi }] = await Promise.all([
    import('@synthetixio/v3-contracts/1-main/meta.json'),
    import('@synthetixio/v3-contracts/1-main/CoreProxy.readable.json'),
  ]);

  const contract = new ethers.Contract(meta.contracts.CoreProxy, abi, signerOrProvider);
  return contract;
};
export const useSynthetixV3 = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();
  return useQuery({
    queryKey: ['useSynthetixV3', { networkId, walletAddress }],
    queryFn: () => {
      if (!networkId) throw Error('Network id required');

      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      return getSynthetixV3({ networkId, signer, provider });
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};
