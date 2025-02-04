// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'TokenStateSynthetix';
export const address = '0xE851b0A420074f4Db3BfcAC03722A7CCAB818676';
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
