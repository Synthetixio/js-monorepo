export const address = '0x670bff4C6CF9550a92A6847c9b77dA155F3dFeFc';
export const abi = [
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 accountId, address collateralType, uint256 requestedAmount)',
  'error InvalidCollateralType(address collateralType)',
  'error InvalidPointsOrder()',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error OutOfBounds()',
  'error PositionOutOfBounds()',
  'error RoleNotAuthorized(uint256 accountId, bytes32 role, address target)',
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'error ValueOutOfRange()',
  'event CollateralAdjusted(address collateralType, address priceFeed, uint256 targetCRatio, uint256 minimumCRatio, bool enabled)',
  'event CollateralStaked(uint256 accountId, address collateralType, uint256 amount, address executedBy)',
  'event CollateralUnstaked(uint256 accountId, address collateralType, uint256 amount, address executedBy)',
  'function adjustCollateralType(address collateralType, address priceFeed, uint256 targetCRatio, uint256 minimumCRatio, bool enabled)',
  'function cleanExpiredLocks(uint256 accountId, address collateralType, uint256 offset, uint256 items)',
  'function getAccountCollateralTotals(uint256 accountId, address collateralType) view returns (uint256 totalStaked, uint256 totalAssigned, uint256 totalLocked, uint256 totalEscrowed)',
  'function getAccountCollaterals(uint256 accountId) view returns (address[] collateralTypes)',
  'function getAccountUnassignedCollateral(uint256 accountId, address collateralType) view returns (uint256)',
  'function getAccountUnstakebleCollateral(uint256 accountId, address collateralType) view returns (uint256)',
  'function getCollateralType(address collateralType) view returns (tuple(bool enabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress))',
  'function getCollateralTypes(bool hideDisabled) view returns (tuple(bool enabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress)[])',
  'function redeemReward(uint256 accountId, uint256 amount, uint256 duration)',
  'function stake(uint256 accountId, address collateralType, uint256 amount)',
  'function unstake(uint256 accountId, address collateralType, uint256 amount)',
];
