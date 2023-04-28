import { ethers } from "ethers";
import { useMemo } from "react";
import { useContractWrite } from "wagmi";
import { useContract } from "./useContract";

export const useCreateAccount = (onSuccess: (id: string) => void) => {
  const id = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    return ethers.BigNumber.from(randomNumber.toString());
  }, []);

  const coreProxy = useContract("PERPS_MARKET");

  const { writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: coreProxy.address,
    abi: coreProxy.abi,
    functionName: "createAccount",
    args: [id],
    onSuccess: () => onSuccess(id.toString()),
  });

  return {
    createAccount: writeAsync,
    id,
  };
};
