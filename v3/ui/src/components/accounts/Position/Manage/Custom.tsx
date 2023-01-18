import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { currency } from '@snx-v3/format';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from './NumberInput';
import { Wei, wei } from '@synthetixio/wei';

export function Custom({
  collateral,
  collateralChange,
  collateralAmount,
  setCollateralChange,
  setDebtChange,
  debtChange,
  debt,
  maxDebt,
}: {
  collateral: CollateralType;
  setCollateralChange: (value: number) => void;
  collateralChange: number;
  collateralAmount: Wei;
  setDebtChange: (value: number) => void;
  debtChange: number;
  debt: Wei;
  maxDebt: Wei;
}) {
  const tokenBalance = useTokenBalance(collateral.tokenAddress);

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
                value={collateralAmount.add(collateralChange).toNumber()}
                onChange={(val) => {
                  setCollateralChange(wei(val).sub(collateralAmount).toNumber());
                }}
                max={tokenBalance.data?.add(collateralAmount).toNumber()}
              />
            </Flex>
            <Flex alignItems="center">
              <Balance
                onMax={(bal) => setCollateralChange(parseFloat(bal) || 0)}
                balance={tokenBalance.data}
                symbol={collateral.symbol}
                address={collateral.tokenAddress}
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
                  value={debt.add(debtChange).toNumber()}
                  onChange={(val) => setDebtChange(wei(val).sub(debt).toNumber())}
                  max={maxDebt.add(debt).toNumber()}
                />
              </Flex>
            </form>
            <Flex alignItems="center">
              <Box>
                <Text fontSize="xs">
                  Max Mint: ${currency(maxDebt.toNumber())}
                  <Tooltip label="You can't mint snxUSD that takes your C-Ratio below the target c-ratio of 300%.">
                    <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
                  </Tooltip>
                  {maxDebt.eq(0) ? null : (
                    <Badge
                      transform="translateY(-2px)"
                      ml="2"
                      as="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        setDebtChange(maxDebt.toNumber());
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
                {collateralChange > 0 ? 'deposit' : 'withdraw'} {Math.abs(collateralChange)}&nbsp;
                {collateral.symbol}
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
}
