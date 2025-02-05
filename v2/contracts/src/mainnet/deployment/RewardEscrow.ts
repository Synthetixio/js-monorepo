// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrow';
export const address = '0xb671F2210B1F6621A2607EA63E6B2DC3e2464d1F';
export const source = 'RewardEscrow';
export const abi = [
  'function nominateNewOwner(address _owner)',
  'function setFeePool(address _feePool)',
  'function getNextVestingIndex(address account) view returns (uint256)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function getNextVestingEntry(address account) view returns (uint256[2])',
  'function totalEscrowedAccountBalance(address) view returns (uint256)',
  'function checkAccountSchedule(address account) view returns (uint256[520])',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
  'function nominatedOwner() view returns (address)',
  'function getNextVestingTime(address account) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function synthetix() view returns (address)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function getNextVestingQuantity(address account) view returns (uint256)',
  'function getVestingTime(address account, uint256 index) view returns (uint256)',
  'function feePool() view returns (address)',
  'function appendVestingEntry(address account, uint256 quantity)',
  'function MAX_VESTING_ENTRIES() view returns (uint256)',
  'function getVestingScheduleEntry(address account, uint256 index) view returns (uint256[2])',
  'function getVestingQuantity(address account, uint256 index) view returns (uint256)',
  'function setSynthetix(address _synthetix)',
  'constructor(address _owner, address _synthetix, address _feePool)',
  'event SynthetixUpdated(address newSynthetix)',
  'event FeePoolUpdated(address newFeePool)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'event VestingEntryCreated(address indexed beneficiary, uint256 time, uint256 value)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
