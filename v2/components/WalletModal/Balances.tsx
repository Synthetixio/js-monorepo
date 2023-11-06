import { Box, Button, Flex, Text, Image } from '@chakra-ui/react';
import { formatNumber, formatNumberToUsd } from '@synthetixio/formatters';
import { SNXIcon } from '@snx-v2/icons';
import { getPngSynthIconUrl } from '@snx-v2/SynthIcons';
import { useGetSynthsByName } from '@snx-v2/synthsByName';
import { useDebtData } from '@snx-v2/useDebtData';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type BalanceObject = {
  currencyKey: string;
  balance: number;
  usdBalance: number;
  icon?: ReactElement;
  description?: string;
};

const BalancesUi: FC<{
  balances?: BalanceObject[];
  navigate: NavigateFunction;
  delegateMode: boolean;
  onClose: () => void;
}> = ({ balances, navigate, delegateMode, onClose }) => {
  const { t } = useTranslation();

  return (
    <Box my={2} px={4} py={3} bg="black" border="1px" borderColor="gray.800" borderRadius="base">
      {balances?.map(({ usdBalance, balance, icon, currencyKey, description }) => {
        return (
          <Flex my={2} key={currencyKey} alignItems="center" justifyContent="space-between">
            <Flex>
              <Flex display="flex" alignItems="center" mr={1}>
                {icon}
              </Flex>
              <Flex ml={1} flexDirection="column">
                <Text fontSize="sm" lineHeight="shorter">
                  {currencyKey}
                </Text>
                {description && (
                  <Text fontSize="xs" mt={0.1} color="gray.800">
                    {description}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" textAlign="right">
                {formatNumber(balance)}
              </Text>
              <Text fontSize="xs" color="gray.800" textAlign="right">
                {formatNumberToUsd(usdBalance)}
              </Text>
            </Flex>
          </Flex>
        );
      })}
      {delegateMode ? null : (
        <Button
          display="block"
          width="100%"
          variant="ghost"
          onClick={() => {
            onClose();
            navigate('/wallet');
          }}
          margin="0 auto"
        >
          {t('staking-v2.wallet-modal.view-all')}
        </Button>
      )}
    </Box>
  );
};

export interface BalancesProps {
  onClose: () => void;
}

export const Balances = ({ onClose }: BalancesProps) => {
  const { data: synthBalancesData } = useSynthsBalances();
  const { data: debtData } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();
  const { data: synthByNameData } = useGetSynthsByName();
  const { delegateWallet } = useDelegateWallet();

  const navigate = useNavigate();

  const snxBalance: BalanceObject | undefined =
    debtData && exchangeRateData
      ? {
          currencyKey: 'SNX',
          balance: debtData.collateral.toNumber(),
          usdBalance: debtData.collateral.mul(exchangeRateData.SNX || 0).toNumber(),
          icon: <SNXIcon width="34px" height="34px" />,
          description: 'Synthetix Network Token',
        }
      : undefined;

  const synthBalances = synthBalancesData?.balances.slice(0, 5).map((x) => {
    const assetDescription = synthByNameData?.SynthsByName?.[x.currencyKey]?.description;
    const description = assetDescription ? `Synthetic ${assetDescription}` : undefined;
    return {
      currencyKey: x.currencyKey,
      balance: x.balance.toNumber(),
      usdBalance: x.usdBalance.toNumber(),
      icon: (
        <Image
          width="34px"
          height="34px"
          alt={x.currencyKey}
          src={getPngSynthIconUrl(x.currencyKey)}
        />
      ),
      description,
    };
  });

  const balances = snxBalance && synthBalances ? [snxBalance].concat(synthBalances) : undefined;

  return (
    <BalancesUi
      delegateMode={Boolean(delegateWallet)}
      navigate={navigate}
      balances={balances}
      onClose={onClose}
    />
  );
};
