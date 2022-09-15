import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { SynthetixProvider } from '@synthetixio/providers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRatioProgressBar } from './CRatioProgressBar';

type UiProps = {
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
};
export const CRatioHealthCardUi: React.FC<UiProps> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
}) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" marginBottom="2">
        <Box>
          <Heading size="md">{t('staking-v2.cratio-health-card.heading')}</Heading>
          <Text> {t('staking-v2.cratio-health-card.sub-heading')}</Text>
        </Box>
        <Flex
          bg="blackAlpha.800"
          alignItems="center"
          borderRadius="md"
          border="1px"
          borderColor="gray.900"
          padding="2"
        >
          <Text
            color={getHealthVariant({
              targetCratioPercentage,
              liquidationCratioPercentage,
              currentCRatioPercentage,
            })}
            fontSize="2xl"
            align="center"
            fontFamily="mono"
          >
            {Math.floor(currentCRatioPercentage)}%
          </Text>
        </Flex>
      </Flex>
      <CRatioProgressBar
        targetCratioPercentage={targetCratioPercentage}
        liquidationCratioPercentage={liquidationCratioPercentage}
        currentCRatioPercentage={currentCRatioPercentage}
      />
    </Box>
  );
};

export const CRatioHealthCard: React.FC = () => {
  const { data: debtData } = useDebtData();
  if (!debtData) return <p>Skeleton</p>;

  return (
    <CRatioHealthCardUi
      currentCRatioPercentage={debtData.currentCRatioPercentage.toNumber()}
      targetCratioPercentage={debtData.targetCRatioPercentage.toNumber()}
      liquidationCratioPercentage={debtData.liquidationRatioPercentage.toNumber()}
    />
  );
};
