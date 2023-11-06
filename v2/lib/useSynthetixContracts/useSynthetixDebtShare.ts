import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isSupportedNetworkId, NetworkNameById, NetworkIdByName } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { SynthetixDebtShare } from '@synthetixio/contracts/build/mainnet/deployment/SynthetixDebtShare';
import type { SynthetixDebtShare as SynthetixDebtShareOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixDebtShare';
import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/SynthetixDebtShare'),
  'mainnet-ovm': () =>
    import('@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixDebtShare'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/SynthetixDebtShare'),
  'goerli-ovm': () =>
    import('@synthetixio/contracts/build/goerli-ovm/deployment/SynthetixDebtShare'),
};

export const getSynthetixDebtShare = async ({
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
    | SynthetixDebtShare
    | SynthetixDebtShareOvm;
  return contract;
};
export const useSynthetixDebtShare = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();
  return useQuery({
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    queryKey: ['useSynthetixDebtShare', { networkId, walletAddress }],
    queryFn: async () => {
      if (!networkId) throw Error('Network id required');

      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      return getSynthetixDebtShare({ networkId, signer, provider });
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};
