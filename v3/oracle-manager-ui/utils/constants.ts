import { Chain } from 'wagmi';
import { optimismGoerli, goerli } from 'wagmi/chains';

export const supportedChains: Chain[] = [
  // mainnet,
  // optimism,
  optimismGoerli,
  goerli,
  // hardhat
  // localhost,
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
    options?: { value: number; label: string }[];
  }[];
}[] = [
  {
    value: 'chainLink',
    label: 'ChainLink',
    nodeType: 3,
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
        options: [
          { value: 0, label: 'RECENT' },
          { value: 1, label: 'MIN' },
          { value: 2, label: 'MAX' },
          { value: 3, label: 'MEAN' },
          { value: 4, label: 'MEDIAN' },
          { value: 5, label: 'MUL' },
          { value: 6, label: 'DIV' },
        ],
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
