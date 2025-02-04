// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixState';
export const address = '0x9770239D49Db97E77fc5Adcb5413654C9e45A510';
export const source = 'SynthetixStateWithLimitedSetup';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event FeePoolUpdated(address newFeePool)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function appendDebtLedgerValue(uint256 value)',
  'function associatedContract() view returns (address)',
  'function clearIssuanceData(address account)',
  'function debtLedger(uint256) view returns (uint256)',
  'function debtLedgerLength() view returns (uint256)',
  'function decrementTotalIssuerCount()',
  'function feePool() view returns (address)',
  'function hasIssued(address account) view returns (bool)',
  'function importIssuerData(address[] accounts, uint256[] sUSDAmounts)',
  'function importedDebtAmount() view returns (uint256)',
  'function incrementTotalIssuerCount()',
  'function issuanceData(address) view returns (uint256 initialDebtOwnership, uint256 debtEntryIndex)',
  'function lastDebtLedgerEntry() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAssociatedContract(address _associatedContract)',
  'function setCurrentIssuanceData(address account, uint256 initialDebtOwnership)',
  'function setFeePool(address _feePool)',
  'function setupExpiryTime() view returns (uint256)',
  'function totalIssuerCount() view returns (uint256)',
];
