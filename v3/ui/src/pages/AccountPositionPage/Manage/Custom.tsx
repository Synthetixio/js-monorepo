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
import { NumberInput } from '@snx-v3/NumberInput';
import { Wei } from '@synthetixio/wei';
import { formatPercent } from '@snx-v2/formatters';

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
  setCollateralChange: (value: Wei) => void;
  collateralChange: Wei;
  collateralAmount: Wei;
  setDebtChange: (value: Wei) => void;
  debtChange: Wei;
  debt: Wei;
  maxDebt: Wei;
}) {
  const tokenBalance = useTokenBalance(collateral.tokenAddress);

  const collateralMaxValue = tokenBalance.data
    ? tokenBalance.data.add(collateralAmount)
    : undefined;
  const debtMaxValue = maxDebt.add(debt);

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
                value={collateralAmount.add(collateralChange)}
                onChange={(val) => setCollateralChange(val.sub(collateralAmount))}
                max={collateralMaxValue}
              />
            </Flex>
            <Flex alignItems="center">
              <Balance
                onMax={setCollateralChange}
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
            <Flex mb="3">
              <NumberInput
                value={debt.add(debtChange)}
                onChange={(val) => setDebtChange(val.sub(debt))}
                max={debtMaxValue}
              />
            </Flex>
            <Flex alignItems="center">
              <Box>
                <Text fontSize="xs">
                  Max Mint: ${currency(maxDebt)}
                  <Tooltip
                    label={`You can't mint snxUSD that takes your C-Ratio below the issuance ratio of ${formatPercent(
                      collateral.issuanceRatioD18.toNumber()
                    )}.`}
                  >
                    <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
                  </Tooltip>
                  {maxDebt.eq(0) ? null : (
                    <Badge
                      transform="translateY(-2px)"
                      ml="2"
                      as="button"
                      type="button"
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
      {collateralChange.eq(0) && debtChange.eq(0) ? null : (
        <Alert>
          <AlertIcon />
          <Box>
            This adjustment will{' '}
            {collateralChange.eq(0) ? null : (
              <strong>
                {collateralChange.gt(0) ? 'deposit' : 'withdraw'}{' '}
                {Math.abs(collateralChange.toNumber())}&nbsp;
                {collateral.symbol}
              </strong>
            )}
            {!collateralChange.eq(0) && !debtChange.eq(0) ? `\u00A0and\u00A0` : null}
            {debtChange.eq(0) ? null : (
              <strong>
                {debtChange.gt(0) ? 'mint' : 'burn'} {Math.abs(debtChange.toNumber())}
                &nbsp;snxUSD
              </strong>
            )}
            .
          </Box>
        </Alert>
      )}
    </Box>
  );
}
