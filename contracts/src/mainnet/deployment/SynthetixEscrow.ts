// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixEscrow';
export const address = '0x971e78e0C92392A4E39099835cF7E6aB535b2227';
export const source = 'SynthetixEscrow';
export const abi = [
  'function purgeAccount(address account)',
  'function withdrawHavvens(uint256 quantity)',
  'function getNextVestingIndex(address account) view returns (uint256)',
  'function appendVestingEntry(address account, uint256 time, uint256 quantity)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function getNextVestingEntry(address account) view returns (uint256[2])',
  'function decimals() view returns (uint8)',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
  'function setHavven(address _havven)',
  'function nominatedOwner() view returns (address)',
  'function nominateOwner(address _owner)',
  'function getNextVestingTime(address account) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function getNextVestingQuantity(address account) view returns (uint256)',
  'function getVestingTime(address account, uint256 index) view returns (uint256)',
  'function havven() view returns (address)',
  'function UNIT() view returns (uint256)',
  'function totalVestedBalance() view returns (uint256)',
  'function addVestingSchedule(address account, uint256[] times, uint256[] quantities)',
  'function getVestingScheduleEntry(address account, uint256 index) view returns (uint256[2])',
  'function getVestingQuantity(address account, uint256 index) view returns (uint256)',
  'constructor(address _owner, address _havven)',
  'event HavvenUpdated(address newHavven)',
  'event Vested(address beneficiary, address indexed beneficiaryIndex, uint256 time, uint256 value)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
