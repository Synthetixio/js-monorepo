import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isSupportedNetworkId, NetworkNameById, NetworkIdByName } from './common';
import type { Issuer } from '@synthetixio/contracts/build/mainnet/deployment/Issuer';
import type { Issuer as IssuerOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Issuer';
import { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/useGlobalProvidersWithFallback';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Issuer'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Issuer'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Issuer'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Issuer'),
};

export const getIssuer = async ({
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
  const contract = new ethers.Contract(address, abi, signerOrProvider) as Issuer | IssuerOvm;
  return contract;
};
export const useIssuer = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();

  return useQuery({
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified
    queryKey: ['useIssuer', { networkId, walletAddress }],
    queryFn: () => {
      if (!networkId) throw Error('Network id required');

      const globalProvider =
        networkId === NetworkIdByName.mainnet ? globalProviders.mainnet : globalProviders.optimism;
      const provider = signer?.provider || globalProvider;
      return getIssuer({ networkId, signer, provider });
    },
    staleTime: Infinity,
    enabled: Boolean(networkId),
  });
};
