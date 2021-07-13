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