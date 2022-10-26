import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Tooltip,
  Text,
  Badge,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
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
      <SimpleGrid columns={2} spacing={4} mb="4">
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust Collateral
          </Heading>

          <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
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
                address={collateral.address}
              />
            </Flex>
          </Box>
        </Box>
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust Debt
          </Heading>

          <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
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
                  {maxDebt !== 0 && (
                    <Badge
                      transform="translateY(-2px)"
                      ml="2"
                      as="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        setDebtChange(maxDebt);
                      }}
                    >
                      Use Max
                    </Badge>
                  )}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      {(collateralChange !== 0 || debtChange !== 0) && (
        <Alert>
          <AlertIcon />
          <Box>
            This adjustment will&nbsp;
            {collateralChange !== 0 && (
              <strong>
                {collateralChange > 0 ? 'stake' : 'unstake'} {Math.abs(collateralChange)}&nbsp;
                {collateral.symbol.toUpperCase()}
              </strong>
            )}
            {collateralChange !== 0 && debtChange !== 0 && `\u00A0and\u00A0`}
            {debtChange !== 0 && (
              <strong>
                {debtChange > 0 ? 'mint' : 'burn'} {Math.abs(debtChange)} snxUSD
              </strong>
            )}
            .
          </Box>
        </Alert>
      )}
    </Box>
  );
};
