import { Text, Box, Flex, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { FC } from 'react';
import { useContract } from '../../../../hooks/useContract';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { contracts } from '../../../../utils/constants';

import { Balance } from '@snx-v3/Balance';
import { NumberInput } from './NumberInput';

interface Props {
  onChange: (value: number) => void;
  value: number;
  debt: number;
}

export const Burn: FC<Props> = ({ onChange, value, debt }) => {
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const balance = useTokenBalance(snxUsdProxy?.address);

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
              max={Math.min(balance.formattedValue, debt)}
            />
          </Flex>
          <Flex alignItems="center">
            <Balance
              balance={balance.value}
              onMax={() => onChange(Math.min(balance.formattedValue, debt) || 0)}
              symbol="snxUsd"
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
};
