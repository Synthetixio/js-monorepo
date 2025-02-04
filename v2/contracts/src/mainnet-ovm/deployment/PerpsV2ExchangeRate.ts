// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2ExchangeRate';
export const address = '0x2C15259D4886e2C0946f9aB7a5E389c86b3c3b04';
export const source = 'PerpsV2ExchangeRate';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event AssociatedContractAdded(address associatedContract)',
  'event AssociatedContractRemoved(address associatedContract)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OffchainOracleUpdated(address offchainOracle)',
  'event OffchainPriceFeedIdUpdated(bytes32 assetId, bytes32 priceFeedId)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function addAssociatedContracts(address[] associatedContracts)',
  'function associatedContracts() view returns (address[])',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function offchainOracle() view returns (address)',
  'function offchainPriceFeedId(bytes32 assetId) view returns (bytes32)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function removeAssociatedContracts(address[] associatedContracts)',
  'function resolveAndGetLatestPrice(bytes32 assetId) view returns (uint256 price, uint256 publishTime)',
  'function resolveAndGetPrice(bytes32 assetId, uint256 maxAge) view returns (uint256 price, uint256 publishTime)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setOffchainOracle(address offchainOracle)',
  'function setOffchainPriceFeedId(bytes32 assetId, bytes32 priceFeedId)',
  'function updatePythPrice(address sender, bytes[] priceUpdateData) payable',
];
