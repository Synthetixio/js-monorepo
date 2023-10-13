import { Divider, Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../../Dashboard';
import { format } from 'date-fns';

type SNXSupplyTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const SNXusdSupplyTooltip = ({ payload }: SNXSupplyTooltipProps) => {
  const snxSupply = payload?.[0]?.payload as any;

  if (!snxSupply) {
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
      sx={{ gap: 2 }}
    >
      <Text fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {snxSupply.labelType === 'M'
          ? snxSupply.label
          : format(new Date(snxSupply.day), 'yyyy-MM-dd')}
      </Text>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethSNX" colour="#522ED1" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.opSNXSupply)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opSNX" colour="#FC8738" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.ethSNXSupply)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.totalSNXSupply)}
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethMints" colour="#11946B" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.ethMints)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethBurns" colour="#FF4A60" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.ethBurns)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opMints" colour="#11946B" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.opMints)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opBurns" colour="#FF4A60" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.opBurns)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(snxSupply.totalMintBurn)}
        </Text>
      </Flex>
    </Flex>
  );
};
