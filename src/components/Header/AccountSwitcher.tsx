import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export function AccountSwitcher() {
  const { isConnected } = useAccount();

  return (
    isConnected && (
      <Button rightIcon={<TriangleDownIcon />} colorScheme="gray">
        Account Switcher
      </Button>
    )
  );
}
