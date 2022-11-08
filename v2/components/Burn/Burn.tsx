import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import {
  Input,
  Box,
  Text,
  Flex,
  Badge,
  Tooltip,
  Button,
  Skeleton,
  Center,
  Alert,
  AlertDescription,
  AlertIcon,
  InputProps,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import {
  BridgeIcon,
  FailedIcon,
  GuideIcon,
  InfoIcon,
  SNXIconWithBorder,
  TokensIcon,
} from '@snx-v2/icons';
import { formatNumber, numberWithCommas, parseFloatWithCommas } from '@snx-v2/formatters';
import { useBurnMutation } from '@snx-v2/useBurnMutation';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import {
  calculateBurnAmountFromUnstaking,
  calculateStakedSnx,
  calculateUnstakingAmountFromBurn,
} from '@snx-v2/stakingCalculations';
import { useDebtData } from '@snx-v2/useDebtData';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useQueryClient } from '@tanstack/react-query';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { BurnTransactionModal } from './BurnTransactionModal';
import { MintOrBurnChanges } from '@snx-v2/MintOrBurnChanges';
import { BurnHeader } from './BurnHeader';
import { leftColWidth, rightColWidth } from './layout';
import { BoxLink } from '@snx-v2/BoxLink';

interface BurnProps {
  snxBalance?: number;
  susdBalance?: number;
  isLoading: boolean;
  onSubmit: () => void;
  onBurnAmountSusdChange: (amount: string) => void;
  onUnstakeAmountChange: (amount: string) => void;
  burnAmountSusd: string;
  snxUnstakingAmount: string;
  transactionFee?: Wei | null;
  gasError: Error | null;
  isGasEnabledAndNotFetched: boolean;
  onBadgeClick: (badge: ActiveBadge) => void;
  stakedSnx: number;
  debtBalance?: number;
  sUsdAmountToTarget: number;
  isAboveTarget?: boolean;
}

type ActiveBadge = 'max' | 'toTarget';

const StyledInput: FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      borderWidth="0px"
      type="text"
      inputMode="decimal"
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
  );
};

export const BurnUi = ({
  susdBalance = 0,
  isLoading,
  onSubmit,
  snxUnstakingAmount,
  burnAmountSusd,
  onBurnAmountSusdChange,
  onUnstakeAmountChange,
  transactionFee,
  onBadgeClick,
  stakedSnx,
  debtBalance,
  gasError,
  isGasEnabledAndNotFetched,
  sUsdAmountToTarget,
  isAboveTarget,
}: BurnProps) => {
  const { t } = useTranslation();
  const [activeBadge, setActiveBadge] = useState<ActiveBadge | null>(null);

  const onChange = (currency: 'susd' | 'snx') => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    setActiveBadge(null);
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      return currency === 'susd' ? onBurnAmountSusdChange(value) : onUnstakeAmountChange(value);
    }
  };
  const handleBadgePress = (badgeType: ActiveBadge) => {
    setActiveBadge(badgeType);
    onBadgeClick(badgeType);
  };
  const notEnoughBalance = parseFloatWithCommas(burnAmountSusd) > susdBalance;
  return (
    <>
      <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="base" p={5}>
        <Flex alignItems="center">
          <Text
            fontFamily="heading"
            fontWeight="extrabold"
            lineHeight="base"
            fontSize="xs"
            mr={1.5}
          >
            {t('staking-v2.burn.heading')}
          </Text>
          <Tooltip label="Soonthetix" hasArrow>
            <Flex alignItems="center">
              <InfoIcon width="12px" height="12px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2} my={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <TokensIcon />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                sUSD
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <StyledInput
                autoFocus
                data-testid="burn susd amount input"
                placeholder={t('staking-v2.burn.enter-amount')}
                onChange={onChange('susd')}
                value={numberWithCommas(burnAmountSusd)}
              />
              <Flex alignItems="center">
                <Text
                  display={{ base: 'none', sm: 'block' }}
                  color="whiteAlpha.700"
                  fontSize="xs"
                  fontFamily="heading"
                  mr={1}
                >
                  {t('staking-v2.burn.active-debt')}
                </Text>
                <Skeleton
                  isLoaded={!isLoading}
                  startColor="gray.900"
                  endColor="gray.700"
                  height={isLoading ? '12px' : 'unset'}
                  width={isLoading ? '36px' : 'unset'}
                  mr={1}
                  sx={{
                    display: 'flex',
                    span: {
                      fontFamily: 'mono',
                      fontSize: 'xs',
                      mt: 1,
                      lineHeight: '10px',
                      fontWeight: 'bold',
                      color: 'whiteAlpha.900',
                    },
                  }}
                >
                  <Text
                    display={{ base: 'none', sm: 'block' }}
                    color="whiteAlpha.700"
                    fontSize="xs"
                    fontFamily="heading"
                  >
                    {formatNumber(debtBalance || 0)}
                  </Text>
                </Skeleton>
                <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading" mr={1} ml={1}>
                  {t('staking-v2.burn.susd-balance')}
                </Text>
                <Skeleton
                  isLoaded={!isLoading}
                  startColor="gray.900"
                  endColor="gray.700"
                  height={isLoading ? '12px' : 'unset'}
                  width={isLoading ? '36px' : 'unset'}
                  sx={{
                    display: 'flex',
                    span: {
                      fontFamily: 'mono',
                      fontSize: 'xs',
                      mt: 1,
                      lineHeight: '10px',
                      fontWeight: 'bold',
                      color: 'whiteAlpha.900',
                    },
                  }}
                >
                  <Text
                    data-testid="burn available susd balance"
                    data-balance={formatNumber(susdBalance) || 0}
                    color="whiteAlpha.700"
                    fontSize="xs"
                    fontFamily="heading"
                  >
                    {formatNumber(susdBalance) || 0}
                  </Text>
                </Skeleton>
              </Flex>
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
              <Tooltip label={t('staking-v2.burn.burn-max-tooltip')} hasArrow>
                <Flex alignItems="center">
                  <InfoIcon
                    width="12px"
                    height="12px"
                    color={activeBadge === 'max' ? 'blue.900' : 'cyan.400'}
                  />
                </Flex>
              </Tooltip>
            </Badge>
            <Badge
              variant="burn"
              bg={activeBadge === 'toTarget' ? 'cyan.500' : 'whiteAlpha.300'}
              color={activeBadge === 'toTarget' ? 'black' : 'cyan.500'}
              cursor={isAboveTarget ? 'not-allowed' : 'pointer'}
              _hover={{
                cursor: isAboveTarget ? 'not-allowed' : 'pointer',
              }}
              ml={1}
              onClick={isAboveTarget ? undefined : () => handleBadgePress('toTarget')}
            >
              {t('staking-v2.burn.burn-cratio')}
              <Tooltip
                label={
                  isAboveTarget
                    ? t('staking-v2.burn.burn-cratio-tooltip-not-allowed')
                    : t('staking-v2.burn.burn-cratio-tooltip-allowed')
                }
                hasArrow
              >
                <Flex alignItems="center">
                  <InfoIcon
                    width="12px"
                    height="12px"
                    color={activeBadge === 'toTarget' ? 'blue.900' : 'cyan.400'}
                  />
                </Flex>
              </Tooltip>
            </Badge>
          </Flex>
        </Box>
        {Boolean(parseFloatWithCommas(snxUnstakingAmount) === 0 && !isAboveTarget) && (
          <Alert my={4} status="info" variant="left-accent" py={2} px={3}>
            <AlertIcon width="20px" height="20px" />
            <AlertDescription pl={2} pr={0} fontSize="sm" fontFamily="heading">
              {t('staking-v2.burn.unstaking-note', {
                sUsdAmountToTarget: sUsdAmountToTarget ? formatNumber(sUsdAmountToTarget) : 0,
              })}
            </AlertDescription>
          </Alert>
        )}
        <Flex alignItems="center">
          <Text
            fontFamily="heading"
            fontWeight="extrabold"
            lineHeight="base"
            fontSize="xs"
            mr={1.5}
          >
            {t('staking-v2.burn.unstaking')}
          </Text>
          <Tooltip
            label="When you're c-ratio is below target all your SNX is considered staked"
            hasArrow
          >
            <Flex>
              <InfoIcon width="12px" height="12px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2} mt={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <SNXIconWithBorder />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                SNX
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <StyledInput
                data-testid="burn snx amount input"
                placeholder={t('staking-v2.burn.enter-amount')}
                onChange={onChange('snx')}
                value={numberWithCommas(snxUnstakingAmount)}
              />
              <Flex alignItems="center">
                <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading" mr={1} ml={1}>
                  {t('staking-v2.burn.staked-snx')}
                </Text>
                <Skeleton
                  isLoaded={!isLoading}
                  startColor="gray.900"
                  endColor="gray.700"
                  height={isLoading ? '12px' : 'unset'}
                  width={isLoading ? '36px' : 'unset'}
                  sx={{
                    display: 'flex',
                    span: {
                      fontFamily: 'mono',
                      fontSize: 'xs',
                      mt: 1,
                      lineHeight: '10px',
                      fontWeight: 'bold',
                      color: 'whiteAlpha.900',
                    },
                  }}
                >
                  <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                    {formatNumber(stakedSnx) || 0}
                  </Text>
                </Skeleton>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <MintOrBurnChanges debtChange={parseFloatWithCommas(burnAmountSusd)} action="burn" />
        {gasError || notEnoughBalance ? (
          <Center>
            <FailedIcon width="40px" height="40px" />
            <Text>
              {notEnoughBalance
                ? t('staking-v2.burn.balance-error')
                : `${t('staking-v2.mint.gas-estimation-error')}: ${parseTxnError(gasError)}`}
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
          variant="solid"
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
            isGasEnabledAndNotFetched ||
            notEnoughBalance
          }
        >
          Burn
        </Button>
      </Box>
    </>
  );
};

export const Burn: FC<{ delegateWalletAddress?: string }> = ({ delegateWalletAddress }) => {
  const [burnAmountSusd, setBurnAmountSusd] = useState('');
  const [snxUnstakingAmount, setSnxUnstakingAmount] = useState('');
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
    const snxPrice = exchangeRateData?.SNX?.toNumber();
    if (!debtData || !snxPrice) return;
    switch (badgeType) {
      case 'toTarget':
        const burnAmount = Wei.max(
          debtData.debtBalance.sub(debtData.issuableSynths),
          wei(0)
        ).toNumber();

        setActiveBadge('toTarget');
        const snxUnstakingAmount = calculateUnstakingAmountFromBurn({
          burnAmount,
          targetCRatio: debtData.targetCRatio.toNumber(),
          collateralPrice: snxPrice,
          debtBalance: debtData.debtBalance.toNumber(),
          issuableSynths: debtData.issuableSynths.toNumber(),
        });
        setBurnAmountSusd(formatNumber(burnAmount));
        setSnxUnstakingAmount(
          snxUnstakingAmount === undefined ? '' : formatNumber(snxUnstakingAmount)
        );
        return;

      case 'max': {
        setActiveBadge('max');
        const burnAmountString = formatNumber(debtData.debtBalance.toNumber());
        const snxUnstakingAmount = formatNumber(stakedSnx.toNumber());
        setBurnAmountSusd(burnAmountString);
        setSnxUnstakingAmount(snxUnstakingAmount);

        return;
      }
    }
  };

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
      <BurnHeader burnAmountSusd={parseFloatWithCommas(burnAmountSusd)} />
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Box width={{ base: 'full', md: leftColWidth }}>
          <BurnUi
            stakedSnx={stakedSnx.toNumber()}
            debtBalance={debtData?.debtBalance.toNumber()}
            isLoading={isLoading}
            susdBalance={susdBalance?.toNumber()}
            snxUnstakingAmount={snxUnstakingAmount}
            isAboveTarget={debtData?.currentCRatioPercentage.gt(
              debtData?.targetCRatioPercentage || 0
            )}
            sUsdAmountToTarget={Math.max(
              debtData?.debtBalance.sub(debtData?.issuableSynths || 0)?.toNumber() || 0,
              0
            )}
            burnAmountSusd={burnAmountSusd}
            onBurnAmountSusdChange={(burnAmount) => {
              if (burnAmount === '') {
                setBurnAmountSusd('');
                setSnxUnstakingAmount('');
                return;
              }

              const snxPrice = exchangeRateData?.SNX?.toNumber();
              if (!debtData || !susdBalance || !snxPrice) return;
              const parsedBurnAmount = parseFloatWithCommas(burnAmount);
              if (isNaN(parsedBurnAmount)) return undefined;
              const snxUnstakingAmount = burnAmount
                ? calculateUnstakingAmountFromBurn({
                    burnAmount: parsedBurnAmount,
                    targetCRatio: debtData.targetCRatio.toNumber(),
                    collateralPrice: snxPrice,
                    debtBalance: debtData.debtBalance.toNumber(),
                    issuableSynths: debtData.issuableSynths.toNumber(),
                  })
                : undefined;
              setActiveBadge(undefined);
              setBurnAmountSusd(burnAmount);
              setSnxUnstakingAmount(
                snxUnstakingAmount === undefined ? '' : formatNumber(snxUnstakingAmount)
              );
            }}
            onUnstakeAmountChange={(unstakingAmount) => {
              if (!debtData) return;
              if (unstakingAmount === '') {
                setBurnAmountSusd('');
                setSnxUnstakingAmount('');
                return;
              }
              const parsedUnstakingAmount = parseFloatWithCommas(unstakingAmount);
              if (isNaN(parsedUnstakingAmount)) return undefined;
              const burnAmount = calculateBurnAmountFromUnstaking({
                unStakingAmount: parsedUnstakingAmount,
                targetCRatio: debtData?.targetCRatio.toNumber(),
                collateralPrice: exchangeRateData?.SNX?.toNumber(),
                debtBalance: debtData.debtBalance.toNumber(),
                issuableSynths: debtData.issuableSynths.toNumber(),
              });
              setActiveBadge(undefined);
              setSnxUnstakingAmount(unstakingAmount);
              setBurnAmountSusd(burnAmount === undefined ? '' : formatNumber(burnAmount));
            }}
            onBadgeClick={handleBadgeClick}
            gasError={gasError}
            isGasEnabledAndNotFetched={isGasEnabledAndNotFetched}
            transactionFee={transactionFee}
            onSubmit={handleSubmit}
          />
        </Box>
        <Box width={{ base: 'full', md: rightColWidth }} mt={{ base: 2, md: 0 }}>
          <BoxLink
            icon={<GuideIcon />}
            href="https://blog.synthetix.io/basics-of-staking-snx-2022/"
            isExternal
            subHeadline=""
            headline="Staking guide"
          />
          <BoxLink
            containerProps={{ mt: '2' }}
            icon={<BridgeIcon width="auto" height="20px" color="white" />}
            to="/bridge"
            subHeadline=""
            headline="Bridge"
          />
        </Box>
      </Flex>
      <BurnTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          setActiveBadge(undefined);
          setBurnAmountSusd('');
          setSnxUnstakingAmount('');
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
