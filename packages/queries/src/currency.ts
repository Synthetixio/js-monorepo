import keyBy from 'lodash/keyBy';
import { Rates } from './types';

import {
  CurrencyKey,
  Synths,
  FIAT_SYNTHS as FIAT_SYNTHS_CONTRACT,
} from '@synthetixio/contracts-interface';
import { wei } from '@synthetixio/wei';

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const sUSD_EXCHANGE_RATE = 1;

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
  YFI = 'YFI',
}
export const FIAT_SYNTHS = FIAT_SYNTHS_CONTRACT;

export const CRYPTO_CURRENCY = Object.keys(CryptoCurrency);

export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const isSynth = (currencyKey: CurrencyKey) => currencyKey in Synths;
export const isCryptoCurrency = (currencyKey: CurrencyKey) => currencyKey in CryptoCurrency;
export const isFiatCurrency = (currencyKey: CurrencyKey) => FIAT_SYNTHS.has(currencyKey);

// TODO: replace this with a more robust logic (like checking the asset field)
export const toInverseSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^s/i, 'i');
export const toStandardSynth = (currencyKey: CurrencyKey) => currencyKey.replace(/^i/i, 's');
export const synthToAsset = (currencyKey: CurrencyKey) =>
  currencyKey.replace(/^(i|s)/i, '') as CurrencyKey;
export const assetToSynth = (currencyKey: CurrencyKey) => `s${currencyKey}`;
export const iStandardSynth = (currencyKey: CurrencyKey) => currencyKey.startsWith('s');

export const synthToContractName = (currencyKey: CurrencyKey) => `Synth${currencyKey}`;

export const getExchangeRatesForCurrencies = (
  rates: Rates | null,
  base: CurrencyKey | null,
  quote: CurrencyKey | null
) => (rates == null || base == null || quote == null ? wei(0) : rates[base]!.div(rates[quote]!));

export const getCurrencyKeyURLPath = (currencyKey: CurrencyKey) =>
  `https:///www.synthetix.io/assets/synths/svg/${currencyKey}.svg`;
