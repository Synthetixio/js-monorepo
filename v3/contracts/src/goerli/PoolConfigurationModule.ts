// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x0F8e6010Beaf6342fac9f4c09823da079bc77ba9';
export const abi = [
  'error PoolNotFound(uint128 poolId)',
  'error Unauthorized(address addr)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint128 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint256)',
  'function removeApprovedPool(uint128 poolId)',
  'function setPreferredPool(uint128 poolId)',
];
export const name = 'PoolConfigurationModule';
export const source = 'contracts/modules/core/PoolConfigurationModule.sol';
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

export interface PoolConfigurationModuleInterface extends utils.Interface {
  functions: {
    'addApprovedPool(uint128)': FunctionFragment;
    'getApprovedPools()': FunctionFragment;
    'getPreferredPool()': FunctionFragment;
    'removeApprovedPool(uint128)': FunctionFragment;
    'setPreferredPool(uint128)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'addApprovedPool'
      | 'getApprovedPools'
      | 'getPreferredPool'
      | 'removeApprovedPool'
      | 'setPreferredPool'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'addApprovedPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getApprovedPools', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getPreferredPool', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'removeApprovedPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPreferredPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: 'addApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getApprovedPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPreferredPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPreferredPool', data: BytesLike): Result;

  events: {
    'PoolApprovedAdded(uint256)': EventFragment;
    'PoolApprovedRemoved(uint256)': EventFragment;
    'PreferredPoolSet(uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'PoolApprovedAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolApprovedRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PreferredPoolSet'): EventFragment;
}

export interface PoolApprovedAddedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedAddedEvent = TypedEvent<[BigNumber], PoolApprovedAddedEventObject>;

export type PoolApprovedAddedEventFilter = TypedEventFilter<PoolApprovedAddedEvent>;

export interface PoolApprovedRemovedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedRemovedEvent = TypedEvent<[BigNumber], PoolApprovedRemovedEventObject>;

export type PoolApprovedRemovedEventFilter = TypedEventFilter<PoolApprovedRemovedEvent>;

export interface PreferredPoolSetEventObject {
  poolId: BigNumber;
}
export type PreferredPoolSetEvent = TypedEvent<[BigNumber], PreferredPoolSetEventObject>;

export type PreferredPoolSetEventFilter = TypedEventFilter<PreferredPoolSetEvent>;

export interface PoolConfigurationModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PoolConfigurationModuleInterface;

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
    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getPreferredPool(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addApprovedPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

  getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

  removeApprovedPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPreferredPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addApprovedPool(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    'PoolApprovedAdded(uint256)'(poolId?: null): PoolApprovedAddedEventFilter;
    PoolApprovedAdded(poolId?: null): PoolApprovedAddedEventFilter;

    'PoolApprovedRemoved(uint256)'(poolId?: null): PoolApprovedRemovedEventFilter;
    PoolApprovedRemoved(poolId?: null): PoolApprovedRemovedEventFilter;

    'PreferredPoolSet(uint256)'(poolId?: null): PreferredPoolSetEventFilter;
    PreferredPoolSet(poolId?: null): PreferredPoolSetEventFilter;
  };

  estimateGas: {
    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPreferredPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
