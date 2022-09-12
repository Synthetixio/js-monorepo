import Connector from 'containers/Connector';
import { useParams } from 'react-router-dom';
import React, { FC } from 'react';
import { EscrowPanelType } from 'store/escrow';
import RewardEscrowSchedule from './RewardEscrowSchedule';
import TokenSaleEscrowSchedule from './TokenSaleEscrowSchedule';

const EscrowTable: FC = () => {
  const { isWalletConnected } = Connector.useContainer();
  const { action } = useParams();
  switch (true) {
    case isWalletConnected && action === EscrowPanelType.REWARDS:
      return <RewardEscrowSchedule />;

    case isWalletConnected && action === EscrowPanelType.ICO:
      return <TokenSaleEscrowSchedule />;

    default:
      return <RewardEscrowSchedule />;
  }
};

export default EscrowTable;
