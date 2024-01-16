import { useState, useCallback, useEffect } from 'react';

import { TabContainer } from '../../components/common';

import TabContent from './TabContent';
import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import { useDebtData } from '@snx-v2/useDebtData';
import { wei } from '@synthetixio/wei';
import Connector from 'containers/Connector';

const MigrateTab = () => {
  const { walletAddress } = Connector.useContainer();

  const { useEscrowDataQuery, useSynthetixTxn } = useSynthetixQueries();

  const { data: debtData, refetch: refetchDebtData } = useDebtData();
  const activeDebt = debtData?.debtBalance ?? wei(0);

  const escrowDataQuery = useEscrowDataQuery(walletAddress);
  const claimableAmount = escrowDataQuery?.data?.claimableAmount ?? wei(0);

  const [isVestNeeded, setIsVestNeeded] = useState<boolean>(false);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>(undefined);
  const [txModalOpen, setTxModalOpen] = useState<boolean>(false);

  const txn = useSynthetixTxn('DebtMigratorOnEthereum', 'migrateDebt', [walletAddress], gasPrice, {
    enabled: activeDebt?.gt(0),
  });

  useEffect(() => {
    if (claimableAmount.gt(0)) {
      setIsVestNeeded(true);
    }
  }, [claimableAmount]);

  useEffect(() => {
    if (txn.txnStatus === 'confirmed') {
      escrowDataQuery.refetch();
    }
  }, [txn.txnStatus, escrowDataQuery]);

  const resetTransaction = useCallback(() => {
    txn.refresh();
    refetchDebtData();
  }, [txn, refetchDebtData]);

  return (
    <TabContainer>
      <TabContent
        amountToMigrate={activeDebt}
        isVestNeeded={isVestNeeded}
        onSubmit={txn.mutate}
        transactionError={txn.errorMessage}
        gasEstimateError={txn.errorMessage}
        txModalOpen={txModalOpen}
        setTxModalOpen={setTxModalOpen}
        gasLimitEstimate={txn.gasLimit}
        setGasPrice={setGasPrice}
        txHash={txn.hash}
        transactionState={txn.txnStatus}
        resetTransaction={resetTransaction}
        optimismLayerOneFee={txn.optimismLayerOneFee}
      />
    </TabContainer>
  );
};

export default MigrateTab;
