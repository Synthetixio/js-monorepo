export const address = '0xEDC13308c30c9008E7AeC95042c9cDAD9f401649';
export const abi = [
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientMarketCollateralDepositable(uint128 marketId, address collateralType, uint256 tokenAmountToDeposit)',
  'error InsufficientMarketCollateralWithdrawable(uint128 marketId, address collateralType, uint256 tokenAmountToWithdraw)',
  'error Unauthorized(address addr)',
  'event MarketCollateralDeposited(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MarketCollateralWithdrawn(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 systemAmount, address indexed sender)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256 collateralAmountD18)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
];
