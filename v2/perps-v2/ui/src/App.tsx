import React, { useEffect } from 'react';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PositionsTable } from './components/PositionsTable';
import { useGetSynthetix } from './queries/synthetix';
import { numberWithCommas } from './utils/numbers';

function App() {
  const navigate = useNavigate();
  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const { data } = useGetSynthetix();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
    >
      <Heading size="sm">Add a wallet address:</Heading>
      <Input placeholder="Address" w="50%" {...register('address')} />
      <Button onClick={() => navigate(getValues('address'))}>Query</Button>
      <Divider />
      <Text>- OR -</Text>
      <Link to="/actions" style={{ textDecorationLine: 'underline' }}>
        See all actions that happened
      </Link>
      <Text>- OR -</Text>
      <Heading size="lg">Overview</Heading>
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
            {numberWithCommas(
              (Number(data.synthetix.feesByLiquidations) / 1e18).toFixed(2)
            )}
          </Text>
          <Text>
            Fees by Trades: $
            {numberWithCommas(
              (
                Number(data.synthetix.feesByPositionModifications) / 1e18
              ).toFixed(2)
            )}
          </Text>
          <Text>
            Total Volume: $
            {numberWithCommas(
              (Number(data.synthetix.totalVolume) / 1e18).toFixed(2)
            )}
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
      <Divider m="2" />
      <PositionsTable />
    </Flex>
  );
}

export default App;
