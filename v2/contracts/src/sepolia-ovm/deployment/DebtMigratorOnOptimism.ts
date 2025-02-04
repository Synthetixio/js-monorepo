// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DebtMigratorOnOptimism';
export const address = '0x2cBA0Affe1b3C811Da78CBAf0fCD60A896a36da9';
export const source = 'DebtMigratorOnOptimism';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event MigrationFinalized(address indexed account, uint256 totalDebtSharesMigrated, uint256 totalEscrowMigrated, uint256 totalLiquidBalanceMigrated)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() pure returns (bytes32)',
  'function acceptOwnership()',
  'function debtTransferReceived() view returns (uint256)',
  'function debtTransferSent() view returns (uint256)',
  'function finalizeDebtMigration(address account, uint256 debtSharesMigrated, uint256 escrowMigrated, uint256 liquidSnxMigrated, bytes debtPayload)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
