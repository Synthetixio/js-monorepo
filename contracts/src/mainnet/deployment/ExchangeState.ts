// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ExchangeState';
export const address = '0x545973f28950f50fc6c7F52AAb4Ad214A27C0564';
export const source = 'ExchangeState';
export const abi = [
  'function maxEntriesInQueue() view returns (uint256)',
  'function getEntryAt(address account, bytes32 currencyKey, uint256 index) view returns (bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function nominateNewOwner(address _owner)',
  'function appendExchangeEntry(address account, bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function setAssociatedContract(address _associatedContract)',
  'function nominatedOwner() view returns (address)',
  'function exchanges(address, bytes32, uint256) view returns (bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 timestamp, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function associatedContract() view returns (address)',
  'function getLengthOfEntries(address account, bytes32 currencyKey) view returns (uint256)',
  'function setMaxEntriesInQueue(uint256 _maxEntriesInQueue)',
  'function removeEntries(address account, bytes32 currencyKey)',
  'function getMaxTimestamp(address account, bytes32 currencyKey) view returns (uint256)',
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
