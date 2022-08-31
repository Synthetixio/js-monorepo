export const address = '0xa4739EEca3Cd9B36ebd8164720E91018124FCd50';
export const abi = [
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketAlreadyRegistered(address market, uint256 existingMarketId)',
  'error MarketDepositNotApproved(address market, address from, uint256 requestedAmount, uint256 approvedAmount)',
  'error MarketNotFound(uint256 marketId)',
  'error MaxDebtPerShareTooLow(uint256 marketId, int256 requestedMaxDebtPerShare, int256 maximumMaxDebtPerShare)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error NotEnoughLiquidity(uint256 marketId, uint256 amount)',
  'error Unauthorized(address addr)',
  'event MarketRegistered(address indexed market, uint256 marketId)',
  'function depositUsd(uint256 marketId, address target, uint256 amount)',
  'function marketCollateralValue(uint256 marketId) view returns (uint256)',
  'function marketDebtPerShare(uint256 marketId) returns (int256)',
  'function marketLiquidity(uint256 marketId) view returns (uint256)',
  'function marketTotalBalance(uint256 marketId) view returns (int256)',
  'function registerMarket(address market) returns (uint256 marketId)',
  'function withdrawUsd(uint256 marketId, address target, uint256 amount)',
];
