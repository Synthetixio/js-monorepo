import { Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../../Dashboard';
import { format } from 'date-fns';

type TvlSNXTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const TvlLayerTooltip = ({ payload }: TvlSNXTooltipProps) => {
  const tvlLayer = payload?.[0]?.payload as any;

  if (!tvlLayer) {
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
        {tvlLayer.labelType === 'M' ? tvlLayer.label : format(new Date(tvlLayer.day), 'yyyy-MM-dd')}
      </Text>
      <Flex mb={2} justifyContent="space-between" w="100%">
        <KeyColour label="Ethereum SNX" colour="#522ED1" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(tvlLayer.opSNX)}
        </Text>
      </Flex>
      <Flex mb={2} justifyContent="space-between" w="100%">
        <KeyColour label="Optimism SNX" colour="#FC8738" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(tvlLayer.ethSNX)}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <KeyColour label="Total" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          ${formatNumber(tvlLayer.totalSNX)}
        </Text>
      </Flex>
    </Flex>
  );
};
