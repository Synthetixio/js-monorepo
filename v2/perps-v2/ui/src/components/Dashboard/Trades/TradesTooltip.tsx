import { Flex, Text } from '@chakra-ui/react';
import { KeyColour } from '../KeyColour';

type TradesTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const TradesTooltip = ({ payload }: TradesTooltipProps) => {
  const tradesInfo = payload?.[0]?.payload as any;

  if (!tradesInfo) {
    return null;
  }

  const totalTrades = tradesInfo.trades;
  const cumulativeTrades = tradesInfo.cumulativeTrades;

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.900"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {tradesInfo.label}
      </Text>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Total trades" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {totalTrades}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="All Time Trades" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {cumulativeTrades}
        </Text>
      </Flex>
    </Flex>
  );
};
