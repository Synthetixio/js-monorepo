import { Flex, Text } from '@chakra-ui/react';
import { fromUnixTime, format } from 'date-fns';
import { TradesRange } from '../../hooks';
import { KeyColour } from './KeyColour';

type TradesTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const TradesTooltip = ({ payload }: TradesTooltipProps) => {
  const tradersInfo = payload?.[0]?.payload as TradesRange;

  if (!tradersInfo) {
    return null;
  }

  const timestamp = format(fromUnixTime(tradersInfo.timestamp), 'yyyy-MM-dd');
  const totalTrades = tradersInfo.count;

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
        {timestamp}
      </Text>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Total trades" colour="whiteAlpha.400" />
        <Text fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {totalTrades}
        </Text>
      </Flex>
    </Flex>
  );
};
