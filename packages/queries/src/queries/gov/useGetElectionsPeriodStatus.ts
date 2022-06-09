import { wei } from '@synthetixio/wei';
import { BigNumber, Contract, providers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { isObjKey } from '../../utils';
import { QueryContext } from '../../context';
import { Ambassador } from '../../contracts/Ambassador';
import { Grants } from '../../contracts/Grants';
import { Spartan } from '../../contracts/Spartan';
import { Treasury } from '../../contracts/Treasury';
import { ELECTION_MODULE_PERIODS } from './constants';

const useGetElectionsPeriodStatus = (
	_ctx: QueryContext,
	optimismProvider: providers.BaseProvider,
	options?: UseQueryOptions<{ label: string; code: number }[]>
) => {
	return useQuery(
		['gov', 'period'],
		() => {
			const contracts = [Ambassador, Grants, Spartan, Treasury].map(
				({ address, abi }) => new Contract(address, abi, optimismProvider)
			);

			const promises = contracts.map(async (c) => {
				const code: BigNumber = await c.getCurrentPeriod();
				const codeAsNumber = wei(code).toNumber();
				const { label } = isObjKey(codeAsNumber, ELECTION_MODULE_PERIODS)
					? ELECTION_MODULE_PERIODS[codeAsNumber]
					: { label: 'Unknown' };
				return {
					code: codeAsNumber,
					label,
				};
			});
			return Promise.all(promises);
		},
		{ ...options }
	);
};
export default useGetElectionsPeriodStatus;
