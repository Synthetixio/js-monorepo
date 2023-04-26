import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useGetMarketInfo = (marketId: string) => {
  const perpsMarketProxy = useContract("PERPS_MARKET");

  const { data: name } = useContractRead({
    address: perpsMarketProxy.address,
    abi: perpsMarketProxy.abi,
    functionName: "name",
    args: [marketId],
  });

  return {
    name,
  };
};
