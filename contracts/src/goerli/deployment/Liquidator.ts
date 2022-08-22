// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'Liquidator';
export const address = '0x280E5dFaA78CE685a846830bAe5F2FD21d6A3D89';
export const source = 'Liquidator';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event AccountFlaggedForLiquidation(address indexed account, uint256 deadline)',
  'event AccountRemovedFromLiquidation(address indexed account, uint256 time)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function LIQUIDATION_CALLER() view returns (bytes32)',
  'function LIQUIDATION_DEADLINE() view returns (bytes32)',
  'function acceptOwnership()',
  'function calculateAmountToFixCollateral(uint256 debtBalance, uint256 collateral, uint256 penalty) view returns (uint256)',
  'function checkAndRemoveAccountInLiquidation(address account)',
  'function flagAccountForLiquidation(address account)',
  'function flagReward() view returns (uint256)',
  'function getLiquidationCallerForAccount(address account) view returns (address)',
  'function getLiquidationDeadlineForAccount(address account) view returns (uint256)',
  'function isLiquidationDeadlinePassed(address account) view returns (bool)',
  'function isLiquidationOpen(address account, bool isSelfLiquidation) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function issuanceRatio() view returns (uint256)',
  'function liquidateReward() view returns (uint256)',
  'function liquidationCollateralRatio() view returns (uint256)',
  'function liquidationDelay() view returns (uint256)',
  'function liquidationEscrowDuration() view returns (uint256)',
  'function liquidationPenalty() view returns (uint256)',
  'function liquidationRatio() view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function removeAccountInLiquidation(address account)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function selfLiquidationPenalty() view returns (uint256)',
];
