// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FuturesMarketManager';
export const address = '0xc704c9AA89d1ca60F67B3075d05fBb92b3B00B3B';
export const source = 'FuturesMarketManager';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event MarketAdded(address market, bytes32 indexed asset, bytes32 indexed marketKey)',
  'event MarketRemoved(address market, bytes32 indexed asset, bytes32 indexed marketKey)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function addMarkets(address[] marketsToAdd)',
  'function allMarkets() view returns (address[])',
  'function burnSUSD(address account, uint256 amount) returns (uint256 postReclamationAmount)',
  'function isResolverCached() view returns (bool)',
  'function issueSUSD(address account, uint256 amount)',
  'function marketForKey(bytes32) view returns (address)',
  'function markets(uint256 index, uint256 pageSize) view returns (address[])',
  'function marketsForKeys(bytes32[] marketKeys) view returns (address[])',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function numMarkets() view returns (uint256)',
  'function owner() view returns (address)',
  'function payFee(uint256 amount)',
  'function rebuildCache()',
  'function removeMarkets(address[] marketsToRemove)',
  'function removeMarketsByKey(bytes32[] marketKeysToRemove)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function totalDebt() view returns (uint256 debt, bool isInvalid)',
];
