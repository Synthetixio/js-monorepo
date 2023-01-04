import { Chain } from 'wagmi';
export const supportedChains: Chain[] = [
  {
    id: 5,
    network: 'goerli',
    name: 'Goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://eth-goerli.g.alchemy.com/v2'],
        webSocket: ['wss://eth-goerli.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://goerli.infura.io/v3'],
        webSocket: ['wss://goerli.infura.io/ws/v3'],
      },
      default: {
        http: ['https://rpc.ankr.com/eth_goerli'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://goerli.etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://goerli.etherscan.io',
      },
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6507670,
      },
    },
    testnet: true,
  },
  {
    id: 420,
    name: 'Optimism Goerli',
    network: 'optimism-goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://opt-goerli.g.alchemy.com/v2'],
        webSocket: ['wss://opt-goerli.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://optimism-goerli.infura.io/v3'],
        webSocket: ['wss://optimism-goerli.infura.io/ws/v3'],
      },
      default: {
        http: ['https://goerli.optimism.io'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://goerli-optimism.etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://goerli-optimism.etherscan.io',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 49461,
      },
    },
    testnet: true,
  },
];

export const contracts = {
  SYNTHETIX_PROXY: 'SYNTHETIX_PROXY',
  MULTICALL: 'MULTICALL',
};

export const INFURA_KEY = '23087ce9f88c44d1b1c54fd7c07c65fb';

export const ALCHEMY_KEY_MAPPING: Record<number, string> = {
  1: 'Yq-4rzpsP9Dz8mvjHRQ8lUrmNLNocuQs',
  5: '6btiU37vkhQ8DJkdV4qggEWXehpgw2aI',
  10: '-ktIzLrAY_Sf7AAlM1aTuZ-PObMop5sU',
  420: 'lc1tSn8B8fmURkjmZLeyT1ibNpgqlsnr',
};

export const ORACLE_NODE_TYPES: {
  value: string;
  label: string;
  numberOfParents: number;
  parameters: {
    type: string;
    name: string;
    options?: string[];
  }[];
}[] = [
  {
    value: 'chainLink',
    label: 'Chain Link',
    numberOfParents: 0,
    parameters: [
      { type: 'string', name: 'Address' },
      { type: 'number', name: 'TWAP time interval in seconds' },
      { type: 'number', name: 'Decimals' },
    ],
  },
  {
    value: 'externalNode',
    label: 'External Node',
    numberOfParents: Infinity,
    parameters: [{ type: 'string', name: 'Address' }],
  },
  {
    value: 'priceCircuitBreaker',
    label: 'Price Circuit Breaker',
    numberOfParents: 2,
    parameters: [{ type: 'number', name: 'Deviation tolerance' }],
  },
  {
    value: 'pyth',
    label: 'Pyth',
    numberOfParents: 0,
    parameters: [
      {
        type: 'string',
        name: 'Address',
      },
      {
        type: 'string',
        name: 'Price feed id',
      },
    ],
  },
  {
    value: 'reducer',
    label: 'Reducer',
    numberOfParents: Infinity,
    parameters: [
      { type: 'union', name: 'Operation', options: ['max', 'min', 'mean', 'median', 'recent'] },
    ],
  },
  {
    value: 'stalenessFallbackReducer',
    label: 'Staleness Fallback Reducer',
    numberOfParents: 2, // 1 or two parents => if two parents if one is stale, use the second parent
    parameters: [{ type: 'number', name: 'Staleness tolerance' }],
  },
  {
    value: 'uniswap',
    label: 'Uniswap',
    numberOfParents: 0,
    parameters: [
      {
        type: 'string',
        name: 'First token',
      },
      {
        type: 'string',
        name: 'Second token',
      },
      {
        type: 'string',
        name: 'Pool address',
      },
      {
        type: 'number',
        name: 'Seconds ago',
      },
    ],
  },
];
