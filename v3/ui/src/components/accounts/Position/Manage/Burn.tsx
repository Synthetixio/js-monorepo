import { Text, Box, Link, Input, Flex, Heading } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { FC } from 'react';

import { Balance } from '../../Stake/Balance';

interface Props {
  balance: BigNumber;
  onChange: (value: number) => void;
  value: number;
}

export const Burn: FC<Props> = ({ balance, onChange, value }) => {
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
              min="0"
              step="any"
              value={value ? `${value}`.replace(/^0+/, '') : 0}
              onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            />
          </Flex>
        </form>
        <Flex alignItems="center">
          <Balance balance={balance} decimals={18} symbol="snxUsd" />
        </Flex>
      </Box>
    </Box>
  );
};
