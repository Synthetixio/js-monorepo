// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FlexibleStorage';
export const address = '0x8e76B16CeaB8A52A6F4dDe7a28d24Cac35d3DFE3';
export const source = 'FlexibleStorage';
export const abi = [
  'constructor(address _resolver)',
  'event KeyMigrated(bytes32 fromContractName, bytes32 toContractName, bool removeAccessFromPreviousContract)',
  'event ValueDeletedAddress(bytes32 contractName, bytes32 record, address value)',
  'event ValueDeletedBool(bytes32 contractName, bytes32 record, bool value)',
  'event ValueDeletedBytes32(bytes32 contractName, bytes32 record, bytes32 value)',
  'event ValueDeletedInt(bytes32 contractName, bytes32 record, int256 value)',
  'event ValueDeletedUInt(bytes32 contractName, bytes32 record, uint256 value)',
  'event ValueSetAddress(bytes32 contractName, bytes32 record, address value)',
  'event ValueSetBool(bytes32 contractName, bytes32 record, bool value)',
  'event ValueSetBytes32(bytes32 contractName, bytes32 record, bytes32 value)',
  'event ValueSetInt(bytes32 contractName, bytes32 record, int256 value)',
  'event ValueSetUInt(bytes32 contractName, bytes32 record, uint256 value)',
  'function deleteAddressValue(bytes32 contractName, bytes32 record)',
  'function deleteBoolValue(bytes32 contractName, bytes32 record)',
  'function deleteBytes32Value(bytes32 contractName, bytes32 record)',
  'function deleteIntValue(bytes32 contractName, bytes32 record)',
  'function deleteUIntValue(bytes32 contractName, bytes32 record)',
  'function getAddressValue(bytes32 contractName, bytes32 record) view returns (address)',
  'function getAddressValues(bytes32 contractName, bytes32[] records) view returns (address[])',
  'function getBoolValue(bytes32 contractName, bytes32 record) view returns (bool)',
  'function getBoolValues(bytes32 contractName, bytes32[] records) view returns (bool[])',
  'function getBytes32Value(bytes32 contractName, bytes32 record) view returns (bytes32)',
  'function getBytes32Values(bytes32 contractName, bytes32[] records) view returns (bytes32[])',
  'function getIntValue(bytes32 contractName, bytes32 record) view returns (int256)',
  'function getIntValues(bytes32 contractName, bytes32[] records) view returns (int256[])',
  'function getUIntValue(bytes32 contractName, bytes32 record) view returns (uint256)',
  'function getUIntValues(bytes32 contractName, bytes32[] records) view returns (uint256[])',
  'function hashes(bytes32) view returns (bytes32)',
  'function migrateContractKey(bytes32 fromContractName, bytes32 toContractName, bool removeAccessFromPreviousContract)',
  'function resolverProxy() view returns (address)',
  'function setAddressValue(bytes32 contractName, bytes32 record, address value)',
  'function setAddressValues(bytes32 contractName, bytes32[] records, address[] values)',
  'function setBoolValue(bytes32 contractName, bytes32 record, bool value)',
  'function setBoolValues(bytes32 contractName, bytes32[] records, bool[] values)',
  'function setBytes32Value(bytes32 contractName, bytes32 record, bytes32 value)',
  'function setBytes32Values(bytes32 contractName, bytes32[] records, bytes32[] values)',
  'function setIntValue(bytes32 contractName, bytes32 record, int256 value)',
  'function setIntValues(bytes32 contractName, bytes32[] records, int256[] values)',
  'function setUIntValue(bytes32 contractName, bytes32 record, uint256 value)',
  'function setUIntValues(bytes32 contractName, bytes32[] records, uint256[] values)',
];
