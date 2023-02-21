import { FC } from 'react';

import { useGetSynthetix } from './queries/synthetix';
import { PositionsTable } from './components/PositionsTable';
import { Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { numberWithCommas } from './utils/numbers';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const All: FC = () => {
  const { data } = useGetSynthetix();

  return (
    <Flex flexDir="column" alignItems="center">
      <Link to="/">
        <Flex alignItems="center" gap="2" margin="2">
          <ArrowBackIcon />
          Back
        </Flex>
      </Link>
      {data && (
        <Flex
          border="1px solid"
          borderColor="cyan.500"
          borderRadius="base"
          flexDir="column"
          alignItems="center"
          p="4"
        >
          <Heading color="cyan.500">Synthetix Stats</Heading>
          <Divider my="2" />
          <Text>
            Fees by Liquidations: $
            {numberWithCommas((Number(data.synthetix.feesByLiquidations) / 1e18).toFixed(2))}
          </Text>
          <Text>
            Fees by Trades: $
            {numberWithCommas(
              (Number(data.synthetix.feesByPositionModifications) / 1e18).toFixed(2)
            )}
          </Text>
          <Text>
            Total Volume: $
            {numberWithCommas((Number(data.synthetix.totalVolume) / 1e18).toFixed(2))}
          </Text>
          <Text>
            Total Liquidations:&nbsp;
            {numberWithCommas(data.synthetix.totalLiquidations)}
          </Text>
          <Text>
            Total Traders:&nbsp;
            {numberWithCommas(data.synthetix.totalTraders)}
          </Text>
        </Flex>
      )}
      <PositionsTable />
    </Flex>
  );
};
