import { useState, useEffect } from 'react';

import { CryptoCurrency } from 'constants/currency';
import { TabContainer } from '../../components/common';
import TabContent from '../../components/TabContent';

import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import { wei } from '@synthetixio/wei';
import Connector from 'containers/Connector';

const MigrateTab = () => {
  const { walletAddress } = Connector.useContainer();

  const { useEscrowDataQuery, useSynthetixTxn } = useSynthetixQueries();

  const escrowDataQuery = useEscrowDataQuery(walletAddress);
  const claimableAmount = escrowDataQuery?.data?.claimableAmount ?? wei(0);
  const escrowData = escrowDataQuery?.data ?? null;
  const totalEscrowed = escrowData?.totalEscrowed ?? wei(0);
  const entryIds =
    escrowData?.migratableEntryIdsInChunk?.map((entries) =>
      entries.filter((entry) => entry).map((entry) => entry.toBN())
    ) ?? [];

  const [isVestNeeded, setIsVestNeeded] = useState<boolean>(false);
  const [gasPrice, setGasPrice] = useState<GasPrice | undefined>(undefined);
  const [txModalOpen, setTxModalOpen] = useState<boolean>(false);

  const txn = useSynthetixTxn('SynthetixBridgeToOptimism', 'migrateEscrow', [entryIds], gasPrice);

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
        amountToMigrate={totalEscrowed}
        migrateCurrencyKey={CryptoCurrency.SNX}
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
        type="escrow"
      />
    </TabContainer>
  );
};

export default MigrateTab;
