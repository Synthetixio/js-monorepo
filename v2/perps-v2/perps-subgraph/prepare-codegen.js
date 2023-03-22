const fs = require('fs');
const prettier = require('prettier');
const prettierOptions = JSON.parse(fs.readFileSync('../../../.prettierrc', 'utf8'));

// TODO @MF wait until its deployed SIP 2004/2005
// also add the aggregator and aggregator proxy to this script although there are not internal
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
// if (!fs.existsSync('./abis')) {
//   fs.mkdirSync('./abis');
// }
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
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_marketState',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
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
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
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
            indexed: false,
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
        ],
        name: 'ProxyUpdated',
        type: 'event',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
        ],
        name: 'closePosition',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'closePositionWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'marketState',
        outputs: [
          {
            internalType: 'contract IPerpsV2MarketState',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'messageSender',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
        ],
        name: 'modifyPosition',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'modifyPositionWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'proxy',
        outputs: [
          {
            internalType: 'contract Proxy',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'recomputeFunding',
        outputs: [
          {
            internalType: 'uint256',
            name: 'lastIndex',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'setMessageSender',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
        ],
        name: 'setProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'marginDelta',
            type: 'int256',
          },
        ],
        name: 'transferMargin',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'withdrawAllMargin',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_marketState',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
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
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
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
            indexed: false,
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
        ],
        name: 'ProxyUpdated',
        type: 'event',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'cancelDelayedOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'cancelOffchainDelayedOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'executeDelayedOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'bytes[]',
            name: 'priceUpdateData',
            type: 'bytes[]',
          },
        ],
        name: 'executeOffchainDelayedOrder',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'marketState',
        outputs: [
          {
            internalType: 'contract IPerpsV2MarketState',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'messageSender',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'proxy',
        outputs: [
          {
            internalType: 'contract Proxy',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'setMessageSender',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
        ],
        name: 'setProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_marketState',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'marketState',
        outputs: [
          {
            internalType: 'contract IPerpsV2MarketState',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },

      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'endorsedAddress',
            type: 'address',
          },
        ],
        name: 'EndorsedAddressAdded',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'endorsedAddress',
            type: 'address',
          },
        ],
        name: 'EndorsedAddressRemoved',
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
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        constant: true,
        inputs: [],
        name: 'CONTRACT_NAME',
        outputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
        ],
        name: 'addEndorsedAddresses',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'marketsToAdd',
            type: 'address[]',
          },
        ],
        name: 'addMarkets',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'marketsToAdd',
            type: 'address[]',
          },
        ],
        name: 'addProxiedMarkets',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'allEndorsedAddresses',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'allMarketSummaries',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'market',
                type: 'address',
              },
              {
                internalType: 'bytes32',
                name: 'asset',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 'marketKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'marketSize',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'marketSkew',
                type: 'int256',
              },
              {
                internalType: 'uint256',
                name: 'marketDebt',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingRate',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingVelocity',
                type: 'int256',
              },
              {
                internalType: 'bool',
                name: 'priceInvalid',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'proxied',
                type: 'bool',
              },
            ],
            internalType: 'struct FuturesMarketManager.MarketSummary[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'allMarkets',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'bool',
            name: 'proxiedMarkets',
            type: 'bool',
          },
        ],
        name: 'allMarkets',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'burnSUSD',
        outputs: [
          {
            internalType: 'uint256',
            name: 'postReclamationAmount',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'isEndorsed',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'issueSUSD',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'marketForKey',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
        ],
        name: 'marketSummaries',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'market',
                type: 'address',
              },
              {
                internalType: 'bytes32',
                name: 'asset',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 'marketKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'marketSize',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'marketSkew',
                type: 'int256',
              },
              {
                internalType: 'uint256',
                name: 'marketDebt',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingRate',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingVelocity',
                type: 'int256',
              },
              {
                internalType: 'bool',
                name: 'priceInvalid',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'proxied',
                type: 'bool',
              },
            ],
            internalType: 'struct FuturesMarketManager.MarketSummary[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'bytes32[]',
            name: 'marketKeys',
            type: 'bytes32[]',
          },
        ],
        name: 'marketSummariesForKeys',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'market',
                type: 'address',
              },
              {
                internalType: 'bytes32',
                name: 'asset',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 'marketKey',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'marketSize',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'marketSkew',
                type: 'int256',
              },
              {
                internalType: 'uint256',
                name: 'marketDebt',
                type: 'uint256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingRate',
                type: 'int256',
              },
              {
                internalType: 'int256',
                name: 'currentFundingVelocity',
                type: 'int256',
              },
              {
                internalType: 'bool',
                name: 'priceInvalid',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'proxied',
                type: 'bool',
              },
            ],
            internalType: 'struct FuturesMarketManager.MarketSummary[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pageSize',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'proxiedMarkets',
            type: 'bool',
          },
        ],
        name: 'markets',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pageSize',
            type: 'uint256',
          },
        ],
        name: 'markets',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'bytes32[]',
            name: 'marketKeys',
            type: 'bytes32[]',
          },
        ],
        name: 'marketsForKeys',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'numMarkets',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            internalType: 'bool',
            name: 'proxiedMarkets',
            type: 'bool',
          },
        ],
        name: 'numMarkets',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'payFee',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'payFee',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
        ],
        name: 'removeEndorsedAddresses',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'marketsToRemove',
            type: 'address[]',
          },
        ],
        name: 'removeMarkets',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32[]',
            name: 'marketKeysToRemove',
            type: 'bytes32[]',
          },
        ],
        name: 'removeMarketsByKey',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalDebt',
        outputs: [
          {
            internalType: 'uint256',
            name: 'debt',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isInvalid',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address[]',
            name: 'marketsToUpdate',
            type: 'address[]',
          },
        ],
        name: 'updateMarketsImplementations',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },

      {
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_marketState',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
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
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
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
            indexed: false,
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
        ],
        name: 'ProxyUpdated',
        type: 'event',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'marketState',
        outputs: [
          {
            internalType: 'contract IPerpsV2MarketState',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'messageSender',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'proxy',
        outputs: [
          {
            internalType: 'contract Proxy',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'setMessageSender',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
        ],
        name: 'setProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'desiredTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'submitCloseDelayedOrderWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'submitCloseOffchainDelayedOrderWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
        ],
        name: 'submitDelayedOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'submitDelayedOrderWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
        ],
        name: 'submitOffchainDelayedOrder',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'int256',
            name: 'sizeDelta',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'desiredFillPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        name: 'submitOffchainDelayedOrderWithTracking',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_marketState',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_resolver',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
        ],
        name: 'CacheUpdated',
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
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
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
            indexed: false,
            internalType: 'address',
            name: 'proxyAddress',
            type: 'address',
          },
        ],
        name: 'ProxyUpdated',
        type: 'event',
      },
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'flagPosition',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'forceLiquidatePosition',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isResolverCached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'liquidatePosition',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'marketState',
        outputs: [
          {
            internalType: 'contract IPerpsV2MarketState',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'messageSender',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'proxy',
        outputs: [
          {
            internalType: 'contract Proxy',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'rebuildCache',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolver',
        outputs: [
          {
            internalType: 'contract AddressResolver',
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'resolverAddressesRequired',
        outputs: [
          {
            internalType: 'bytes32[]',
            name: 'addresses',
            type: 'bytes32[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'setMessageSender',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            internalType: 'address payable',
            name: '_proxy',
            type: 'address',
          },
        ],
        name: 'setProxy',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]),
    {
      parser: 'json',
      ...prettierOptions,
    }
  ),
  'utf-8'
);
