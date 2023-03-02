import { useAccount } from "wagmi";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
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
  let writeCreateAccount;

  if (isConnected) {
    // Set up Create Account functionality
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const newId = ethers.BigNumber.from(randomNumber.toString());
    const { write } = usePerpsMarketPerpsMarketProxyCreateAccount({
      args: [newId],
      mode: "recklesslyUnprepared",
    });
    writeCreateAccount = write;

    if (address) {
      // Gather Account IDs associated with the connected wallet.
      const {
        isSuccess: isSuccessAccountTokensBalanceOf,
        data: accountTokensBalanceOfData,
      } = usePerpsMarketAccountProxyBalanceOf({ args: [address] });
      if (
        isSuccessAccountTokensBalanceOf &&
        accountTokensBalanceOfData?.gt(0)
      ) {
        const {
          isSuccess: tokenOfOwnerByIndexSuccess,
          data: tokenOfOwnerByIndexData,
        } = usePerpsMarketAccountProxyTokenOfOwnerByIndex({
          args: [address, ethers.BigNumber.from("1")], // this should loop with accountTokensBalanceOfData iterations
        });
        if (tokenOfOwnerByIndexSuccess) {
          firstAccountId = tokenOfOwnerByIndexData;
        }
      }
    }
  }

  return isConnected ? (
    firstAccountId ? (
      <Popover>
        <PopoverTrigger>
          <Button rightIcon={<TriangleDownIcon />} colorScheme="gray">
            Account #{firstAccountId.toString()}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>Account list + create account button</PopoverBody>
        </PopoverContent>
      </Popover>
    ) : (
      <Button
        colorScheme="cyan"
        disabled={!writeCreateAccount}
        onClick={() => writeCreateAccount?.()}
      >
        Create Account
      </Button>
    )
  ) : null;
}
