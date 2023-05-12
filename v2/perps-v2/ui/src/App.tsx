import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { AllActionsTable } from './components/Actions';

function App() {
  return (
    <>
      <Flex flexDir="column" px="40px" py={2}>
        <Heading fontSize="24px" my={2}>
          Actions
        </Heading>
        <AllActionsTable />
      </Flex>
    </>
  );
}

export default App;
