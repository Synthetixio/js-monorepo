import { FC } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Main from 'sections/delegate/index';

const DelegatePage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('delegate.page-title')}</title>
      </Head>
      <Main />
    </>
  );
};

export default DelegatePage;
