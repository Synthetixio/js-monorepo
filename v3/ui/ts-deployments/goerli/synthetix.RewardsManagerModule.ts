export const address = '0x00cF91cb3AE826881d34A21B5ABE999e087cD0Ed';
export const abi = [
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error Unauthorized(address addr)',
  'event RewardDistributed(uint128 indexed poolId, address indexed token, uint256 indexed index, address distributor, uint256 totalRewarded, uint256 start, uint256 duration)',
  'event RewardsClaimed(uint128 indexed poolId, address indexed token, uint128 indexed accountId, uint256 index, uint256 amountClaimed)',
  'function claimRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[])',
  'function getAvailableRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[])',
  'function getCurrentRewardAccumulation(uint128 poolId, address collateralType) view returns (uint256[])',
  'function setRewardsDistribution(uint128 poolId, address collateralType, uint256 index, address distributor, uint256 amount, uint256 start, uint256 duration)',
];
