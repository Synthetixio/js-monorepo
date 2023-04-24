import { useAccount, useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useGetAccounts = () => {
  const { address, isConnected } = useAccount();
  const accountProxy = useContract("ACCOUNT_PROXY");

  const { data, refetch } = useContractRead({
    address: accountProxy.address,
    abi: accountProxy.abi,
    functionName: "balanceOf",
    args: [address || "0x"],
    enabled: isConnected && !!address,
    onSuccess: () => {
      console.log("success!");
    },
    onError: (error) => {
      console.log("error!", error);
    },
  });
  console.log("data:", data);

  return {
    data,
    refetch,
  };
};
