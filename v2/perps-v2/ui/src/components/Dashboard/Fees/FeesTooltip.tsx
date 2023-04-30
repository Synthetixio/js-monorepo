import { Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../KeyColour';

type TradersTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const FeesTooltip = ({ payload }: TradersTooltipProps) => {
  const feesInfo = payload?.[0]?.payload as any;

  if (!feesInfo) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      bg="navy.900"
      padding={4}
      minWidth="190px"
      width="fit-content"
      borderRadius="md"
      borderWidth="1px"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {feesInfo.day}
      </Text>
      <Flex my={2} justifyContent="space-between" w="100%">
        <KeyColour label="Total Fees" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {formatNumber(feesInfo.fees)}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Cumulative Fees" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {formatNumber(feesInfo.cumulativeFees)}
        </Text>
      </Flex>
    </Flex>
  );
};
