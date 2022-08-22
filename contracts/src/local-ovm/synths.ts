// !!! DO NOT EDIT !!! Automatically generated file

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
};
