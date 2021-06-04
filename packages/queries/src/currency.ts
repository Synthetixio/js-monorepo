import keyBy from 'lodash/keyBy';
import { Rates } from './types';

// note: this file should be replaced with generator functions which can read from either `synthetix` or snxjs libraries
// because, ultimately, that is the source of truth for which synths exist.

export enum Synths {
	iADA = 'iADA',
	iBCH = 'iBCH',
	iBNB = 'iBNB',
	iBTC = 'iBTC',
	iCEX = 'iCEX',
	iDASH = 'iDASH',
	iDEFI = 'iDEFI',
	iEOS = 'iEOS',
	iETC = 'iETC',
	iETH = 'iETH',
	iLINK = 'iLINK',
	iLTC = 'iLTC',
	iOIL = 'iOIL',
	iTRX = 'iTRX',
	iXMR = 'iXMR',
	iXRP = 'iXRP',
	iXTZ = 'iXTZ',
	sAAPL = 'sAAPL',
	sAAVE = 'sAAVE',
	sADA = 'sADA',
	sAMZN = 'sAMZN',
	sAUD = 'sAUD',
	sBCH = 'sBCH',
	sBNB = 'sBNB',
	sBTC = 'sBTC',
	sCEX = 'sCEX',
	sCHF = 'sCHF',
	sCOIN = 'sCOIN',
	sCOMP = 'sCOMP',
	sDASH = 'sDASH',
	sDEFI = 'sDEFI',
	sDOT = 'sDOT',
	sEOS = 'sEOS',
	sETC = 'sETC',
	sETH = 'sETH',
	sEUR = 'sEUR',
	sFB = 'sFB',
	sFTSE = 'sFTSE',
	sGBP = 'sGBP',
	sGOOG = 'sGOOG',
	sJPY = 'sJPY',
	sLINK = 'sLINK',
	sLTC = 'sLTC',
	sMSFT = 'sMSFT',
	sNFLX = 'sNFLX',
	sNIKKEI = 'sNIKKEI',
	sOIL = 'sOIL',
	sREN = 'sREN',
	sTRX = 'sTRX',
	sTSLA = 'sTSLA',
	sUNI = 'sUNI',
	sUSD = 'sUSD',
	sXAG = 'sXAG',
	sXAU = 'sXAU',
	sXMR = 'sXMR',
	sXRP = 'sXRP',
	sXTZ = 'sXTZ',
	sYFI = 'sYFI',
}

export type CurrencyKey = keyof typeof Synths;

export const FIAT_SYNTHS = new Set([
	Synths.sEUR,
	Synths.sJPY,
	Synths.sUSD,
	Synths.sAUD,
	Synths.sGBP,
	Synths.sCHF,
]);

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const sUSD_EXCHANGE_RATE = 1;

/*export const CRYPTO_CURRENCY = [
	'AAVE',
	'ADA',
	'BCH',
	'BNB',
	'BTC',
	'COMP',
	'DASH',
	'EOS',
	'ETC',
	'ETH',
	'KNC',
	'LINK',
	'LTC',
	'REN',
	'SNX',
	'TRX',
	'UNI',
	'XMR',
	'XRP',
	'XTZ',
];*/

// compute related type from CRYPTO_CURRENCY

export enum CryptoCurrency {
	AAVE = 'AAVE',
	ADA = 'ADA',
	BCH = 'BCH',
	BNB = 'BNB',
	BTC = 'BTC',
	COMP = 'COMP',
	CRV = 'CRV',
	DASH = 'DASH',
	DHT = 'DHT',
	DOT = 'DOT',
	EOS = 'EOS',
	ETC = 'ETC',
	ETH = 'ETH',
	KNC = 'KNC',
	LEND = 'LEND',
	LINK = 'LINK',
	LTC = 'LTC',
	REN = 'REN',
	RENBTC = 'renBTC',
	SNX = 'SNX',
	TRX = 'TRX',
	UNI = 'UNI',
	WBTC = 'wBTC',
	WETH = 'wETH',
	XMR = 'XMR',
	XRP = 'XRP',
	XTZ = 'XTZ',
	YFI = 'YFI'
}

export const CRYPTO_CURRENCY = Object.keys(CryptoCurrency)

export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const isSynth = (currencyKey: CurrencyKey) => currencyKey in Synths;
export const isCryptoCurrency = (currencyKey: CurrencyKey) => currencyKey in CryptoCurrency;
// @ts-ignore
export const isFiatCurrency = (currencyKey: CurrencyKey) => FIAT_SYNTHS.has(currencyKey);

// TODO: replace this with a more robust logic (like checking the asset field)
export const toInverseSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^s/i, 'i');
export const toStandardSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^i/i, 's');
export const synthToAsset = (currencyKey: CurrencyKey) => currencyKey.replace(/^(i|s)/i, '');
export const assetToSynth = (currencyKey: CurrencyKey) => `s${currencyKey}`;
export const iStandardSynth = (currencyKey: CurrencyKey) => currencyKey.startsWith('s');

export const synthToContractName = (currencyKey: CurrencyKey) => `Synth${currencyKey}`;

export const getExchangeRatesForCurrencies = (
	rates: Rates | null,
	base: CurrencyKey | null,
	quote: CurrencyKey | null
) => (rates == null || base == null || quote == null ? 0 : rates[base] * (1 / rates[quote]));

export const getCurrencyKeyURLPath = (currencyKey: CurrencyKey) =>
	`https:///www.synthetix.io/assets/synths/svg/${currencyKey}.svg`;
