export const name = 'TokenStatesINR';
export const address = '0xfE33ae95A9f0DA8A845aF33516EDc240DCD711d6';
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
