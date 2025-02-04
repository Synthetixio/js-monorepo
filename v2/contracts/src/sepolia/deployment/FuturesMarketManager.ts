// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FuturesMarketManager';
export const address = '0xA73A7B754Ec870b3738D0654cA75b7d0eEbdb460';
export const source = 'EmptyFuturesMarketManager';
export const abi = [
  'function CONTRACT_NAME() view returns (bytes32)',
  'function addEndorsedAddresses(address[] addresses)',
  'function allEndorsedAddresses() view returns (address[])',
  'function allMarkets() view returns (address[])',
  'function allMarkets(bool proxiedMarkets) view returns (address[])',
  'function isEndorsed(address account) view returns (bool)',
  'function marketForKey(bytes32 marketKey) view returns (address)',
  'function markets(uint256 index, uint256 pageSize, bool proxiedMarkets) view returns (address[])',
  'function markets(uint256 index, uint256 pageSize) view returns (address[])',
  'function marketsForKeys(bytes32[] marketKeys) view returns (address[])',
  'function numMarkets() view returns (uint256)',
  'function numMarkets(bool proxiedMarkets) view returns (uint256)',
  'function removeEndorsedAddresses(address[] addresses)',
  'function totalDebt() view returns (uint256 debt, bool isInvalid)',
];
