// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'CollateralUtil';
export const address = '0x814AAB41E07D2c3fA53C0c6f3002cD654a4489EE';
export const source = 'CollateralUtil';
export const abi = [
  'constructor(address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'function collateralRedeemed(bytes32 currency, uint256 amount, bytes32 collateralKey) view returns (uint256 collateral)',
  'function getCollateralRatio(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan, bytes32 collateralKey) view returns (uint256 cratio)',
  'function isResolverCached() view returns (bool)',
  'function liquidationAmount(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan, uint256 minCratio, bytes32 collateralKey) view returns (uint256 amount)',
  'function maxLoan(uint256 amount, bytes32 currency, uint256 minCratio, bytes32 collateralKey) view returns (uint256 max)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
];
