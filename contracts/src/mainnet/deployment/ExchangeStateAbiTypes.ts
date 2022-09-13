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

export interface ExchangeStateAbiTypesInterface extends utils.Interface {
  functions: {
    'maxEntriesInQueue()': FunctionFragment;
    'getEntryAt(address,bytes32,uint256)': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'appendExchangeEntry(address,bytes32,uint256,bytes32,uint256,uint256,uint256,uint256,uint256)': FunctionFragment;
    'setAssociatedContract(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'exchanges(address,bytes32,uint256)': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'owner()': FunctionFragment;
    'associatedContract()': FunctionFragment;
    'getLengthOfEntries(address,bytes32)': FunctionFragment;
    'setMaxEntriesInQueue(uint256)': FunctionFragment;
    'removeEntries(address,bytes32)': FunctionFragment;
    'getMaxTimestamp(address,bytes32)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'maxEntriesInQueue'
      | 'getEntryAt'
      | 'nominateNewOwner'
      | 'appendExchangeEntry'
      | 'setAssociatedContract'
      | 'nominatedOwner'
      | 'exchanges'
      | 'acceptOwnership'
      | 'owner'
      | 'associatedContract'
      | 'getLengthOfEntries'
      | 'setMaxEntriesInQueue'
      | 'removeEntries'
      | 'getMaxTimestamp'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'maxEntriesInQueue', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getEntryAt',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'appendExchangeEntry',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'setAssociatedContract',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'exchanges',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'associatedContract', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getLengthOfEntries',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMaxEntriesInQueue',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeEntries',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMaxTimestamp',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: 'maxEntriesInQueue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getEntryAt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'appendExchangeEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAssociatedContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'exchanges', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'associatedContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLengthOfEntries', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMaxEntriesInQueue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeEntries', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaxTimestamp', data: BytesLike): Result;

  events: {
    'AssociatedContractUpdated(address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'AssociatedContractUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
}

export interface AssociatedContractUpdatedEventObject {
  associatedContract: string;
}
export type AssociatedContractUpdatedEvent = TypedEvent<
  [string],
  AssociatedContractUpdatedEventObject
>;

export type AssociatedContractUpdatedEventFilter = TypedEventFilter<AssociatedContractUpdatedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[string], OwnerNominatedEventObject>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string, string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface ExchangeStateAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExchangeStateAbiTypesInterface;

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
    maxEntriesInQueue(overrides?: CallOverrides): Promise<[BigNumber]>;

    getEntryAt(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        src: string;
        amount: BigNumber;
        dest: string;
        amountReceived: BigNumber;
        exchangeFeeRate: BigNumber;
        timestamp: BigNumber;
        roundIdForSrc: BigNumber;
        roundIdForDest: BigNumber;
      }
    >;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    appendExchangeEntry(
      account: PromiseOrValue<string>,
      src: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      amountReceived: PromiseOrValue<BigNumberish>,
      exchangeFeeRate: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      roundIdForSrc: PromiseOrValue<BigNumberish>,
      roundIdForDest: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    exchanges(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        src: string;
        amount: BigNumber;
        dest: string;
        amountReceived: BigNumber;
        exchangeFeeRate: BigNumber;
        timestamp: BigNumber;
        roundIdForSrc: BigNumber;
        roundIdForDest: BigNumber;
      }
    >;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    associatedContract(overrides?: CallOverrides): Promise<[string]>;

    getLengthOfEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setMaxEntriesInQueue(
      _maxEntriesInQueue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMaxTimestamp(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  maxEntriesInQueue(overrides?: CallOverrides): Promise<BigNumber>;

  getEntryAt(
    account: PromiseOrValue<string>,
    currencyKey: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      src: string;
      amount: BigNumber;
      dest: string;
      amountReceived: BigNumber;
      exchangeFeeRate: BigNumber;
      timestamp: BigNumber;
      roundIdForSrc: BigNumber;
      roundIdForDest: BigNumber;
    }
  >;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  appendExchangeEntry(
    account: PromiseOrValue<string>,
    src: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    dest: PromiseOrValue<BytesLike>,
    amountReceived: PromiseOrValue<BigNumberish>,
    exchangeFeeRate: PromiseOrValue<BigNumberish>,
    timestamp: PromiseOrValue<BigNumberish>,
    roundIdForSrc: PromiseOrValue<BigNumberish>,
    roundIdForDest: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAssociatedContract(
    _associatedContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  exchanges(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BytesLike>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      src: string;
      amount: BigNumber;
      dest: string;
      amountReceived: BigNumber;
      exchangeFeeRate: BigNumber;
      timestamp: BigNumber;
      roundIdForSrc: BigNumber;
      roundIdForDest: BigNumber;
    }
  >;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  associatedContract(overrides?: CallOverrides): Promise<string>;

  getLengthOfEntries(
    account: PromiseOrValue<string>,
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setMaxEntriesInQueue(
    _maxEntriesInQueue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeEntries(
    account: PromiseOrValue<string>,
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMaxTimestamp(
    account: PromiseOrValue<string>,
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    maxEntriesInQueue(overrides?: CallOverrides): Promise<BigNumber>;

    getEntryAt(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        src: string;
        amount: BigNumber;
        dest: string;
        amountReceived: BigNumber;
        exchangeFeeRate: BigNumber;
        timestamp: BigNumber;
        roundIdForSrc: BigNumber;
        roundIdForDest: BigNumber;
      }
    >;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    appendExchangeEntry(
      account: PromiseOrValue<string>,
      src: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      amountReceived: PromiseOrValue<BigNumberish>,
      exchangeFeeRate: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      roundIdForSrc: PromiseOrValue<BigNumberish>,
      roundIdForDest: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    exchanges(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        src: string;
        amount: BigNumber;
        dest: string;
        amountReceived: BigNumber;
        exchangeFeeRate: BigNumber;
        timestamp: BigNumber;
        roundIdForSrc: BigNumber;
        roundIdForDest: BigNumber;
      }
    >;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    associatedContract(overrides?: CallOverrides): Promise<string>;

    getLengthOfEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setMaxEntriesInQueue(
      _maxEntriesInQueue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getMaxTimestamp(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    'AssociatedContractUpdated(address)'(
      associatedContract?: null
    ): AssociatedContractUpdatedEventFilter;
    AssociatedContractUpdated(associatedContract?: null): AssociatedContractUpdatedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
  };

  estimateGas: {
    maxEntriesInQueue(overrides?: CallOverrides): Promise<BigNumber>;

    getEntryAt(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    appendExchangeEntry(
      account: PromiseOrValue<string>,
      src: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      amountReceived: PromiseOrValue<BigNumberish>,
      exchangeFeeRate: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      roundIdForSrc: PromiseOrValue<BigNumberish>,
      roundIdForDest: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    exchanges(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    associatedContract(overrides?: CallOverrides): Promise<BigNumber>;

    getLengthOfEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setMaxEntriesInQueue(
      _maxEntriesInQueue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMaxTimestamp(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    maxEntriesInQueue(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEntryAt(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    appendExchangeEntry(
      account: PromiseOrValue<string>,
      src: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      amountReceived: PromiseOrValue<BigNumberish>,
      exchangeFeeRate: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      roundIdForSrc: PromiseOrValue<BigNumberish>,
      roundIdForDest: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exchanges(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    associatedContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLengthOfEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setMaxEntriesInQueue(
      _maxEntriesInQueue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeEntries(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMaxTimestamp(
      account: PromiseOrValue<string>,
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
