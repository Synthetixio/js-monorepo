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
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export function AccountSwitcher() {
  const { isConnected, address } = useAccount();

  const { accountId: selectedAccountId, marketId } = useParams();
  const navigate = useNavigate();

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
        if (!selectedAccountId && accountIdsData[0]) {
          navigate(`/markets/${marketId}/${accountIdsData[0]}`);
        }
      },
      enabled: Boolean(!acccountCountisLoading && acccountCountData),
      contracts: Array.from(Array(acccountCountData?.toNumber()).keys())?.map(
        (ind) => {
          return {
            address: perpsMarketAccountProxyAddress,
            abi: perpsMarketAccountProxyABI,
            functionName: "tokenOfOwnerByIndex",
            args: [ind],
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
    navigate(`/markets/${marketId}/${newId}`);
  };

  return selectedAccountId ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Account #{selectedAccountId}
      </MenuButton>
      <MenuList>
        {accountIdsData?.map((accountId) => (
          <MenuItem
            key={accountId as string}
            onClick={() => navigate(`/markets/${marketId}/${accountId}`)}
          >
            <>Account #{accountId}</>
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
