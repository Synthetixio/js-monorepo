export const address = '0xe2AAa39eDC178a1f6A2840e594b81fd080eFd858';
export const abi = [
  'error EmptyDistribution()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error InsufficientDebt(int256 currentDebt)',
  'error MarketNotFound(uint128 marketId)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error OverflowInt256ToInt128()',
  'error OverflowInt256ToUint256()',
  'error OverflowUint128ToInt128()',
  'error OverflowUint256ToInt256()',
  'error OverflowUint256ToUint128()',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
];
