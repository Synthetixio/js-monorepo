import { Flex, Box } from "@chakra-ui/react";
import { AccountOverview, CurrentPosition, OrderForm } from "./Sidebar/index";

export function Sidebar() {
  return (
    <Flex
      direction="column"
      height="100%"
      borderLeft="1px solid rgba(255,255,255,0.2)"
    >
      <Flex flexDirection="column" height="100%">
        <Box>
          <AccountOverview />
          <CurrentPosition />
        </Box>
        <OrderForm />
      </Flex>
    </Flex>
  );
}
