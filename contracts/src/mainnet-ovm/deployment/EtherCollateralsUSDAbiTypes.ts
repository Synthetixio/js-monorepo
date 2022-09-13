/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface EtherCollateralsUSDAbiTypesInterface extends utils.Interface {
  functions: {
    "totalIssuedSynths()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "totalIssuedSynths"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "totalIssuedSynths",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "totalIssuedSynths",
    data: BytesLike
  ): Result;

  events: {};
}

export interface EtherCollateralsUSDAbiTypes extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EtherCollateralsUSDAbiTypesInterface;

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
    totalIssuedSynths(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    totalIssuedSynths(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    totalIssuedSynths(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
