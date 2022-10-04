import { useState, ChangeEvent, FC } from 'react';
import { Input, Box, Text, Flex, Tooltip, Button, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, TokensIcon } from '@snx-v2/icons';
import { formatNumber, numberWithCommas } from '@snx-v2/formatters';
import { PercentBadges } from './PercentBadges';
import { useMintMutation } from '@snx-v2/useMintMutation';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';
import { useDebtData } from '@snx-v2/useDebtData';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { TransactionModal } from '@snx-v2/TransactionModal';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';

interface MintProps {
  snxBalance?: number;
  susdBalance?: number;
  exchangeRate: number;
  isLoading: boolean;
  onSubmit: () => void;
  onMintAmountSNXChange: (amount: string) => void;
  mintAmountSNX: string;
  transactionFee: Wei;
}
const convert = (value: string, exchangeRate: number) => {
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return formatNumber(num * exchangeRate);
  }

  return formatNumber(0);
};

export const MintUi = ({
  snxBalance = 0,
  susdBalance = 0,
  exchangeRate = 0.25,
  isLoading = false,
  onSubmit,
  onMintAmountSNXChange,
  mintAmountSNX,
  transactionFee,
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
    if (snxBalance > 0) {
      setActiveBadge(amount);
      const newAmount = Math.ceil(snxBalance * amount);
      onMintAmountSNXChange(formatNumber(newAmount));
    }
  };
  const mintAmountsUSD = convert(mintAmountSNX, exchangeRate);

  return (
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
                  onMintAmountSNXChange(formatNumber(snxBalance));
                }}
              >
                {t('staking-v2.mint.snx-balance', { snxBalance: formatNumber(snxBalance) })}
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
        fontFamily="heading"
        fontWeight="black"
        mt={4}
        w="100%"
        onClick={() => onSubmit()}
        disabled={mintAmountSNX === ''}
      >
        Mint
      </Button>
    </Box>
  );
};

export const Mint: FC<{ delegateWalletAddress?: string }> = ({ delegateWalletAddress }) => {
  const [mintAmountSNX, setMintAmountSNX] = useState('');

  const { data: synthsData, isLoading: isSynthsLoading } = useSynthsBalances();
  const { data: exchangeRateData, isLoading: isExchangeRateLoading } = useExchangeRatesData();
  const { data: debtData, isLoading: isDebtDataLoading } = useDebtData();

  const targetCRatio = debtData?.targetCRatioPercentage.toNumber();

  const exchangeRate =
    (targetCRatio && exchangeRateData?.SNX?.div(targetCRatio / 100).toNumber()) || 0;
  const snxBalance = debtData?.collateral;
  // const debouncedSearchTerm = useDebounce(mintAmount, 500);

  const { mutate, transactionFee } = useMintMutation({
    amount: wei(convert(mintAmountSNX, exchangeRate) || 0).toBN(),
    delegateAddress: delegateWalletAddress,
    toMax: wei(mintAmountSNX || 0).gte(snxBalance || 0),
  });
  const isLoading = isDebtDataLoading || isExchangeRateLoading || isSynthsLoading;
  return (
    <>
      <MintUi
        isLoading={isLoading}
        exchangeRate={exchangeRate}
        mintAmountSNX={mintAmountSNX}
        onMintAmountSNXChange={setMintAmountSNX}
        snxBalance={snxBalance?.toNumber()}
        susdBalance={synthsData?.balancesMap.sUSD?.balance.toNumber()}
        onSubmit={() => {
          mutate();
        }}
        transactionFee={transactionFee || wei(0)}
      />
    </>
  );
};
