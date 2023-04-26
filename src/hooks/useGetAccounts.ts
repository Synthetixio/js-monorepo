import { useAccount, useContractRead, useContractReads } from "wagmi";
import { useContract } from "./useContract";

export const useGetAccounts = () => {
  const { address, isConnected } = useAccount();
  const accountProxy = useContract("ACCOUNT_PROXY");

  const {
    data: acccountCount,
    isLoading: acccountCountisLoading,
    refetch,
  } = useContractRead({
    address: accountProxy.address,
    abi: accountProxy.abi,
    functionName: "balanceOf",
    args: [address || "0x"],
    enabled: isConnected && !!address,
  });

  const { data: accountIds, isLoading: accountIdsIsLoading } = useContractReads(
    {
      enabled: Boolean(!acccountCountisLoading && !!acccountCount),
      contracts: Array.from(
        Array(Number(acccountCount?.toString())).keys(),
      )?.map((index) => {
        return {
          address: accountProxy.address,
          abi: accountProxy.abi,
          functionName: "tokenOfOwnerByIndex",
          args: [address, index],
        };
      }),
    },
  );

  return {
    acccountCount,
    accountIds,
    isLoading: accountIdsIsLoading || acccountCountisLoading,
    refetch,
  };
};
