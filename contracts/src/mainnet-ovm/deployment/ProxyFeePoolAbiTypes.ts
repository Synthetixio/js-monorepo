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

export interface ProxyFeePoolAbiTypesInterface extends utils.Interface {
  functions: {
    '_emit(bytes,uint256,bytes32,bytes32,bytes32,bytes32)': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'setTarget(address)': FunctionFragment;
    'target()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | '_emit'
      | 'acceptOwnership'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'setTarget'
      | 'target'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: '_emit',
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setTarget', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'target', values?: undefined): string;

  decodeFunctionResult(functionFragment: '_emit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setTarget', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'target', data: BytesLike): Result;

  events: {
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'TargetUpdated(address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TargetUpdated'): EventFragment;
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

export interface TargetUpdatedEventObject {
  newTarget: string;
}
export type TargetUpdatedEvent = TypedEvent<[string], TargetUpdatedEventObject>;

export type TargetUpdatedEventFilter = TypedEventFilter<TargetUpdatedEvent>;

export interface ProxyFeePoolAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProxyFeePoolAbiTypesInterface;

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
    _emit(
      callData: PromiseOrValue<BytesLike>,
      numTopics: PromiseOrValue<BigNumberish>,
      topic1: PromiseOrValue<BytesLike>,
      topic2: PromiseOrValue<BytesLike>,
      topic3: PromiseOrValue<BytesLike>,
      topic4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setTarget(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    target(overrides?: CallOverrides): Promise<[string]>;
  };

  _emit(
    callData: PromiseOrValue<BytesLike>,
    numTopics: PromiseOrValue<BigNumberish>,
    topic1: PromiseOrValue<BytesLike>,
    topic2: PromiseOrValue<BytesLike>,
    topic3: PromiseOrValue<BytesLike>,
    topic4: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  setTarget(
    _target: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  target(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    _emit(
      callData: PromiseOrValue<BytesLike>,
      numTopics: PromiseOrValue<BigNumberish>,
      topic1: PromiseOrValue<BytesLike>,
      topic2: PromiseOrValue<BytesLike>,
      topic3: PromiseOrValue<BytesLike>,
      topic4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    setTarget(_target: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    target(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'TargetUpdated(address)'(newTarget?: null): TargetUpdatedEventFilter;
    TargetUpdated(newTarget?: null): TargetUpdatedEventFilter;
  };

  estimateGas: {
    _emit(
      callData: PromiseOrValue<BytesLike>,
      numTopics: PromiseOrValue<BigNumberish>,
      topic1: PromiseOrValue<BytesLike>,
      topic2: PromiseOrValue<BytesLike>,
      topic3: PromiseOrValue<BytesLike>,
      topic4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setTarget(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    target(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _emit(
      callData: PromiseOrValue<BytesLike>,
      numTopics: PromiseOrValue<BigNumberish>,
      topic1: PromiseOrValue<BytesLike>,
      topic2: PromiseOrValue<BytesLike>,
      topic3: PromiseOrValue<BytesLike>,
      topic4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTarget(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    target(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
