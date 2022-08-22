export const name = 'ExchangeState';
export const address = '0x7EF87c14f50CFFe2e73d2C87916C3128c56593A8';
export const source = 'ExchangeState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function appendExchangeEntry(address account, bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function associatedContract() view returns (address)',
  'function exchanges(address, bytes32, uint256) view returns (bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function getEntryAt(address account, bytes32 currencyKey, uint256 index) view returns (bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function getLengthOfEntries(address account, bytes32 currencyKey) view returns (uint256)',
  'function getMaxTimestamp(address account, bytes32 currencyKey) view returns (uint256)',
  'function maxEntriesInQueue() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function removeEntries(address account, bytes32 currencyKey)',
  'function setAssociatedContract(address _associatedContract)',
  'function setMaxEntriesInQueue(uint256 _maxEntriesInQueue)',
];
