import { Container, Text, Box, Flex, Tooltip } from '@chakra-ui/react';
import { InfoIcon } from '@snx-v2/icons';
import { wei } from '@synthetixio/wei';
import { EXTERNAL_LINKS } from 'constants/links';
import { useTranslation, Trans } from 'react-i18next';
import { Mint } from '../../components/Mint';

const V2Mint = () => {
  // TODO: Logic for mint
  const { t } = useTranslation();
  const isCurrentStaker = false;

  return (
    <Box bg="navy.900">
      <Container pt={12} height="100%" pb={0} maxW="4xl">
        <Text
          fontSize="xl"
          fontFamily="heading"
          fontWeight={700}
          textAlign="center"
          mb={3}
          lineHeight="base"
        >
          {isCurrentStaker ? t('staking-v2.mint.title-existing') : t('staking-v2.mint.title-new')}
        </Text>
        <Text textAlign="center" color="gray.600" mb={4}>
          <Trans
            i18nKey="staking-v2.mint.description"
            components={[<a href="https://google.com">Yo mamma</a>]}
          />
        </Text>
        <Flex justifyContent="space-between" mx={6} my={2}>
          <Flex flexDirection="column" alignItems="flex-start">
            <Text
              color="whiteAlpha.700"
              verticalAlign="middle"
              fontWeight="bold"
              fontSize="xs"
              lineHeight="4"
            >
              EPOCH
              <Tooltip hasArrow label="Soonthetix">
                <Box as="span" ml={1}>
                  <InfoIcon color="whiteAlpha.700" width="12px" height="12px" mb={0.5} />
                </Box>
              </Tooltip>
            </Text>
            <Text color="green.400" fontFamily="mono" fontSize="md">
              07:14:55
            </Text>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="whiteAlpha.700" fontWeight="bold" fontSize="xs" lineHeight="4">
              SNX PRICE
            </Text>
            <Text color="green.400" fontFamily="mono" fontSize="md">
              $2.00
            </Text>
          </Flex>
        </Flex>
        <Mint
          snxBalance={wei(1000)}
          susdBalance={wei(1000)}
          gasPrice={wei(20)}
          exchangeRate={0.25}
        />
      </Container>
    </Box>
  );
};

export default V2Mint;
