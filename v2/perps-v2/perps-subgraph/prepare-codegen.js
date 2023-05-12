const fs = require('fs');
const prettier = require('prettier');
const prettierOptions = JSON.parse(fs.readFileSync('../../../.prettierrc', 'utf8'));

const perpsV2DelayedOrderAAVEPERPOld = JSON.parse(
  fs.readFileSync(
    '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2DelayedOrderAAVEPERP.json',
    'utf-8'
  )
);

const perpsV2MarketLiquidateAAVEPERPNew = JSON.parse(
  fs.readFileSync(
    '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2MarketLiquidateAAVEPERP.json',
    'utf-8'
  )
);

const futuresMarketManager = JSON.parse(
  fs.readFileSync(
    '../../contracts/src/mainnet-ovm/deployment/json/FuturesMarketManager.json',
    'utf-8'
  )
);

const oldEvents = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'margin', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'size', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'tradeSize', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'lastPrice', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fundingIndex', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fee', type: 'uint256' },
    ],
    name: 'PositionModified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'address', name: 'liquidator', type: 'address' },
      { indexed: false, internalType: 'int256', name: 'size', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'price', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fee', type: 'uint256' },
    ],
    name: 'PositionLiquidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'address', name: 'flagger', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'PositionFlagged',
    type: 'event',
  },
];

if (!fs.existsSync('./abis')) {
  fs.mkdirSync('./abis');
}
fs.writeFileSync(
  './abis/PerpsV2Proxy.json',
  prettier.format(
    JSON.stringify(
      [
        ...perpsV2DelayedOrderAAVEPERPOld,
        ...perpsV2MarketLiquidateAAVEPERPNew,
        ...futuresMarketManager,
        ...oldEvents,
      ].filter((abi) => abi.type === 'event')
    ),
    {
      parser: 'json',
      ...prettierOptions,
    }
  ),
  'utf-8'
);
