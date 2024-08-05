import { Center, Flex, Text, SlideFade } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { useFeePoolData } from '@snx-v2/useFeePoolData';
import { useRewardsAvailable } from '@snx-v2/useRewardsAvailable';
import { theme } from '@synthetixio/v3-theme';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type UiProps = {
  variant: 'success' | 'warning' | 'error';
  isFlagged: boolean;
  hasClaimed: boolean;
  nothingToClaim?: boolean;
};

const getWrapperStyles = (variant: UiProps['variant']) => {
  if (variant === 'success') {
    return { bgGradient: theme.gradients['green-cyan'][500] };
  }
  if (variant === 'warning') {
    return { bgGradient: theme.gradients['orange'][500] };
  }
  if (variant === 'error') {
    return { bg: 'red.400' };
  }
  return null;
};

export const CRatioBannerUi: FC<UiProps> = ({ isFlagged, variant, hasClaimed, nothingToClaim }) => {
  const { t } = useTranslation();
  const translationKey = isFlagged ? 'error-flagged' : variant;
  const wrapperStyles = getWrapperStyles(variant);

  if (
    ((hasClaimed || nothingToClaim) && (variant === 'success' || variant === 'warning')) ||
    variant === 'warning'
  ) {
    return null;
  }

  return (
    <SlideFade in={true} offsetY="-20px">
      <Center {...wrapperStyles} data-testid="c ratio banner wrapper">
        <Flex
          margin="2"
          paddingTop="1"
          paddingBottom="1"
          paddingLeft="5"
          paddingRight="5"
          bg="blackAlpha.600"
          borderRadius="5"
          width="fit-content"
        >
          <Text data-testid="text content" fontSize="xs">
            {t(`staking-v2.c-ratio-banner.${translationKey}`)}
          </Text>
        </Flex>
      </Center>
    </SlideFade>
  );
};

export const CRatioBanner: React.FC = () => {
  const { data: debtData } = useDebtData();
  const { data: feePoolData } = useFeePoolData();
  const { data: rewardsData } = useRewardsAvailable();

  if (!debtData || !feePoolData || !rewardsData) {
    return null;
  }

  const isFlagged = debtData.liquidationDeadlineForAccount.gt(0);

  const variant = getHealthVariant({
    currentCRatioPercentage: debtData.currentCRatioPercentage.toNumber(),
    targetCratioPercentage: debtData.targetCRatioPercentage.toNumber(),
    liquidationCratioPercentage: debtData.liquidationRatioPercentage.toNumber(),
    targetThreshold: debtData.targetThreshold.toNumber(),
    isFlagged,
  });

  return (
    <CRatioBannerUi
      variant={variant}
      isFlagged={isFlagged}
      hasClaimed={rewardsData.hasClaimed}
      nothingToClaim={rewardsData.nothingToClaim}
    />
  );
};
