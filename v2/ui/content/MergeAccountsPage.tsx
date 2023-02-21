import { FC } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Main from 'sections/merge-accounts';

const MergeAccountsPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('merge-accounts.page-title')}</title>
      </Head>

      <Main />
    </>
  );
};

export default MergeAccountsPage;
