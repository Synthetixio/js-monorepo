import { Fade, Flex, FlexProps, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@snx-v2/icons';

interface StatboxProps extends FlexProps {
  label: string;
  amount?: string;
  isLoading?: boolean;
  titleToolTip?: string;
}

export const StatBox = ({ label, amount, titleToolTip, isLoading, ...props }: StatboxProps) => {
  const labelComp = titleToolTip ? (
    <Tooltip label={titleToolTip}>
      <Flex display="flex" gap={1} alignItems="center">
        {label} <InfoIcon />
      </Flex>
    </Tooltip>
  ) : (
    label
  );
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="33%"
      maxW="325px"
      py="14px"
      px={{ base: 2, sm: 6 }}
      borderRadius="base"
      borderWidth="1px"
      borderColor="gray.900"
      bg="whiteAlpha.50"
      {...props}
    >
      <Text
        fontFamily="heading"
        fontWeight="semibold"
        fontSize={{ base: 'xs', sm: 'sm' }}
        color="gray.500"
      >
        {labelComp}
      </Text>

      {isLoading ? (
        <Skeleton height="28px" width="50%" mt="8px" />
      ) : (
        <Fade in={!isLoading}>
          <Text
            fontFamily="heading"
            fontWeight="black"
            fontSize={{ base: 'lg', sm: '2xl' }}
            color="white"
          >
            {amount}
          </Text>
        </Fade>
      )}
    </Flex>
  );
};
