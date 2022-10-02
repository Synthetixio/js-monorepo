import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { SwapLinks } from '@snx-v2/SwapLinks';
import { useTranslation } from 'react-i18next';

const V2SwapLinks = () => {
  const { t } = useTranslation();
  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl" height="full">
        <Heading size="md">{t('staking-v2.swap-links.heading')}</Heading>
        <Text mb={4} fontSize="xs" color="whiteAlpha.800">
          {t('staking-v2.swap-links.text')}
        </Text>
        <SwapLinks />
      </Container>
    </Box>
  );
};

export default V2SwapLinks;
