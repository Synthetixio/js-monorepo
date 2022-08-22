// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthetixBridgeToOptimism';
export const address = '0x39Ea01a0298C315d149a490E34B59Dbf2EC7e48F';
export const source = 'SynthetixBridgeToOptimism';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DepositInitiated(address indexed _from, address _to, uint256 _amount)',
  'event ExportedVestingEntries(address indexed account, uint256 escrowedAccountBalance, tuple(uint64 endTime, uint256 escrowAmount)[] vestingEntries)',
  'event FeePeriodClosed(uint256 snxBackedDebt, uint256 totalDebtShares)',
  'event FinalizeSynthTransfer(bytes32 indexed currencyKey, address indexed destination, uint256 amount)',
  'event InitiateSynthTransfer(bytes32 indexed currencyKey, address indexed destination, uint256 amount)',
  'event InitiationResumed()',
  'event InitiationSuspended()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RewardDepositInitiated(address indexed account, uint256 amount)',
  'event WithdrawalFinalized(address indexed _to, uint256 _amount)',
  'function CONTRACT_NAME() pure returns (bytes32)',
  'function acceptOwnership()',
  'function closeFeePeriod(uint256 snxBackedAmount, uint256 totalDebtShares)',
  'function deposit(uint256 amount)',
  'function depositAndMigrateEscrow(uint256 depositAmount, uint256[][] entryIDs)',
  'function depositReward(uint256 amount)',
  'function depositTo(address to, uint256 amount)',
  'function finalizeSynthTransfer(bytes32 currencyKey, address destination, uint256 amount)',
  'function finalizeWithdrawal(address to, uint256 amount)',
  'function forwardTokensToEscrow(address token)',
  'function initiateSynthTransfer(bytes32 currencyKey, address destination, uint256 amount)',
  'function initiationActive() view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function migrateEscrow(uint256[][] entryIDs)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notifyRewardAmount(uint256 amount)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function resumeInitiation()',
  'function suspendInitiation()',
  'function synthTransferReceived() view returns (uint256)',
  'function synthTransferSent() view returns (uint256)',
];
