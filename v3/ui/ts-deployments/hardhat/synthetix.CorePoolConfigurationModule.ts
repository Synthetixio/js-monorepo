export const address = '0xD1e696E7Fbe6871EA6C2DEd979fC6BDd821522d9';
export const abi = [
  'error InsufficientAccountCollateral(uint256 accountId, address collateralType, uint256 requestedAmount)',
  'error InvalidCollateralType(address collateralType)',
  'error MarketNotFound(uint256 marketId)',
  'error MaxDebtPerShareTooLow(uint256 marketId, int256 requestedMaxDebtPerShare, int256 maximumMaxDebtPerShare)',
  'error PoolAlreadyApproved(uint256 poolId)',
  'error PoolNotFound(uint256 poolId)',
  'error Unauthorized(address addr)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint256 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint256)',
  'function removeApprovedPool(uint256 poolId)',
  'function setPreferredPool(uint256 poolId)',
];
