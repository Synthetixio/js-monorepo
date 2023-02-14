import { useState } from 'react';
import { Box, Text, Flex, Button, Badge, Divider } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { InfoOutline, DollarIcon } from '@snx-v2/icons';
import { useDebtData } from '@snx-v2/useDebtData';
import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { useApr } from '@snx-v2/useApr';
import { TradingFeesModal } from './TradingFeesModal';
import { RewardsItemUI } from './RewardsItem';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

export const Fees = () => {
  const { t } = useTranslation();
  const [isFeesModalOpen, setFeesModalOpen] = useState(false);

  const { data: debtData, isLoading: isDebtLoading } = useDebtData();
  const { data: synthsBalances, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: exchangeRates, isLoading: isExchangeRatesLoading } = useExchangeRatesData();
  const { data: feePoolData, isLoading: isFeePoolDataLoading } = useFeePoolData();
  const { data: aprData } = useApr();

  const isLoading =
    isDebtLoading || isFeePoolDataLoading || isSynthsLoading || isExchangeRatesLoading;

  const collateralValue = debtData?.collateral.mul(exchangeRates?.SNX || 0).toNumber() || 0;

  return (
    <>
      <TradingFeesModal
        feesBurned={feePoolData?.feesBurned.toNumber() || 0}
        isOpen={isFeesModalOpen}
        onClose={() => setFeesModalOpen(false)}
        sUSDBalance={formatNumber(synthsBalances?.balancesMap['sUSD']?.balance.toNumber() || 0)}
        currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber() || 0}
        activeDebt={debtData?.debtBalance.toNumber() || 0}
        collateralValue={collateralValue}
      />
      <Box my={8}>
        <Divider my={4} />
        <RewardsItemUI
          Icon={() => (
            <Flex
              bg="navy.900"
              height="38px"
              width="38px"
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
            >
              <DollarIcon height="36px" width="36px" />
            </Flex>
          )}
          title={t('staking-v2.earn.trading-fees.title')}
          description={t('staking-v2.earn.trading-fees.description')}
          apyReturn={aprData !== undefined ? formatPercent(aprData.toNumber()) : ''}
          endDate={t('staking-v2.earn.trading-fees.repays')}
          isLoading={isLoading}
          RewardBalance={() => {
            return (
              <Flex flexDirection="column">
                <Text fontFamily="heading" fontSize="sm" color="white" fontWeight="900">
                  {/* Fee amount here */}
                  {`${formatNumber(feePoolData?.feesBurned.toNumber() || 0)} sUSD`}
                </Text>
              </Flex>
            );
          }}
          RewardsBadge={() => {
            return (
              <Badge
                py={0.5}
                px={1}
                fontSize="2xs"
                variant="gray"
                mt={0.5}
                w="fit-content"
                fontWeight="700"
              >
                <InfoOutline color="gray.500" mb="1.75px" mr="2px" height="12px" width="12px" />
                {t('staking-v2.earn.trading-fees.burned')}
              </Badge>
            );
          }}
          claimBtn={
            <Button
              w={['100%', '100%', '100%', '80px']}
              variant="outline"
              ml={[6, 6, 6, 4]}
              fontFamily="heading"
              fontSize="14px"
              fontWeight="700"
              onClick={() => setFeesModalOpen(true)}
            >
              More Info
            </Button>
          }
        />
      </Box>
    </>
  );
};
