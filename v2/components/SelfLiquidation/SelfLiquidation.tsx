import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { FC, ReactElement } from 'react';
import { Text, Box, Heading, Flex, Skeleton, Button, Center } from '@chakra-ui/react';
import { useSelfLiquidationData } from '@snx-v2/useSelfLiquidationData';
import { useDebtData } from '@snx-v2/useDebtData';
import { CRatioBox } from '../CRatioBox';
import { CRatioProgressBar } from '@snx-v2/CRatioProgressBar';
import { FailedIcon, SNXIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';
import { useSelfLiquidationMutation } from '@snx-v2/useSelfLiquidationMutation';
import { SelfLiquidationTransactionModal } from './SelfLiquidationTransactionModal';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import Wei, { wei } from '@synthetixio/wei';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { useNavigate } from 'react-router-dom';

const LiquidationDataBox = ({
  headline,
  snxValue,
  usdValue,
  testId,
}: {
  testId: string;
  headline: string;
  snxValue?: number;
  usdValue?: number;
}) => {
  return (
    <Box borderRadius="base" px={6} py={4} bg="whiteAlpha.100" mr={4}>
      <Text>{headline}</Text>
      <Flex>
        <SNXIcon mt="5px" mr={2} />
        <Box>
          {snxValue !== undefined ? (
            <Text data-testid={`snx ${testId}`} fontSize="2xl" fontWeight={800}>
              {formatNumber(snxValue)}
            </Text>
          ) : (
            <Skeleton w={8} h={6} mt={2} />
          )}

          {usdValue !== undefined ? (
            <Text data-testid={`usd ${testId}`}>= {formatNumberToUsd(usdValue)}</Text>
          ) : (
            <Skeleton w={10} h={6} mt={1} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export const SelfLiquidationUi: FC<{
  selfLiquidationPenaltyPercent?: number;
  selfLiquidationPenaltyUSD?: number;
  selfLiquidationPenaltySNX?: number;
  totalAmountToLiquidateUSD?: number;
  totalAmountToLiquidateSNX?: number;
  amountToLiquidateToTargetUsd?: number;
  amountToLiquidateToTargetSNX?: number;
  targetCRatioPercentage?: number;
  currentCRatioPercentage?: number;
  onSelfLiquidation: () => void;
  transactionFee?: Wei | null;
  isGasEnabledAndNotFetched: boolean;
  gasError: Error | null;
  CRatioProgressBar: ReactElement;
  CRatioBox: ReactElement;
}> = ({
  selfLiquidationPenaltyPercent,
  selfLiquidationPenaltyUSD,
  selfLiquidationPenaltySNX,
  totalAmountToLiquidateUSD,
  totalAmountToLiquidateSNX,
  amountToLiquidateToTargetUsd,
  amountToLiquidateToTargetSNX,
  targetCRatioPercentage,
  currentCRatioPercentage,
  onSelfLiquidation,
  transactionFee,
  gasError,
  isGasEnabledAndNotFetched,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formattedPenalty =
    selfLiquidationPenaltyPercent !== undefined
      ? formatPercent(selfLiquidationPenaltyPercent)
      : undefined;

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
          <CRatioProgressBar />
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
          <CRatioBox />
        </Flex>
      </Flex>
      <Box borderRadius="base" borderWidth="1px" borderColor="gray.900" p={4}>
        <Text>
          {formattedPenalty} {t('staking-v2.self-liquidation.amount-headline')}
        </Text>
        <Text mb={2}>{t('staking-v2.self-liquidation.amount-sub-headline')}</Text>
        <Flex>
          <LiquidationDataBox
            testId="penalty"
            snxValue={selfLiquidationPenaltySNX}
            usdValue={selfLiquidationPenaltyUSD}
            headline="Penalty"
          />
          <LiquidationDataBox
            testId="to target"
            snxValue={amountToLiquidateToTargetSNX}
            usdValue={amountToLiquidateToTargetUsd}
            headline="Back to target"
          />
          <LiquidationDataBox
            snxValue={totalAmountToLiquidateSNX}
            usdValue={totalAmountToLiquidateUSD}
            headline="Total"
            testId="total"
          />
        </Flex>
        {gasError ? (
          <Center mt={2}>
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
        <Button variant="outline" onClick={() => navigate(-1)} mt={2}>
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
        selfLiquidationPenaltyPercent={selfLiquidationData?.selfLiquidationPenaltyPercent.toNumber()}
        selfLiquidationPenaltyUSD={selfLiquidationData?.selfLiquidationPenaltyUSD.toNumber()}
        selfLiquidationPenaltySNX={selfLiquidationData?.selfLiquidationPenaltySNX.toNumber()}
        totalAmountToLiquidateUSD={selfLiquidationData?.totalAmountToLiquidateUSD.toNumber()}
        totalAmountToLiquidateSNX={selfLiquidationData?.totalAmountToLiquidateSNX.toNumber()}
        amountToLiquidateToTargetUsd={selfLiquidationData?.amountToLiquidateToTargetUsd.toNumber()}
        amountToLiquidateToTargetSNX={selfLiquidationData?.amountToLiquidateToTargetSNX.toNumber()}
        targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
        currentCRatioPercentage={debtData?.currentCRatioPercentage.toNumber()}
        CRatioProgressBar={<CRatioProgressBar />}
        CRatioBox={<CRatioBox />}
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
