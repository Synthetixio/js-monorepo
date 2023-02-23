import { useState, ChangeEvent, FC } from 'react';
import {
  Input,
  Box,
  Text,
  Flex,
  Tooltip,
  Button,
  Skeleton,
  Center,
  InputProps,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { FailedIcon, InfoIcon, TokensIcon, SNXIconWithBorder } from '@snx-v2/icons';
import { formatNumber, numberWithCommas, parseFloatWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { useMintMutation } from '@snx-v2/useMintMutation';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import {
  calculateMintAmountFromStaking,
  calculateStakeAmountFromMint,
  calculateUnstakedStakedSnx,
} from '@snx-v2/stakingCalculations';
import { useQueryClient } from '@tanstack/react-query';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { MintTransactionModal } from './MintTransactionModal';
import { MintOrBurnChanges } from '@snx-v2/MintOrBurnChanges';
import { MintHeader } from './MintHeader';
import { leftColWidth, rightColWidth } from './layout';
import { MintLinks } from './MintLinks';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

interface MintProps {
  unstakedSnx?: number;
  susdBalance?: number;
  isLoading: boolean;
  onSubmit: () => void;
  onStakeAmountSNXChange: (amount: string) => void;
  onMintAmountSUSDChange: (amount: string) => void;
  stakeAmountSNX: string;
  mintAmountsUSD: string;
  transactionFee?: Wei | null;
  gasError: Error | null;
  belowTargetError: boolean;
  isGasEnabledAndNotFetched: boolean;
  delegatedToMint: boolean;
}
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

export const MintUi = ({
  unstakedSnx = 0,
  susdBalance = 0,
  isLoading,
  onSubmit,
  onStakeAmountSNXChange,
  onMintAmountSUSDChange,
  stakeAmountSNX,
  mintAmountsUSD,
  transactionFee,
  gasError,
  belowTargetError,
  isGasEnabledAndNotFetched,
  delegatedToMint,
}: MintProps) => {
  const { t } = useTranslation();
  const [activeBadge, setActiveBadge] = useState(0);
  const onChange = (currency: 'snx' | 'susd') => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setActiveBadge(0);
      currency === 'snx' ? onStakeAmountSNXChange(value) : onMintAmountSUSDChange(value);
    }
  };

  const onBadgePress = (amount: number) => {
    if (unstakedSnx > 0) {
      setActiveBadge(amount);
      const newAmount = unstakedSnx * amount;
      onStakeAmountSNXChange(formatNumber(newAmount));
    }
  };

  return (
    <>
      <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="base" p={5}>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="md" mr={1.5}>
            {t('staking-v2.mint.heading')}
          </Text>
          <Tooltip label={t('staking-v2.mint.heading-tooltip')} hasArrow>
            <Flex alignItems="center">
              <InfoIcon width="12px" height="12px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2} my={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <SNXIconWithBorder />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                SNX
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <StyledInput
                autoFocus
                data-testid="mint snx amount input"
                placeholder={t('staking-v2.mint.enter-amount')}
                onChange={onChange('snx')}
                onKeyDown={(e) => {
                  const oldVal = parseFloatWithCommas(stakeAmountSNX);
                  if (e.key === 'ArrowUp') {
                    onStakeAmountSNXChange(numberWithCommas(String(oldVal + 1)));
                  }
                  if (e.key === 'ArrowDown') {
                    onStakeAmountSNXChange(numberWithCommas(String(Math.max(0, oldVal - 1))));
                  }
                }}
                value={numberWithCommas(stakeAmountSNX)}
              />
              <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
                <Text
                  data-testid="mint available snx balance"
                  data-balance={formatNumber(unstakedSnx)}
                  color="whiteAlpha.700"
                  fontSize="xs"
                  fontFamily="heading"
                  cursor="pointer"
                  onClick={() => onStakeAmountSNXChange(formatNumber(unstakedSnx))}
                >
                  {t('staking-v2.mint.unstaked-snx', { unstakedSnx: formatNumber(unstakedSnx) })}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
          <PercentBadges onBadgePress={onBadgePress} activeBadge={activeBadge} />
        </Box>
        <Flex alignItems="center">
          <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="md" mr={1.5}>
            {t('staking-v2.mint.borrowing')}
          </Text>
          <Tooltip label={t('staking-v2.mint.borrowing-tooltip')} hasArrow>
            <Flex>
              <InfoIcon width="12px" height="12px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Box borderWidth="1px" borderColor="gray.900" borderRadius="base" p={2} mt={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <TokensIcon />
              <Text ml={2} fontFamily="heading" fontSize="lg" fontWeight="black">
                sUSD
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="flex-end">
              <StyledInput
                data-testid="mint susd amount input"
                placeholder={t('staking-v2.mint.enter-amount')}
                onChange={onChange('susd')}
                value={numberWithCommas(mintAmountsUSD)}
                onKeyDown={(e) => {
                  const oldVal = parseFloatWithCommas(mintAmountsUSD);
                  if (e.key === 'ArrowUp') {
                    onMintAmountSUSDChange(numberWithCommas(String(oldVal + 1)));
                  }
                  if (e.key === 'ArrowDown') {
                    onMintAmountSUSDChange(numberWithCommas(String(Math.max(0, oldVal - 1))));
                  }
                }}
              />
              <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
                <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                  {t('staking-v2.mint.susd-balance', { susdBalance: formatNumber(susdBalance) })}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        </Box>
        <MintOrBurnChanges debtChange={parseFloatWithCommas(mintAmountsUSD)} action="mint" />
        {gasError || belowTargetError || !delegatedToMint ? (
          <Center mt={2}>
            <FailedIcon width="40px" height="40px" />
            <Text>
              {!delegatedToMint
                ? t('staking-v2.delegate.missing-permission')
                : belowTargetError
                ? t('staking-v2.mint.below-target-error')
                : `${t('staking-v2.mint.gas-estimation-error')}: ${parseTxnError(gasError)}`}
            </Text>
          </Center>
        ) : (
          <Flex mt={3} alignItems="center" justifyContent="space-between">
            <EthGasPriceEstimator
              transactionFee={stakeAmountSNX === '' ? wei(0) : transactionFee}
            />
          </Flex>
        )}
        <Button
          variant="solid"
          data-testid="mint submit"
          fontFamily="heading"
          fontWeight="black"
          mt={4}
          w="100%"
          onClick={() => {
            setActiveBadge(0);
            onSubmit();
          }}
          isDisabled={
            !delegatedToMint ||
            stakeAmountSNX === '' ||
            Boolean(gasError) ||
            isGasEnabledAndNotFetched ||
            belowTargetError
          }
        >
          {isGasEnabledAndNotFetched ? t('staking-v2.mint.estimating-gas') : 'Mint'}
        </Button>
      </Box>
    </>
  );
};

export const Mint: FC = () => {
  const [stakeAmountSNX, setStakeAmountSNX] = useState('');
  const [mintAmountSUSD, setMintAmountSUSD] = useState('');
  const queryClient = useQueryClient();
  const { delegateWallet } = useDelegateWallet();
  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();

  // const debouncedSearchTerm = useDebounce(stakeAmountSNX, 500);
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
    delegateAddress: delegateWallet?.address,
    toMax: wei(stakeAmountSNX || 0).gte(formatNumber(unstakedSnx.toNumber())),
  });

  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;

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
      <MintHeader
        mintAmountSUSD={mintAmountSUSD === '' ? undefined : parseFloatWithCommas(mintAmountSUSD)}
      />
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Box width={{ base: 'full', md: leftColWidth }}>
          <MintUi
            delegatedToMint={delegateWallet ? delegateWallet.canMint : true}
            isLoading={isLoading}
            stakeAmountSNX={stakeAmountSNX}
            mintAmountsUSD={mintAmountSUSD}
            onStakeAmountSNXChange={(stakeAmount) => {
              if (stakeAmount === '') {
                setStakeAmountSNX('');
                setMintAmountSUSD('');
                return;
              }
              const parsedStakeAmount = parseFloatWithCommas(stakeAmount);
              if (isNaN(parsedStakeAmount)) return undefined;
              const mintAmountSUSD = calculateMintAmountFromStaking(
                parsedStakeAmount,
                targetCRatio?.toNumber(),
                exchangeRateData?.SNX?.toNumber()
              );
              setStakeAmountSNX(stakeAmount);
              setMintAmountSUSD(mintAmountSUSD === undefined ? '' : formatNumber(mintAmountSUSD));
            }}
            onMintAmountSUSDChange={(mintAmount) => {
              if (mintAmount === '') {
                setStakeAmountSNX('');
                setMintAmountSUSD('');
                return;
              }
              const parsedMintAmount = parseFloatWithCommas(mintAmount);
              if (isNaN(parsedMintAmount)) return undefined;
              const stakeAmountSNX = calculateStakeAmountFromMint(
                parsedMintAmount,
                targetCRatio?.toNumber(),
                exchangeRateData?.SNX?.toNumber()
              );
              setMintAmountSUSD(mintAmount);
              setStakeAmountSNX(stakeAmountSNX === undefined ? '' : formatNumber(stakeAmountSNX));
            }}
            unstakedSnx={unstakedSnx.toNumber()}
            susdBalance={synthsData?.balancesMap.sUSD?.balance.toNumber()}
            onSubmit={handleSubmit}
            transactionFee={transactionFee}
            gasError={gasError}
            belowTargetError={
              currentCRatio && targetCRatio ? currentCRatio.gt(targetCRatio) : false
            }
            isGasEnabledAndNotFetched={isGasEnabledAndNotFetched}
          />
        </Box>
        <Box width={{ base: 'full', md: rightColWidth }} mt={{ base: 2, md: 0 }}>
          <MintLinks />
        </Box>
      </Flex>
      <MintTransactionModal
        txnHash={txnHash}
        settle={settle}
        error={error}
        gasError={gasError}
        onClose={() => {
          setStakeAmountSNX('');
          setMintAmountSUSD('');
          settle();
        }}
        onSubmit={handleSubmit}
        txnStatus={txnStatus}
        modalOpen={modalOpen}
        stakeAmountSNX={stakeAmountSNX}
        mintAmountsUSD={mintAmountSUSD}
      />
    </>
  );
};
