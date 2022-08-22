// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DelegateApprovals';
export const address = '0x15fd6e554874B9e70F832Ed37f231Ac5E142362f';
export const source = 'DelegateApprovals';
export const abi = [
  'function canIssueFor(address authoriser, address delegate) view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function canClaimFor(address authoriser, address delegate) view returns (bool)',
  'function ISSUE_FOR_ADDRESS() view returns (bytes32)',
  'function approveClaimOnBehalf(address delegate)',
  'function removeIssueOnBehalf(address delegate)',
  'function approveExchangeOnBehalf(address delegate)',
  'function nominatedOwner() view returns (address)',
  'function removeBurnOnBehalf(address delegate)',
  'function removeClaimOnBehalf(address delegate)',
  'function removeAllDelegatePowers(address delegate)',
  'function acceptOwnership()',
  'function canBurnFor(address authoriser, address delegate) view returns (bool)',
  'function owner() view returns (address)',
  'function eternalStorage() view returns (address)',
  'function approveBurnOnBehalf(address delegate)',
  'function APPROVE_ALL() view returns (bytes32)',
  'function approveIssueOnBehalf(address delegate)',
  'function approvedAll(address authoriser, address delegate) view returns (bool)',
  'function setEternalStorage(address _eternalStorage)',
  'function removeExchangeOnBehalf(address delegate)',
  'function approveAllDelegatePowers(address delegate)',
  'function CLAIM_FOR_ADDRESS() view returns (bytes32)',
  'function EXCHANGE_FOR_ADDRESS() view returns (bytes32)',
  'function BURN_FOR_ADDRESS() view returns (bytes32)',
  'function canExchangeFor(address authoriser, address delegate) view returns (bool)',
  'constructor(address _owner, address _eternalStorage)',
  'event Approval(address indexed authoriser, address delegate, bytes32 action)',
  'event WithdrawApproval(address indexed authoriser, address delegate, bytes32 action)',
  'event EternalStorageUpdated(address newEternalStorage)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
