import { Container, Text, Box, Flex } from '@chakra-ui/react';
import { wei } from '@synthetixio/wei';
import { useTranslation } from 'react-i18next';
import { Mint } from '../../components/Mint';

const V2Mint = () => {
  // TODO: Logic for mint
  const { t } = useTranslation();
  const isCurrentStaker = true;
  console.log('isCurrentStaker', isCurrentStaker);
  return (
    <Box bg="navy.900">
      <Container pt={12} height="100%" pb={0} maxW="4xl">
        <Text
          fontSize="xl"
          fontFamily="heading"
          fontWeight={700}
          textAlign="center"
          mb={3}
          lineHeight="base"
        >
          {t('staking-v2.mint.title')}
        </Text>
        <Text textAlign="center" color="gray.600" mb={4}>
          {t('staking-v2.mint.description')}
        </Text>
        <Flex justifyContent="space-between">
          <Box>
            <Text>EPOCH</Text>
            <Text>10:00:22</Text>
          </Box>
          <Box>
            <Text>SNX PRICE</Text>
            <Text>2.00</Text>
          </Box>
        </Flex>
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
