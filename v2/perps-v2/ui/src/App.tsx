import React from 'react';
import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AllActionsTable } from './components/Actions';
import { SearchIcon } from '@chakra-ui/icons';

function App() {
  const navigate = useNavigate();

  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });

  const onSubmit = () => {
    if (getValues('address')) {
      navigate(`/${getValues('address')}`);
    }
  };

  return (
    <>
      <Flex flexDir="column" px="40px" py={2}>
        <Flex alignSelf="end" width="50%" justifyContent="flex-end" alignItems="center">
          <Input
            mt={8}
            placeholder="Search by address"
            w="38%"
            minW="250px"
            {...register('address')}
            alignSelf="end"
            borderColor="gray.900"
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                onSubmit();
              }
            }}
          />
          <Button
            variant="unstyled"
            mt={8}
            ml={3}
            borderWidth="1px"
            borderColor="gray.900"
            py="7px"
            px="12px"
            borderRadius="7px"
            onClick={onSubmit}
          >
            <SearchIcon color="gray.100" />
          </Button>
        </Flex>
        <Heading fontSize="24px" my={2}>
          Actions
        </Heading>
        <AllActionsTable />
      </Flex>
    </>
  );
}

export default App;
