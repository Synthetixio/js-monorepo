import { Formik, Field } from "formik";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

export function OrderForm() {
  const [useNativeUnit, setUseNativeUnit] = useState(true);
  const toggleNativeUnit = () => setUseNativeUnit(!useNativeUnit);

  const [buy, setBuy] = useState(true);

  return (
    <Box flex="1" overflowY="scroll" p="4">
      <Formik
        initialValues={{
          amount: 0,
          leverage: 0,
        }}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched }) => {
          return (
            <>
              <Heading size="sm" mb="3">
                Market Order
              </Heading>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <VStack spacing={4} align="flex-start" w="100%">
                  <Flex direction="row" width="100%" gap="4">
                    <Button
                      onClick={() => setBuy(true)}
                      colorScheme={buy ? "green" : "gray"}
                      width="100%"
                      mr="1"
                    >
                      Buy
                    </Button>
                    <Button
                      onClick={() => setBuy(false)}
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
                      <Field
                        as={Input}
                        id="amount"
                        name="amount"
                        type="number"
                        variant="filled"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={toggleNativeUnit}
                        >
                          {useNativeUnit ? "ETH" : "USD"}
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
                      <Box flex="3">
                        <Slider aria-label="slider" defaultValue={30}>
                          <SliderTrack bg={buy ? "green.900" : "red.900"}>
                            <SliderFilledTrack
                              bg={buy ? "green.400" : "red.400"}
                            />
                          </SliderTrack>
                          <SliderThumb boxSize={6}></SliderThumb>
                        </Slider>
                      </Box>
                      <Box flex="1" ml="4">
                        <InputGroup width="120px">
                          <Field
                            as={Input}
                            id="leverage"
                            name="leverage"
                            type="number"
                            variant="filled"
                          />
                          <InputRightAddon children="×" />
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
          );
        }}
      </Formik>
    </Box>
  );
}
