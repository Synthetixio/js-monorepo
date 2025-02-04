// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'StakingRewardsSNXBalancer';
export const address = '0xFBaEdde70732540cE2B11A8AC58Eb2dC0D69dE10';
export const source = 'StakingRewardsSNXBalancer';
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
