import { Center, Flex, Text } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { theme } from '@synthetixio/v3-theme';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type UiProps = {
  variant: 'success' | 'warning' | 'error';
  isFlagged: boolean;
  countDown?: string;
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
export const CRatioBannerUi: FC<UiProps> = ({ isFlagged, variant, countDown }) => {
  const { t } = useTranslation();
  const translationKey = isFlagged ? 'error-flagged' : variant;
  const wrapperStyles = getWrapperStyles(variant);
  return (
    <Center {...wrapperStyles}>
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
        <Text fontSize="xs">{t(`staking-v2.c-ratio-banner.${translationKey}`)}</Text>{' '}
        <Text fontSize="xs" fontFamily="mono" fontWeight="700" marginLeft="2" as="b">
          {countDown}
        </Text>
      </Flex>
    </Center>
  );
};

export const CRatioBanner: React.FC = () => {
  const { data: debtData } = useDebtData();
  if (!debtData) return null;
  const variant = getHealthVariant({
    currentCRatioPercentage: debtData.currentCRatioPercentage.toNumber(),
    targetCratioPercentage: debtData.targetCRatioPercentage.toNumber(),
    liquidationCratioPercentage: debtData.liquidationRatioPercentage.toNumber(),
  });
  const isFlagged = debtData.liquidationDeadlineForAccount.gt(0);

  return <CRatioBannerUi countDown="todo" variant={variant} isFlagged={isFlagged} />;
};
