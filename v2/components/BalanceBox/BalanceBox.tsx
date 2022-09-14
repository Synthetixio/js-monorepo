import React, { PropsWithChildren } from 'react';
import { Box, Center, Flex, Text, Tooltip, Progress } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { InfoIcon } from '@snx-v2/icons';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { SynthetixProvider } from '@synthetixio/providers';

type UiProps = { snxBalance: number; snxPrice: number; transferable: number; stakedSnx: number };

export const BalanceBoxUi = ({
  snxBalance,
  snxPrice,
  transferable,
  stakedSnx,
}: PropsWithChildren<UiProps>) => {
  const { t } = useTranslation();
  return (
    <Box width="full">
      <Flex alignItems="center">
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
          {t('staking-v2.balance-box.heading')}
        </Text>
        <Tooltip label={t('staking-v2.balance-box.heading-tooltip')} hasArrow>
          <Center>
            <InfoIcon width="10px" height="10px" />
          </Center>
        </Tooltip>
      </Flex>
      <Box bg="navy.900" padding="2" border="1px" borderColor="gray.800" borderRadius="sm">
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="4" fontSize="xs">
          {t('staking-v2.balance-box.box-heading')}
        </Text>
        <Text fontFamily="mono" fontWeight="extrabold" fontSize="sm" lineHeight="5">
          {formatNumber(snxBalance)}
        </Text>
        <Text lineHeight="4" fontSize="xs" color="gray.500">
          {formatNumberToUsd(snxBalance * snxPrice)}
        </Text>
        <Progress
          mt="4"
          mb="4"
          height="1"
          value={(transferable / snxBalance) * 100}
          variant="white"
        />
        <Flex justifyContent="space-between">
          <Text size="sm" fontWeight={700}>
            {t('staking-v2.balance-box.staked')}
          </Text>
          <Text size="sm" fontWeight={700}>
            {formatNumber(stakedSnx)}
          </Text>
        </Flex>
        <Flex color="gray.500" justifyContent="space-between">
          <Text>{t('staking-v2.balance-box.transferable')}</Text>
          <Text>{formatNumber(transferable)}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

type Props = {
  networkId: number | undefined;
  provider: SynthetixProvider | null;
  walletAddress: string | null;
};
export const BalanceBox: React.FC<Props> = ({ networkId, provider, walletAddress }) => {
  const { data: debtData } = useDebtData({ networkId, provider, walletAddress });
  if (!debtData) return <p>Skeleton</p>;

  return (
    <BalanceBoxUi
      snxPrice={3} // TODO
      snxBalance={debtData.balance.toNumber()}
      stakedSnx={debtData.collateral.toNumber()}
      transferable={debtData.transferable.toNumber()}
    />
  );
};
