import { useContractWrite } from "wagmi";
import { useContract } from "./useContract";

export const useCreateMarket = (
  marketName: string,
  marketSymbol: string,
  marketOwner: string,
  onSuccess: (id: string) => void,
) => {
  const coreProxy = useContract("PERPS_MARKET");

  const { writeAsync, data } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: coreProxy.address,
    abi: coreProxy.abi,
    functionName: "createMarket",
    args: [marketName, marketSymbol, marketOwner],
  });

  const createMarket = async () => {
    try {
      const id = await coreProxy.contract.callStatic.createMarket(
        marketName,
        marketSymbol,
        marketOwner,
      );
      await writeAsync();
      onSuccess(id.toString());
    } catch (error) {}
  };

  return {
    createMarket,
  };
};
