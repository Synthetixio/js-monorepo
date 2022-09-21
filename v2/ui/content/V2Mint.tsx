import {
  Container,
  Text,
  Box,
  Flex,
  Tooltip,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { CRatioProgressBar } from '@snx-v2/CRatioHealthCard';
import { InfoIcon } from '@snx-v2/icons';
import { wei } from '@synthetixio/wei';
import { EXTERNAL_LINKS } from 'constants/links';
import { useTranslation, Trans } from 'react-i18next';
import { Mint } from '../../components/Mint';

const V2Mint = () => {
  const { t } = useTranslation();

  // TODO: Logic for mint (include getVariant)
  const isCurrentStaker = false;
  const liquidationCRatio = 150;
  const targetCRatio = 500;
  const currentCRatio = 250;
  const cRatioHealth = 'Healthy';

  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl">
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
            components={[
              <Link
                color="cyan.400"
                target="_blank"
                href={EXTERNAL_LINKS.Synthetix.StakingGuide}
              />,
            ]}
          />
        </Text>
        {isCurrentStaker ? (
          <>
            <Alert my={6} status="warning">
              <AlertIcon />
              <AlertDescription pl={2} pr={[0, 0, 24]}>
                {t('staking-v2.mint.description-existing')}
              </AlertDescription>
            </Alert>
            <Flex mt={2} mb={6} justifyContent="space-between">
              <Box
                bg="black"
                w="62.5%"
                pt={4}
                px={4}
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.900"
              >
                <CRatioProgressBar
                  liquidationCratioPercentage={liquidationCRatio}
                  currentCRatioPercentage={currentCRatio}
                  targetCratioPercentage={targetCRatio}
                />
              </Box>
              <Flex
                bg="black"
                w="34%"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.900"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Flex
                  borderBottomColor="gray.900"
                  borderBottomWidth="1px"
                  height="50%"
                  p={4}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Heading fontSize="xs" lineHeight="4">
                    Current Health
                    <Tooltip hasArrow label="Soonthetix">
                      <span>
                        <InfoIcon ml={1} mb={0.5} width="16px" height="16px" />
                      </span>
                    </Tooltip>
                  </Heading>
                  <Box>
                    <Text color="green.400" fontFamily="mono" fontSize="lg" textAlign="end">
                      {`${currentCRatio}%`}
                    </Text>
                    <Badge
                      color="green.400"
                      bg="green.900"
                      borderColor="green.400"
                      borderWidth="1px"
                      py={0}
                      px={1}
                      borderRadius="md"
                    >
                      <Tooltip hasArrow label="Soonthetix">
                        <span>
                          <InfoIcon mr={1} mb={0.5} color="green.400" width="12px" height="12px" />
                        </span>
                      </Tooltip>
                      {cRatioHealth}
                    </Badge>
                  </Box>
                </Flex>
                <Flex height="50%" p={4} justifyContent="space-between" alignItems="center">
                  <Heading fontSize="xs" lineHeight="4">
                    Target Health
                    <Tooltip hasArrow label="Soonthetix">
                      <span>
                        <InfoIcon ml={1} mb={0.5} width="16px" height="16px" />
                      </span>
                    </Tooltip>
                  </Heading>
                  <Text color="green.400" fontFamily="mono" fontSize="lg">
                    {`${targetCRatio}%`}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex justifyContent="space-between" mx={6} my={2}>
            <Flex flexDirection="column" alignItems="flex-start">
              <Text
                color="whiteAlpha.700"
                verticalAlign="middle"
                fontWeight="bold"
                fontSize="xs"
                lineHeight="4"
              >
                {t('staking-v2.mint.epoch')}
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
                {t('staking-v2.mint.snx-price')}
              </Text>
              <Text color="green.400" fontFamily="mono" fontSize="md">
                $2.00
              </Text>
            </Flex>
          </Flex>
        )}
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
