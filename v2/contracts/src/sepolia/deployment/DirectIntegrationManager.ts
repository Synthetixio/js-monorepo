// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DirectIntegrationManager';
export const address = '0xB2E57aC75df91784d76f9Dc0C00AdEFf2eFAe317';
export const source = 'DirectIntegrationManager';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event IntegrationParametersSet(address indexed integration, bytes32 indexed currencyKey, tuple(bytes32 currencyKey, address dexPriceAggregator, address atomicEquivalentForDexPricing, uint256 atomicExchangeFeeRate, uint256 atomicTwapWindow, uint256 atomicMaxVolumePerBlock, uint256 atomicVolatilityConsiderationWindow, uint256 atomicVolatilityUpdateThreshold, uint256 exchangeFeeRate, uint256 exchangeMaxDynamicFee, uint256 exchangeDynamicFeeRounds, uint256 exchangeDynamicFeeThreshold, uint256 exchangeDynamicFeeWeightDecay) overrides)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function getExchangeParameters(address integration, bytes32 currencyKey) view returns (tuple(bytes32 currencyKey, address dexPriceAggregator, address atomicEquivalentForDexPricing, uint256 atomicExchangeFeeRate, uint256 atomicTwapWindow, uint256 atomicMaxVolumePerBlock, uint256 atomicVolatilityConsiderationWindow, uint256 atomicVolatilityUpdateThreshold, uint256 exchangeFeeRate, uint256 exchangeMaxDynamicFee, uint256 exchangeDynamicFeeRounds, uint256 exchangeDynamicFeeThreshold, uint256 exchangeDynamicFeeWeightDecay) overrides)',
  'function isResolverCached() view returns (bool)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setExchangeParameters(address integration, bytes32[] currencyKeys, tuple(bytes32 currencyKey, address dexPriceAggregator, address atomicEquivalentForDexPricing, uint256 atomicExchangeFeeRate, uint256 atomicTwapWindow, uint256 atomicMaxVolumePerBlock, uint256 atomicVolatilityConsiderationWindow, uint256 atomicVolatilityUpdateThreshold, uint256 exchangeFeeRate, uint256 exchangeMaxDynamicFee, uint256 exchangeDynamicFeeRounds, uint256 exchangeDynamicFeeThreshold, uint256 exchangeDynamicFeeWeightDecay) settings)',
];
