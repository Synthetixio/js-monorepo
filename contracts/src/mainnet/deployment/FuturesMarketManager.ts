export const name = 'FuturesMarketManager';
export const address = '0x834Ef6c82D431Ac9A7A6B66325F185b2430780D7';
export const source = 'EmptyFuturesMarketManager';
export const abi = [
  'function CONTRACT_NAME() view returns (bytes32)',
  'function allMarkets() view returns (address[])',
  'function marketForKey(bytes32 marketKey) view returns (address)',
  'function markets(uint256 index, uint256 pageSize) view returns (address[])',
  'function marketsForKeys(bytes32[] marketKeys) view returns (address[])',
  'function numMarkets() view returns (uint256)',
  'function totalDebt() view returns (uint256 debt, bool isInvalid)',
];
