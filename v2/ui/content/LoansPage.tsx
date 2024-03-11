import { FC } from 'react';
import Head from 'react-helmet';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Connector from 'containers/Connector';
import StatBox from 'components/StatBox';
import { LineSpacer } from '@snx-v1/styles';
import StatsSection from 'components/StatsSection';
import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';
import useUserStakingData from 'hooks/useUserStakingData';
import { formatFiatCurrency, formatPercent } from 'utils/formatters/number';
import Main from 'sections/loans/index';
import Loans from 'containers/Loans';
import { Alert, Text, Link } from '@chakra-ui/react';
import { InfoIcon } from '@snx-v2/icons';

type LoansPageProps = {};

const LoansPage: FC<LoansPageProps> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { walletAddress } = Connector.useContainer();

  const { stakedCollateralValue, debtBalance } = useStakingCalculations();
  const { selectedPriceCurrency, getPriceAtCurrentRate } = useSelectedPriceCurrency();
  const { stakingAPR } = useUserStakingData(walletAddress);

  return (
    <>
      <Head>
        <title>{t('loans.page-title')}</title>
      </Head>
      <Alert variant="solid" my={4}>
        <InfoIcon color="#2ED9FF" width="16px" height="16px" mr={2} />
        <Text color="white" fontSize="16px" fontFamily="heading">
          Parameter Changes for Synthetix Loans{' '}
          <Link
            href="https://blog.synthetix.io/parameter-changes-for-synthetix-loans/"
            isExternal
            target="_blank"
            color="cyan.500"
            textDecoration="underline"
          >
            Read our blog for more details.
          </Link>
        </Text>
      </Alert>
      <StatsSection>
        <StatBox
          title={t('common.stat-box.staked-value')}
          value={formatFiatCurrency(getPriceAtCurrentRate(stakedCollateralValue), {
            sign: selectedPriceCurrency.sign,
          })}
          titleColor={theme.colors.green}
        />
        <Earning
          title={t('common.stat-box.earning')}
          value={formatPercent(stakingAPR ? stakingAPR : 0)}
          size="lg"
        />
        <StatBox
          title={t('common.stat-box.active-debt')}
          value={formatFiatCurrency(getPriceAtCurrentRate(debtBalance), {
            sign: selectedPriceCurrency.sign,
          })}
          titleColor={theme.colors.green}
        />
      </StatsSection>
      <LineSpacer />
      <Main />
    </>
  );
};

const LoansWithContainer: FC<LoansPageProps> = (props) => {
  return (
    <Loans.Provider>
      <LoansPage {...props} />
    </Loans.Provider>
  );
};

const Earning = styled(StatBox)`
  .title {
    color: ${(props) => props.theme.colors.green};
  }
  .value {
    text-shadow: ${(props) => props.theme.colors.greenTextShadow};
    color: #073124;
  }
`;

export default LoansWithContainer;
