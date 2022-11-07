import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { FC } from 'react';
import { Text, Box, Heading, Flex, Skeleton, Button, Center } from '@chakra-ui/react';
import { useSelfLiquidationData } from '@snx-v2/useSelfLiquidationData';
import { useDebtData } from '@snx-v2/useDebtData';
import { CRatioBox } from '../CRatioBox';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { FailedIcon, SNXIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';
import { useSelfLiquidationMutation } from '@snx-v2/useSelfLiquidationMutation';
import { SelfLiquidationTransactionModal } from './SelfLiquidationTransactionModal';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import Wei, { wei } from '@synthetixio/wei';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { Link as ReactRouterLink } from 'react-router-dom';

export const SelfLiquidationUi: FC<{
  selfLiquidationPenalty?: number;
  selfLiquidationPenaltySNX?: number;
  selfLiquidationPenaltyDollar?: number;
  targetCRatioPercentage?: number;
  liquidationRatioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold?: number;
  onSelfLiquidation: () => void;
  transactionFee?: Wei | null;
  isGasEnabledAndNotFetched: boolean;
  gasError: Error | null;
}> = ({
  selfLiquidationPenalty,
  selfLiquidationPenaltySNX,
  selfLiquidationPenaltyDollar,
  targetCRatioPercentage,
  liquidationRatioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  onSelfLiquidation,
  transactionFee,
  gasError,
  isGasEnabledAndNotFetched,
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
            targetThreshold={targetThreshold || 0}
            liquidationCratioPercentage={liquidationRatioPercentage || 0}
            currentCRatioPercentage={currentCRatioPercentage || 0}
            targetCratioPercentage={targetCRatioPercentage || 0}
            isLoading={false}
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
        {gasError ? (
          <Center>
            <FailedIcon width="40px" height="40px" />
            <Text data-testid="gas error">
              {t('staking-v2.self-liquidation.gas-estimation-error')}: {parseTxnError(gasError)}
            </Text>
          </Center>
        ) : (
          <Flex mt={3} alignItems="center" justifyContent="space-between">
            <EthGasPriceEstimator transactionFee={transactionFee ? transactionFee : wei(0)} />
          </Flex>
        )}
        <Button
          data-testid="self liq button"
          disabled={
            Boolean(gasError) ||
            isGasEnabledAndNotFetched ||
            Number(currentCRatioPercentage) >= Number(targetCRatioPercentage)
          }
          onClick={onSelfLiquidation}
          mt={4}
          mx="auto"
          display="block"
        >
          {t('staking-v2.self-liquidation.button-text')}
        </Button>
      </Box>
      <Box>
        <Button
          variant="link"
          as={ReactRouterLink}
          to="/staking/unflag"
          border="1px"
          borderColor="cyan.500"
          paddingLeft={4}
          paddingRight={4}
          height={8}
          fontSize="sm"
          mt={2}
        >
          {t('staking-v2.back-btn')}
        </Button>
      </Box>
    </Box>
  );
};
export const SelfLiquidation = () => {
  const { data: selfLiquidationData } = useSelfLiquidationData();
  const { data: debtData } = useDebtData();
  const {
    mutate,
    transactionFee,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useSelfLiquidationMutation();

  return (
    <>
      <SelfLiquidationUi
        transactionFee={transactionFee}
        gasError={gasError}
        isGasEnabledAndNotFetched={isGasEnabledAndNotFetched}
        onSelfLiquidation={mutate}
        selfLiquidationPenaltyDollar={selfLiquidationData?.selfLiquidationPenaltyDollar.toNumber()}
        selfLiquidationPenalty={selfLiquidationData?.selfLiquidationPenalty.toNumber()}
        selfLiquidationPenaltySNX={selfLiquidationData?.selfLiquidationPenaltySNX.toNumber()}
        targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
        liquidationRatioPercentage={debtData?.liquidationRatioPercentage.toNumber()}
        currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
        targetThreshold={debtData?.targetThreshold.toNumber()}
      />
      <SelfLiquidationTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          settle();
        }}
        onSubmit={mutate}
        txnStatus={txnStatus}
        modalOpen={modalOpen}
      />
    </>
  );
};
