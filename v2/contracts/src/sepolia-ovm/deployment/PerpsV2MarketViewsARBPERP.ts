// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketViewsARBPERP';
export const address = '0x196Cb95C605cD36859DCdA594eEfAD91c21006D3';
export const source = 'PerpsV2MarketViews';
export const abi = [
  'constructor(address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function accessibleMargin(address account) view returns (uint256 marginAccessible, bool invalid)',
  'function accruedFunding(address account) view returns (int256 funding, bool invalid)',
  'function assetPrice() view returns (uint256 price, bool invalid)',
  'function baseAsset() view returns (bytes32 key)',
  'function canLiquidate(address account) view returns (bool)',
  'function currentFundingRate() view returns (int256)',
  'function currentFundingVelocity() view returns (int256)',
  'function delayedOrders(address account) view returns (tuple(bool isOffchain, int128 sizeDelta, uint128 desiredFillPrice, uint128 targetRoundId, uint128 commitDeposit, uint128 keeperDeposit, uint256 executableAtTime, uint256 intentionTime, bytes32 trackingCode))',
  'function fillPrice(int256 sizeDelta) view returns (uint256 price, bool invalid)',
  'function fundingLastRecomputed() view returns (uint32)',
  'function fundingRateLastRecomputed() view returns (int128)',
  'function fundingSequence(uint256 index) view returns (int128)',
  'function fundingSequenceLength() view returns (uint256)',
  'function isFlagged(address account) view returns (bool)',
  'function isResolverCached() view returns (bool)',
  'function liquidationFee(address account) view returns (uint256)',
  'function liquidationPrice(address account) view returns (uint256 price, bool invalid)',
  'function marketDebt() view returns (uint256 debt, bool invalid)',
  'function marketKey() view returns (bytes32 key)',
  'function marketSize() view returns (uint128)',
  'function marketSizes() view returns (uint256 long, uint256 short)',
  'function marketSkew() view returns (int128)',
  'function marketState() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function notionalValue(address account) view returns (int256 value, bool invalid)',
  'function orderFee(int256 sizeDelta, uint8 orderType) view returns (uint256 fee, bool invalid)',
  'function owner() view returns (address)',
  'function positions(address account) view returns (tuple(uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size))',
  'function postTradeDetails(int256 sizeDelta, uint256 tradePrice, uint8 orderType, address sender) view returns (uint256 margin, int256 size, uint256 price, uint256 liqPrice, uint256 fee, uint8 status)',
  'function profitLoss(address account) view returns (int256 pnl, bool invalid)',
  'function rebuildCache()',
  'function remainingMargin(address account) view returns (uint256 marginRemaining, bool invalid)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function unrecordedFunding() view returns (int256 funding, bool invalid)',
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

export declare namespace IPerpsV2MarketBaseTypes {
  export type DelayedOrderStruct = {
    isOffchain: PromiseOrValue<boolean>;
    sizeDelta: PromiseOrValue<BigNumberish>;
    desiredFillPrice: PromiseOrValue<BigNumberish>;
    targetRoundId: PromiseOrValue<BigNumberish>;
    commitDeposit: PromiseOrValue<BigNumberish>;
    keeperDeposit: PromiseOrValue<BigNumberish>;
    executableAtTime: PromiseOrValue<BigNumberish>;
    intentionTime: PromiseOrValue<BigNumberish>;
    trackingCode: PromiseOrValue<BytesLike>;
  };

  export type DelayedOrderStructOutput = [
    boolean,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    isOffchain: boolean;
    sizeDelta: BigNumber;
    desiredFillPrice: BigNumber;
    targetRoundId: BigNumber;
    commitDeposit: BigNumber;
    keeperDeposit: BigNumber;
    executableAtTime: BigNumber;
    intentionTime: BigNumber;
    trackingCode: string;
  };

  export type PositionStruct = {
    id: PromiseOrValue<BigNumberish>;
    lastFundingIndex: PromiseOrValue<BigNumberish>;
    margin: PromiseOrValue<BigNumberish>;
    lastPrice: PromiseOrValue<BigNumberish>;
    size: PromiseOrValue<BigNumberish>;
  };

  export type PositionStructOutput = [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
    id: BigNumber;
    lastFundingIndex: BigNumber;
    margin: BigNumber;
    lastPrice: BigNumber;
    size: BigNumber;
  };
}

export interface PerpsV2MarketViewsARBPERPInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'accessibleMargin(address)': FunctionFragment;
    'accruedFunding(address)': FunctionFragment;
    'assetPrice()': FunctionFragment;
    'baseAsset()': FunctionFragment;
    'canLiquidate(address)': FunctionFragment;
    'currentFundingRate()': FunctionFragment;
    'currentFundingVelocity()': FunctionFragment;
    'delayedOrders(address)': FunctionFragment;
    'fillPrice(int256)': FunctionFragment;
    'fundingLastRecomputed()': FunctionFragment;
    'fundingRateLastRecomputed()': FunctionFragment;
    'fundingSequence(uint256)': FunctionFragment;
    'fundingSequenceLength()': FunctionFragment;
    'isFlagged(address)': FunctionFragment;
    'isResolverCached()': FunctionFragment;
    'liquidationFee(address)': FunctionFragment;
    'liquidationPrice(address)': FunctionFragment;
    'marketDebt()': FunctionFragment;
    'marketKey()': FunctionFragment;
    'marketSize()': FunctionFragment;
    'marketSizes()': FunctionFragment;
    'marketSkew()': FunctionFragment;
    'marketState()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'notionalValue(address)': FunctionFragment;
    'orderFee(int256,uint8)': FunctionFragment;
    'owner()': FunctionFragment;
    'positions(address)': FunctionFragment;
    'postTradeDetails(int256,uint256,uint8,address)': FunctionFragment;
    'profitLoss(address)': FunctionFragment;
    'rebuildCache()': FunctionFragment;
    'remainingMargin(address)': FunctionFragment;
    'resolver()': FunctionFragment;
    'resolverAddressesRequired()': FunctionFragment;
    'unrecordedFunding()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'accessibleMargin'
      | 'accruedFunding'
      | 'assetPrice'
      | 'baseAsset'
      | 'canLiquidate'
      | 'currentFundingRate'
      | 'currentFundingVelocity'
      | 'delayedOrders'
      | 'fillPrice'
      | 'fundingLastRecomputed'
      | 'fundingRateLastRecomputed'
      | 'fundingSequence'
      | 'fundingSequenceLength'
      | 'isFlagged'
      | 'isResolverCached'
      | 'liquidationFee'
      | 'liquidationPrice'
      | 'marketDebt'
      | 'marketKey'
      | 'marketSize'
      | 'marketSizes'
      | 'marketSkew'
      | 'marketState'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'notionalValue'
      | 'orderFee'
      | 'owner'
      | 'positions'
      | 'postTradeDetails'
      | 'profitLoss'
      | 'rebuildCache'
      | 'remainingMargin'
      | 'resolver'
      | 'resolverAddressesRequired'
      | 'unrecordedFunding'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'accessibleMargin',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'accruedFunding', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'assetPrice', values?: undefined): string;
  encodeFunctionData(functionFragment: 'baseAsset', values?: undefined): string;
  encodeFunctionData(functionFragment: 'canLiquidate', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'currentFundingRate', values?: undefined): string;
  encodeFunctionData(functionFragment: 'currentFundingVelocity', values?: undefined): string;
  encodeFunctionData(functionFragment: 'delayedOrders', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'fillPrice', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: 'fundingLastRecomputed', values?: undefined): string;
  encodeFunctionData(functionFragment: 'fundingRateLastRecomputed', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'fundingSequence',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'fundingSequenceLength', values?: undefined): string;
  encodeFunctionData(functionFragment: 'isFlagged', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'isResolverCached', values?: undefined): string;
  encodeFunctionData(functionFragment: 'liquidationFee', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'liquidationPrice',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'marketDebt', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketKey', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketSize', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketSizes', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketSkew', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketState', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'notionalValue', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'orderFee',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'positions', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'postTradeDetails',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'profitLoss', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'rebuildCache', values?: undefined): string;
  encodeFunctionData(functionFragment: 'remainingMargin', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'resolver', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolverAddressesRequired', values?: undefined): string;
  encodeFunctionData(functionFragment: 'unrecordedFunding', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'accessibleMargin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'accruedFunding', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'assetPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'baseAsset', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canLiquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'currentFundingRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'currentFundingVelocity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delayedOrders', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fillPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fundingLastRecomputed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fundingRateLastRecomputed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fundingSequence', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'fundingSequenceLength', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isFlagged', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isResolverCached', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidationFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidationPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketKey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketSize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketSizes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketSkew', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketState', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'notionalValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'orderFee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'positions', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'postTradeDetails', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'profitLoss', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebuildCache', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'remainingMargin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolverAddressesRequired', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'unrecordedFunding', data: BytesLike): Result;

  events: {
    'CacheUpdated(bytes32,address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'CacheUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
}

export interface CacheUpdatedEventObject {
  name: string;
  destination: string;
}
export type CacheUpdatedEvent = TypedEvent<[string, string], CacheUpdatedEventObject>;

export type CacheUpdatedEventFilter = TypedEventFilter<CacheUpdatedEvent>;

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

export interface PerpsV2MarketViewsARBPERP extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpsV2MarketViewsARBPERPInterface;

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

    accessibleMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { marginAccessible: BigNumber; invalid: boolean }>;

    accruedFunding(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;

    assetPrice(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    baseAsset(overrides?: CallOverrides): Promise<[string] & { key: string }>;

    canLiquidate(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    currentFundingRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    currentFundingVelocity(overrides?: CallOverrides): Promise<[BigNumber]>;

    delayedOrders(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IPerpsV2MarketBaseTypes.DelayedOrderStructOutput]>;

    fillPrice(
      sizeDelta: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    fundingLastRecomputed(overrides?: CallOverrides): Promise<[number]>;

    fundingRateLastRecomputed(overrides?: CallOverrides): Promise<[BigNumber]>;

    fundingSequence(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    fundingSequenceLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    isFlagged(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    liquidationFee(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    liquidationPrice(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    marketDebt(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { debt: BigNumber; invalid: boolean }>;

    marketKey(overrides?: CallOverrides): Promise<[string] & { key: string }>;

    marketSize(overrides?: CallOverrides): Promise<[BigNumber]>;

    marketSizes(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

    marketSkew(overrides?: CallOverrides): Promise<[BigNumber]>;

    marketState(overrides?: CallOverrides): Promise<[string]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    notionalValue(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { value: BigNumber; invalid: boolean }>;

    orderFee(
      sizeDelta: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { fee: BigNumber; invalid: boolean }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    positions(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IPerpsV2MarketBaseTypes.PositionStructOutput]>;

    postTradeDetails(
      sizeDelta: PromiseOrValue<BigNumberish>,
      tradePrice: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        margin: BigNumber;
        size: BigNumber;
        price: BigNumber;
        liqPrice: BigNumber;
        fee: BigNumber;
        status: number;
      }
    >;

    profitLoss(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { pnl: BigNumber; invalid: boolean }>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    remainingMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { marginRemaining: BigNumber; invalid: boolean }>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses: string[] }>;

    unrecordedFunding(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  accessibleMargin(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { marginAccessible: BigNumber; invalid: boolean }>;

  accruedFunding(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;

  assetPrice(
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

  baseAsset(overrides?: CallOverrides): Promise<string>;

  canLiquidate(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  currentFundingRate(overrides?: CallOverrides): Promise<BigNumber>;

  currentFundingVelocity(overrides?: CallOverrides): Promise<BigNumber>;

  delayedOrders(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IPerpsV2MarketBaseTypes.DelayedOrderStructOutput>;

  fillPrice(
    sizeDelta: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

  fundingLastRecomputed(overrides?: CallOverrides): Promise<number>;

  fundingRateLastRecomputed(overrides?: CallOverrides): Promise<BigNumber>;

  fundingSequence(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  fundingSequenceLength(overrides?: CallOverrides): Promise<BigNumber>;

  isFlagged(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  liquidationFee(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  liquidationPrice(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

  marketDebt(
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { debt: BigNumber; invalid: boolean }>;

  marketKey(overrides?: CallOverrides): Promise<string>;

  marketSize(overrides?: CallOverrides): Promise<BigNumber>;

  marketSizes(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

  marketSkew(overrides?: CallOverrides): Promise<BigNumber>;

  marketState(overrides?: CallOverrides): Promise<string>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  notionalValue(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { value: BigNumber; invalid: boolean }>;

  orderFee(
    sizeDelta: PromiseOrValue<BigNumberish>,
    orderType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { fee: BigNumber; invalid: boolean }>;

  owner(overrides?: CallOverrides): Promise<string>;

  positions(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IPerpsV2MarketBaseTypes.PositionStructOutput>;

  postTradeDetails(
    sizeDelta: PromiseOrValue<BigNumberish>,
    tradePrice: PromiseOrValue<BigNumberish>,
    orderType: PromiseOrValue<BigNumberish>,
    sender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
      margin: BigNumber;
      size: BigNumber;
      price: BigNumber;
      liqPrice: BigNumber;
      fee: BigNumber;
      status: number;
    }
  >;

  profitLoss(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { pnl: BigNumber; invalid: boolean }>;

  rebuildCache(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  remainingMargin(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { marginRemaining: BigNumber; invalid: boolean }>;

  resolver(overrides?: CallOverrides): Promise<string>;

  resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

  unrecordedFunding(
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    accessibleMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { marginAccessible: BigNumber; invalid: boolean }>;

    accruedFunding(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;

    assetPrice(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    baseAsset(overrides?: CallOverrides): Promise<string>;

    canLiquidate(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    currentFundingRate(overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingVelocity(overrides?: CallOverrides): Promise<BigNumber>;

    delayedOrders(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IPerpsV2MarketBaseTypes.DelayedOrderStructOutput>;

    fillPrice(
      sizeDelta: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    fundingLastRecomputed(overrides?: CallOverrides): Promise<number>;

    fundingRateLastRecomputed(overrides?: CallOverrides): Promise<BigNumber>;

    fundingSequence(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fundingSequenceLength(overrides?: CallOverrides): Promise<BigNumber>;

    isFlagged(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    liquidationFee(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    liquidationPrice(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { price: BigNumber; invalid: boolean }>;

    marketDebt(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { debt: BigNumber; invalid: boolean }>;

    marketKey(overrides?: CallOverrides): Promise<string>;

    marketSize(overrides?: CallOverrides): Promise<BigNumber>;

    marketSizes(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

    marketSkew(overrides?: CallOverrides): Promise<BigNumber>;

    marketState(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    notionalValue(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { value: BigNumber; invalid: boolean }>;

    orderFee(
      sizeDelta: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { fee: BigNumber; invalid: boolean }>;

    owner(overrides?: CallOverrides): Promise<string>;

    positions(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IPerpsV2MarketBaseTypes.PositionStructOutput>;

    postTradeDetails(
      sizeDelta: PromiseOrValue<BigNumberish>,
      tradePrice: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, number] & {
        margin: BigNumber;
        size: BigNumber;
        price: BigNumber;
        liqPrice: BigNumber;
        fee: BigNumber;
        status: number;
      }
    >;

    profitLoss(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { pnl: BigNumber; invalid: boolean }>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    remainingMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { marginRemaining: BigNumber; invalid: boolean }>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

    unrecordedFunding(
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { funding: BigNumber; invalid: boolean }>;
  };

  filters: {
    'CacheUpdated(bytes32,address)'(name?: null, destination?: null): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    accessibleMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    accruedFunding(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    assetPrice(overrides?: CallOverrides): Promise<BigNumber>;

    baseAsset(overrides?: CallOverrides): Promise<BigNumber>;

    canLiquidate(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingRate(overrides?: CallOverrides): Promise<BigNumber>;

    currentFundingVelocity(overrides?: CallOverrides): Promise<BigNumber>;

    delayedOrders(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    fillPrice(
      sizeDelta: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fundingLastRecomputed(overrides?: CallOverrides): Promise<BigNumber>;

    fundingRateLastRecomputed(overrides?: CallOverrides): Promise<BigNumber>;

    fundingSequence(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fundingSequenceLength(overrides?: CallOverrides): Promise<BigNumber>;

    isFlagged(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    liquidationFee(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    liquidationPrice(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    marketDebt(overrides?: CallOverrides): Promise<BigNumber>;

    marketKey(overrides?: CallOverrides): Promise<BigNumber>;

    marketSize(overrides?: CallOverrides): Promise<BigNumber>;

    marketSizes(overrides?: CallOverrides): Promise<BigNumber>;

    marketSkew(overrides?: CallOverrides): Promise<BigNumber>;

    marketState(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    notionalValue(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    orderFee(
      sizeDelta: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    positions(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    postTradeDetails(
      sizeDelta: PromiseOrValue<BigNumberish>,
      tradePrice: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    profitLoss(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    rebuildCache(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    remainingMargin(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<BigNumber>;

    unrecordedFunding(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    accessibleMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    accruedFunding(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    assetPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    baseAsset(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canLiquidate(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentFundingRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentFundingVelocity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    delayedOrders(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fillPrice(
      sizeDelta: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fundingLastRecomputed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundingRateLastRecomputed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundingSequence(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fundingSequenceLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isFlagged(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidationFee(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    liquidationPrice(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    marketDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketKey(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketSizes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketSkew(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    notionalValue(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orderFee(
      sizeDelta: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    positions(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    postTradeDetails(
      sizeDelta: PromiseOrValue<BigNumberish>,
      tradePrice: PromiseOrValue<BigNumberish>,
      orderType: PromiseOrValue<BigNumberish>,
      sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    profitLoss(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    remainingMargin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unrecordedFunding(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
