// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x32435c2E40258DB5c50090E8A7d491cB11bd3c8c';
export const abi = [
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientMarketCollateralDepositable(uint128 marketId, address collateralType, uint256 tokenAmountToDeposit)',
  'error InsufficientMarketCollateralWithdrawable(uint128 marketId, address collateralType, uint256 tokenAmountToWithdraw)',
  'error Unauthorized(address addr)',
  'event MarketCollateralDeposited(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MarketCollateralWithdrawn(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 systemAmount, address indexed sender)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256 collateralAmountD18)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
];
export const name = 'MarketCollateralModule';
export const source = 'contracts/modules/core/MarketCollateralModule.sol';
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

export interface MarketCollateralModuleInterface extends utils.Interface {
  functions: {
    'configureMaximumMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'depositMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'getMarketCollateralAmount(uint128,address)': FunctionFragment;
    'getMaximumMarketCollateral(uint128,address)': FunctionFragment;
    'withdrawMarketCollateral(uint128,address,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'configureMaximumMarketCollateral'
      | 'depositMarketCollateral'
      | 'getMarketCollateralAmount'
      | 'getMaximumMarketCollateral'
      | 'withdrawMarketCollateral'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'configureMaximumMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketCollateralAmount',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMaximumMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: 'configureMaximumMarketCollateral',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'depositMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateralAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaximumMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMarketCollateral', data: BytesLike): Result;

  events: {
    'MarketCollateralDeposited(uint128,address,uint256,address)': EventFragment;
    'MarketCollateralWithdrawn(uint128,address,uint256,address)': EventFragment;
    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'MarketCollateralDeposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCollateralWithdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaximumMarketCollateralConfigured'): EventFragment;
}

export interface MarketCollateralDepositedEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralDepositedEventObject
>;

export type MarketCollateralDepositedEventFilter = TypedEventFilter<MarketCollateralDepositedEvent>;

export interface MarketCollateralWithdrawnEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralWithdrawnEventObject
>;

export type MarketCollateralWithdrawnEventFilter = TypedEventFilter<MarketCollateralWithdrawnEvent>;

export interface MaximumMarketCollateralConfiguredEventObject {
  marketId: BigNumber;
  collateralType: string;
  systemAmount: BigNumber;
  sender: string;
}
export type MaximumMarketCollateralConfiguredEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MaximumMarketCollateralConfiguredEventObject
>;

export type MaximumMarketCollateralConfiguredEventFilter =
  TypedEventFilter<MaximumMarketCollateralConfiguredEvent>;

export interface MarketCollateralModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketCollateralModuleInterface;

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
    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralAmountD18: BigNumber }>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  configureMaximumMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMarketCollateralAmount(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaximumMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    'MarketCollateralDeposited(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralDepositedEventFilter;
    MarketCollateralDeposited(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralDepositedEventFilter;

    'MarketCollateralWithdrawn(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralWithdrawnEventFilter;
    MarketCollateralWithdrawn(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralWithdrawnEventFilter;

    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      systemAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MaximumMarketCollateralConfiguredEventFilter;
    MaximumMarketCollateralConfigured(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      systemAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MaximumMarketCollateralConfiguredEventFilter;
  };

  estimateGas: {
    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
