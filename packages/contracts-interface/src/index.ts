import {
  getSource,
  getTarget,
  getSynths,
  getUsers,
  toBytes32,
  getVersions,
  getSuspensionReasons,
  getStakingRewards,
  networks,
  networkToChainId,
  getNetworkFromId,
  getTokens,
  decode,
  defaults,
  getFeeds,
  Token,
  TargetsRecord,
  Target,
} from 'synthetix';
import { ethers } from 'ethers';

import {
  Config,
  CurrencyKey,
  CurrencyCategory,
  NetworkId,
  NetworkIdByNameType,
  ContractsMap,
  SynthetixJS,
  Synth,
  NetworkName,
  NetworkIdByName,
  NetworkNameById,
  FIAT_SYNTHS,
} from './types';

import { SynthsByName as MainnetSynths } from '@synthetixio/contracts/build/mainnet/synths';
import { SynthsByName as OptimismSynths } from '@synthetixio/contracts/build/mainnet-ovm/synths';

import { ERRORS } from './constants';

const synthetix = ({ networkId, network, signer, provider }: Config): SynthetixJS => {
  const [currentNetwork, currentNetworkId, useOvm] = selectNetwork(networkId, network);
  return {
    network: {
      id: currentNetworkId,
      name: currentNetwork,
      useOvm,
    },
    networks,
    networkToChainId,
    decode,
    defaults,
    feeds: getFeeds({ network: currentNetwork, useOvm }),
    tokens: getTokens({ network: currentNetwork, useOvm }),
    sources: getSource({ network: currentNetwork, useOvm }),
    targets: getTarget({ network: currentNetwork, useOvm }),
    synths: getSynths({ network: currentNetwork, useOvm }),
    users: getUsers({ network: currentNetwork, useOvm }),
    versions: getVersions({ network: currentNetwork, useOvm }),
    stakingRewards: getStakingRewards({ network: currentNetwork, useOvm }),
    suspensionReasons: getSuspensionReasons(),
    toBytes32,
    utils: ethers.utils,
    contracts: getSynthetixContracts(currentNetwork, signer, provider, useOvm),
  };
};

const selectNetwork = (
  networkId?: NetworkId,
  network?: NetworkName
): [NetworkName, NetworkId, boolean] => {
  let currentNetworkId: NetworkId;
  let currentNetworkName: NetworkName;
  let useOvm = false;
  if (
    (network && !networkToChainId[network]) ||
    (networkId && !getNetworkFromId({ id: networkId }))
  ) {
    throw new Error(ERRORS.badNetworkArg);
  } else if (network && networkToChainId[network]) {
    const networkToId = NetworkIdByName[network];
    const networkFromId = getNetworkFromId({ id: networkToId });
    currentNetworkId = networkToChainId[network];
    currentNetworkName = networkFromId.network;
    useOvm = !!networkFromId.useOvm;
  } else if (networkId) {
    const networkFromId = getNetworkFromId({ id: networkId });
    currentNetworkId = networkId;
    currentNetworkName = networkFromId.network;
    useOvm = Boolean(networkFromId.useOvm);
  } else {
    currentNetworkId = NetworkIdByName.mainnet;
    currentNetworkName = NetworkNameById[1];
  }
  return [currentNetworkName, currentNetworkId, useOvm];
};

const getSynthetixContracts = (
  network: NetworkName,
  signer?: ethers.Signer,
  provider?: ethers.providers.Provider,
  useOvm?: boolean
): ContractsMap => {
  const sources = getSource({ network, useOvm: Boolean(useOvm) });
  const targets = getTarget({ network, useOvm: Boolean(useOvm) });

  return Object.values(targets)
    .map((target) => {
      if (target.name === 'Synthetix') {
        target.address = targets.ProxySynthetix.address;
      } else if (target.name === 'FeePool') {
        target.address = targets.ProxyFeePool.address;
      } else if (target.name.match(/Synth(s|i)[a-zA-Z]+$/)) {
        const newTarget = target.name.replace('Synth', 'Proxy');
        target.address = targets[newTarget].address;
      }
      return target;
    })
    .reduce((acc: ContractsMap, { name, source, address }) => {
      acc[name] = new ethers.Contract(
        address,
        sources[source].abi,
        signer || provider || ethers.getDefaultProvider(network)
      );
      return acc;
    }, {});
};
//  Adding a type assertion to help typescript infer the type correctly
const Synths: typeof MainnetSynths = { ...MainnetSynths, ...OptimismSynths };

export {
  synthetix,
  NetworkNameById,
  NetworkIdByName,
  Synths,
  CurrencyCategory,
  networkToChainId,
  getNetworkFromId,
  FIAT_SYNTHS,
};
export type {
  Config,
  CurrencyKey,
  Target,
  TargetsRecord,
  ContractsMap,
  SynthetixJS,
  Synth,
  Token,
  NetworkName,
  NetworkId,
  NetworkIdByNameType,
};
export default synthetix;
