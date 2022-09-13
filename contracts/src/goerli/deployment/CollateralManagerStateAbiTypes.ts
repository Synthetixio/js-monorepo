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

export interface CollateralManagerStateAbiTypesInterface
  extends utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "addShortCurrency(bytes32)": FunctionFragment;
    "associatedContract()": FunctionFragment;
    "borrowRates(uint256)": FunctionFragment;
    "borrowRatesLastUpdated()": FunctionFragment;
    "decrementLongs(bytes32,uint256)": FunctionFragment;
    "decrementShorts(bytes32,uint256)": FunctionFragment;
    "getRateAt(uint256)": FunctionFragment;
    "getRatesAndTime(uint256)": FunctionFragment;
    "getRatesLength()": FunctionFragment;
    "getShortRatesAndTime(bytes32,uint256)": FunctionFragment;
    "getShortRatesLength(bytes32)": FunctionFragment;
    "incrementLongs(bytes32,uint256)": FunctionFragment;
    "incrementShorts(bytes32,uint256)": FunctionFragment;
    "incrementTotalLoans()": FunctionFragment;
    "long(bytes32)": FunctionFragment;
    "nominateNewOwner(address)": FunctionFragment;
    "nominatedOwner()": FunctionFragment;
    "owner()": FunctionFragment;
    "ratesLastUpdated()": FunctionFragment;
    "removeShortCurrency(bytes32)": FunctionFragment;
    "setAssociatedContract(address)": FunctionFragment;
    "short(bytes32)": FunctionFragment;
    "shortRates(bytes32,uint256)": FunctionFragment;
    "shortRatesLastUpdated(bytes32)": FunctionFragment;
    "totalIssuedSynths(bytes32)": FunctionFragment;
    "totalLoans()": FunctionFragment;
    "updateBorrowRates(uint256)": FunctionFragment;
    "updateShortRates(bytes32,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptOwnership"
      | "addShortCurrency"
      | "associatedContract"
      | "borrowRates"
      | "borrowRatesLastUpdated"
      | "decrementLongs"
      | "decrementShorts"
      | "getRateAt"
      | "getRatesAndTime"
      | "getRatesLength"
      | "getShortRatesAndTime"
      | "getShortRatesLength"
      | "incrementLongs"
      | "incrementShorts"
      | "incrementTotalLoans"
      | "long"
      | "nominateNewOwner"
      | "nominatedOwner"
      | "owner"
      | "ratesLastUpdated"
      | "removeShortCurrency"
      | "setAssociatedContract"
      | "short"
      | "shortRates"
      | "shortRatesLastUpdated"
      | "totalIssuedSynths"
      | "totalLoans"
      | "updateBorrowRates"
      | "updateShortRates"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addShortCurrency",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "associatedContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "borrowRates",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowRatesLastUpdated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decrementLongs",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "decrementShorts",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRateAt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRatesAndTime",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRatesLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getShortRatesAndTime",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getShortRatesLength",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "incrementLongs",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "incrementShorts",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "incrementTotalLoans",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "long",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "nominateNewOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "nominatedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ratesLastUpdated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeShortCurrency",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setAssociatedContract",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "short",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "shortRates",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "shortRatesLastUpdated",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalIssuedSynths",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalLoans",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateBorrowRates",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateShortRates",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addShortCurrency",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "associatedContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowRates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowRatesLastUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decrementLongs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decrementShorts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRateAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRatesAndTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRatesLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getShortRatesAndTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getShortRatesLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "incrementLongs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "incrementShorts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "incrementTotalLoans",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "long", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nominateNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nominatedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ratesLastUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeShortCurrency",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssociatedContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "short", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "shortRates", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "shortRatesLastUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalIssuedSynths",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalLoans", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateBorrowRates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateShortRates",
    data: BytesLike
  ): Result;

  events: {
    "AssociatedContractUpdated(address)": EventFragment;
    "OwnerChanged(address,address)": EventFragment;
    "OwnerNominated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssociatedContractUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
}

export interface AssociatedContractUpdatedEventObject {
  associatedContract: string;
}
export type AssociatedContractUpdatedEvent = TypedEvent<
  [string],
  AssociatedContractUpdatedEventObject
>;

export type AssociatedContractUpdatedEventFilter =
  TypedEventFilter<AssociatedContractUpdatedEvent>;

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

export interface CollateralManagerStateAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CollateralManagerStateAbiTypesInterface;

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
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    associatedContract(overrides?: CallOverrides): Promise<[string]>;

    borrowRates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    borrowRatesLastUpdated(overrides?: CallOverrides): Promise<[BigNumber]>;

    decrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    decrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getRateAt(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRatesAndTime(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        entryRate: BigNumber;
        lastRate: BigNumber;
        lastUpdated: BigNumber;
        newIndex: BigNumber;
      }
    >;

    getRatesLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    getShortRatesAndTime(
      currency: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        entryRate: BigNumber;
        lastRate: BigNumber;
        lastUpdated: BigNumber;
        newIndex: BigNumber;
      }
    >;

    getShortRatesLength(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    incrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    incrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    incrementTotalLoans(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    long(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ratesLastUpdated(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    short(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    shortRates(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    shortRatesLastUpdated(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalIssuedSynths(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

    totalLoans(overrides?: CallOverrides): Promise<[BigNumber]>;

    updateBorrowRates(
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateShortRates(
      currency: PromiseOrValue<BytesLike>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addShortCurrency(
    currency: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  associatedContract(overrides?: CallOverrides): Promise<string>;

  borrowRates(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  borrowRatesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

  decrementLongs(
    synth: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  decrementShorts(
    synth: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getRateAt(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRatesAndTime(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      entryRate: BigNumber;
      lastRate: BigNumber;
      lastUpdated: BigNumber;
      newIndex: BigNumber;
    }
  >;

  getRatesLength(overrides?: CallOverrides): Promise<BigNumber>;

  getShortRatesAndTime(
    currency: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      entryRate: BigNumber;
      lastRate: BigNumber;
      lastUpdated: BigNumber;
      newIndex: BigNumber;
    }
  >;

  getShortRatesLength(
    currency: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  incrementLongs(
    synth: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  incrementShorts(
    synth: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  incrementTotalLoans(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  long(
    synth: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  ratesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

  removeShortCurrency(
    currency: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAssociatedContract(
    _associatedContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  short(
    synth: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  shortRates(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  shortRatesLastUpdated(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalIssuedSynths(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

  totalLoans(overrides?: CallOverrides): Promise<BigNumber>;

  updateBorrowRates(
    rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateShortRates(
    currency: PromiseOrValue<BytesLike>,
    rate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    addShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    associatedContract(overrides?: CallOverrides): Promise<string>;

    borrowRates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowRatesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

    decrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    decrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getRateAt(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRatesAndTime(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        entryRate: BigNumber;
        lastRate: BigNumber;
        lastUpdated: BigNumber;
        newIndex: BigNumber;
      }
    >;

    getRatesLength(overrides?: CallOverrides): Promise<BigNumber>;

    getShortRatesAndTime(
      currency: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        entryRate: BigNumber;
        lastRate: BigNumber;
        lastUpdated: BigNumber;
        newIndex: BigNumber;
      }
    >;

    getShortRatesLength(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    incrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    incrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    incrementTotalLoans(overrides?: CallOverrides): Promise<BigNumber>;

    long(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    ratesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

    removeShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    short(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    shortRates(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    shortRatesLastUpdated(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalIssuedSynths(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { long: BigNumber; short: BigNumber }>;

    totalLoans(overrides?: CallOverrides): Promise<BigNumber>;

    updateBorrowRates(
      rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateShortRates(
      currency: PromiseOrValue<BytesLike>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssociatedContractUpdated(address)"(
      associatedContract?: null
    ): AssociatedContractUpdatedEventFilter;
    AssociatedContractUpdated(
      associatedContract?: null
    ): AssociatedContractUpdatedEventFilter;

    "OwnerChanged(address,address)"(
      oldOwner?: null,
      newOwner?: null
    ): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    associatedContract(overrides?: CallOverrides): Promise<BigNumber>;

    borrowRates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowRatesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

    decrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    decrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getRateAt(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRatesAndTime(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRatesLength(overrides?: CallOverrides): Promise<BigNumber>;

    getShortRatesAndTime(
      currency: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getShortRatesLength(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    incrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    incrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    incrementTotalLoans(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    long(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ratesLastUpdated(overrides?: CallOverrides): Promise<BigNumber>;

    removeShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    short(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    shortRates(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    shortRatesLastUpdated(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalIssuedSynths(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalLoans(overrides?: CallOverrides): Promise<BigNumber>;

    updateBorrowRates(
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateShortRates(
      currency: PromiseOrValue<BytesLike>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    associatedContract(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowRates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowRatesLastUpdated(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    decrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getRateAt(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRatesAndTime(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRatesLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getShortRatesAndTime(
      currency: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getShortRatesLength(
      currency: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    incrementLongs(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    incrementShorts(
      synth: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    incrementTotalLoans(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    long(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ratesLastUpdated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeShortCurrency(
      currency: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAssociatedContract(
      _associatedContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    short(
      synth: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    shortRates(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    shortRatesLastUpdated(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalIssuedSynths(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalLoans(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateBorrowRates(
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateShortRates(
      currency: PromiseOrValue<BytesLike>,
      rate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
