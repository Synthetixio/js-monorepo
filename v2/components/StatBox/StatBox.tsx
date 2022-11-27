import { Flex, FlexProps, Skeleton, Text } from '@chakra-ui/react';

interface StatboxProps extends FlexProps {
  label: string;
  amount?: string;
}

export const StatBox = ({ label, amount, ...props }: StatboxProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="33%"
      maxW="325px"
      py="14px"
      px={6}
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      bg="whiteAlpha.50"
      {...props}
    >
      <Text fontFamily="heading" fontWeight="semibold" fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontFamily="heading" fontWeight="black" fontSize="2xl" color="white">
        {amount === undefined ? <Skeleton as="span" height={6} width={10} mt={2} /> : amount}
      </Text>
    </Flex>
  );
};
