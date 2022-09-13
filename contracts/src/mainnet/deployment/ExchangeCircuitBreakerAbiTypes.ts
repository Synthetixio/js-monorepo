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

export interface ExchangeCircuitBreakerAbiTypesInterface
  extends utils.Interface {
  functions: {
    "CIRCUIT_BREAKER_SUSPENSION_REASON()": FunctionFragment;
    "CONTRACT_NAME()": FunctionFragment;
    "acceptOwnership()": FunctionFragment;
    "exchangeRates()": FunctionFragment;
    "isDeviationAboveThreshold(uint256,uint256)": FunctionFragment;
    "isResolverCached()": FunctionFragment;
    "lastExchangeRate(bytes32)": FunctionFragment;
    "nominateNewOwner(address)": FunctionFragment;
    "nominatedOwner()": FunctionFragment;
    "owner()": FunctionFragment;
    "priceDeviationThresholdFactor()": FunctionFragment;
    "rateWithBreakCircuit(bytes32)": FunctionFragment;
    "rateWithInvalid(bytes32)": FunctionFragment;
    "rebuildCache()": FunctionFragment;
    "resetLastExchangeRate(bytes32[])": FunctionFragment;
    "resolver()": FunctionFragment;
    "resolverAddressesRequired()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CIRCUIT_BREAKER_SUSPENSION_REASON"
      | "CONTRACT_NAME"
      | "acceptOwnership"
      | "exchangeRates"
      | "isDeviationAboveThreshold"
      | "isResolverCached"
      | "lastExchangeRate"
      | "nominateNewOwner"
      | "nominatedOwner"
      | "owner"
      | "priceDeviationThresholdFactor"
      | "rateWithBreakCircuit"
      | "rateWithInvalid"
      | "rebuildCache"
      | "resetLastExchangeRate"
      | "resolver"
      | "resolverAddressesRequired"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CIRCUIT_BREAKER_SUSPENSION_REASON",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_NAME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRates",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isDeviationAboveThreshold",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isResolverCached",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastExchangeRate",
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
    functionFragment: "priceDeviationThresholdFactor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rateWithBreakCircuit",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rateWithInvalid",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rebuildCache",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resetLastExchangeRate",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(functionFragment: "resolver", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "resolverAddressesRequired",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "CIRCUIT_BREAKER_SUSPENSION_REASON",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_NAME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isDeviationAboveThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isResolverCached",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastExchangeRate",
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
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "priceDeviationThresholdFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rateWithBreakCircuit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rateWithInvalid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rebuildCache",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resetLastExchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resolverAddressesRequired",
    data: BytesLike
  ): Result;

  events: {
    "CacheUpdated(bytes32,address)": EventFragment;
    "LastRateOverriden(bytes32,uint256,uint256)": EventFragment;
    "OwnerChanged(address,address)": EventFragment;
    "OwnerNominated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CacheUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LastRateOverriden"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerNominated"): EventFragment;
}

export interface CacheUpdatedEventObject {
  name: string;
  destination: string;
}
export type CacheUpdatedEvent = TypedEvent<
  [string, string],
  CacheUpdatedEventObject
>;

export type CacheUpdatedEventFilter = TypedEventFilter<CacheUpdatedEvent>;

export interface LastRateOverridenEventObject {
  currencyKey: string;
  previousRate: BigNumber;
  newRate: BigNumber;
}
export type LastRateOverridenEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  LastRateOverridenEventObject
>;

export type LastRateOverridenEventFilter =
  TypedEventFilter<LastRateOverridenEvent>;

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

export interface ExchangeCircuitBreakerAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExchangeCircuitBreakerAbiTypesInterface;

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
    CIRCUIT_BREAKER_SUSPENSION_REASON(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    CONTRACT_NAME(overrides?: CallOverrides): Promise<[string]>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exchangeRates(overrides?: CallOverrides): Promise<[string]>;

    isDeviationAboveThreshold(
      base: PromiseOrValue<BigNumberish>,
      comparison: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    lastExchangeRate(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    priceDeviationThresholdFactor(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    rateWithBreakCircuit(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rateWithInvalid(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean]>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resetLastExchangeRate(
      currencyKeys: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses: string[] }>;
  };

  CIRCUIT_BREAKER_SUSPENSION_REASON(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  CONTRACT_NAME(overrides?: CallOverrides): Promise<string>;

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exchangeRates(overrides?: CallOverrides): Promise<string>;

  isDeviationAboveThreshold(
    base: PromiseOrValue<BigNumberish>,
    comparison: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  lastExchangeRate(
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nominateNewOwner(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  priceDeviationThresholdFactor(overrides?: CallOverrides): Promise<BigNumber>;

  rateWithBreakCircuit(
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rateWithInvalid(
    currencyKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean]>;

  rebuildCache(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resetLastExchangeRate(
    currencyKeys: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resolver(overrides?: CallOverrides): Promise<string>;

  resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    CIRCUIT_BREAKER_SUSPENSION_REASON(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    CONTRACT_NAME(overrides?: CallOverrides): Promise<string>;

    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    exchangeRates(overrides?: CallOverrides): Promise<string>;

    isDeviationAboveThreshold(
      base: PromiseOrValue<BigNumberish>,
      comparison: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    lastExchangeRate(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    priceDeviationThresholdFactor(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rateWithBreakCircuit(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        lastValidRate: BigNumber;
        circuitBroken: boolean;
      }
    >;

    rateWithInvalid(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean]>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    resetLastExchangeRate(
      currencyKeys: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {
    "CacheUpdated(bytes32,address)"(
      name?: null,
      destination?: null
    ): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;

    "LastRateOverriden(bytes32,uint256,uint256)"(
      currencyKey?: null,
      previousRate?: null,
      newRate?: null
    ): LastRateOverridenEventFilter;
    LastRateOverriden(
      currencyKey?: null,
      previousRate?: null,
      newRate?: null
    ): LastRateOverridenEventFilter;

    "OwnerChanged(address,address)"(
      oldOwner?: null,
      newOwner?: null
    ): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    "OwnerNominated(address)"(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;
  };

  estimateGas: {
    CIRCUIT_BREAKER_SUSPENSION_REASON(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    CONTRACT_NAME(overrides?: CallOverrides): Promise<BigNumber>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exchangeRates(overrides?: CallOverrides): Promise<BigNumber>;

    isDeviationAboveThreshold(
      base: PromiseOrValue<BigNumberish>,
      comparison: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    lastExchangeRate(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    priceDeviationThresholdFactor(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rateWithBreakCircuit(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rateWithInvalid(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    resetLastExchangeRate(
      currencyKeys: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    CIRCUIT_BREAKER_SUSPENSION_REASON(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exchangeRates(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isDeviationAboveThreshold(
      base: PromiseOrValue<BigNumberish>,
      comparison: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastExchangeRate(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominateNewOwner(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceDeviationThresholdFactor(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rateWithBreakCircuit(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rateWithInvalid(
      currencyKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resetLastExchangeRate(
      currencyKeys: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
