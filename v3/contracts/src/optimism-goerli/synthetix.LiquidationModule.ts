export const address = '0x125187A4FBAEdE1287D072d6bF0a8C09FcEaE118';
export const abi = [
  'error EmptyDistribution()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InconsistentDistribution()',
  'error IneligibleForLiquidation(uint256 collateralValue, uint256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketNotFound(uint128 marketId)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MustBeVaultLiquidated()',
  'error ZeroValuePerShare()',
  'event Liquidation(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'event VaultLiquidation(uint128 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'function isLiquidatable(uint128 accountId, uint128 poolId, address collateralType) returns (bool)',
  'function liquidate(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 amountRewarded, uint256 debtLiquidated, uint256 collateralLiquidated)',
  'function liquidateVault(uint128 poolId, address collateralType, uint128 liquidateAsAccountId, uint256 maxUsd) returns (uint256 amountLiquidated, uint256 collateralRewarded)',
];
