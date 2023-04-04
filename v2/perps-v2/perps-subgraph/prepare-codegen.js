const fs = require('fs');
const prettier = require('prettier');
const prettierOptions = JSON.parse(fs.readFileSync('../../../.prettierrc', 'utf8'));

// const perpsV2MarketDelayedExecution = JSON.parse(
//   fs.readFileSync(
//     '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2MarketDelayedExecution.json',
//     'utf-8'
//   )
// );
// const perpsV2MarketLiquidate = JSON.parse(
//   fs.readFileSync(
//     '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2MarketLiquidate.json',
//     'utf-8'
//   )
// );
// const perpsV2MarketDelayedIntent = JSON.parse(
//   fs.readFileSync(
//     '../../contracts/src/mainnet-ovm/deployment/json/PerpsV2MarketDelayedIntent.json',
//     'utf-8'
//   )
// );
// const perpsV2MarketBase = JSON.parse(
//   fs.readFileSync('../../contracts/src/mainnet-ovm/deployment/json/PerpsV2MarketBase.json', 'utf-8')
// );
// const futuresMarketManager = JSON.parse(
//   fs.readFileSync(
//     '../../contracts/src/mainnet-ovm/deployment/json/FuturesMarketManager.json',
//     'utf-8'
//   )
// );
if (!fs.existsSync('./abis')) {
  fs.mkdirSync('./abis');
}
fs.writeFileSync(
  './abis/PerpsV2Proxy.json',
  prettier.format(
    JSON.stringify([
      // TODO @MF wait until its deployed SIP 2004/2005
      // ...perpsV2MarketBase,
      // ...perpsV2MarketDelayedExecution,
      // ...perpsV2MarketLiquidate,
      // ...perpsV2MarketDelayedIntent,
      // ...futuresMarketManager,

      // TODO @MF remove when its deployed SIP 2004/2005
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'margin',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'size',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'tradeSize',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fundingIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        name: 'PositionModified',
        type: 'event',
      },

      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'asset',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'marketKey',
            type: 'bytes32',
          },
        ],
        name: 'MarketAdded',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'market',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'asset',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'marketKey',
            type: 'bytes32',
          },
        ],
        name: 'MarketRemoved',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'isOffchain',
            type: 'bool',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'targetRoundId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'intentionTime',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'executableAtTime',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'commitDeposit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'keeperDeposit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'DelayedOrderSubmitted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'flagger',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        name: 'PositionFlagged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'liquidator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'size',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        name: 'PositionLiquidated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'baseAsset',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'marketKey',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        name: 'PerpsTracking',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'int256',
            name: 'funding',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'fundingRate',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        name: 'FundingRecomputed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'marginDelta',
            type: 'int256',
          },
        ],
        name: 'MarginTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'margin',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'size',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'tradeSize',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fundingIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'skew',
            type: 'int256',
          },
        ],
        name: 'PositionModified',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'isOffchain',
            type: 'bool',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'currentRoundId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'targetRoundId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'commitDeposit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'keeperDeposit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'DelayedOrderRemoved',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'int256',
            name: 'funding',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'fundingRate',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        name: 'FundingRecomputed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'liquidator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'int256',
            name: 'size',
            type: 'int256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'flaggerFee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'liquidatorFee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'stakersFee',
            type: 'uint256',
          },
        ],
        name: 'PositionLiquidated',
        type: 'event',
      },
    ]),
    {
      parser: 'json',
      ...prettierOptions,
    }
  ),
  'utf-8'
);
