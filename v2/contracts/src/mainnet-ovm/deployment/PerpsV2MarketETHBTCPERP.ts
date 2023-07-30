// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketETHBTCPERP';
export const address = '0x3091AcaEAF27985F33a8a4b0EefEa49dc60c8506';
export const source = 'PerpsV2Market';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event MarginTransferred(address indexed account, int256 marginDelta)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function closePosition(uint256 desiredFillPrice)',
  'function closePositionWithTracking(uint256 desiredFillPrice, bytes32 trackingCode)',
  'function isResolverCached() view returns (bool)',
  'function marketState() view returns (address)',
  'function messageSender() view returns (address)',
  'function modifyPosition(int256 sizeDelta, uint256 desiredFillPrice)',
  'function modifyPositionWithTracking(int256 sizeDelta, uint256 desiredFillPrice, bytes32 trackingCode)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function proxy() view returns (address)',
  'function rebuildCache()',
  'function recomputeFunding() returns (uint256 lastIndex)',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setMessageSender(address sender)',
  'function setProxy(address _proxy)',
  'function transferMargin(int256 marginDelta)',
  'function withdrawAllMargin()',
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

export interface PerpsV2MarketETHBTCPERPInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'closePosition(uint256)': FunctionFragment;
    'closePositionWithTracking(uint256,bytes32)': FunctionFragment;
    'isResolverCached()': FunctionFragment;
    'marketState()': FunctionFragment;
    'messageSender()': FunctionFragment;
    'modifyPosition(int256,uint256)': FunctionFragment;
    'modifyPositionWithTracking(int256,uint256,bytes32)': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'proxy()': FunctionFragment;
    'rebuildCache()': FunctionFragment;
    'recomputeFunding()': FunctionFragment;
    'resolver()': FunctionFragment;
    'resolverAddressesRequired()': FunctionFragment;
    'setMessageSender(address)': FunctionFragment;
    'setProxy(address)': FunctionFragment;
    'transferMargin(int256)': FunctionFragment;
    'withdrawAllMargin()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'closePosition'
      | 'closePositionWithTracking'
      | 'isResolverCached'
      | 'marketState'
      | 'messageSender'
      | 'modifyPosition'
      | 'modifyPositionWithTracking'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'proxy'
      | 'rebuildCache'
      | 'recomputeFunding'
      | 'resolver'
      | 'resolverAddressesRequired'
      | 'setMessageSender'
      | 'setProxy'
      | 'transferMargin'
      | 'withdrawAllMargin'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'closePosition',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'closePositionWithTracking',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: 'isResolverCached', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketState', values?: undefined): string;
  encodeFunctionData(functionFragment: 'messageSender', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'modifyPosition',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'modifyPositionWithTracking',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'proxy', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rebuildCache', values?: undefined): string;
  encodeFunctionData(functionFragment: 'recomputeFunding', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolver', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolverAddressesRequired', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setMessageSender',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'setProxy', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'transferMargin',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'withdrawAllMargin', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'closePosition', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'closePositionWithTracking', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isResolverCached', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketState', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'messageSender', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'modifyPosition', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'modifyPositionWithTracking', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'proxy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebuildCache', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'recomputeFunding', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolverAddressesRequired', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMessageSender', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setProxy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferMargin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawAllMargin', data: BytesLike): Result;

  events: {
    'CacheUpdated(bytes32,address)': EventFragment;
    'FundingRecomputed(int256,int256,uint256,uint256)': EventFragment;
    'MarginTransferred(address,int256)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'PerpsTracking(bytes32,bytes32,bytes32,int256,uint256)': EventFragment;
    'PositionModified(uint256,address,uint256,int256,int256,uint256,uint256,uint256,int256)': EventFragment;
    'ProxyUpdated(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'CacheUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FundingRecomputed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarginTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PerpsTracking'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PositionModified'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ProxyUpdated'): EventFragment;
}

export interface CacheUpdatedEventObject {
  name: string;
  destination: string;
}
export type CacheUpdatedEvent = TypedEvent<[string, string], CacheUpdatedEventObject>;

export type CacheUpdatedEventFilter = TypedEventFilter<CacheUpdatedEvent>;

export interface FundingRecomputedEventObject {
  funding: BigNumber;
  fundingRate: BigNumber;
  index: BigNumber;
  timestamp: BigNumber;
}
export type FundingRecomputedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  FundingRecomputedEventObject
>;

export type FundingRecomputedEventFilter = TypedEventFilter<FundingRecomputedEvent>;

export interface MarginTransferredEventObject {
  account: string;
  marginDelta: BigNumber;
}
export type MarginTransferredEvent = TypedEvent<[string, BigNumber], MarginTransferredEventObject>;

export type MarginTransferredEventFilter = TypedEventFilter<MarginTransferredEvent>;

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

export interface PerpsTrackingEventObject {
  trackingCode: string;
  baseAsset: string;
  marketKey: string;
  sizeDelta: BigNumber;
  fee: BigNumber;
}
export type PerpsTrackingEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  PerpsTrackingEventObject
>;

export type PerpsTrackingEventFilter = TypedEventFilter<PerpsTrackingEvent>;

export interface PositionModifiedEventObject {
  id: BigNumber;
  account: string;
  margin: BigNumber;
  size: BigNumber;
  tradeSize: BigNumber;
  lastPrice: BigNumber;
  fundingIndex: BigNumber;
  fee: BigNumber;
  skew: BigNumber;
}
export type PositionModifiedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  PositionModifiedEventObject
>;

export type PositionModifiedEventFilter = TypedEventFilter<PositionModifiedEvent>;

export interface ProxyUpdatedEventObject {
  proxyAddress: string;
}
export type ProxyUpdatedEvent = TypedEvent<[string], ProxyUpdatedEventObject>;

export type ProxyUpdatedEventFilter = TypedEventFilter<ProxyUpdatedEvent>;

export interface PerpsV2MarketETHBTCPERP extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpsV2MarketETHBTCPERPInterface;

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

    closePosition(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    closePositionWithTracking(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    marketState(overrides?: CallOverrides): Promise<[string]>;

    messageSender(overrides?: CallOverrides): Promise<[string]>;

    modifyPosition(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    modifyPositionWithTracking(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proxy(overrides?: CallOverrides): Promise<[string]>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recomputeFunding(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses: string[] }>;

    setMessageSender(
      sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setProxy(
      _proxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMargin(
      marginDelta: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawAllMargin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  closePosition(
    desiredFillPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  closePositionWithTracking(
    desiredFillPrice: PromiseOrValue<BigNumberish>,
    trackingCode: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  marketState(overrides?: CallOverrides): Promise<string>;

  messageSender(overrides?: CallOverrides): Promise<string>;

  modifyPosition(
    sizeDelta: PromiseOrValue<BigNumberish>,
    desiredFillPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  modifyPositionWithTracking(
    sizeDelta: PromiseOrValue<BigNumberish>,
    desiredFillPrice: PromiseOrValue<BigNumberish>,
    trackingCode: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  proxy(overrides?: CallOverrides): Promise<string>;

  rebuildCache(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recomputeFunding(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resolver(overrides?: CallOverrides): Promise<string>;

  resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

  setMessageSender(
    sender: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setProxy(
    _proxy: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMargin(
    marginDelta: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawAllMargin(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    closePosition(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    closePositionWithTracking(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    marketState(overrides?: CallOverrides): Promise<string>;

    messageSender(overrides?: CallOverrides): Promise<string>;

    modifyPosition(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    modifyPositionWithTracking(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    proxy(overrides?: CallOverrides): Promise<string>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    recomputeFunding(overrides?: CallOverrides): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

    setMessageSender(sender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setProxy(_proxy: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    transferMargin(
      marginDelta: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawAllMargin(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'CacheUpdated(bytes32,address)'(name?: null, destination?: null): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;

    'FundingRecomputed(int256,int256,uint256,uint256)'(
      funding?: null,
      fundingRate?: null,
      index?: null,
      timestamp?: null
    ): FundingRecomputedEventFilter;
    FundingRecomputed(
      funding?: null,
      fundingRate?: null,
      index?: null,
      timestamp?: null
    ): FundingRecomputedEventFilter;

    'MarginTransferred(address,int256)'(
      account?: PromiseOrValue<string> | null,
      marginDelta?: null
    ): MarginTransferredEventFilter;
    MarginTransferred(
      account?: PromiseOrValue<string> | null,
      marginDelta?: null
    ): MarginTransferredEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'PerpsTracking(bytes32,bytes32,bytes32,int256,uint256)'(
      trackingCode?: PromiseOrValue<BytesLike> | null,
      baseAsset?: null,
      marketKey?: null,
      sizeDelta?: null,
      fee?: null
    ): PerpsTrackingEventFilter;
    PerpsTracking(
      trackingCode?: PromiseOrValue<BytesLike> | null,
      baseAsset?: null,
      marketKey?: null,
      sizeDelta?: null,
      fee?: null
    ): PerpsTrackingEventFilter;

    'PositionModified(uint256,address,uint256,int256,int256,uint256,uint256,uint256,int256)'(
      id?: PromiseOrValue<BigNumberish> | null,
      account?: PromiseOrValue<string> | null,
      margin?: null,
      size?: null,
      tradeSize?: null,
      lastPrice?: null,
      fundingIndex?: null,
      fee?: null,
      skew?: null
    ): PositionModifiedEventFilter;
    PositionModified(
      id?: PromiseOrValue<BigNumberish> | null,
      account?: PromiseOrValue<string> | null,
      margin?: null,
      size?: null,
      tradeSize?: null,
      lastPrice?: null,
      fundingIndex?: null,
      fee?: null,
      skew?: null
    ): PositionModifiedEventFilter;

    'ProxyUpdated(address)'(proxyAddress?: null): ProxyUpdatedEventFilter;
    ProxyUpdated(proxyAddress?: null): ProxyUpdatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    closePosition(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    closePositionWithTracking(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    marketState(overrides?: CallOverrides): Promise<BigNumber>;

    messageSender(overrides?: CallOverrides): Promise<BigNumber>;

    modifyPosition(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    modifyPositionWithTracking(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proxy(overrides?: CallOverrides): Promise<BigNumber>;

    rebuildCache(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    recomputeFunding(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<BigNumber>;

    setMessageSender(
      sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setProxy(
      _proxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMargin(
      marginDelta: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawAllMargin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    closePosition(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    closePositionWithTracking(
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    messageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    modifyPosition(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    modifyPositionWithTracking(
      sizeDelta: PromiseOrValue<BigNumberish>,
      desiredFillPrice: PromiseOrValue<BigNumberish>,
      trackingCode: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recomputeFunding(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMessageSender(
      sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setProxy(
      _proxy: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMargin(
      marginDelta: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAllMargin(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
