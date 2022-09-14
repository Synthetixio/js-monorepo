// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'EscrowChecker';
export const address = '0xcdb7D0a946223255d39A6e29B54f08f3291cc118';
export const source = 'EscrowChecker';
export const abi = [
  'constructor(address _esc)',
  'function checkAccountSchedule(address account) view returns (uint256[16])',
  'function synthetix_escrow() view returns (address)',
];
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

export interface EscrowCheckerInterface extends utils.Interface {
  functions: {
    'checkAccountSchedule(address)': FunctionFragment;
    'synthetix_escrow()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: 'checkAccountSchedule' | 'synthetix_escrow'
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'checkAccountSchedule',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'synthetix_escrow', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'checkAccountSchedule', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'synthetix_escrow', data: BytesLike): Result;

  events: {};
}

export interface EscrowChecker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EscrowCheckerInterface;

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
    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    synthetix_escrow(overrides?: CallOverrides): Promise<[string]>;
  };

  checkAccountSchedule(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  synthetix_escrow(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    synthetix_escrow(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    synthetix_escrow(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    checkAccountSchedule(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    synthetix_escrow(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
