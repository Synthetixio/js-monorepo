export const address = '0x9b00Fa7d5bD48CEe9d50efC076a54A74792A99cE';
export const abi = [
  'error MarketAlreadyRegistered(address market)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error NotEnoughLiquidity(uint256 marketId, uint256 amount)',
  'error Unauthorized(address addr)',
  'event MarketRegistered(address market, uint256 marketId)',
  'function deposit(uint256 marketId, address target, uint256 amount)',
  'function marketLiquidity(uint256 marketId) view returns (uint256)',
  'function marketTotalBalance(uint256 marketId) view returns (int256)',
  'function registerMarket(address market) returns (uint256 marketId)',
  'function withdraw(uint256 marketId, address target, uint256 amount)',
];
