// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'CollateralManagerState';
export const address = '0x4D06965E0941E0881a5308DFF66cD59D28a08E3f';
export const source = 'CollateralManagerState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function addShortCurrency(bytes32 currency)',
  'function associatedContract() view returns (address)',
  'function borrowRates(uint256) view returns (uint256)',
  'function borrowRatesLastUpdated() view returns (uint256)',
  'function decrementLongs(bytes32 synth, uint256 amount)',
  'function decrementShorts(bytes32 synth, uint256 amount)',
  'function getRateAt(uint256 index) view returns (uint256)',
  'function getRatesAndTime(uint256 index) view returns (uint256 entryRate, uint256 lastRate, uint256 lastUpdated, uint256 newIndex)',
  'function getRatesLength() view returns (uint256)',
  'function getShortRatesAndTime(bytes32 currency, uint256 index) view returns (uint256 entryRate, uint256 lastRate, uint256 lastUpdated, uint256 newIndex)',
  'function getShortRatesLength(bytes32 currency) view returns (uint256)',
  'function incrementLongs(bytes32 synth, uint256 amount)',
  'function incrementShorts(bytes32 synth, uint256 amount)',
  'function incrementTotalLoans() returns (uint256)',
  'function long(bytes32 synth) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function ratesLastUpdated() view returns (uint256)',
  'function removeShortCurrency(bytes32 currency)',
  'function setAssociatedContract(address _associatedContract)',
  'function short(bytes32 synth) view returns (uint256)',
  'function shortRates(bytes32, uint256) view returns (uint256)',
  'function shortRatesLastUpdated(bytes32) view returns (uint256)',
  'function totalIssuedSynths(bytes32) view returns (uint256 long, uint256 short)',
  'function totalLoans() view returns (uint256)',
  'function updateBorrowRates(uint256 rate)',
  'function updateShortRates(bytes32 currency, uint256 rate)',
];
