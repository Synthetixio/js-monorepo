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

const Row = ({
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
}) => {
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
};

export const BalanceBoxUi: React.FC<{
  collateral?: number;
  escrowBalance?: number;
  liquidationRewards?: number;
  snxBalance?: number;
  snxPrice?: number;
  transferable?: number;
  stakedSnx?: number;
}> = ({
  collateral,
  snxPrice,
  transferable,
  stakedSnx,
  snxBalance,
  escrowBalance,
  liquidationRewards,
}) => {
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
            value={(stakedSnx / collateral) * 100}
            variant="white"
          />
        ) : (
          <Skeleton my={1} width="full" height={4} />
        )}

        <Row value={stakedSnx} label="Staked" color="white" fontWeight="700" />
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
      </Box>
    </Box>
  );
};

export function BalanceBox() {
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: escrowBalanceData } = useEscrowBalance();
  const { data: liquidationRewardsData } = useGetLiquidationRewards();

  const stakedSnx = calculateStakedSnx({
    targetCRatio: debtData?.targetCRatio,
    currentCRatio: debtData?.currentCRatio,
    collateral: debtData?.collateral,
  });

  return (
    <BalanceBoxUi
      snxPrice={exchangeRateData?.SNX?.toNumber()}
      collateral={debtData?.collateral.toNumber()}
      escrowBalance={escrowBalanceData?.totalEscrowed.toNumber()}
      liquidationRewards={liquidationRewardsData?.liquidatorRewards.toNumber()}
      snxBalance={debtData?.balance.toNumber()}
      stakedSnx={stakedSnx.toNumber()}
      transferable={debtData?.transferable.toNumber()}
    />
  );
}
