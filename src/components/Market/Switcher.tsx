import { Flex } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

export function Switcher() {
  return (
    <Flex width="220px" p="4" align="center">
      Market Selector
      <TriangleDownIcon ml="auto" />
    </Flex>
  );
}
