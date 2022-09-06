import { Input, Box, Text, Flex, Badge, Tooltip, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { InfoIcon, SNXIcon, SUSDIcon } from '@snx-v2/icons';

interface MintProps {
  snxBalance: Wei;
  susdBalance: Wei;
  exchangeRate: number;
}

export const Mint = ({
  snxBalance = wei(0),
  susdBalance = wei(0),
  exchangeRate = 0.25,
}: MintProps) => {
  // const [state, setState] = useState<Wei>('');
  const { t } = useTranslation();

  // const setAmount = (rate: number) => setState(`${snxBalance.mul(rate)}`);
  console.log(exchangeRate);
  return (
    <Box bg="navy.900" borderWidth="1px" borderColor="gray.900" borderRadius="md" p={5}>
      <Flex alignItems="center">
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
          {t('staking-v2.mint.heading')}
        </Text>
        <Tooltip label="Soonthetix" hasArrow>
          <Flex alignItems="center">
            <InfoIcon width="16px" height="16px" />
          </Flex>
        </Tooltip>
      </Flex>
      <Box borderWidth="1px" borderColor="gray.900" borderRadius="md" p={2} my={4}>
        <Flex>
          <Flex>
            <SNXIcon />
            <Text>SNX</Text>
          </Flex>
          <Box>
            <Input borderWidth="0px" placeholder={t('staking-v2.mint.enter-amount')} />
            <Text>{t('staking-v2.mint.snx-balance', { snxBalance: snxBalance.toString(2) })}</Text>
          </Box>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Badge variant="mint" mr={1} onClick={() => console.log('25%')}>
            25%
          </Badge>
          <Badge variant="mint" mx={1} onClick={() => console.log('50%')}>
            50%
          </Badge>
          <Badge variant="mint" mx={1} onClick={() => console.log('75%')}>
            75%
          </Badge>
          <Badge variant="mint" ml={2} onClick={() => console.log('100%')}>
            100%
          </Badge>
        </Flex>
      </Box>
      <Flex alignItems="center">
        <Text fontFamily="heading" fontWeight="extrabold" lineHeight="md" fontSize="xs" mr={1.5}>
          {t('staking-v2.mint.heading')}
        </Text>
        <InfoIcon width="16px" height="16px" />
      </Flex>
      <Box borderWidth="1px" borderColor="gray.900" borderRadius="md" p={2} mt={4}>
        <Flex>
          <Flex>
            <SUSDIcon />
            <Text>sUSD</Text>
          </Flex>
          <Box>
            <Input borderWidth="0px" placeholder={wei(0).toString(2)} />
            <Text>
              {t('staking-v2.mint.susd-balance', { susdBalance: susdBalance.toString(2) })}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Button
        fontFamily="heading"
        fontWeight="black"
        mt={4}
        w="100%"
        onClick={() => console.log('mint')}
      >
        Mint
      </Button>
    </Box>
  );
};
