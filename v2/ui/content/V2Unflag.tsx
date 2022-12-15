import { Box, Container, Heading, Text, SkeletonText } from '@chakra-ui/react';
import { UnflagOptions } from '@snx-v2/UnflagOptions';
import { useLiquidationData } from '@snx-v2/useLiquidationData';
import { useTranslation } from 'react-i18next';
import { formatPercent } from 'utils/formatters/number';

const V2Unflag = () => {
  const { t } = useTranslation();
  const { data: liquidationData, isLoading } = useLiquidationData();

  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl" height="full">
        <Heading size="md">{t('staking-v2.unflag-options.heading')}</Heading>
        <SkeletonText noOfLines={2} my={4} isLoaded={!isLoading}>
          <Text mb={4} fontSize="xs" color="whiteAlpha.800">
            {t('staking-v2.unflag-options.text', {
              penalty: formatPercent(liquidationData?.selfLiquidationPenalty || 70, {
                minDecimals: 0,
              }),
            })}
          </Text>
        </SkeletonText>
        <UnflagOptions />
      </Container>
    </Box>
  );
};

export default V2Unflag;
