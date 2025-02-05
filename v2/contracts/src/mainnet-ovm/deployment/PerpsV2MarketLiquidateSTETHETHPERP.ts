// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketLiquidateSTETHETHPERP';
export const address = '0x89f16bfFd72166807A18fAba307cD21eC6143563';
export const source = 'PerpsV2MarketLiquidate';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionFlagged(uint256 id, address account, address flagger, uint256 price, uint256 timestamp)',
  'event PositionLiquidated(uint256 id, address account, address liquidator, int256 size, uint256 price, uint256 flaggerFee, uint256 liquidatorFee, uint256 stakersFee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function flagPosition(address account)',
  'function forceLiquidatePosition(address account)',
  'function isResolverCached() view returns (bool)',
  'function liquidatePosition(address account)',
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
