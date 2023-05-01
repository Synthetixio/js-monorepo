import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputRightElement,
  Heading,
  Input,
  InputGroup,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
  Code,
} from "@chakra-ui/react";
import { Header } from "../../components";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import {
  useSpotMarketInfo,
  useSpotMarketStat,
} from "../../hooks/spot/useSpotMarketInfo";
import { useParams } from "react-router-dom";
import { spotMarkets } from "../../constants/markets";
import { useTokenInfo } from "../../hooks/useTokenInfo";

export function SpotMarket() {
  const { marketId } = useParams();
  const id = spotMarkets[marketId?.toUpperCase() || ""].marketId;
  const { synthAddress, marketName } = useSpotMarketInfo(id);
  const { reportedDebt } = useSpotMarketStat(id);
  const { symbol, decimals, name } = useTokenInfo(synthAddress);

  if (!id || !synthAddress) {
    return null;
  }

  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <>
        <Header isSpot />
        <Flex flex="1" height="100%" minHeight={0}>
          <Box
            borderRight="1px solid rgba(255,255,255,0.2)"
            flex="2"
            maxHeight="100%"
          >
            <Box borderBottom="1px solid rgba(255,255,255,0.2)" p="4">
              <Heading size="md">ETH (Market Switcher)</Heading>
            </Box>
            <Box borderBottom="1px solid rgba(255,255,255,0.2)" p="4">
              <div key="form" style={{ width: "100%" }}>
                <VStack spacing={4} align="flex-start" w="100%">
                  <FormLabel htmlFor="amount">Order Type</FormLabel>
                  <Flex direction="row" width="100%" gap="4">
                    <Button
                      colorScheme={true ? "green" : "gray"}
                      width="100%"
                      mr="1"
                    >
                      Buy
                    </Button>
                    <Button
                      colorScheme={false ? "green" : "gray"}
                      width="100%"
                      mr="1"
                    >
                      Sell
                    </Button>
                    <Button
                      colorScheme={false ? "green" : "gray"}
                      width="100%"
                      mr="1"
                    >
                      Wrap
                    </Button>
                    <Button
                      colorScheme={false ? "gray" : "gray"}
                      width="100%"
                      ml="1"
                    >
                      Unwrap
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
                        value={""}
                      />
                      <InputRightElement width="6rem">snxUSD</InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>Slippage protection</FormControl>
                  <FormControl>atomic / async selector</FormControl>
                  <Button
                    key="button"
                    type="submit"
                    size="lg"
                    colorScheme={true ? "green" : "red"}
                    width="full"
                  >
                    Submit
                  </Button>
                </VStack>
              </div>
            </Box>
            <Box p="4">
              <Heading size="md" mb="3">
                Market Details
              </Heading>

              <Box mb="2">
                <Heading size="xs">Name</Heading>
                {marketName}
              </Box>

              <Box mb="2">
                <Heading size="xs">Synth Address</Heading>
                {synthAddress}
              </Box>

              <Box mb="2">
                <Heading size="xs">Market Price</Heading>
                $0
              </Box>

              <Box mb="2">
                <Heading size="xs">snxETH Issued</Heading>
                {reportedDebt.toNumber().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Box>

              <Box mb="2">
                <Heading size="xs">snxUSD Deposited</Heading>
                $0
              </Box>

              <Box mb="2">
                <Heading size="xs">Market Collateralization</Heading>
                $0
              </Box>

              <Box mb="2">
                <Heading size="xs">Market Credit Capacity</Heading>
                $0
              </Box>
            </Box>
          </Box>
          <Box flex="5" pb="32px">
            <Flex direction="column" height="100%" width="100%">
              <AdvancedRealTimeChart
                theme="dark"
                autosize
                symbol={"ETHUSD"}
              ></AdvancedRealTimeChart>
            </Flex>
          </Box>
        </Flex>
      </>
    </Flex>
  );
}
