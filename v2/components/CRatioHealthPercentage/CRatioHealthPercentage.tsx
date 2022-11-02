import { Skeleton, Text, Flex } from '@chakra-ui/react';

interface CRatioHealthPercentageProps {
  variant: 'success' | 'error' | 'warning';
  isLoading: boolean;
  currentCRatioPercentage: number | undefined;
}

export const CRatioHealthPercentage = ({
  variant,
  isLoading,
  currentCRatioPercentage,
}: CRatioHealthPercentageProps) => {
  return (
    <Flex
      bg="blackAlpha.800"
      alignItems="center"
      borderRadius="md"
      border="1px"
      borderColor="gray.900"
      padding="2"
    >
      <Skeleton minWidth="50px" isLoaded={!isLoading}>
        <Text color={variant} fontSize="2xl" fontWeight="black" align="center" fontFamily="mono">
          {currentCRatioPercentage ? `${Math.floor(currentCRatioPercentage)}%` : '0%'}
        </Text>
      </Skeleton>
    </Flex>
  );
};
