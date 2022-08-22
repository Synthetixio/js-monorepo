// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'OwnerRelayOnOptimism';
export const address = '0x6d4a64C57612841c2C6745dB2a4E4db34F002D20';
export const source = 'OwnerRelayOnOptimism';
export const abi = [
  'constructor(address _resolver, address _temporaryOwner, uint256 _ownershipDuration)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DirectRelay(address target, bytes payload)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RelayBatchFinalized(address[] targets, bytes[] payloads)',
  'event RelayFinalized(address target, bytes payload)',
  'function acceptOwnership()',
  'function directRelay(address target, bytes payload)',
  'function expiryTime() view returns (uint256)',
  'function finalizeRelay(address target, bytes payload)',
  'function finalizeRelayBatch(address[] targets, bytes[] payloads)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setNewExpiryTime(uint256 _duration)',
  'function temporaryOwner() view returns (address)',
];
