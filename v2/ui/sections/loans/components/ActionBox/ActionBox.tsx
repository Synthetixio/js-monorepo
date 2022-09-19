import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import StructuredTab from 'components/StructuredTab';
import BorrowSynthsTab from './BorrowSynthsTab/BorrowSynthsTab';
import ActiveBorrowsTab from './ActiveBorrowsTab/ActiveBorrowsTab';

type ActionBoxProps = {};

const ActionBox: React.FC<ActionBoxProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { action, loanId = '', loanAction = '' } = useParams();
  const currentTab = (!action || action === 'new') && loanId === '' ? 'new' : 'list';

  const tabData = useMemo(
    () => [
      {
        title: t('loans.tabs.new.title'),
        tabChildren: <BorrowSynthsTab />,
        key: 'new',
      },
      {
        title: t('loans.tabs.list.title'),
        tabChildren: <ActiveBorrowsTab {...{ loanId, loanAction }} />,
        key: 'list',
      },
    ],
    [t, loanId, loanAction]
  );

  return (
    <StructuredTab
      boxPadding={20}
      tabData={tabData}
      setActiveTab={(key) => navigate(`/loans/${key}`)}
      activeTab={currentTab}
    />
  );
};

export default ActionBox;
