// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ExchangeCircuitBreaker';
export const address = '0x3b8a2a1872c4cc8C3EE6c9fa6d3236ce3f10FA20';
export const source = 'ExchangeCircuitBreaker';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CIRCUIT_BREAKER_SUSPENSION_REASON() view returns (uint256)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function exchangeRates() view returns (address)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rateWithBreakCircuit(bytes32 currencyKey) returns (uint256 lastValidRate, bool invalid)',
  'function rateWithInvalid(bytes32 currencyKey) view returns (uint256 rate, bool invalid)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
