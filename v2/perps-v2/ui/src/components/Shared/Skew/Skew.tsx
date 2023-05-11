import { Progress, Td, Flex, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';

interface SkewProps {
  skew: number;
}

export const Skew = ({ skew }: SkewProps) => {
  return (
    <Td
      border="none"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="heading"
      fontWeight={500}
      height={0}
    >
      <Flex
        height="100%"
        width="100%"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Progress
          bg="red.500"
          colorScheme="green"
          height="5px"
          minWidth="120px"
          width="100%"
          size="md"
          value={skew * 100}
        />
        <Flex justifyContent="space-between" width="100%">
          <Text fontFamily="heading" fontSize="12px" lineHeight="16px" color="green.500">
            {formatNumber(skew * 100, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}%
          </Text>
          <Text fontFamily="heading" fontSize="12px" lineHeight="16px" color="red.500">
            {formatNumber(100 - skew * 100, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            %
          </Text>
        </Flex>
      </Flex>
    </Td>
  );
};
