import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { AllActionsTable } from '../components/Actions';
import { MarketSelect, SizeSelect } from '../components';
import { useMarketSummaries } from '../hooks/useMarketSummaries';

export function Actions() {
  const markets = useMarketSummaries();
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Actions
        </Heading>
        <Flex>
          <MarketSelect markets={markets.data?.map((x) => x.asset)} route="actions" />
          <SizeSelect />
        </Flex>
        <AllActionsTable />
      </Flex>
    </>
  );
}

export default Actions;
