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
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface SynthetixEscrowAbiTypesInterface extends utils.Interface {
  functions: {
    "MAX_VESTING_ENTRIES()": FunctionFragment;
    "QUANTITY_INDEX()": FunctionFragment;
    "TIME_INDEX()": FunctionFragment;
    "acceptOwnership()": FunctionFragment;
    "addVestingSchedule(address,uint256[],uint256[])": FunctionFragment;
    "appendVestingEntry(address,uint256,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "getNextVestingEntry(address)": FunctionFragment;
    "getNextVestingIndex(address)": FunctionFragment;
    "getNextVestingQuantity(address)": FunctionFragment;
    "getNextVestingTime(address)": FunctionFragment;
    "getVestingQuantity(address,uint256)": FunctionFragment;
    "getVestingScheduleEntry(address,uint256)": FunctionFragment;
    "getVestingTime(address,uint256)": FunctionFragment;
    "nominateNewOwner(address)": FunctionFragment;
    "nominatedOwner()": FunctionFragment;
    "numVestingEntries(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "purgeAccount(address)": FunctionFragment;
    "setSynthetix(address)": FunctionFragment;
    "setupExpiryTime()": FunctionFragment;
    "synthetix()": FunctionFragment;
    "totalVestedAccountBalance(address)": FunctionFragment;
    "totalVestedBalance()": FunctionFragment;
    "vest()": FunctionFragment;
    "vestingSchedules(address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "MAX_VESTING_ENTRIES"
      | "QUANTITY_INDEX"
      | "TIME_INDEX"
      | "acceptOwnership"
      | "addVestingSchedule"
      | "appendVestingEntry"
      | "balanceOf"
      | "getNextVestingEntry"
      | "getNextVestingIndex"
      | "getNextVestingQuantity"
      | "getNextVestingTime"
      | "getVestingQuantity"
      | "getVestingScheduleEntry"
      | "getVestingTime"
      | "nominateNewOwner"
      | "nominatedOwner"
      | "numVestingEntries"
      | "owner"
      | "purgeAccount"
      | "setSynthetix"
      | "setupExpiryTime"
      | "synthetix"
      | "totalVestedAccountBalance"
      | "totalVestedBalance"
      | "vest"
      | "vestingSchedules"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MAX_VESTING_ENTRIES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "QUANTITY_INDEX",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TIME_INDEX",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addVestingSchedule",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "appendVestingEntry",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextVestingEntry",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextVestingIndex",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextVestingQuantity",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextVestingTime",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVestingQuantity",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVestingScheduleEntry",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVestingTime",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "nominateNewOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "nominatedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numVestingEntries",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purgeAccount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSynthetix",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setupExpiryTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "synthetix", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalVestedAccountBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalVestedBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vest", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "vestingSchedules",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_VESTING_ENTRIES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "QUANTITY_INDEX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TIME_INDEX", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addVestingSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "appendVestingEntry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNextVestingEntry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextVestingIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextVestingQuantity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextVestingTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVestingQuantity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVestingScheduleEntry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVestingTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominateNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominatedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numVestingEntries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purgeAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSynthetix",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setupExpiryTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "synthetix", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalVestedAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalVestedBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "vestingSchedules",
    data: BytesLike
  ): Result;

  events: {
    "OwnerChanged(address,address)": EventFragment;
    "OwnerNominated(address)": EventFragment;
    "SynthetixUpdated(address)": EventFragment;
    "Vested(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SynthetixUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Vested"): EventFragment;
}

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<
  [string, string],
  OwnerChangedEventObject
>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<
  [string],
  OwnerNominatedEventObject
>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface SynthetixUpdatedEventObject {
  newSynthetix: string;
}
export type SynthetixUpdatedEvent = TypedEvent<
  [string],
  SynthetixUpdatedEventObject
>;

export type SynthetixUpdatedEventFilter =
  TypedEventFilter<SynthetixUpdatedEvent>;

export interface VestedEventObject {
  beneficiary: string;
  time: BigNumber;
  value: BigNumber;
}
export type VestedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  VestedEventObject
>;

export type VestedEventFilter = TypedEventFilter<VestedEvent>;

export interface SynthetixEscrowAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SynthetixEscrowAbiTypesInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<[BigNumber]>;

    QUANTITY_INDEX(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIME_INDEX(overrides?: CallOverrides): Promise<[BigNumber]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addVestingSchedule(
      account: PromiseOrValue<string>,
      times: PromiseOrValue<BigNumberish>[],
      quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

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

    purgeAccount(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setupExpiryTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    synthetix(overrides?: CallOverrides): Promise<[string]>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalVestedBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    vest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

  QUANTITY_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

  TIME_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addVestingSchedule(
    account: PromiseOrValue<string>,
    times: PromiseOrValue<BigNumberish>[],
    quantities: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  appendVestingEntry(
    account: PromiseOrValue<string>,
    time: PromiseOrValue<BigNumberish>,
    quantity: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

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

  numVestingEntries(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  purgeAccount(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSynthetix(
    _synthetix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setupExpiryTime(overrides?: CallOverrides): Promise<BigNumber>;

  synthetix(overrides?: CallOverrides): Promise<string>;

  totalVestedAccountBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalVestedBalance(overrides?: CallOverrides): Promise<BigNumber>;

  vest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  vestingSchedules(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    QUANTITY_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    addVestingSchedule(
      account: PromiseOrValue<string>,
      times: PromiseOrValue<BigNumberish>[],
      quantities: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    numVestingEntries(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    purgeAccount(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setupExpiryTime(overrides?: CallOverrides): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<string>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVestedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    vest(overrides?: CallOverrides): Promise<void>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "OwnerChanged(address,address)"(
      oldOwner?: null,
      newOwner?: null
    ): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    "SynthetixUpdated(address)"(
      newSynthetix?: null
    ): SynthetixUpdatedEventFilter;
    SynthetixUpdated(newSynthetix?: null): SynthetixUpdatedEventFilter;

    "Vested(address,uint256,uint256)"(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestedEventFilter;
    Vested(
      beneficiary?: PromiseOrValue<string> | null,
      time?: null,
      value?: null
    ): VestedEventFilter;
  };

  estimateGas: {
    MAX_VESTING_ENTRIES(overrides?: CallOverrides): Promise<BigNumber>;

    QUANTITY_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addVestingSchedule(
      account: PromiseOrValue<string>,
      times: PromiseOrValue<BigNumberish>[],
      quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    purgeAccount(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setupExpiryTime(overrides?: CallOverrides): Promise<BigNumber>;

    synthetix(overrides?: CallOverrides): Promise<BigNumber>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalVestedBalance(overrides?: CallOverrides): Promise<BigNumber>;

    vest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_VESTING_ENTRIES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    QUANTITY_INDEX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIME_INDEX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addVestingSchedule(
      account: PromiseOrValue<string>,
      times: PromiseOrValue<BigNumberish>[],
      quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    appendVestingEntry(
      account: PromiseOrValue<string>,
      time: PromiseOrValue<BigNumberish>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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

    purgeAccount(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSynthetix(
      _synthetix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setupExpiryTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    synthetix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalVestedAccountBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalVestedBalance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    vestingSchedules(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
