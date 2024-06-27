import React, { ReactElement } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { CRatioHealthPercentage } from '@snx-v2/CRatioHealthPercentage';
import { useTranslation } from 'react-i18next';
import { CRatioProgressBar } from '@snx-v2/CRatioProgressBar';

type UiProps = {
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold?: number;
  isLoading: boolean;
  CRatioProgressBar: ReactElement;
};

export const CRatioHealthCardUi: React.FC<UiProps> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  isLoading,
  CRatioProgressBar,
}) => {
  const { t } = useTranslation();

  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
  });

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="2">
        <Box>
          <Heading size="md" mb={1} fontWeight="bold" color="whiteAlpha.900" lineHeight="6">
            {t('staking-v2.cratio-health-card.heading')}
          </Heading>
          <Text fontSize="sm" color="whiteAlpha.600">
            {t('staking-v2.cratio-health-card.sub-heading')}
          </Text>
        </Box>

        <CRatioHealthPercentage
          variant={variant}
          currentCRatioPercentage={currentCRatioPercentage}
          isLoading={isLoading}
        />
      </Flex>

      {CRatioProgressBar}
    </Box>
  );
};

export const CRatioHealthCard: React.FC = () => {
  const { data: debtData, isLoading } = useDebtData();

  return (
    <CRatioHealthCardUi
      CRatioProgressBar={<CRatioProgressBar />}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
      targetCratioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      liquidationCratioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      targetThreshold={debtData?.targetThreshold.toNumber()}
      isLoading={isLoading}
    />
  );
};
