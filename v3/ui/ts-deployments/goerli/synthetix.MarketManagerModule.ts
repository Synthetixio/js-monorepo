export const address = '0x6b109Abb7e10Ee5240ccA7c6e7eF82aBa9c5DEde';
export const abi = [
	'error MarketAlreadyRegistered(address market)',
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
