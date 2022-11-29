export const address = '0x0Fb169241d5C5a5372ebE1b0Df0d08B075053Beb';
export const abi = [
  'error EmptyDistribution()',
  'error InconsistentDistribution()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error InsufficientDebt(int256 currentDebt)',
  'error MarketNotFound(uint128 marketId)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error ZeroValuePerShare()',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
];
