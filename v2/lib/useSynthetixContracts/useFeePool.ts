import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers, providers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { FeePool } from '@synthetixio/contracts/build/mainnet/deployment/FeePool';
import type { FeePool as FeePoolOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/FeePool';
import { SynthetixProvider } from '@synthetixio/providers';
import { SignerContext } from '@snx-v2/SignerContext';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/FeePool'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/FeePool'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/FeePool'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/FeePool'),
};

export const getFeePool = async ({
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
  const contract = new ethers.Contract(address, abi, signerOrProvider) as FeePool | FeePoolOvm;
  return contract;
};
export const useFeePool = () => {
  const { networkId } = useContext(ContractContext);
  const signer = useContext(SignerContext);

  return useQuery(
    [networkId, 'useFeePool'],
    async () => {
      if (!networkId) throw Error('Network id required');

      const provider = new providers.InfuraProvider(
        networkId,
        process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
      );

      return getFeePool({ networkId, signer, provider });
    },
    { staleTime: Infinity, enabled: Boolean(networkId) }
  );
};
