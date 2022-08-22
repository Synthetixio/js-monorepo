export const name = 'TokenStateSynthetix';
export const address = '0x5b1b5fEa1b99D83aD479dF0C222F0492385381dD';
export const source = 'LegacyTokenState';
export const abi = [
  'function setAssociatedContract(address _associatedContract)',
  'function nominatedOwner() view returns (address)',
  'function nominateOwner(address _owner)',
  'function balanceOf(address) view returns (uint256)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function associatedContract() view returns (address)',
  'function setBalanceOf(address account, uint256 value)',
  'function setAllowance(address tokenOwner, address spender, uint256 value)',
  'function allowance(address, address) view returns (uint256)',
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address _associatedContract)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
