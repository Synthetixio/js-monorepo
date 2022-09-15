// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrow';
export const address = '0xb671F2210B1F6621A2607EA63E6B2DC3e2464d1F';
export const source = 'RewardEscrow';
export const abi = [
  'function nominateNewOwner(address _owner)',
  'function setFeePool(address _feePool)',
  'function getNextVestingIndex(address account) view returns (uint256)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function getNextVestingEntry(address account) view returns (uint256[2])',
  'function totalEscrowedAccountBalance(address) view returns (uint256)',
  'function checkAccountSchedule(address account) view returns (uint256[520])',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
  'function nominatedOwner() view returns (address)',
  'function getNextVestingTime(address account) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function synthetix() view returns (address)',
  'function acceptOwnership()',
  'function owner() view returns (address)',
  'function getNextVestingQuantity(address account) view returns (uint256)',
  'function getVestingTime(address account, uint256 index) view returns (uint256)',
  'function feePool() view returns (address)',
  'function appendVestingEntry(address account, uint256 quantity)',
  'function MAX_VESTING_ENTRIES() view returns (uint256)',
  'function getVestingScheduleEntry(address account, uint256 index) view returns (uint256[2])',
  'function getVestingQuantity(address account, uint256 index) view returns (uint256)',
  'function setSynthetix(address _synthetix)',
  'constructor(address _owner, address _synthetix, address _feePool)',
  'event SynthetixUpdated(address newSynthetix)',
  'event FeePoolUpdated(address newFeePool)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'event VestingEntryCreated(address indexed beneficiary, uint256 time, uint256 value)',
  'event OwnerNominated(address newOwner)',
  'event OwnerChanged(address oldOwner, address newOwner)',
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

export interface RewardEscrowInterface extends utils.Interface {
  functions: {
    'nominateNewOwner(address)': FunctionFragment;
    'setFeePool(address)': FunctionFragment;
    'getNextVestingIndex(address)': FunctionFragment;
    'numVestingEntries(address)': FunctionFragment;
    'totalVestedAccountBalance(address)': FunctionFragment;
    'getNextVestingEntry(address)': FunctionFragment;
    'totalEscrowedAccountBalance(address)': FunctionFragment;
    'checkAccountSchedule(address)': FunctionFragment;
    'vest()': FunctionFragment;
    'vestingSchedules(address,uint256,uint256)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'getNextVestingTime(address)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'totalEscrowedBalance()': FunctionFragment;
    'synthetix()': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'owner()': FunctionFragment;
    'getNextVestingQuantity(address)': FunctionFragment;
    'getVestingTime(address,uint256)': FunctionFragment;
    'feePool()': FunctionFragment;
    'appendVestingEntry(address,uint256)': FunctionFragment;
    'MAX_VESTING_ENTRIES()': FunctionFragment;
    'getVestingScheduleEntry(address,uint256)': FunctionFragment;
    'getVestingQuantity(address,uint256)': FunctionFragment;
    'setSynthetix(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'nominateNewOwner'
      | 'setFeePool'
      | 'getNextVestingIndex'
      | 'numVestingEntries'
      | 'totalVestedAccountBalance'
      | 'getNextVestingEntry'
      | 'totalEscrowedAccountBalance'
      | 'checkAccountSchedule'
      | 'vest'
      | 'vestingSchedules'
      | 'nominatedOwner'
      | 'getNextVestingTime'
      | 'balanceOf'
      | 'totalEscrowedBalance'
      | 'synthetix'
      | 'acceptOwnership'
      | 'owner'
      | 'getNextVestingQuantity'
      | 'getVestingTime'
      | 'feePool'
      | 'appendVestingEntry'
      | 'MAX_VESTING_ENTRIES'
      | 'getVestingScheduleEntry'
      | 'getVestingQuantity'
      | 'setSynthetix'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'setFeePool', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingIndex',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'numVestingEntries',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'totalVestedAccountBalance',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingEntry',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'totalEscrowedAccountBalance',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'checkAccountSchedule',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'vest', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'vestingSchedules',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingTime',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'totalEscrowedBalance', values?: undefined): string;
  encodeFunctionData(functionFragment: 'synthetix', values?: undefined): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingQuantity',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVestingTime',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'feePool', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'appendVestingEntry',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'MAX_VESTING_ENTRIES', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getVestingScheduleEntry',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVestingQuantity',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'setSynthetix', values: [PromiseOrValue<string>]): string;

  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingIndex', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'numVestingEntries', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalVestedAccountBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalEscrowedAccountBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'checkAccountSchedule', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'vest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'vestingSchedules', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalEscrowedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'synthetix', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingQuantity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'feePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'appendVestingEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'MAX_VESTING_ENTRIES', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingScheduleEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingQuantity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthetix', data: BytesLike): Result;

  events: {
    'SynthetixUpdated(address)': EventFragment;
    'FeePoolUpdated(address)': EventFragment;
    'Vested(address,uint256,uint256)': EventFragment;
    'VestingEntryCreated(address,uint256,uint256)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'SynthetixUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeePoolUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Vested'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'VestingEntryCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
}

export interface SynthetixUpdatedEventObject {
  newSynthetix: string;
}
export type SynthetixUpdatedEvent = TypedEvent<[string], SynthetixUpdatedEventObject>;

export type SynthetixUpdatedEventFilter = TypedEventFilter<SynthetixUpdatedEvent>;

export interface FeePoolUpdatedEventObject {
  newFeePool: string;
}
export type FeePoolUpdatedEvent = TypedEvent<[string], FeePoolUpdatedEventObject>;

export type FeePoolUpdatedEventFilter = TypedEventFilter<FeePoolUpdatedEvent>;

export interface VestedEventObject {
  beneficiary: string;
  time: BigNumber;
  value: BigNumber;
}
export type VestedEvent = TypedEvent<[string, BigNumber, BigNumber], VestedEventObject>;

export type VestedEventFilter = TypedEventFilter<VestedEvent>;

export interface VestingEntryCreatedEventObject {
  beneficiary: string;
  time: BigNumber;
  value: BigNumber;
}
export type VestingEntryCreatedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  VestingEntryCreatedEventObject
>;

export type VestingEntryCreatedEventFilter = TypedEventFilter<VestingEntryCreatedEvent>;

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

export interface RewardEscrow extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RewardEscrowInterface;

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
    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber]]>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    synthetix(overrides?: CallOverrides): Promise<[string]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    feePool(overrides?: CallOverrides): Promise<[string]>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber]]>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeePool(
    _feePool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getNextVestingIndex(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  numVestingEntries(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  totalVestedAccountBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNextVestingEntry(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  totalEscrowedAccountBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  checkAccountSchedule(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  vestingSchedules(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  getNextVestingTime(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

  synthetix(overrides?: CallOverrides): Promise<string>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  getNextVestingQuantity(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVestingTime(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  feePool(overrides?: CallOverrides): Promise<string>;

  appendVestingEntry(
    account: PromiseOrValue<string>,
    quantity: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

  getVestingScheduleEntry(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  getVestingQuantity(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setSynthetix(
    _synthetix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setFeePool(_feePool: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    vest(overrides?: CallOverrides): Promise<void>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<string>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feePool(overrides?: CallOverrides): Promise<string>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSynthetix(_synthetix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'SynthetixUpdated(address)'(newSynthetix?: null): SynthetixUpdatedEventFilter;
    SynthetixUpdated(newSynthetix?: null): SynthetixUpdatedEventFilter;

    'FeePoolUpdated(address)'(newFeePool?: null): FeePoolUpdatedEventFilter;
    FeePoolUpdated(newFeePool?: null): FeePoolUpdatedEventFilter;

    'Vested(address,uint256,uint256)'(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestedEventFilter;
    Vested(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestedEventFilter;

    'VestingEntryCreated(address,uint256,uint256)'(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestingEntryCreatedEventFilter;
    VestingEntryCreated(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestingEntryCreatedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
  };

  estimateGas: {
    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feePool(overrides?: CallOverrides): Promise<BigNumber>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    synthetix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    feePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
