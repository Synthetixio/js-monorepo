export const address = '0x656c04ee7f4685faE7735AA3333Ac608a5a92147';
export const abi = [
  'error CollateralDepositDisabled(address collateralType)',
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error OutOfBounds()',
  'error OverflowInt256ToUint256()',
  'error OverflowUint256ToUint128()',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PositionOutOfBounds()',
  'event Deposited(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event Withdrawn(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 items)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function deposit(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function withdraw(uint128 accountId, address collateralType, uint256 tokenAmount)',
];
