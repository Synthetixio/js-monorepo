import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Box, Badge, Text } from "@chakra-ui/react";

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
      <Box mb="1">
        Size:{" "}
        <Text display="inline" fontFamily="mono">
          1 ETH ($X)
        </Text>{" "}
        <ArrowForwardIcon />{" "}
        <Text display="inline" fontFamily="mono">
          1 ETH ($X)
        </Text>
      </Box>
      <Box mb="1">
        Leverage:{" "}
        <Text display="inline" fontFamily="mono">
          1&times;
        </Text>{" "}
        <ArrowForwardIcon />{" "}
        <Text display="inline" fontFamily="mono">
          2&times;
        </Text>
      </Box>
      <Box mb="1">
        Profit/Loss:{" "}
        <Text display="inline" fontFamily="mono">
          $0
        </Text>
      </Box>
    </Box>
  );
}
