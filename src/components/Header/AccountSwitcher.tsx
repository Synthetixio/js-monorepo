import { useAccount } from "wagmi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  perpsMarketAccountProxyABI,
  perpsMarketAccountProxyAddress,
  usePerpsMarketAccountProxyBalanceOf,
  usePerpsMarketPerpsMarketProxyCreateAccount,
} from "../../generated";
import { ethers } from "ethers";
import { useContractReads } from "wagmi";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function AccountSwitcher() {
  const { isConnected, address } = useAccount();

  const [searchParams, setSelectedAccountId] = useSearchParams();
  const selectedAccountId = searchParams.get("accountId");

  const { isLoading: acccountCountisLoading, data: acccountCountData } =
    usePerpsMarketAccountProxyBalanceOf({
      args: [address || "0x"],
      enabled: Boolean(isConnected && address),
    });

  const { data: accountIdsData, isLoading: accountIdsIsLoading } =
    useContractReads({
      onSuccess: () => {
        if (!accountIdsData || accountIdsData.length == 0) {
          return;
        }
        if (!selectedAccountId && accountIdsData.length) {
          setSelectedAccountId({ accountId: accountIdsData[0].toString() });
        }
      },
      enabled: Boolean(!acccountCountisLoading && acccountCountData),
      contracts: Array.from(Array(acccountCountData?.toNumber()).keys())?.map(
        (ind) => {
          return {
            address: perpsMarketAccountProxyAddress,
            abi: perpsMarketAccountProxyABI,
            functionName: "tokenOfOwnerByIndex",
            args: [address, ind],
          };
        },
      ),
    });

  const newId = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    return ethers.BigNumber.from(randomNumber.toString());
  }, []);

  const { writeAsync: writeCreateAccount, isLoading: createAccountIsLoading } =
    usePerpsMarketPerpsMarketProxyCreateAccount({
      args: [newId],
      mode: "recklesslyUnprepared",
    });

  if (!isConnected) {
    return null;
  }

  const createAccount = async () => {
    const transactionResponse = await writeCreateAccount();
    await transactionResponse.wait();
    setSelectedAccountId({ accountId: newId.toString() });
  };

  return accountIdsData?.length || selectedAccountId ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <>Account #{selectedAccountId}</>
      </MenuButton>
      <MenuList>
        {accountIdsData?.map((accountId) => (
          <MenuItem
            key={accountId as string}
            onClick={() =>
              setSelectedAccountId({ accountId: accountId as string })
            }
          >
            <>Account #{accountId.toString()}</>
          </MenuItem>
        ))}
        <MenuItem key={accountIdsData?.length} onClick={createAccount}>
          Create New Account
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Button
      colorScheme="cyan"
      isDisabled={!writeCreateAccount}
      onClick={createAccount}
    >
      Create Account
    </Button>
  );
}
