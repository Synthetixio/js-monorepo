import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import { useContractWrite } from "wagmi";
import { StrategyType } from "../constants/markets";
import { useContract } from "./useContract";

const strategy = {
  strategyType: StrategyType.ONCHAIN,
  settlementDelay: 5,
  settlementWindowDuration: 120,
  priceVerificationContract: ethers.constants.AddressZero,
  feedId: ethers.constants.HashZero,
  url: "",
  settlementReward: parseEther("5"),
  priceDeviationTolerance: parseEther("0.01"),
};

export const useAddSettlementStrategy = (marketId: string) => {
  const coreProxy = useContract("PERPS_MARKET");

  const { writeAsync: addSettlementStrategy } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: coreProxy.address,
    abi: coreProxy.abi,
    functionName: "addSettlementStrategy",
    args: [marketId, strategy],
  });

  return {
    addSettlementStrategy,
  };
};
