import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { ArrowLeft } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

export const HomeButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      display="flex"
      alignItems="center"
      color="cyan.500"
      as={ReactRouterLink}
      to="/"
      size="sm"
      fontWeight={700}
      my={4}
    >
      <ArrowLeft mr={2} /> {t('staking-v2.home-btn')}
    </Link>
  );
};
