import { Input, Box, Text } from '@chakra-ui/react';

interface MintProps {
  snxBalance: string;
}

export const Mint = () => {
  return (
    <Box>
      <Text>How much SNX do you want to stake</Text>
      <Box>
        <Input>Input Here</Input>
      </Box>
    </Box>
  );
};
