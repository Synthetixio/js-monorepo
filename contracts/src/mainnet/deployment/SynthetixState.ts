// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixState';
export const address = '0x4b9Ca5607f1fF8019c1C6A3c2f0CC8de622D5B82';
export const source = 'SynthetixState';
export const abi = [
  'function setIssuanceRatio(uint256 _issuanceRatio)',
  'function debtLedger(uint256) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function importedXDRAmount() view returns (uint256)',
  'function incrementTotalIssuerCount()',
  'function appendDebtLedgerValue(uint256 value)',
  'function lastDebtLedgerEntry() view returns (uint256)',
  'function setPreferredCurrency(address account, bytes4 currencyKey)',
  'function setAssociatedContract(address _associatedContract)',
  'function nominatedOwner() view returns (address)',
  'function acceptOwnership()',
  'function issuanceData(address) view returns (uint256 initialDebtOwnership, uint256 debtEntryIndex)',
  'function owner() view returns (address)',
  'function totalIssuerCount() view returns (uint256)',
  'function importIssuerData(address[] accounts, uint256[] sUSDAmounts)',
  'function setCurrentIssuanceData(address account, uint256 initialDebtOwnership)',
  'function associatedContract() view returns (address)',
  'function clearIssuanceData(address account)',
  'function issuanceRatio() view returns (uint256)',
  'function hasIssued(address account) view returns (bool)',
  'function decrementTotalIssuerCount()',
  'function preferredCurrency(address) view returns (bytes4)',
  'function debtLedgerLength() view returns (uint256)',
  'constructor(address _owner, address _associatedContract)',
  'event IssuanceRatioUpdated(uint256 newRatio)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
