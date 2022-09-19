import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers, providers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { SynthUtil } from '@synthetixio/contracts/build/mainnet/deployment/SynthUtil';
import type { SynthUtil as SynthUtilOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthUtil';
import { SynthetixProvider } from '@synthetixio/providers';
import { SignerContext } from '@snx-v2/SignerContext';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/SynthUtil'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/SynthUtil'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/SynthUtil'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/SynthUtil'),
};

export const getSynthUtil = async ({
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
  const contract = new ethers.Contract(address, abi, signerOrProvider) as SynthUtil | SynthUtilOvm;
  return contract;
};
export const useSynthUtil = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    // This contract doesn't have any mutative functions, but for consistency I think it make sense to keep it consistent
    [networkId, 'useSynthUtil', walletAddress],
    async () => {
      if (!networkId) throw Error('Network id required');

      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      return getSynthUtil({ networkId, signer, provider });
    },
    { staleTime: Infinity, enabled: Boolean(networkId) }
  );
};
