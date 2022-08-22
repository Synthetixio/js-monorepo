// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixBridgeEscrow';
export const address = '0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f';
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
