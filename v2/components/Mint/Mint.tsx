import { useState, ChangeEvent, FC } from 'react';
import {
  Input,
  Box,
  Text,
  Flex,
  Tooltip,
  Button,
  Skeleton,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, TokensIcon, TransactionCompleted, TransactionPending } from '@snx-v2/icons';
import { formatNumber, numberWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { TransactionStatus, useMintMutation } from '@snx-v2/useMintMutation';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { TransactionModal } from '@snx-v2/TransactionModal';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { ExternalLink } from '@snx-v2/ExternalLink';
import { calculateUnstakedStakedSnx } from '@snx-v2/stakingCalculations';
import { useQueryClient } from '@tanstack/react-query';

interface MintProps {
  unstakedSnx?: number;
  susdBalance?: number;
  exchangeRate: number;
  isLoading: boolean;
  onSubmit: () => void;
  onMintAmountSNXChange: (amount: string) => void;
  mintAmountSNX: string;
  transactionFee: Wei;
  txnStatus: TransactionStatus;
  modalOpen: boolean;
}
const convert = (value: string, exchangeRate: number) => {
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return formatNumber(num * exchangeRate);
  }

  return formatNumber(0);
};

export const MintUi = ({
  unstakedSnx = 0,
  susdBalance = 0,
  exchangeRate = 0.25,
  isLoading = false,
  onSubmit,
  onMintAmountSNXChange,
  mintAmountSNX,
  transactionFee,
  txnStatus,
  modalOpen,
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
  const mintAmountsUSD = convert(mintAmountSNX, exchangeRate);
  const transactionLoading = txnStatus === 'pending' || txnStatus === 'prompting';

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
                  color="whiteAlpha.700"
                  fontSize="xs"
                  fontFamily="heading"
                  cursor="pointer"
                  onClick={() => {
                    onMintAmountSNXChange(formatNumber(unstakedSnx));
                  }}
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
        <Flex mt={3} alignItems="center" justifyContent="space-between">
          <EthGasPriceEstimator transactionFee={transactionFee} />
        </Flex>
        <Button
          variant="gradient"
          fontFamily="heading"
          fontWeight="black"
          mt={4}
          w="100%"
          onClick={() => {
            setActiveBadge(0);
            return onSubmit();
          }}
          disabled={mintAmountSNX === ''}
        >
          Mint
        </Button>
      </Box>
      <TransactionModal
        icon={transactionLoading ? <TransactionPending /> : <TransactionCompleted />}
        title={
          transactionLoading
            ? t('staking-v2.mint.txn-modal.pending')
            : txnStatus === 'success'
            ? t('staking-v2.mint.txn-modal.completed')
            : 'TODO Error'
        }
        isOpen={modalOpen}
      >
        <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
          <Text fontWeight={500} color="gray.600">
            {t('staking-v2.mint.txn-modal.staking')}
          </Text>
          <Text fontWeight={500}>{mintAmountSNX} SNX</Text>
        </Flex>
        <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
          <Text fontWeight={500} color="gray.600">
            {t('staking-v2.mint.txn-modal.minting')}
          </Text>
          <Text fontWeight={500}>{mintAmountsUSD} SNX</Text>
        </Flex>
        {transactionLoading && (
          <Flex alignItems="center" justifyContent="center" bg="black" pt="4" pb="4" mt="4">
            <Spinner size="sm" mr="3" />
            <Text color="cyan.500" fontWeight={500}>
              {t('staking-v2.mint.txn-modal.loading')}
            </Text>
          </Flex>
        )}
        <Divider borderColor="gray.900" mt="4" mb="4" orientation="horizontal" />
        <Flex justifyContent="center">
          {/* TODO create something that can generate etherscan links based in network and tx id */}
          <ExternalLink fontSize="sm"> {t('staking-v2.mint.txn-modal.etherscan')}</ExternalLink>
        </Flex>
      </TransactionModal>
    </>
  );
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
  // const debouncedSearchTerm = useDebounce(mintAmount, 500);
  const mintAmountSUSD = convert(mintAmountSNX, exchangeRate);
  const { targetCRatio, currentCRatio, collateral } = debtData || {};

  const unstakedSnx = calculateUnstakedStakedSnx({ targetCRatio, currentCRatio, collateral });
  const { mutate, transactionFee, modalOpen, txnStatus } = useMintMutation({
    amount: wei(mintAmountSUSD || 0).toBN(),
    delegateAddress: delegateWalletAddress,
    toMax: wei(mintAmountSNX || 0).gte(formatNumber(unstakedSnx.toNumber())),
  });
  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;
  return (
    <MintUi
      isLoading={isLoading}
      exchangeRate={exchangeRate}
      mintAmountSNX={mintAmountSNX}
      onMintAmountSNXChange={setMintAmountSNX}
      unstakedSnx={unstakedSnx.toNumber()}
      susdBalance={synthsData?.balancesMap.sUSD?.balance.toNumber()}
      onSubmit={() => {
        mutate(undefined, {
          onSuccess: () => {
            queryClient.refetchQueries(['synths'], { type: 'active' });
            queryClient.refetchQueries(['v2debt'], { type: 'active' });
            setMintAmountSNX('');
          },
        });
      }}
      transactionFee={transactionFee || wei(0)}
      txnStatus={txnStatus}
      modalOpen={modalOpen}
    />
  );
};
