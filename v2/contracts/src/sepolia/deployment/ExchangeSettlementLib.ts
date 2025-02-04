// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'ExchangeSettlementLib';
export const address = '0x6f40ACC62F15eA50a67dd5183cC3Cd7Aa4257830';
export const source = 'ExchangeSettlementLib';
export const abi = [
  'event ExchangeEntryAppended(address indexed account, bytes32 src, uint256 amount, bytes32 dest, uint256 amountReceived, uint256 exchangeFeeRate, uint256 roundIdForSrc, uint256 roundIdForDest)',
  'event ExchangeEntrySettled(address indexed from, bytes32 src, uint256 amount, bytes32 dest, uint256 reclaim, uint256 rebate, uint256 srcRoundIdAtPeriodEnd, uint256 destRoundIdAtPeriodEnd, uint256 exchangeTimestamp)',
  'function hasWaitingPeriodOrSettlementOwing(tuple(IExchangeState exchangeState, IExchangeRates exchangeRates, ICircuitBreaker circuitBreaker, IExchangerInternalDebtCache debtCache, IIssuer issuer, ISynthetix synthetix) resolvedAddresses, address account, bytes32 currencyKey, uint256 waitingPeriod) view returns (bool)',
  'function maxSecsLeftInWaitingPeriod(IExchangeState exchangeState, address account, bytes32 currencyKey, uint256 waitingPeriod) view returns (uint256)',
  'function settlementOwing(tuple(IExchangeState exchangeState, IExchangeRates exchangeRates, ICircuitBreaker circuitBreaker, IExchangerInternalDebtCache debtCache, IIssuer issuer, ISynthetix synthetix) resolvedAddresses, address account, bytes32 currencyKey, uint256 waitingPeriod) view returns (uint256 reclaimAmount, uint256 rebateAmount, uint256 numEntries, tuple(bytes32 src, uint256 amount, bytes32 dest, uint256 reclaim, uint256 rebate, uint256 srcRoundIdAtPeriodEnd, uint256 destRoundIdAtPeriodEnd, uint256 timestamp)[])',
];
