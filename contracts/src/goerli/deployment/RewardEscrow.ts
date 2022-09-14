// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'RewardEscrow';
export const address = '0x249BCCbFD33FA6653Db02aE2349444EF25E9B41d';
export const source = 'RewardEscrow';
export const abi = [
  'constructor(address _owner, address _synthetix, address _feePool)',
  'event FeePoolUpdated(address newFeePool)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event SynthetixUpdated(address newSynthetix)',
  'event Vested(address indexed beneficiary, uint256 time, uint256 value)',
  'event VestingEntryCreated(address indexed beneficiary, uint256 time, uint256 value)',
  'function MAX_VESTING_ENTRIES() view returns (uint256)',
  'function acceptOwnership()',
  'function appendVestingEntry(address account, uint256 quantity)',
  'function balanceOf(address account) view returns (uint256)',
  'function checkAccountSchedule(address account) view returns (uint256[520])',
  'function feePool() view returns (address)',
  'function getNextVestingEntry(address account) view returns (uint256[2])',
  'function getNextVestingIndex(address account) view returns (uint256)',
  'function getNextVestingQuantity(address account) view returns (uint256)',
  'function getNextVestingTime(address account) view returns (uint256)',
  'function getVestingQuantity(address account, uint256 index) view returns (uint256)',
  'function getVestingScheduleEntry(address account, uint256 index) view returns (uint256[2])',
  'function getVestingTime(address account, uint256 index) view returns (uint256)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function numVestingEntries(address account) view returns (uint256)',
  'function owner() view returns (address)',
  'function setFeePool(address _feePool)',
  'function setSynthetix(address _synthetix)',
  'function synthetix() view returns (address)',
  'function totalEscrowedAccountBalance(address) view returns (uint256)',
  'function totalEscrowedBalance() view returns (uint256)',
  'function totalVestedAccountBalance(address) view returns (uint256)',
  'function vest()',
  'function vestingSchedules(address, uint256, uint256) view returns (uint256)',
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
    'MAX_VESTING_ENTRIES()': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'appendVestingEntry(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'checkAccountSchedule(address)': FunctionFragment;
    'feePool()': FunctionFragment;
    'getNextVestingEntry(address)': FunctionFragment;
    'getNextVestingIndex(address)': FunctionFragment;
    'getNextVestingQuantity(address)': FunctionFragment;
    'getNextVestingTime(address)': FunctionFragment;
    'getVestingQuantity(address,uint256)': FunctionFragment;
    'getVestingScheduleEntry(address,uint256)': FunctionFragment;
    'getVestingTime(address,uint256)': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'numVestingEntries(address)': FunctionFragment;
    'owner()': FunctionFragment;
    'setFeePool(address)': FunctionFragment;
    'setSynthetix(address)': FunctionFragment;
    'synthetix()': FunctionFragment;
    'totalEscrowedAccountBalance(address)': FunctionFragment;
    'totalEscrowedBalance()': FunctionFragment;
    'totalVestedAccountBalance(address)': FunctionFragment;
    'vest()': FunctionFragment;
    'vestingSchedules(address,uint256,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'MAX_VESTING_ENTRIES'
      | 'acceptOwnership'
      | 'appendVestingEntry'
      | 'balanceOf'
      | 'checkAccountSchedule'
      | 'feePool'
      | 'getNextVestingEntry'
      | 'getNextVestingIndex'
      | 'getNextVestingQuantity'
      | 'getNextVestingTime'
      | 'getVestingQuantity'
      | 'getVestingScheduleEntry'
      | 'getVestingTime'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'numVestingEntries'
      | 'owner'
      | 'setFeePool'
      | 'setSynthetix'
      | 'synthetix'
      | 'totalEscrowedAccountBalance'
      | 'totalEscrowedBalance'
      | 'totalVestedAccountBalance'
      | 'vest'
      | 'vestingSchedules'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'MAX_VESTING_ENTRIES', values?: undefined): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'appendVestingEntry',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'checkAccountSchedule',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'feePool', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingEntry',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingIndex',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingQuantity',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getNextVestingTime',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVestingQuantity',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVestingScheduleEntry',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVestingTime',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'numVestingEntries',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setFeePool', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'setSynthetix', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'synthetix', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'totalEscrowedAccountBalance',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'totalEscrowedBalance', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'totalVestedAccountBalance',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'vest', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'vestingSchedules',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: 'MAX_VESTING_ENTRIES', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'appendVestingEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'checkAccountSchedule', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'feePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingIndex', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingQuantity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNextVestingTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingQuantity', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingScheduleEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVestingTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'numVestingEntries', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSynthetix', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'synthetix', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalEscrowedAccountBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalEscrowedBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalVestedAccountBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'vest', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'vestingSchedules', data: BytesLike): Result;

  events: {
    'FeePoolUpdated(address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'SynthetixUpdated(address)': EventFragment;
    'Vested(address,uint256,uint256)': EventFragment;
    'VestingEntryCreated(address,uint256,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'FeePoolUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SynthetixUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Vested'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'VestingEntryCreated'): EventFragment;
}

export interface FeePoolUpdatedEventObject {
  newFeePool: string;
}
export type FeePoolUpdatedEvent = TypedEvent<[string], FeePoolUpdatedEventObject>;

export type FeePoolUpdatedEventFilter = TypedEventFilter<FeePoolUpdatedEvent>;

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

export interface SynthetixUpdatedEventObject {
  newSynthetix: string;
}
export type SynthetixUpdatedEvent = TypedEvent<[string], SynthetixUpdatedEventObject>;

export type SynthetixUpdatedEventFilter = TypedEventFilter<SynthetixUpdatedEvent>;

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
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<[BigNumber]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    feePool(overrides?: CallOverrides): Promise<[string]>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber]]>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber]]>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    synthetix(overrides?: CallOverrides): Promise<[string]>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  appendVestingEntry(
    account: PromiseOrValue<string>,
    quantity: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  checkAccountSchedule(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  feePool(overrides?: CallOverrides): Promise<string>;

  getNextVestingEntry(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  getNextVestingIndex(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNextVestingQuantity(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNextVestingTime(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVestingQuantity(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVestingScheduleEntry(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  getVestingTime(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  numVestingEntries(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  setFeePool(
    _feePool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSynthetix(
    _synthetix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  synthetix(overrides?: CallOverrides): Promise<string>;

  totalEscrowedAccountBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

  totalVestedAccountBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  vestingSchedules(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    feePool(overrides?: CallOverrides): Promise<string>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    setFeePool(_feePool: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setSynthetix(_synthetix: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    synthetix(overrides?: CallOverrides): Promise<string>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vest(overrides?: CallOverrides): Promise<void>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    'FeePoolUpdated(address)'(newFeePool?: null): FeePoolUpdatedEventFilter;
    FeePoolUpdated(newFeePool?: null): FeePoolUpdatedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'SynthetixUpdated(address)'(newSynthetix?: null): SynthetixUpdatedEventFilter;
    SynthetixUpdated(newSynthetix?: null): SynthetixUpdatedEventFilter;

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
  };

  estimateGas: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feePool(overrides?: CallOverrides): Promise<BigNumber>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<BigNumber>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    feePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNextVestingEntry(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNextVestingIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNextVestingQuantity(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNextVestingTime(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVestingQuantity(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVestingScheduleEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVestingTime(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    synthetix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalEscrowedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalEscrowedBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vest(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
