import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { isSupportedNetworkId, NetworkNameById } from './common';
import { ContractContext } from '@snx-v2/ContractContext';

import type { Liquidator } from '@synthetixio/contracts/build/mainnet/deployment/Liquidator';
import type { Liquidator as LiquidatorOvm } from '@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator';
import { SynthetixProvider } from '@synthetixio/providers';

const contracts = {
  mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Liquidator'),
  'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator'),
  goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Liquidator'),
  'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Liquidator'),
};

export const getLiquidator = async ({
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
    | Liquidator
    | LiquidatorOvm;
  return contract;
};
export const useLiquidator = () => {
  const { networkId, signer, provider } = useContext(ContractContext);

  return useQuery(
    [networkId, Boolean(signer), 'useLiquidator'],
    async () => getLiquidator({ networkId, signer, provider }),
    { staleTime: Infinity }
  );
};
