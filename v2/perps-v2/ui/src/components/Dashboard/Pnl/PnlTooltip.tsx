import { Flex, Text } from '@chakra-ui/react';
import { KeyColour } from '../KeyColour';

type PnlTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const PnlTooltip = ({ payload }: PnlTooltipProps) => {
  const pnlInfo = payload?.[0]?.payload as any;
  const formatNumberOptions = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  if (!pnlInfo) {
    return null;
  }

  const formatDate = new Date(pnlInfo.day.replace(' ', 'T').replace(' UTC', 'Z'))
    .toISOString()
    .slice(0, 10);

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
        {formatDate}
      </Text>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Daily Fee" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${pnlInfo.daily_fee.toLocaleString('en-US', formatNumberOptions)}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Pnl (Stakers)" colour="cyan.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${pnlInfo.total_pnl.toLocaleString('en-US', formatNumberOptions)}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Loss" colour="pink.300" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${pnlInfo.loss.toLocaleString('en-US', formatNumberOptions)}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Profit" colour="teal.300" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${pnlInfo.profit.toLocaleString('en-US', formatNumberOptions)}
        </Text>
      </Flex>
    </Flex>
  );
};