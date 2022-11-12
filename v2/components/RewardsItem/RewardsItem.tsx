import { Box, Text, Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface RewardsItemProps {
  isLoading: boolean;
  Icon: FC;
  title: string;
  description: string;
  apyReturn: string;
}

export const RewardsItem = ({
  isLoading,
  Icon,
  title,
  description,
  apyReturn,
}: RewardsItemProps) => {
  console.log(isLoading, Icon);
  return (
    <Flex justifyContent="space-between">
      <Box
        w="44px"
        height="44px"
        bgGradient="linear(to-b, pink.500, cyan.500)"
        borderRadius="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon />
      </Box>
      <Box>
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="black"
          lineHeight="5"
          color="whiteAlpha.900"
        >
          {title}
        </Text>
        <Text fontFamily="heading" fontSize="xs" lineHeight="4" color="whiteAlpha.600">
          {description}
        </Text>
      </Box>
      <Box>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Box>
      <Box>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Box>
      <Box>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Box>
      <Box>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Box>
    </Flex>
  );
};
