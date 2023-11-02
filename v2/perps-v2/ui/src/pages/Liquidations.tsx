import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { MarketSelect } from '../components';
import { useMarketSummaries } from '../hooks/useMarketSummaries';
import { LiquidationsTable } from '../components/Liquidations';

export function Liquidations() {
  const markets = useMarketSummaries();
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Liquidations
        </Heading>
        <Flex>
          <MarketSelect markets={markets.data?.map((x) => x.asset)} route="liquidations" />
          {/* Currently Buggered */}
          {/* <SizeSelect route="liquidations" /> */}
        </Flex>
        <LiquidationsTable />
      </Flex>
    </>
  );
}

export default Liquidations;
