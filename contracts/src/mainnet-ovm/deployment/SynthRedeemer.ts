// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'SynthRedeemer';
export const address = '0xA997BD647AEe62Ef03b41e6fBFAdaB43d8E57535';
export const source = 'SynthRedeemer';
export const abi = [
  'constructor(address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event SynthDeprecated(address synth, uint256 rateToRedeem, uint256 totalSynthSupply, uint256 supplyInsUSD)',
  'event SynthRedeemed(address synth, address account, uint256 amountOfSynth, uint256 amountInsUSD)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function balanceOf(address synthProxy, address account) view returns (uint256 balanceInsUSD)',
  'function deprecate(address synthProxy, uint256 rateToRedeem)',
  'function isResolverCached() view returns (bool)',
  'function rebuildCache()',
  'function redeem(address synthProxy)',
  'function redeemAll(address[] synthProxies)',
  'function redeemPartial(address synthProxy, uint256 amountOfSynth)',
  'function redemptions(address) view returns (uint256)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function totalSupply(address synthProxy) view returns (uint256 supplyInsUSD)',
];
