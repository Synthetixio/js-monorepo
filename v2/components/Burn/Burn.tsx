import { useState } from 'react';
import { Input, Box, Text, Flex, Badge, Tooltip, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, TokensIcon } from '@snx-v2/icons';
import { numberWithCommas } from '@snx-v2/formatters';
import { ChangeEvent } from 'react';

interface BurnProps {
  snxBalance?: Wei;
  susdBalance?: Wei;
  gasPrice?: Wei;
  exchangeRate?: number;
}

enum ActiveBadge {
  max,
  cRatio,
  debt,
}

// TODO: Logic for calculation
export const Burn = ({
  snxBalance = wei(0),
  susdBalance = wei(0),
  gasPrice = wei(0),
  exchangeRate = 0.25,
}: BurnProps) => {
  const { t } = useTranslation();
  const [val, setVal] = useState('');
  const [activeBadge, setActiveBadge] = useState<ActiveBadge | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setActiveBadge(0);
      setVal(value);
    }
  };

  // TODO: Calculate c-ratio/debt clearing calcs
  const onBadgePress = (amount: ActiveBadge) => {
    setActiveBadge(amount);
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
            <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
              {t('staking-v2.burn.susd-balance', { susdBalance: susdBalance.toString(2) })}
            </Text>
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
            px={1}
            onClick={() => onBadgePress(ActiveBadge.max)}
            display="flex"
            justifyContent="space-between"
            textTransform="capitalize"
            fontWeight="bold"
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
            px={1}
            onClick={() => onBadgePress(ActiveBadge.cRatio)}
            display="flex"
            justifyContent="space-between"
            textTransform="capitalize"
            fontWeight="bold"
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
            mr={1}
            px={2}
            onClick={() => onBadgePress(ActiveBadge.debt)}
            display="flex"
            justifyContent="space-between"
            textTransform="capitalize"
            fontWeight="bold"
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
            <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
              {t('staking-v2.burn.snx-balance', { snxBalance: snxBalance.toString(2) })}
            </Text>
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
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs">
          {/* TODO: Logic on calculating local currency based on gas fee */}
          {`${t('staking-v2.burn.tx-cost', { txCost: gasPrice.toString(4) })} Ξ ≈ 8.00`}
        </Text>
      </Flex>
      <Button
        fontFamily="heading"
        fontWeight="black"
        mt={4}
        w="100%"
        onClick={() => console.log('burn')}
        disabled={val === ''}
      >
        Burn
      </Button>
    </Box>
  );
};
