export const name = 'ProxySynthetix';
export const address = '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F';
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
