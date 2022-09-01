import { Text, Box, Input, Button, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { CollateralType } from '../../../../utils/types';
import { Balance } from '../../Stake/Balance';

interface Props {
  collateral: CollateralType;
}

export const Stake: FC<Props> = ({ collateral }) => {
  const balanceData = useTokenBalance(collateral.address);

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
              Mint
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Balance
            balance={balanceData?.value}
            decimals={collateral.decimals}
            symbol={collateral.symbol}
          />
        </Flex>
      </Box>
    </Box>
  );
};
