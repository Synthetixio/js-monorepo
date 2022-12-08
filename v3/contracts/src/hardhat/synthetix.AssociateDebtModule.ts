export const address = '0x07CFf6adDf97d9Bc722240c8772cFfB0A7eC3DEC';
export const abi = [
  'error EmptyDistribution()',
  'error FeatureUnavailable()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error MarketNotFound(uint128 marketId)',
  'error NotFundedByPool(uint256 marketId, uint256 poolId)',
  'error OverflowInt256ToInt128()',
  'error OverflowInt256ToUint256()',
  'error OverflowUint128ToInt128()',
  'error OverflowUint256ToInt256()',
  'error OverflowUint256ToUint128()',
  'error Unauthorized(address addr)',
  'event DebtAssociated(uint128 indexed marketId, uint128 indexed poolId, address indexed collateralType, uint128 accountId, uint256 amount, int256 updatedDebt)',
  'function associateDebt(uint128 marketId, uint128 poolId, address collateralType, uint128 accountId, uint256 amount) returns (int256)',
];
