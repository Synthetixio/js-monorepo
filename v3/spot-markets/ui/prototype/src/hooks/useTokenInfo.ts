import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useTokenInfo = (address: string) => {
  const token = useContract("SYNTH_TOKEN_MODULE");

  const { data: symbol } = useContractRead({
    address: address as `0x${string}`,
    abi: token.abi,
    functionName: "symbol",
    args: [],
    enabled: !!address,
  });

  const { data: name } = useContractRead({
    address: address as `0x${string}`,
    abi: token.abi,
    functionName: "name",
    args: [],
    enabled: !!address,
  });

  const { data: decimals } = useContractRead({
    address: address as `0x${string}`,
    abi: token.abi,
    functionName: "decimals",
    args: [],
    enabled: !!address,
  });

  return {
    symbol,
    name,
    decimals,
  };
};
