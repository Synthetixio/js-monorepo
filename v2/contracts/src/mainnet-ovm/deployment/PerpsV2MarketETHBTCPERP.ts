// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketETHBTCPERP';
export const address = '0x3091AcaEAF27985F33a8a4b0EefEa49dc60c8506';
export const source = 'PerpsV2Market';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event MarginTransferred(address indexed account, int256 marginDelta)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function closePosition(uint256 desiredFillPrice)',
  'function closePositionWithTracking(uint256 desiredFillPrice, bytes32 trackingCode)',
  'function isResolverCached() view returns (bool)',
  'function marketState() view returns (address)',
  'function messageSender() view returns (address)',
  'function modifyPosition(int256 sizeDelta, uint256 desiredFillPrice)',
  'function modifyPositionWithTracking(int256 sizeDelta, uint256 desiredFillPrice, bytes32 trackingCode)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function proxy() view returns (address)',
  'function rebuildCache()',
  'function recomputeFunding() returns (uint256 lastIndex)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setMessageSender(address sender)',
  'function setProxy(address _proxy)',
  'function transferMargin(int256 marginDelta)',
  'function withdrawAllMargin()',
];
