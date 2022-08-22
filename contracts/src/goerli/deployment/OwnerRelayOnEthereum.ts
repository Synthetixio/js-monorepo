export const name = 'OwnerRelayOnEthereum';
export const address = '0xFdB31235cDFe68bfFD1d687AC3A2b31E80eacf0d';
export const source = 'OwnerRelayOnEthereum';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RelayBatchInitiated(address[] targets, bytes[] payloads)',
  'event RelayInitiated(address target, bytes payload)',
  'function acceptOwnership()',
  'function initiateRelay(address target, bytes payload, uint32 crossDomainGasLimit)',
  'function initiateRelayBatch(address[] targets, bytes[] payloads, uint32 crossDomainGasLimit)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
