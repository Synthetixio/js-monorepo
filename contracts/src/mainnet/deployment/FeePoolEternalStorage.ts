// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FeePoolEternalStorage';
export const address = '0xC9DFff5fA5605fd94F8B7927b892F2B57391e8bB';
export const source = 'FeePoolEternalStorage';
export const abi = [
  'function getBytes32Value(bytes32 record) view returns (bytes32)',
  'function deleteAddressValue(bytes32 record)',
  'function deleteBytesValue(bytes32 record)',
  'function deleteBytes32Value(bytes32 record)',
  'function nominateNewOwner(address _owner)',
  'function getBooleanValue(bytes32 record) view returns (bool)',
  'function setBytes32Value(bytes32 record, bytes32 value)',
  'function setUIntValue(bytes32 record, uint256 value)',
  'function deleteBooleanValue(bytes32 record)',
  'function setBooleanValue(bytes32 record, bool value)',
  'function getBytesValue(bytes32 record) view returns (bytes)',
  'function getAddressValue(bytes32 record) view returns (address)',
  'function setAssociatedContract(address _associatedContract)',
  'function nominatedOwner() view returns (address)',
  'function setAddressValue(bytes32 record, address value)',
  'function acceptOwnership()',
  'function deleteIntValue(bytes32 record)',
  'function owner() view returns (address)',
  'function getIntValue(bytes32 record) view returns (int256)',
  'function deleteUIntValue(bytes32 record)',
  'function getStringValue(bytes32 record) view returns (string)',
  'function setIntValue(bytes32 record, int256 value)',
  'function associatedContract() view returns (address)',
  'function importFeeWithdrawalData(address[] accounts, uint256[] feePeriodIDs)',
  'function deleteStringValue(bytes32 record)',
  'function getUIntValue(bytes32 record) view returns (uint256)',
  'function setBytesValue(bytes32 record, bytes value)',
  'function setStringValue(bytes32 record, string value)',
  'constructor(address _owner, address _feePool)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
