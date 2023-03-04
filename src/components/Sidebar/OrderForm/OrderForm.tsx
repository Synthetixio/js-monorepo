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
import { useReducer, useRef } from "react";
import { LeverageInput, LeverageSlider, RefHandler } from "../Leverage";
import { initialOrderFormState, reducer } from "./reducer";

export const maxLeverage = 100;

export function OrderForm() {
  const [state, dispatch] = useReducer(reducer, initialOrderFormState);

  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<RefHandler>(null);

  const { amount, buy, nativeUnit, leverage } = state;

  const toggleNativeUnit = () =>
    dispatch({
      type: "set_native_unit",
      payload: { nativeUnit: !nativeUnit },
    });

  const handleSubmit = () => {
    alert(JSON.stringify({ leverage, amount, nativeUnit, buy }));
  };

  const reset = () => {
    dispatch({ type: "reset_leverage" });
    if (inputRef.current && sliderRef?.current) {
      const { thumbRef, trackRef } = sliderRef.current;
      if (thumbRef.current && trackRef.current) {
        thumbRef.current.style.left = "calc(0% - 12px)";
        trackRef.current.style.width = "0%";
      }
      inputRef.current.value = "1";
    }
  };

  const onChange = (
    val: number | null,
    controllingComponent: "input" | "slider",
  ) => {
    dispatch({ type: "set_leverage", payload: { leverage: val } });
    if (controllingComponent === "input" && sliderRef?.current) {
      const { thumbRef, trackRef } = sliderRef.current;
      if (thumbRef.current && trackRef.current && val) {
        thumbRef.current.style.left = `calc(${
          val >= maxLeverage ? maxLeverage : val
        }% - 12px)`;
        trackRef.current.style.width = `${
          val >= maxLeverage ? maxLeverage : val
        }%`;
      }
    }

    if (controllingComponent === "slider" && inputRef?.current) {
      inputRef.current.value = val ? String(val) : "1";
    }
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
            <FormControl key="amount">
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
            <FormControl key="leverage">
              <FormLabel htmlFor="leverage">Leverage</FormLabel>
              <Flex align="center">
                <LeverageSlider onChange={onChange} buy={buy} ref={sliderRef} />
                <LeverageInput
                  onChange={onChange}
                  reset={reset}
                  ref={inputRef}
                />
              </Flex>
            </FormControl>
            <Button
              key="button"
              type="submit"
              size="lg"
              colorScheme={buy ? "green" : "red"}
              width="full"
              onClick={handleSubmit}
            >
              Submit {buy ? "Buy" : "Sell"} Order
            </Button>
          </VStack>
        </div>
      </>
    </Box>
  );
}
