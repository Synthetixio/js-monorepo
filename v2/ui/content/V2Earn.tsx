import { Container, Box, Text, Link, Flex } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { HomeButton } from '@snx-v2/HomeButton';
import { Rewards } from '@snx-v2/RewardsItem';
import { StatBox } from '@snx-v2/StatBox';
import { Trans, useTranslation } from 'react-i18next';

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
                  href={EXTERNAL_LINKS.Synthetix.StakingGuide}
                />,
              ]}
            />
          </Text>
          <Flex
            my={1}
            flexDirection={['column', 'column', 'row', 'row']}
            justifyContent="space-between"
          >
            <StatBox
              label="Estimated Upcoming Rewards"
              amount="$10,090.92"
              mb={[3, 3, 0, 0]}
              alignItems="start"
              mr={3}
              width="100%"
              maxW={['100%', '100%', 'initial', 'initial']}
            />
            <StatBox
              label="Earning"
              amount="30.75%"
              mb={[3, 3, 0, 0]}
              alignItems={['start', 'start', 'center', 'center']}
              mr={3}
              width="100%"
              maxW={['100%', '100%', 'initial', 'initial']}
            />
            <StatBox
              label="Lifetime Rewards"
              amount="$10,090.92"
              mb={[3, 3, 0, 0]}
              alignItems={['start', 'start', 'end', 'end']}
              width="100%"
              maxW={['100%', '100%', 'initial', 'initial']}
            />
          </Flex>
          <Rewards />
        </Container>
      </Box>
    </>
  );
};

export default V2Earn;
