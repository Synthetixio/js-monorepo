export const contracts = {
  SYNTHETIX_PROXY: 'SYNTHETIX_PROXY',
  MULTICALL: 'MULTICALL',
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
        name: 'Token',
      },
      {
        type: 'string',
        name: 'Stablecoin',
      },

      {
        type: 'number',
        name: 'Decimal token',
      },

      {
        type: 'number',
        name: 'Decimal stablecoin',
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
