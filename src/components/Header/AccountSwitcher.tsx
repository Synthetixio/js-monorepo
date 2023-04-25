import { useAccount } from "wagmi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useSearchParams } from "react-router-dom";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { useGetAccounts } from "../../hooks/useGetAccounts";

export function AccountSwitcher() {
  const { isConnected } = useAccount();

  const accountIdsData = [""];
  const [searchParams, setSelectedAccountId] = useSearchParams();
  const selectedAccountId = searchParams.get("accountId");

  const { accountIds, refetch } = useGetAccounts();
  const { createAccount } = useCreateAccount((accountId) => {
    setSelectedAccountId({ accountId });
    refetch();
  });

  if (!isConnected) {
    return null;
  }

  return accountIdsData?.length || selectedAccountId ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <>Account #{selectedAccountId}</>
      </MenuButton>
      <MenuList>
        {accountIds?.map((accountId) => (
          <MenuItem
            key={accountId as string}
            onClick={() =>
              setSelectedAccountId({ accountId: accountId as string })
            }
          >
            <>Account #{accountId?.toString()}</>
          </MenuItem>
        ))}
        <MenuItem key={accountIdsData?.length} onClick={() => createAccount()}>
          Create New Account
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Button colorScheme="cyan" onClick={() => createAccount()}>
      Create Account
    </Button>
  );
}
