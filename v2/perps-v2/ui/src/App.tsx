import React, { useEffect } from 'react';
import { Button, Divider, Flex, Heading, Input, Text, useColorMode } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function App() {
  const navigate = useNavigate();
  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" gap="2">
      <Heading size="sm">Add a wallet address:</Heading>
      <Input placeholder="Address" w="50%" {...register('address')} />
      <Button onClick={() => navigate(getValues('address'))}>Query</Button>
      <Text>- OR -</Text>
      <Link to="/actions" style={{ textDecorationLine: 'underline' }}>
        See the list of positions
      </Link>
      <Divider />
    </Flex>
  );
}

export default App;
