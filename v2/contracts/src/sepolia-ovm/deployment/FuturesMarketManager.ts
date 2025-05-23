// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FuturesMarketManager';
export const address = '0x00D79DBB8e9fC344C015ADD2D4135E5181b61e66';
export const source = 'FuturesMarketManager';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event EndorsedAddressAdded(address endorsedAddress)',
  'event EndorsedAddressRemoved(address endorsedAddress)',
  'event MarketAdded(address market, bytes32 indexed asset, bytes32 indexed marketKey)',
  'event MarketRemoved(address market, bytes32 indexed asset, bytes32 indexed marketKey)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function addEndorsedAddresses(address[] addresses)',
  'function addMarkets(address[] marketsToAdd)',
  'function addProxiedMarkets(address[] marketsToAdd)',
  'function allEndorsedAddresses() view returns (address[])',
  'function allMarketSummaries() view returns (tuple(address market, bytes32 asset, bytes32 marketKey, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, int256 currentFundingVelocity, bool priceInvalid, bool proxied)[])',
  'function allMarkets() view returns (address[])',
  'function allMarkets(bool proxiedMarkets) view returns (address[])',
  'function burnSUSD(address account, uint256 amount) returns (uint256 postReclamationAmount)',
  'function isEndorsed(address account) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function issueSUSD(address account, uint256 amount)',
  'function marketForKey(bytes32) view returns (address)',
  'function marketSummaries(address[] addresses) view returns (tuple(address market, bytes32 asset, bytes32 marketKey, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, int256 currentFundingVelocity, bool priceInvalid, bool proxied)[])',
  'function marketSummariesForKeys(bytes32[] marketKeys) view returns (tuple(address market, bytes32 asset, bytes32 marketKey, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, int256 currentFundingVelocity, bool priceInvalid, bool proxied)[])',
  'function markets(uint256 index, uint256 pageSize, bool proxiedMarkets) view returns (address[])',
  'function markets(uint256 index, uint256 pageSize) view returns (address[])',
  'function marketsForKeys(bytes32[] marketKeys) view returns (address[])',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function numMarkets() view returns (uint256)',
  'function numMarkets(bool proxiedMarkets) view returns (uint256)',
  'function owner() view returns (address)',
  'function payFee(uint256 amount, bytes32 trackingCode)',
  'function payFee(uint256 amount)',
  'function rebuildCache()',
  'function removeEndorsedAddresses(address[] addresses)',
  'function removeMarkets(address[] marketsToRemove)',
  'function removeMarketsByKey(bytes32[] marketKeysToRemove)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function totalDebt() view returns (uint256 debt, bool isInvalid)',
  'function updateMarketsImplementations(address[] marketsToUpdate)',
];
