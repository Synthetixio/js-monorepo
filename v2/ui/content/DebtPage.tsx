import { FC } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Debt } from '@snx-v2/Debt';

const DebtPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('staking-v2.debt.title')}</title>
      </Head>
      <Debt />
    </>
  );
};
export default DebtPage;
