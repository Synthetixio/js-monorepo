// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'CollateralStateEth';
export const address = '0xbe5B5a7c198bC156474ed5c33CBf2F3F604F8fF8';
export const source = 'CollateralState';
export const abi = [
  'constructor(address _owner, address _associatedContract)',
  'event AssociatedContractUpdated(address associatedContract)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function associatedContract() view returns (address)',
  'function createLoan(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan)',
  'function getLoan(address account, uint256 loanID) view returns (tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction))',
  'function getNumLoans(address account) view returns (uint256 numLoans)',
  'function loans(address, uint256) view returns (uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function setAssociatedContract(address _associatedContract)',
  'function updateLoan(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan)',
];
