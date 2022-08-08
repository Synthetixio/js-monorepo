import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider, InfuraProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { hexStripZeros } from '@ethersproject/bytes';
import {
  L1_TO_L2_NETWORK_MAPPER,
  L2_TO_L1_NETWORK_MAPPER,
  OPTIMISM_NETWORKS,
} from '@synthetixio/optimism-networks';
import { ERRORS } from './constants';
import type { ProviderConfig, SynthetixProvider } from './types';
import { NetworkIdByName } from '@synthetixio/contracts-interface';

const loadProvider = ({ networkId = 1, infuraId, provider }: ProviderConfig): SynthetixProvider => {
  if (provider) {
    return new Web3Provider(provider);
  }
  if (infuraId) {
    return new InfuraProvider(networkId, infuraId);
  }
  throw new Error(ERRORS.noWeb3Provider);
};

const getOptimismProvider = ({ networkId }: { networkId: number }): StaticJsonRpcProvider => {
  if (!networkId) throw new Error(ERRORS.noNetworkId);

  const ovmNetworkId = L1_TO_L2_NETWORK_MAPPER[networkId] || networkId;
  if (!OPTIMISM_NETWORKS[networkId]) throw new Error(ERRORS.wrongNetworkId);

  return new StaticJsonRpcProvider(OPTIMISM_NETWORKS[ovmNetworkId].rpcUrls[0]);
};

/**
 * @dev if the new network is not added already, for instance in meta mask, this will throw an error. Call `wallet_addEthereumChain`
 * @param web3Provider
 * @param isOVM
 */
const handleSwitchChain = async (web3Provider: Web3Provider, isOVM: boolean): Promise<boolean> => {
  if (!web3Provider.provider?.request) return false;
  const newNetworkId = getCorrespondingNetwork(isOVM);
  const formattedChainId = hexStripZeros(BigNumber.from(newNetworkId).toHexString());
  const success = await web3Provider.provider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: formattedChainId }],
  });
  return success === null;
};

const getCorrespondingNetwork = (isOVM: boolean) => {
  if (isOVM) {
    return L2_TO_L1_NETWORK_MAPPER[NetworkIdByName['mainnet-ovm']];
  } else {
    return L1_TO_L2_NETWORK_MAPPER[NetworkIdByName.mainnet];
  }
};

export { loadProvider, getOptimismProvider, handleSwitchChain };
export type { ProviderConfig, SynthetixProvider };
export default loadProvider;
