import { Container, Box, Text, Link } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { HomeButton } from '@snx-v2/HomeButton';
import { Rewards } from '@snx-v2/RewardsItem';
import { Trans, useTranslation } from 'react-i18next';
import { EarnStats } from '@snx-v2/EarnStats';

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
          <EarnStats />
          <Rewards />
        </Container>
      </Box>
    </>
  );
};

export default V2Earn;
