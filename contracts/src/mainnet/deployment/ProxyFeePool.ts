export const name = 'ProxyFeePool';
export const address = '0xb440DD674e1243644791a4AdfE3A2AbB0A92d309';
export const source = 'Proxy';
export const abi = [
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function setTarget(address _target)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function _emit(bytes callData, uint256 numTopics, bytes32 topic1, bytes32 topic2, bytes32 topic3, bytes32 topic4)',
  'function useDELEGATECALL() view returns (bool)',
  'function setUseDELEGATECALL(bool value)',
  'function target() view returns (address)',
  'constructor(address _owner)',
  'event TargetUpdated(address newTarget)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
