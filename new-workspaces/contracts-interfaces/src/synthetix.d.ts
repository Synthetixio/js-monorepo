declare module 'synthetix' {
	import { NetworkName, NetworkId } from '.';
	import ethers from 'ethers';

	type SourceData = {
		bytecode: string;
		abi: ethers.ContractInterface;
	};
	type SourceRecord = Record<string, SourceData>;
	type Target = {
		name: string;
		source: string;
		address: string;
		link: string;
		timestamp: string;
		txn: string;
		network: NetworkName;
	};

	export type TargetsRecord = Record<string, Target>;
	type Feed = {
		asset: string;
		category: string;
		description?: string;
		exchange?: string;
		feed?: string;
		sign: string;
	};
	export type FeedRecord = Record<string, Feed>;

	export type Token = {
		address: string;
		asset?: string;
		decimals: number;
		feed?: string;
		index?: Array<{
			asset: string;
			category: string;
			description: string;
			sign: string;
			units: number;
			weight: number;
		}>;
		inverted?: {
			entryPoint: number;
			lowerLimit: number;
			upperLimit: number;
		};
		name: string;
		symbol: string;
	};
	export type User = {
		name: string;
		address: string;
	};
	type ContractInfo = {
		address: string;
		replaced_in: string;
		status: string;
	};
	export type Version = {
		commit: string;
		contracts: { [name: string]: ContractInfo };
		date: string;
		fulltag: string;
		network: string;
		release: string;
		tag: string;
	};
	type VersionRecord = Record<string, Version>;

	type StakingReward = {
		name: string;
		rewardsToken: string;
		stakingToken: string;
	};

	export function getNetworkFromId(arg: { id: NetworkId | number }): {
		useOvm?: boolean;
		network: NetworkName;
	};
	export function getSource<
		T extends { network: NetworkName; useOvm?: boolean; contract?: string }
	>(
		arg: T
	): T extends { network: NetworkName; useOvm?: boolean; contract: string } // If contract is provided we return Source data. If not we return the contracts map
		? SourceData
		: SourceRecord;
	export function getTarget<
		T extends { network: NetworkName; useOvm?: boolean; contract?: string }
	>(
		arg: T
	): T extends { network: NetworkName; useOvm?: boolean; contract: string } // If contract is provided we return Source data. If not we return the contracts map
		? Target
		: TargetsRecord;

	export const chainIdMapping = {
		1: {
			useOvm: false,
			fork: false,
			network: 'mainnet',
		},
		5: {
			useOvm: false,
			fork: false,
			network: 'goerli',
		},
		10: {
			useOvm: true,
			fork: false,
			network: 'mainnet',
		},
		42: {
			useOvm: false,
			fork: false,
			network: 'kovan',
		},
		69: {
			useOvm: true,
			fork: false,
			network: 'kovan',
		},
		31337: {
			useOvm: false,
			fork: true,
			network: 'mainnet',
		},
		'-1': {
			useOvm: true,
			fork: false,
			network: 'goerli',
		},
	} as const;
	export const networkToChainId = {
		mainnet: 1,
		goerli: 5,
		'mainnet-ovm': 10,
		kovan: 42,
		'kovan-ovm': 69,
		'mainnet-fork': 31337,
		'goerli-ovm': '-1',
	} as const;
	// eslint-disable-next-line
	export function getSynths(arg: { network: NetworkName; useOvm?: boolean }): any; // Note contract interface will generate enums for this and return the correct type to consumers
	export function getFeeds(arg: { network: NetworkName; useOvm?: boolean }): FeedRecord;
	export function getTokens(arg: { network: NetworkName; useOvm?: boolean }): Token[];
	export function getUsers(arg: { network: NetworkName; useOvm?: boolean }): User[];
	export function getVersions(arg: { network: NetworkName; useOvm?: boolean }): VersionRecord;
	export function toBytes32(key: string): string;
	export function getSuspensionReasons(): { [code: number]: string };
	export function getStakingRewards(arg: {
		network: NetworkName;
		useOvm?: boolean;
	}): StakingReward[];
	export const network: {
		id: NetworkId;
		name: NetworkName;
		useOvm: boolean;
	};
	export const networks: NetworkName[];
	export const networkToChainId: Record<NetworkName, NetworkId>;
	export const decode: (config: { network: NetworkName; data: string; target: Target }) => {
		// eslint-disable-next-line
		method: { name: string; params: Array<any> };
		contract: string;
	};
	// eslint-disable-next-line
	export const defaults: { [key: string]: any };
}
