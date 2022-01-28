import { ethers } from 'ethers';
import {
	FeedRecord,
	SourceRecord,
	StakingReward,
	Target,
	TargetsRecord,
	Token,
	User,
	Version,
	networkToChainId,
} from 'synthetix';

import { Synths } from '../generated/mainnet';

export const NetworkIdByName = {
	mainnet: 1,
	goerli: 5,
	'mainnet-ovm': 10,
	kovan: 42,
	'kovan-ovm': 69,
	'mainnet-fork': 31337,
} as const;

export const NetworkNameById = {
	1: 'mainnet',
	5: 'goerli',
	42: 'kovan',
	10: 'mainnet-ovm',
	69: 'kovan-ovm',
	31337: 'mainnet-fork',
} as const;

export type NetworkIdByNameType = typeof NetworkIdByName;
export type NetworkName = keyof typeof NetworkIdByName;
export type NetworkId = typeof NetworkIdByName[keyof typeof NetworkIdByName];

export type SynthetixJS = {
	networks: Array<NetworkName>;
	networkToChainId: typeof networkToChainId;
	decode: (config: { network: NetworkName; data: string; target: Target }) => {
		method: { name: string; params: Array<any> };
		contract: string;
	};
	defaults: { [key: string]: any };
	feeds: FeedRecord;
	tokens: Array<Token>;
	network: {
		id: NetworkId;
		name: NetworkName;
		useOvm: boolean;
	};
	sources: SourceRecord;
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

export type ContractsMap = {
	[name: string]: ethers.Contract;
};

export type Config = {
	networkId?: NetworkId;
	network?: NetworkName;
	signer?: ethers.Signer;
	provider?: ethers.providers.Provider;
	useOvm?: boolean;
};

export type CurrencyKey = keyof typeof Synths;

export const FIAT_SYNTHS = new Set([
	Synths.sEUR,
	Synths.sJPY,
	Synths.sUSD,
	Synths.sAUD,
	Synths.sGBP,
	Synths.sCHF,
]);

export enum CurrencyCategory {
	'crypto' = 'Crypto',
	'forex' = 'Forex',
	'equity' = 'Equity',
	'commodity' = 'Commodity',
}

export type Synth = {
	name: CurrencyKey;
	asset: string;
	category: CurrencyCategory;
	sign: string;
	description: string;
	aggregator?: string;
	subclass?: string;
};
