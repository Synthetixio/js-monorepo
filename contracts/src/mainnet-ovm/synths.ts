export const SynthsByName: Partial<
  Record<
    string,
    {
      asset: string;
      category: string;
      sign: string;
      description: string;
      name: string;
      subclass?: string;
    }
  >
> = {
  sUSD: {
    asset: 'USD',
    category: 'forex',
    sign: '$',
    description: 'US Dollars',
    name: 'sUSD',
    subclass: 'MultiCollateralSynth',
  },
  sETH: {
    asset: 'ETH',
    category: 'crypto',
    sign: 'Ξ',
    description: 'Ether',
    name: 'sETH',
    subclass: 'MultiCollateralSynth',
  },
  sBTC: {
    asset: 'BTC',
    category: 'crypto',
    sign: '₿',
    description: 'Bitcoin',
    name: 'sBTC',
    subclass: 'MultiCollateralSynth',
  },
  sLINK: {
    asset: 'LINK',
    category: 'crypto',
    sign: '',
    description: 'Chainlink',
    name: 'sLINK',
    subclass: 'MultiCollateralSynth',
  },
  sSOL: {
    asset: 'SOL',
    category: 'crypto',
    sign: '',
    description: 'Solana',
    name: 'sSOL',
    subclass: 'MultiCollateralSynth',
  },
  sAVAX: {
    asset: 'AVAX',
    category: 'crypto',
    sign: '',
    description: 'Avalanche',
    name: 'sAVAX',
    subclass: 'MultiCollateralSynth',
  },
  sMATIC: {
    asset: 'MATIC',
    category: 'crypto',
    sign: '',
    description: 'Matic',
    name: 'sMATIC',
    subclass: 'MultiCollateralSynth',
  },
  sEUR: {
    asset: 'EUR',
    category: 'forex',
    sign: '€',
    description: 'Euros',
    name: 'sEUR',
    subclass: 'MultiCollateralSynth',
  },
  sAAVE: {
    asset: 'AAVE',
    category: 'crypto',
    sign: '',
    description: 'Aave',
    name: 'sAAVE',
    subclass: 'MultiCollateralSynth',
  },
  sUNI: {
    asset: 'UNI',
    category: 'crypto',
    sign: '',
    description: 'Uniswap',
    name: 'sUNI',
    subclass: 'MultiCollateralSynth',
  },
  sINR: {
    asset: 'INR',
    category: 'forex',
    sign: '₹',
    description: 'Indian Rupee',
    name: 'sINR',
    subclass: 'MultiCollateralSynth',
  },
};
