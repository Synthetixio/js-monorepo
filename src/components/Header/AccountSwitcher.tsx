import { useAccount } from "wagmi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { ethers } from "ethers";
import { useContractWrite } from "wagmi";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useContract } from "../../hooks/useContract";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { useGetAccounts } from "../../hooks/useGetAccounts";

export function AccountSwitcher() {
  const { isConnected, address } = useAccount();

  const accountIdsData = [""];
  const [searchParams, setSelectedAccountId] = useSearchParams();
  const selectedAccountId = searchParams.get("accountId");

  const { data } = useGetAccounts();
  const { createAccount } = useCreateAccount((accountId) =>
    setSelectedAccountId({ accountId }),
  );

  // const { isLoading: acccountCountisLoading, data: acccountCountData } =
  //   usePerpsMarketAccountProxyBalanceOf({
  //     args: [address || "0x"],
  //     enabled: Boolean(isConnected && address),
  //   });

  // const { data: accountIdsData, isLoading: accountIdsIsLoading } =
  //   useContractReads({
  //     onSuccess: () => {
  //       if (!accountIdsData || accountIdsData.length == 0) {
  //         return;
  //       }
  //       if (!selectedAccountId && accountIdsData.length) {
  //         setSelectedAccountId({ accountId: accountIdsData[0].toString() });
  //       }
  //     },
  //     enabled: Boolean(!acccountCountisLoading && acccountCountData),
  //     contracts: Array.from(Array(acccountCountData?.toNumber()).keys())?.map(
  //       (ind) => {
  //         return {
  //           address: perpsMarketAccountProxyAddress,
  //           abi: perpsMarketAccountProxyABI,
  //           functionName: "tokenOfOwnerByIndex",
  //           args: [address, ind],
  //         };
  //       },
  //     ),
  //   });

  // const { write, isLoading } = useContractWrite({
  //   mode: "recklesslyUnprepared",
  //   addressOrName: coreProxy!.address,
  //   contractInterface: coreProxy!.abi,
  //   functionName: "createAccount",
  //   args: [1],
  // });

  if (!isConnected) {
    return null;
  }

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
