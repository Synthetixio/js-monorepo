// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixBridgeEscrow';
export const address = '0x0e37B420BE11BCf06CD5309ce67B65d3aC0623CE';
export const source = 'SynthetixBridgeEscrow';
export const abi = [
  'constructor(address _owner)',
  'event BridgeApproval(address _token, address indexed spender, uint256 value)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function approveBridge(address _token, address _bridge, uint256 _amount)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
];
