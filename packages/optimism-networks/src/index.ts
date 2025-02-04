import { hexStripZeros } from '@ethersproject/bytes';
import { ethers } from 'ethers';

import {
  DEFAULT_LAYER2_NETWORK,
  DEFAULT_MAINNET_NETWORK,
  L1_TO_L2_NETWORK_MAPPER,
  L2_TO_L1_NETWORK_MAPPER,
  MESSENGER_ADDRESSES,
  METAMASK_MISSING_NETWORK_ERROR_CODE,
  OPTIMISM_NETWORKS,
} from './constants';
import { OptimismNetwork } from './types';

const getOptimismNetwork = ({
  layerOneNetworkId,
}: {
  layerOneNetworkId: number;
}): OptimismNetwork => {
  if (!layerOneNetworkId) throw new Error('NetworkId required');
  // If user is on a unsupported network, just add optimism mainnet.
  const optimismNetwork =
    L1_TO_L2_NETWORK_MAPPER[layerOneNetworkId] || L1_TO_L2_NETWORK_MAPPER[DEFAULT_MAINNET_NETWORK];
  return OPTIMISM_NETWORKS[optimismNetwork];
};

const addOptimismNetworkToMetamask = async ({ ethereum }: { ethereum: any }): Promise<void> => {
  if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
  const optimismNetworkConfig = getOptimismNetwork({ layerOneNetworkId: Number(ethereum.chainId) });

  await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [optimismNetworkConfig],
  });
};
const switchToL1 = async ({ ethereum }: { ethereum: any }): Promise<void> => {
  if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
  const networkId =
    L2_TO_L1_NETWORK_MAPPER[Number(ethereum.chainId)] ||
    L2_TO_L1_NETWORK_MAPPER[DEFAULT_LAYER2_NETWORK];
  const formattedChainId = hexStripZeros(ethers.BigNumber.from(networkId).toHexString());
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: formattedChainId }],
  });
};
const switchToL2 = async ({ ethereum }: { ethereum: any }): Promise<void> => {
  if (!ethereum || !ethereum.isMetaMask) throw new Error('Metamask is not installed');
  try {
    const networkId =
      L1_TO_L2_NETWORK_MAPPER[Number(ethereum.chainId)] ||
      L1_TO_L2_NETWORK_MAPPER[DEFAULT_MAINNET_NETWORK];

    const formattedChainId = hexStripZeros(ethers.BigNumber.from(networkId).toHexString());
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.code === METAMASK_MISSING_NETWORK_ERROR_CODE) {
      addOptimismNetworkToMetamask({ ethereum });
      return;
    }
  }
};

export {
  getOptimismNetwork,
  addOptimismNetworkToMetamask,
  OPTIMISM_NETWORKS,
  MESSENGER_ADDRESSES,
  L1_TO_L2_NETWORK_MAPPER,
  L2_TO_L1_NETWORK_MAPPER,
  switchToL1,
  switchToL2,
};
