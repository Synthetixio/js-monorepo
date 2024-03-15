import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById, NetworkIdByName } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { ExchangeRates } from '@synthetixio/contracts/build/mainnet/deployment/ExchangeRates';
import type { ExchangeRates as ExchangeRatesOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates';

import { SignerContext } from '@snx-v2/SignerContext';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/ExchangeRates'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates'),
};

export const getExchangeRates = async ({
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
    | ExchangeRates
    | ExchangeRatesOvm;
  return contract;
};
export const useExchangeRates = () => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  const { globalProviders } = useGlobalProvidersWithFallback();
  return useQuery(
    // We add walletAddress as a query key to make sure the signer is up to date, we cant use signer directly since it cant be stringified

    {
      queryKey: ['useExchangeRates', { networkId, walletAddress }],
      queryFn: async () => {
        if (!networkId) throw Error('Network id required');
        const globalProvider =
          networkId === NetworkIdByName.mainnet
            ? globalProviders.mainnet
            : globalProviders.optimism;
        const provider = signer?.provider || globalProvider;

        return getExchangeRates({ networkId, signer, provider });
      },
      staleTime: Infinity,
      enabled: Boolean(networkId),
    }
  );
};
