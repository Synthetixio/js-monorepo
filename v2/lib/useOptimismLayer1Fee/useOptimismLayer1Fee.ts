import { useContext } from 'react';
import { serialize } from '@ethersproject/transactions';
import { InfuraProvider } from '@ethersproject/providers';
import { address, abi } from './OptimismOracleContract';
import { Contract, PopulatedTransaction } from '@ethersproject/contracts';
import { wei } from '@synthetixio/wei';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const isNetworkIdOvm = (networkId: number | null) => {
  return (
    networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['goerli-ovm']
  );
};
const getOptimismLayerOneFees = async (serializedTxn: string, networkId: number | null) => {
  const isOvm = isNetworkIdOvm(networkId);

  if (!isOvm || !networkId) {
    return null;
  }
  const provider = new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
  const OptimismGasPriceOracleContract = new Contract(address, abi, provider);

  return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
};
export const useOptimismLayer1Fee = ({
  populateTransaction,
}: {
  populateTransaction?: () => Promise<PopulatedTransaction>;
}) => {
  const { networkId } = useContext(ContractContext);

  return useQuery(
    [networkId, populateTransaction],
    async () => {
      if (!populateTransaction) {
        throw Error('populateTransaction missing, query should not be enabled');
      }
      const tx = await populateTransaction();

      // serialize will throw if from is set on the transaction..
      const { from: _from, ...txWithoutFrom } = tx;
      const serializedTxn = serialize(txWithoutFrom);

      return await getOptimismLayerOneFees(serializedTxn, networkId);
    },
    { enabled: Boolean(populateTransaction && isNetworkIdOvm(networkId)) }
  );
};
