// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ExchangeCircuitBreaker';
export const address = '0x7322e8F6cB6c6a7B4e6620C486777fcB9Ea052a4';
export const source = 'ExchangeCircuitBreaker';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event LastRateOverriden(bytes32 currencyKey, uint256 previousRate, uint256 newRate)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CIRCUIT_BREAKER_SUSPENSION_REASON() view returns (uint256)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function exchangeRates() view returns (address)',
  'function isDeviationAboveThreshold(uint256 base, uint256 comparison) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function lastExchangeRate(bytes32 currencyKey) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function priceDeviationThresholdFactor() view returns (uint256)',
  'function rateWithBreakCircuit(bytes32 currencyKey) returns (uint256 lastValidRate, bool circuitBroken)',
  'function rateWithInvalid(bytes32 currencyKey) view returns (uint256, bool)',
  'function rebuildCache()',
  'function resetLastExchangeRate(bytes32[] currencyKeys)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
