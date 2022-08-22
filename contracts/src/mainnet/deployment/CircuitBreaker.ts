export const name = 'CircuitBreaker';
export const address = '0x9f231dBE53D460f359B2B8CC47574493caA5B7Bf';
export const source = 'CircuitBreaker';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event CircuitBroken(address indexed oracleAddress, uint256 previousValue, uint256 newValue)',
  'event LastValueOverridden(address indexed oracleAddress, uint256 previousValue, uint256 newValue)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function circuitBroken(address oracleAddress) view returns (bool)',
  'function isDeviationAboveThreshold(uint256 base, uint256 comparison) view returns (bool)',
  'function isInvalid(address oracleAddress, uint256 value) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function lastValue(address oracleAddress) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function priceDeviationThresholdFactor() view returns (uint256)',
  'function probeCircuitBreaker(address oracleAddress, uint256 value) returns (bool circuitBroken)',
  'function rebuildCache()',
  'function resetLastValue(address[] oracleAddresses, uint256[] values)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
