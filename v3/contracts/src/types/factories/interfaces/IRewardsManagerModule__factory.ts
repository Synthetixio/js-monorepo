/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRewardsManagerModule,
  IRewardsManagerModuleInterface,
} from "../../interfaces/IRewardsManagerModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint128",
        name: "poolId",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "collateralType",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "distributeRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IRewardsManagerModule__factory {
  static readonly abi = _abi;
  static createInterface(): IRewardsManagerModuleInterface {
    return new utils.Interface(_abi) as IRewardsManagerModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRewardsManagerModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRewardsManagerModule;
  }
}
