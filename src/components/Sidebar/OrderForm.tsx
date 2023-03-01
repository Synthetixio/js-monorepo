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
} from "@chakra-ui/react";

export function OrderForm() {
  return (
    <Box flex="1" overflowY="scroll" p="4">
      <Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched }) => {
          return (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack spacing={4} align="flex-start" w="100%">
                <Flex direction="row" width="100%" gap="4">
                  <Button type="submit" colorScheme="gray" width="100%" ml="1">
                    Sell
                  </Button>
                  <Button type="submit" colorScheme="green" width="100%" mr="1">
                    Buy
                  </Button>
                </Flex>
                <FormControl>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <Field
                    as={Input}
                    id="amount"
                    name="amount"
                    type="number"
                    variant="filled"
                  />
                </FormControl>

                <Flex alignItems="center" width="100%">
                  <Divider flex="1" />
                  <Text mx={3} fontSize="sm">
                    OR
                  </Text>
                  <Divider flex="1" />
                </Flex>

                <FormControl>
                  <FormLabel htmlFor="amount">Leverage</FormLabel>
                  <Flex align="center">
                    <Box flex="3">
                      <Slider aria-label="slider-ex-4" defaultValue={30}>
                        <SliderTrack bg="red.100">
                          <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                          <Box color="tomato" />
                        </SliderThumb>
                      </Slider>
                    </Box>
                    <Box flex="1" ml="4">
                      <Field
                        as={Input}
                        id="amount"
                        name="amount"
                        type="number"
                        variant="filled"
                      />
                    </Box>
                  </Flex>
                </FormControl>

                <Button type="submit" colorScheme="green" width="full">
                  Submit Buy Order
                </Button>
              </VStack>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
}
