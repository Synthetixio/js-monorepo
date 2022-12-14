// !!! DO NOT EDIT !!! Automatically generated file

export const address = null;
export const abi = [
  'error Unauthorized(address sender)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint256 start, uint256 duration)',
  'function initialize(address rewardManager, address token_, string name_)',
  'function name() view returns (string)',
  'function payout(uint128, uint128, address, address sender, uint256 amount) returns (bool)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function token() view returns (address)',
];
export const name = 'RewardDistributor';
export const source = 'MANUAL';
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
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common';

export interface _RewardDistributorInterface extends utils.Interface {
  functions: {
    'distributeRewards(uint128,address,uint256,uint256,uint256)': FunctionFragment;
    'initialize(address,address,string)': FunctionFragment;
    'name()': FunctionFragment;
    'payout(uint128,uint128,address,address,uint256)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'token()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'distributeRewards'
      | 'initialize'
      | 'name'
      | 'payout'
      | 'supportsInterface'
      | 'token'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'distributeRewards',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'payout',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: 'token', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'distributeRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'payout', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result;

  events: {};
}

export interface _RewardDistributor extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: _RewardDistributorInterface;

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
    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialize(
      rewardManager: PromiseOrValue<string>,
      token_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    payout(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      sender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    token(overrides?: CallOverrides): Promise<[string]>;
  };

  distributeRewards(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    start: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialize(
    rewardManager: PromiseOrValue<string>,
    token_: PromiseOrValue<string>,
    name_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  payout(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<string>,
    sender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  token(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      rewardManager: PromiseOrValue<string>,
      token_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    payout(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      sender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialize(
      rewardManager: PromiseOrValue<string>,
      token_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    payout(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      sender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      rewardManager: PromiseOrValue<string>,
      token_: PromiseOrValue<string>,
      name_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payout(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      sender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
