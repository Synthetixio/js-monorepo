import { Input, Box, Text, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface MintProps {
  snxBalance: string;
}

export const Mint = ({ snxBalance }: MintProps) => {
  const [state, setState] = useState<string>('');

  const setMax = () => setState(snxBalance);
  return (
    <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="md" p={4}>
      <Text fontFamily="heading" fontWeight="extrabold" fontSize="xs">
        How much SNX do you want to stake
      </Text>
      <Text>{snxBalance}</Text>
      <Button onClick={setMax}>Set max</Button>
      <Flex justifyContent="space-between">
        <Text>Hello World</Text>
        <Input
          type="number"
          w="50%"
          placeholder="Hello World"
          onChange={(e) => setState(e.target.value)}
        />
      </Flex>
      <Text>{state}</Text>
    </Box>
  );
};
