// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DebtMigratorOnEthereum';
export const address = '0x94f864e55c77E07C2C7BF7bFBc334b7a8123442A';
export const source = 'DebtMigratorOnEthereum';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event InitiationResumed()',
  'event InitiationSuspended()',
  'event MigrationInitiated(address indexed account, uint256 totalDebtSharesMigrated, uint256 totalEscrowMigrated, uint256 totalLiquidBalanceMigrated)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() pure returns (bytes32)',
  'function acceptOwnership()',
  'function debtTransferReceived() view returns (uint256)',
  'function debtTransferSent() view returns (uint256)',
  'function initiationActive() view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function migrateDebt(address account)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function resumeInitiation()',
  'function suspendInitiation()',
];
