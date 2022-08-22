// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixState';
export const address = '0xcbcFB6E2d8517DB83BedB30f79D5197607207A2c';
export const source = 'SynthetixState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function appendDebtLedgerValue(uint256 value)',
  'function associatedContract() view returns (address)',
  'function clearIssuanceData(address account)',
  'function debtLedger(uint256) view returns (uint256)',
  'function debtLedgerLength() view returns (uint256)',
  'function decrementTotalIssuerCount()',
  'function hasIssued(address account) view returns (bool)',
  'function incrementTotalIssuerCount()',
  'function issuanceData(address) view returns (uint256 initialDebtOwnership, uint256 debtEntryIndex)',
  'function lastDebtLedgerEntry() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAssociatedContract(address _associatedContract)',
  'function setCurrentIssuanceData(address account, uint256 initialDebtOwnership)',
  'function totalIssuerCount() view returns (uint256)',
];
