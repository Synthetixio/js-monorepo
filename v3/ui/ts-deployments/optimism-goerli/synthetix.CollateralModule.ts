export const address = '0x8A289E133aaE93585e16AB906378Df9F04005e84';
export const abi = [
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error InvalidCollateral(address collateralType)',
  'error OutOfBounds()',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PositionOutOfBounds()',
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'event CollateralConfigured(address indexed collateralType, address indexed priceFeed, uint256 targetCollateralizationRatio, uint256 minimumCollateralizationRatio, uint256 liquidationReward, bool indexed stakingEnabled)',
  'event CollateralDeposited(uint128 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'event CollateralWithdrawn(uint128 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 items)',
  'function configureCollateral(address collateralType, address priceFeed, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, bool stakingEnabled)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function depositCollateral(uint128 accountId, address collateralType, uint256 amount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function getCollateralConfiguration(address collateralType) view returns (tuple(bool stakingEnabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool stakingEnabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress)[])',
  'function getCollateralPrice(address collateralType) view returns (uint256)',
  'function withdrawCollateral(uint128 accountId, address collateralType, uint256 amount)',
];
