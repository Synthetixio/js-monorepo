export const address = '0xaDBDb485a5095fBfE06AE1BaeB11dA86D2aE5816';
export const abi = [
  'error AlreadyInitialized()',
  'error NoChange()',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function initializeOwnerModule(address initialOwner)',
  'function isOwnerModuleInitialized() view returns (bool)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
];
