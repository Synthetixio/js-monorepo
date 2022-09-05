import { Input, Box, Text } from '@chakra-ui/react';

interface MintProps {
  snxBalance: string;
}

export const Mint = ({ snxBalance }: MintProps) => {
  return (
    <Box>
      <Text>How much SNX do you want to stake</Text>
      <Text>{snxBalance}</Text>
      <Box>
        <Input placeholder="Hello World" />
      </Box>
    </Box>
  );
};
