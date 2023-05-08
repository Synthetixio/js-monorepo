import { Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { KeyColour } from '../KeyColour';

type VolumeTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export const VolumeTooltip = ({ payload }: VolumeTooltipProps) => {
  const volumeInfo = payload?.[0]?.payload as any;

  if (!volumeInfo) {
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
      borderColor="gray.900"
    >
      <Text mb={2} fontFamily="heading" color="gray.500" fontSize="12px" lineHeight="16px">
        {volumeInfo.labelType === 'M' ? volumeInfo.day : volumeInfo.label}
      </Text>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Volume" colour="whiteAlpha.400" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {formatNumber(volumeInfo.volume)}
        </Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between" w="100%">
        <KeyColour label="Cumulative" colour="cyan.500" />
        <Text ml={3} fontFamily="heading" fontSize="12px" lineHeight="16px" textAlign="center">
          {formatNumber(volumeInfo.cumulativeVolume)}
        </Text>
      </Flex>
    </Flex>
  );
};
