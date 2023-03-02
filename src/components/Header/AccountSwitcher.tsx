import { Button } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export function AccountSwitcher() {
  return (
    <Button rightIcon={<TriangleDownIcon />} colorScheme="gray">
      Account Switcher
    </Button>
  );
}
