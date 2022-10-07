import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { Input, Box, Text, Flex, Badge, Tooltip, Button, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, TokensIcon } from '@snx-v2/icons';
import { numberWithCommas } from '@snx-v2/formatters';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionStatus } from '@snx-v2/useBurnMutation';

interface BurnProps {
  snxBalance?: Wei;
  susdBalance?: Wei;
  gasPrice: Wei | null;
  issuableSynths?: Wei;
  activeDebt?: Wei;
  exchangeRate: number;
  isLoading: boolean;
  onSubmit: (amount: BigNumber, toTarget?: boolean) => void;
  txnStatus: TransactionStatus;
}

enum ActiveBadge {
  max,
  cRatio,
  debt,
}

export const Burn = ({
  snxBalance = wei(0),
  susdBalance = wei(0),
  gasPrice = wei(0),
  activeDebt = wei(0),
  issuableSynths = wei(0),
  exchangeRate = 0.25,
  isLoading = false,
  onSubmit = () => {},
  txnStatus = 'unsent',
}: BurnProps) => {
  const { t } = useTranslation();
  const [val, setVal] = useState('');
  const [toTarget, setToTarget] = useState(false);
  const [activeBadge, setActiveBadge] = useState<ActiveBadge | null>(null);

  // Reset form
  useEffect(() => {
    if (txnStatus === 'unsent') {
      setVal('');
    }
  }, [txnStatus]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    setActiveBadge(null);
    setToTarget(false);
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setVal(value);
    }
  };

  const onBadgePress = (badgeType: ActiveBadge) => {
    setToTarget(false);
    switch (badgeType) {
      case ActiveBadge.max:
        setVal(susdBalance.toString(2));
        break;

      case ActiveBadge.cRatio:
        setVal(activeDebt.sub(issuableSynths).toString(2));
        setToTarget(true);
        break;

      case ActiveBadge.debt:
        setVal(susdBalance.gte(activeDebt) ? activeDebt.toString(2) : susdBalance.toString(2));
        break;

      default:
        break;
    }
    setActiveBadge(badgeType);
  };

  const convert = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return (num * (1 / exchangeRate)).toFixed(2).toString();
    }

    return Number(0).toFixed(2).toString();
  };

  return (
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
          <Flex flexDir="column" alignItems="flex-end" w="30%">
            <Input
              borderWidth="0px"
              placeholder={t('staking-v2.burn.enter-amount')}
              onChange={onChange}
              type="text"
              inputMode="decimal"
              value={numberWithCommas(val)}
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
              <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                {t('staking-v2.burn.susd-balance', { susdBalance: susdBalance.toString(2) })}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
        <Flex w="100%" justifyContent="space-between" mt={1}>
          <Badge
            variant="burn"
            sx={{
              bg: activeBadge === ActiveBadge.max ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge === ActiveBadge.max ? 'black' : 'cyan.500',
            }}
            mr={1}
            onClick={() => onBadgePress(ActiveBadge.max)}
          >
            {t('staking-v2.burn.burn-max')}
            <Tooltip label="Soonthetix" hasArrow>
              <Flex alignItems="center">
                <InfoIcon
                  width="16px"
                  height="16px"
                  color={activeBadge === ActiveBadge.max ? 'blue.900' : 'cyan.400'}
                />
              </Flex>
            </Tooltip>
          </Badge>
          <Badge
            variant="burn"
            sx={{
              bg: activeBadge === ActiveBadge.cRatio ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge === ActiveBadge.cRatio ? 'black' : 'cyan.500',
            }}
            mr={1}
            onClick={() => onBadgePress(ActiveBadge.cRatio)}
          >
            {t('staking-v2.burn.burn-cratio')}
            <Tooltip label="Soonthetix" hasArrow>
              <Flex alignItems="center">
                <InfoIcon
                  width="16px"
                  height="16px"
                  color={activeBadge === ActiveBadge.cRatio ? 'blue.900' : 'cyan.400'}
                />
              </Flex>
            </Tooltip>
          </Badge>
          <Badge
            variant="burn"
            sx={{
              bg: activeBadge === ActiveBadge.debt ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge === ActiveBadge.debt ? 'black' : 'cyan.500',
            }}
            onClick={() => onBadgePress(ActiveBadge.debt)}
          >
            {t('staking-v2.burn.burn-debt')}
            <Tooltip label="Soonthetix" hasArrow>
              <Flex alignItems="center">
                <InfoIcon
                  width="16px"
                  height="16px"
                  color={activeBadge === ActiveBadge.debt ? 'blue.900' : 'cyan.400'}
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
              color={numberWithCommas(convert(val)) === '0.00' ? 'whiteAlpha.700' : 'white'}
              height="unset"
              _focus={{ boxShadow: 'none !important' }}
              _placeholder={{ color: 'whiteAlpha.700' }}
              borderWidth="0px"
            >
              {numberWithCommas(convert(val))}
            </Text>
            <Skeleton isLoaded={!isLoading} startColor="gray.900" endColor="gray.700">
              <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
                {t('staking-v2.burn.snx-balance', { snxBalance: snxBalance.toString(2) })}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </Box>
      <Flex mt={3} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Text mr={1} fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs">
            {t('staking-v2.burn.gas')}
          </Text>
          <Tooltip label="Soonthetix" hasArrow>
            <Flex>
              <InfoIcon width="16px" height="16px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Skeleton
          fontFamily="heading"
          fontWeight="extrabold"
          lineHeight="md"
          fontSize="xs"
          isLoaded={!isLoading}
        >
          {/* TODO: Logic on calculating local currency based on gas fee */}
          {`${gasPrice ? t('staking-v2.burn.tx-cost', { txCost: gasPrice }) : 0} Ξ`}
        </Skeleton>
      </Flex>
      <Button
        variant="gradient"
        fontFamily="heading"
        fontWeight="black"
        mt={4}
        w="100%"
        onClick={() => onSubmit(wei(val).toBN(), toTarget)}
        disabled={val === ''}
      >
        Burn
      </Button>
    </Box>
  );
};
