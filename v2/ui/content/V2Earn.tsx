import { Container, Box, Text, Link, Divider, Alert } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { HomeButton } from '@snx-v2/HomeButton';
import { Rewards, Fees } from '@snx-v2/RewardsItem';
import { Trans, useTranslation } from 'react-i18next';
import { EarnStats } from '@snx-v2/EarnStats';
import { BurnStats } from '@snx-v2/BurnStats';
import { InfoIcon } from '@snx-v2/icons';

const V2Earn = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box bg="navy.900" minHeight="calc(100vh - 86px)">
        <Container pt={8} pb={16} bg="navy.900" maxW="5xl">
          <HomeButton />
          <Text
            mt={3}
            fontSize="xl"
            fontFamily="heading"
            fontWeight={700}
            textAlign="center"
            mb={3}
            lineHeight="base"
            data-testid="burn header"
          >
            {t('staking-v2.earn.title')}
          </Text>
          <Text textAlign="center" color="gray.600" mb={4} mx={6}>
            <Trans
              i18nKey="staking-v2.earn.description"
              components={[
                <Link
                  target="_blank"
                  color="cyan.400"
                  href={EXTERNAL_LINKS.Synthetix.RewardsGuide}
                />,
              ]}
            />
          </Text>
          <Alert variant="solid" my={4}>
            <InfoIcon color="#2ED9FF" width="16px" height="16px" mr={2} />
            <Text color="white" fontSize="16px" fontFamily="heading">
              Effective Dec 10th 2023, SIP-2043 reduces SNX inflation to zero, ending inflationary
              rewards.{' '}
              <Link
                href="https://blog.synthetix.io/the-end-of-synthetix-token-inflation/"
                isExternal
                target="_blank"
                color="cyan.500"
                textDecoration="underline"
              >
                Read our blog for more details.
              </Link>
            </Text>
          </Alert>
          <Alert variant="solid" my={4}>
            <InfoIcon color="#2ED9FF" width="16px" height="16px" mr={2} />
            <Text color="white" fontSize="16px" fontFamily="heading">
              Fee Burning is now active, which automatically pays down your debt with sUSD rewards,
              you can read more{' '}
              <Link
                href="https://blog.synthetix.io/the-schedar-release-fee-burn/"
                isExternal
                target="_blank"
                color="cyan.500"
                textDecoration="underline"
              >
                here
              </Link>
            </Text>
          </Alert>
          <EarnStats />
          <Rewards />
          <Divider borderColor="transparent" my={8} />
          <BurnStats />
          <Fees />
        </Container>
      </Box>
    </>
  );
};

export default V2Earn;
