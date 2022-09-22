import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Heading, SimpleGrid, Flex, Tooltip, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { currency } from '../../../../utils/currency';
import { CollateralType } from '../../../../utils/types';
import { Balance } from '../../Stake/Balance';
import { NumberInput } from './NumberInput';
interface Props {
  collateral: CollateralType;
  setCollateralChange: (value: number) => void;
  collateralChange: number;
  collateralAmount: number;
  setDebtChange: (value: number) => void;
  debtChange: number;
  debt: number;
  maxDebt: number;
}

export const Custom: FC<Props> = ({
  collateral,
  collateralChange,
  collateralAmount,
  setCollateralChange,
  setDebtChange,
  debtChange,
  debt,
  maxDebt,
}) => {
  const balance = useTokenBalance(collateral.address);

  return (
    <Box mb="4">
      <SimpleGrid columns={2} spacing={6} mb="4">
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust Collateral
          </Heading>

          <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
            <Flex mb="3">
              <NumberInput
                value={collateralAmount + collateralChange}
                onChange={(val) => {
                  setCollateralChange(val - collateralAmount);
                }}
                max={balance.formatedValue + collateralAmount}
              />
            </Flex>
            <Flex alignItems="center">
              <Balance
                onMax={(balance) => setCollateralChange(parseFloat(balance) || 0)}
                balance={balance.value}
                decimals={collateral.decimals}
                symbol={collateral.symbol}
              />
            </Flex>
          </Box>
        </Box>
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust snxUSD Debt
          </Heading>

          <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
            <form>
              <Flex mb="3">
                <NumberInput
                  value={debt + debtChange}
                  onChange={(val) => {
                    setDebtChange(val - debt);
                  }}
                  max={maxDebt + debt}
                />
              </Flex>
            </form>
            <Flex alignItems="center">
              <Box>
                <Text fontSize="xs">
                  Max Mint: ${currency(maxDebt)}
                  <Tooltip label="You can't mint snxUSD that takes your C-Ratio below the target c-ratio of 300%.">
                    <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
                  </Tooltip>
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      <Text>
        This adjustment will{' '}
        <strong>
          {collateralChange > 0 ? 'stake' : 'un-stake'} {Math.abs(collateralChange)}{' '}
          {collateral.symbol}
        </strong>{' '}
        and{' '}
        <strong>
          {debtChange > 0 ? 'mint' : 'burn'} {Math.abs(debtChange)} snxUSD
        </strong>
        .
      </Text>
    </Box>
  );
};
