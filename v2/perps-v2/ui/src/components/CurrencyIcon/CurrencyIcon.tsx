import { IconProps } from '@chakra-ui/react';
import {
  Bitcoin,
  Ethereum,
  Chainlink,
  Solana,
  Avax,
  Aave,
  Uniswap,
  Matic,
  Silver,
  Gold,
  Euro,
  Ape,
  Dydx,
  BnB,
  Doge,
  Optimism,
  Atom,
  Fantom,
  Near,
  Flow,
  Axie,
  Aud,
  Gbp,
} from '../Icons';

const PerpIcon = (currencyKey: CurrencyKey, props: IconProps) => {
  switch (currencyKey) {
    case CurrencyKey.AAVE:
      return <Aave {...props} />;
    case CurrencyKey.APE:
      return <Ape {...props} />;
    case CurrencyKey.ATOM:
      return <Atom {...props} />;
    case CurrencyKey.AUD:
      return <Aud {...props} />;
    case CurrencyKey.AVAX:
      return <Avax {...props} />;
    case CurrencyKey.AXS:
      return <Axie {...props} />;
    case CurrencyKey.BNB:
      return <BnB {...props} />;
    case CurrencyKey.DOGE:
      return <Doge {...props} />;
    case CurrencyKey.DYDX:
      return <Dydx {...props} />;
    case CurrencyKey.EUR:
      return <Euro {...props} />;
    case CurrencyKey.FLOW:
      return <Flow {...props} />;
    case CurrencyKey.FTM:
      return <Fantom {...props} />;
    case CurrencyKey.GBP:
      return <Gbp {...props} />;
    case CurrencyKey.LINK:
      return <Chainlink {...props} />;
    case CurrencyKey.MATIC:
      return <Matic {...props} />;
    case CurrencyKey.NEAR:
      return <Near {...props} />;
    case CurrencyKey.OP:
      return <Optimism {...props} />;
    case CurrencyKey.SOL:
      return <Solana {...props} />;
    case CurrencyKey.UNI:
      return <Uniswap {...props} />;
    case CurrencyKey.XAG:
      return <Silver {...props} />;
    case CurrencyKey.XAU:
      return <Gold {...props} />;
    case CurrencyKey.sBTC:
      return <Bitcoin {...props} />;
    case CurrencyKey.sETH:
      return <Ethereum {...props} />;
    case CurrencyKey.sLINK:
      return <Chainlink {...props} />;
    default:
      return null;
  }
};

interface CurrencyIconProps extends IconProps {
  currencyKey: CurrencyKey;
}

enum CurrencyKey {
  BNB,
  sETH,
  sBTC,
  MATIC,
  SOL,
  DYDX,
  GBP,
  FLOW,
  AAVE,
  sLINK,
  LINK,
  AXS,
  XMR,
  UNI,
  OP,
  AVAX,
  XAU,
  APE,
  EUR,
  DOGE,
  AUD,
  XAG,
  ATOM,
  FTM,
  NEAR,
}

export const CurrencyIcon = ({ currencyKey, ...props }: CurrencyIconProps) => {
  return PerpIcon(currencyKey, props);
};
