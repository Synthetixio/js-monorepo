// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'TokenStatesAVAX';
export const address = '0x2114d1C571CB541f3416a65f8BccFf9BB9E55Dc5';
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
