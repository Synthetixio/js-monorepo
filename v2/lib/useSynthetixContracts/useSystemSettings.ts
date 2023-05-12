import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isSupportedNetworkId, NetworkNameById, NetworkIdByName } from './common';
import type { SystemSettings } from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings';
import type { SystemSettings as SystemSettingsOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings';
import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/SystemSettings'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/SystemSettings'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/SystemSettings'),
};

export const getSystemSettings = async ({
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
    | SystemSettings
    | SystemSettingsOvm;
  return contract;
};
export const useSystemSettings = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();

  return useQuery({
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    queryKey: ['useSystemSettings', { networkId, walletAddress }],
    queryFn: () => {
      if (!networkId) throw Error('Network id required');

      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      return getSystemSettings({ networkId, signer, provider });
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};
