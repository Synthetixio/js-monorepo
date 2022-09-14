import { Center, Flex, Text } from '@chakra-ui/react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { useDebtData } from '@snx-v2/useDebtData';
import { SynthetixProvider } from '@synthetixio/providers';
import { theme } from '@synthetixio/v3-theme';
import React, { FC, PropsWithChildren } from 'react';

type UiProps = {
  variant: 'success' | 'warning' | 'error';
  text: string;
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
export const BannerUi: FC<UiProps> = ({ text, variant, countDown }) => {
  return (
    <VariantToBox variant={variant}>
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
        <Text fontSize="xs">{text}</Text>{' '}
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
export const Banner: React.FC<Props> = ({ networkId, provider, walletAddress }) => {
  const { data: debtData } = useDebtData({ networkId, provider, walletAddress });
  if (!debtData) return <p>Skeleton</p>;
  const variant = getHealthVariant({
    currentCRatioPercentage: debtData.currentCRatioPercentage.toNumber(),
    targetCratioPercentage: debtData.targetCRatioPercentage.toNumber(),
    liquidationCratioPercentage: debtData.liquidationRatioPercentage.toNumber(),
  });
  return <BannerUi countDown="todo" variant={variant} text="todo" />;
};
