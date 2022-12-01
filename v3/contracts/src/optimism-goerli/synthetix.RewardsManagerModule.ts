export const address = '0xBd499a2a367a16f7B6D7A23951062d61FCea622D';
export const abi = [
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PositionOutOfBounds()',
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'event RewardsClaimed(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount)',
  'event RewardsDistributed(uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'function claimRewards(uint128 poolId, address collateralType, uint128 accountId, address distributor) returns (uint256)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint256 start, uint256 duration)',
  'function getRewardRate(uint128 poolId, address collateralType, address distributor) view returns (uint256)',
  'function getRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[], address[])',
  'function registerRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
];
