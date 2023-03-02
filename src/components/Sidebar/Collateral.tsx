import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";

export function Collateral() {
  const [depositing, setDepositing] = useState(false);

  const handleClick = () => setDepositing(!depositing);

  // hook for retrieving current collateral balances?

  // multicall
  // - approve
  // - usePerpsMarketPerpsMarketProxyModifyCollateral

  return (
    <Flex alignItems="center" mb="4">
      <Box mr="4">$0.00&nbsp;snxUSD</Box>
      <InputGroup size="md">
        <InputLeftElement width="3rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {depositing ? <AddIcon /> : <MinusIcon />}
          </Button>
        </InputLeftElement>
        <Input pl="3rem" type="number" />
      </InputGroup>
      <Button type="submit" ml="4" px="8">
        {depositing ? "Deposit" : "Withdraw"}
      </Button>
    </Flex>
  );
}
