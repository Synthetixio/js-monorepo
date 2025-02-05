// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ShortingRewardssBTC';
export const address = '0xCed4055b47cfD0421f3727a35F69CE659c8bAF7a';
export const source = 'ShortingRewards';
export const abi = [
  'constructor(address _owner, address _resolver, address _rewardsDistribution, address _rewardsToken)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event Enrol(address indexed user, uint256 amount)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PauseChanged(bool isPaused)',
  'event RewardAdded(uint256 reward)',
  'event RewardPaid(address indexed user, uint256 reward)',
  'event RewardsDurationUpdated(uint256 newDuration)',
  'event Withdrawn(address indexed user, uint256 amount)',
  'function acceptOwnership()',
  'function balanceOf(address account) view returns (uint256)',
  'function earned(address account) view returns (uint256)',
  'function enrol(address account, uint256 amount)',
  'function getReward(address account)',
  'function getRewardForDuration() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function lastPauseTime() view returns (uint256)',
  'function lastTimeRewardApplicable() view returns (uint256)',
  'function lastUpdateTime() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notifyRewardAmount(uint256 reward)',
  'function owner() view returns (address)',
  'function paused() view returns (bool)',
  'function periodFinish() view returns (uint256)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function rewardPerToken() view returns (uint256)',
  'function rewardPerTokenStored() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
  'function rewards(address) view returns (uint256)',
  'function rewardsDistribution() view returns (address)',
  'function rewardsDuration() view returns (uint256)',
  'function rewardsToken() view returns (address)',
  'function setPaused(bool _paused)',
  'function setRewardsDistribution(address _rewardsDistribution)',
  'function setRewardsDuration(uint256 _rewardsDuration)',
  'function totalSupply() view returns (uint256)',
  'function userRewardPerTokenPaid(address) view returns (uint256)',
  'function withdraw(address account, uint256 amount)',
];
