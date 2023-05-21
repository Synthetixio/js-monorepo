import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { AllActionsTable } from '../components/Actions';
import { MarketSelect, SizeSelect } from '../components';
import { FuturesMarketAsset } from '../utils';

export function Actions() {
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Actions
        </Heading>
        <Flex>
          <MarketSelect markets={Object.values(FuturesMarketAsset)} />
          <SizeSelect />
        </Flex>
        <AllActionsTable />
      </Flex>
    </>
  );
}

export default Actions;
