import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { FC } from 'react';
import { Text, Box, Heading, Flex, Skeleton, Button } from '@chakra-ui/react';
import { useSelfLiquidationData } from '@snx-v2/useSelfLiquidationData';
import { useDebtData } from '@snx-v2/useDebtData';
import { CRatioBox } from '../CRatioBox';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { SNXIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

export const SelfLiquidationUi: FC<{
  selfLiquidationPenalty?: number;
  selfLiquidationPenaltySNX?: number;
  selfLiquidationPenaltyDollar?: number;
  targetCRatioPercentage?: number;
  liquidationRatioPercentage?: number;
  currentCRatioPercentage?: number;
}> = ({
  selfLiquidationPenalty,
  selfLiquidationPenaltySNX,
  selfLiquidationPenaltyDollar,
  targetCRatioPercentage,
  liquidationRatioPercentage,
  currentCRatioPercentage,
}) => {
  const { t } = useTranslation();
  const formattedPenalty =
    selfLiquidationPenalty !== undefined ? formatPercent(selfLiquidationPenalty) : undefined;
  return (
    <Box>
      <Heading fontSize="md">{t('staking-v2.self-liquidation.headline')}</Heading>
      <Text color="whiteAlpha.600">
        Need some better copy for this, can mention self liquidation penalty:
        {formattedPenalty !== undefined ? (
          <Text as="span" fontWeight={700}>
            {formattedPenalty}
          </Text>
        ) : (
          <Skeleton as="span" w={4} h={2} />
        )}{' '}
        And the target maybe:
        {targetCRatioPercentage !== undefined ? (
          <Text as="span" fontWeight={700}>
            {formatPercent(targetCRatioPercentage / 100)}
          </Text>
        ) : (
          <Skeleton as="span" w={4} h={2} />
        )}{' '}
      </Text>
      <Flex justifyContent="space-between" my={4}>
        <Flex
          display="flex"
          alignItems="center"
          bg="black"
          w="58%"
          pt={3}
          px={4}
          borderRadius="base"
          borderWidth="1px"
          borderColor="gray.900"
        >
          <CRatioProgressBar
            liquidationCratioPercentage={liquidationRatioPercentage}
            currentCRatioPercentage={currentCRatioPercentage}
            targetCratioPercentage={targetCRatioPercentage}
          />
        </Flex>
        <Flex
          bg="black"
          w="40%"
          borderRadius="base"
          borderWidth="1px"
          borderColor="gray.900"
          flexDirection="column"
          justifyContent="space-between"
        >
          <CRatioBox actionType="burn" />
        </Flex>
      </Flex>
      <Box borderRadius="base" borderWidth="1px" borderColor="gray.900" p={4}>
        <Text>
          {formattedPenalty} {t('staking-v2.self-liquidation.amount-headline')}
        </Text>
        <Text mb={2}>{t('staking-v2.self-liquidation.amount-sub-headline')}</Text>
        <Box borderRadius="base" px={6} py={4} bg="whiteAlpha.100">
          <Text>SNX {t('staking-v2.self-liquidation.penalty')}</Text>
          <Flex>
            <SNXIcon mt="5px" mr={2} />
            <Box>
              {selfLiquidationPenaltySNX !== undefined ? (
                <Text data-testid="snx penalty" fontSize="2xl" fontWeight={800}>
                  {formatNumber(selfLiquidationPenaltySNX)}
                </Text>
              ) : (
                <Skeleton w={4} h={2} mt={2} />
              )}

              {selfLiquidationPenaltyDollar !== undefined ? (
                <Text data-testid="usd penalty">
                  = {formatNumberToUsd(selfLiquidationPenaltyDollar)}
                </Text>
              ) : (
                <Skeleton w={4} h={2} mt={1} />
              )}
            </Box>
          </Flex>
        </Box>
        <Button mt={4} mx="auto" display="block">
          {t('staking-v2.self-liquidation.button-text')}
        </Button>
      </Box>
    </Box>
  );
};
export const SelfLiquidation = () => {
  const { data: selfLiquidationData } = useSelfLiquidationData();
  const { data: debtData } = useDebtData();
  return (
    <SelfLiquidationUi
      selfLiquidationPenaltyDollar={selfLiquidationData?.selfLiquidationPenaltyDollar.toNumber()}
      selfLiquidationPenalty={selfLiquidationData?.selfLiquidationPenalty.toNumber()}
      selfLiquidationPenaltySNX={selfLiquidationData?.selfLiquidationPenaltySNX.toNumber()}
      targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
      currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
    />
  );
};
