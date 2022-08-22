export const name = 'TokenStatesAUD';
export const address = '0xCb29D2cf2C65d3Be1d00F07f3441390432D55203';
export const source = 'TokenState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function allowance(address, address) view returns (uint256)',
  'function associatedContract() view returns (address)',
  'function balanceOf(address) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAllowance(address tokenOwner, address spender, uint256 value)',
  'function setAssociatedContract(address _associatedContract)',
  'function setBalanceOf(address account, uint256 value)',
];
