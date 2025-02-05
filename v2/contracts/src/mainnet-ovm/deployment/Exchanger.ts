// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'Exchanger';
export const address = '0x24b4b6703a2eE7bA75a4Fc859B606F0bbaeef4EA';
export const source = 'Exchanger';
export const abi = [
  'constructor(address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event ExchangeEntryAppended(address indexed account, bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'event ExchangeEntrySettled(address indexed from, bytes32 src, uint256 amount, bytes32 dest, uint256 reclaim, uint256 rebate, uint256 srcRoundIdAtPeriodEnd, uint256 destRoundIdAtPeriodEnd, uint256 exchangeTimestamp)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function CONTRACT_NAME() view returns (bytes32)',
  'function acceptOwnership()',
  'function calculateAmountAfterSettlement(address from, bytes32 currencyKey, uint256 amount, uint256 refunded) view returns (uint256 amountAfterSettlement)',
  'function dynamicFeeRateForExchange(bytes32 sourceCurrencyKey, bytes32 destinationCurrencyKey) view returns (uint256 feeRate, bool tooVolatile)',
  'function exchange(address exchangeForAddress, address from, bytes32 sourceCurrencyKey, uint256 sourceAmount, bytes32 destinationCurrencyKey, address destinationAddress, bool virtualSynth, address rewardAddress, bytes32 trackingCode) returns (uint256 amountReceived, address vSynth)',
  'function exchangeAtomically(address, bytes32, uint256, bytes32, address, bytes32, uint256) returns (uint256)',
  'function feeRateForExchange(bytes32 sourceCurrencyKey, bytes32 destinationCurrencyKey) view returns (uint256)',
  'function getAmountsForExchange(uint256 sourceAmount, bytes32 sourceCurrencyKey, bytes32 destinationCurrencyKey) view returns (uint256 amountReceived, uint256 fee, uint256 exchangeFeeRate)',
  'function hasWaitingPeriodOrSettlementOwing(address account, bytes32 currencyKey) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function isSynthRateInvalid(bytes32 currencyKey) view returns (bool)',
  'function lastExchangeRate(bytes32 currencyKey) view returns (uint256)',
  'function maxSecsLeftInWaitingPeriod(address account, bytes32 currencyKey) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function priceDeviationThresholdFactor() view returns (uint256)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function settle(address from, bytes32 currencyKey) returns (uint256 reclaimed, uint256 refunded, uint256 numEntriesSettled)',
  'function settlementOwing(address account, bytes32 currencyKey) view returns (uint256 reclaimAmount, uint256 rebateAmount, uint256 numEntries)',
  'function tradingRewardsEnabled() view returns (bool)',
  'function waitingPeriodSecs() view returns (uint256)',
];
