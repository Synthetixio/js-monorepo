import Connector from 'containers/Connector';
import { useLocation } from 'react-router-dom';
import React, { FC, useMemo } from 'react';
import { EscrowPanelType } from 'store/escrow';
import RewardEscrowSchedule from './RewardEscrowSchedule';
import TokenSaleEscrowSchedule from './TokenSaleEscrowSchedule';

const EscrowTable: FC = () => {
  const { isWalletConnected } = Connector.useContainer();
  const { search } = useLocation();
  const activeTab = useMemo(() => {
    const action = new URLSearchParams(search).get('action');
    return isWalletConnected && action ? action : null;
  }, [search, isWalletConnected]);

  const returnSchedule = useMemo(
    () =>
      !activeTab || activeTab === EscrowPanelType.REWARDS ? (
        <RewardEscrowSchedule />
      ) : (
        <TokenSaleEscrowSchedule />
      ),
    [activeTab]
  );

  return returnSchedule;
};

export default EscrowTable;
