// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrow';
export const address = '0x249BCCbFD33FA6653Db02aE2349444EF25E9B41d';
export const source = 'RewardEscrow';
export const abi = [
  'constructor(address _owner, address _synthetix, address _feePool)',
  'event FeePoolUpdated(address newFeePool)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SynthetixUpdated(address newSynthetix)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'event VestingEntryCreated(address indexed beneficiary, uint256 time, uint256 value)',
  'function MAX_VESTING_ENTRIES() view returns (uint256)',
  'function acceptOwnership()',
  'function appendVestingEntry(address account, uint256 quantity)',
  'function balanceOf(address account) view returns (uint256)',
  'function checkAccountSchedule(address account) view returns (uint256[520])',
  'function feePool() view returns (address)',
  'function getNextVestingEntry(address account) view returns (uint256[2])',
  'function getNextVestingIndex(address account) view returns (uint256)',
  'function getNextVestingQuantity(address account) view returns (uint256)',
  'function getNextVestingTime(address account) view returns (uint256)',
  'function getVestingQuantity(address account, uint256 index) view returns (uint256)',
  'function getVestingScheduleEntry(address account, uint256 index) view returns (uint256[2])',
  'function getVestingTime(address account, uint256 index) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function owner() view returns (address)',
  'function setFeePool(address _feePool)',
  'function setSynthetix(address _synthetix)',
  'function synthetix() view returns (address)',
  'function totalEscrowedAccountBalance(address) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
];
