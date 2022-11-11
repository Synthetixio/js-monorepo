import { Container, Box, Text, Link } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { HomeButton } from '@snx-v2/HomeButton';
import { Trans, useTranslation } from 'react-i18next';

const V2Earn = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box bg="navy.900" height="100%">
        <Container pt={4} pb={16} bg="navy.900" maxW="4xl">
          <HomeButton />
          <Text
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
                  href={EXTERNAL_LINKS.Synthetix.StakingGuide}
                />,
              ]}
            />
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default V2Earn;
