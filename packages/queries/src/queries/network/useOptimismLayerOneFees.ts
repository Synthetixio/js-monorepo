import { QueryContext } from '../../context';
import { useQuery, UseQueryOptions } from 'react-query';
import Wei, { wei } from '@synthetixio/wei';
import { NetworkId, Synths } from '@synthetixio/contracts-interface';
import { getContractFactory, predeploys } from '@eth-optimism/contracts';
import { ethers } from 'ethers';

const useOptimismLayerOneFees = (ctx: QueryContext, serializedTxn: string) => {
	const isL2 =
		NetworkId['Mainnet-Ovm'] === ctx.networkId! || NetworkId['Kovan-Ovm'] === ctx.networkId!;
	return useQuery<Wei>(
		['network', 'optimismLayerOneFees', ctx.networkId],
		async () => {
			try {
				const OVM_GasPriceOracle = getContractFactory('OVM_GasPriceOracle').attach(
					predeploys.OVM_GasPriceOracle
				);
				return wei(await OVM_GasPriceOracle.getL1Fee(serializedTxn));
			} catch (e) {
				console.log('Could not get the layer one fee', e);
				return wei(0);
			}
		},
		{
			enabled: !!isL2,
		}
	);
};

export default useOptimismLayerOneFees;
