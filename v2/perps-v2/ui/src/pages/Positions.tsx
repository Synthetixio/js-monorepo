import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { OpenPositionsTable } from '../components/OpenPositions';
import { OpenPositionsFilter } from '../components/OpenPositions/OpenPositionsFilter';

export function Positions() {
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Open Positions
        </Heading>
        <Flex>
          <OpenPositionsFilter route='positions' />
        </Flex>
        <OpenPositionsTable />
      </Flex>
    </>
  );
}

export default Positions;
