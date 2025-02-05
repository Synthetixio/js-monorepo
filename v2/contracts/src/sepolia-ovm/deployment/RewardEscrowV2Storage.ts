// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrowV2Storage';
export const address = '0x315293F2D0f32E0971A002fccA318b2ce6E4038F';
export const source = 'RewardEscrowV2Storage';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function accountVestingEntryIDs(address account, uint256 index) view returns (uint256)',
  'function addVestingEntry(address account, tuple(uint64 endTime, uint256 escrowAmount) entry) returns (uint256)',
  'function associatedContract() view returns (address)',
  'function fallbackRewardEscrow() view returns (address)',
  'function firstNonFallbackId() view returns (uint256)',
  'function nextEntryId() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function owner() view returns (address)',
  'function setAssociatedContract(address _associatedContract)',
  'function setFallbackRewardEscrow(address _fallbackRewardEscrow)',
  'function setZeroAmount(address account, uint256 entryId)',
  'function setZeroAmountUntilTarget(address account, uint256 startIndex, uint256 targetAmount) returns (uint256 total, uint256 endIndex, uint256 lastEntryTime)',
  'function totalEscrowedAccountBalance(address account) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function totalVestedAccountBalance(address account) view returns (uint256)',
  'function updateEscrowAccountBalance(address account, int256 delta)',
  'function updateTotalEscrowedBalance(int256 delta)',
  'function updateVestedAccountBalance(address account, int256 delta)',
  'function vestingSchedules(address account, uint256 entryId) view returns (tuple(uint64 endTime, uint256 escrowAmount) entry)',
];
