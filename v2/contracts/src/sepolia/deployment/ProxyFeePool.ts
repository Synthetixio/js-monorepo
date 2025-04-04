// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ProxyFeePool';
export const address = '0x00e793B4ad1eCf68e660BB798c16a2Ea438C0A29';
export const source = 'Proxy';
export const abi = [
  'constructor(address _owner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event TargetUpdated(address newTarget)',
  'function _emit(bytes callData, uint256 numTopics, bytes32 topic1, bytes32 topic2, bytes32 topic3, bytes32 topic4)',
  'function acceptOwnership()',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setTarget(address _target)',
  'function target() view returns (address)',
];
