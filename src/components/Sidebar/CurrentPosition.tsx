import { Flex, Heading, Box, Badge } from "@chakra-ui/react";

export function CurrentPosition() {
  return (
    <Box p="4" borderBottom="1px solid rgba(255,255,255,0.2)">
      <Flex align="center" mb="2">
        <Heading size="sm">Current Position</Heading>{" "}
        <Badge ml="2" colorScheme="green" fontSize="sm" borderRadius="4px">
          Long
        </Badge>
      </Flex>
      {/* before and after */}
      <Box mb="1">Size: 1 ETH ($X)</Box>
      <Box mb="1">Leverage: 1&times;</Box>
      <Box mb="1">PnL</Box>
    </Box>
  );
}
