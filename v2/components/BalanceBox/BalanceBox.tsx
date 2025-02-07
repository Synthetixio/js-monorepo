import React from 'react';
import { Box, Divider, Flex, Link, Progress, Skeleton, Text } from '@chakra-ui/react';
import { InfoIcon } from '@snx-v2/icons';
import { formatNumber, formatNumberToUsd } from '@synthetixio/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { Link as ReactRouterLink } from 'react-router-dom';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { useEscrowBalance } from '@snx-v2/useEscrowBalance';
import { useGetLiquidationRewards } from '@snx-v2/useGetLiquidationRewards';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';

function Row({
  value,
  label,
  color = 'gray.500',
  formatFn = formatNumber,
  fontWeight,
}: {
  value?: number;
  label: React.ReactNode;
  color?: string;
  formatFn?: (x: number | string) => string;
  fontWeight?: string;
}) {
  return (
    <Flex color={color} justifyContent="space-between">
      <Text fontWeight={fontWeight}>{label}</Text>
      {value !== undefined ? (
        <Text fontWeight={fontWeight}>{formatFn(value)}</Text>
      ) : (
        <Skeleton my={1} width={8} height={4} />
      )}
    </Flex>
  );
}

export function BalanceBox() {
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: escrowBalanceData } = useEscrowBalance();
  const { data: liquidationRewardsData } = useGetLiquidationRewards();
  const { data: synthsBalanceData } = useSynthsBalances();

  const stakedSnx = calculateStakedSnx({
    targetCRatio: debtData?.targetCRatio,
    currentCRatio: debtData?.currentCRatio,
    collateral: debtData?.collateral,
  });

  const snxPrice = exchangeRateData?.SNX?.toNumber();
  const collateral = debtData?.collateral.toNumber();
  const escrowBalance = escrowBalanceData?.totalEscrowed.toNumber();
  const liquidationRewards = liquidationRewardsData?.liquidatorRewards.toNumber();
  const snxBalance = debtData?.balance.toNumber();
  const transferable = debtData?.transferable.toNumber();

  return (
    <Box fontSize="xs" width="full">
      <Box bg="navy.900" p={3} border="1px" borderColor="gray.900" borderRadius="base">
        <Text
          fontFamily="heading"
          fontWeight="extrabold"
          lineHeight="4"
          display="flex"
          alignItems="center"
        >
          SNX Total <InfoIcon ml={1} />
        </Text>
        {collateral !== undefined ? (
          <Text fontFamily="mono" fontWeight="extrabold" fontSize="sm" lineHeight="5">
            {formatNumber(collateral)}
          </Text>
        ) : (
          <Skeleton my={1} width={8} height={4} />
        )}

        {collateral !== undefined && snxPrice !== undefined ? (
          <Text lineHeight="4" color="gray.500">
            {formatNumberToUsd(collateral * snxPrice)}
          </Text>
        ) : (
          <Skeleton my={1} width={8} height={4} />
        )}

        {stakedSnx !== undefined && collateral !== undefined ? (
          <Progress
            mt="1"
            mb="1"
            height="1"
            value={(stakedSnx.toNumber() / collateral) * 100}
            variant="white"
          />
        ) : (
          <Skeleton my={1} width="full" height={4} />
        )}

        <Row value={stakedSnx.toNumber()} label="Staked" color="white" fontWeight="700" />
        <Row value={transferable} label="Transferable" />

        <Divider my={2} />
        <Row value={collateral} label="Collateral" fontWeight="700" color="white" />
        <Row
          value={snxBalance}
          label={
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/wallet/balances">
              Balance
            </Link>
          }
        />
        <Row
          value={escrowBalance}
          label={
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/escrow">
              Escrowed
            </Link>
          }
        />
        <Row
          value={liquidationRewards}
          label={
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/earn">
              Liquidation Rewards
            </Link>
          }
        />
        <Divider my={2} />
        <Row
          value={debtData?.debtBalance.toNumber()}
          formatFn={formatNumberToUsd}
          label={
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/staking/burn">
              Active debt
            </Link>
          }
        />
        <Row
          value={synthsBalanceData?.totalUSDBalance.toNumber()}
          formatFn={formatNumberToUsd}
          label="sUSD Balance"
        />
      </Box>
    </Box>
  );
}
