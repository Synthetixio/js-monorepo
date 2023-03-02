import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  usePerpsMarketAccountProxyBalanceOf,
  usePerpsMarketAccountProxyTokenOfOwnerByIndex,
  usePerpsMarketPerpsMarketProxyCreateAccount,
} from "../../generated";
import { ethers } from "ethers";

export function AccountSwitcher() {
  const { isConnected, address } = useAccount();

  let firstAccountId;
  /*
  if (isConnected && address) {
    const {
      isSuccess: isSuccessAccountTokensBalanceOf,
      data: accountTokensBalanceOfData,
    } = usePerpsMarketAccountProxyBalanceOf({ args: [address] });

    if (isSuccessAccountTokensBalanceOf && accountTokensBalanceOfData?.gt(0)) {
      console.log(accountTokensBalanceOfData);
      firstAccountId = usePerpsMarketAccountProxyTokenOfOwnerByIndex(
        accountTokensBalanceOfData,
      );
    }
  }
  */

  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const newId = ethers.BigNumber.from(randomNumber.toString());
  const { write } = usePerpsMarketPerpsMarketProxyCreateAccount({
    args: [newId],
    mode: "recklesslyUnprepared",
  });

  return isConnected ? (
    firstAccountId ? (
      <Button isDisabled rightIcon={<TriangleDownIcon />} colorScheme="gray">
        {firstAccountId.toString()}
      </Button>
    ) : (
      <Button colorScheme="cyan" disabled={!write} onClick={() => write?.()}>
        Create Account
      </Button>
    )
  ) : null;
}
