import { Text, Box, Link, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useContract } from '../../../../hooks';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { contracts } from '../../../../utils/constants';

import { Balance } from '../../Stake/Balance';
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
    <Box mb="6">
      <Heading fontSize="md" mb="1">
        Burn snxUSD
      </Heading>
      <Text fontSize="sm" mb="2">
        Reduce your debt and improve your C-Ratio. You can purchase snxUSD from most major
        exchanges.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput
            value={value}
            onChange={onChange}
            max={Math.min(balance.formatedValue, debt)}
          />
        </Flex>
        <Flex alignItems="center">
          <Balance
            balance={balance.value}
            onMax={() => onChange(Math.min(balance.formatedValue, debt) || 0)}
            decimals={balance.decimals}
            symbol="snxUsd"
          />
        </Flex>
      </Box>
    </Box>
  );
};
