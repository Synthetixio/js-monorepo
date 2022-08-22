// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'WrapperFactory';
export const address = '0xa69768003543eBe5DD91E787278D99FfF9aD6095';
export const source = 'WrapperFactory';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event WrapperCreated(address indexed token, bytes32 indexed currencyKey, address wrapperAddress)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function createWrapper(address token, bytes32 currencyKey, bytes32 synthContractName) returns (address)',
  'function distributeFees()',
  'function feesEscrowed() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function isWrapper(address possibleWrapper) view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
