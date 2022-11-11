import { Box, Text, Flex } from '@chakra-ui/react';

interface RewardsItemProps {
  isLoading: boolean;
  icon: string;
  title: string;
  description: string;
  apyReturn: string;
}

export const RewardsItem = ({
  isLoading,
  icon,
  title,
  description,
  apyReturn,
}: RewardsItemProps) => {
  console.log(isLoading, icon);
  return (
    <Flex justifyContent="space-between">
      <Box>
        <Text>{apyReturn}</Text>
        <Text>Est. APY</Text>
      </Box>
      <Box>
        <Text>{title}</Text>
        <Text>{description}</Text>
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
