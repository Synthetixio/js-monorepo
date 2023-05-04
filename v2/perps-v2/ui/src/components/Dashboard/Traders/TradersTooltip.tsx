import { Flex, Text } from '@chakra-ui/react';
import { KeyColour } from '../KeyColour';

type TradersTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const TradersTooltip = ({ payload }: TradersTooltipProps) => {
  const tradersInfo = payload?.[0]?.payload as any;

  if (!tradersInfo) {
    return null;
  }

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
        {tradersInfo.label}
      </Text>
      <Flex my={2} justifyContent="space-between" w="100%">
        <KeyColour label="Returning Traders" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {tradersInfo.existingTraders}
        </Text>
      </Flex>
      <Flex my={2} justifyContent="space-between" w="100%">
        <KeyColour label="New Traders" colour="pink.300" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {tradersInfo.newTraders}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Cumulative Traders" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {tradersInfo.cumulativeTraders}
        </Text>
      </Flex>
    </Flex>
  );
};
