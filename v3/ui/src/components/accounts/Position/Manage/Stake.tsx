import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { FC } from 'react';
import { CollateralType } from '../../../../utils/types';
import { Balance } from '../../Stake/Balance';
import { NumberInput } from './NumberInput';

interface Props {
  collateral: CollateralType;
  balance: BigNumber;
  onChange: (value: number) => void;
  value: number;
}

export const Stake: FC<Props> = ({ collateral, balance, value, onChange }) => {
  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Stake SNX
      </Heading>
      <Text fontSize="sm" mb="1">
        Provide collateral to improve your C-ratio. This decreases your risk of liquidation and
        increases the amount of snxUSD you can borrow.
      </Text>

      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={(balance) => onChange(parseFloat(balance) || 0)}
            balance={balance}
            decimals={collateral.decimals}
            symbol={collateral.symbol}
          />
        </Flex>
      </Box>
    </Box>
  );
};
