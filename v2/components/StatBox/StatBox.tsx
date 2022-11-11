import { Flex, Text } from '@chakra-ui/react';

interface RewardsStatProps {
  label: string;
  amount: string;
  align?: 'start' | 'center' | 'end';
}

export const StatBox = ({ label, amount, align = 'center' }: RewardsStatProps) => {
  return (
    <Flex
      alignItems={align}
      flexDirection="column"
      w="33%"
      maxW="325px"
      py="14px"
      px={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.900"
      bg="whiteAlpha.50"
    >
      <Text fontFamily="heading" fontWeight="semibold" fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontFamily="heading" fontWeight="black" fontSize="2xl" color="white">
        {amount}
      </Text>
    </Flex>
  );
};
