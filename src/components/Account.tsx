import { Formik, Field } from "formik";
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Box,
  Alert,
  AlertIcon,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
} from "@chakra-ui/react";

export function Account() {
  return (
    <Flex
      direction="column"
      height="100%"
      borderLeft="1px solid rgba(255,255,255,0.2)"
    >
      <Flex flexDirection="column" height="100%">
        <Box>
          <Box p="4" borderBottom="1px solid rgba(255,255,255,0.2)">
            <Flex align="center" mb="2">
              <Heading size="sm">Account Overview</Heading>
              <Button ml="auto" size="xs" colorScheme="purple">
                Deposit / Withdraw
              </Button>
            </Flex>
            {/* Need the before/after component */}
            <Box mb="1">Buying Power: $10,000</Box>
            <Box mb="1">Free Collateral: $1,000</Box>
            <Box mb="1">Margin Usage: 15%</Box>
            <Box mb="1">PnL</Box>
            <Alert status="warning" fontSize="sm">
              <AlertIcon />
              If margin usage exceeds 100% or free collateral goes below $0, you
              will be liquidated and lose everything you deposited.
            </Alert>
          </Box>

          <Box p="4" borderBottom="1px solid rgba(255,255,255,0.2)">
            <Flex align="center" mb="2">
              <Heading size="sm">Current Position</Heading>{" "}
              <Badge
                ml="2"
                colorScheme="green"
                fontSize="sm"
                borderRadius="4px"
              >
                Long
              </Badge>
            </Flex>
            {/* before and after */}
            <Box mb="1">Size: 1 ETH ($X)</Box>
            <Box mb="1">Leverage: 1&times;</Box>
            <Box mb="1">PnL</Box>
          </Box>
        </Box>
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
                      <Button
                        type="submit"
                        colorScheme="gray"
                        width="100%"
                        ml="1"
                      >
                        Sell
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="green"
                        width="100%"
                        mr="1"
                      >
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
      </Flex>
    </Flex>
  );
}
