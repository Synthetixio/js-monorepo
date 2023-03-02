import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  useDeploymentsPerpsMarketAccountProxyBalanceOf,
  useDeploymentsPerpsMarketAccountProxyTokenOfOwnerByIndex,
} from "../../generated";

export function AccountSwitcher() {
  const { isConnected, address } = useAccount();

  let accountTokens;
  if (isConnected && address) {
    const {
      isSuccess: isSuccessAccountTokensBalanceOf,
      data: accountTokensBalanceOfData,
    } = useDeploymentsPerpsMarketAccountProxyBalanceOf({ args: [address] });

    if (isSuccessAccountTokensBalanceOf) {
      console.log(accountTokensBalanceOfData);
    }
    //useDeploymentsPerpsMarketAccountProxyTokenOfOwnerByIndex
  }

  return isConnected ? (
    <Button rightIcon={<TriangleDownIcon />} colorScheme="gray">
      Account Switcher
    </Button>
  ) : null;
}
