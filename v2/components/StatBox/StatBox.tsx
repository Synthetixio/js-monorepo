import { Fade, Flex, FlexProps, Skeleton, Text } from '@chakra-ui/react';

interface StatboxProps extends FlexProps {
  label: string;
  amount?: string;
  isLoading?: boolean;
}

export const StatBox = ({ label, amount, isLoading, ...props }: StatboxProps) => {
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

      {isLoading ? (
        <Skeleton height="28px" width="50%" mt="8px" />
      ) : (
        <Fade in={!isLoading}>
          <Text fontFamily="heading" fontWeight="black" fontSize="2xl" color="white">
            {amount}
          </Text>
        </Fade>
      )}
    </Flex>
  );
};
