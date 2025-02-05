// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DynamicSynthRedeemer';
export const address = '0x2e11a3638F12A37263b1B4226b61412f6BBB277c';
export const source = 'DynamicSynthRedeemer';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DiscountRateUpdated(uint256 discountRate)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event RedemptionResumed()',
  'event RedemptionSuspended()',
  'event SynthRedeemed(address synth, address account, uint256 amountOfSynth, uint256 amountInsUSD)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function discountRate() view returns (uint256)',
  'function getDiscountRate() view returns (uint256)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function redeem(bytes32 currencyKey)',
  'function redeemAll(bytes32[] currencyKeys)',
  'function redeemPartial(bytes32 currencyKey, uint256 amountOfSynth)',
  'function redemptionActive() view returns (bool)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function resumeRedemption()',
  'function setDiscountRate(uint256 _newRate)',
  'function suspendRedemption()',
];
