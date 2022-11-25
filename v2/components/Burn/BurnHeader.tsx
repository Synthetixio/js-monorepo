import { FC } from 'react';
import { Text, Flex, Link, Skeleton, Box } from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioProgressBar';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useTranslation, Trans } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';
import { leftColWidth, rightColWidth } from './layout';
import { CRatioBox } from '../CRatioBox';
import { calcNewCratioPercentage, calculateNewDebtBalance } from '@snx-v2/stakingCalculations';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

export const BurnHeaderUi: FC<{
  burnAmountSusd?: number;
  isDebtDataLoading: boolean;
  collateral?: number;
  debtBalance?: number;
  SNXRate?: number;
}> = ({ burnAmountSusd, isDebtDataLoading, SNXRate, debtBalance, collateral }) => {
  const { t } = useTranslation();
  const newDebtBalance = calculateNewDebtBalance('burn', debtBalance, burnAmountSusd);
  const newCratioPercentage = calcNewCratioPercentage(collateral, SNXRate, newDebtBalance);

  return (
    <>
      <Text
        fontSize="xl"
        fontFamily="heading"
        fontWeight={700}
        textAlign="center"
        mb={3}
        lineHeight="base"
        data-testid="burn header"
      >
        {t('staking-v2.burn.title')}
      </Text>

      <Text textAlign="center" color="gray.600" mb={4} mx={6}>
        <Trans
          i18nKey="staking-v2.burn.description"
          components={[
            <Link target="_blank" color="cyan.400" href={EXTERNAL_LINKS.Synthetix.StakingGuide} />,
          ]}
        />
      </Text>
      <Box display={{ base: 'none', md: 'block' }}>
        <Flex mt={2} mb={6} justifyContent="space-between">
          <Skeleton
            display="flex"
            alignItems="center"
            startColor="gray.900"
            endColor="gray.700"
            isLoaded={!isDebtDataLoading}
            bg="black"
            w={leftColWidth}
            pt={3}
            px={4}
            borderRadius="base"
            borderWidth="1px"
            borderColor="gray.900"
            fadeDuration={1}
          >
            <CRatioProgressBar newCratioPercentage={newCratioPercentage} />
          </Skeleton>
          <Skeleton
            startColor="gray.900"
            endColor="gray.700"
            isLoaded={!isDebtDataLoading}
            bg="black"
            w={rightColWidth}
            borderRadius="base"
            borderWidth="1px"
            borderColor="gray.900"
            flexDirection="column"
            justifyContent="space-between"
            fadeDuration={1}
          >
            <CRatioBox newCratioPercentage={newCratioPercentage} />
          </Skeleton>
        </Flex>
      </Box>
    </>
  );
};

export const BurnHeader: FC<{ burnAmountSusd?: number }> = ({ burnAmountSusd }) => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: exchangeRateData } = useExchangeRatesData();

  return (
    <BurnHeaderUi
      burnAmountSusd={burnAmountSusd}
      isDebtDataLoading={isDebtDataLoading}
      SNXRate={exchangeRateData?.SNX?.toNumber()}
      debtBalance={debtData?.debtBalance.toNumber()}
      collateral={debtData?.collateral.toNumber()}
    />
  );
};
