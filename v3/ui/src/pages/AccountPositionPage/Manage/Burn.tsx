import { Alert, AlertIcon, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useContract } from '../../../hooks/useContract';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { contracts } from '../../../utils/constants';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from './NumberInput';
import { Wei } from '@synthetixio/wei';

export function Burn({
  onChange,
  value,
  debt,
}: {
  onChange: (value: number) => void;
  value: number;
  debt: Wei;
}) {
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const tokenBalance = useTokenBalance(snxUsdProxy?.address);

  return (
    <>
      <Heading fontSize="md" mb="1">
        Burn snxUSD
      </Heading>
      <Text fontSize="sm" mb="2">
        Reduce your debt and improve your C-Ratio. You can purchase snxUSD from most major
        decentralized exchanges.
      </Text>
      {debt ? (
        <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
          <Flex mb="3">
            <NumberInput
              value={value}
              onChange={onChange}
              max={
                tokenBalance.data
                  ? Math.min(tokenBalance.data.toNumber(), debt.toNumber())
                  : debt.toNumber()
              }
            />
          </Flex>
          <Flex alignItems="center">
            <Balance
              balance={tokenBalance.data}
              onMax={() => {
                if (!tokenBalance.data) {
                  return;
                }
                onChange(Math.min(tokenBalance.data.toNumber(), debt.toNumber()));
              }}
              symbol="snxUSD"
              address={snxUsdProxy?.address}
            />
          </Flex>
        </Box>
      ) : (
        <Alert mt={3}>
          <AlertIcon />
          You cannot burn snxUSD because you have no debt.
        </Alert>
      )}
    </>
  );
}
