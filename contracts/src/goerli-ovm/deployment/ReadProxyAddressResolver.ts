export const name = 'ReadProxyAddressResolver';
export const address = '0x9Fc84992dF5496797784374B810E04238728743d';
export const source = 'ReadProxy';
export const abi = [
  'constructor(address _owner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event TargetUpdated(address newTarget)',
  'function acceptOwnership()',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setTarget(address _target)',
  'function target() view returns (address)',
];
