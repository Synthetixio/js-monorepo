import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Heading, Flex, Box } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex p="3" borderBottom="1px solid rgba(255,255,255,0.2)" align="center">
      <Heading size="lg">Synthetix Perps V3 Prototype</Heading>
      <Box ml="auto">
        {/** @see https://www.rainbowkit.com/docs/connect-button */}
        <ConnectButton />
      </Box>
    </Flex>
  );
}
