// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2DelayedExecutionFILPERP';
export const address = '0xad22009De99658Dc7b924383c4A163faEb2562C2';
export const source = 'PerpsV2MarketDelayedExecution';
export const abi = [
  'constructor(address _proxy, address _marketState, address _owner, address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'event DelayedOrderRemoved(address indexed account, bool isOffchain, uint256 currentRoundId, int256 sizeDelta, uint256 targetRoundId, uint256 commitDeposit, uint256 keeperDeposit, bytes32 trackingCode)',
  'event FundingRecomputed(int256 funding, int256 fundingRate, uint256 index, uint256 timestamp)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event PerpsTracking(bytes32 indexed trackingCode, bytes32 baseAsset, bytes32 marketKey, int256 sizeDelta, uint256 fee)',
  'event PositionModified(uint256 indexed id, address indexed account, uint256 margin, int256 size, int256 tradeSize, uint256 lastPrice, uint256 fundingIndex, uint256 fee, int256 skew)',
  'event ProxyUpdated(address proxyAddress)',
  'function acceptOwnership()',
  'function cancelDelayedOrder(address account)',
  'function cancelOffchainDelayedOrder(address account)',
  'function executeDelayedOrder(address account)',
  'function executeOffchainDelayedOrder(address account, bytes[] priceUpdateData) payable',
  'function isResolverCached() view returns (bool)',
  'function marketState() view returns (address)',
  'function messageSender() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function proxy() view returns (address)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
  'function setMessageSender(address sender)',
  'function setProxy(address _proxy)',
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

export interface PerpsV2DelayedExecutionFILPERPInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'cancelDelayedOrder(address)': FunctionFragment;
    'cancelOffchainDelayedOrder(address)': FunctionFragment;
    'executeDelayedOrder(address)': FunctionFragment;
    'executeOffchainDelayedOrder(address,bytes[])': FunctionFragment;
    'isResolverCached()': FunctionFragment;
    'marketState()': FunctionFragment;
    'messageSender()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'proxy()': FunctionFragment;
    'rebuildCache()': FunctionFragment;
    'resolver()': FunctionFragment;
    'resolverAddressesRequired()': FunctionFragment;
    'setMessageSender(address)': FunctionFragment;
    'setProxy(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'cancelDelayedOrder'
      | 'cancelOffchainDelayedOrder'
      | 'executeDelayedOrder'
      | 'executeOffchainDelayedOrder'
      | 'isResolverCached'
      | 'marketState'
      | 'messageSender'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'proxy'
      | 'rebuildCache'
      | 'resolver'
      | 'resolverAddressesRequired'
      | 'setMessageSender'
      | 'setProxy'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'cancelDelayedOrder',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'cancelOffchainDelayedOrder',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'executeDelayedOrder',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'executeOffchainDelayedOrder',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(functionFragment: 'isResolverCached', values?: undefined): string;
  encodeFunctionData(functionFragment: 'marketState', values?: undefined): string;
  encodeFunctionData(functionFragment: 'messageSender', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'proxy', values?: undefined): string;
  encodeFunctionData(functionFragment: 'rebuildCache', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolver', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolverAddressesRequired', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setMessageSender',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'setProxy', values: [PromiseOrValue<string>]): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelDelayedOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cancelOffchainDelayedOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'executeDelayedOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'executeOffchainDelayedOrder', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isResolverCached', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'marketState', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'messageSender', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'proxy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebuildCache', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolverAddressesRequired', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMessageSender', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setProxy', data: BytesLike): Result;

  events: {
    'CacheUpdated(bytes32,address)': EventFragment;
    'DelayedOrderRemoved(address,bool,uint256,int256,uint256,uint256,uint256,bytes32)': EventFragment;
    'FundingRecomputed(int256,int256,uint256,uint256)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'PerpsTracking(bytes32,bytes32,bytes32,int256,uint256)': EventFragment;
    'PositionModified(uint256,address,uint256,int256,int256,uint256,uint256,uint256,int256)': EventFragment;
    'ProxyUpdated(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'CacheUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelayedOrderRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FundingRecomputed'): EventFragment;
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

export interface DelayedOrderRemovedEventObject {
  account: string;
  isOffchain: boolean;
  currentRoundId: BigNumber;
  sizeDelta: BigNumber;
  targetRoundId: BigNumber;
  commitDeposit: BigNumber;
  keeperDeposit: BigNumber;
  trackingCode: string;
}
export type DelayedOrderRemovedEvent = TypedEvent<
  [string, boolean, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string],
  DelayedOrderRemovedEventObject
>;

export type DelayedOrderRemovedEventFilter = TypedEventFilter<DelayedOrderRemovedEvent>;

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

export interface PerpsV2DelayedExecutionFILPERP extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpsV2DelayedExecutionFILPERPInterface;

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

    cancelDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      priceUpdateData: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    marketState(overrides?: CallOverrides): Promise<[string]>;

    messageSender(overrides?: CallOverrides): Promise<[string]>;

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
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelDelayedOrder(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelOffchainDelayedOrder(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeDelayedOrder(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeOffchainDelayedOrder(
    account: PromiseOrValue<string>,
    priceUpdateData: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  marketState(overrides?: CallOverrides): Promise<string>;

  messageSender(overrides?: CallOverrides): Promise<string>;

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

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    cancelDelayedOrder(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    cancelOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeDelayedOrder(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    executeOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      priceUpdateData: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    marketState(overrides?: CallOverrides): Promise<string>;

    messageSender(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    proxy(overrides?: CallOverrides): Promise<string>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

    setMessageSender(sender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setProxy(_proxy: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'CacheUpdated(bytes32,address)'(name?: null, destination?: null): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;

    'DelayedOrderRemoved(address,bool,uint256,int256,uint256,uint256,uint256,bytes32)'(
      account?: PromiseOrValue<string> | null,
      isOffchain?: null,
      currentRoundId?: null,
      sizeDelta?: null,
      targetRoundId?: null,
      commitDeposit?: null,
      keeperDeposit?: null,
      trackingCode?: null
    ): DelayedOrderRemovedEventFilter;
    DelayedOrderRemoved(
      account?: PromiseOrValue<string> | null,
      isOffchain?: null,
      currentRoundId?: null,
      sizeDelta?: null,
      targetRoundId?: null,
      commitDeposit?: null,
      keeperDeposit?: null,
      trackingCode?: null
    ): DelayedOrderRemovedEventFilter;

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

    cancelDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      priceUpdateData: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    marketState(overrides?: CallOverrides): Promise<BigNumber>;

    messageSender(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proxy(overrides?: CallOverrides): Promise<BigNumber>;

    rebuildCache(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

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
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeDelayedOrder(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeOffchainDelayedOrder(
      account: PromiseOrValue<string>,
      priceUpdateData: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    messageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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
  };
}
