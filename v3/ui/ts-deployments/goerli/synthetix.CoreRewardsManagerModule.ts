export const address = '0x6A04Bc7dB42210558956B744841aa8000Cea79F1';
export const abi = [
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error Unauthorized(address addr)',
  'event RewardDistributed(uint128 indexed poolId, address indexed token, uint256 indexed index, address distributor, uint256 totalRewarded, uint256 start, uint256 duration)',
  'event RewardsClaimed(uint128 indexed poolId, address indexed token, uint128 indexed accountId, uint256 index, uint256 amountClaimed)',
  'function claimRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[])',
  'function getAvailableRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[])',
  'function getCurrentRewardAccumulation(uint128 poolId, address collateralType) view returns (uint256[])',
  'function setRewardsDistribution(uint128 poolId, address collateralType, uint256 index, address distributor, uint256 amount, uint256 start, uint256 duration)',
];
