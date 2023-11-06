import { useContext } from 'react';
import { serialize } from '@ethersproject/transactions';
import { address, abi } from './OptimismOracleContract';
import { Contract, PopulatedTransaction } from '@ethersproject/contracts';
import { wei } from '@synthetixio/wei';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { Provider } from '@ethersproject/providers';

const isNetworkIdOvm = (networkId: number | null) => {
  return (
    networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['goerli-ovm']
  );
};
const getOptimismLayerOneFees = async (
  serializedTxn: string,
  networkId: number | null,
  l1Provider: Provider
) => {
  const isOvm = isNetworkIdOvm(networkId);

  if (!isOvm || !networkId) {
    return null;
  }

  const OptimismGasPriceOracleContract = new Contract(address, abi, l1Provider);

  return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
};
export const useOptimismLayer1Fee = ({
  populateTransaction,
}: {
  populateTransaction?: () => Promise<PopulatedTransaction>;
}) => {
  const { globalProviders, usingInfura, toggleRpc } = useGlobalProvidersWithFallback();
  const { networkId } = useContext(ContractContext);

  return useQuery({
    queryKey: ['useOptimismLayer1Fee', networkId, populateTransaction, usingInfura],
    queryFn: async () => {
      if (!populateTransaction) {
        throw Error('populateTransaction missing, query should not be enabled');
      }
      const tx = await populateTransaction();

      // serialize will throw if from is set on the transaction..
      const { from: _from, ...txWithoutFrom } = tx;
      const serializedTxn = serialize(txWithoutFrom);

      return await getOptimismLayerOneFees(serializedTxn, networkId, globalProviders.optimism);
    },

    onError: () => (usingInfura ? toggleRpc() : null),
    enabled: Boolean(populateTransaction && isNetworkIdOvm(networkId)),
  });
};
