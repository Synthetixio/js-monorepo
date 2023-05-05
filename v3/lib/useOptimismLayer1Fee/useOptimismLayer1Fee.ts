import { serialize } from '@ethersproject/transactions';
import { InfuraProvider } from '@ethersproject/providers';
import { abi, address } from './OptimismOracleContract';
import { Contract, PopulatedTransaction } from '@ethersproject/contracts';
import { wei } from '@synthetixio/wei';
import { useQuery } from '@tanstack/react-query';
import { useNetwork } from '@snx-v3/useBlockchain';

const isNetworkOvm = (networkName: string) => networkName?.includes('optimism');

const getOptimismLayerOneFees = async (
  serializedTxn: string,
  networkId: number,
  networkName: string
) => {
  const isOvm = isNetworkOvm(networkName);

  if (!isOvm || !networkId) {
    return null;
  }
  const provider = new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
  const OptimismGasPriceOracleContract = new Contract(address, abi, provider);

  return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
};

export const useOptimismLayer1Fee = <T>(
  args:
    | {
        populateTransaction?: (args: T) => Promise<PopulatedTransaction>;
        transactionArgs: T;
      }
    | { populateTransaction?: () => Promise<PopulatedTransaction> }
) => {
  const network = useNetwork();

  const keyForTransactionArgs = 'transactionArgs' in args ? args.transactionArgs : undefined;

  return useQuery({
    queryKey: [
      network.name,
      'OptimismL1Fee',
      {
        args: args.populateTransaction,
        key: keyForTransactionArgs,
      },
    ],
    queryFn: async () => {
      if (!args.populateTransaction) {
        throw Error('populateTransaction missing, query should not be enabled');
      }
      const tx =
        'transactionArgs' in args
          ? await args.populateTransaction(args.transactionArgs)
          : await args.populateTransaction();

      // serialize will throw if from is set on the transaction..
      const { from: _from, ...txWithoutFrom } = tx;
      const serializedTxn = serialize(txWithoutFrom);

      return await getOptimismLayerOneFees(serializedTxn, network?.id, network?.name);
    },
    enabled: Boolean(args.populateTransaction && isNetworkOvm(network.name)),
  });
};
