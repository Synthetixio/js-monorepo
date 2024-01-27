import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isSupportedNetworkId, NetworkNameById, NetworkIdByName } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { SynthetixBridgeToOptimism } from '@synthetixio/contracts/build/goerli/deployment/SynthetixBridgeToOptimism';
import { SynthetixBridgeToBase } from '@synthetixio/contracts/build/goerli-ovm/deployment/SynthetixBridgeToBase';

const contracts = {
  mainnet: () =>
    import('@synthetixio/contracts/build/mainnet/deployment/SynthetixBridgeToOptimism'),
  'mainnet-ovm': () =>
    import('@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixBridgeToBase'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/SynthetixBridgeToOptimism'),
  'goerli-ovm': () =>
    import('@synthetixio/contracts/build/goerli-ovm/deployment/SynthetixBridgeToBase'),
};

export const getSynthetixBridge = async ({
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
  const networkName = NetworkNameById[networkId];
  const { address, abi } = await contracts[networkName]();
  const contract = new ethers.Contract(address, abi, signerOrProvider) as
    | SynthetixBridgeToOptimism
    | SynthetixBridgeToBase;
  return contract;
};
export const useSynthetixBridge = (targetNetworkId?: number) => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();
  return useQuery({
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    queryKey: ['useSynthetixBridge', { networkId, walletAddress, targetNetworkId }],
    queryFn: () => {
      const currentNetworkId = targetNetworkId || networkId;
      if (!currentNetworkId) throw Error('Network id required');
      const globalProvider =
        currentNetworkId === NetworkIdByName.mainnet
          ? globalProviders.mainnet
          : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      return getSynthetixBridge({ networkId: currentNetworkId, signer, provider });
    },
    staleTime: Infinity,
    enabled: Boolean(targetNetworkId || networkId),
  });
};
