import { Flex, FlexProps, Skeleton, Text } from '@chakra-ui/react';

export const StatBox = ({
  label,
  amount,
  containerStyles,
}: {
  label: string;
  amount?: string;
  containerStyles?: FlexProps;
}) => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      w="33%"
      maxW="325px"
      py="14px"
      px={6}
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      bg="whiteAlpha.50"
      {...containerStyles}
    >
      <Text fontFamily="heading" fontWeight="semibold" fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontFamily="heading" fontWeight="black" fontSize="2xl" color="white">
        {amount === undefined ? <Skeleton height={6} width={10} mt={2} /> : amount}
      </Text>
    </Flex>
  );
};
