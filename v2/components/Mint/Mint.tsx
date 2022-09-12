import { useState } from 'react';
import { Input, Box, Text, Flex, Badge, Tooltip, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, TokensIcon } from '@snx-v2/icons';
import { numberWithCommas } from '@snx-v2/formatters';
import { ChangeEvent } from 'react';

interface MintProps {
  snxBalance: Wei;
  susdBalance: Wei;
  gasPrice: Wei;
  exchangeRate: number;
}

export const Mint = ({
  snxBalance = wei(0),
  susdBalance = wei(0),
  gasPrice = wei(0),
  exchangeRate = 0.25,
}: MintProps) => {
  const { t } = useTranslation();
  const [val, setVal] = useState('');
  const [activeBadge, setActiveBadge] = useState(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setActiveBadge(0);
      setVal(value);
    }
  };

  const onBadgePress = (amount: number) => {
    if (snxBalance.gt(0)) {
      setActiveBadge(amount);
      setVal(snxBalance.mul(amount).toString(2));
    }
  };

  const convert = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return (num * exchangeRate).toFixed(2).toString();
    }

    return Number(0).toFixed(2).toString();
  };

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
              {t('staking-v2.mint.snx-balance', { snxBalance: snxBalance.toString(2) })}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" justifyContent="space-between" mt={1}>
          <Badge
            variant="mint"
            sx={{
              bg: activeBadge >= 0.25 ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge >= 0.25 ? 'black' : 'cyan.500',
            }}
            mr={1}
            onClick={() => onBadgePress(0.25)}
          >
            25%
          </Badge>
          <Badge
            variant="mint"
            sx={{
              bg: activeBadge >= 0.5 ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge >= 0.5 ? 'black' : 'cyan.500',
            }}
            mx={1}
            onClick={() => onBadgePress(0.5)}
          >
            50%
          </Badge>
          <Badge
            variant="mint"
            sx={{
              bg: activeBadge >= 0.75 ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge >= 0.75 ? 'black' : 'cyan.500',
            }}
            mx={1}
            onClick={() => onBadgePress(0.75)}
          >
            75%
          </Badge>
          <Badge
            variant="mint"
            sx={{
              bg: activeBadge === 1 ? 'cyan.500' : 'whiteAlpha.300',
              color: activeBadge === 1 ? 'black' : 'cyan.500',
            }}
            ml={1}
            onClick={() => onBadgePress(1)}
          >
            100%
          </Badge>
        </Flex>
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
              color={numberWithCommas(convert(val)) === '0.00' ? 'whiteAlpha.700' : 'white'}
              height="unset"
              _focus={{ boxShadow: 'none !important' }}
              _placeholder={{ color: 'whiteAlpha.700' }}
              borderWidth="0px"
            >
              {numberWithCommas(convert(val))}
            </Text>
            <Text color="whiteAlpha.700" fontSize="xs" fontFamily="heading">
              {t('staking-v2.mint.susd-balance', { susdBalance: susdBalance.toString(2) })}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex mt={3} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Text mr={1} fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs">
            {t('staking-v2.mint.gas')}
          </Text>
          <Tooltip label={t('staking-v2.mint.gas-tooltip')} hasArrow>
            <Flex>
              <InfoIcon width="16px" height="16px" />
            </Flex>
          </Tooltip>
        </Flex>
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs">
          {/* TODO: Logic on calculating local currency based on gas fee */}
          {`${t('staking-v2.mint.tx-cost', { txCost: gasPrice.toString(4) })} Ξ ≈ 8.00`}
        </Text>
      </Flex>
      <Button
        fontFamily="heading"
        fontWeight="black"
        mt={4}
        w="100%"
        onClick={() => console.log('mint')}
        disabled={val === ''}
      >
        Mint
      </Button>
    </Box>
  );
};
