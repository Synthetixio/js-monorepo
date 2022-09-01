import { Text, Box, Input, Flex, Heading } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { FC } from 'react';
import { CollateralType } from '../../../../utils/types';
import { Balance } from '../../Stake/Balance';

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
