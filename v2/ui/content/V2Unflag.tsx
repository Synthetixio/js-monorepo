import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { UnflagOptions } from '@snx-v2/UnflagOptions';
import { useTranslation } from 'react-i18next';

const V2Unflag = () => {
  const { t } = useTranslation();
  return (
    <Box bg="navy.900" height="100%">
      <Container pt={12} pb={16} bg="navy.900" maxW="4xl" height="full">
        <Heading size="md">{t('staking-v2.unflag-options.heading')}</Heading>
        <Text mb={4} fontSize="xs" color="whiteAlpha.800">
          {t('staking-v2.unflag-options.text')}
        </Text>
        <UnflagOptions />
      </Container>
    </Box>
  );
};

export default V2Unflag;
