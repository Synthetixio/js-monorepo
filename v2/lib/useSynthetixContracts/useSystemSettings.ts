import { SynthetixProvider } from '@synthetixio/providers';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import type { SystemSettings } from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings';
import type { SystemSettings as SystemSettingsOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings';
import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';

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
  provider: SynthetixProvider;
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
  const { networkId, signer, provider } = useContext(ContractContext);
  return useQuery(
    [networkId, 'useSystemSettings'],
    () => getSystemSettings({ networkId, signer, provider }),
    { staleTime: Infinity }
  );
};
