import { useState, ChangeEvent, FC } from 'react';
import { Input, Box, Text, Flex, Tooltip, Button, Skeleton, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { FailedIcon, InfoIcon, TokensIcon } from '@snx-v2/icons';
import { formatNumber, numberWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { useMintMutation } from '@snx-v2/useMintMutation';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { calculateUnstakedStakedSnx } from '@snx-v2/stakingCalculations';
import { useQueryClient } from '@tanstack/react-query';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { MintTransactionModal } from './MintTransactionModal';

interface MintProps {
  unstakedSnx?: number;
  susdBalance?: number;
  isLoading: boolean;
  onSubmit: () => void;
  onMintAmountSNXChange: (amount: string) => void;
  mintAmountSNX: string;
  mintAmountsUSD: string;
  transactionFee?: Wei | null;
  gasError: Error | null;
  isGasEnabledAndNotFetched: boolean;
}

export const MintUi = ({
  unstakedSnx = 0,
  susdBalance = 0,
  isLoading,
  onSubmit,
  onMintAmountSNXChange,
  mintAmountSNX,
  mintAmountsUSD,
  transactionFee,
  gasError,
  isGasEnabledAndNotFetched,
}: MintProps) => {
  const { t } = useTranslation();
  const [activeBadge, setActiveBadge] = useState(0);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setActiveBadge(0);
      onMintAmountSNXChange(value);
    }
  };

  const onBadgePress = (amount: number) => {
    if (unstakedSnx > 0) {
      setActiveBadge(amount);
      const newAmount = unstakedSnx * amount;
      onMintAmountSNXChange(formatNumber(newAmount));
    }
  };

  return (
    <>
      <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="md" p={5}>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
            {t('staking-v2.mint.heading')}
          </Text>
          <Tooltip label={t('staking-v2.mint.heading-tooltip')} hasArrow>
            <Flex alignItems="center">
              <InfoIcon width="16px" height="16px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="md" p={2} my={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <TokensIcon />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                SNX
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end" w="30%">
              <Input
                data-testid="mint snx amount input"
                borderWidth="0px"
                placeholder={t('staking-v2.mint.enter-amount')}
                onChange={onChange}
                type="text"
                inputMode="decimal"
                value={numberWithCommas(mintAmountSNX)}
                maxLength={14}
                textAlign="end"
                p={0}
                outline="none"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color="white"
                height="unset"
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
              />
              <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
                <Text
                  data-testid="mint available snx balance"
                  data-balance={formatNumber(unstakedSnx)}
                  color="whiteAlpha.700"
                  fontSize="xs"
                  fontFamily="heading"
                  cursor="pointer"
                  onClick={() => onMintAmountSNXChange(formatNumber(unstakedSnx))}
                >
                  {t('staking-v2.mint.unstaked-snx', { unstakedSnx: formatNumber(unstakedSnx) })}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
          <PercentBadges onBadgePress={onBadgePress} activeBadge={activeBadge} />
        </Box>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
            {t('staking-v2.mint.borrowing')}
          </Text>
          <Tooltip label={t('staking-v2.mint.borrowing-tooltip')} hasArrow>
            <Flex>
              <InfoIcon width="16px" height="16px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="md" p={2} mt={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <TokensIcon />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                sUSD
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <Text
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color={numberWithCommas(mintAmountsUSD) === '0.00' ? 'whiteAlpha.700' : 'white'}
                height="unset"
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
                borderWidth="0px"
              >
                {numberWithCommas(mintAmountsUSD)}
              </Text>
              <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
                <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                  {t('staking-v2.mint.susd-balance', { susdBalance: formatNumber(susdBalance) })}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        </Box>
        {gasError ? (
          <Center>
            <FailedIcon width="40px" height="40px" />
            <Text>
              {t('staking-v2.mint.gas-estimation-error')}: {parseTxnError(gasError)}
            </Text>
          </Center>
        ) : (
          <Flex mt={3} alignItems="center" justifyContent="space-between">
            <EthGasPriceEstimator transactionFee={mintAmountSNX === '' ? wei(0) : transactionFee} />
          </Flex>
        )}
        <Button
          data-testid="mint submit"
          fontFamily="heading"
          fontWeight="black"
          mt={4}
          w="100%"
          onClick={() => {
            setActiveBadge(0);
            onSubmit();
          }}
          disabled={mintAmountSNX === '' || Boolean(gasError) || isGasEnabledAndNotFetched}
        >
          {isGasEnabledAndNotFetched ? t('staking-v2.mint.estimating-gas') : 'Mint'}
        </Button>
      </Box>
    </>
  );
};

const convert = (value: string, exchangeRate: number) => {
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return formatNumber(num * exchangeRate);
  }

  return formatNumber(0);
};
export const Mint: FC<{ delegateWalletAddress?: string }> = ({ delegateWalletAddress }) => {
  const [mintAmountSNX, setMintAmountSNX] = useState('');
  const queryClient = useQueryClient();

  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();

  const targetCRatioPercent = debtData?.targetCRatioPercentage.toNumber();
  const exchangeRate =
    (targetCRatioPercent && exchangeRateData?.SNX?.div(targetCRatioPercent / 100).toNumber()) || 0;
  // const debouncedSearchTerm = useDebounce(mintAmountSNX, 500);
  const mintAmountSUSD = convert(mintAmountSNX, exchangeRate);

  const { targetCRatio, currentCRatio, collateral } = debtData || {};
  const unstakedSnx = calculateUnstakedStakedSnx({ targetCRatio, currentCRatio, collateral });

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
  } = useMintMutation({
    amount: wei(mintAmountSUSD || 0).toBN(),
    delegateAddress: delegateWalletAddress,
    toMax: wei(mintAmountSNX || 0).gte(formatNumber(unstakedSnx.toNumber())),
  });

  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;
  const mintAmountsUSD = convert(mintAmountSNX, exchangeRate);
  const handleSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.refetchQueries(['synths'], { type: 'active' });
        queryClient.refetchQueries(['v2debt'], { type: 'active' });
      },
    });
  };
  return (
    <>
      <MintUi
        isLoading={isLoading}
        mintAmountSNX={mintAmountSNX}
        mintAmountsUSD={mintAmountsUSD}
        onMintAmountSNXChange={setMintAmountSNX}
        unstakedSnx={unstakedSnx.toNumber()}
        susdBalance={synthsData?.balancesMap.sUSD?.balance.toNumber()}
        onSubmit={handleSubmit}
        transactionFee={transactionFee}
        gasError={gasError}
        isGasEnabledAndNotFetched={isGasEnabledAndNotFetched}
      />
      <MintTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          setMintAmountSNX('');
          settle();
        }}
        onSubmit={handleSubmit}
        txnStatus={txnStatus}
        modalOpen={modalOpen}
        mintAmountSNX={mintAmountSNX}
        mintAmountsUSD={mintAmountSUSD}
      />
    </>
  );
};
