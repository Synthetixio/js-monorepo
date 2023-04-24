import { ethers } from "ethers";
import { useProvider } from "wagmi";
import PerpsMarketProxy from "../../deployments/perpsMarket/PerpsMarketProxy.json";

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string, chainId = 13370) => {
  const provider = useProvider();

  return {
    address: PerpsMarketProxy.address as `0x${string}`,
    abi: PerpsMarketProxy.abi,
    contract: new ethers.Contract(
      PerpsMarketProxy.address,
      PerpsMarketProxy.abi,
      provider,
    ),
    chainId,
  };
};
