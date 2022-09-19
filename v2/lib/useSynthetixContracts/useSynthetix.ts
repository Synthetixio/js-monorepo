import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers, providers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { Synthetix } from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import type { Synthetix as SynthetixOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix';
import { SynthetixProvider } from '@synthetixio/providers';
import { SignerContext } from '@snx-v2/SignerContext';

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
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    [networkId, 'useSynthetix', walletAddress],
    () => {
      if (!networkId) throw Error('Network id required');

      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      return getSynthetix({ networkId, signer, provider });
    },
    { staleTime: Infinity, enabled: Boolean(networkId) }
  );
};
