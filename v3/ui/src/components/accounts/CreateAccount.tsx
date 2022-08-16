import Stake from './Stake';
import { Text, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function CreateAccount() {
  const { t } = useTranslation();

  return (
    <>
      <Text fontSize="lg" mb="4">
        {t('home.createAccount.description')}{' '}
        <Link href="https://snx-v3-docs.netlify.app/" fontWeight="semibold" color="blue.400">
          {t('common.learnMore')}
        </Link>
      </Text>
      <Stake />
    </>
  );
}
