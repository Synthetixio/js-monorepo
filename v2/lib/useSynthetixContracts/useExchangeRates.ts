import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers, providers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { ExchangeRates } from '@synthetixio/contracts/build/mainnet/deployment/ExchangeRates';
import type { ExchangeRates as ExchangeRatesOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates';
import { SynthetixProvider } from '@synthetixio/providers';
import { SignerContext } from '@snx-v2/SignerContext';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/ExchangeRates'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/ExchangeRates'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/ExchangeRates'),
};

export const getExchangeRates = async ({
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
    | ExchangeRates
    | ExchangeRatesOvm;
  return contract;
};
export const useExchangeRates = () => {
  const { networkId } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    [networkId, 'useExchangeRates'],
    async () => {
      if (!networkId) throw Error('Network id required');

      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      return getExchangeRates({ networkId, signer, provider });
    },
    { staleTime: Infinity, enabled: Boolean(networkId) }
  );
};
