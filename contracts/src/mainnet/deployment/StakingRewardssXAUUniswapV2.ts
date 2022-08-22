// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'StakingRewardssXAUUniswapV2';
export const address = '0x8302FE9F0C509a996573D3Cc5B0D5D51e4FDD5eC';
export const source = 'StakingRewardssXAUUniswapV2';
export const abi = [
  'constructor(address _owner, address _rewardsToken, address _stakingToken)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RewardAdded(uint256 reward)',
  'event RewardPaid(address indexed user, uint256 reward)',
  'event Staked(address indexed user, uint256 amount)',
  'event Withdrawn(address indexed user, uint256 amount)',
  'function DURATION() view returns (uint256)',
  'function acceptOwnership()',
  'function balanceOf(address account) view returns (uint256)',
  'function earned(address account) view returns (uint256)',
  'function exit()',
  'function getReward()',
  'function lastTimeRewardApplicable() view returns (uint256)',
  'function lastUpdateTime() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notifyRewardAmount(uint256 reward)',
  'function owner() view returns (address)',
  'function periodFinish() view returns (uint256)',
  'function rewardPerToken() view returns (uint256)',
  'function rewardPerTokenStored() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
  'function rewards(address) view returns (uint256)',
  'function rewardsDistribution() view returns (address)',
  'function rewardsToken() view returns (address)',
  'function setRewardsDistribution(address _rewardsDistribution)',
  'function stake(uint256 amount)',
  'function stakingToken() view returns (address)',
  'function totalSupply() view returns (uint256)',
  'function userRewardPerTokenPaid(address) view returns (uint256)',
  'function withdraw(uint256 amount)',
];
