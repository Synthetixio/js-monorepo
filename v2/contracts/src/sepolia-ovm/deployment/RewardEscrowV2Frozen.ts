// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrowV2Frozen';
export const address = '0xbfd66fa5668612afDdAAf48F818665F0b34128C6';
export const source = 'ImportableRewardEscrowV2Frozen';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event AccountMerged(address indexed accountToMerge, address destinationAddress, uint256 escrowAmountMerged, uint256[] entryIDs, uint256 time)',
  'event AccountMergingDurationUpdated(uint256 newDuration)',
  'event AccountMergingStarted(uint256 time, uint256 endTime)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event MaxAccountMergingDurationUpdated(uint256 newDuration)',
  'event MaxEscrowDurationUpdated(uint256 newDuration)',
  'event NominateAccountToMerge(address indexed account, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'event VestingEntryCreated(address indexed beneficiary, uint256 time, uint256 value, uint256 duration, uint256 entryID)',
  'function acceptOwnership()',
  'function accountMergingDuration() view returns (uint256)',
  'function accountMergingIsOpen() view returns (bool)',
  'function accountMergingStartTime() view returns (uint256)',
  'function accountVestingEntryIDs(address, uint256) view returns (uint256)',
  'function appendVestingEntry(address account, uint256 quantity, uint256 duration)',
  'function balanceOf(address account) view returns (uint256)',
  'function burnForMigration(address, uint256[]) returns (uint256, tuple(uint64 endTime, uint256 escrowAmount)[])',
  'function createEscrowEntry(address beneficiary, uint256 deposit, uint256 duration)',
  'function getAccountVestingEntryIDs(address account, uint256 index, uint256 pageSize) view returns (uint256[])',
  'function getVestingEntry(address account, uint256 entryID) view returns (uint64 endTime, uint256 escrowAmount)',
  'function getVestingEntryClaimable(address account, uint256 entryID) view returns (uint256)',
  'function getVestingQuantity(address account, uint256[] entryIDs) view returns (uint256 total)',
  'function getVestingSchedules(address account, uint256 index, uint256 pageSize) view returns (tuple(uint64 endTime, uint256 escrowAmount, uint256 entryID)[])',
  'function importVestingEntries(address account, uint256 escrowedAmount, tuple(uint64 endTime, uint256 escrowAmount)[] vestingEntries)',
  'function isResolverCached() view returns (bool)',
  'function maxAccountMergingDuration() view returns (uint256)',
  'function max_duration() view returns (uint256)',
  'function mergeAccount(address accountToMerge, uint256[] entryIDs)',
  'function migrateAccountEscrowBalances(address[], uint256[], uint256[])',
  'function migrateVestingSchedule(address)',
  'function nextEntryId() view returns (uint256)',
  'function nominateAccountToMerge(address account)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function nominatedReceiver(address) view returns (address)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setAccountMergingDuration(uint256 duration)',
  'function setMaxAccountMergingWindow(uint256 duration)',
  'function setMaxEscrowDuration(uint256 duration)',
  'function setupExpiryTime() view returns (uint256)',
  'function startMergingWindow()',
  'function totalEscrowedAccountBalance(address) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function vest(uint256[] entryIDs)',
  'function vestingSchedules(address, uint256) view returns (uint64 endTime, uint256 escrowAmount)',
];
