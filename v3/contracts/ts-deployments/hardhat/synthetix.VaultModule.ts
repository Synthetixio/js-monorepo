export const address = '0xD98f794E0946aB7DCabcA449AAc75FFdD532b8A8';
export const abi = [
  'error CapacityLocked(uint256 marketId)',
  'error EmptyDistribution()',
  'error InconsistentDistribution()',
  'error InsufficientAccountCollateral(uint256 requestedAmount)',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error InvalidCollateral(address collateralType)',
  'error InvalidCollateral(address collateralType)',
  'error InvalidLeverage(uint256 leverage)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketNotFound(uint128 marketId)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PoolNotFound(uint128 poolId)',
  'error PoolNotFound(uint128 poolId)',
  'error PositionOutOfBounds()',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'error ZeroValuePerShare()',
  'event DelegationUpdated(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'function delegateCollateral(uint128 accountId, uint128 poolId, address collateralType, uint256 collateralAmount, uint256 leverage)',
  'function getPosition(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint128 accountId, uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralizationRatio(uint128 accountId, uint128 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint128 accountId, uint128 poolId, address collateralType) returns (int256)',
  'function getVaultCollateral(uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint128 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint128 poolId, address collateralType) returns (int256)',
];
