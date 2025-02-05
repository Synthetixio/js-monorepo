// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketViewsZILPERP';
export const address = '0xd21F7CC02f3a9B6d059cdAd6e0C0f4db18420189';
export const source = 'PerpsV2MarketViews';
export const abi = [
  'constructor(address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function accessibleMargin(address account) view returns (uint256 marginAccessible, bool invalid)',
  'function accruedFunding(address account) view returns (int256 funding, bool invalid)',
  'function assetPrice() view returns (uint256 price, bool invalid)',
  'function baseAsset() view returns (bytes32 key)',
  'function canLiquidate(address account) view returns (bool)',
  'function currentFundingRate() view returns (int256)',
  'function currentFundingVelocity() view returns (int256)',
  'function delayedOrders(address account) view returns (tuple(bool isOffchain, int128 sizeDelta, uint128 desiredFillPrice, uint128 targetRoundId, uint128 commitDeposit, uint128 keeperDeposit, uint256 executableAtTime, uint256 intentionTime, bytes32 trackingCode))',
  'function fillPrice(int256 sizeDelta) view returns (uint256 price, bool invalid)',
  'function fundingLastRecomputed() view returns (uint32)',
  'function fundingRateLastRecomputed() view returns (int128)',
  'function fundingSequence(uint256 index) view returns (int128)',
  'function fundingSequenceLength() view returns (uint256)',
  'function isFlagged(address account) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function liquidationFee(address account) view returns (uint256)',
  'function liquidationPrice(address account) view returns (uint256 price, bool invalid)',
  'function marketDebt() view returns (uint256 debt, bool invalid)',
  'function marketKey() view returns (bytes32 key)',
  'function marketSize() view returns (uint128)',
  'function marketSizes() view returns (uint256 long, uint256 short)',
  'function marketSkew() view returns (int128)',
  'function marketState() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notionalValue(address account) view returns (int256 value, bool invalid)',
  'function orderFee(int256 sizeDelta, uint8 orderType) view returns (uint256 fee, bool invalid)',
  'function owner() view returns (address)',
  'function positions(address account) view returns (tuple(uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size))',
  'function postTradeDetails(int256 sizeDelta, uint256 tradePrice, uint8 orderType, address sender) view returns (uint256 margin, int256 size, uint256 price, uint256 liqPrice, uint256 fee, uint8 status)',
  'function profitLoss(address account) view returns (int256 pnl, bool invalid)',
  'function rebuildCache()',
  'function remainingMargin(address account) view returns (uint256 marginRemaining, bool invalid)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function unrecordedFunding() view returns (int256 funding, bool invalid)',
];
