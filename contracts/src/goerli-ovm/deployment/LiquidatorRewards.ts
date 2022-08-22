// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'LiquidatorRewards';
export const address = '0x1c6C0a89064206e397E75b11Bcd370E8A8A007B4';
export const source = 'LiquidatorRewards';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RewardPaid(address indexed user, uint256 reward)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function accumulatedRewardsPerShare() view returns (uint256)',
  'function earned(address account) view returns (uint256)',
  'function entries(address) view returns (uint128 claimable, uint128 entryAccumulatedRewards)',
  'function getReward(address account)',
  'function initiated(address) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notifyRewardAmount(uint256 reward)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function updateEntry(address account)',
];
