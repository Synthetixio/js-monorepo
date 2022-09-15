import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { Synthetix } from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import type { Synthetix as SynthetixOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix';
import { SynthetixProvider } from '@synthetixio/providers';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Synthetix'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Synthetix'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Synthetix'),
};

export const getSynthetix = async ({
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
  const contract = new ethers.Contract(address, abi, signerOrProvider) as SynthetixOvm | Synthetix;
  return contract;
};
export const useSynthetix = () => {
  const { networkId, signer, provider } = useContext(ContractContext);

  return useQuery(
    [networkId, Boolean(signer), 'useSynthetix'],
    () => getSynthetix({ networkId, signer, provider }),
    { staleTime: Infinity }
  );
};
