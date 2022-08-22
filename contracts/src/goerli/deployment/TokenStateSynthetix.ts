export const name = 'TokenStateSynthetix';
export const address = '0xe842C91A5D2BCE122d89497f171d81067255Ad0d';
export const source = 'LegacyTokenState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address _associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function allowance(address, address) view returns (uint256)',
  'function associatedContract() view returns (address)',
  'function balanceOf(address) view returns (uint256)',
  'function nominateOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAllowance(address tokenOwner, address spender, uint256 value)',
  'function setAssociatedContract(address _associatedContract)',
  'function setBalanceOf(address account, uint256 value)',
];
