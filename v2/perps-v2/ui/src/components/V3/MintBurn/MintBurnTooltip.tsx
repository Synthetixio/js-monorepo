import { Divider, Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../../Dashboard';
import { format } from 'date-fns';

type MintBurnTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const MintBurnTooltip = ({ payload }: MintBurnTooltipProps) => {
  const mintBurn = payload?.[0]?.payload as any;

  if (!mintBurn) {
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
        {mintBurn.labelType === 'M'
          ? mintBurn.label
          : format(new Date(mintBurn.day), 'yyyy-MM-dd')}
      </Text>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethSNX" colour="#522ED1" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.opSNXSupply)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opSNX" colour="#FC8738" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.ethSNXSupply)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.totalSNXSupply)}
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethMints" colour="#11946B" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.ethMints)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="ethBurns" colour="#FF4A60" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.ethBurns)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opMints" colour="#11946B" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.opMints)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="opBurns" colour="#FF4A60" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.opBurns)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(mintBurn.totalMintBurn)}
        </Text>
      </Flex>
    </Flex>
  );
};
