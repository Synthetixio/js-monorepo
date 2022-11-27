import { Container, Box, Text, Link, Flex, Badge, Divider } from '@chakra-ui/react';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { HomeButton } from '@snx-v2/HomeButton';
import { InfoOutline, SNXIcon, CurveIcon } from '@snx-v2/icons';
import { RewardsItem } from '@snx-v2/RewardsItem';
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
          <Box my={8}>
            <Divider my={4} />
            <RewardsItem
              Icon={() => <SNXIcon height="40px" width="40px" />}
              title="Synthetix"
              description="Staking Rewards"
              apyReturn="24.00%"
              stakedBalance="5,000.00 SNX"
              endDate={new Date()}
              isLoading={false}
              rewardBalance="5,000.00 SNX"
              RewardsBadge={() => (
                <Badge py={0.5} px={1} fontSize="2xs" variant="warning" mt={0.5} borderRadius="md">
                  <InfoOutline color="warning" mb="1.75px" mr="2px" height="12px" width="12px" />
                  Adjust to Collect Rewards
                </Badge>
              )}
              onClick={() => console.log('Claim Inflation Rewards')}
            />
            <Divider my={4} />
            <RewardsItem
              Icon={() => <SNXIcon height="40px" width="40px" />}
              title="Synthetix"
              description="Liquidation Rewards"
              apyReturn={null}
              stakedBalance="5,000,000.00 SNX"
              endDate={new Date()}
              isLoading={false}
              rewardBalance="5,000,000.00 SNX"
              RewardsBadge={() => (
                <Badge py={0.5} px={1} fontSize="2xs" variant="warning" mt={0.5} borderRadius="md">
                  <InfoOutline color="warning" mb="1.75px" mr="2px" height="12px" width="12px" />
                  Adjust to Collect Rewards
                </Badge>
              )}
              onClick={() => console.log('Claim Liquidations')}
            />
            <Divider my={4} />
            <RewardsItem
              Icon={() => (
                <Box
                  bg="black"
                  borderRadius="full"
                  w="37px"
                  h="37px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CurveIcon height="24px" width="24px" />
                </Box>
              )}
              title="Curve"
              description="sUSD CPT Rewards"
              apyReturn="24.00%"
              stakedBalance={null}
              endDate={null}
              isLoading={false}
              rewardBalance="5,000.00 SNX"
              RewardsBadge={() => (
                <Badge py={0.5} px={1} fontSize="2xs" variant="warning" mt={0.5} borderRadius="md">
                  <InfoOutline color="warning" mb="1.75px" mr="2px" height="12px" width="12px" />
                  Adjust to Collect Rewards
                </Badge>
              )}
              onClick={() => console.log('Curve')}
            />
            <Divider my={4} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default V2Earn;
