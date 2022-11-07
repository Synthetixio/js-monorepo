import { Link as ReactRouterLink } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';
import { ArrowLeft } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

export const HomeButton = (props: LinkProps) => {
  const { t } = useTranslation();
  return (
    <Link
      width="fit-content"
      display="flex"
      alignItems="center"
      color="cyan.500"
      as={ReactRouterLink}
      to="/"
      size="sm"
      fontWeight={700}
      {...props}
    >
      <ArrowLeft mr={2} /> {t('staking-v2.home-btn')}
    </Link>
  );
};
