// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2DelayedIntentEURPERP';
export const address = '0xCea694F1704D714C94A7322c22b5c16Bbd2403c2';
export const source = 'PerpsV2MarketDelayedIntent';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DelayedOrderSubmitted(address indexed account, bool isOffchain, int256 sizeDelta, uint256 targetRoundId, uint256 intentionTime, uint256 executableAtTime, uint256 commitDeposit, uint256 keeperDeposit, bytes32 trackingCode)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function isResolverCached() view returns (bool)',
  'function marketState() view returns (address)',
  'function messageSender() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function proxy() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setMessageSender(address sender)',
  'function setProxy(address _proxy)',
  'function submitCloseDelayedOrderWithTracking(uint256 desiredTimeDelta, uint256 desiredFillPrice, bytes32 trackingCode)',
  'function submitCloseOffchainDelayedOrderWithTracking(uint256 desiredFillPrice, bytes32 trackingCode)',
  'function submitDelayedOrder(int256 sizeDelta, uint256 desiredTimeDelta, uint256 desiredFillPrice)',
  'function submitDelayedOrderWithTracking(int256 sizeDelta, uint256 desiredTimeDelta, uint256 desiredFillPrice, bytes32 trackingCode)',
  'function submitOffchainDelayedOrder(int256 sizeDelta, uint256 desiredFillPrice)',
  'function submitOffchainDelayedOrderWithTracking(int256 sizeDelta, uint256 desiredFillPrice, bytes32 trackingCode)',
];
