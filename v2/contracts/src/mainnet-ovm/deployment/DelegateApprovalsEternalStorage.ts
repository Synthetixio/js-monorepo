// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DelegateApprovalsEternalStorage';
export const address = '0x02f7fB66B55e6ca476d126d96f14c5732Eeb4363';
export const source = 'EternalStorage';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function associatedContract() view returns (address)',
  'function deleteAddressValue(bytes32 record)',
  'function deleteBooleanValue(bytes32 record)',
  'function deleteBytes32Value(bytes32 record)',
  'function deleteBytesValue(bytes32 record)',
  'function deleteIntValue(bytes32 record)',
  'function deleteStringValue(bytes32 record)',
  'function deleteUIntValue(bytes32 record)',
  'function getAddressValue(bytes32 record) view returns (address)',
  'function getBooleanValue(bytes32 record) view returns (bool)',
  'function getBytes32Value(bytes32 record) view returns (bytes32)',
  'function getBytesValue(bytes32 record) view returns (bytes)',
  'function getIntValue(bytes32 record) view returns (int256)',
  'function getStringValue(bytes32 record) view returns (string)',
  'function getUIntValue(bytes32 record) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAddressValue(bytes32 record, address value)',
  'function setAssociatedContract(address _associatedContract)',
  'function setBooleanValue(bytes32 record, bool value)',
  'function setBytes32Value(bytes32 record, bytes32 value)',
  'function setBytesValue(bytes32 record, bytes value)',
  'function setIntValue(bytes32 record, int256 value)',
  'function setStringValue(bytes32 record, string value)',
  'function setUIntValue(bytes32 record, uint256 value)',
];
