// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FeePoolState';
export const address = '0x11164F6a47C3f8472D19b9aDd516Fc780cb7Ee02';
export const source = 'FeePoolState';
export const abi = [
  'function nominateNewOwner(address _owner)',
  'function initiationTime() view returns (uint256)',
  'function setFeePool(address _feePool)',
  'function setSelfDestructBeneficiary(address _beneficiary)',
  'function terminateSelfDestruct()',
  'function importIssuerData(address[] accounts, uint256[] ratios, uint256 periodToInsert, uint256 feePeriodCloseIndex)',
  'function nominatedOwner() view returns (address)',
  'function acceptOwnership()',
  'function accountIssuanceLedger(address, uint256) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function owner() view returns (address)',
  'function appendAccountIssuanceRecord(address account, uint256 debtRatio, uint256 debtEntryIndex, uint256 currentPeriodStartDebtIndex)',
  'function selfDestruct()',
  'function SELFDESTRUCT_DELAY() view returns (uint256)',
  'function feePool() view returns (address)',
  'function getAccountsDebtEntry(address account, uint256 index) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function selfDestructInitiated() view returns (bool)',
  'function initiateSelfDestruct()',
  'function selfDestructBeneficiary() view returns (address)',
  'function FEE_PERIOD_LENGTH() view returns (uint8)',
  'function applicableIssuanceData(address account, uint256 closingDebtIndex) view returns (uint256, uint256)',
  'constructor(address _owner, address _feePool)',
  'event IssuanceDebtRatioEntry(address indexed account, uint256 debtRatio, uint256 feePeriodCloseIndex)',
  'event SelfDestructTerminated()',
  'event SelfDestructed(address beneficiary)',
  'event SelfDestructInitiated(uint256 selfDestructDelay)',
  'event SelfDestructBeneficiaryUpdated(address newBeneficiary)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
