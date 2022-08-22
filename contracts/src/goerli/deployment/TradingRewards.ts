// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'TradingRewards';
export const address = '0x6eab29a0904d0fd964AdE1F6c3ab1584E36602aE';
export const source = 'TradingRewards';
export const abi = [
  'constructor(address owner, address periodController, address resolver)',
  'event AssignedRewardTokensRecovered(address recoverAddress, uint256 amount, uint256 periodID)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event ExchangeFeeRecorded(address indexed account, uint256 amount, uint256 periodID)',
  'event NewPeriodStarted(uint256 periodID)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PauseChanged(bool isPaused)',
  'event PeriodControllerChanged(address newPeriodController)',
  'event PeriodFinalizedWithRewards(uint256 periodID, uint256 rewards)',
  'event RewardsClaimed(address indexed account, uint256 amount, uint256 periodID)',
  'event TokensRecovered(address tokenAddress, address recoverAddress, uint256 amount)',
  'event UnassignedRewardTokensRecovered(address recoverAddress, uint256 amount)',
  'function acceptOwnership()',
  'function claimRewardsForPeriod(uint256 periodID)',
  'function claimRewardsForPeriods(uint256[] periodIDs)',
  'function closeCurrentPeriodWithRewards(uint256 rewards)',
  'function getAvailableRewards() view returns (uint256)',
  'function getAvailableRewardsForAccountForPeriod(address account, uint256 periodID) view returns (uint256)',
  'function getAvailableRewardsForAccountForPeriods(address account, uint256[] periodIDs) view returns (uint256 totalRewards)',
  'function getCurrentPeriod() view returns (uint256)',
  'function getPeriodAvailableRewards(uint256 periodID) view returns (uint256)',
  'function getPeriodController() view returns (address)',
  'function getPeriodIsClaimable(uint256 periodID) view returns (bool)',
  'function getPeriodIsFinalized(uint256 periodID) view returns (bool)',
  'function getPeriodRecordedFees(uint256 periodID) view returns (uint256)',
  'function getPeriodTotalRewards(uint256 periodID) view returns (uint256)',
  'function getRewardsToken() view returns (address)',
  'function getUnaccountedFeesForAccountForPeriod(address account, uint256 periodID) view returns (uint256)',
  'function getUnassignedRewards() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function lastPauseTime() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function paused() view returns (bool)',
  'function rebuildCache()',
  'function recordExchangeFeeForAccount(uint256 usdFeeAmount, address account)',
  'function recoverAssignedRewardTokensAndDestroyPeriod(address recoverAddress, uint256 periodID)',
  'function recoverTokens(address tokenAddress, address recoverAddress)',
  'function recoverUnassignedRewardTokens(address recoverAddress)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setPaused(bool _paused)',
  'function setPeriodController(address newPeriodController)',
];
