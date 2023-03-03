import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Divider,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { useContext } from "react";
import { LeverageInput, LeverageSlider } from "../Leverage";
import { OrderFormContext } from "./context";

export function OrderForm() {
  const {
    state: { nativeUnit, buy, amount },
    dispatch,
  } = useContext(OrderFormContext);

  const toggleNativeUnit = () =>
    dispatch({
      type: "set_native_unit",
      payload: { nativeUnit: !nativeUnit },
    });

  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <Box flex="1" overflowY="scroll" p="4">
      <>
        <Heading size="sm" mb="3">
          Market Order
        </Heading>
        <div key="form" style={{ width: "100%" }}>
          <VStack spacing={4} align="flex-start" w="100%">
            <Flex direction="row" width="100%" gap="4">
              <Button
                onClick={() =>
                  dispatch({ type: "set_buy", payload: { buy: true } })
                }
                colorScheme={buy ? "green" : "gray"}
                width="100%"
                mr="1"
              >
                Buy
              </Button>
              <Button
                onClick={() =>
                  dispatch({ type: "set_buy", payload: { buy: false } })
                }
                colorScheme={buy ? "gray" : "red"}
                width="100%"
                ml="1"
              >
                Sell
              </Button>
            </Flex>
            <FormControl>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <InputGroup>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  variant="filled"
                  value={amount || ""}
                  onChange={(val) => {
                    const newAmount = isNaN(parseInt(val.target.value))
                      ? null
                      : parseInt(val.target.value);
                    dispatch({
                      type: "set_amount",
                      payload: { amount: newAmount },
                    });
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={toggleNativeUnit}>
                    {nativeUnit ? "USD" : "ETH"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex alignItems="center" width="100%">
              <Divider flex="1" />
              <Text mx={3} fontSize="sm" opacity="0.66">
                OR
              </Text>
              <Divider flex="1" />
            </Flex>
            <FormControl>
              <FormLabel htmlFor="leverage">Leverage</FormLabel>
              <Flex align="center">
                <LeverageSlider />
                <LeverageInput />
              </Flex>
            </FormControl>
            <Button
              type="submit"
              size="lg"
              colorScheme={buy ? "green" : "red"}
              width="full"
            >
              Submit {buy ? "Buy" : "Sell"} Order
            </Button>
          </VStack>
        </div>
      </>
    </Box>
  );
}
