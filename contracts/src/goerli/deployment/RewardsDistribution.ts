// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardsDistribution';
export const address = '0x882eaF70e172b8543145811c5fE169d03740ba9a';
export const source = 'RewardsDistribution';
export const abi = [
  'constructor(address _owner, address _authority, address _synthetixProxy, address _rewardEscrow, address _feePoolProxy)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RewardDistributionAdded(uint256 index, address destination, uint256 amount)',
  'event RewardsDistributed(uint256 amount)',
  'function acceptOwnership()',
  'function addRewardDistribution(address destination, uint256 amount) returns (bool)',
  'function authority() view returns (address)',
  'function distributeRewards(uint256 amount) returns (bool)',
  'function distributions(uint256) view returns (address destination, uint256 amount)',
  'function distributionsLength() view returns (uint256)',
  'function editRewardDistribution(uint256 index, address destination, uint256 amount) returns (bool)',
  'function feePoolProxy() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function removeRewardDistribution(uint256 index)',
  'function rewardEscrow() view returns (address)',
  'function setAuthority(address _authority)',
  'function setFeePoolProxy(address _feePoolProxy)',
  'function setRewardEscrow(address _rewardEscrow)',
  'function setSynthetixProxy(address _synthetixProxy)',
  'function synthetixProxy() view returns (address)',
];
