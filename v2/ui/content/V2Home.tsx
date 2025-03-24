import { Box, Center, Container, Flex } from '@chakra-ui/react';
import { BalanceBox } from '@snx-v2/BalanceBox';
import { MainActionCardsList } from '@snx-v2/MainActionCards';

import { BridgeIcon } from '@snx-v2/icons';
import { BoxLink } from '@snx-v2/BoxLink';
import { useTranslation } from 'react-i18next';
import Connector from 'containers/Connector';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useDebtData } from '@snx-v2/useDebtData';

const V2Home = () => {
  const { t } = useTranslation();
  const { connectWallet } = Connector.useContainer();
  const { delegateWallet } = useDelegateWallet();
  const { data: debtData } = useDebtData();
  const isStaking = debtData?.debtBalance.gt(0);

  return (
    <>
      <Flex minHeight="calc(100vh - 86px)" direction="column">
        <Box sx={{ flex: '1 0 auto' }}>
          <Container maxW="1200px" py="1" mb={8}>
            <Flex
              mt="4"
              flexDirection={['column', 'column', 'column', 'row']}
              py={4}
              justifyContent="space-between"
            >
              <Box
                paddingY={isStaking ? '7' : undefined}
                paddingX={isStaking ? '4' : undefined}
                bg={isStaking ? 'navy.900' : undefined}
                border={isStaking ? '1px' : undefined}
                borderColor={isStaking ? 'gray.900' : undefined}
                borderRadius="base"
                flex="1"
              >
                <MainActionCardsList connectWallet={connectWallet} />
              </Box>
              <Flex
                ml={[0, 0, 0, 6]}
                mt={[8, 8, 8, 0]}
                alignSelf={['center', 'center', 'center', 'flex-start']}
                width="full"
                maxWidth={['none', 'none', 'none', '287px']}
                flexDirection="column"
              >
                {isStaking && <BalanceBox />}
                {delegateWallet ? null : (
                  <Box mt={isStaking ? 4 : 0}>
                    <BoxLink
                      to="/bridge"
                      headline={t('staking-v2.v2-home.box-links.bridge.headline')}
                      subHeadline={t('staking-v2.v2-home.box-links.bridge.subHeadline')}
                      icon={<BridgeIcon />}
                    />
                  </Box>
                )}
                <Box mt={4}>
                  <BoxLink
                    href={EXTERNAL_LINKS.Synthetix.Docs}
                    headline={t('staking-v2.v2-home.box-links.help.headline')}
                    subHeadline={t('staking-v2.v2-home.box-links.help.subHeadline')}
                    isExternal
                    icon={
                      <Center
                        boxSize="36px"
                        border="1px"
                        fontSize="3xl"
                        borderRadius="base"
                        fontWeight={800}
                        borderColor="whiteAlpha.400"
                        color="whiteAlpha.400"
                      >
                        ?
                      </Center>
                    }
                  />
                </Box>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Flex>
    </>
  );
};

export default V2Home;
