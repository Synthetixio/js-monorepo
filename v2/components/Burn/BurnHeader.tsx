import { FC } from 'react';
import { Text, Flex, Link, Skeleton, Box } from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useTranslation, Trans } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';
import { leftColWidth, rightColWidth } from './layout';
import { CRatioBox } from '../CRatioBox';

export const BurnHeaderUi: FC<{
  burnAmountSusd?: number;
  liquidationRatioPercentage?: number;
  targetCRatioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold?: number;
  isDebtDataLoading?: boolean;
}> = ({
  burnAmountSusd,
  liquidationRatioPercentage,
  targetCRatioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  isDebtDataLoading,
}) => {
  const { t } = useTranslation();

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
            <CRatioProgressBar
              targetThreshold={targetThreshold || 0}
              liquidationCratioPercentage={liquidationRatioPercentage || 0}
              currentCRatioPercentage={currentCRatioPercentage || 0}
              targetCratioPercentage={targetCRatioPercentage || 0}
              isLoading={false}
            />
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
            <CRatioBox amount={burnAmountSusd} actionType="burn" />
          </Skeleton>
        </Flex>
      </Box>
    </>
  );
};

export const BurnHeader: FC<{ burnAmountSusd: number }> = ({ burnAmountSusd }) => {
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  return (
    <BurnHeaderUi
      burnAmountSusd={burnAmountSusd}
      liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      targetThreshold={debtData?.targetThreshold.toNumber()}
      isDebtDataLoading={isDebtDataLoading}
    />
  );
};
