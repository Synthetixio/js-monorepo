import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import CreateAccount from '../components/accounts/CreateAccount';
import { accountsState } from '../utils/state';

export function Home() {
  const { t } = useTranslation();
  const [{ accounts }] = useRecoilState(accountsState);

  //   if (accounts.length) {
  //   router.push({
  //     pathname: `/accounts/${accounts[0]}`,
  //     query: router.query,
  //   });
  // }
  return <CreateAccount />;
}
