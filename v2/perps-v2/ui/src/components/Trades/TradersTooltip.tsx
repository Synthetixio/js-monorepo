import { Flex, Text } from '@chakra-ui/react';
import { fromUnixTime, format } from 'date-fns';
import { TraderRange } from '../../hooks';
import { KeyColour } from './KeyColour';

type TradersTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const TradersTooltip = ({ payload }: TradersTooltipProps) => {
  const tradersInfo = payload?.[0]?.payload as TraderRange;

  if (!tradersInfo) {
    return null;
  }

  const timestamp = format(fromUnixTime(tradersInfo.timestamp), 'yyyy-MM-dd');
  const newTraders = tradersInfo.newTraders;
  const returningTraders = tradersInfo.returningTraders;

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      borderRadius="md"
      borderWidth="1px"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {timestamp}
      </Text>
      <Flex my={2} justifyContent="space-between" w="100%">
        <KeyColour label="New Traders" colour="pink.300" />
        <Text fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {newTraders}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Returning Traders" colour="whiteAlpha.400" />
        <Text fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {returningTraders}
        </Text>
      </Flex>
    </Flex>
  );
};
