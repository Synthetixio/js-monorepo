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
	getTokens,
	decode,
	defaults,
	getFeeds,
} from 'synthetix';
import { ethers } from 'ethers';

import {
	Config,
	Network,
	NetworkId,
	Target,
	TargetsRecord,
	ContractsMap,
	SynthetixJS,
	Synth,
	Token,
} from './types';
import { ERRORS } from './constants';

const synthetix = ({
	networkId,
	network,
	signer,
	provider,
	useOvm = false,
}: Config): SynthetixJS => {
	const [currentNetwork, currentNetworkId] = selectNetwork(networkId, network);
	return {
		network: {
			id: currentNetworkId,
			name: currentNetwork,
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

const selectNetwork = (networkId?: NetworkId, network?: Network): [Network, NetworkId] => {
	let currentNetwork: Network = Network.Mainnet;
	let currentNetworkId: NetworkId = NetworkId.Mainnet;
	if (
		(network && !networks.includes(network)) ||
		(networkId && !Object.values(networkToChainId).includes(networkId))
	) {
		throw new Error(ERRORS.badNetworkArg);
	} else if (network && networks.includes(network)) {
		currentNetwork = network;
		currentNetworkId = networkToChainId[network];
	} else if (networkId) {
		Object.entries(networkToChainId).forEach(([key, value]) => {
			if (value === networkId) {
				currentNetwork = key as Network;
				currentNetworkId = value as NetworkId;
			}
		});
	}
	return [currentNetwork, currentNetworkId];
};

const getSynthetixContracts = (
	network: Network,
	signer?: ethers.Signer,
	provider?: ethers.providers.Provider,
	useOvm?: boolean
): ContractsMap => {
	const sources = getSource({ network, useOvm });
	const targets: TargetsRecord = getTarget({ network, useOvm });

	return Object.values(targets)
		.map((target: Target) => {
			if (target.name === 'Synthetix') {
				target.address = targets.ProxyERC20.address;
			} else if (target.name === 'SynthsUSD') {
				target.address = targets.ProxyERC20sUSD.address;
			} else if (target.name === 'FeePool') {
				target.address = targets.ProxyFeePool.address;
			} else if (target.name.match(/Synth(s|i)[a-zA-Z]+$/)) {
				const newTarget = target.name.replace('Synth', 'Proxy');
				target.address = targets[newTarget].address;
			}
			return target;
		})
		.reduce((acc: ContractsMap, { name, source, address }: Target) => {
			acc[name] = new ethers.Contract(
				address,
				sources[source].abi,
				signer || provider || ethers.getDefaultProvider(network)
			);
			return acc;
		}, {});
};

export { synthetix, Network, NetworkId };
export type { Config, Target, TargetsRecord, ContractsMap, SynthetixJS, Synth, Token };
export default synthetix;
