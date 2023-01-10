import { Chain } from 'wagmi';
export const supportedChains: Chain[] = [
  {
    id: 1,
    network: 'homestead',
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://eth-mainnet.g.alchemy.com/v2'],
        webSocket: ['wss://eth-mainnet.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://mainnet.infura.io/v3'],
        webSocket: ['wss://mainnet.infura.io/ws/v3'],
      },
      default: {
        http: ['https://cloudflare-eth.com'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601,
      },
    },
  },
  {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://opt-mainnet.g.alchemy.com/v2'],
        webSocket: ['wss://opt-mainnet.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://optimism-mainnet.infura.io/v3'],
        webSocket: ['wss://optimism-mainnet.infura.io/ws/v3'],
      },
      default: {
        http: ['https://mainnet.optimism.io'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://optimistic.etherscan.io',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4286263,
      },
    },
  },
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
  nodeType: number;
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
    nodeType: 3,
    numberOfParents: 0,
    parameters: [
      { type: 'string', name: 'Address' },
      { type: 'number', name: 'TWAP time interval in seconds' },
    ],
  },
  {
    value: 'externalNode',
    label: 'External Node',
    nodeType: 2,
    numberOfParents: Number.MAX_SAFE_INTEGER,
    parameters: [{ type: 'string', name: 'Address' }],
  },
  {
    value: 'priceDeviationCircuitBreaker',
    label: 'Price Deviation Circuit Breaker',
    nodeType: 6,
    numberOfParents: 3,
    parameters: [{ type: 'number', name: 'Deviation tolerance' }],
  },
  {
    value: 'pyth',
    label: 'Pyth',
    nodeType: 5,
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
      { type: 'boolean', name: 'Use EMA' },
    ],
  },
  {
    value: 'reducer',
    label: 'Reducer',
    nodeType: 1,
    numberOfParents: 2,
    parameters: [
      {
        type: 'union',
        name: 'Operation',
        options: ['max', 'min', 'mean', 'median', 'recent', 'mul', 'div'],
      },
    ],
  },
  {
    value: 'stalenessCircuitBreaker',
    label: 'Staleness Circuit Breaker',
    nodeType: 7,
    numberOfParents: 2,
    parameters: [{ type: 'number', name: 'Staleness tolerance' }],
  },
  {
    value: 'uniswap',
    label: 'Uniswap',
    nodeType: 4,
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
