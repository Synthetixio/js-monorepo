import { BigNumber } from '@ethersproject/bignumber';
import {
  Web3Provider,
  InfuraProvider,
  StaticJsonRpcProvider,
  FallbackProviderConfig,
  AlchemyProvider,
  FallbackProvider,
} from '@ethersproject/providers';
import { hexStripZeros } from '@ethersproject/bytes';
import {
  L1_TO_L2_NETWORK_MAPPER,
  L2_TO_L1_NETWORK_MAPPER,
  OPTIMISM_NETWORKS,
} from '@synthetixio/optimism-networks';
import { ERRORS } from './constants';
import type { ProviderConfig, SynthetixProvider } from './types';
import { NetworkIdByName } from '@synthetixio/contracts-interface';

export const PROVIDER_STALL_TIMEOUT = 750;
export const PROVIDER_DEFAULT_WEIGHT = 1;

const loadProvider = ({
  networkId = 1,
  infuraId,
  alchemyId,
  provider,
}: ProviderConfig): SynthetixProvider => {
  const providersConfig: FallbackProviderConfig[] = [];

  if (provider) {
    providersConfig.push({
      provider: new Web3Provider(provider),
      priority: 30,
      stallTimeout: PROVIDER_STALL_TIMEOUT,
      weight: PROVIDER_DEFAULT_WEIGHT,
    });
  }

  if (infuraId) {
    providersConfig.push({
      provider: new InfuraProvider(networkId, infuraId),
      priority: 10,
      stallTimeout: PROVIDER_STALL_TIMEOUT,
      weight: PROVIDER_DEFAULT_WEIGHT,
    });
  }

  if (alchemyId) {
    providersConfig.push({
      provider: new AlchemyProvider(networkId, alchemyId),
      priority: 20,
      stallTimeout: PROVIDER_STALL_TIMEOUT,
      weight: PROVIDER_DEFAULT_WEIGHT,
    });
  }

  return new FallbackProvider(providersConfig);
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
