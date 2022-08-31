export const address = '0x0D96133a2f740889E913A967857cE29BBE255a31';
export const abi = [
  'error EmptyVault(uint256 poolId, address collateralType)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error IneligibleForLiquidation(uint256 collateralValue, uint256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InsufficientAccountCollateral(uint256 accountId, address collateralType, uint256 requestedAmount)',
  'error InvalidCollateralType(address collateralType)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketNotFound(uint256 marketId)',
  'error MaxDebtPerShareTooLow(uint256 marketId, int256 requestedMaxDebtPerShare, int256 maximumMaxDebtPerShare)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MustBeVaultLiquidated()',
  'error OnlyTokenProxyAllowed(address origin)',
  'error PermissionDenied(uint256 accountId, bytes32 permission, address target)',
  'error PoolAlreadyApproved(uint256 poolId)',
  'error PoolAlreadyExists(uint256 poolId)',
  'error PoolNotFound(uint256 poolId)',
  'event DelegationUpdated(uint256 accountId, uint256 poolId, address collateralType, uint256 amount, uint256 leverage)',
  'event Liquidation(uint256 indexed accountId, uint256 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'event NominatedNewOwner(address nominatedOwner, uint256 poolId)',
  'event OwnershipAccepted(address newOwner, uint256 poolId)',
  'event OwnershipRenounced(address target, uint256 poolId)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PoolCreated(address owner, uint256 poolId)',
  'event PoolPositionSet(uint256 poolId, uint256[] markets, uint256[] weights, address executedBy)',
  'event PreferredPoolSet(uint256 poolId)',
  'event RewardDistributionSet(uint256 indexed poolId, address indexed token, uint256 indexed index, address distributor, uint256 totalRewarded, uint256 start, uint256 duration)',
  'event RewardsClaimed(uint256 indexed poolId, address indexed token, uint256 indexed accountId, uint256 index, uint256 amountClaimed)',
  'event VaultLiquidation(uint256 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'function isLiquidatable(uint256 accountId, uint256 poolId, address collateralType) returns (bool)',
  'function liquidate(uint256 accountId, uint256 poolId, address collateralType) returns (uint256 amountRewarded, uint256 debtLiquidated, uint256 collateralLiquidated)',
  'function liquidateVault(uint256 poolId, address collateralType, uint256 liquidateAsAccountId, uint256 maxUsd) returns (uint256 amountLiquidated, uint256 collateralRewarded)',
];
