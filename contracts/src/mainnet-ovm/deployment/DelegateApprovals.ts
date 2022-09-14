// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'DelegateApprovals';
export const address = '0x2A23bc0EA97A89abD91214E8e4d20F02Fe14743f';
export const source = 'DelegateApprovals';
export const abi = [
  'constructor(address _owner, address _eternalStorage)',
  'event Approval(address indexed authoriser, address delegate, bytes32 action)',
  'event EternalStorageUpdated(address newEternalStorage)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event WithdrawApproval(address indexed authoriser, address delegate, bytes32 action)',
  'function APPROVE_ALL() view returns (bytes32)',
  'function BURN_FOR_ADDRESS() view returns (bytes32)',
  'function CLAIM_FOR_ADDRESS() view returns (bytes32)',
  'function EXCHANGE_FOR_ADDRESS() view returns (bytes32)',
  'function ISSUE_FOR_ADDRESS() view returns (bytes32)',
  'function acceptOwnership()',
  'function approveAllDelegatePowers(address delegate)',
  'function approveBurnOnBehalf(address delegate)',
  'function approveClaimOnBehalf(address delegate)',
  'function approveExchangeOnBehalf(address delegate)',
  'function approveIssueOnBehalf(address delegate)',
  'function approvedAll(address authoriser, address delegate) view returns (bool)',
  'function canBurnFor(address authoriser, address delegate) view returns (bool)',
  'function canClaimFor(address authoriser, address delegate) view returns (bool)',
  'function canExchangeFor(address authoriser, address delegate) view returns (bool)',
  'function canIssueFor(address authoriser, address delegate) view returns (bool)',
  'function eternalStorage() view returns (address)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function removeAllDelegatePowers(address delegate)',
  'function removeBurnOnBehalf(address delegate)',
  'function removeClaimOnBehalf(address delegate)',
  'function removeExchangeOnBehalf(address delegate)',
  'function removeIssueOnBehalf(address delegate)',
  'function setEternalStorage(address _eternalStorage)',
];
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface DelegateApprovalsInterface extends utils.Interface {
  functions: {
    'APPROVE_ALL()': FunctionFragment;
    'BURN_FOR_ADDRESS()': FunctionFragment;
    'CLAIM_FOR_ADDRESS()': FunctionFragment;
    'EXCHANGE_FOR_ADDRESS()': FunctionFragment;
    'ISSUE_FOR_ADDRESS()': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'approveAllDelegatePowers(address)': FunctionFragment;
    'approveBurnOnBehalf(address)': FunctionFragment;
    'approveClaimOnBehalf(address)': FunctionFragment;
    'approveExchangeOnBehalf(address)': FunctionFragment;
    'approveIssueOnBehalf(address)': FunctionFragment;
    'approvedAll(address,address)': FunctionFragment;
    'canBurnFor(address,address)': FunctionFragment;
    'canClaimFor(address,address)': FunctionFragment;
    'canExchangeFor(address,address)': FunctionFragment;
    'canIssueFor(address,address)': FunctionFragment;
    'eternalStorage()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'removeAllDelegatePowers(address)': FunctionFragment;
    'removeBurnOnBehalf(address)': FunctionFragment;
    'removeClaimOnBehalf(address)': FunctionFragment;
    'removeExchangeOnBehalf(address)': FunctionFragment;
    'removeIssueOnBehalf(address)': FunctionFragment;
    'setEternalStorage(address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'APPROVE_ALL'
      | 'BURN_FOR_ADDRESS'
      | 'CLAIM_FOR_ADDRESS'
      | 'EXCHANGE_FOR_ADDRESS'
      | 'ISSUE_FOR_ADDRESS'
      | 'acceptOwnership'
      | 'approveAllDelegatePowers'
      | 'approveBurnOnBehalf'
      | 'approveClaimOnBehalf'
      | 'approveExchangeOnBehalf'
      | 'approveIssueOnBehalf'
      | 'approvedAll'
      | 'canBurnFor'
      | 'canClaimFor'
      | 'canExchangeFor'
      | 'canIssueFor'
      | 'eternalStorage'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'removeAllDelegatePowers'
      | 'removeBurnOnBehalf'
      | 'removeClaimOnBehalf'
      | 'removeExchangeOnBehalf'
      | 'removeIssueOnBehalf'
      | 'setEternalStorage'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'APPROVE_ALL', values?: undefined): string;
  encodeFunctionData(functionFragment: 'BURN_FOR_ADDRESS', values?: undefined): string;
  encodeFunctionData(functionFragment: 'CLAIM_FOR_ADDRESS', values?: undefined): string;
  encodeFunctionData(functionFragment: 'EXCHANGE_FOR_ADDRESS', values?: undefined): string;
  encodeFunctionData(functionFragment: 'ISSUE_FOR_ADDRESS', values?: undefined): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'approveAllDelegatePowers',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approveBurnOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approveClaimOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approveExchangeOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approveIssueOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'approvedAll',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'canBurnFor',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'canClaimFor',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'canExchangeFor',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'canIssueFor',
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'eternalStorage', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'removeAllDelegatePowers',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeBurnOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeClaimOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeExchangeOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeIssueOnBehalf',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setEternalStorage',
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: 'APPROVE_ALL', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'BURN_FOR_ADDRESS', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'CLAIM_FOR_ADDRESS', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'EXCHANGE_FOR_ADDRESS', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'ISSUE_FOR_ADDRESS', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approveAllDelegatePowers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approveBurnOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approveClaimOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approveExchangeOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approveIssueOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approvedAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canBurnFor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canClaimFor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canExchangeFor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'canIssueFor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'eternalStorage', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeAllDelegatePowers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeBurnOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeClaimOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeExchangeOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeIssueOnBehalf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setEternalStorage', data: BytesLike): Result;

  events: {
    'Approval(address,address,bytes32)': EventFragment;
    'EternalStorageUpdated(address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'WithdrawApproval(address,address,bytes32)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'EternalStorageUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'WithdrawApproval'): EventFragment;
}

export interface ApprovalEventObject {
  authoriser: string;
  delegate: string;
  action: string;
}
export type ApprovalEvent = TypedEvent<[string, string, string], ApprovalEventObject>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface EternalStorageUpdatedEventObject {
  newEternalStorage: string;
}
export type EternalStorageUpdatedEvent = TypedEvent<[string], EternalStorageUpdatedEventObject>;

export type EternalStorageUpdatedEventFilter = TypedEventFilter<EternalStorageUpdatedEvent>;

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

export interface WithdrawApprovalEventObject {
  authoriser: string;
  delegate: string;
  action: string;
}
export type WithdrawApprovalEvent = TypedEvent<
  [string, string, string],
  WithdrawApprovalEventObject
>;

export type WithdrawApprovalEventFilter = TypedEventFilter<WithdrawApprovalEvent>;

export interface DelegateApprovals extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DelegateApprovalsInterface;

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
    APPROVE_ALL(overrides?: CallOverrides): Promise<[string]>;

    BURN_FOR_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    CLAIM_FOR_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    EXCHANGE_FOR_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    ISSUE_FOR_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approvedAll(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    canBurnFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    canClaimFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    canExchangeFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    canIssueFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    eternalStorage(overrides?: CallOverrides): Promise<[string]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setEternalStorage(
      _eternalStorage: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  APPROVE_ALL(overrides?: CallOverrides): Promise<string>;

  BURN_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

  CLAIM_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

  EXCHANGE_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

  ISSUE_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveAllDelegatePowers(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveBurnOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveClaimOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveExchangeOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveIssueOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approvedAll(
    authoriser: PromiseOrValue<string>,
    delegate: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  canBurnFor(
    authoriser: PromiseOrValue<string>,
    delegate: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  canClaimFor(
    authoriser: PromiseOrValue<string>,
    delegate: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  canExchangeFor(
    authoriser: PromiseOrValue<string>,
    delegate: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  canIssueFor(
    authoriser: PromiseOrValue<string>,
    delegate: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  eternalStorage(overrides?: CallOverrides): Promise<string>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeAllDelegatePowers(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeBurnOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeClaimOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeExchangeOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeIssueOnBehalf(
    delegate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setEternalStorage(
    _eternalStorage: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    APPROVE_ALL(overrides?: CallOverrides): Promise<string>;

    BURN_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

    CLAIM_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

    EXCHANGE_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

    ISSUE_FOR_ADDRESS(overrides?: CallOverrides): Promise<string>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    approveAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveBurnOnBehalf(delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    approveClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approvedAll(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    canBurnFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    canClaimFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    canExchangeFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    canIssueFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    eternalStorage(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeBurnOnBehalf(delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    removeClaimOnBehalf(delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    removeExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeIssueOnBehalf(delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setEternalStorage(
      _eternalStorage: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    'Approval(address,address,bytes32)'(
      authoriser?: PromiseOrValue<string> | null,
      delegate?: null,
      action?: null
    ): ApprovalEventFilter;
    Approval(
      authoriser?: PromiseOrValue<string> | null,
      delegate?: null,
      action?: null
    ): ApprovalEventFilter;

    'EternalStorageUpdated(address)'(newEternalStorage?: null): EternalStorageUpdatedEventFilter;
    EternalStorageUpdated(newEternalStorage?: null): EternalStorageUpdatedEventFilter;

    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'WithdrawApproval(address,address,bytes32)'(
      authoriser?: PromiseOrValue<string> | null,
      delegate?: null,
      action?: null
    ): WithdrawApprovalEventFilter;
    WithdrawApproval(
      authoriser?: PromiseOrValue<string> | null,
      delegate?: null,
      action?: null
    ): WithdrawApprovalEventFilter;
  };

  estimateGas: {
    APPROVE_ALL(overrides?: CallOverrides): Promise<BigNumber>;

    BURN_FOR_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    CLAIM_FOR_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    EXCHANGE_FOR_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    ISSUE_FOR_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    approveAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approvedAll(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canBurnFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canClaimFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canExchangeFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canIssueFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eternalStorage(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setEternalStorage(
      _eternalStorage: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    APPROVE_ALL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BURN_FOR_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    CLAIM_FOR_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    EXCHANGE_FOR_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ISSUE_FOR_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approvedAll(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canBurnFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canClaimFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canExchangeFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canIssueFor(
      authoriser: PromiseOrValue<string>,
      delegate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eternalStorage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeAllDelegatePowers(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeBurnOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeClaimOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeExchangeOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeIssueOnBehalf(
      delegate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setEternalStorage(
      _eternalStorage: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
