import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { TvlProtocols } from '../components/V3/TvlProtocols';
import { TvlSNX } from '../components/V3/TvlSNX';
import { SNXusdSupply } from '../components/V3/SNXusdSupply';
import { DailyDelegationsBase } from '../components/V3/DailyDelegationsBase';

export function StatsV3() {
  return (
    <>
      <Flex flexDir="column" px={{ base: '16px', md: '40px' }} py={2}>
        <Heading fontSize="24px" my={2} mt={12}>
          Dashboard
        </Heading>
        <TvlProtocols />
        <TvlSNX />
        <DailyDelegationsBase />
        <SNXusdSupply />
      </Flex>
    </>
  );
}

export default StatsV3;
