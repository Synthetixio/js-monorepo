export const address = '0xcC1Ae82cf39F67e653500A1BF3D952F3da7422c7';
export const abi = [
  'error InsufficientAccountCollateral(uint256 accountId, address collateralType, uint256 requestedAmount)',
  'error InvalidCollateral(address collateralType)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketNotFound(uint256 marketId)',
  'error MaxDebtPerShareTooLow(uint256 marketId, int256 requestedMaxDebtPerShare, int256 maximumMaxDebtPerShare)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error PermissionDenied(uint256 accountId, bytes32 permission, address target)',
  'error PoolNotFound(uint256 poolId)',
  'error Unauthorized(address addr)',
  'event RewardDistributionSet(uint256 indexed poolId, address indexed token, uint256 indexed index, address distributor, uint256 totalRewarded, uint256 start, uint256 duration)',
  'event RewardsClaimed(uint256 indexed poolId, address indexed token, uint256 indexed accountId, uint256 index, uint256 amountClaimed)',
  'function claimRewards(uint256 poolId, address collateralType, uint256 accountId) returns (uint256[])',
  'function distributeRewards(uint256 poolId, address collateralType, uint256 index, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'function getAvailableRewards(uint256 poolId, address collateralType, uint256 accountId) returns (uint256[])',
  'function getCurrentRewardAccumulation(uint256 poolId, address collateralType) view returns (uint256[])',
];
