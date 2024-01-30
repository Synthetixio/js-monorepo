import { useContext } from 'react';
import { serialize } from '@ethersproject/transactions';
import { Contract } from '@ethersproject/contracts';
import { wei } from '@synthetixio/wei';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { useGlobalProvidersWithFallback } from '@synthetixio/use-global-providers';
import { Provider } from '@ethersproject/providers';
import { ethers, UnsignedTransaction } from 'ethers';
import optimismOracleContract from '@synthetixio/queries/build/contracts/OptimismGasPriceOracle';

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

  const OptimismGasPriceOracleContract = new Contract(
    optimismOracleContract.address,
    optimismOracleContract.abi,
    l1Provider
  );

  return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
};
export const useCustomOptimismLayer1Fee = ({
  populateTransaction,
}: {
  populateTransaction?: () => Promise<ethers.providers.TransactionRequest>;
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
      const serializedTxn = serialize(<UnsignedTransaction>txWithoutFrom);

      return await getOptimismLayerOneFees(serializedTxn, networkId, globalProviders.optimism);
    },

    onError: () => (usingInfura ? toggleRpc() : null),
    enabled: Boolean(populateTransaction && isNetworkIdOvm(networkId)),
  });
};
