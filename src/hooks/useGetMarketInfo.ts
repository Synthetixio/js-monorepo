import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useGetMarketInfo = (marketId: string) => {
  const perpsMarketProxy = useContract("PERPS_MARKET");

  const { data: name, refetch } = useContractRead({
    address: perpsMarketProxy.address,
    abi: perpsMarketProxy.abi,
    functionName: "name",
    args: [marketId],
    onSuccess: () => {
      console.log("success!");
    },
    onError: (error) => {
      console.log("error!", error);
    },
  });

  return {
    name,
  };
};
