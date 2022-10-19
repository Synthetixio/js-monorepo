import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { Input, Box, Text, Flex, Badge, Tooltip, Button, Skeleton, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { FailedIcon, InfoIcon, TokensIcon } from '@snx-v2/icons';
import { formatNumber, numberWithCommas } from '@snx-v2/formatters';
import { useBurnMutation } from '@snx-v2/useBurnMutation';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { calculateStakedSnx } from '@snx-v2/stakingCalculations';
import { useDebtData } from '@snx-v2/useDebtData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useQueryClient } from '@tanstack/react-query';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { BurnTransactionModal } from './BurnTransactionModal';

interface BurnProps {
  snxBalance?: number;
  susdBalance?: number;
  isLoading: boolean;
  onSubmit: () => void;
  onBurnAmountSusdChange: (amount: string) => void;
  burnAmountSusd: string;
  snxUnstakingAmount: string;
  transactionFee?: Wei | null;
  gasError: Error | null;
  isGasEnabledAndNotFetched: boolean;
  onBadgeClick: (badge: ActiveBadge) => void;
  stakedSnx: number;
  debtBalance?: number;
}

type ActiveBadge = 'max' | 'toTarget';

export const BurnUi = ({
  snxBalance = 0,
  susdBalance = 0,
  isLoading,
  onSubmit,
  snxUnstakingAmount,
  burnAmountSusd,
  onBurnAmountSusdChange,
  transactionFee,
  onBadgeClick,
  stakedSnx,
  debtBalance,
  gasError,
  isGasEnabledAndNotFetched,
}: BurnProps) => {
  const { t } = useTranslation();

  const [activeBadge, setActiveBadge] = useState<ActiveBadge | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    setActiveBadge(null);
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      onBurnAmountSusdChange(value);
    }
  };
  const handleBadgePress = (badgeType: ActiveBadge) => {
    setActiveBadge(badgeType);
    onBadgeClick(badgeType);
  };

  return (
    <>
      <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="md" p={5}>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
            {t('staking-v2.burn.heading')}
          </Text>
          <Tooltip label="Soonthetix" hasArrow>
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
                sUSD
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <Input
                data-testid="burn susd amount input"
                borderWidth="0px"
                placeholder={t('staking-v2.burn.enter-amount')}
                onChange={onChange}
                type="text"
                inputMode="decimal"
                value={numberWithCommas(burnAmountSusd)}
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
                <Flex>
                  <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading" mr={4}>
                    {t('staking-v2.burn.active-debt')}: {formatNumber(debtBalance || 0)}
                  </Text>
                  <Text
                    data-testid="burn available susd balance"
                    data-balance={formatNumber(susdBalance)}
                    color="whiteAlpha.700"
                    fontSize="xs"
                    fontFamily="heading"
                  >
                    {t('staking-v2.burn.susd-balance', { susdBalance: formatNumber(susdBalance) })}
                  </Text>
                </Flex>
              </Skeleton>
            </Flex>
          </Flex>
          <Flex w="100%" justifyContent="space-between" mt={1}>
            <Badge
              variant="burn"
              sx={{
                bg: activeBadge === 'max' ? 'cyan.500' : 'whiteAlpha.300',
                color: activeBadge === 'max' ? 'black' : 'cyan.500',
              }}
              mr={1}
              onClick={() => handleBadgePress('max')}
            >
              {t('staking-v2.burn.burn-max')}
              <Tooltip label="Soonthetix" hasArrow>
                <Flex alignItems="center">
                  <InfoIcon
                    width="16px"
                    height="16px"
                    color={activeBadge === 'max' ? 'blue.900' : 'cyan.400'}
                  />
                </Flex>
              </Tooltip>
            </Badge>
            <Badge
              variant="burn"
              sx={{
                bg: activeBadge === 'toTarget' ? 'cyan.500' : 'whiteAlpha.300',
                color: activeBadge === 'toTarget' ? 'black' : 'cyan.500',
              }}
              mr={1}
              onClick={() => handleBadgePress('toTarget')}
            >
              {t('staking-v2.burn.burn-cratio')}
              <Tooltip label="Soonthetix" hasArrow>
                <Flex alignItems="center">
                  <InfoIcon
                    width="16px"
                    height="16px"
                    color={activeBadge === 'toTarget' ? 'blue.900' : 'cyan.400'}
                  />
                </Flex>
              </Tooltip>
            </Badge>
          </Flex>
        </Box>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
            {t('staking-v2.burn.unstaking')}
          </Text>
          <Tooltip label="Soonthetix" hasArrow>
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
                SNX
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <Text
                fontFamily="heading"
                fontSize="xl"
                fontWeight="black"
                lineHeight="2xl"
                color={snxUnstakingAmount === '0.00' ? 'whiteAlpha.700' : 'white'}
                height="unset"
                _focus={{ boxShadow: 'none !important' }}
                _placeholder={{ color: 'whiteAlpha.700' }}
                borderWidth="0px"
              >
                {snxUnstakingAmount}
              </Text>
              <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
                <Flex>
                  <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading" mr={4}>
                    {t('staking-v2.burn.staked-snx')}: {formatNumber(stakedSnx)}
                  </Text>
                  <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                    {t('staking-v2.burn.snx-balance', { snxBalance: formatNumber(snxBalance) })}
                  </Text>
                </Flex>
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
            <EthGasPriceEstimator
              transactionFee={burnAmountSusd === '' ? wei(0) : transactionFee}
            />
          </Flex>
        )}
        <Button
          data-testid="burn submit"
          fontFamily="heading"
          fontWeight="black"
          mt={4}
          w="100%"
          onClick={() => onSubmit()}
          disabled={
            burnAmountSusd === '' ||
            burnAmountSusd === '0.00' ||
            Boolean(gasError) ||
            isGasEnabledAndNotFetched
          }
        >
          Burn
        </Button>
      </Box>
    </>
  );
};

const calculateUnStakingAmount = (susdToBurn: string, targetCRatio?: number, SNXPrice?: number) => {
  const num = parseFloat(susdToBurn);
  if (isNaN(num)) return formatNumber(0);
  if (!targetCRatio || !SNXPrice) return formatNumber(0);

  return formatNumber(num / targetCRatio / SNXPrice);
};

export const Burn: FC<{ delegateWalletAddress?: string }> = ({ delegateWalletAddress }) => {
  const [burnAmountSusd, setBurnAmountSusd] = useState('');
  const [activeBadge, setActiveBadge] = useState<ActiveBadge | undefined>(undefined);
  const queryClient = useQueryClient();

  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();
  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();
  const stakedSnx = calculateStakedSnx({
    targetCRatio: debtData?.targetCRatio,
    currentCRatio: debtData?.currentCRatio,
    collateral: debtData?.collateral,
  });
  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;
  const susdBalance = synthsData?.balancesMap.sUSD?.balance;
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
  } = useBurnMutation({
    // Even if the sUSD balance might be bigger than the users debt we still send the complete balance to the contract
    // We do this to avoid users having sUSD dust incase the debt fluctuates.
    // The contract will only burn whats needed to clear the debt.
    amount: activeBadge === 'max' ? wei(susdBalance || 0).toBN() : wei(burnAmountSusd || 0).toBN(),
    delegateAddress: delegateWalletAddress,
    toTarget: activeBadge === 'toTarget',
  });

  const handleBadgeClick = (badgeType: ActiveBadge) => {
    if (!debtData || !susdBalance) return;
    switch (badgeType) {
      case 'toTarget':
        const burnAmount = Wei.max(debtData.debtBalance.sub(debtData.issuableSynths), wei(0));
        setActiveBadge('toTarget');
        setBurnAmountSusd(formatNumber(burnAmount.toNumber()));
        return;

      case 'max':
        setActiveBadge('max');
        setBurnAmountSusd(formatNumber(susdBalance.toNumber()));
        return;
    }
  };
  const snxUnstakingAmount = calculateUnStakingAmount(
    burnAmountSusd,
    debtData?.targetCRatio.toNumber(),
    exchangeRateData?.SNX?.toNumber()
  );
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
      <BurnUi
        stakedSnx={stakedSnx.toNumber()}
        debtBalance={debtData?.debtBalance.toNumber()}
        snxUnstakingAmount={snxUnstakingAmount}
        snxBalance={debtData?.collateral.toNumber()}
        isLoading={isLoading}
        susdBalance={susdBalance?.toNumber()}
        burnAmountSusd={burnAmountSusd}
        onBurnAmountSusdChange={(val) => {
          setActiveBadge(undefined);
          setBurnAmountSusd(val);
        }}
        onBadgeClick={handleBadgeClick}
        gasError={gasError}
        isGasEnabledAndNotFetched={isGasEnabledAndNotFetched}
        transactionFee={transactionFee}
        onSubmit={handleSubmit}
      />
      <BurnTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          setActiveBadge(undefined);
          setBurnAmountSusd('');
          settle();
        }}
        onSubmit={handleSubmit}
        txnStatus={txnStatus}
        modalOpen={modalOpen}
        snxUnstakingAmount={snxUnstakingAmount}
        burnAmountSusd={burnAmountSusd}
      />
    </>
  );
};
