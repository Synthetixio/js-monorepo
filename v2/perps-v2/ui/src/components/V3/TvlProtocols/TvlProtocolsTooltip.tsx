import { Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../../Dashboard';
import { BLOCKCHAIN_COLORS } from './TvlProtocols';
import { format } from 'date-fns';

type TvlProtocolsTooltipProps = {
  active?: boolean;
  payload?: any[];
  blockchains?: string[];
  label?: string;
};

export const TvlProtocolsTooltip = ({ payload, blockchains }: TvlProtocolsTooltipProps) => {
  const tvlProtocols = payload?.[0]?.payload as any;

  if (!tvlProtocols) {
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
        {tvlProtocols.labelType === 'M'
          ? tvlProtocols.label
          : format(new Date(tvlProtocols.day), 'yyyy-MM-dd')}
      </Text>
      {blockchains?.map((blockchain, index) => {
        return (
          <Flex key={index} mb={2} justifyContent="space-between" w="100%">
            <KeyColour label={blockchain} colour={BLOCKCHAIN_COLORS[index]} />
            <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
              ${formatNumber(tvlProtocols[blockchain + 'LayerUsd'])}
            </Text>
          </Flex>
        );
      })}
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(tvlProtocols.totalUsd)}
        </Text>
      </Flex>
    </Flex>
  );
};
