import { Center, Flex, Text } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { SynthetixProvider } from '@synthetixio/providers';
import { theme } from '@synthetixio/v3-theme';
import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

type UiProps = {
  variant: 'success' | 'warning' | 'error';
  isFlagged: boolean;
  countDown?: string;
};

const VariantToBox: FC<PropsWithChildren<{ variant: UiProps['variant'] }>> = ({
  variant,
  children,
}) => {
  if (variant === 'success') {
    return <Center bgGradient={theme.gradients['green-cyan'][500]}>{children}</Center>;
  }
  if (variant === 'warning') {
    return <Center bgGradient={theme.gradients['orange'][500]}>{children}</Center>;
  }
  if (variant === 'error') {
    return <Center bg="red.400">{children}</Center>;
  }
  return null;
};
export const CRatioBannerUi: FC<UiProps> = ({ isFlagged, variant, countDown }) => {
  const { t } = useTranslation();
  const translationKey = isFlagged ? 'error-flagged' : variant;
  return (
    <VariantToBox variant={isFlagged ? 'error' : variant}>
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
    </VariantToBox>
  );
};

type Props = {
  networkId: number | undefined;
  provider: SynthetixProvider | null;
  walletAddress: string | null;
};
export const CRatioBanner: React.FC<Props> = ({ networkId, provider, walletAddress }) => {
  const { data: debtData } = useDebtData({ networkId, provider, walletAddress });
  if (!debtData) return null;
  const variant = getHealthVariant({
    currentCRatioPercentage: debtData.currentCRatioPercentage.toNumber(),
    targetCratioPercentage: debtData.targetCRatioPercentage.toNumber(),
    liquidationCratioPercentage: debtData.liquidationRatioPercentage.toNumber(),
  });
  const isFlagged = debtData.liquidationDeadlineForAccount.gt(0);

  return <CRatioBannerUi countDown="todo" variant={variant} isFlagged={isFlagged} />;
};
