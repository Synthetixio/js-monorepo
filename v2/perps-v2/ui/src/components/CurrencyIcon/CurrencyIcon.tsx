type CurrencyKey =
  | 'AAVE'
  | 'sETH'
  | 'APE'
  | 'ATOM'
  | 'AUD'
  | 'AVAX'
  | 'AXS'
  | 'BNB'
  | 'DOGE'
  | 'DYDX'
  | 'EUR'
  | 'FLOW'
  | 'FTM'
  | 'GBP'
  | 'LINK'
  | 'MATIC'
  | 'NEAR'
  | 'OP'
  | 'SOL'
  | 'UNI'
  | 'XAG'
  | 'XAU'
  | 'sBTC'
  | 'APT'
  | 'LDO'
  | 'ADA'
  | 'GMX'
  | 'FIL'
  | 'LTC'
  | 'BCH'
  | 'SHIB'
  | 'CRV'
  | string; //TODO Fix

interface CurrencyIconProps {
  currencyKey: CurrencyKey;
  width?: number;
  height?: number;
}

const parseCurrencyKey = (currencyKey: CurrencyKey) => {
  if (currencyKey === 'sETH') return 'ETH';
  if (currencyKey === 'sBTC') return 'BTC';
  return currencyKey;
};

export const CurrencyIcon = ({ currencyKey, width = 30, height = 30 }: CurrencyIconProps) => {
  return (
    <img
      src={`https://raw.githubusercontent.com/Synthetixio/synthetix-assets/master/markets/${parseCurrencyKey(
        currencyKey
      )}.svg`}
      alt={currencyKey}
      style={{ width, height }}
    />
  );
};
