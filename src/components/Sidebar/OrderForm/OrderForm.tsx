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
  InputRightAddon,
} from "@chakra-ui/react";
import { useReducer } from "react";
import { LeverageSlider } from "../Leverage";
import { initialOrderFormState, reducer } from "./reducer";

export function OrderForm() {
  const [state, dispatch] = useReducer(reducer, initialOrderFormState);

  const toggleNativeUnit = () =>
    dispatch({
      type: "set_native_unit",
      payload: { nativeUnit: !state.nativeUnit },
    });

  const handleSubmit = () => {
    console.log("Submit");
  };

  const { nativeUnit, buy, leverage, amount } = state;

  return (
    <Box flex="1" overflowY="scroll" p="4">
      <>
        <Heading size="sm" mb="3">
          Market Order
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
                <LeverageSlider
                  buy={buy}
                  leverage={leverage}
                  onChange={(newLeverage: number) => {
                    dispatch({
                      type: "set_leverage",
                      payload: { leverage: newLeverage },
                    });
                  }}
                />
                <Box flex="1" ml="4">
                  <InputGroup width="120px">
                    <Input
                      id="leverage"
                      type="number"
                      min={1}
                      max={100}
                      variant="filled"
                      value={leverage}
                      onChange={(val) =>
                        dispatch({
                          type: "set_leverage",
                          payload: { leverage: parseInt(val.target.value) },
                        })
                      }
                    />
                    <InputRightAddon
                      _hover={{ cursor: "pointer" }}
                      children="×"
                      onClick={() => dispatch({ type: "reset_leverage" })}
                    />
                  </InputGroup>
                </Box>
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
        </form>
      </>
    </Box>
  );
}
