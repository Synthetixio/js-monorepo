import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers, providers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { RewardEscrowV2 } from '@synthetixio/contracts/build/mainnet/deployment/RewardEscrowV2';
import type { RewardEscrowV2 as RewardEscrowV2Ovm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/RewardEscrowV2';
import { SynthetixProvider } from '@synthetixio/providers';
import { SignerContext } from '@snx-v2/SignerContext';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/RewardEscrowV2'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/RewardEscrowV2'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/RewardEscrowV2'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/RewardEscrowV2'),
};

export const getRewardEscrowV2 = async ({
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
    | RewardEscrowV2
    | RewardEscrowV2Ovm;
  return contract;
};
export const useRewardEscrowV2 = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    [networkId, 'useRewardEscrowV2', walletAddress],
    async () => {
      if (!networkId) throw Error('Network id required');

      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      return getRewardEscrowV2({ networkId, signer, provider });
    },
    { staleTime: Infinity, enabled: Boolean(networkId) }
  );
};
