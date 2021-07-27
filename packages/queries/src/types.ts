import Wei from '@synthetixio/wei';
import { CurrencyKey } from '@synthetixio/contracts-interface';

export type GasPrices = {
	fastest: number;
	fast: number;
	average: number;
};

export type GasSpeed = keyof GasPrices;

export const GAS_SPEEDS: GasSpeed[] = ['average', 'fast', 'fastest'];

export type BaseRateUpdate = {
	timestamp: number;
	rate: number;
};

export type Candle = {
	id: string;
	synth: string;
	open: BigInt;
	high: BigInt;
	low: BigInt;
	close: BigInt;
	timestamp: BigInt;
};

export type BaseRateUpdates = BaseRateUpdate[];

export type HistoricalRatesUpdates = {
	rates: BaseRateUpdate[];
	low: number;
	high: number;
	change: number;
};

export type MarketCap = {
	marketCap: number;
};

export type Rates = Record<string, number>;

export type HistoricalVolume = Record<CurrencyKey, Wei>;

export type FrozenSynths = Set<CurrencyKey>;

export type SynthSuspensionReason =
	| 'system-upgrade'
	| 'market-closure'
	| 'circuit-breaker'
	| 'emergency';

export type SynthSuspended = {
	isSuspended: boolean;
	reasonCode: number;
	reason: SynthSuspensionReason | null;
};
export type SynthBalance = {
	currencyKey: CurrencyKey;
	balance: Wei;
	usdBalance: Wei;
};

export type SynthBalancesMap = Record<CurrencyKey, SynthBalance>;

export type Balances = {
	balancesMap: SynthBalancesMap;
	balances: SynthBalance[];
	totalUSDBalance: Wei;
};

export type TokenBalances = Partial<
	Record<
		string,
		{
			balance: Wei;
			token: any;
		}
	>
>;

export type GlobalStakingInfo = {
	snxPrice: Wei;
	totalIssuedSynths: Wei;
	issuanceRatio: Wei;
	totalSupply: Wei;
	lockedSupply: Wei;
	lockedValue: Wei;
}

export type Token = {
	address: string;
	chainId: number;
	decimals: number;
	logoURI: string;
	name: string;
	symbol: string;
	tags: string[];
};

export type TokenListResponse = {
	keywords: string[];
	logoURI: string;
	name: string;
	tags: any;
	timestamp: string;
	tokens: Token[];
	version: { major: number; minor: number; patch: number };
};

export type TokenListQueryResponse = {
	tokens: Token[];
	tokensMap: Record<string, Token>;
	symbols: string[];
};

export enum ProposalStates {
	ACTIVE = 'active',
	CLOSED = 'closed',
}

export type SpaceData = {
	domain: string;
	filters: {
		onlyMembers: boolean;
		minScore: number;
	};
	members: string[];
	name: string;
	network: string;
	skin: string;
	strategies: SpaceStrategy[];
	symbol: string;
};

export type SpaceStrategy = {
	name: string;
	params: {
		address?: string;
		decimals: number;
		symbol: string;
	};
};

export type Proposal = {
	id: string;
	author: string;
	created: number;
	space: SpaceData;
	network: string;
	strategies: SpaceStrategy;
	plugins: any;
	title: string;
	body: string;
	choices: string[];
	start: number;
	end: number;
	snapshot: string;
	state: string;
};

export type Vote = {
	id: string;
	voter: string;
	created: number;
	space: SpaceData;
	proposal: string;
	choice: any;
	metadata: any;
};

export type ProposalResults = {
	totalBalances: number[];
	totalScores: any;
	totalVotes: number[];
	totalVotesBalances: number;
	choices: string[];
	spaceSymbol: string;
	voteList: any[];
};

export type HistoricalTrade = {
	block: number;
	date: Date;
	feesInUSD: number;
	fromAddress: string;
	fromAmount: number;
	fromAmountInUSD: number;
	fromCurrencyKey: CurrencyKey;
	fromCurrencyKeyBytes: string;
	gasPrice: number;
	hash: string;
	timestamp: number;
	toAddress: string;
	toAmount: number;
	toAmountInUSD: number;
	toCurrencyKey: CurrencyKey;
	toCurrencyKeyBytes: string;
	price: number;
	amount: number;
	isSettled: boolean;
	reclaim: number;
	rebate: number;
	settledPrice: number;
};

export type HistoricalTrades = HistoricalTrade[];
