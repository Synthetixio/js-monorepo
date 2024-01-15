import { useState, useEffect } from 'react';

import { Synths } from 'constants/currency';
import { TabContainer } from '../../components/common';
import TabContent from '../../components/TabContent';

import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import { wei } from '@synthetixio/wei';
import Connector from 'containers/Connector';

const MigrateTab = () => {
  const { walletAddress } = Connector.useContainer();

  const { useGetDebtDataQuery, useEscrowDataQuery, useSynthetixTxn } = useSynthetixQueries();

  const debtQuery = useGetDebtDataQuery(walletAddress);
  const activeDebt = debtQuery.data?.debtBalance ?? wei(0);

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

  return (
    <TabContainer>
      <TabContent
        amountToMigrate={activeDebt}
        migrateCurrencyKey={Synths.sUSD}
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
        resetTransaction={txn.refresh}
        optimismLayerOneFee={txn.optimismLayerOneFee}
        type="debt"
      />
    </TabContainer>
  );
};

export default MigrateTab;
