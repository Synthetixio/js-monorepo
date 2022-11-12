import React from 'react';
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
import { useIssuedDebt } from '@snx-v2/useIssuedDebt';
import { sumBy } from '@snx-v2/sumBy';

export const BalanceBoxUi: React.FC<{
  snxBalance?: number;
  snxPrice?: number;
  transferable?: number;
  stakedSnx?: number;
  debtBalance?: number;
  issuedDebt?: number;
  dSNXBalance?: number;
}> = ({ snxBalance, snxPrice, transferable, stakedSnx, debtBalance, dSNXBalance, issuedDebt }) => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);
  return (
    <Box fontSize="xs" width="full">
      <Box bg="navy.900" p={3} border="1px" borderColor="gray.900" borderRadius="base">
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="4">
          {t('staking-v2.balance-box.box-heading')}
        </Text>
        {snxBalance !== undefined ? (
          <Text fontFamily="mono" fontWeight="extrabold" fontSize="sm" lineHeight="5">
            {formatNumber(snxBalance)}
          </Text>
        ) : (
          <Skeleton my={1} width={8} height={4} />
        )}

        {snxBalance !== undefined && snxPrice !== undefined ? (
          <Text lineHeight="4" color="gray.500">
            {formatNumberToUsd(snxBalance * snxPrice)}
          </Text>
        ) : (
          <Skeleton my={1} width={8} height={4} />
        )}

        {transferable !== undefined && snxBalance !== undefined ? (
          <Progress
            mt="1"
            mb="1"
            height="1"
            value={(transferable / snxBalance) * 100}
            variant="white"
          />
        ) : (
          <Skeleton my={1} width="full" height={4} />
        )}

        <Flex justifyContent="space-between">
          <Text fontWeight={700}>{t('staking-v2.balance-box.staked')}</Text>

          {stakedSnx !== undefined ? (
            <Text fontWeight={700}>{formatNumber(stakedSnx)}</Text>
          ) : (
            <Skeleton my={1} width={8} height={4} />
          )}
        </Flex>
        <Flex color="gray.500" justifyContent="space-between">
          <Text>{t('staking-v2.balance-box.transferable')}</Text>
          {transferable !== undefined ? (
            <Text>{formatNumber(transferable)}</Text>
          ) : (
            <Skeleton my={1} width={8} height={4} />
          )}
        </Flex>
        <Divider my={2} />
        <Collapse in={show}>
          <Flex justifyContent="space-between">
            <Text fontWeight={700}>
              {t('staking-v2.balance-box.debt')} <InfoIcon />
            </Text>
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/debt">
              {t('staking-v2.balance-box.hedged-debt')}
            </Link>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{t('staking-v2.balance-box.active')}</Text>
            {debtBalance !== undefined ? (
              <Text>{formatNumber(debtBalance)}</Text>
            ) : (
              <Skeleton my={1} width={8} height={4} />
            )}
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{t('staking-v2.balance-box.issued')}</Text>
            {issuedDebt !== undefined ? (
              <Text>{formatNumber(issuedDebt)}</Text>
            ) : (
              <Skeleton my={1} width={8} height={4} />
            )}
          </Flex>
          <Divider my={4} />
          <Flex justifyContent="space-between">
            <Text size="sm" fontWeight={700}>
              {t('staking-v2.balance-box.assets')} <InfoIcon />
            </Text>
            <Link fontWeight={700} color="cyan.500" as={ReactRouterLink} to="/synths">
              {t('staking-v2.balance-box.see-all-synths')}
            </Link>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>dSNX</Text>
            {dSNXBalance !== undefined ? (
              <Text>{formatNumber(dSNXBalance)}</Text>
            ) : (
              <Skeleton my={1} width={8} height={4} />
            )}
          </Flex>
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

export const BalanceBox: React.FC = () => {
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: dSNXBalance } = useGetDSnxBalance();
  const { data } = useIssuedDebt();

  const stakedSnx = calculateStakedSnx({
    targetCRatio: debtData?.targetCRatio,
    currentCRatio: debtData?.currentCRatio,
    collateral: debtData?.collateral,
  });

  return (
    <BalanceBoxUi
      snxPrice={exchangeRateData?.SNX?.toNumber()}
      snxBalance={debtData?.collateral.toNumber()}
      stakedSnx={stakedSnx.toNumber()}
      transferable={debtData?.transferable.toNumber()}
      debtBalance={debtData?.debtBalance.toNumber()}
      issuedDebt={sumBy('value', data || [])}
      dSNXBalance={dSNXBalance?.balance.toNumber()}
    />
  );
};
