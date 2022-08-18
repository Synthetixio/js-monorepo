export const address = '0xD1e696E7Fbe6871EA6C2DEd979fC6BDd821522d9';
export const abi = [
  'error MarketAlreadyRegistered(address market)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error NotEnoughLiquidity(uint256 marketId, uint256 amount)',
  'error Unauthorized(address addr)',
  'event MarketRegistered(address market, uint256 marketId)',
  'function deposit(uint256 marketId, address target, uint256 amount)',
  'function fundBalance(uint256 marketId, uint256 fundId) view returns (int256)',
  'function liquidity(uint256 marketId) view returns (uint256)',
  'function registerMarket(address market) returns (uint256 marketId)',
  'function totalBalance(uint256 marketId) view returns (int256)',
  'function withdraw(uint256 marketId, address target, uint256 amount)',
];
