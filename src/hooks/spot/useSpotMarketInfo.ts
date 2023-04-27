import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { useContract } from "../useContract";

export const useSpotMarketInfo = (marketId: string | number) => {
  const spotMarketProxy = useContract("SPOT_MARKET");

  const { data: synthAddress } = useContractRead({
    address: spotMarketProxy.address,
    abi: spotMarketProxy.abi,
    functionName: "getSynth",
    args: [marketId],
    enabled: !!marketId,
  });

  const { data: marketName } = useContractRead({
    address: spotMarketProxy.address,
    abi: spotMarketProxy.abi,
    functionName: "name",
    args: [marketId],
    enabled: !!marketId,
  });

  const { data: marketOwner } = useContractRead({
    address: spotMarketProxy.address,
    abi: spotMarketProxy.abi,
    functionName: "getMarketOwner",
    args: [marketId],
    enabled: !!marketId,
  });

  return {
    synthAddress: synthAddress as string,
    marketName: marketName as string,
    marketOwner: marketOwner as string,
  };
};

export const useSpotMarketStat = (marketId: string | number) => {
  const spotMarketProxy = useContract("SPOT_MARKET");

  const { data: reportedDebt } = useContractRead({
    address: spotMarketProxy.address,
    abi: spotMarketProxy.abi,
    functionName: "reportedDebt",
    args: [marketId],
    enabled: !!marketId,
  });

  const { data: minimumCredit } = useContractRead({
    address: spotMarketProxy.address,
    abi: spotMarketProxy.abi,
    functionName: "minimumCredit",
    args: [marketId],
    enabled: !!marketId,
  });

  return {
    reportedDebt: reportedDebt as BigNumber,
    minimumCredit: minimumCredit as BigNumber,
  };
};
