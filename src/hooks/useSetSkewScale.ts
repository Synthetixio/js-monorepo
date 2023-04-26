import { parseEther } from "ethers/lib/utils.js";
import { useContractWrite } from "wagmi";
import { useContract } from "./useContract";

export const useSetSkewScale = (marketId: string, skewSacle: string) => {
  const coreProxy = useContract("PERPS_MARKET");

  const { writeAsync: setSkewScale } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: coreProxy.address,
    abi: coreProxy.abi,
    functionName: "setSkewScale",
    args: [marketId, parseEther(skewSacle || "0")],
  });

  return {
    setSkewScale,
  };
};
