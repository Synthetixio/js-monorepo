// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x38908Ee087D7db73A1Bd1ecab9AAb8E8c9C74595';
export const abi = [
  'error ImplementationIsSterile(address implementation)',
  'error NoChange()',
  'error NotAContract(address contr)',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error UpgradeSimulationFailed()',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event Upgraded(address indexed self, address implementation)',
  'function acceptOwnership()',
  'function getImplementation() view returns (address)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error FeatureUnavailable(bytes32 which)',
  'error InvalidMarketOwner()',
  'error InvalidSynthImplementation(uint256 synthImplementation)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error MissingAssociatedSystem(bytes32 id)',
  'error OnlyMarketOwner(address marketOwner, address sender)',
  'error OverflowInt256ToUint256()',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'event MarketNominationRenounced(uint128 indexed marketId, address nominee)',
  'event MarketOwnerChanged(uint128 indexed marketId, address oldOwner, address newOwner)',
  'event MarketOwnerNominated(uint128 indexed marketId, address newOwner)',
  'event SynthImplementationUpgraded(uint256 indexed synthMarketId, address indexed proxy, address implementation)',
  'event SynthPriceDataUpdated(uint256 indexed synthMarketId, bytes32 indexed buyFeedId, bytes32 indexed sellFeedId)',
  'event SynthRegistered(uint256 indexed synthMarketId)',
  'function acceptMarketOwnership(uint128 synthMarketId)',
  'function createSynth(string tokenName, string tokenSymbol, address synthOwner) returns (uint128 synthMarketId)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function getMarketOwner(uint128 synthMarketId) view returns (address marketOwner)',
  'function getSynth(uint128 marketId) view returns (address synthAddress)',
  'function getSynthImpl(uint128 marketId) view returns (address implAddress)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function minimumCredit(uint128 marketId) view returns (uint256 lockedAmount)',
  'function name(uint128 marketId) view returns (string marketName)',
  'function nominateMarketOwner(uint128 synthMarketId, address newNominatedOwner)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'function renounceMarketNomination(uint128 synthMarketId)',
  'function reportedDebt(uint128 marketId) view returns (uint256 reportedDebtAmount)',
  'function setDecayRate(uint128 marketId, uint256 rate)',
  'function setSynthImplementation(address synthImplementation)',
  'function setSynthetix(address synthetix)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool isSupported)',
  'function updatePriceData(uint128 synthMarketId, bytes32 buyFeedId, bytes32 sellFeedId)',
  'function upgradeSynthImpl(uint128 marketId)',
  'error ExceedsMaxSynthAmount(uint256 maxSynthAmount, uint256 synthAmountCharged)',
  'error ExceedsMaxUsdAmount(uint256 maxUsdAmount, uint256 usdAmountCharged)',
  'error InsufficientAmountReceived(uint256 expected, uint256 current)',
  'error InvalidMarket(uint128 marketId)',
  'error InvalidPrices()',
  'error OverflowUint256ToInt256()',
  'event SynthBought(uint256 indexed synthMarketId, uint256 synthReturned, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address referrer)',
  'event SynthSold(uint256 indexed synthMarketId, uint256 amountReturned, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address referrer)',
  'function buy(uint128 marketId, uint256 usdAmount, uint256 minAmountReceived, address referrer) returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function buyExactIn(uint128 marketId, uint256 usdAmount, uint256 minAmountReceived, address referrer) returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function buyExactOut(uint128 marketId, uint256 synthAmount, uint256 maxUsdAmount, address referrer) returns (uint256 usdAmountCharged, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteBuyExactIn(uint128 marketId, uint256 usdAmount) view returns (uint256 synthAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteBuyExactOut(uint128 marketId, uint256 synthAmount) view returns (uint256 usdAmountCharged, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteSellExactIn(uint128 marketId, uint256 synthAmount) view returns (uint256 returnAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function quoteSellExactOut(uint128 marketId, uint256 usdAmount) view returns (uint256 synthToBurn, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sell(uint128 marketId, uint256 synthAmount, uint256 minUsdAmount, address referrer) returns (uint256 usdAmountReceived, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sellExactIn(uint128 marketId, uint256 synthAmount, uint256 minAmountReceived, address referrer) returns (uint256 returnAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function sellExactOut(uint128 marketId, uint256 usdAmount, uint256 maxSynthAmount, address referrer) returns (uint256 synthToBurn, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'error IneligibleForCancellation(uint256 timestamp, uint256 expirationTime)',
  'error InsufficientSharesAmount(uint256 expected, uint256 actual)',
  'error InvalidAsyncTransactionType(uint8 transactionType)',
  'error InvalidClaim(uint256 asyncOrderId)',
  'error InvalidCommitmentAmount(uint256 minimumAmount, uint256 amount)',
  'error InvalidSettlementStrategy(uint256 settlementStrategyId)',
  'error OrderAlreadySettled(uint256 asyncOrderId, uint256 settledAt)',
  'event OrderCancelled(uint128 indexed marketId, uint128 indexed asyncOrderId, tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim, address indexed sender)',
  'event OrderCommitted(uint128 indexed marketId, uint8 indexed orderType, uint256 amountProvided, uint128 asyncOrderId, address indexed sender, address referrer)',
  'function cancelOrder(uint128 marketId, uint128 asyncOrderId)',
  'function commitOrder(uint128 marketId, uint8 orderType, uint256 amountProvided, uint256 settlementStrategyId, uint256 minimumSettlementAmount, address referrer) returns (tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim)',
  'function getAsyncOrderClaim(uint128 marketId, uint128 asyncOrderId) pure returns (tuple(uint128 id, address owner, uint8 orderType, uint256 amountEscrowed, uint256 settlementStrategyId, uint256 settlementTime, uint256 minimumSettlementAmount, uint256 settledAt, address referrer) asyncOrderClaim)',
  'error InvalidVerificationResponse()',
  'error MinimumSettlementAmountNotMet(uint256 minimum, uint256 actual)',
  'error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData)',
  'error OutsideSettlementWindow(uint256 timestamp, uint256 startTime, uint256 expirationTime)',
  'error OverflowUint256ToUint64()',
  'error PriceDeviationToleranceExceeded(uint256 deviation, uint256 tolerance)',
  'error SettlementStrategyNotFound(uint8 strategyType)',
  'event OrderSettled(uint128 indexed marketId, uint128 indexed asyncOrderId, uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 collectedFees, address indexed settler)',
  'function PRECISION() view returns (int256)',
  'function settleOrder(uint128 marketId, uint128 asyncOrderId) returns (uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function settlePythOrder(bytes result, bytes extraData) payable returns (uint256 finalOrderAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'event SettlementStrategyAdded(uint128 indexed synthMarketId, uint256 indexed strategyId)',
  'event SettlementStrategyUpdated(uint128 indexed synthMarketId, uint256 indexed strategyId, bool enabled)',
  'function addSettlementStrategy(uint128 marketId, tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, string url, uint256 settlementReward, uint256 priceDeviationTolerance, uint256 minimumUsdExchangeAmount, uint256 maxRoundingLoss, bool disabled) strategy) returns (uint256 strategyId)',
  'function getSettlementStrategy(uint128 marketId, uint256 strategyId) view returns (tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, string url, uint256 settlementReward, uint256 priceDeviationTolerance, uint256 minimumUsdExchangeAmount, uint256 maxRoundingLoss, bool disabled) settlementStrategy)',
  'function setSettlementStrategyEnabled(uint128 marketId, uint256 strategyId, bool enabled)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InvalidCollateralType()',
  'error WrapperExceedsMaxAmount(uint256 maxWrappableAmount, uint256 currentSupply, uint256 amountToWrap)',
  'event SynthUnwrapped(uint256 indexed synthMarketId, uint256 amountUnwrapped, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 feesCollected)',
  'event SynthWrapped(uint256 indexed synthMarketId, uint256 amountWrapped, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees, uint256 feesCollected)',
  'event WrapperSet(uint256 indexed synthMarketId, address indexed wrapCollateralType, uint256 maxWrappableAmount)',
  'function setWrapper(uint128 marketId, address wrapCollateralType, uint256 maxWrappableAmount)',
  'function unwrap(uint128 marketId, uint256 unwrapAmount, uint256 minAmountReceived) returns (uint256 returnCollateralAmount, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'function wrap(uint128 marketId, uint256 wrapAmount, uint256 minAmountReceived) returns (uint256 amountToMint, tuple(uint256 fixedFees, uint256 utilizationFees, int256 skewFees, int256 wrapperFees) fees)',
  'error InvalidCollateralLeverage(uint256)',
  'error InvalidFeeCollectorInterface(address invalidFeeCollector)',
  'error InvalidWrapperFees()',
  'event AsyncFixedFeeSet(uint256 indexed synthMarketId, uint256 asyncFixedFee)',
  'event AtomicFixedFeeSet(uint256 indexed synthMarketId, uint256 atomicFixedFee)',
  'event CollateralLeverageSet(uint256 indexed synthMarketId, uint256 collateralLeverage)',
  'event FeeCollectorSet(uint256 indexed synthMarketId, address feeCollector)',
  'event MarketSkewScaleSet(uint256 indexed synthMarketId, uint256 skewScale)',
  'event MarketUtilizationFeesSet(uint256 indexed synthMarketId, uint256 utilizationFeeRate)',
  'event ReferrerShareUpdated(uint128 indexed marketId, address referrer, uint256 sharePercentage)',
  'event TransactorFixedFeeSet(uint256 indexed synthMarketId, address transactor, uint256 fixedFeeAmount)',
  'event WrapperFeesSet(uint256 indexed synthMarketId, int256 wrapFee, int256 unwrapFee)',
  'function setAsyncFixedFee(uint128 synthMarketId, uint256 asyncFixedFee)',
  'function setAtomicFixedFee(uint128 synthMarketId, uint256 atomicFixedFee)',
  'function setCollateralLeverage(uint128 synthMarketId, uint256 collateralLeverage)',
  'function setCustomTransactorFees(uint128 synthMarketId, address transactor, uint256 fixedFeeAmount)',
  'function setFeeCollector(uint128 synthMarketId, address feeCollector)',
  'function setMarketSkewScale(uint128 synthMarketId, uint256 skewScale)',
  'function setMarketUtilizationFees(uint128 synthMarketId, uint256 utilizationFeeRate)',
  'function setWrapperFees(uint128 synthMarketId, int256 wrapFee, int256 unwrapFee)',
  'function updateReferrerShare(uint128 synthMarketId, address referrer, uint256 sharePercentage)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 indexed feature, bool allowAll)',
  'event FeatureFlagAllowlistAdded(bytes32 indexed feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 indexed feature, address account)',
  'event FeatureFlagDeniersReset(bytes32 indexed feature, address[] deniers)',
  'event FeatureFlagDenyAllSet(bytes32 indexed feature, bool denyAll)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address account)',
  'function getDeniers(bytes32 feature) view returns (address[])',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function getFeatureFlagDenyAll(bytes32 feature) view returns (bool)',
  'function isFeatureAllowed(bytes32 feature, address account) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address account)',
  'function setDeniers(bytes32 feature, address[] deniers)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
  'function setFeatureFlagDenyAll(bytes32 feature, bool denyAll)',
];
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common';

export declare namespace OrderFees {
  export type DataStruct = {
    fixedFees: PromiseOrValue<BigNumberish>;
    utilizationFees: PromiseOrValue<BigNumberish>;
    skewFees: PromiseOrValue<BigNumberish>;
    wrapperFees: PromiseOrValue<BigNumberish>;
  };

  export type DataStructOutput = [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fixedFees: BigNumber;
    utilizationFees: BigNumber;
    skewFees: BigNumber;
    wrapperFees: BigNumber;
  };
}

export declare namespace AsyncOrderClaim {
  export type DataStruct = {
    id: PromiseOrValue<BigNumberish>;
    owner: PromiseOrValue<string>;
    orderType: PromiseOrValue<BigNumberish>;
    amountEscrowed: PromiseOrValue<BigNumberish>;
    settlementStrategyId: PromiseOrValue<BigNumberish>;
    settlementTime: PromiseOrValue<BigNumberish>;
    minimumSettlementAmount: PromiseOrValue<BigNumberish>;
    settledAt: PromiseOrValue<BigNumberish>;
    referrer: PromiseOrValue<string>;
  };

  export type DataStructOutput = [
    BigNumber,
    string,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    id: BigNumber;
    owner: string;
    orderType: number;
    amountEscrowed: BigNumber;
    settlementStrategyId: BigNumber;
    settlementTime: BigNumber;
    minimumSettlementAmount: BigNumber;
    settledAt: BigNumber;
    referrer: string;
  };
}

export declare namespace SettlementStrategy {
  export type DataStruct = {
    strategyType: PromiseOrValue<BigNumberish>;
    settlementDelay: PromiseOrValue<BigNumberish>;
    settlementWindowDuration: PromiseOrValue<BigNumberish>;
    priceVerificationContract: PromiseOrValue<string>;
    feedId: PromiseOrValue<BytesLike>;
    url: PromiseOrValue<string>;
    settlementReward: PromiseOrValue<BigNumberish>;
    priceDeviationTolerance: PromiseOrValue<BigNumberish>;
    minimumUsdExchangeAmount: PromiseOrValue<BigNumberish>;
    maxRoundingLoss: PromiseOrValue<BigNumberish>;
    disabled: PromiseOrValue<boolean>;
  };

  export type DataStructOutput = [
    number,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    strategyType: number;
    settlementDelay: BigNumber;
    settlementWindowDuration: BigNumber;
    priceVerificationContract: string;
    feedId: string;
    url: string;
    settlementReward: BigNumber;
    priceDeviationTolerance: BigNumber;
    minimumUsdExchangeAmount: BigNumber;
    maxRoundingLoss: BigNumber;
    disabled: boolean;
  };
}

export interface SpotMarketProxyInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'getImplementation()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceNomination()': FunctionFragment;
    'simulateUpgradeTo(address)': FunctionFragment;
    'upgradeTo(address)': FunctionFragment;
    'acceptMarketOwnership(uint128)': FunctionFragment;
    'createSynth(string,string,address)': FunctionFragment;
    'getAssociatedSystem(bytes32)': FunctionFragment;
    'getMarketOwner(uint128)': FunctionFragment;
    'getSynth(uint128)': FunctionFragment;
    'getSynthImpl(uint128)': FunctionFragment;
    'initOrUpgradeNft(bytes32,string,string,string,address)': FunctionFragment;
    'initOrUpgradeToken(bytes32,string,string,uint8,address)': FunctionFragment;
    'minimumCredit(uint128)': FunctionFragment;
    'name(uint128)': FunctionFragment;
    'nominateMarketOwner(uint128,address)': FunctionFragment;
    'registerUnmanagedSystem(bytes32,address)': FunctionFragment;
    'renounceMarketNomination(uint128)': FunctionFragment;
    'reportedDebt(uint128)': FunctionFragment;
    'setDecayRate(uint128,uint256)': FunctionFragment;
    'setSynthImplementation(address)': FunctionFragment;
    'setSynthetix(address)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'updatePriceData(uint128,bytes32,bytes32)': FunctionFragment;
    'upgradeSynthImpl(uint128)': FunctionFragment;
    'buy(uint128,uint256,uint256,address)': FunctionFragment;
    'buyExactIn(uint128,uint256,uint256,address)': FunctionFragment;
    'buyExactOut(uint128,uint256,uint256,address)': FunctionFragment;
    'quoteBuyExactIn(uint128,uint256)': FunctionFragment;
    'quoteBuyExactOut(uint128,uint256)': FunctionFragment;
    'quoteSellExactIn(uint128,uint256)': FunctionFragment;
    'quoteSellExactOut(uint128,uint256)': FunctionFragment;
    'sell(uint128,uint256,uint256,address)': FunctionFragment;
    'sellExactIn(uint128,uint256,uint256,address)': FunctionFragment;
    'sellExactOut(uint128,uint256,uint256,address)': FunctionFragment;
    'cancelOrder(uint128,uint128)': FunctionFragment;
    'commitOrder(uint128,uint8,uint256,uint256,uint256,address)': FunctionFragment;
    'getAsyncOrderClaim(uint128,uint128)': FunctionFragment;
    'PRECISION()': FunctionFragment;
    'settleOrder(uint128,uint128)': FunctionFragment;
    'settlePythOrder(bytes,bytes)': FunctionFragment;
    'addSettlementStrategy(uint128,(uint8,uint256,uint256,address,bytes32,string,uint256,uint256,uint256,uint256,bool))': FunctionFragment;
    'getSettlementStrategy(uint128,uint256)': FunctionFragment;
    'setSettlementStrategyEnabled(uint128,uint256,bool)': FunctionFragment;
    'setWrapper(uint128,address,uint256)': FunctionFragment;
    'unwrap(uint128,uint256,uint256)': FunctionFragment;
    'wrap(uint128,uint256,uint256)': FunctionFragment;
    'setAsyncFixedFee(uint128,uint256)': FunctionFragment;
    'setAtomicFixedFee(uint128,uint256)': FunctionFragment;
    'setCollateralLeverage(uint128,uint256)': FunctionFragment;
    'setCustomTransactorFees(uint128,address,uint256)': FunctionFragment;
    'setFeeCollector(uint128,address)': FunctionFragment;
    'setMarketSkewScale(uint128,uint256)': FunctionFragment;
    'setMarketUtilizationFees(uint128,uint256)': FunctionFragment;
    'setWrapperFees(uint128,int256,int256)': FunctionFragment;
    'updateReferrerShare(uint128,address,uint256)': FunctionFragment;
    'addToFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'getDeniers(bytes32)': FunctionFragment;
    'getFeatureFlagAllowAll(bytes32)': FunctionFragment;
    'getFeatureFlagAllowlist(bytes32)': FunctionFragment;
    'getFeatureFlagDenyAll(bytes32)': FunctionFragment;
    'isFeatureAllowed(bytes32,address)': FunctionFragment;
    'removeFromFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'setDeniers(bytes32,address[])': FunctionFragment;
    'setFeatureFlagAllowAll(bytes32,bool)': FunctionFragment;
    'setFeatureFlagDenyAll(bytes32,bool)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'getImplementation'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'renounceNomination'
      | 'simulateUpgradeTo'
      | 'upgradeTo'
      | 'acceptMarketOwnership'
      | 'createSynth'
      | 'getAssociatedSystem'
      | 'getMarketOwner'
      | 'getSynth'
      | 'getSynthImpl'
      | 'initOrUpgradeNft'
      | 'initOrUpgradeToken'
      | 'minimumCredit'
      | 'name'
      | 'nominateMarketOwner'
      | 'registerUnmanagedSystem'
      | 'renounceMarketNomination'
      | 'reportedDebt'
      | 'setDecayRate'
      | 'setSynthImplementation'
      | 'setSynthetix'
      | 'supportsInterface'
      | 'updatePriceData'
      | 'upgradeSynthImpl'
      | 'buy'
      | 'buyExactIn'
      | 'buyExactOut'
      | 'quoteBuyExactIn'
      | 'quoteBuyExactOut'
      | 'quoteSellExactIn'
      | 'quoteSellExactOut'
      | 'sell'
      | 'sellExactIn'
      | 'sellExactOut'
      | 'cancelOrder'
      | 'commitOrder'
      | 'getAsyncOrderClaim'
      | 'PRECISION'
      | 'settleOrder'
      | 'settlePythOrder'
      | 'addSettlementStrategy'
      | 'getSettlementStrategy'
      | 'setSettlementStrategyEnabled'
      | 'setWrapper'
      | 'unwrap'
      | 'wrap'
      | 'setAsyncFixedFee'
      | 'setAtomicFixedFee'
      | 'setCollateralLeverage'
      | 'setCustomTransactorFees'
      | 'setFeeCollector'
      | 'setMarketSkewScale'
      | 'setMarketUtilizationFees'
      | 'setWrapperFees'
      | 'updateReferrerShare'
      | 'addToFeatureFlagAllowlist'
      | 'getDeniers'
      | 'getFeatureFlagAllowAll'
      | 'getFeatureFlagAllowlist'
      | 'getFeatureFlagDenyAll'
      | 'isFeatureAllowed'
      | 'removeFromFeatureFlagAllowlist'
      | 'setDeniers'
      | 'setFeatureFlagAllowAll'
      | 'setFeatureFlagDenyAll'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getImplementation', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceNomination', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'simulateUpgradeTo',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'upgradeTo', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'acceptMarketOwnership',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'createSynth',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAssociatedSystem',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketOwner',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getSynth', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: 'getSynthImpl',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeNft',
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeToken',
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'minimumCredit',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'name', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: 'nominateMarketOwner',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerUnmanagedSystem',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'renounceMarketNomination',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'reportedDebt',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setDecayRate',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSynthImplementation',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'setSynthetix', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'updatePriceData',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'upgradeSynthImpl',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'buy',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'buyExactIn',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'buyExactOut',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteBuyExactIn',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteBuyExactOut',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSellExactIn',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSellExactOut',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'sell',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'sellExactIn',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'sellExactOut',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelOrder',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'commitOrder',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAsyncOrderClaim',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'PRECISION', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'settleOrder',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'settlePythOrder',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'addSettlementStrategy',
    values: [PromiseOrValue<BigNumberish>, SettlementStrategy.DataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: 'getSettlementStrategy',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setSettlementStrategyEnabled',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setWrapper',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'unwrap',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'wrap',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'setAsyncFixedFee',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setAtomicFixedFee',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setCollateralLeverage',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setCustomTransactorFees',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeeCollector',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMarketSkewScale',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMarketUtilizationFees',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setWrapperFees',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'updateReferrerShare',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'addToFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'getDeniers', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagAllowAll',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagDenyAll',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isFeatureAllowed',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeFromFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setDeniers',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagAllowAll',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagDenyAll',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'simulateUpgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptMarketOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createSynth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAssociatedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSynth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSynthImpl', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeNft', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minimumCredit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateMarketOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerUnmanagedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceMarketNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reportedDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDecayRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthetix', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updatePriceData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeSynthImpl', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buyExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'buyExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteBuyExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteBuyExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSellExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSellExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sell', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sellExactIn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sellExactOut', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'commitOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAsyncOrderClaim', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'PRECISION', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'settleOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'settlePythOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getSettlementStrategy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSettlementStrategyEnabled', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setWrapper', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'unwrap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'wrap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAsyncFixedFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAtomicFixedFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCollateralLeverage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCustomTransactorFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeeCollector', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMarketSkewScale', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMarketUtilizationFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setWrapperFees', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateReferrerShare', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addToFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagDenyAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isFeatureAllowed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeFromFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagDenyAll', data: BytesLike): Result;

  events: {
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'Upgraded(address,address)': EventFragment;
    'AssociatedSystemSet(bytes32,bytes32,address,address)': EventFragment;
    'MarketNominationRenounced(uint128,address)': EventFragment;
    'MarketOwnerChanged(uint128,address,address)': EventFragment;
    'MarketOwnerNominated(uint128,address)': EventFragment;
    'SynthImplementationUpgraded(uint256,address,address)': EventFragment;
    'SynthPriceDataUpdated(uint256,bytes32,bytes32)': EventFragment;
    'SynthRegistered(uint256)': EventFragment;
    'SynthBought(uint256,uint256,tuple,uint256,address)': EventFragment;
    'SynthSold(uint256,uint256,tuple,uint256,address)': EventFragment;
    'OrderCancelled(uint128,uint128,tuple,address)': EventFragment;
    'OrderCommitted(uint128,uint8,uint256,uint128,address,address)': EventFragment;
    'OrderSettled(uint128,uint128,uint256,tuple,uint256,address)': EventFragment;
    'SettlementStrategyAdded(uint128,uint256)': EventFragment;
    'SettlementStrategyUpdated(uint128,uint256,bool)': EventFragment;
    'SynthUnwrapped(uint256,uint256,tuple,uint256)': EventFragment;
    'SynthWrapped(uint256,uint256,tuple,uint256)': EventFragment;
    'WrapperSet(uint256,address,uint256)': EventFragment;
    'AsyncFixedFeeSet(uint256,uint256)': EventFragment;
    'AtomicFixedFeeSet(uint256,uint256)': EventFragment;
    'CollateralLeverageSet(uint256,uint256)': EventFragment;
    'FeeCollectorSet(uint256,address)': EventFragment;
    'MarketSkewScaleSet(uint256,uint256)': EventFragment;
    'MarketUtilizationFeesSet(uint256,uint256)': EventFragment;
    'ReferrerShareUpdated(uint128,address,uint256)': EventFragment;
    'TransactorFixedFeeSet(uint256,address,uint256)': EventFragment;
    'WrapperFeesSet(uint256,int256,int256)': EventFragment;
    'FeatureFlagAllowAllSet(bytes32,bool)': EventFragment;
    'FeatureFlagAllowlistAdded(bytes32,address)': EventFragment;
    'FeatureFlagAllowlistRemoved(bytes32,address)': EventFragment;
    'FeatureFlagDeniersReset(bytes32,address[])': EventFragment;
    'FeatureFlagDenyAllSet(bytes32,bool)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AssociatedSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketNominationRenounced'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketOwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketOwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthImplementationUpgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthPriceDataUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthBought'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthSold'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCancelled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderCommitted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OrderSettled'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategyAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SettlementStrategyUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthUnwrapped'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthWrapped'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WrapperSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AsyncFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AtomicFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLeverageSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeeCollectorSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketSkewScaleSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUtilizationFeesSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ReferrerShareUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TransactorFixedFeeSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WrapperFeesSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDeniersReset'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDenyAllSet'): EventFragment;
}

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string, string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[string], OwnerNominatedEventObject>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface UpgradedEventObject {
  self: string;
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string, string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface AssociatedSystemSetEventObject {
  kind: string;
  id: string;
  proxy: string;
  impl: string;
}
export type AssociatedSystemSetEvent = TypedEvent<
  [string, string, string, string],
  AssociatedSystemSetEventObject
>;

export type AssociatedSystemSetEventFilter = TypedEventFilter<AssociatedSystemSetEvent>;

export interface MarketNominationRenouncedEventObject {
  marketId: BigNumber;
  nominee: string;
}
export type MarketNominationRenouncedEvent = TypedEvent<
  [BigNumber, string],
  MarketNominationRenouncedEventObject
>;

export type MarketNominationRenouncedEventFilter = TypedEventFilter<MarketNominationRenouncedEvent>;

export interface MarketOwnerChangedEventObject {
  marketId: BigNumber;
  oldOwner: string;
  newOwner: string;
}
export type MarketOwnerChangedEvent = TypedEvent<
  [BigNumber, string, string],
  MarketOwnerChangedEventObject
>;

export type MarketOwnerChangedEventFilter = TypedEventFilter<MarketOwnerChangedEvent>;

export interface MarketOwnerNominatedEventObject {
  marketId: BigNumber;
  newOwner: string;
}
export type MarketOwnerNominatedEvent = TypedEvent<
  [BigNumber, string],
  MarketOwnerNominatedEventObject
>;

export type MarketOwnerNominatedEventFilter = TypedEventFilter<MarketOwnerNominatedEvent>;

export interface SynthImplementationUpgradedEventObject {
  synthMarketId: BigNumber;
  proxy: string;
  implementation: string;
}
export type SynthImplementationUpgradedEvent = TypedEvent<
  [BigNumber, string, string],
  SynthImplementationUpgradedEventObject
>;

export type SynthImplementationUpgradedEventFilter =
  TypedEventFilter<SynthImplementationUpgradedEvent>;

export interface SynthPriceDataUpdatedEventObject {
  synthMarketId: BigNumber;
  buyFeedId: string;
  sellFeedId: string;
}
export type SynthPriceDataUpdatedEvent = TypedEvent<
  [BigNumber, string, string],
  SynthPriceDataUpdatedEventObject
>;

export type SynthPriceDataUpdatedEventFilter = TypedEventFilter<SynthPriceDataUpdatedEvent>;

export interface SynthRegisteredEventObject {
  synthMarketId: BigNumber;
}
export type SynthRegisteredEvent = TypedEvent<[BigNumber], SynthRegisteredEventObject>;

export type SynthRegisteredEventFilter = TypedEventFilter<SynthRegisteredEvent>;

export interface SynthBoughtEventObject {
  synthMarketId: BigNumber;
  synthReturned: BigNumber;
  fees: OrderFees.DataStructOutput;
  collectedFees: BigNumber;
  referrer: string;
}
export type SynthBoughtEvent = TypedEvent<
  [BigNumber, BigNumber, OrderFees.DataStructOutput, BigNumber, string],
  SynthBoughtEventObject
>;

export type SynthBoughtEventFilter = TypedEventFilter<SynthBoughtEvent>;

export interface SynthSoldEventObject {
  synthMarketId: BigNumber;
  amountReturned: BigNumber;
  fees: OrderFees.DataStructOutput;
  collectedFees: BigNumber;
  referrer: string;
}
export type SynthSoldEvent = TypedEvent<
  [BigNumber, BigNumber, OrderFees.DataStructOutput, BigNumber, string],
  SynthSoldEventObject
>;

export type SynthSoldEventFilter = TypedEventFilter<SynthSoldEvent>;

export interface OrderCancelledEventObject {
  marketId: BigNumber;
  asyncOrderId: BigNumber;
  asyncOrderClaim: AsyncOrderClaim.DataStructOutput;
  sender: string;
}
export type OrderCancelledEvent = TypedEvent<
  [BigNumber, BigNumber, AsyncOrderClaim.DataStructOutput, string],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

export interface OrderCommittedEventObject {
  marketId: BigNumber;
  orderType: number;
  amountProvided: BigNumber;
  asyncOrderId: BigNumber;
  sender: string;
  referrer: string;
}
export type OrderCommittedEvent = TypedEvent<
  [BigNumber, number, BigNumber, BigNumber, string, string],
  OrderCommittedEventObject
>;

export type OrderCommittedEventFilter = TypedEventFilter<OrderCommittedEvent>;

export interface OrderSettledEventObject {
  marketId: BigNumber;
  asyncOrderId: BigNumber;
  finalOrderAmount: BigNumber;
  fees: OrderFees.DataStructOutput;
  collectedFees: BigNumber;
  settler: string;
}
export type OrderSettledEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, OrderFees.DataStructOutput, BigNumber, string],
  OrderSettledEventObject
>;

export type OrderSettledEventFilter = TypedEventFilter<OrderSettledEvent>;

export interface SettlementStrategyAddedEventObject {
  synthMarketId: BigNumber;
  strategyId: BigNumber;
}
export type SettlementStrategyAddedEvent = TypedEvent<
  [BigNumber, BigNumber],
  SettlementStrategyAddedEventObject
>;

export type SettlementStrategyAddedEventFilter = TypedEventFilter<SettlementStrategyAddedEvent>;

export interface SettlementStrategyUpdatedEventObject {
  synthMarketId: BigNumber;
  strategyId: BigNumber;
  enabled: boolean;
}
export type SettlementStrategyUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, boolean],
  SettlementStrategyUpdatedEventObject
>;

export type SettlementStrategyUpdatedEventFilter = TypedEventFilter<SettlementStrategyUpdatedEvent>;

export interface SynthUnwrappedEventObject {
  synthMarketId: BigNumber;
  amountUnwrapped: BigNumber;
  fees: OrderFees.DataStructOutput;
  feesCollected: BigNumber;
}
export type SynthUnwrappedEvent = TypedEvent<
  [BigNumber, BigNumber, OrderFees.DataStructOutput, BigNumber],
  SynthUnwrappedEventObject
>;

export type SynthUnwrappedEventFilter = TypedEventFilter<SynthUnwrappedEvent>;

export interface SynthWrappedEventObject {
  synthMarketId: BigNumber;
  amountWrapped: BigNumber;
  fees: OrderFees.DataStructOutput;
  feesCollected: BigNumber;
}
export type SynthWrappedEvent = TypedEvent<
  [BigNumber, BigNumber, OrderFees.DataStructOutput, BigNumber],
  SynthWrappedEventObject
>;

export type SynthWrappedEventFilter = TypedEventFilter<SynthWrappedEvent>;

export interface WrapperSetEventObject {
  synthMarketId: BigNumber;
  wrapCollateralType: string;
  maxWrappableAmount: BigNumber;
}
export type WrapperSetEvent = TypedEvent<[BigNumber, string, BigNumber], WrapperSetEventObject>;

export type WrapperSetEventFilter = TypedEventFilter<WrapperSetEvent>;

export interface AsyncFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  asyncFixedFee: BigNumber;
}
export type AsyncFixedFeeSetEvent = TypedEvent<[BigNumber, BigNumber], AsyncFixedFeeSetEventObject>;

export type AsyncFixedFeeSetEventFilter = TypedEventFilter<AsyncFixedFeeSetEvent>;

export interface AtomicFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  atomicFixedFee: BigNumber;
}
export type AtomicFixedFeeSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  AtomicFixedFeeSetEventObject
>;

export type AtomicFixedFeeSetEventFilter = TypedEventFilter<AtomicFixedFeeSetEvent>;

export interface CollateralLeverageSetEventObject {
  synthMarketId: BigNumber;
  collateralLeverage: BigNumber;
}
export type CollateralLeverageSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  CollateralLeverageSetEventObject
>;

export type CollateralLeverageSetEventFilter = TypedEventFilter<CollateralLeverageSetEvent>;

export interface FeeCollectorSetEventObject {
  synthMarketId: BigNumber;
  feeCollector: string;
}
export type FeeCollectorSetEvent = TypedEvent<[BigNumber, string], FeeCollectorSetEventObject>;

export type FeeCollectorSetEventFilter = TypedEventFilter<FeeCollectorSetEvent>;

export interface MarketSkewScaleSetEventObject {
  synthMarketId: BigNumber;
  skewScale: BigNumber;
}
export type MarketSkewScaleSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MarketSkewScaleSetEventObject
>;

export type MarketSkewScaleSetEventFilter = TypedEventFilter<MarketSkewScaleSetEvent>;

export interface MarketUtilizationFeesSetEventObject {
  synthMarketId: BigNumber;
  utilizationFeeRate: BigNumber;
}
export type MarketUtilizationFeesSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MarketUtilizationFeesSetEventObject
>;

export type MarketUtilizationFeesSetEventFilter = TypedEventFilter<MarketUtilizationFeesSetEvent>;

export interface ReferrerShareUpdatedEventObject {
  marketId: BigNumber;
  referrer: string;
  sharePercentage: BigNumber;
}
export type ReferrerShareUpdatedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  ReferrerShareUpdatedEventObject
>;

export type ReferrerShareUpdatedEventFilter = TypedEventFilter<ReferrerShareUpdatedEvent>;

export interface TransactorFixedFeeSetEventObject {
  synthMarketId: BigNumber;
  transactor: string;
  fixedFeeAmount: BigNumber;
}
export type TransactorFixedFeeSetEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactorFixedFeeSetEventObject
>;

export type TransactorFixedFeeSetEventFilter = TypedEventFilter<TransactorFixedFeeSetEvent>;

export interface WrapperFeesSetEventObject {
  synthMarketId: BigNumber;
  wrapFee: BigNumber;
  unwrapFee: BigNumber;
}
export type WrapperFeesSetEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  WrapperFeesSetEventObject
>;

export type WrapperFeesSetEventFilter = TypedEventFilter<WrapperFeesSetEvent>;

export interface FeatureFlagAllowAllSetEventObject {
  feature: string;
  allowAll: boolean;
}
export type FeatureFlagAllowAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagAllowAllSetEventObject
>;

export type FeatureFlagAllowAllSetEventFilter = TypedEventFilter<FeatureFlagAllowAllSetEvent>;

export interface FeatureFlagAllowlistAddedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistAddedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistAddedEventObject
>;

export type FeatureFlagAllowlistAddedEventFilter = TypedEventFilter<FeatureFlagAllowlistAddedEvent>;

export interface FeatureFlagAllowlistRemovedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistRemovedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistRemovedEventObject
>;

export type FeatureFlagAllowlistRemovedEventFilter =
  TypedEventFilter<FeatureFlagAllowlistRemovedEvent>;

export interface FeatureFlagDeniersResetEventObject {
  feature: string;
  deniers: string[];
}
export type FeatureFlagDeniersResetEvent = TypedEvent<
  [string, string[]],
  FeatureFlagDeniersResetEventObject
>;

export type FeatureFlagDeniersResetEventFilter = TypedEventFilter<FeatureFlagDeniersResetEvent>;

export interface FeatureFlagDenyAllSetEventObject {
  feature: string;
  denyAll: boolean;
}
export type FeatureFlagDenyAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagDenyAllSetEventObject
>;

export type FeatureFlagDenyAllSetEventFilter = TypedEventFilter<FeatureFlagDenyAllSetEvent>;

export interface SpotMarketProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SpotMarketProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<[string]>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptMarketOwnership(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createSynth(
      tokenName: PromiseOrValue<string>,
      tokenSymbol: PromiseOrValue<string>,
      synthOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    getMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { marketOwner: string }>;

    getSynth(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { synthAddress: string }>;

    getSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { implAddress: string }>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    minimumCredit(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { lockedAmount: BigNumber }>;

    name(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { marketName: string }>;

    nominateMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceMarketNomination(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    reportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { reportedDebtAmount: BigNumber }>;

    setDecayRate(
      marketId: PromiseOrValue<BigNumberish>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSynthImplementation(
      synthImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSynthetix(
      synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { isSupported: boolean }>;

    updatePriceData(
      synthMarketId: PromiseOrValue<BigNumberish>,
      buyFeedId: PromiseOrValue<BytesLike>,
      sellFeedId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buy(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      maxUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    quoteBuyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteBuyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        usdAmountCharged: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteSellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        returnAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteSellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthToBurn: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    sell(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      maxSynthAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    commitOrder(
      marketId: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      amountProvided: PromiseOrValue<BigNumberish>,
      settlementStrategyId: PromiseOrValue<BigNumberish>,
      minimumSettlementAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAsyncOrderClaim(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [AsyncOrderClaim.DataStructOutput] & { asyncOrderClaim: AsyncOrderClaim.DataStructOutput }
    >;

    PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    settleOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    settlePythOrder(
      result: PromiseOrValue<BytesLike>,
      extraData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategy: SettlementStrategy.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [SettlementStrategy.DataStructOutput] & {
        settlementStrategy: SettlementStrategy.DataStructOutput;
      }
    >;

    setSettlementStrategyEnabled(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setWrapper(
      marketId: PromiseOrValue<BigNumberish>,
      wrapCollateralType: PromiseOrValue<string>,
      maxWrappableAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unwrap(
      marketId: PromiseOrValue<BigNumberish>,
      unwrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wrap(
      marketId: PromiseOrValue<BigNumberish>,
      wrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAsyncFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      asyncFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAtomicFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      atomicFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCollateralLeverage(
      synthMarketId: PromiseOrValue<BigNumberish>,
      collateralLeverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCustomTransactorFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      transactor: PromiseOrValue<string>,
      fixedFeeAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeeCollector(
      synthMarketId: PromiseOrValue<BigNumberish>,
      feeCollector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMarketSkewScale(
      synthMarketId: PromiseOrValue<BigNumberish>,
      skewScale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMarketUtilizationFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      utilizationFeeRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setWrapperFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      wrapFee: PromiseOrValue<BigNumberish>,
      unwrapFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateReferrerShare(
      synthMarketId: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      sharePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getImplementation(overrides?: CallOverrides): Promise<string>;

  nominateNewOwner(
    newNominatedOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceNomination(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  simulateUpgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptMarketOwnership(
    synthMarketId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createSynth(
    tokenName: PromiseOrValue<string>,
    tokenSymbol: PromiseOrValue<string>,
    synthOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAssociatedSystem(
    id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string] & { addr: string; kind: string }>;

  getMarketOwner(
    synthMarketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSynth(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  getSynthImpl(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  initOrUpgradeNft(
    id: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    uri: PromiseOrValue<string>,
    impl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initOrUpgradeToken(
    id: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    decimals: PromiseOrValue<BigNumberish>,
    impl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  minimumCredit(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  name(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  nominateMarketOwner(
    synthMarketId: PromiseOrValue<BigNumberish>,
    newNominatedOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerUnmanagedSystem(
    id: PromiseOrValue<BytesLike>,
    endpoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceMarketNomination(
    synthMarketId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  reportedDebt(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setDecayRate(
    marketId: PromiseOrValue<BigNumberish>,
    rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSynthImplementation(
    synthImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSynthetix(
    synthetix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updatePriceData(
    synthMarketId: PromiseOrValue<BigNumberish>,
    buyFeedId: PromiseOrValue<BytesLike>,
    sellFeedId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeSynthImpl(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buy(
    marketId: PromiseOrValue<BigNumberish>,
    usdAmount: PromiseOrValue<BigNumberish>,
    minAmountReceived: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buyExactIn(
    marketId: PromiseOrValue<BigNumberish>,
    usdAmount: PromiseOrValue<BigNumberish>,
    minAmountReceived: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buyExactOut(
    marketId: PromiseOrValue<BigNumberish>,
    synthAmount: PromiseOrValue<BigNumberish>,
    maxUsdAmount: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  quoteBuyExactIn(
    marketId: PromiseOrValue<BigNumberish>,
    usdAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, OrderFees.DataStructOutput] & {
      synthAmount: BigNumber;
      fees: OrderFees.DataStructOutput;
    }
  >;

  quoteBuyExactOut(
    marketId: PromiseOrValue<BigNumberish>,
    synthAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, OrderFees.DataStructOutput] & {
      usdAmountCharged: BigNumber;
      fees: OrderFees.DataStructOutput;
    }
  >;

  quoteSellExactIn(
    marketId: PromiseOrValue<BigNumberish>,
    synthAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, OrderFees.DataStructOutput] & {
      returnAmount: BigNumber;
      fees: OrderFees.DataStructOutput;
    }
  >;

  quoteSellExactOut(
    marketId: PromiseOrValue<BigNumberish>,
    usdAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, OrderFees.DataStructOutput] & {
      synthToBurn: BigNumber;
      fees: OrderFees.DataStructOutput;
    }
  >;

  sell(
    marketId: PromiseOrValue<BigNumberish>,
    synthAmount: PromiseOrValue<BigNumberish>,
    minUsdAmount: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sellExactIn(
    marketId: PromiseOrValue<BigNumberish>,
    synthAmount: PromiseOrValue<BigNumberish>,
    minAmountReceived: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sellExactOut(
    marketId: PromiseOrValue<BigNumberish>,
    usdAmount: PromiseOrValue<BigNumberish>,
    maxSynthAmount: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelOrder(
    marketId: PromiseOrValue<BigNumberish>,
    asyncOrderId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  commitOrder(
    marketId: PromiseOrValue<BigNumberish>,
    orderType: PromiseOrValue<BigNumberish>,
    amountProvided: PromiseOrValue<BigNumberish>,
    settlementStrategyId: PromiseOrValue<BigNumberish>,
    minimumSettlementAmount: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAsyncOrderClaim(
    marketId: PromiseOrValue<BigNumberish>,
    asyncOrderId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AsyncOrderClaim.DataStructOutput>;

  PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  settleOrder(
    marketId: PromiseOrValue<BigNumberish>,
    asyncOrderId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  settlePythOrder(
    result: PromiseOrValue<BytesLike>,
    extraData: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addSettlementStrategy(
    marketId: PromiseOrValue<BigNumberish>,
    strategy: SettlementStrategy.DataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getSettlementStrategy(
    marketId: PromiseOrValue<BigNumberish>,
    strategyId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<SettlementStrategy.DataStructOutput>;

  setSettlementStrategyEnabled(
    marketId: PromiseOrValue<BigNumberish>,
    strategyId: PromiseOrValue<BigNumberish>,
    enabled: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setWrapper(
    marketId: PromiseOrValue<BigNumberish>,
    wrapCollateralType: PromiseOrValue<string>,
    maxWrappableAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unwrap(
    marketId: PromiseOrValue<BigNumberish>,
    unwrapAmount: PromiseOrValue<BigNumberish>,
    minAmountReceived: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wrap(
    marketId: PromiseOrValue<BigNumberish>,
    wrapAmount: PromiseOrValue<BigNumberish>,
    minAmountReceived: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAsyncFixedFee(
    synthMarketId: PromiseOrValue<BigNumberish>,
    asyncFixedFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAtomicFixedFee(
    synthMarketId: PromiseOrValue<BigNumberish>,
    atomicFixedFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCollateralLeverage(
    synthMarketId: PromiseOrValue<BigNumberish>,
    collateralLeverage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCustomTransactorFees(
    synthMarketId: PromiseOrValue<BigNumberish>,
    transactor: PromiseOrValue<string>,
    fixedFeeAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeeCollector(
    synthMarketId: PromiseOrValue<BigNumberish>,
    feeCollector: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMarketSkewScale(
    synthMarketId: PromiseOrValue<BigNumberish>,
    skewScale: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMarketUtilizationFees(
    synthMarketId: PromiseOrValue<BigNumberish>,
    utilizationFeeRate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setWrapperFees(
    synthMarketId: PromiseOrValue<BigNumberish>,
    wrapFee: PromiseOrValue<BigNumberish>,
    unwrapFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateReferrerShare(
    synthMarketId: PromiseOrValue<BigNumberish>,
    referrer: PromiseOrValue<string>,
    sharePercentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addToFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

  getFeatureFlagAllowAll(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getFeatureFlagDenyAll(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isFeatureAllowed(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeFromFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDeniers(
    feature: PromiseOrValue<BytesLike>,
    deniers: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeatureFlagAllowAll(
    feature: PromiseOrValue<BytesLike>,
    allowAll: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeatureFlagDenyAll(
    feature: PromiseOrValue<BytesLike>,
    denyAll: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getImplementation(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceNomination(overrides?: CallOverrides): Promise<void>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    acceptMarketOwnership(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createSynth(
      tokenName: PromiseOrValue<string>,
      tokenSymbol: PromiseOrValue<string>,
      synthOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    getMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSynth(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    getSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    minimumCredit(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    nominateMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceMarketNomination(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    reportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setDecayRate(
      marketId: PromiseOrValue<BigNumberish>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSynthImplementation(
      synthImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSynthetix(synthetix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updatePriceData(
      synthMarketId: PromiseOrValue<BigNumberish>,
      buyFeedId: PromiseOrValue<BytesLike>,
      sellFeedId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    buy(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    buyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    buyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      maxUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        usdAmountCharged: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteBuyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteBuyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        usdAmountCharged: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteSellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        returnAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    quoteSellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthToBurn: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    sell(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        usdAmountReceived: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    sellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        returnAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    sellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      maxSynthAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        synthToBurn: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    cancelOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    commitOrder(
      marketId: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      amountProvided: PromiseOrValue<BigNumberish>,
      settlementStrategyId: PromiseOrValue<BigNumberish>,
      minimumSettlementAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<AsyncOrderClaim.DataStructOutput>;

    getAsyncOrderClaim(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AsyncOrderClaim.DataStructOutput>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    settleOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        finalOrderAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    settlePythOrder(
      result: PromiseOrValue<BytesLike>,
      extraData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        finalOrderAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    addSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategy: SettlementStrategy.DataStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<SettlementStrategy.DataStructOutput>;

    setSettlementStrategyEnabled(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setWrapper(
      marketId: PromiseOrValue<BigNumberish>,
      wrapCollateralType: PromiseOrValue<string>,
      maxWrappableAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    unwrap(
      marketId: PromiseOrValue<BigNumberish>,
      unwrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        returnCollateralAmount: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    wrap(
      marketId: PromiseOrValue<BigNumberish>,
      wrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, OrderFees.DataStructOutput] & {
        amountToMint: BigNumber;
        fees: OrderFees.DataStructOutput;
      }
    >;

    setAsyncFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      asyncFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setAtomicFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      atomicFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setCollateralLeverage(
      synthMarketId: PromiseOrValue<BigNumberish>,
      collateralLeverage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setCustomTransactorFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      transactor: PromiseOrValue<string>,
      fixedFeeAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeCollector(
      synthMarketId: PromiseOrValue<BigNumberish>,
      feeCollector: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMarketSkewScale(
      synthMarketId: PromiseOrValue<BigNumberish>,
      skewScale: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMarketUtilizationFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      utilizationFeeRate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setWrapperFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      wrapFee: PromiseOrValue<BigNumberish>,
      unwrapFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateReferrerShare(
      synthMarketId: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      sharePercentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'Upgraded(address,address)'(
      self?: PromiseOrValue<string> | null,
      implementation?: null
    ): UpgradedEventFilter;
    Upgraded(self?: PromiseOrValue<string> | null, implementation?: null): UpgradedEventFilter;

    'AssociatedSystemSet(bytes32,bytes32,address,address)'(
      kind?: PromiseOrValue<BytesLike> | null,
      id?: PromiseOrValue<BytesLike> | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;
    AssociatedSystemSet(
      kind?: PromiseOrValue<BytesLike> | null,
      id?: PromiseOrValue<BytesLike> | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;

    'MarketNominationRenounced(uint128,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      nominee?: null
    ): MarketNominationRenouncedEventFilter;
    MarketNominationRenounced(
      marketId?: PromiseOrValue<BigNumberish> | null,
      nominee?: null
    ): MarketNominationRenouncedEventFilter;

    'MarketOwnerChanged(uint128,address,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      oldOwner?: null,
      newOwner?: null
    ): MarketOwnerChangedEventFilter;
    MarketOwnerChanged(
      marketId?: PromiseOrValue<BigNumberish> | null,
      oldOwner?: null,
      newOwner?: null
    ): MarketOwnerChangedEventFilter;

    'MarketOwnerNominated(uint128,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      newOwner?: null
    ): MarketOwnerNominatedEventFilter;
    MarketOwnerNominated(
      marketId?: PromiseOrValue<BigNumberish> | null,
      newOwner?: null
    ): MarketOwnerNominatedEventFilter;

    'SynthImplementationUpgraded(uint256,address,address)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      proxy?: PromiseOrValue<string> | null,
      implementation?: null
    ): SynthImplementationUpgradedEventFilter;
    SynthImplementationUpgraded(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      proxy?: PromiseOrValue<string> | null,
      implementation?: null
    ): SynthImplementationUpgradedEventFilter;

    'SynthPriceDataUpdated(uint256,bytes32,bytes32)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      buyFeedId?: PromiseOrValue<BytesLike> | null,
      sellFeedId?: PromiseOrValue<BytesLike> | null
    ): SynthPriceDataUpdatedEventFilter;
    SynthPriceDataUpdated(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      buyFeedId?: PromiseOrValue<BytesLike> | null,
      sellFeedId?: PromiseOrValue<BytesLike> | null
    ): SynthPriceDataUpdatedEventFilter;

    'SynthRegistered(uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null
    ): SynthRegisteredEventFilter;
    SynthRegistered(
      synthMarketId?: PromiseOrValue<BigNumberish> | null
    ): SynthRegisteredEventFilter;

    'SynthBought(uint256,uint256,tuple,uint256,address)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      synthReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null
    ): SynthBoughtEventFilter;
    SynthBought(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      synthReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null
    ): SynthBoughtEventFilter;

    'SynthSold(uint256,uint256,tuple,uint256,address)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null
    ): SynthSoldEventFilter;
    SynthSold(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountReturned?: null,
      fees?: null,
      collectedFees?: null,
      referrer?: null
    ): SynthSoldEventFilter;

    'OrderCancelled(uint128,uint128,tuple,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderClaim?: null,
      sender?: PromiseOrValue<string> | null
    ): OrderCancelledEventFilter;
    OrderCancelled(
      marketId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderClaim?: null,
      sender?: PromiseOrValue<string> | null
    ): OrderCancelledEventFilter;

    'OrderCommitted(uint128,uint8,uint256,uint128,address,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      orderType?: PromiseOrValue<BigNumberish> | null,
      amountProvided?: null,
      asyncOrderId?: null,
      sender?: PromiseOrValue<string> | null,
      referrer?: null
    ): OrderCommittedEventFilter;
    OrderCommitted(
      marketId?: PromiseOrValue<BigNumberish> | null,
      orderType?: PromiseOrValue<BigNumberish> | null,
      amountProvided?: null,
      asyncOrderId?: null,
      sender?: PromiseOrValue<string> | null,
      referrer?: null
    ): OrderCommittedEventFilter;

    'OrderSettled(uint128,uint128,uint256,tuple,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderId?: PromiseOrValue<BigNumberish> | null,
      finalOrderAmount?: null,
      fees?: null,
      collectedFees?: null,
      settler?: PromiseOrValue<string> | null
    ): OrderSettledEventFilter;
    OrderSettled(
      marketId?: PromiseOrValue<BigNumberish> | null,
      asyncOrderId?: PromiseOrValue<BigNumberish> | null,
      finalOrderAmount?: null,
      fees?: null,
      collectedFees?: null,
      settler?: PromiseOrValue<string> | null
    ): OrderSettledEventFilter;

    'SettlementStrategyAdded(uint128,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      strategyId?: PromiseOrValue<BigNumberish> | null
    ): SettlementStrategyAddedEventFilter;
    SettlementStrategyAdded(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      strategyId?: PromiseOrValue<BigNumberish> | null
    ): SettlementStrategyAddedEventFilter;

    'SettlementStrategyUpdated(uint128,uint256,bool)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      strategyId?: PromiseOrValue<BigNumberish> | null,
      enabled?: null
    ): SettlementStrategyUpdatedEventFilter;
    SettlementStrategyUpdated(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      strategyId?: PromiseOrValue<BigNumberish> | null,
      enabled?: null
    ): SettlementStrategyUpdatedEventFilter;

    'SynthUnwrapped(uint256,uint256,tuple,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountUnwrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthUnwrappedEventFilter;
    SynthUnwrapped(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountUnwrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthUnwrappedEventFilter;

    'SynthWrapped(uint256,uint256,tuple,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountWrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthWrappedEventFilter;
    SynthWrapped(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      amountWrapped?: null,
      fees?: null,
      feesCollected?: null
    ): SynthWrappedEventFilter;

    'WrapperSet(uint256,address,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      wrapCollateralType?: PromiseOrValue<string> | null,
      maxWrappableAmount?: null
    ): WrapperSetEventFilter;
    WrapperSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      wrapCollateralType?: PromiseOrValue<string> | null,
      maxWrappableAmount?: null
    ): WrapperSetEventFilter;

    'AsyncFixedFeeSet(uint256,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      asyncFixedFee?: null
    ): AsyncFixedFeeSetEventFilter;
    AsyncFixedFeeSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      asyncFixedFee?: null
    ): AsyncFixedFeeSetEventFilter;

    'AtomicFixedFeeSet(uint256,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      atomicFixedFee?: null
    ): AtomicFixedFeeSetEventFilter;
    AtomicFixedFeeSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      atomicFixedFee?: null
    ): AtomicFixedFeeSetEventFilter;

    'CollateralLeverageSet(uint256,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      collateralLeverage?: null
    ): CollateralLeverageSetEventFilter;
    CollateralLeverageSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      collateralLeverage?: null
    ): CollateralLeverageSetEventFilter;

    'FeeCollectorSet(uint256,address)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      feeCollector?: null
    ): FeeCollectorSetEventFilter;
    FeeCollectorSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      feeCollector?: null
    ): FeeCollectorSetEventFilter;

    'MarketSkewScaleSet(uint256,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      skewScale?: null
    ): MarketSkewScaleSetEventFilter;
    MarketSkewScaleSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      skewScale?: null
    ): MarketSkewScaleSetEventFilter;

    'MarketUtilizationFeesSet(uint256,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      utilizationFeeRate?: null
    ): MarketUtilizationFeesSetEventFilter;
    MarketUtilizationFeesSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      utilizationFeeRate?: null
    ): MarketUtilizationFeesSetEventFilter;

    'ReferrerShareUpdated(uint128,address,uint256)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      referrer?: null,
      sharePercentage?: null
    ): ReferrerShareUpdatedEventFilter;
    ReferrerShareUpdated(
      marketId?: PromiseOrValue<BigNumberish> | null,
      referrer?: null,
      sharePercentage?: null
    ): ReferrerShareUpdatedEventFilter;

    'TransactorFixedFeeSet(uint256,address,uint256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      transactor?: null,
      fixedFeeAmount?: null
    ): TransactorFixedFeeSetEventFilter;
    TransactorFixedFeeSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      transactor?: null,
      fixedFeeAmount?: null
    ): TransactorFixedFeeSetEventFilter;

    'WrapperFeesSet(uint256,int256,int256)'(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      wrapFee?: null,
      unwrapFee?: null
    ): WrapperFeesSetEventFilter;
    WrapperFeesSet(
      synthMarketId?: PromiseOrValue<BigNumberish> | null,
      wrapFee?: null,
      unwrapFee?: null
    ): WrapperFeesSetEventFilter;

    'FeatureFlagAllowAllSet(bytes32,bool)'(
      feature?: PromiseOrValue<BytesLike> | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;
    FeatureFlagAllowAllSet(
      feature?: PromiseOrValue<BytesLike> | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;

    'FeatureFlagAllowlistAdded(bytes32,address)'(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;
    FeatureFlagAllowlistAdded(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;

    'FeatureFlagAllowlistRemoved(bytes32,address)'(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;
    FeatureFlagAllowlistRemoved(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;

    'FeatureFlagDeniersReset(bytes32,address[])'(
      feature?: PromiseOrValue<BytesLike> | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;
    FeatureFlagDeniersReset(
      feature?: PromiseOrValue<BytesLike> | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;

    'FeatureFlagDenyAllSet(bytes32,bool)'(
      feature?: PromiseOrValue<BytesLike> | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;
    FeatureFlagDenyAllSet(
      feature?: PromiseOrValue<BytesLike> | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    getImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptMarketOwnership(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createSynth(
      tokenName: PromiseOrValue<string>,
      tokenSymbol: PromiseOrValue<string>,
      synthOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSynth(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    getSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    minimumCredit(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(marketId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    nominateMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceMarketNomination(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    reportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setDecayRate(
      marketId: PromiseOrValue<BigNumberish>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSynthImplementation(
      synthImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSynthetix(
      synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatePriceData(
      synthMarketId: PromiseOrValue<BigNumberish>,
      buyFeedId: PromiseOrValue<BytesLike>,
      sellFeedId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buy(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      maxUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    quoteBuyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteBuyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quoteSellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sell(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      maxSynthAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    commitOrder(
      marketId: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      amountProvided: PromiseOrValue<BigNumberish>,
      settlementStrategyId: PromiseOrValue<BigNumberish>,
      minimumSettlementAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAsyncOrderClaim(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    settleOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    settlePythOrder(
      result: PromiseOrValue<BytesLike>,
      extraData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategy: SettlementStrategy.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSettlementStrategyEnabled(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setWrapper(
      marketId: PromiseOrValue<BigNumberish>,
      wrapCollateralType: PromiseOrValue<string>,
      maxWrappableAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unwrap(
      marketId: PromiseOrValue<BigNumberish>,
      unwrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wrap(
      marketId: PromiseOrValue<BigNumberish>,
      wrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAsyncFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      asyncFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAtomicFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      atomicFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCollateralLeverage(
      synthMarketId: PromiseOrValue<BigNumberish>,
      collateralLeverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCustomTransactorFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      transactor: PromiseOrValue<string>,
      fixedFeeAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeeCollector(
      synthMarketId: PromiseOrValue<BigNumberish>,
      feeCollector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMarketSkewScale(
      synthMarketId: PromiseOrValue<BigNumberish>,
      skewScale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMarketUtilizationFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      utilizationFeeRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setWrapperFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      wrapFee: PromiseOrValue<BigNumberish>,
      unwrapFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateReferrerShare(
      synthMarketId: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      sharePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptMarketOwnership(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createSynth(
      tokenName: PromiseOrValue<string>,
      tokenSymbol: PromiseOrValue<string>,
      synthOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSynth(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    minimumCredit(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateMarketOwner(
      synthMarketId: PromiseOrValue<BigNumberish>,
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceMarketNomination(
      synthMarketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    reportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setDecayRate(
      marketId: PromiseOrValue<BigNumberish>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSynthImplementation(
      synthImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSynthetix(
      synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updatePriceData(
      synthMarketId: PromiseOrValue<BigNumberish>,
      buyFeedId: PromiseOrValue<BytesLike>,
      sellFeedId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeSynthImpl(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buy(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      maxUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    quoteBuyExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteBuyExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quoteSellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sell(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minUsdAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sellExactIn(
      marketId: PromiseOrValue<BigNumberish>,
      synthAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sellExactOut(
      marketId: PromiseOrValue<BigNumberish>,
      usdAmount: PromiseOrValue<BigNumberish>,
      maxSynthAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    commitOrder(
      marketId: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      amountProvided: PromiseOrValue<BigNumberish>,
      settlementStrategyId: PromiseOrValue<BigNumberish>,
      minimumSettlementAmount: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAsyncOrderClaim(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    settleOrder(
      marketId: PromiseOrValue<BigNumberish>,
      asyncOrderId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    settlePythOrder(
      result: PromiseOrValue<BytesLike>,
      extraData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategy: SettlementStrategy.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getSettlementStrategy(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSettlementStrategyEnabled(
      marketId: PromiseOrValue<BigNumberish>,
      strategyId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setWrapper(
      marketId: PromiseOrValue<BigNumberish>,
      wrapCollateralType: PromiseOrValue<string>,
      maxWrappableAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unwrap(
      marketId: PromiseOrValue<BigNumberish>,
      unwrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wrap(
      marketId: PromiseOrValue<BigNumberish>,
      wrapAmount: PromiseOrValue<BigNumberish>,
      minAmountReceived: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAsyncFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      asyncFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAtomicFixedFee(
      synthMarketId: PromiseOrValue<BigNumberish>,
      atomicFixedFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCollateralLeverage(
      synthMarketId: PromiseOrValue<BigNumberish>,
      collateralLeverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCustomTransactorFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      transactor: PromiseOrValue<string>,
      fixedFeeAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeeCollector(
      synthMarketId: PromiseOrValue<BigNumberish>,
      feeCollector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMarketSkewScale(
      synthMarketId: PromiseOrValue<BigNumberish>,
      skewScale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMarketUtilizationFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      utilizationFeeRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setWrapperFees(
      synthMarketId: PromiseOrValue<BigNumberish>,
      wrapFee: PromiseOrValue<BigNumberish>,
      unwrapFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateReferrerShare(
      synthMarketId: PromiseOrValue<BigNumberish>,
      referrer: PromiseOrValue<string>,
      sharePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getDeniers(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
