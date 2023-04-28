import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { contracts } from "../constants/contracts";

export const useContract = (name: keyof typeof contracts, chainId = 13370) => {
  const provider = useProvider();
  const contract = contracts[name];

  return {
    address: contract.address as `0x${string}`,
    abi: contract.abi,
    contract: new ethers.Contract(contract.address, contract.abi, provider),
    chainId,
  };
};
