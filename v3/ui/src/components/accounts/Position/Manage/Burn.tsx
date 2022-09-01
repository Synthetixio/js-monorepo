import { Text, Box, Link, Input, Button, Flex, Heading } from '@chakra-ui/react';
import { useContract } from '../../../../hooks';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { contracts } from '../../../../utils/constants';
import { Balance } from '../../Stake/Balance';

export default function Burn() {
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const balanceData = useTokenBalance(snxUsdProxy?.address);

  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Burn snxUSD
      </Heading>
      <Text fontSize="sm" mb="1">
        Reduce your debt and improve your C-Ratio. You can purchase snxUSD from most major exchanges
        like{' '}
        <Link
          display="inline"
          _hover={{ textDecoration: 'none' }}
          borderBottom="1px dotted rgba(255,255,255,0.5)"
        >
          one we like
        </Link>
        .
      </Text>

      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
        <form>
          <Flex mb="3">
            <Input
              flex="1"
              type="number"
              border="none"
              placeholder="0.0"
              // value={null}
              onChange={() => null}
            />
            <Button
              display="none"
              // isLoading={null}
              // isDisabled={null}
              colorScheme="blue"
              ml="4"
              px="8"
              type="submit"
            >
              Burn
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Balance balance={balanceData?.value} decimals={balanceData.decimals} symbol="snxUsd" />
        </Flex>
      </Box>
    </Box>
  );
}
