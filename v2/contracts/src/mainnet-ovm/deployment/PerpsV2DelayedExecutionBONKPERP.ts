// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2DelayedExecutionBONKPERP';
export const address = '0x1496d992e66a1843fE91659689C697844aC8712d';
export const source = 'PerpsV2MarketDelayedExecution';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DelayedOrderRemoved(address indexed account, bool isOffchain, uint256 currentRoundId, int256 sizeDelta, uint256 targetRoundId, uint256 commitDeposit, uint256 keeperDeposit, bytes32 trackingCode)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function cancelDelayedOrder(address account)',
  'function cancelOffchainDelayedOrder(address account)',
  'function executeDelayedOrder(address account)',
  'function executeOffchainDelayedOrder(address account, bytes[] priceUpdateData) payable',
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
];
