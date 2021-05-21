import keyBy from 'lodash/keyBy';
import { Rates } from './types';

export type CurrencyKey = string;

export enum Synths {
	sBTC = 'sBTC',
	sETH = 'sETH',
	sXRP = 'sXRP',
	sBCH = 'sBCH',
	sLTC = 'sLTC',
	sEOS = 'sEOS',
	sBNB = 'sBNB',
	sXTZ = 'sXTZ',
	sXMR = 'sXMR',
	sADA = 'sADA',
	sLINK = 'sLINK',
	sTRX = 'sTRX',
	sDASH = 'sDASH',
	sETC = 'sETC',
	iBTC = 'iBTC',
	iETH = 'iETH',
	iXRP = 'iXRP',
	iBCH = 'iBCH',
	iLTC = 'iLTC',
	iEOS = 'iEOS',
	iBNB = 'iBNB',
	iXTZ = 'iXTZ',
	iXMR = 'iXMR',
	iADA = 'iADA',
	iLINK = 'iLINK',
	iTRX = 'iTRX',
	iDASH = 'iDASH',
	iETC = 'iETC',
	sFTSE = 'sFTSE',
	sNIKKEI = 'sNIKKEI',
	sXAU = 'sXAU',
	sXAG = 'sXAG',
	sOIL = 'sOIL',
	iOIL = 'iOIL',
	sEUR = 'sEUR',
	sJPY = 'sJPY',
	sUSD = 'sUSD',
	sAUD = 'sAUD',
	sGBP = 'sGBP',
	sCHF = 'sCHF',
	sCEX = 'sCEX',
	sDEFI = 'sDEFI',
	iCEX = 'iCEX',
	iDEFI = 'iDEFI',
	sTSLA = 'sTSLA',
	sFB = 'sFB',
	sAAPL = 'sAAPL',
	sAMZN = 'sAMZN',
	sNFLX = 'sNFLX',
	sGOOG = 'sGOOG',
	sMSFT = 'sMSFT',
	sCOIN = 'sCOIN',
}

export enum CryptoCurrency {
	KNC = 'KNC',
	COMP = 'COMP',
	REN = 'REN',
	LEND = 'LEND',
	SNX = 'SNX',
	BTC = 'BTC',
	WBTC = 'wBTC',
	RENBTC = 'renBTC',
	ETH = 'ETH',
	WETH = 'wETH',
	XRP = 'XRP',
	BCH = 'BCH',
	LTC = 'LTC',
	EOS = 'EOS',
	BNB = 'BNB',
	XTZ = 'XTZ',
	XMR = 'XMR',
	ADA = 'ADA',
	LINK = 'LINK',
	TRX = 'TRX',
	DASH = 'DASH',
	ETC = 'ETC',
	CRV = 'CRV',
	DHT = 'DHT',
}

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

export const CRYPTO_CURRENCY = [
	'KNC',
	'COMP',
	'REN',
	'LEND',
	'SNX',
	'BTC',
	'ETH',
	'XRP',
	'BCH',
	'LTC',
	'EOS',
	'BNB',
	'XTZ',
	'XMR',
	'ADA',
	'LINK',
	'TRX',
	'DASH',
	'ETC',
];

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