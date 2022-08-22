export const name = 'RewardsDistribution';
export const address = '0x29C295B046a73Cde593f21f63091B072d407e3F2';
export const source = 'RewardsDistribution';
export const abi = [
  'function distributionsLength() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function distributions(uint256) view returns (address destination, uint256 amount)',
  'function nominatedOwner() view returns (address)',
  'function distributeRewards(uint256 amount) returns (bool)',
  'function setRewardEscrow(address _rewardEscrow)',
  'function addRewardDistribution(address destination, uint256 amount) returns (bool)',
  'function acceptOwnership()',
  'function setAuthority(address _authority)',
  'function removeRewardDistribution(uint256 index)',
  'function owner() view returns (address)',
  'function setSynthetixProxy(address _synthetixProxy)',
  'function rewardEscrow() view returns (address)',
  'function synthetixProxy() view returns (address)',
  'function authority() view returns (address)',
  'function feePoolProxy() view returns (address)',
  'function setFeePoolProxy(address _feePoolProxy)',
  'function editRewardDistribution(uint256 index, address destination, uint256 amount) returns (bool)',
  'constructor(address _owner, address _authority, address _synthetixProxy, address _rewardEscrow, address _feePoolProxy)',
  'event RewardDistributionAdded(uint256 index, address destination, uint256 amount)',
  'event RewardsDistributed(uint256 amount)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
];
