import { ethers } from 'ethers';

export enum Network {
	Mainnet = 'mainnet',
	Ropsten = 'ropsten',
	Rinkeby = 'rinkeby',
	Goerli = 'goerli',
	Kovan = 'kovan',
}

export enum NetworkId {
	Mainnet = 1,
	Ropsten = 3,
	Rinkeby = 4,
	Goerli = 5,
	Kovan = 42,
}

type ContractInfo = {
	address: string;
	replaced_in: string;
	status: string;
};

type Version = {
	commit: string;
	contracts: { [name: string]: ContractInfo };
	date: string;
	fulltag: string;
	network: string;
	release: string;
	tag: string;
};

type StakingReward = {
	name: string;
	rewardsToken: string;
	stakingToken: string;
};

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

type Feed = {
	asset: string;
	category: string;
	description?: string;
	exchange?: string;
	feed?: string;
	sign: string;
};

export type SynthetixJS = {
	networks: Array<Network>;
	networkToChainId: Record<Network, NetworkId>;
	decode: (config: {
		network: Network;
		data: string;
		target: Target;
	}) => { method: { name: string; params: Array<any> }; contract: string };
	defaults: { [key: string]: any };
	feeds: { [symbol: string]: Feed };
	tokens: Array<Token>;
	network: {
		id: NetworkId;
		name: Network;
	};
	sources: { [name: string]: SourceData };
	targets: TargetsRecord;
	synths: Synth[];
	versions: { [version: string]: Version };
	stakingRewards: Array<StakingReward>;
	suspensionReasons: { [code: number]: string };
	users: User[];
	toBytes32: (key: string) => string;
	utils: typeof ethers.utils;
	contracts: ContractsMap;
};

export type SourceData = {
	bytecode: string;
	abi: ethers.ContractInterface;
};

export type Target = {
	name: string;
	source: string;
	address: string;
	link: string;
	timestamp: string;
	txn: string;
	network: Network;
};

export type TargetsRecord = Record<string, Target>;

export interface ContractDefinition {
	name: string;
	abi: ethers.ContractInterface;
	address: string;
}

export type ContractsMap = {
	[name: string]: ethers.Contract;
};

export type Config = {
	networkId?: NetworkId;
	network?: Network;
	signer?: ethers.Signer;
	provider?: ethers.providers.Provider;
	useOvm?: boolean;
};

export type Synth = {
	name: string;
	asset: string;
	category: string;
	sign: string;
	description: string;
	aggregator?: string;
	subclass?: string;
};

export type User = {
	name: string;
	address: string;
};
