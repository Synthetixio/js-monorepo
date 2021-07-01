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

const selectNetwork = (networkId?: NetworkId, network?: Network): [Network, NetworkId, boolean] => {
	// Validate the passed in network and networkId.
	if (
		(network && !networkToChainId[network]) ||
		(networkId && !getNetworkFromId({ id: networkId }))
	) {
		throw new Error(ERRORS.badNetworkArg);
	}
	
	if (network) {
		const networkId = networkToChainId(network)
		const { useOvm } = getNetworkFromId({ id: networkId });
		return [network, networkId, useOvm]
	} else if (networkId) {
		const config = getNetworkFromId({ id: networkId });
		const network = config.name
		const useOvm = config.useOvm
		return [network, networkId, useOvm]
	}
	
	return [Network.Mainnet, NetworkId.Mainnet, true]
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
