export const name = 'SynthetixBridgeEscrow';
export const address = '0xD134Db47DDF5A6feB245452af17cCAf92ee53D3c';
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
