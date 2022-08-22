// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixEscrow';
export const address = '0xD1F9481B1df0401FEB40667b10f2D0AAEc81cd34';
export const source = 'SynthetixEscrow';
export const abi = [
  'constructor(address _owner, address _synthetix)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SynthetixUpdated(address newSynthetix)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'function MAX_VESTING_ENTRIES() view returns (uint256)',
  'function QUANTITY_INDEX() view returns (uint256)',
  'function TIME_INDEX() view returns (uint256)',
  'function acceptOwnership()',
  'function addVestingSchedule(address account, uint256[] times, uint256[] quantities)',
  'function appendVestingEntry(address account, uint256 time, uint256 quantity)',
  'function balanceOf(address account) view returns (uint256)',
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
  'function purgeAccount(address account)',
  'function setSynthetix(address _synthetix)',
  'function setupExpiryTime() view returns (uint256)',
  'function synthetix() view returns (address)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function totalVestedBalance() view returns (uint256)',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
];
