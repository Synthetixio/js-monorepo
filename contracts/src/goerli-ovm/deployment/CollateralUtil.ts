// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'CollateralUtil';
export const address = '0x4BbDe1e5f91e6E8928CdCBF800aC990015387EbA';
export const source = 'CollateralUtil';
export const abi = [
  'constructor(address _resolver)',
  'event CacheUpdated(bytes32 name, address destination)',
  'function collateralRedeemed(bytes32 currency, uint256 amount, bytes32 collateralKey) view returns (uint256 collateral)',
  'function getCollateralRatio(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan, bytes32 collateralKey) view returns (uint256 cratio)',
  'function isResolverCached() view returns (bool)',
  'function liquidationAmount(tuple(uint256 id, address account, uint256 collateral, bytes32 currency, uint256 amount, bool short, uint256 accruedInterest, uint256 interestIndex, uint256 lastInteraction) loan, uint256 minCratio, bytes32 collateralKey) view returns (uint256 amount)',
  'function maxLoan(uint256 amount, bytes32 currency, uint256 minCratio, bytes32 collateralKey) view returns (uint256 max)',
  'function rebuildCache()',
  'function resolver() view returns (address)',
  'function resolverAddressesRequired() view returns (bytes32[] addresses)',
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

export declare namespace ICollateralLoan {
  export type LoanStruct = {
    id: PromiseOrValue<BigNumberish>;
    account: PromiseOrValue<string>;
    collateral: PromiseOrValue<BigNumberish>;
    currency: PromiseOrValue<BytesLike>;
    amount: PromiseOrValue<BigNumberish>;
    short: PromiseOrValue<boolean>;
    accruedInterest: PromiseOrValue<BigNumberish>;
    interestIndex: PromiseOrValue<BigNumberish>;
    lastInteraction: PromiseOrValue<BigNumberish>;
  };

  export type LoanStructOutput = [
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber,
    boolean,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    id: BigNumber;
    account: string;
    collateral: BigNumber;
    currency: string;
    amount: BigNumber;
    short: boolean;
    accruedInterest: BigNumber;
    interestIndex: BigNumber;
    lastInteraction: BigNumber;
  };
}

export interface CollateralUtilInterface extends utils.Interface {
  functions: {
    'collateralRedeemed(bytes32,uint256,bytes32)': FunctionFragment;
    'getCollateralRatio((uint256,address,uint256,bytes32,uint256,bool,uint256,uint256,uint256),bytes32)': FunctionFragment;
    'isResolverCached()': FunctionFragment;
    'liquidationAmount((uint256,address,uint256,bytes32,uint256,bool,uint256,uint256,uint256),uint256,bytes32)': FunctionFragment;
    'maxLoan(uint256,bytes32,uint256,bytes32)': FunctionFragment;
    'rebuildCache()': FunctionFragment;
    'resolver()': FunctionFragment;
    'resolverAddressesRequired()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'collateralRedeemed'
      | 'getCollateralRatio'
      | 'isResolverCached'
      | 'liquidationAmount'
      | 'maxLoan'
      | 'rebuildCache'
      | 'resolver'
      | 'resolverAddressesRequired'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'collateralRedeemed',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getCollateralRatio',
    values: [ICollateralLoan.LoanStruct, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: 'isResolverCached', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'liquidationAmount',
    values: [ICollateralLoan.LoanStruct, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'maxLoan',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: 'rebuildCache', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolver', values?: undefined): string;
  encodeFunctionData(functionFragment: 'resolverAddressesRequired', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'collateralRedeemed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isResolverCached', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidationAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'maxLoan', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rebuildCache', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolver', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'resolverAddressesRequired', data: BytesLike): Result;

  events: {
    'CacheUpdated(bytes32,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'CacheUpdated'): EventFragment;
}

export interface CacheUpdatedEventObject {
  name: string;
  destination: string;
}
export type CacheUpdatedEvent = TypedEvent<[string, string], CacheUpdatedEventObject>;

export type CacheUpdatedEventFilter = TypedEventFilter<CacheUpdatedEvent>;

export interface CollateralUtil extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CollateralUtilInterface;

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
    collateralRedeemed(
      currency: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateral: BigNumber }>;

    getCollateralRatio(
      loan: ICollateralLoan.LoanStruct,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { cratio: BigNumber }>;

    isResolverCached(overrides?: CallOverrides): Promise<[boolean]>;

    liquidationAmount(
      loan: ICollateralLoan.LoanStruct,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    maxLoan(
      amount: PromiseOrValue<BigNumberish>,
      currency: PromiseOrValue<BytesLike>,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { max: BigNumber }>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    resolverAddressesRequired(
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses: string[] }>;
  };

  collateralRedeemed(
    currency: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    collateralKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCollateralRatio(
    loan: ICollateralLoan.LoanStruct,
    collateralKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isResolverCached(overrides?: CallOverrides): Promise<boolean>;

  liquidationAmount(
    loan: ICollateralLoan.LoanStruct,
    minCratio: PromiseOrValue<BigNumberish>,
    collateralKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  maxLoan(
    amount: PromiseOrValue<BigNumberish>,
    currency: PromiseOrValue<BytesLike>,
    minCratio: PromiseOrValue<BigNumberish>,
    collateralKey: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rebuildCache(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resolver(overrides?: CallOverrides): Promise<string>;

  resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    collateralRedeemed(
      currency: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralRatio(
      loan: ICollateralLoan.LoanStruct,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<boolean>;

    liquidationAmount(
      loan: ICollateralLoan.LoanStruct,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxLoan(
      amount: PromiseOrValue<BigNumberish>,
      currency: PromiseOrValue<BytesLike>,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rebuildCache(overrides?: CallOverrides): Promise<void>;

    resolver(overrides?: CallOverrides): Promise<string>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {
    'CacheUpdated(bytes32,address)'(name?: null, destination?: null): CacheUpdatedEventFilter;
    CacheUpdated(name?: null, destination?: null): CacheUpdatedEventFilter;
  };

  estimateGas: {
    collateralRedeemed(
      currency: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralRatio(
      loan: ICollateralLoan.LoanStruct,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isResolverCached(overrides?: CallOverrides): Promise<BigNumber>;

    liquidationAmount(
      loan: ICollateralLoan.LoanStruct,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxLoan(
      amount: PromiseOrValue<BigNumberish>,
      currency: PromiseOrValue<BytesLike>,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rebuildCache(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    collateralRedeemed(
      currency: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralRatio(
      loan: ICollateralLoan.LoanStruct,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isResolverCached(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidationAmount(
      loan: ICollateralLoan.LoanStruct,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxLoan(
      amount: PromiseOrValue<BigNumberish>,
      currency: PromiseOrValue<BytesLike>,
      minCratio: PromiseOrValue<BigNumberish>,
      collateralKey: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebuildCache(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resolverAddressesRequired(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
