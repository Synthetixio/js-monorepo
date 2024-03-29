// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FeePoolState';
export const address = '0x11164F6a47C3f8472D19b9aDd516Fc780cb7Ee02';
export const source = 'FeePoolState';
export const abi = [
  'function nominateNewOwner(address _owner)',
  'function initiationTime() view returns (uint256)',
  'function setFeePool(address _feePool)',
  'function setSelfDestructBeneficiary(address _beneficiary)',
  'function terminateSelfDestruct()',
  'function importIssuerData(address[] accounts, uint256[] ratios, uint256 periodToInsert, uint256 feePeriodCloseIndex)',
  'function nominatedOwner() view returns (address)',
  'function acceptOwnership()',
  'function accountIssuanceLedger(address, uint256) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function owner() view returns (address)',
  'function appendAccountIssuanceRecord(address account, uint256 debtRatio, uint256 debtEntryIndex, uint256 currentPeriodStartDebtIndex)',
  'function selfDestruct()',
  'function SELFDESTRUCT_DELAY() view returns (uint256)',
  'function feePool() view returns (address)',
  'function getAccountsDebtEntry(address account, uint256 index) view returns (uint256 debtPercentage, uint256 debtEntryIndex)',
  'function selfDestructInitiated() view returns (bool)',
  'function initiateSelfDestruct()',
  'function selfDestructBeneficiary() view returns (address)',
  'function FEE_PERIOD_LENGTH() view returns (uint8)',
  'function applicableIssuanceData(address account, uint256 closingDebtIndex) view returns (uint256, uint256)',
  'constructor(address _owner, address _feePool)',
  'event IssuanceDebtRatioEntry(address indexed account, uint256 debtRatio, uint256 feePeriodCloseIndex)',
  'event SelfDestructTerminated()',
  'event SelfDestructed(address beneficiary)',
  'event SelfDestructInitiated(uint256 selfDestructDelay)',
  'event SelfDestructBeneficiaryUpdated(address newBeneficiary)',
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

export interface FeePoolStateInterface extends utils.Interface {
  functions: {
    'nominateNewOwner(address)': FunctionFragment;
    'initiationTime()': FunctionFragment;
    'setFeePool(address)': FunctionFragment;
    'setSelfDestructBeneficiary(address)': FunctionFragment;
    'terminateSelfDestruct()': FunctionFragment;
    'importIssuerData(address[],uint256[],uint256,uint256)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'acceptOwnership()': FunctionFragment;
    'accountIssuanceLedger(address,uint256)': FunctionFragment;
    'owner()': FunctionFragment;
    'appendAccountIssuanceRecord(address,uint256,uint256,uint256)': FunctionFragment;
    'selfDestruct()': FunctionFragment;
    'SELFDESTRUCT_DELAY()': FunctionFragment;
    'feePool()': FunctionFragment;
    'getAccountsDebtEntry(address,uint256)': FunctionFragment;
    'selfDestructInitiated()': FunctionFragment;
    'initiateSelfDestruct()': FunctionFragment;
    'selfDestructBeneficiary()': FunctionFragment;
    'FEE_PERIOD_LENGTH()': FunctionFragment;
    'applicableIssuanceData(address,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'nominateNewOwner'
      | 'initiationTime'
      | 'setFeePool'
      | 'setSelfDestructBeneficiary'
      | 'terminateSelfDestruct'
      | 'importIssuerData'
      | 'nominatedOwner'
      | 'acceptOwnership'
      | 'accountIssuanceLedger'
      | 'owner'
      | 'appendAccountIssuanceRecord'
      | 'selfDestruct'
      | 'SELFDESTRUCT_DELAY'
      | 'feePool'
      | 'getAccountsDebtEntry'
      | 'selfDestructInitiated'
      | 'initiateSelfDestruct'
      | 'selfDestructBeneficiary'
      | 'FEE_PERIOD_LENGTH'
      | 'applicableIssuanceData'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'initiationTime', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setFeePool', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'setSelfDestructBeneficiary',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'terminateSelfDestruct', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'importIssuerData',
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'accountIssuanceLedger',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'appendAccountIssuanceRecord',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'selfDestruct', values?: undefined): string;
  encodeFunctionData(functionFragment: 'SELFDESTRUCT_DELAY', values?: undefined): string;
  encodeFunctionData(functionFragment: 'feePool', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getAccountsDebtEntry',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'selfDestructInitiated', values?: undefined): string;
  encodeFunctionData(functionFragment: 'initiateSelfDestruct', values?: undefined): string;
  encodeFunctionData(functionFragment: 'selfDestructBeneficiary', values?: undefined): string;
  encodeFunctionData(functionFragment: 'FEE_PERIOD_LENGTH', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'applicableIssuanceData',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initiationTime', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setSelfDestructBeneficiary', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'terminateSelfDestruct', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'importIssuerData', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'accountIssuanceLedger', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'appendAccountIssuanceRecord', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'selfDestruct', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'SELFDESTRUCT_DELAY', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'feePool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountsDebtEntry', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'selfDestructInitiated', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initiateSelfDestruct', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'selfDestructBeneficiary', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'FEE_PERIOD_LENGTH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'applicableIssuanceData', data: BytesLike): Result;

  events: {
    'IssuanceDebtRatioEntry(address,uint256,uint256)': EventFragment;
    'SelfDestructTerminated()': EventFragment;
    'SelfDestructed(address)': EventFragment;
    'SelfDestructInitiated(uint256)': EventFragment;
    'SelfDestructBeneficiaryUpdated(address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'OwnerChanged(address,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'IssuanceDebtRatioEntry'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SelfDestructTerminated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SelfDestructed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SelfDestructInitiated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SelfDestructBeneficiaryUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
}

export interface IssuanceDebtRatioEntryEventObject {
  account: string;
  debtRatio: BigNumber;
  feePeriodCloseIndex: BigNumber;
}
export type IssuanceDebtRatioEntryEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  IssuanceDebtRatioEntryEventObject
>;

export type IssuanceDebtRatioEntryEventFilter = TypedEventFilter<IssuanceDebtRatioEntryEvent>;

export interface SelfDestructTerminatedEventObject {}
export type SelfDestructTerminatedEvent = TypedEvent<[], SelfDestructTerminatedEventObject>;

export type SelfDestructTerminatedEventFilter = TypedEventFilter<SelfDestructTerminatedEvent>;

export interface SelfDestructedEventObject {
  beneficiary: string;
}
export type SelfDestructedEvent = TypedEvent<[string], SelfDestructedEventObject>;

export type SelfDestructedEventFilter = TypedEventFilter<SelfDestructedEvent>;

export interface SelfDestructInitiatedEventObject {
  selfDestructDelay: BigNumber;
}
export type SelfDestructInitiatedEvent = TypedEvent<[BigNumber], SelfDestructInitiatedEventObject>;

export type SelfDestructInitiatedEventFilter = TypedEventFilter<SelfDestructInitiatedEvent>;

export interface SelfDestructBeneficiaryUpdatedEventObject {
  newBeneficiary: string;
}
export type SelfDestructBeneficiaryUpdatedEvent = TypedEvent<
  [string],
  SelfDestructBeneficiaryUpdatedEventObject
>;

export type SelfDestructBeneficiaryUpdatedEventFilter =
  TypedEventFilter<SelfDestructBeneficiaryUpdatedEvent>;

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

export interface FeePoolState extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FeePoolStateInterface;

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

    initiationTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSelfDestructBeneficiary(
      _beneficiary: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    terminateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    importIssuerData(
      accounts: PromiseOrValue<string>[],
      ratios: PromiseOrValue<BigNumberish>[],
      periodToInsert: PromiseOrValue<BigNumberish>,
      feePeriodCloseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    accountIssuanceLedger(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    appendAccountIssuanceRecord(
      account: PromiseOrValue<string>,
      debtRatio: PromiseOrValue<BigNumberish>,
      debtEntryIndex: PromiseOrValue<BigNumberish>,
      currentPeriodStartDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    selfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    SELFDESTRUCT_DELAY(overrides?: CallOverrides): Promise<[BigNumber]>;

    feePool(overrides?: CallOverrides): Promise<[string]>;

    getAccountsDebtEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

    selfDestructInitiated(overrides?: CallOverrides): Promise<[boolean]>;

    initiateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    selfDestructBeneficiary(overrides?: CallOverrides): Promise<[string]>;

    FEE_PERIOD_LENGTH(overrides?: CallOverrides): Promise<[number]>;

    applicableIssuanceData(
      account: PromiseOrValue<string>,
      closingDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;
  };

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initiationTime(overrides?: CallOverrides): Promise<BigNumber>;

  setFeePool(
    _feePool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSelfDestructBeneficiary(
    _beneficiary: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  terminateSelfDestruct(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  importIssuerData(
    accounts: PromiseOrValue<string>[],
    ratios: PromiseOrValue<BigNumberish>[],
    periodToInsert: PromiseOrValue<BigNumberish>,
    feePeriodCloseIndex: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  accountIssuanceLedger(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

  owner(overrides?: CallOverrides): Promise<string>;

  appendAccountIssuanceRecord(
    account: PromiseOrValue<string>,
    debtRatio: PromiseOrValue<BigNumberish>,
    debtEntryIndex: PromiseOrValue<BigNumberish>,
    currentPeriodStartDebtIndex: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  selfDestruct(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  SELFDESTRUCT_DELAY(overrides?: CallOverrides): Promise<BigNumber>;

  feePool(overrides?: CallOverrides): Promise<string>;

  getAccountsDebtEntry(
    account: PromiseOrValue<string>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

  selfDestructInitiated(overrides?: CallOverrides): Promise<boolean>;

  initiateSelfDestruct(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  selfDestructBeneficiary(overrides?: CallOverrides): Promise<string>;

  FEE_PERIOD_LENGTH(overrides?: CallOverrides): Promise<number>;

  applicableIssuanceData(
    account: PromiseOrValue<string>,
    closingDebtIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  callStatic: {
    nominateNewOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    initiationTime(overrides?: CallOverrides): Promise<BigNumber>;

    setFeePool(_feePool: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setSelfDestructBeneficiary(
      _beneficiary: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    terminateSelfDestruct(overrides?: CallOverrides): Promise<void>;

    importIssuerData(
      accounts: PromiseOrValue<string>[],
      ratios: PromiseOrValue<BigNumberish>[],
      periodToInsert: PromiseOrValue<BigNumberish>,
      feePeriodCloseIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    accountIssuanceLedger(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

    owner(overrides?: CallOverrides): Promise<string>;

    appendAccountIssuanceRecord(
      account: PromiseOrValue<string>,
      debtRatio: PromiseOrValue<BigNumberish>,
      debtEntryIndex: PromiseOrValue<BigNumberish>,
      currentPeriodStartDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    selfDestruct(overrides?: CallOverrides): Promise<void>;

    SELFDESTRUCT_DELAY(overrides?: CallOverrides): Promise<BigNumber>;

    feePool(overrides?: CallOverrides): Promise<string>;

    getAccountsDebtEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { debtPercentage: BigNumber; debtEntryIndex: BigNumber }>;

    selfDestructInitiated(overrides?: CallOverrides): Promise<boolean>;

    initiateSelfDestruct(overrides?: CallOverrides): Promise<void>;

    selfDestructBeneficiary(overrides?: CallOverrides): Promise<string>;

    FEE_PERIOD_LENGTH(overrides?: CallOverrides): Promise<number>;

    applicableIssuanceData(
      account: PromiseOrValue<string>,
      closingDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;
  };

  filters: {
    'IssuanceDebtRatioEntry(address,uint256,uint256)'(
      account?: PromiseOrValue<string> | null,
      debtRatio?: null,
      feePeriodCloseIndex?: null
    ): IssuanceDebtRatioEntryEventFilter;
    IssuanceDebtRatioEntry(
      account?: PromiseOrValue<string> | null,
      debtRatio?: null,
      feePeriodCloseIndex?: null
    ): IssuanceDebtRatioEntryEventFilter;

    'SelfDestructTerminated()'(): SelfDestructTerminatedEventFilter;
    SelfDestructTerminated(): SelfDestructTerminatedEventFilter;

    'SelfDestructed(address)'(beneficiary?: null): SelfDestructedEventFilter;
    SelfDestructed(beneficiary?: null): SelfDestructedEventFilter;

    'SelfDestructInitiated(uint256)'(selfDestructDelay?: null): SelfDestructInitiatedEventFilter;
    SelfDestructInitiated(selfDestructDelay?: null): SelfDestructInitiatedEventFilter;

    'SelfDestructBeneficiaryUpdated(address)'(
      newBeneficiary?: null
    ): SelfDestructBeneficiaryUpdatedEventFilter;
    SelfDestructBeneficiaryUpdated(
      newBeneficiary?: null
    ): SelfDestructBeneficiaryUpdatedEventFilter;

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

    initiationTime(overrides?: CallOverrides): Promise<BigNumber>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSelfDestructBeneficiary(
      _beneficiary: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    terminateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    importIssuerData(
      accounts: PromiseOrValue<string>[],
      ratios: PromiseOrValue<BigNumberish>[],
      periodToInsert: PromiseOrValue<BigNumberish>,
      feePeriodCloseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    accountIssuanceLedger(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    appendAccountIssuanceRecord(
      account: PromiseOrValue<string>,
      debtRatio: PromiseOrValue<BigNumberish>,
      debtEntryIndex: PromiseOrValue<BigNumberish>,
      currentPeriodStartDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    selfDestruct(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    SELFDESTRUCT_DELAY(overrides?: CallOverrides): Promise<BigNumber>;

    feePool(overrides?: CallOverrides): Promise<BigNumber>;

    getAccountsDebtEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    selfDestructInitiated(overrides?: CallOverrides): Promise<BigNumber>;

    initiateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    selfDestructBeneficiary(overrides?: CallOverrides): Promise<BigNumber>;

    FEE_PERIOD_LENGTH(overrides?: CallOverrides): Promise<BigNumber>;

    applicableIssuanceData(
      account: PromiseOrValue<string>,
      closingDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initiationTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setFeePool(
      _feePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSelfDestructBeneficiary(
      _beneficiary: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    terminateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    importIssuerData(
      accounts: PromiseOrValue<string>[],
      ratios: PromiseOrValue<BigNumberish>[],
      periodToInsert: PromiseOrValue<BigNumberish>,
      feePeriodCloseIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    accountIssuanceLedger(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    appendAccountIssuanceRecord(
      account: PromiseOrValue<string>,
      debtRatio: PromiseOrValue<BigNumberish>,
      debtEntryIndex: PromiseOrValue<BigNumberish>,
      currentPeriodStartDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    selfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    SELFDESTRUCT_DELAY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAccountsDebtEntry(
      account: PromiseOrValue<string>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    selfDestructInitiated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initiateSelfDestruct(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    selfDestructBeneficiary(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FEE_PERIOD_LENGTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    applicableIssuanceData(
      account: PromiseOrValue<string>,
      closingDebtIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
