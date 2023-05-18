import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { AllActionsTable } from '../components/Actions';

export function Actions() {
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Actions
        </Heading>
        <AllActionsTable />
      </Flex>
    </>
  );
}

export default Actions;
