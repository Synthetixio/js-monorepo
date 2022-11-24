import { useState, FC } from 'react';
import {
  Box,
  Flex,
  Text,
  Progress,
  Skeleton,
  Divider,
  Button,
  Collapse,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, InfoIcon } from '@snx-v2/icons';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useGetDSnxBalance } from '@snx-v2/useDSnxBalance';
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
  label: string;
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
  debtBalance?: number;
  dSNXBalance?: number;
  dSNXBalanceUsd?: number;
}> = ({
  collateral,
  snxPrice,
  transferable,
  stakedSnx,
  debtBalance,
  dSNXBalance,
  snxBalance,
  escrowBalance,
  liquidationRewards,
  dSNXBalanceUsd,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

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
          {t('staking-v2.balance-box.box-heading')} <InfoIcon ml={1} />
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

        <Row
          value={stakedSnx}
          label={t('staking-v2.balance-box.staked')}
          color="white"
          fontWeight="700"
        />
        <Row value={transferable} label={t('staking-v2.balance-box.transferable')} />

        <Divider my={2} />
        <Collapse in={show}>
          <Row
            value={collateral}
            label={t('staking-v2.balance-box.collateral')}
            fontWeight="700"
            color="white"
          />
          <Row value={snxBalance} label={t('staking-v2.balance-box.balance')} />
          <Row value={escrowBalance} label={t('staking-v2.balance-box.escrowed')} />
          <Row value={liquidationRewards} label={t('staking-v2.balance-box.liq-rewards')} />

          <Divider my={4} />
          <Flex justifyContent="space-between">
            <Text fontWeight={700}>{t('staking-v2.balance-box.debt-management')}</Text>
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/debt">
              {t('staking-v2.balance-box.hedged-debt')}
            </Link>
          </Flex>
          <Row
            value={debtBalance}
            label={t('staking-v2.balance-box.active-debt')}
            color="white"
            formatFn={formatNumberToUsd}
          />
          <Row value={dSNXBalance} label="dSNX" color="white" />
          <Row value={dSNXBalanceUsd} label="" formatFn={formatNumberToUsd} />
        </Collapse>
        <Button
          margin="0 auto"
          display="block"
          variant="link"
          size="sm"
          onClick={() => setShow((x) => !x)}
        >
          {t('staking-v2.balance-box.show-all-balances')} {show ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </Box>
    </Box>
  );
};

export const BalanceBox: FC = () => {
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: dSNXBalanceData } = useGetDSnxBalance();
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
      debtBalance={debtData?.debtBalance.toNumber()}
      dSNXBalance={dSNXBalanceData?.balance.toNumber()}
      dSNXBalanceUsd={dSNXBalanceData?.balanceUsd.toNumber()}
    />
  );
};
