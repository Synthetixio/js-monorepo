import { Box, Text } from '@chakra-ui/react';
import { wei } from '@synthetixio/wei';
import { useTranslation } from 'react-i18next';
import { Mint } from '../../components/Mint';

const V2Mint = () => {
  // TODO: Logic for mint
  const { t } = useTranslation();
  return (
    <Box mt={8} maxW="100%" bg="navy.900">
      <Text fontSize="xl" fontFamily="heading" fontWeight={700} textAlign="center">
        {t('staking-v2.mint.title')}
      </Text>
      <Text>{t('staking-v2.mint.description')}</Text>
      <Mint snxBalance={wei(1000)} susdBalance={wei(1000)} gasPrice={wei(20)} exchangeRate={0.25} />
    </Box>
  );
};

export default V2Mint;
