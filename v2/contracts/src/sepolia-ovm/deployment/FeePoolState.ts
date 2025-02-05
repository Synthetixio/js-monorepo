// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FeePoolState';
export const address = '0xd9542412D32d33D9eFAF478A997BD94476074B0b';
export const source = 'FeePoolState';
export const abi = [
  'constructor(address _owner, address _feePool)',
  'event IssuanceDebtRatioEntry(address indexed account, uint256 debtRatio, uint256 feePeriodCloseIndex)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function FEE_PERIOD_LENGTH() view returns (uint8)',
  'function acceptOwnership()',
  'function accountIssuanceLedger(address, uint256) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function appendAccountIssuanceRecord(address account, uint256 debtRatio, uint256 debtEntryIndex, uint256 currentPeriodStartDebtIndex)',
  'function applicableIssuanceData(address account, uint256 closingDebtIndex) view returns (uint256, uint256)',
  'function feePool() view returns (address)',
  'function getAccountsDebtEntry(address account, uint256 index) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function importIssuerData(address[] accounts, uint256[] ratios, uint256 periodToInsert, uint256 feePeriodCloseIndex)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setFeePool(address _feePool)',
  'function setupExpiryTime() view returns (uint256)',
];
