// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DelegateApprovals';
export const address = '0x2A23bc0EA97A89abD91214E8e4d20F02Fe14743f';
export const source = 'DelegateApprovals';
export const abi = [
  'constructor(address _owner, address _eternalStorage)',
  'event Approval(address indexed authoriser, address delegate, bytes32 action)',
  'event EternalStorageUpdated(address newEternalStorage)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event WithdrawApproval(address indexed authoriser, address delegate, bytes32 action)',
  'function APPROVE_ALL() view returns (bytes32)',
  'function BURN_FOR_ADDRESS() view returns (bytes32)',
  'function CLAIM_FOR_ADDRESS() view returns (bytes32)',
  'function EXCHANGE_FOR_ADDRESS() view returns (bytes32)',
  'function ISSUE_FOR_ADDRESS() view returns (bytes32)',
  'function acceptOwnership()',
  'function approveAllDelegatePowers(address delegate)',
  'function approveBurnOnBehalf(address delegate)',
  'function approveClaimOnBehalf(address delegate)',
  'function approveExchangeOnBehalf(address delegate)',
  'function approveIssueOnBehalf(address delegate)',
  'function approvedAll(address authoriser, address delegate) view returns (bool)',
  'function canBurnFor(address authoriser, address delegate) view returns (bool)',
  'function canClaimFor(address authoriser, address delegate) view returns (bool)',
  'function canExchangeFor(address authoriser, address delegate) view returns (bool)',
  'function canIssueFor(address authoriser, address delegate) view returns (bool)',
  'function eternalStorage() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function removeAllDelegatePowers(address delegate)',
  'function removeBurnOnBehalf(address delegate)',
  'function removeClaimOnBehalf(address delegate)',
  'function removeExchangeOnBehalf(address delegate)',
  'function removeIssueOnBehalf(address delegate)',
  'function setEternalStorage(address _eternalStorage)',
];
